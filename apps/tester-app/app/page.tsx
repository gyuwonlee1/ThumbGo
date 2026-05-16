import Link from "next/link";
import { Bell, Gift, Sparkles, TrendingUp, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getHomeSummary } from "@/lib/api-client";
import { formatCoins } from "@/lib/utils";

export default async function HomePage() {
  const summary = await getHomeSummary();

  return (
    <AppShell>
      <PageHeader
        action={<Gift aria-hidden className="size-6 text-gray-700" />}
        subtitle={summary.activeUsersLabel}
        title="ThumbGo"
      />

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white shadow-lg shadow-red-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/85">보유 코인</p>
              <p className="mt-1 text-4xl font-black tracking-tight">
                {formatCoins(summary.coinBalance)}
              </p>
            </div>
            <div className="rounded-full bg-white/20 p-3">
              <Sparkles aria-hidden className="size-8" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/20 pt-4 text-sm">
            <div>
              <p className="text-white/75">오늘 적립</p>
              <p className="font-bold">+{summary.todayEarned} 코인</p>
            </div>
            <div>
              <p className="text-white/75">신뢰도</p>
              <p className="font-bold">
                등급 {summary.grade} ({summary.hitRate}%)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-950">오늘의 테스트</h2>
          <span className="text-sm font-semibold text-red-600">
            {summary.todayTests}개 대기 중
          </span>
        </div>
        <Link
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-4 text-base font-bold text-white shadow-md shadow-red-100 active:scale-[0.98]"
          href="/test"
        >
          테스트 시작하기
        </Link>
      </section>

      <section className="grid grid-cols-3 gap-3 px-4 pt-6">
        {[
          ["오늘 응답", "47"],
          ["적중률", `${summary.hitRate}%`],
          ["누적 응답", `${summary.totalVotes}`]
        ].map(([label, value]) => (
          <div className="rounded-xl bg-gray-50 p-4 text-center" key={label}>
            <p className="text-2xl font-black text-gray-950">{value}</p>
            <p className="mt-1 text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">출석 보상</h2>
        <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-gray-950">
                연속 출석 {summary.streakDays}일째
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                7일 연속 출석하면 +500 코인 보너스를 받을 수 있어요.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-gray-950">
              {summary.streakDays}/7
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-gray-950">
                친구 초대하고 500 코인 받기
              </p>
              <p className="mt-1 text-xs text-gray-500">
                추천 코드: {summary.referralCode}
              </p>
            </div>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">
              공유
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3 px-4 py-6">
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-950">
          <Bell aria-hidden className="size-5 shrink-0" />
          <p className="text-sm font-semibold">새 테스트 도착 알림을 켜면 놓치지 않아요.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-gray-800">
          <Users aria-hidden className="size-5 shrink-0" />
          <p className="text-sm font-semibold">{summary.activeUsersLabel}</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-800">
          <TrendingUp aria-hidden className="size-5 shrink-0" />
          <p className="text-sm font-semibold">정직한 응답일수록 보너스 확률이 올라가요.</p>
        </div>
      </section>
    </AppShell>
  );
}
