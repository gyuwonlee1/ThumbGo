import type { CoinSummary, HomeSummary, Scorecard, ThumbnailTest } from "./types";

export const testerId = "cltester000000000000000001";

export const homeSummary: HomeSummary = {
  nickname: "테스터23",
  coinBalance: 3450,
  todayEarned: 125,
  todayTests: 12,
  hitRate: 87,
  grade: "A",
  totalVotes: 234,
  streakDays: 5,
  referralCode: "THUMB2026",
  activeUsersLabel: "오늘 12.4만 명이 응답 중"
};

export const testFeed: ThumbnailTest[] = [
  {
    id: "cltest000000000000000001",
    category: "IT·테크",
    question: "어떤 영상을 클릭하시겠어요?",
    rewardCoins: 5,
    thumbnails: [
      {
        id: "clthumb000000000000000001",
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 12만회 · 3시간 전"
      },
      {
        id: "clthumb000000000000000002",
        imageUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 12만회 · 3시간 전"
      }
    ]
  },
  {
    id: "cltest000000000000000002",
    category: "푸드",
    question: "지금 더 보고 싶은 썸네일을 골라주세요.",
    rewardCoins: 5,
    thumbnails: [
      {
        id: "clthumb000000000000000003",
        imageUrl:
          "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 8.7만회 · 1일 전"
      },
      {
        id: "clthumb000000000000000004",
        imageUrl:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 8.7만회 · 1일 전"
      }
    ]
  },
  {
    id: "cltest000000000000000003",
    category: "게임",
    question: "유튜브 홈에서 먼저 누를 카드는 무엇인가요?",
    rewardCoins: 5,
    thumbnails: [
      {
        id: "clthumb000000000000000005",
        imageUrl:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 21만회 · 5시간 전"
      },
      {
        id: "clthumb000000000000000006",
        imageUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 21만회 · 5시간 전"
      },
      {
        id: "clthumb000000000000000007",
        imageUrl:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 21만회 · 5시간 전"
      }
    ]
  },
  {
    id: "cltest000000000000000004",
    category: "어텐션 체크",
    question: "정상적인 영상 썸네일을 골라주세요.",
    rewardCoins: 8,
    isAttentionCheck: true,
    thumbnails: [
      {
        id: "clthumb000000000000000008",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=506&fit=crop",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 4.2만회 · 2일 전"
      },
      {
        id: "clthumb000000000000000009",
        imageUrl:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='506'%3E%3Crect width='900' height='506' fill='%23000'/%3E%3C/svg%3E",
        title: "새 영상",
        channel: "테스트 채널",
        meta: "조회수 4.2만회 · 2일 전"
      }
    ]
  }
];

export const coinSummary: CoinSummary = {
  balance: 3450,
  todayEarned: 125,
  weekEarned: 680,
  monthEarned: 2340,
  withdrawMin: 5000,
  transactions: [
    {
      id: "coin-1",
      title: "테스트 응답",
      amount: 5,
      reason: "일반 응답 보상",
      createdAt: "오늘 14:32",
      status: "적립"
    },
    {
      id: "coin-2",
      title: "적중 보너스",
      amount: 10,
      reason: "완료 테스트 다수파 적중",
      createdAt: "오늘 14:25",
      status: "정산 예정"
    },
    {
      id: "coin-3",
      title: "출석 보상",
      amount: 20,
      reason: "오늘 첫 응답 완료",
      createdAt: "오늘 09:15",
      status: "적립"
    },
    {
      id: "coin-4",
      title: "어텐션 체크 실패",
      amount: -5,
      reason: "품질 확인 문항 오답",
      createdAt: "어제 21:45",
      status: "차감"
    }
  ]
};

export const scorecard: Scorecard = {
  grade: "A",
  reliabilityScore: 92,
  hitRate: 87,
  totalVotes: 234,
  averageResponseSeconds: 6.2,
  nextGradeVotes: 24,
  weeklyHitRate: [75, 82, 88, 85, 90, 87, 92],
  gradeTrend: ["B", "B", "A", "A", "A"],
  categories: [
    { name: "게임", count: 45, color: "bg-blue-600" },
    { name: "뷰티", count: 32, color: "bg-pink-600" },
    { name: "푸드", count: 28, color: "bg-orange-600" },
    { name: "IT·테크", count: 24, color: "bg-violet-600" },
    { name: "엔터·예능", count: 18, color: "bg-red-600" }
  ]
};
