import { NextResponse } from "next/server";
import { scorecard } from "@/lib/fixtures";

export async function GET() {
  return NextResponse.json(scorecard);
}
