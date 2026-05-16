import { NextRequest, NextResponse } from "next/server";

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: set test status to COMPLETED, set endedAt, aggregate final results
  return NextResponse.json({ message: `Test ${id} ended`, endedAt: new Date().toISOString() });
}
