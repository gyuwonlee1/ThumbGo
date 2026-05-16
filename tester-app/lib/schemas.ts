import { z } from "zod";

export const ViewerCategories = [
  "게임",
  "뷰티",
  "음식",
  "브이로그",
  "교육",
  "테크",
  "키즈",
  "음악",
  "스포츠",
  "엔터테인먼트"
] as const;

export const TesterProfileSchema = z.object({
  nickname: z.string().min(2).max(20),
  gender: z.enum(["M", "F", "UNDISCLOSED"]),
  birthYear: z
    .number()
    .int()
    .min(1940)
    .max(new Date().getFullYear() - 13),
  categories: z.array(z.string()).min(3).max(5),
});

export const VoteSubmitSchema = z.object({
  testId: z.string(),
  testerId: z.string().optional(),
  chosenThumbnailId: z.string(),
  responseTimeMs: z.number().int().positive(),
  tapPosition: z.object({ x: z.number(), y: z.number() }),
  thumbnailOrder: z.array(z.string()),
  appSessionId: z.string().uuid(),
  deviceFingerprint: z.string(),
  clientTimestamp: z.string().datetime()
});

export const WithdrawRequestSchema = z.object({
  method: z.enum(["BANK", "GIFTICON", "KAKAOPAY", "NAVERPAY"]),
  amount: z.number().int().min(5000),
  accountHolder: z.string().min(2).optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
});

export const NotificationPreferenceSchema = z.object({
  pushMode: z.enum(["INSTANT", "DAILY_SUMMARY", "OFF"]),
  marketingConsent: z.boolean()
});

export type TesterProfileInput = z.infer<typeof TesterProfileSchema>;
export type VoteSubmitInput = z.infer<typeof VoteSubmitSchema>;
export type WithdrawRequestInput = z.infer<typeof WithdrawRequestSchema>;
export type NotificationPreferenceInput = z.infer<
  typeof NotificationPreferenceSchema
>;
