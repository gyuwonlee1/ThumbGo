/**
 * tester-app API 클라이언트 — Supabase 연동 버전
 *
 * 기존 fixture 기반 api-client.ts를 대체합니다.
 * 각 함수는 Supabase에서 실제 데이터를 조회/삽입하며,
 * DB 연결 실패 시 fixture 데이터로 폴백합니다.
 */

import { supabase } from "./supabase";
import { getUser } from "./auth";
import {
  coinSummary as fixtureCoinSummary,
  homeSummary as fixtureHomeSummary,
  scorecard as fixtureScorecard,
  testFeed as fixtureTestFeed,
} from "./fixtures";
import {
  TesterProfileSchema,
  VoteSubmitSchema,
  WithdrawRequestSchema,
  type TesterProfileInput,
  type VoteSubmitInput,
  type WithdrawRequestInput,
} from "./schemas";
import type {
  CoinSummary,
  HomeSummary,
  Scorecard,
  ThumbnailTest,
} from "./types";

// ─── DailyWatchTime enum 매핑 ─────────────────
const WATCH_TIME_MAP: Record<string, string> = {
  "<30m": "UNDER_30M",
  "~1h": "ABOUT_1H",
  "~2h": "ABOUT_2H",
  "3h+": "OVER_3H",
};

// ─── Category 한글 → DB enum 매핑 ─────────────
const CATEGORY_TO_ENUM: Record<string, string> = {
  "게임": "GAMING",
  "뷰티": "BEAUTY",
  "푸드": "FOOD",
  "브이로그": "VLOG",
  "교육": "EDUCATION",
  "IT·테크": "TECH",
  "키즈": "KIDS",
  "음악": "MUSIC",
  "스포츠": "SPORTS",
  "엔터·예능": "ENTERTAINMENT",
};

const ENUM_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_TO_ENUM).map(([k, v]) => [v, k])
);

// ─── Helper: 현재 테스터 ID 가져오기 ──────────
async function getCurrentTesterId(): Promise<string | null> {
  const user = await getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("Tester")
    .select("id")
    .eq("authUid", user.id)
    .single();

  return data?.id ?? null;
}

// ─── 프로필 저장 ──────────────────────────────
export async function saveProfile(payload: TesterProfileInput) {
  const parsed = TesterProfileSchema.parse(payload);
  const user = await getUser();

  if (!user) {
    return { saved: false, error: "Not authenticated" };
  }

  const dbCategories = parsed.categories.map(
    (c) => CATEGORY_TO_ENUM[c] ?? c
  );

  const { data, error } = await supabase
    .from("Tester")
    .upsert(
      {
        authUid: user.id,
        nickname: parsed.nickname,
        gender: parsed.gender,
        birthYear: parsed.birthYear,
        categories: dbCategories,
        dailyWatchTime: WATCH_TIME_MAP[parsed.dailyWatchTime] ?? parsed.dailyWatchTime,
        device: parsed.device,
      },
      { onConflict: "authUid" }
    )
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save profile:", error.message);
    return { saved: false, error: error.message };
  }

  return { saved: true, testerId: data.id };
}

// ─── 홈 요약 ──────────────────────────────────
export async function getHomeSummary(): Promise<HomeSummary> {
  const testerId = await getCurrentTesterId();
  if (!testerId) return fixtureHomeSummary;

  const { data: tester } = await supabase
    .from("Tester")
    .select("*")
    .eq("id", testerId)
    .single();

  if (!tester) return fixtureHomeSummary;

  // 오늘 적립 코인 합산
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: todayCoins } = await supabase
    .from("CoinTransaction")
    .select("amount")
    .eq("testerId", testerId)
    .gte("createdAt", todayStart.toISOString())
    .gt("amount", 0);

  const todayEarned = todayCoins?.reduce((sum, c) => sum + c.amount, 0) ?? 0;

  // 오늘 테스트 응답 수
  const { count: todayTests } = await supabase
    .from("Vote")
    .select("*", { count: "exact", head: true })
    .eq("testerId", testerId)
    .gte("createdAt", todayStart.toISOString());

  // 대기 중인 ACTIVE 테스트 수 (아직 미투표)
  const { count: activeTestCount } = await supabase
    .from("Test")
    .select("*", { count: "exact", head: true })
    .eq("status", "ACTIVE");

  return {
    nickname: tester.nickname,
    coinBalance: tester.coinBalance,
    todayEarned,
    todayTests: todayTests ?? 0,
    hitRate: tester.hitRate,
    grade: tester.grade as HomeSummary["grade"],
    totalVotes: tester.totalVotes,
    streakDays: tester.streakDays,
    referralCode: tester.referralCode ?? "",
    activeUsersLabel: `현재 ${activeTestCount ?? 0}개의 테스트 진행 중`,
  };
}

