export const mockChannels = [
  {
    id: "ch_1",
    name: "게임왕 채널",
    category: "GAMING",
    subscriberCount: 124000,
    avgViewCount: 48000,
    thumbnailUrl: null,
    activeTests: 2,
    totalTests: 18,
  },
  {
    id: "ch_2",
    name: "뷰티 by 소연",
    category: "BEAUTY",
    subscriberCount: 452000,
    avgViewCount: 120000,
    thumbnailUrl: null,
    activeTests: 1,
    totalTests: 32,
  },
  {
    id: "ch_3",
    name: "테크리뷰 마스터",
    category: "TECH",
    subscriberCount: 87000,
    avgViewCount: 35000,
    thumbnailUrl: null,
    activeTests: 0,
    totalTests: 11,
  },
  {
    id: "ch_4",
    name: "맛있는 하루",
    category: "FOOD",
    subscriberCount: 234000,
    avgViewCount: 67000,
    thumbnailUrl: null,
    activeTests: 1,
    totalTests: 24,
  },
  {
    id: "ch_5",
    name: "교육왕 TV",
    category: "EDUCATION",
    subscriberCount: 56000,
    avgViewCount: 22000,
    thumbnailUrl: null,
    activeTests: 0,
    totalTests: 7,
  },
];

export const mockUpcomingEvents = [
  {
    id: "ev_1",
    type: "upload" as const,
    title: "롤 시즌 리뷰 영상",
    channelName: "게임왕 채널",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    testId: "test_1",
  },
  {
    id: "ev_2",
    type: "deadline" as const,
    title: "가을 메이크업 썸네일 테스트 마감",
    channelName: "뷰티 by 소연",
    date: new Date(Date.now() + 1000 * 60 * 60 * 8),
    testId: "test_2",
  },
  {
    id: "ev_3",
    type: "upload" as const,
    title: "M4 맥북 프로 리뷰",
    channelName: "테크리뷰 마스터",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    testId: null,
  },
  {
    id: "ev_4",
    type: "deadline" as const,
    title: "간장게장 레시피 썸네일 테스트",
    channelName: "맛있는 하루",
    date: new Date(Date.now() + 1000 * 60 * 60 * 32),
    testId: "test_3",
  },
];

export type ActiveTest = {
  id: string;
  channelId: string;
  channelName: string;
  title: string;
  thumbnailCount: number;
  totalVotes: number;
  targetVotes: number;
  status: string;
  endConditionType: string;
  deadline: Date;
};

export function addMockActiveTest(test: ActiveTest) {
  mockActiveTests.unshift(test);
}

export const mockActiveTests: ActiveTest[] = [
  {
    id: "test_1",
    channelId: "ch_1",
    channelName: "게임왕 채널",
    title: "롤 시즌 14 격변 리뷰 — 어떤 썸네일?",
    thumbnailCount: 3,
    totalVotes: 234,
    targetVotes: 500,
    status: "ACTIVE",
    endConditionType: "VOTE_COUNT",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 16),
  },
  {
    id: "test_2",
    channelId: "ch_2",
    channelName: "뷰티 by 소연",
    title: "가을 감성 메이크업 (3분 버전)",
    thumbnailCount: 2,
    totalVotes: 187,
    targetVotes: 300,
    status: "ACTIVE",
    endConditionType: "FIRST_OF",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 8),
  },
  {
    id: "test_3",
    channelId: "ch_4",
    channelName: "맛있는 하루",
    title: "간장게장 황금 레시피 공개!",
    thumbnailCount: 4,
    totalVotes: 89,
    targetVotes: 300,
    status: "ACTIVE",
    endConditionType: "DURATION",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 32),
  },
];

export const mockCompletedTests = [
  {
    id: "test_c1",
    channelId: "ch_1",
    title: "롤 월드컵 결승 예측",
    winner: "A",
    winnerCTR: 64.2,
    totalVotes: 512,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "test_c2",
    channelId: "ch_2",
    title: "봄 데일리 메이크업 루틴",
    winner: "B",
    winnerCTR: 71.8,
    totalVotes: 389,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
  },
];

export const mockTestResults = {
  id: "test_1",
  title: "롤 시즌 14 격변 리뷰",
  status: "COMPLETED",
  totalVotes: 512,
  thumbnails: [
    {
      id: "th_a",
      label: "A",
      fileUrl: "/api/placeholder/1280/720",
      voteCount: 329,
      ctr: 64.3,
      ci: 3.1,
      note: "강렬한 빨간 배경 + 충격 표정",
    },
    {
      id: "th_b",
      label: "B",
      fileUrl: "/api/placeholder/1280/720",
      voteCount: 183,
      ctr: 35.7,
      ci: 2.8,
      note: "깔끔한 정보형 디자인",
    },
  ],
  demographicData: {
    gender: { M: { A: 68, B: 32 }, F: { A: 59, B: 41 } },
    ageGroups: {
      "10s": { A: 72, B: 28 },
      "20s": { A: 65, B: 35 },
      "30s": { A: 58, B: 42 },
      "40s": { A: 52, B: 48 },
    },
  },
  timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    A: Math.round(10 + i * 13.5 + Math.random() * 5),
    B: Math.round(5 + i * 7.2 + Math.random() * 5),
  })),
  analysis: [
    {
      thumbnailId: "th_a",
      label: "A",
      hasFace: true,
      faceEmotion: "놀람",
      fontPosition: "좌상단",
      keywords: ["시즌14", "격변", "충격"],
      saturation: "고채도",
    },
    {
      thumbnailId: "th_b",
      label: "B",
      hasFace: false,
      faceEmotion: null,
      fontPosition: "중앙",
      keywords: ["리뷰", "패치노트"],
      saturation: "저채도",
    },
  ],
};
