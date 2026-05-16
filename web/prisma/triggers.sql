-- =============================================
-- ThumbGo DB Triggers & Functions
-- Supabase SQL Editor에서 실행하세요.
-- =============================================

-- ─── 1. 투표 후 자동 집계 + 코인 적립 trigger ──

CREATE OR REPLACE FUNCTION handle_new_vote()
RETURNS TRIGGER AS $$
DECLARE
  _cuid TEXT;
BEGIN
  -- cuid 대용 ID 생성 (Prisma cuid 형식 호환)
  _cuid := 'cl' || substr(md5(random()::text || now()::text), 1, 23);

  -- 1) 해당 썸네일의 투표수 +1
  UPDATE "Thumbnail"
  SET "voteCount" = "voteCount" + 1
  WHERE id = NEW."thumbnailId";

  -- 2) 해당 테스트의 총 투표수 +1
  UPDATE "Test"
  SET "totalVotes" = "totalVotes" + 1,
      "updatedAt" = now()
  WHERE id = NEW."testId";

  -- 3) 코인 트랜잭션 적립 (기본 5코인)
  INSERT INTO "CoinTransaction" (id, "testerId", title, amount, reason, status, "createdAt")
  VALUES (
    _cuid,
    NEW."testerId",
    '테스트 응답',
    5,
    '일반 응답 보상',
    'EARNED',
    now()
  );

  -- 4) 테스터 코인 잔액 + 총 투표수 업데이트
  UPDATE "Tester"
  SET "coinBalance" = "coinBalance" + 5,
      "totalVotes" = "totalVotes" + 1,
      "updatedAt" = now()
  WHERE id = NEW."testerId";

  -- 5) 해당 테스트의 모든 썸네일 CTR 재계산
  UPDATE "Thumbnail" t
  SET ctr = CASE
    WHEN test_agg."totalVotes" > 0
    THEN ROUND((t."voteCount"::numeric / test_agg."totalVotes") * 100, 1)
    ELSE 0
  END
  FROM "Test" test_agg
  WHERE t."testId" = NEW."testId"
    AND test_agg.id = NEW."testId";

  -- 6) 종료 조건 확인: VOTE_COUNT 도달 시 자동 완료
  UPDATE "Test"
  SET status = 'COMPLETED',
      "endedAt" = now(),
      "updatedAt" = now()
  WHERE id = NEW."testId"
    AND status = 'ACTIVE'
    AND "endConditionType" IN ('VOTE_COUNT', 'FIRST_OF')
    AND "endConditionVotes" IS NOT NULL
    AND "totalVotes" >= "endConditionVotes";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger 생성 (이미 존재하면 먼저 삭제)
DROP TRIGGER IF EXISTS on_vote_inserted ON "Vote";
CREATE TRIGGER on_vote_inserted
  AFTER INSERT ON "Vote"
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_vote();


-- ─── 2. Audience matchCount 자동 업데이트 ──────

CREATE OR REPLACE FUNCTION update_audience_match_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Audience의 조건에 매칭되는 테스터 수 업데이트
  UPDATE "Audience"
  SET "matchCount" = (
    SELECT COUNT(*)
    FROM "Tester" t
    WHERE t.gender::text = ANY(NEW."genders")
      AND t.categories && NEW."categories"
  )
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_audience_upsert ON "Audience";
CREATE TRIGGER on_audience_upsert
  AFTER INSERT OR UPDATE ON "Audience"
  FOR EACH ROW
  EXECUTE FUNCTION update_audience_match_count();
