export type ReliabilityGrade = "S" | "A" | "B" | "C";

export type ThumbnailOption = {
  id: string;
  imageUrl: string;
  title: string;
  channel: string;
  meta: string;
};

export type ThumbnailTest = {
  id: string;
  category: string;
  question: string;
  rewardCoins: number;
  isAttentionCheck?: boolean;
  thumbnails: ThumbnailOption[];
};

export type CoinTransaction = {
  id: string;
  title: string;
  amount: number;
  reason: string;
  createdAt: string;
  status: "적립" | "차감" | "정산 예정";
};

export type CoinSummary = {
  balance: number;
  todayEarned: number;
  weekEarned: number;
  monthEarned: number;
  withdrawMin: number;
  transactions: CoinTransaction[];
};

export type Scorecard = {
  grade: ReliabilityGrade;
  reliabilityScore: number;
  hitRate: number;
  totalVotes: number;
  averageResponseSeconds: number;
  nextGradeVotes: number;
  weeklyHitRate: number[];
  gradeTrend: ReliabilityGrade[];
  categories: { name: string; count: number; color: string }[];
};

export type HomeSummary = {
  nickname: string;
  coinBalance: number;
  todayEarned: number;
  todayTests: number;
  hitRate: number;
  grade: ReliabilityGrade;
  totalVotes: number;
  streakDays: number;
  referralCode: string;
  activeUsersLabel: string;
};