// ─── 테스트 피드 ──────────────────────────────
export async function getTestFeed(): Promise<ThumbnailTest[]> {
  const testerId = await getCurrentTesterId();
  if (!testerId) return fixtureTestFeed;

  // 테스터 프로필 가져오기
  const { data: tester } = await supabase
    .from("Tester")
    .select("categories, gender, birthYear")
    .eq("id", testerId)
    .single();

  if (!tester) return fixtureTestFeed;

  // 이미 투표한 테스트 ID 목록
  const { data: votedTests } = await supabase
    .from("Vote")
    .select("testId")
    .eq("testerId", testerId);

  const votedTestIds = votedTests?.map((v) => v.testId) ?? [];

  // ACTIVE 테스트 + 썸네일 + audience 조회
  let query = supabase
    .from("Test")
    .select(`
      id,
      title,
      totalVotes,
      Thumbnail ( id, label, fileUrl, note ),
      Audience ( genders, ageGroups, categories )
    `)
    .eq("status", "ACTIVE")
    .order("createdAt", { ascending: false })
    .limit(20);

  // 이미 투표한 테스트 제외
  if (votedTestIds.length > 0) {
    query = query.not("id", "in", `(${votedTestIds.join(",")})`);
  }

  const { data: tests, error } = await query;

  if (error || !tests) {
    console.error("Failed to fetch test feed:", error?.message);
    return fixtureTestFeed;
  }

  // audience 매칭 필터링 + 형식 변환
  return tests
    .filter((test) => {
      const audience = Array.isArray(test.Audience) ? test.Audience[0] : test.Audience;
      if (!audience) return true; // audience 없으면 전체 공개
      const categoryMatch = tester.categories.some((c: string) =>
        audience.categories.includes(c)
      );
      const genderMatch =
        tester.gender === "UNDISCLOSED" ||
        audience.genders.includes(tester.gender);
      return categoryMatch && genderMatch;
    })
    .map((test) => {
      const audience = Array.isArray(test.Audience) ? test.Audience[0] : test.Audience;
      const thumbnails = (Array.isArray(test.Thumbnail) ? test.Thumbnail : []).map(
        (t: { id: string; label: string; fileUrl: string; note: string | null }) => ({
          id: t.id,
          imageUrl: t.fileUrl,
          title: "새 영상",
          channel: "테스트 채널",
          meta: `조회수 — · 투표 ${test.totalVotes}건`,
        })
      );

      const categoryEnum = audience?.categories?.[0] ?? "ETC";
      const categoryLabel = ENUM_TO_CATEGORY[categoryEnum] ?? categoryEnum;

      return {
        id: test.id,
        category: categoryLabel,
        question: "어떤 영상을 클릭하시겠어요?",
        rewardCoins: 5,
        thumbnails,
      };
    });
}

// ─── 투표 제출 ────────────────────────────────
export async function submitVote(payload: VoteSubmitInput) {
  const parsed = VoteSubmitSchema.parse(payload);
  const testerId = await getCurrentTesterId();

  if (!testerId) {
    return { accepted: false, error: "Not authenticated" };
  }

  const { error } = await supabase.from("Vote").insert({
    testId: parsed.testId,
    thumbnailId: parsed.chosenThumbnailId,
    testerId,
    responseTimeMs: parsed.responseTimeMs,
    tapPosition: parsed.tapPosition,
    thumbnailOrder: parsed.thumbnailOrder,
    appSessionId: parsed.appSessionId,
    deviceFingerprint: parsed.deviceFingerprint,
    clientTimestamp: parsed.clientTimestamp,
  });

  if (error) {
    console.error("Failed to submit vote:", error.message);
    // 중복 투표 등 에러 처리
    if (error.code === "23505") {
      return { accepted: false, error: "이미 투표한 테스트입니다." };
    }
    return { accepted: false, error: error.message };
  }

  // trigger가 코인 적립을 자동 처리하므로 여기서는 성공만 반환
  return { accepted: true, awardedCoins: 5, voteId: "supabase-vote" };
}

