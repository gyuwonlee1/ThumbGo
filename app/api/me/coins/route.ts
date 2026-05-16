import { NextResponse } from "next/server";
import { coinSummary } from "@/lib/fixtures";

export async function GET() {
  return NextResponse.json(coinSummary);
}
