import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: fetch test with thumbnails, votes, audience from DB
  return NextResponse.json({ id, status: "ACTIVE", totalVotes: 0, thumbnails: [] });
}
