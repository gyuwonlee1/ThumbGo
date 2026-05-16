import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // TODO: aggregate completed test data for this channel
  // and return element win rates, trend data, etc.
  return NextResponse.json({
    channelId: id,
    testCount: 0,
    periodDays: 90,
    elementWinRates: {},
    recommendations: [],
  });
}