// ─── 코인 조회 ────────────────────────────────
export async function getCoins(): Promise<CoinSummary> {
  const testerId = await getCurrentTesterId();
  if (!testerId) return fixtureCoinSummary;

  const { data: tester } = await supabase
    .from("Tester")
    .select("coinBalance")
    .eq("id", testerId)
    .single();

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now);
  monthStart.setDate(1);

  // 기간별 적립 합산
  const { data: transactions } = await supabase
    .from("CoinTransaction")
    .select("*")
    .eq("testerId", testerId)
    .order("createdAt", { ascending: false })
    .limit(50);

  const txList = transactions ?? [];

  const todayEarned = txList
    .filter((t) => new Date(t.createdAt) >= todayStart && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  const weekEarned = txList
    .filter((t) => new Date(t.createdAt) >= weekStart && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  const monthEarned = txList
    .filter((t) => new Date(t.createdAt) >= monthStart && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  const STATUS_MAP: Record<string, "적립" | "차감" | "정산 예정"> = {
    EARNED: "적립",
    DEDUCTED: "차감",
    PENDING_SETTLE: "정산 예정",
  };

  return {
    balance: tester?.coinBalance ?? 0,
    todayEarned,
    weekEarned,
    monthEarned,
    withdrawMin: 5000,
    transactions: txList.map((t) => ({
      id: t.id,
      title: t.title,
      amount: t.amount,
      reason: t.reason ?? "",
      createdAt: new Intl.DateTimeFormat("ko-KR", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(t.createdAt)),
      status: STATUS_MAP[t.status] ?? "적립",
    })),
  };
}

// ─── 스코어카드 ───────────────────────────────
export async function getScorecard(): Promise<Scorecard> {
  const testerId = await getCurrentTesterId();
  if (!testerId) return fixtureScorecard;

  const { data: tester } = await supabase
    .from("Tester")
    .select("*")
    .eq("id", testerId)
    .single();

  if (!tester) return fixtureScorecard;

  // 카테고리별 투표 수 집계
  const { data: votes } = await supabase
    .from("Vote")
    .select(`
      id,
      Test (
        Channel ( category )
      )
    `)
    .eq("testerId", testerId);

  const categoryCounts: Record<string, number> = {};
  for (const vote of votes ?? []) {
    // Supabase nested select는 배열로 반환되므로 안전하게 접근
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const voteAny = vote as any;
    const testData = Array.isArray(voteAny.Test) ? voteAny.Test[0] : voteAny.Test;
    const channelData = testData ? (Array.isArray(testData.Channel) ? testData.Channel[0] : testData.Channel) : null;
    const cat = channelData?.category ?? "ETC";
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  }

  const CATEGORY_COLORS: Record<string, string> = {
    GAMING: "bg-blue-600",
    BEAUTY: "bg-pink-600",
    FOOD: "bg-orange-600",
    TECH: "bg-violet-600",
    ENTERTAINMENT: "bg-red-600",
    EDUCATION: "bg-green-600",
    VLOG: "bg-yellow-600",
    KIDS: "bg-cyan-600",
    MUSIC: "bg-indigo-600",
    SPORTS: "bg-emerald-600",
    ETC: "bg-gray-600",
  };

  const categories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name: ENUM_TO_CATEGORY[name] ?? name,
      count,
      color: CATEGORY_COLORS[name] ?? "bg-gray-600",
    }));

  return {
    grade: tester.grade as Scorecard["grade"],
    reliabilityScore: tester.reliabilityScore,
    hitRate: tester.hitRate,
    totalVotes: tester.totalVotes,
    averageResponseSeconds: 6.0, // TODO: 실제 계산
    nextGradeVotes: Math.max(0, getNextGradeThreshold(tester.grade) - tester.totalVotes),
    weeklyHitRate: [], // TODO: 주별 집계
    gradeTrend: [], // TODO: 등급 이력
    categories,
  };
}

function getNextGradeThreshold(grade: string): number {
  switch (grade) {
    case "C": return 50;
    case "B": return 150;
    case "A": return 300;
    case "S": return 999;
    default: return 50;
  }
}

// ─── 출금 요청 (stub — 추후 구현) ──────────────
export async function requestWithdraw(payload: WithdrawRequestInput) {
  const parsed = WithdrawRequestSchema.parse(payload);
  // TODO: 출금 로직 구현
  return { accepted: true, status: "PENDING_KYC" };
}
