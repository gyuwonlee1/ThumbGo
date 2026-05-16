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

export function addMockChannel(channel: { name: string; category: string }) {
  const id = `ch_${Date.now()}`;
  mockChannels.push({
    id,
    name: channel.name,
    category: channel.category,
    subscriberCount: 0,
    avgViewCount: 0,
    thumbnailUrl: null,
    activeTests: 0,
    totalTests: 0,
  });
  return id;
}

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

export type CalendarEvent = {
  id: string;
  date: string; // "YYYY-MM-DD"
  type: "upload" | "deadline" | "completed";
  title: string;
  channelId: string;
  channelName: string;
  hasTest: boolean;
};

export const mockCalendarEvents: CalendarEvent[] = [
  // 게임왕 채널 (ch_1)
  { id: "ev_g1", date: "2026-05-18", type: "upload",    title: "롤 시즌 14 격변 리뷰 — 진짜 바뀐 거 맞냐고?",       channelId: "ch_1", channelName: "게임왕 채널",     hasTest: true  },
  { id: "ev_g2", date: "2026-05-22", type: "deadline",  title: "롤 시즌 14 썸네일 테스트 마감",                     channelId: "ch_1", channelName: "게임왕 채널",     hasTest: true  },
  { id: "ev_g3", date: "2026-05-26", type: "upload",    title: "월간 인기 게임 TOP10 (2026년 5월)",                 channelId: "ch_1", channelName: "게임왕 채널",     hasTest: false },
  { id: "ev_g4", date: "2026-05-30", type: "deadline",  title: "6월 기획 썸네일 테스트 마감",                       channelId: "ch_1", channelName: "게임왕 채널",     hasTest: false },
  { id: "ev_g5", date: "2026-06-04", type: "upload",    title: "리그 오브 레전드 신챔피언 첫인상 솔직 리뷰",         channelId: "ch_1", channelName: "게임왕 채널",     hasTest: false },

  // 뷰티 by 소연 (ch_2)
  { id: "ev_b1", date: "2026-05-19", type: "deadline",  title: "가을 감성 메이크업 썸네일 테스트 마감",              channelId: "ch_2", channelName: "뷰티 by 소연",   hasTest: true  },
  { id: "ev_b2", date: "2026-05-23", type: "upload",    title: "가을 감성 메이크업 루틴 — 3분 완성",                channelId: "ch_2", channelName: "뷰티 by 소연",   hasTest: true  },
  { id: "ev_b3", date: "2026-05-27", type: "upload",    title: "초보자도 따라하는 입술 메이크업 튜토리얼",           channelId: "ch_2", channelName: "뷰티 by 소연",   hasTest: false },
  { id: "ev_b4", date: "2026-06-02", type: "upload",    title: "2026 봄 색조 트렌드 총정리",                        channelId: "ch_2", channelName: "뷰티 by 소연",   hasTest: false },

  // 테크리뷰 마스터 (ch_3)
  { id: "ev_t1", date: "2026-05-21", type: "upload",    title: "M4 맥북 프로 언박싱 & 실사용 리뷰",                 channelId: "ch_3", channelName: "테크리뷰 마스터", hasTest: false },
  { id: "ev_t2", date: "2026-05-27", type: "completed", title: "테크 썸네일 A/B 테스트 완료",                       channelId: "ch_3", channelName: "테크리뷰 마스터", hasTest: false },
  { id: "ev_t3", date: "2026-06-01", type: "upload",    title: "갤럭시 S25 vs 아이폰 16 — 뭘 사야 할까?",           channelId: "ch_3", channelName: "테크리뷰 마스터", hasTest: false },
  { id: "ev_t4", date: "2026-06-07", type: "upload",    title: "2026년 가성비 노트북 추천 TOP5",                    channelId: "ch_3", channelName: "테크리뷰 마스터", hasTest: false },

  // 맛있는 하루 (ch_4)
  { id: "ev_f1", date: "2026-05-20", type: "completed", title: "간장게장 레시피 썸네일 테스트 완료",                channelId: "ch_4", channelName: "맛있는 하루",    hasTest: true  },
  { id: "ev_f2", date: "2026-05-24", type: "upload",    title: "간장게장 황금 레시피 — 밥 세 공기 뚝딱",            channelId: "ch_4", channelName: "맛있는 하루",    hasTest: true  },
  { id: "ev_f3", date: "2026-05-29", type: "upload",    title: "냉장고 파먹기 — 10분 만에 완성하는 한 끼",          channelId: "ch_4", channelName: "맛있는 하루",    hasTest: false },
  { id: "ev_f4", date: "2026-06-05", type: "upload",    title: "편의점 재료로 만드는 즉석 라볶이",                  channelId: "ch_4", channelName: "맛있는 하루",    hasTest: false },

  // 교육왕 TV (ch_5)
  { id: "ev_e1", date: "2026-05-22", type: "upload",    title: "수능 국어 1등급 비법 — 현역 강사가 알려드립니다",    channelId: "ch_5", channelName: "교육왕 TV",      hasTest: false },
  { id: "ev_e2", date: "2026-05-28", type: "upload",    title: "중학생 수학 핵심 개념 완전 정리",                   channelId: "ch_5", channelName: "교육왕 TV",      hasTest: false },
  { id: "ev_e3", date: "2026-06-04", type: "upload",    title: "영어 회화 30일 완성 — 하루 10분 프로그램",          channelId: "ch_5", channelName: "교육왕 TV",      hasTest: false },
];

