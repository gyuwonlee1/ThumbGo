"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, Download, Zap, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "FREE",
    name: "무료",
    price: 0,
    credits: 3,
    channels: 2,
    members: 1,
    features: ["월 3회 테스트", "채널 2개", "기본 결과 분석"],
    color: "border-slate-200",
    badge: null,
  },
  {
    id: "STARTER",
    name: "Starter",
    price: 79000,
    credits: 30,
    channels: 10,
    members: 3,
    features: ["월 30회 테스트", "채널 10개", "AI 썸네일 분석", "채널 인사이트", "팀 멤버 3명"],
    color: "border-indigo-500",
    badge: "현재 플랜",
  },
  {
    id: "PRO",
    name: "Pro",
    price: 199000,
    credits: 100,
    channels: 999,
    members: 999,
    features: ["월 100회 테스트", "채널 무제한", "AI 전체 분석", "API 연동", "팀 멤버 무제한"],
    color: "border-purple-300",
    badge: "추천",
  },
];

const INVOICES = [
  { date: "2026-05-01", plan: "Starter", amount: 79000, status: "PAID" },
  { date: "2026-04-01", plan: "Starter", amount: 79000, status: "PAID" },
  { date: "2026-03-01", plan: "Starter", amount: 79000, status: "PAID" },
];

const USAGE_BY_CHANNEL = [
  { name: "게임왕 채널", tests: 8, credits: 24 },
  { name: "뷰티 by 소연", tests: 12, credits: 18 },
  { name: "테크리뷰 마스터", tests: 4, credits: 7 },
  { name: "맛있는 하루", tests: 6, credits: 4 },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("STARTER");

  return (
    <div className="flex flex-col min-h-full">
      <Header title="요금제 · 결제" description="플랜 및 사용 내역 관리" />
      <main className="flex-1 p-6 space-y-6">
        {/* Current Plan Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "현재 플랜", value: "Starter", sub: "월 79,000원", color: "text-indigo-600 bg-indigo-50" },
            { label: "남은 크레딧", value: "47", sub: "/ 100 이번 달", color: "text-emerald-600 bg-emerald-50" },
            { label: "다음 결제일", value: "2026-06-01", sub: "자동 결제", color: "text-amber-600 bg-amber-50" },
            { label: "이번 달 테스트", value: "30건", sub: "30 / 30 사용", color: "text-slate-600 bg-slate-100" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-5">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Plan Comparison */}
          <div className="col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">플랜 비교</h2>
            <div className="grid grid-cols-3 gap-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "rounded-xl border-2 p-4 cursor-pointer transition-all",
                    plan.id === selectedPlan ? "border-indigo-500 bg-indigo-50" : plan.color + " bg-white hover:border-slate-300"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-900">{plan.name}</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {plan.price === 0 ? "무료" : `₩${plan.price.toLocaleString()}`}
                        {plan.price > 0 && <span className="text-xs font-normal text-slate-400">/월</span>}
                      </p>
                    </div>
                    {plan.badge && (
                      <Badge variant={plan.id === "STARTER" ? "active" : "default"} className="text-[10px]">
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.id !== "STARTER" && (
                    <Button
                      size="sm"
                      className="w-full mt-4"
                      variant={plan.id === selectedPlan ? "default" : "outline"}
                    >
                      {plan.id === "FREE" ? "다운그레이드" : "업그레이드"}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Credit Usage by Channel */}
            <h2 className="text-sm font-semibold text-slate-700 mt-6">채널별 사용 내역</h2>
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-3 text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
                  <span>채널</span>
                  <span className="text-center">테스트 수</span>
                  <span className="text-right">사용 크레딧</span>
                </div>
                {USAGE_BY_CHANNEL.map((ch) => (
                  <div key={ch.name} className="space-y-1.5">
                    <div className="grid grid-cols-3 text-sm items-center">
                      <span className="font-medium text-slate-800">{ch.name}</span>
                      <span className="text-center text-slate-600">{ch.tests}건</span>
                      <span className="text-right font-semibold text-slate-900">{ch.credits} 크레딧</span>
                    </div>
                    <Progress
                      value={(ch.credits / 53) * 100}
                      className="h-1.5"
                      color="bg-indigo-400"
                    />
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">총 사용</span>
                  <span className="text-sm font-bold text-slate-900">53 크레딧 / 100</span>
                </div>
                <Progress value={53} />
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
                  <Button variant="ghost" size="sm" className="text-xs">
                    세금계산서 신청
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    자동결제 해제
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoices */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">영수증 / 결제 내역</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {INVOICES.map((inv, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{inv.plan} 플랜</p>
                        <p className="text-xs text-slate-400">{inv.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">₩{inv.amount.toLocaleString()}</p>
                        <button className="text-[10px] text-indigo-600 hover:underline flex items-center gap-0.5 ml-auto mt-0.5">
                          <Download className="h-2.5 w-2.5" />
                          PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Banner */}
            <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0 text-white">
              <CardContent className="p-5">
                <Zap className="h-6 w-6 text-purple-200 mb-2" />
                <p className="font-bold mb-1">Pro로 업그레이드</p>
                <p className="text-xs text-purple-200 leading-relaxed mb-4">
                  채널 무제한 + 월 100회 테스트 + AI 전체 분석 + API 연동으로 에이전시 운영을 극대화하세요.
                </p>
                <Button className="w-full bg-white text-purple-700 hover:bg-purple-50" size="sm">
                  <TrendingUp className="h-4 w-4" />
                  Pro 시작하기 — ₩199,000/월
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
