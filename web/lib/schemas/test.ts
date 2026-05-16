import { z } from "zod";

export const TestCreateSchema = z.object({
  channelId: z.string().cuid(),
  title: z.string().min(1).max(200),
  scheduledUploadDate: z.date().optional(),
  thumbnails: z.array(z.object({
    label: z.enum(["A", "B", "C", "D"]),
    fileUrl: z.string().url(),
    note: z.string().max(200).optional(),
  })).min(2).max(4),
  audience: z.object({
    genders: z.array(z.enum(["M", "F"])).min(1),
    ageGroups: z.array(z.enum(["10s", "20s", "30s", "40s", "50s+"])).min(1),
    categories: z.array(z.string()).min(1),
  }),
  endCondition: z.discriminatedUnion("type", [
    z.object({ type: z.literal("MANUAL") }),
    z.object({ type: z.literal("VOTE_COUNT"), target: z.number().int().min(50).max(5000) }),
    z.object({ type: z.literal("DURATION"), hours: z.number().int().min(1).max(720) }),
    z.object({
      type: z.literal("FIRST_OF"),
      target: z.number().int().min(50),
      hours: z.number().int().min(1),
    }),
  ]),
});

export const VoteSubmitSchema = z.object({
  testId: z.string().cuid(),
  thumbnailId: z.string().cuid(),
  testerId: z.string(),
  dwellTime: z.number().int().positive().optional(),
});

export type TestCreate = z.infer<typeof TestCreateSchema>;
export type VoteSubmit = z.infer<typeof VoteSubmitSchema>;

export const TEST_STATUS_LABELS: Record<string, string> = {
  PENDING: "대기 중",
  ACTIVE: "진행 중",
  COMPLETED: "완료",
  CANCELLED: "취소됨",
};

export const TEST_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACTIVE: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

export const END_CONDITION_LABELS: Record<string, string> = {
  MANUAL: "수동 종료",
  VOTE_COUNT: "투표 수 도달 시",
  DURATION: "기간 경과 시",
  FIRST_OF: "먼저 도달하는 조건",
};
