import { NextRequest, NextResponse } from "next/server";
import { VoteSubmitSchema } from "@/lib/schemas/test";

/**
 * Mobile app endpoint — submit a vote for a thumbnail.
 * POST /api/votes
 * Body: { testId, thumbnailId, testerId, dwellTime? }
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = VoteSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const { testId, thumbnailId, testerId, dwellTime } = parsed.data;

  // TODO (in a DB transaction):
  // 1. Check test is ACTIVE
  // 2. Check tester hasn't voted yet (unique constraint on testId + testerId)
  // 3. Insert vote
  // 4. Increment thumbnail.voteCount and test.totalVotes
  // 5. If endCondition met → trigger auto-end worker

  return NextResponse.json({ message: "Vote recorded", testId, thumbnailId }, { status: 201 });
}
