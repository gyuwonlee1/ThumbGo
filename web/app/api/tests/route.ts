import { NextRequest, NextResponse } from "next/server";
import { TestCreateSchema } from "@/lib/schemas/test";

export async function POST(req: NextRequest) {
  const agencyId = req.headers.get("x-agency-id");
  if (!agencyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = TestCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: create test + audience + thumbnails in DB (transaction)
  return NextResponse.json({ message: "Test created", testId: "new_test_id" }, { status: 201 });
}