export const mockChannelInsights: Record<string, {
  recommendations: string[];
  bestTestTitle: string;
  bestCTR: string;
}> = {
  ch_1: {
    recommendations: [
      "이 채널 시청자는 **인물 등장 + 좌상단 텍스트 + 놀란 표정** 조합에 가장 강하게 반응합니다.",
      "**고채도·원색 계열** 배경이 저채도 대비 평균 1.7배 높은 CTR을 보입니다.",
      "텍스트는 **2~3단어 핵심 키워드**만 사용할 때 클릭률이 높습니다.",
      "**10~20대 남성** 타깃 영상은 놀란 표정이 가장 효과적입니다.",
    ],
    bestTestTitle: "롤 월드컵 결승 예측",
    bestCTR: "76.4%",
  },
  ch_2: {
    recommendations: [
      "이 채널 시청자는 **클로즈업 얼굴 + 비포/애프터 구성**에 가장 강하게 반응합니다.",
      "**파스텔·따뜻한 색감** 배경이 차가운 색감 대비 평균 1.5배 높은 CTR을 보입니다.",
      "텍스트에 **'쉬운', '초보'** 등 접근성 키워드 포함 시 클릭률이 높습니다.",
      "**20~30대 여성** 타깃은 실물 착용 이미지가 정보형 레이아웃보다 효과적입니다.",
    ],
    bestTestTitle: "봄 데일리 메이크업 루틴",
    bestCTR: "71.8%",
  },
  ch_3: {
    recommendations: [
      "이 채널 시청자는 **제품 클로즈업 + 스펙 수치 강조** 조합에 가장 강하게 반응합니다.",
      "**어두운 배경에 밝은 제품** 이미지가 평균 1.6배 높은 CTR을 보입니다.",
      "텍스트에 **모델명·수치** 포함 시 신뢰도가 높아져 클릭률이 상승합니다.",
      "**20~40대 남성** 타깃은 비교형 구성('A vs B')이 단독 제품보다 효과적입니다.",
    ],
    bestTestTitle: "갤럭시 S24 울트라 완전 분석",
    bestCTR: "68.9%",
  },
  ch_4: {
    recommendations: [
      "이 채널 시청자는 **완성된 음식 클로즈업 + 따뜻한 색감** 조합에 가장 강하게 반응합니다.",
      "**김 오르는 음식·단면 컷** 이미지가 재료 나열보다 평균 1.8배 높은 CTR을 보입니다.",
      "텍스트에 **'황금 레시피', '꿀맛'** 등 감탄형 키워드 포함 시 클릭률이 높습니다.",
      "**30~50대** 타깃은 요리 과정보다 최종 완성 이미지가 훨씬 효과적입니다.",
    ],
    bestTestTitle: "떡볶이 황금 레시피 공개",
    bestCTR: "73.2%",
  },
  ch_5: {
    recommendations: [
      "이 채널 시청자는 **강사 얼굴 + 핵심 키워드 대형 텍스트** 조합에 가장 강하게 반응합니다.",
      "**깔끔한 흰 배경 또는 칠판 배경**이 복잡한 배경 대비 평균 1.4배 높은 CTR을 보입니다.",
      "텍스트에 **'1등급', '완성', '비법'** 등 결과 중심 키워드 포함 시 클릭률이 높습니다.",
      "**10~20대** 타깃은 숫자 포함 제목('30일 완성', 'TOP5')이 서술형보다 효과적입니다.",
    ],
    bestTestTitle: "수능 수학 만점 전략",
    bestCTR: "65.7%",
  },
};
