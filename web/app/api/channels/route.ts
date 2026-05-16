import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChannelCreateSchema } from "@/lib/schemas/channel";

export async function GET(req: NextRequest) {
  const agencyId = req.headers.get("x-agency-id");
  if (!agencyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: fetch from DB via Prisma
  // const channels = await db.channel.findMany({ where: { agencyId } });
  return NextResponse.json({ channels: [], total: 0 });
}

export async function POST(req: NextRequest) {
  const agencyId = req.headers.get("x-agency-id");
  if (!agencyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = ChannelCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: create in DB
  return NextResponse.json({ message: "Channel created" }, { status: 201 });
}
