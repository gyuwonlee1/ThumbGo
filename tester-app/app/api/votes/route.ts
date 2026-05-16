import { NextResponse } from "next/server";
import { VoteSubmitSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = VoteSubmitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_VOTE", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    accepted: true,
    awardedCoins: 5,
    voteId: "fixture-vote"
  });
}
