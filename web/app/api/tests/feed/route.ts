import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const FeedQuerySchema = z.object({
  testerId: z.string().min(1),
  gender: z.enum(["M", "F"]).optional(),
  ageGroup: z.enum(["10s", "20s", "30s", "40s", "50s+"]).optional(),
  categories: z.string().optional(), // comma-separated
  limit: z.string().transform(Number).pipe(z.number().min(1).max(20)).optional(),
  cursor: z.string().optional(),
});

/**
 * Mobile app endpoint — returns active tests matching the tester's profile.
 * GET /api/tests/feed?testerId=xxx&gender=M&ageGroup=20s&categories=GAMING,TECH
 */
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = FeedQuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query params", details: parsed.error.flatten() }, { status: 400 });
  }

  const { testerId, gender, ageGroup, categories, limit = 10, cursor } = parsed.data;

  // TODO: query active tests where audience matches tester profile
  // and tester has not already voted on the test
  const feed: object[] = [];

  return NextResponse.json({
    tests: feed,
    nextCursor: null,
    total: 0,
  });
}
