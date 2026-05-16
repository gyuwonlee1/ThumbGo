import { describe, expect, it } from "vitest";
import {
  TesterProfileSchema,
  VoteSubmitSchema,
  WithdrawRequestSchema
} from "../lib/schemas";

describe("TesterProfileSchema", () => {
  const validProfile = {
    nickname: "테스터23",
    gender: "UNDISCLOSED",
    birthYear: 1998,
    categories: ["게임", "푸드", "IT·테크"],
    dailyWatchTime: "~2h",
    device: "MOBILE"
  };

  it("blocks users under 14 years old", () => {
    const currentYear = new Date().getFullYear();
    const result = TesterProfileSchema.safeParse({
      ...validProfile,
      birthYear: currentYear - 12
    });

    expect(result.success).toBe(false);
  });

  it("requires at least 3 categories", () => {
    const result = TesterProfileSchema.safeParse({
      ...validProfile,
      categories: ["게임", "푸드"]
    });

    expect(result.success).toBe(false);
  });

  it("allows no more than 5 categories", () => {
    const result = TesterProfileSchema.safeParse({
      ...validProfile,
      categories: ["게임", "푸드", "IT·테크", "뷰티", "음악", "스포츠"]
    });

    expect(result.success).toBe(false);
  });
});

describe("VoteSubmitSchema", () => {
  const validVote = {
    testId: "cltest000000000000000001",
    testerId: "cltester000000000000000001",
    chosenThumbnailId: "clthumb000000000000000001",
    responseTimeMs: 4210,
    tapPosition: { x: 120, y: 360 },
    thumbnailOrder: ["clthumb000000000000000001", "clthumb000000000000000002"],
    appSessionId: "a8d95e2a-82d7-4b15-9d15-d0e26ef477c8",
    deviceFingerprint: "web-fixture",
    clientTimestamp: "2026-05-16T02:30:00.000Z"
  };

  it("accepts a complete vote payload", () => {
    expect(VoteSubmitSchema.safeParse(validVote).success).toBe(true);
  });

  it("rejects missing response time", () => {
    const { responseTimeMs: _responseTimeMs, ...payload } = validVote;

    expect(VoteSubmitSchema.safeParse(payload).success).toBe(false);
  });
});

describe("WithdrawRequestSchema", () => {
  it("requires at least 5,000 coins", () => {
    expect(
      WithdrawRequestSchema.safeParse({ method: "BANK", amount: 4999 }).success
    ).toBe(false);
  });
});
