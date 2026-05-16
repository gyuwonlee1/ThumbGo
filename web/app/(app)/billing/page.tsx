"use client";

import { useState } from "react";
import {
  CheckCircle2, CreditCard, Zap, TrendingUp,
  AlertTriangle, Plus, ArrowUpRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ── mock: 현재 에이전시 상태 ──────────────────────────────
const CURRENT_PLAN = "STARTER";
const CREDIT_BALANCE = 11;          // 현재 잔액
const MONTHLY_ALLOWANCE = 16;       // 플랜 월 지급량
const CARRYOVER_MAX = 32;           // 이월 한도
const NEXT_RENEWAL = "2026-06-16";  // 다음 갱신일
const CREDIT_USED_THIS_MONTH = 5;   // 이번달 사용량

const PLANS = [
  {
    id: "FREE",
    name: "Free",
    price: 0,
    priceSub: "",
    monthlyCredits: null,
    oneTimeCredits: 10,
    carryoverMax: 0,
    addonPrice: null,
    channels: 2,
    seats: 1,
    features: [
      "일회성 10 크레딧 (5+2+3 점진 지급)",
      "채널 2개",
      "팀 멤버 1명",
      "시안 2~3개",
      "기본 필터 (성별/연령)",
      "AI 분석 5요소",
    ],
    badge: null,
    color: "border-slate-200",
  },
  {
    id: "STARTER",
    name: "Starter",
    price: 190000,
    priceSub: "/월",
    monthlyCredits: 16,
    oneTimeCredits: null,
    carryoverMax: 32,
    addonPrice: 13000,
    channels: 10,
    seats: 3,
    features: [
      "매월 16 크레딧 자동 지급",
      "미사용 최대 32 크레딧 이월",
      "추가 크레딧 ₩13,000/개",
      "채널 10개",
      "팀 멤버 3명",
      "시안 2~4개",
      "AI 분석 8요소 + 채널 인사이트",
      "우선 지원",
    ],
    badge: "현재 플랜",
    color: "border-indigo-500",
  },
  {
    id: "PRO",
    name: "Pro",
    price: 490000,
    priceSub: "/월",
    monthlyCredits: 48,
    oneTimeCredits: null,
    carryoverMax: 96,
    addonPrice: 11000,
    channels: 999,
    seats: 999,
    features: [
      "매월 48 크레딧 자동 지급",
      "미사용 최대 96 크레딧 이월",
      "추가 크레딧 ₩11,000/개",
      "채널 무제한",
      "팀 멤버 무제한",
      "시안 2~6개",
      "채널 누적 인사이트 + API 액세스",
      "우선 패널링 · 전담 매니저",
    ],
    badge: "추천",
    color: "border-purple-300",
  },
];

const INVOICES = [
  { date: "2026-05-16", item: "Starter 구독", amount: 190000, status: "PAID" },
  { date: "2026-04-16", item: "Starter 구독", amount: 190000, status: "PAID" },
  { date: "2026-03-16", item: "Starter 구독", amount: 190000, status: "PAID" },
];

const USAGE_BY_CHANNEL = [
  { name: "게임왕 채널", tests: 3, credits: 3 },
  { name: "뷰티 by 소연", tests: 2, credits: 2 },
];

const ADDON_AMOUNTS = [1, 5, 10, 20];

export default function BillingPage() {
  const [addonQty, setAddonQty] = useState(5);
  const currentPlan = PLANS.find((p) => p.id === CURRENT_PLAN)!;
  const addonPrice = currentPlan.addonPrice ?? 0;
  const totalCreditsUsed = USAGE_BY_CHANNEL.reduce((s, c) => s + c.credits, 0);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="요금제 · 결제" description="구독 플랜 및 크레딧 관리" />
      <main className="flex-1 p-6 space-y-6">

        {/* Current Status */}
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              label: "현재 플랜",
              value: currentPlan.name,
              sub: `₩${currentPlan.price.toLocaleString()}/월`,
              accent: "text-indigo-600",
            },
            {
              label: "크레딧 잔액",
              value: `${CREDIT_BALANCE} 크레딧`,
              sub: `월 지급 ${MONTHLY_ALLOWANCE}개 · 이월 최대 ${CARRYOVER_MAX}개`,
              accent: CREDIT_BALANCE <= 3 ? "text-amber-600" : "text-slate-900",
            },
            {
              label: "이번달 사용",
              value: `${CREDIT_USED_THIS_MONTH} 크레딧`,
              sub: `잔여 ${CREDIT_BALANCE}개`,
              accent: "text-slate-900",
            },
            {
              label: "다음 갱신일",
              value: NEXT_RENEWAL,
              sub: "자동 결제 · 이월 적용",
              accent: "text-slate-900",
            },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-5">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className={cn("text-xl font-black mt-1", item.accent)}>{item.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left col: Plans + Addon */}
          <div className="col-span-2 space-y-5">

            {/* Plan Comparison */}
            <h2 className="text-sm font-semibold text-slate-700">구독 플랜</h2>
            <div className="grid grid-cols-3 gap-3">
              {PLANS.map((plan) => {
                const isCurrent = plan.id === CURRENT_PLAN;
                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "rounded-xl border-2 p-4 transition-all",
                      isCurrent
                        ? "border-indigo-500 bg-indigo-50"
                        : plan.color + " bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-slate-900">{plan.name}</p>
                      {plan.badge && (
                        <Badge
                          variant={isCurrent ? "active" : "default"}
                          className="text-[10px]"
                        >
                          {plan.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      {plan.price === 0 ? "무료" : `₩${plan.price.toLocaleString()}`}
                      {plan.priceSub && (
                        <span className="text-xs font-normal text-slate-400 ml-0.5">{plan.priceSub}</span>
                      )}
                    </p>

                    {/* Credit info */}
                    <div className="mt-3 mb-3 rounded-lg bg-white border border-slate-100 p-2.5 text-xs space-y-1">
                      {plan.monthlyCredits ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-500">월 지급</span>
                            <span className="font-bold text-slate-900">{plan.monthlyCredits} 크레딧</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">이월 한도</span>
                            <span className="font-bold text-slate-900">최대 {plan.carryoverMax}개</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">추가 구매</span>
                            <span className="font-bold text-slate-900">₩{plan.addonPrice!.toLocaleString()}/개</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <span className="text-slate-500">일회성 지급</span>
                          <span className="font-bold text-slate-900">최대 10 크레딧</span>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {!isCurrent && (
                      <Button
                        size="sm"
                        className="w-full mt-4"
                        variant={plan.id === "PRO" ? "default" : "outline"}
                      >
                        {plan.id === "FREE" ? "다운그레이드" : (
                          <>
                            업그레이드
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Enterprise */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Enterprise</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  채널 무제한 · 크레딧 무제한 · 전담 매니저 + SLA · 커스텀 페르소나 합성
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                별도 문의
              </Button>
            </div>

            {/* Addon Credits */}
            {currentPlan.addonPrice && (
              <>
                <h2 className="text-sm font-semibold text-slate-700 pt-1">추가 크레딧 구매</h2>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <p className="text-xs text-slate-600">
                        현재 플랜(Starter) 추가 크레딧 단가: <span className="font-bold">₩{addonPrice.toLocaleString()}/개</span>
                        <span className="text-slate-400 ml-2">Pro 업그레이드 시 ₩11,000/개</span>
                      </p>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {ADDON_AMOUNTS.map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setAddonQty(qty)}
                          className={cn(
                            "flex-1 rounded-xl border-2 py-2.5 text-center transition-all",
                            addonQty === qty
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <p className={cn("text-sm font-bold", addonQty === qty ? "text-indigo-700" : "text-slate-800")}>
                            +{qty}개
                          </p>
                          <p className={cn("text-xs mt-0.5", addonQty === qty ? "text-indigo-500" : "text-slate-400")}>
                            ₩{(qty * addonPrice).toLocaleString()}
                          </p>
                        </button>
                      ))}
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4" />
                      크레딧 {addonQty}개 추가 — ₩{(addonQty * addonPrice).toLocaleString()}
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Usage by Channel */}
            <h2 className="text-sm font-semibold text-slate-700 pt-1">채널별 이번달 사용</h2>
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
                  <span>채널</span>
                  <span className="text-right">사용 크레딧</span>
                </div>
                {USAGE_BY_CHANNEL.map((ch) => (
                  <div key={ch.name} className="space-y-1.5">
                    <div className="grid grid-cols-2 text-sm items-center">
                      <span className="font-medium text-slate-800">{ch.name}</span>
                      <span className="text-right font-semibold text-slate-900">{ch.credits} 크레딧</span>
                    </div>
                    <Progress
                      value={(ch.credits / MONTHLY_ALLOWANCE) * 100}
                      className="h-1.5"
                      color="bg-indigo-400"
                    />
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">총 사용</span>
                  <span className="text-sm font-bold text-slate-900">
                    {totalCreditsUsed} / {MONTHLY_ALLOWANCE} 크레딧
                  </span>
                </div>
                <Progress value={(totalCreditsUsed / MONTHLY_ALLOWANCE) * 100} />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <h2 className="text-sm font-semibold text-slate-700">결제 수단</h2>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">신한카드 •••• 4521</p>
                    <p className="text-xs text-slate-400">유효기간 12/27</p>
                  </div>
                  <Button variant="outline" size="sm">변경</Button>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                  <Button variant="ghost" size="sm" className="text-xs">세금계산서 신청</Button>
                  <Button variant="ghost" size="sm" className="text-xs">자동결제 해제</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right col: Invoices + Free credit guide */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">결제 내역</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {INVOICES.map((inv, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{inv.item}</p>
                        <p className="text-xs text-slate-400">{inv.date}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-900 shrink-0">
                        ₩{inv.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Free credit progression */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-bold text-amber-900">무료 크레딧 받는 법</p>
                {[
                  { step: "가입 즉시", credits: "+5", done: true },
                  { step: "첫 테스트 완료", credits: "+2", done: true },
                  { step: "결제수단 등록", credits: "+3", done: false },
                ].map((row) => (
                  <div key={row.step} className="flex items-center gap-2">
                    <div className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                      row.done ? "bg-emerald-500" : "bg-amber-200"
                    )}>
                      {row.done
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        : <span className="text-[10px] font-bold text-amber-600">!</span>
                      }
                    </div>
                    <span className="text-xs text-amber-800 flex-1">{row.step}</span>
                    <span className="text-xs font-bold text-emerald-700">{row.credits} 크레딧</span>
                  </div>
                ))}
                <p className="text-[10px] text-amber-600 pt-1 border-t border-amber-200">
                  무료 크레딧 사용기한: 가입 후 30일
                </p>
              </CardContent>
            </Card>

            {/* Upgrade to Pro */}
            <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0 text-white">
              <CardContent className="p-5">
                <Zap className="h-6 w-6 text-purple-200 mb-2" />
                <p className="font-bold mb-1">Pro로 업그레이드</p>
                <p className="text-xs text-purple-200 leading-relaxed mb-4">
                  매월 48 크레딧 + 추가 크레딧 ₩11,000/개.<br />
                  채널 무제한 · API · 채널 누적 인사이트.
                </p>
                <Button className="w-full bg-white text-purple-700 hover:bg-purple-50" size="sm">
                  <TrendingUp className="h-4 w-4" />
                  Pro 시작 — ₩490,000/월
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
