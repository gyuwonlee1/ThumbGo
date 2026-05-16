import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  Star
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { homeSummary } from "@/lib/fixtures";

export default function ProfilePage() {
  const menuItems = [
    { icon: Settings, label: "프로필 수정" },
    { icon: Star, label: "관심 카테고리 재설정" },
    { icon: Bell, label: "알림 설정" },
    { icon: HelpCircle, label: "문의하기" },
    { icon: Shield, label: "개인정보 처리방침" }
  ];

  return (
    <AppShell>
      <PageHeader subtitle="내 정보와 앱 설정" title="프로필" />

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-white/20 text-2xl font-black">
              썸
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-black">{homeSummary.nickname}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-white/20 px-2 py-1">
                  등급 {homeSummary.grade}
                </span>
                <span className="rounded bg-white/20 px-2 py-1">
                  {homeSummary.hitRate}% 적중률
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/20 pt-4 text-center">
            <div>
              <p className="text-2xl font-black">{homeSummary.totalVotes}</p>
              <p className="mt-1 text-xs text-white/80">응답 수</p>
            </div>
            <div>
              <p className="text-2xl font-black">{homeSummary.streakDays}일</p>
              <p className="mt-1 text-xs text-white/80">연속 출석</p>
            </div>
            <div>
              <p className="text-2xl font-black">12</p>
              <p className="mt-1 text-xs text-white/80">초대 친구</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-sm font-bold text-gray-500">계정 정보</h2>
        <div className="space-y-3 rounded-xl bg-gray-50 p-4">
          {[
            ["성별", "응답 안 함"],
            ["연령대", "20대"],
            ["가입일", "2026.05.16"]
          ].map(([label, value]) => (
            <div className="flex justify-between gap-4" key={label}>
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-bold text-gray-950">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-sm font-bold text-gray-500">시청 성향</h2>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold text-gray-500">자주 보는 카테고리</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["게임", "푸드", "IT·테크", "뷰티", "엔터·예능"].map((category) => (
              <span
                className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">하루 시청 시간</span>
              <span className="text-xs font-bold text-gray-950">2시간</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">주 사용 기기</span>
              <span className="text-xs font-bold text-gray-950">모바일</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className="flex min-h-14 w-full items-center justify-between px-4 text-left hover:bg-gray-50"
                key={item.label}
                type="button"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-gray-900">
                  <Icon aria-hidden className="size-5 text-gray-500" />
                  {item.label}
                </span>
                <ChevronRight aria-hidden className="size-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-950">내 추천 코드</p>
            <button className="text-xs font-black text-red-600" type="button">
              복사
            </button>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-gray-950">
            {homeSummary.referralCode}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-600">
            친구가 첫 응답을 완료하면 친구와 나에게 각각 500코인이 지급됩니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-6 text-center">
        <button
          className="inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-600"
          type="button"
        >
          <LogOut aria-hidden className="size-4" />
          로그아웃
        </button>
        <p className="mt-3 text-xs text-gray-400">ThumbLab Tester v1.0.0</p>
      </section>
    </AppShell>
  );
}
