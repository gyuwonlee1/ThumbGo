import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "썸네일고수 for Agencies — 썸네일 사전 검증 SaaS",
  description: "영상 업로드 전, 실제 시청자 풀로 썸네일 클릭률을 사전 검증하세요.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
