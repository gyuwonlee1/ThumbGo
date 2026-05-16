import { NextResponse } from "next/server";
import { testFeed } from "@/lib/fixtures";

export async function GET() {
  return NextResponse.json(testFeed);
}
