import { ArrowDownRight, ArrowUpRight, Gift, Landmark, Wallet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getCoins } from "@/lib/api-client";
import { cn, formatCoins } from "@/lib/utils";

export default async function CoinsPage() {
  const coins = await getCoins();
  const canWithdraw = coins.balance >= coins.withdrawMin;

  return (
    <AppShell>
      <PageHeader subtitle="적립 내역과 출금 옵션" title="코인" />

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-6 text-white">
          <p className="text-sm text-white/85">보유 코인</p>
          <p className="mt-2 text-5xl font-black tracking-tight">
            {formatCoins(coins.balance)}
          </p>
          <p className="mt-1 text-sm text-white/85">{formatCoins(coins.balance)}원 상당</p>
          <button
            className="mt-6 min-h-12 w-full rounded-xl bg-white px-4 text-sm font-black text-orange-600 disabled:text-gray-400"
            disabled={!canWithdraw}
            type="button"
          >
            {canWithdraw
              ? "출금 신청하기"
              : `${formatCoins(coins.withdrawMin)} 코인부터 출금 가능`}
          </button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 px-4 pt-6">
        {[
          ["오늘", coins.todayEarned, "green"],
          ["이번 주", coins.weekEarned, "blue"],
          ["이번 달", coins.monthEarned, "violet"]
        ].map(([label, value, tone]) => (
          <div
            className={cn(
              "rounded-xl border p-3 text-center",
              tone === "green" && "border-green-100 bg-green-50 text-green-700",
              tone === "blue" && "border-blue-100 bg-blue-50 text-blue-700",
              tone === "violet" && "border-violet-100 bg-violet-50 text-violet-700"
            )}
            key={label}
          >
            <p className="text-lg font-black">+{formatCoins(Number(value))}</p>
            <p className="mt-1 text-xs font-semibold">{label}</p>
          </div>
        ))}
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">출금 옵션</h2>
        <div className="space-y-2">
          {[
            {
              title: "계좌 이체",
              desc: "수수료 100원 · KYC 1회",
              icon: Landmark,
              color: "text-blue-600 bg-blue-100"
            },
            {
              title: "기프티콘",
              desc: "편의점·카페 5천원권부터",
              icon: Gift,
              color: "text-violet-600 bg-violet-100"
            },
            {
              title: "포인트 전환",
              desc: "카카오페이·네이버페이",
              icon: Wallet,
              color: "text-yellow-700 bg-yellow-100"
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                key={item.title}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-full p-2", item.color)}>
                    <Icon aria-hidden className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-950">{item.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-500">5,000원권</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">적립 내역</h2>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-xl bg-gray-50">
          {coins.transactions.map((transaction) => {
            const isPositive = transaction.amount >= 0;
            const Icon = isPositive ? ArrowDownRight : ArrowUpRight;
            return (
              <div className="flex items-center justify-between p-4" key={transaction.id}>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}
                  >
                    <Icon aria-hidden className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-950">{transaction.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {transaction.reason} · {transaction.createdAt}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-black",
                    isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
          <p className="text-sm font-bold">출금 안내</p>
          <p className="mt-2 text-xs leading-5">
            출금은 5,000코인부터 가능하며, 신청 후 KYC 본인 확인을 거쳐 영업일 기준 3일 내 처리됩니다.
            C 등급 사용자는 일 출금 한도가 축소될 수 있습니다.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
