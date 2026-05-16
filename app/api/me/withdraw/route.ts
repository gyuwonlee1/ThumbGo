import { NextResponse } from "next/server";
import { WithdrawRequestSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = WithdrawRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_WITHDRAW_REQUEST", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    accepted: true,
    status: "PENDING_KYC"
  });
}
