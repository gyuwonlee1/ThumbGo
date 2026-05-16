-- =============================================
-- ThumbGo Row Level Security (RLS) 정책
-- Prisma migrate 후, Supabase SQL Editor에서 실행하세요.
-- =============================================

-- ─── RLS 활성화 ────────────────────────────────

ALTER TABLE "Tester" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CoinTransaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Test" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Thumbnail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Audience" ENABLE ROW LEVEL SECURITY;

-- ─── Tester 정책 ──────────────────────────────
-- 테스터는 본인 프로필만 읽기/쓰기 가능

CREATE POLICY "Testers: 본인 읽기"
  ON "Tester" FOR SELECT
  USING (auth.uid()::text = "authUid");

CREATE POLICY "Testers: 본인 수정"
  ON "Tester" FOR UPDATE
  USING (auth.uid()::text = "authUid");

CREATE POLICY "Testers: 신규 가입"
  ON "Tester" FOR INSERT
  WITH CHECK (auth.uid()::text = "authUid");

-- ─── Vote 정책 ────────────────────────────────
-- 테스터는 투표를 INSERT 가능하고, 본인 투표만 SELECT 가능

CREATE POLICY "Votes: 테스터 투표 삽입"
  ON "Vote" FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "Tester"
      WHERE id = "testerId"
        AND "authUid" = auth.uid()::text
    )
  );

CREATE POLICY "Votes: 테스터 본인 투표 읽기"
  ON "Vote" FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Tester"
      WHERE id = "testerId"
        AND "authUid" = auth.uid()::text
    )
  );

-- ─── CoinTransaction 정책 ─────────────────────
-- 테스터는 본인 코인 내역만 조회 가능 (INSERT는 trigger에서만)

CREATE POLICY "Coins: 테스터 본인 내역 읽기"
  ON "CoinTransaction" FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Tester"
      WHERE id = "testerId"
        AND "authUid" = auth.uid()::text
    )
  );

-- ─── Test 정책 ────────────────────────────────
-- 인증된 사용자는 ACTIVE 테스트를 읽기 가능

CREATE POLICY "Tests: ACTIVE 테스트 읽기"
  ON "Test" FOR SELECT
  USING (
    status = 'ACTIVE'
    AND auth.uid() IS NOT NULL
  );

-- ─── Thumbnail 정책 ───────────────────────────
-- ACTIVE 테스트에 속한 썸네일은 읽기 가능

CREATE POLICY "Thumbnails: ACTIVE 테스트 썸네일 읽기"
  ON "Thumbnail" FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Test"
      WHERE id = "testId"
        AND status = 'ACTIVE'
    )
    AND auth.uid() IS NOT NULL
  );

-- ─── Audience 정책 ────────────────────────────
-- ACTIVE 테스트의 audience 정보는 읽기 가능

CREATE POLICY "Audience: ACTIVE 테스트 audience 읽기"
  ON "Audience" FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Test"
      WHERE id = "testId"
        AND status = 'ACTIVE'
    )
    AND auth.uid() IS NOT NULL
  );

-- =============================================
-- NOTE: web(Prisma)은 service_role key를 통해 접근하므로
-- RLS를 우회합니다. 위 정책은 tester-app(anon key)에만 적용됩니다.
-- =============================================
