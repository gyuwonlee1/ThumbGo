import { NextResponse } from "next/server";
import { TesterProfileSchema } from "@/lib/schemas";
import { testerId } from "@/lib/fixtures";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = TesterProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PROFILE", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({ saved: true, testerId });
}
