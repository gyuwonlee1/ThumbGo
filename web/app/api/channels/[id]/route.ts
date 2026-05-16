import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: fetch channel + stats from DB
  return NextResponse.json({ id, message: "Channel detail placeholder" });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: check for active tests before deleting
  return NextResponse.json({ message: `Channel ${id} deleted` });
}
