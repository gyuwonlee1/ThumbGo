import { z } from "zod";

export const ChannelCategoryEnum = z.enum([
  "GAMING", "BEAUTY", "FOOD", "VLOG", "EDUCATION",
  "TECH", "KIDS", "MUSIC", "SPORTS", "ENTERTAINMENT", "ETC"
]);

export const ChannelSchema = z.object({
  id: z.string().cuid(),
  agencyId: z.string().cuid(),
  youtubeChannelId: z.string().optional(),
  name: z.string().min(1).max(100),
  category: ChannelCategoryEnum,
  subscriberCount: z.number().int().nonnegative(),
  avgViewCount: z.number().int().nonnegative(),
  thumbnailUrl: z.string().url().optional(),
  description: z.string().max(500).optional(),
  createdAt: z.date(),
});

export const ChannelCreateSchema = ChannelSchema.omit({
  id: true,
  agencyId: true,
  createdAt: true,
});

export type Channel = z.infer<typeof ChannelSchema>;
export type ChannelCreate = z.infer<typeof ChannelCreateSchema>;

export const CATEGORY_LABELS: Record<string, string> = {
  GAMING: "게임",
  BEAUTY: "뷰티",
  FOOD: "음식",
  VLOG: "브이로그",
  EDUCATION: "교육",
  TECH: "테크",
  KIDS: "키즈",
  MUSIC: "음악",
  SPORTS: "스포츠",
  ENTERTAINMENT: "엔터테인먼트",
  ETC: "기타",
};

export const CATEGORY_COLORS: Record<string, string> = {
  GAMING: "bg-purple-100 text-purple-700",
  BEAUTY: "bg-pink-100 text-pink-700",
  FOOD: "bg-orange-100 text-orange-700",
  VLOG: "bg-yellow-100 text-yellow-700",
  EDUCATION: "bg-blue-100 text-blue-700",
  TECH: "bg-cyan-100 text-cyan-700",
  KIDS: "bg-green-100 text-green-700",
  MUSIC: "bg-indigo-100 text-indigo-700",
  SPORTS: "bg-red-100 text-red-700",
  ENTERTAINMENT: "bg-rose-100 text-rose-700",
  ETC: "bg-gray-100 text-gray-700",
};
