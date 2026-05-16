import {
  coinSummary,
  homeSummary,
  scorecard,
  testFeed,
  testerId
} from "./fixtures";
import {
  TesterProfileSchema,
  VoteSubmitSchema,
  WithdrawRequestSchema,
  type TesterProfileInput,
  type VoteSubmitInput,
  type WithdrawRequestInput
} from "./schemas";

async function fetchJson<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const response = await fetch(path, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...init?.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getHomeSummary() {
  return homeSummary;
}

export async function getTestFeed() {
  return fetchJson("/api/tests/feed", testFeed);
}

export async function submitVote(payload: VoteSubmitInput) {
  const parsed = VoteSubmitSchema.parse(payload);
  return fetchJson(
    "/api/votes",
    { accepted: true, awardedCoins: 5, voteId: "fixture-vote" },
    {
      method: "POST",
      body: JSON.stringify(parsed)
    }
  );
}

export async function getCoins() {
  return fetchJson("/api/me/coins", coinSummary);
}

export async function requestWithdraw(payload: WithdrawRequestInput) {
  const parsed = WithdrawRequestSchema.parse(payload);
  return fetchJson(
    "/api/me/withdraw",
    { accepted: true, status: "PENDING_KYC" },
    {
      method: "POST",
      body: JSON.stringify(parsed)
    }
  );
}

export async function getScorecard() {
  return fetchJson("/api/me/scorecard", scorecard);
}

export async function saveProfile(payload: TesterProfileInput) {
  const parsed = TesterProfileSchema.parse(payload);
  return fetchJson(
    "/api/me/profile",
    { saved: true, testerId },
    {
      method: "POST",
      body: JSON.stringify(parsed)
    }
  );
}
