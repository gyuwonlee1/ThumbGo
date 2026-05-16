"use client";

import { useEffect, useState } from "react";
import { Award, Calendar, Target, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getScorecard } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";
import { scorecard as fixtureScorecard } from "@/lib/fixtures";
import { cn } from "@/lib/utils";
import type { Scorecard } from "@/lib/types";

export const SCORECARD_CACHE_KEY = "thumbgosu_scorecard";

const weekLabels = ["월", "화", "수", "목", "금", "토", "일"];

const GRADE_STARTS: Record<string, number> = { C: 0, B: 50, A: 150, S: 300 };
const GRADE_ENDS: Record<string, number> = { C: 50, B: 150, A: 300, S: 999 };

function gradeProgress(grade: string, totalVotes: number): number {
  const start = GRADE_STARTS[grade] ?? 0;
  const end = GRADE_ENDS[grade] ?? 50;
  return Math.min(100, Math.round(((totalVotes - start) / (end - start)) * 100));
}

export default function ScorecardPage() {
  const [score, setScore] = useState<Scorecard>(fixtureScorecard);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id ?? null;
      const cacheKey = uid ? `${SCORECARD_CACHE_KEY}_${uid}` : SCORECARD_CACHE_KEY;

      // 계정별 캐시 즉시 표시
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) setScore(JSON.parse(cached) as Scorecard);
      } catch {}

      // 최신 데이터 fetch 및 캐시 갱신
      getScorecard().then((fresh) => {
        setScore(fresh);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fresh));
        } catch {}
      });
    });
  }, []);

  return (
    <AppShell>
      <PageHeader subtitle="적중률과 신뢰도 흐름" title="내 성적표" />

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/85">현재 등급</p>
              <p className="mt-2 text-6xl font-black leading-none">{score.grade}</p>
              <p className="mt-2 text-sm text-white/85">
                신뢰도 {score.reliabilityScore}점 · 상위 15%
              </p>
            </div>
            <div className="rounded-full bg-white/20 p-4">
              <Award aria-hidden className="size-10" />
            </div>
          </div>
          <div className="mt-5 border-t border-white/20 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">다음 등급까지</span>
              <span className="font-bold">{score.nextGradeVotes}표</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${gradeProgress(score.grade, score.totalVotes)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 pt-6">
        {[
          {
            label: "적중률",
            value: `${score.hitRate}%`,
            sub: "+5% 증가",
            icon: Target,
            color: "text-red-600"
          },
          {
            label: "신뢰도",
            value: `${score.reliabilityScore}점`,
            sub: "안정적",
            icon: TrendingUp,
            color: "text-blue-600"
          },
          {
            label: "누적 응답",
            value: `${score.totalVotes}`,
            sub: "이번 달",
            icon: Calendar,
            color: "text-violet-600"
          },
          {
            label: "평균 응답",
            value: `${score.averageResponseSeconds}초`,
            sub: "정상 범위",
            icon: Award,
            color: "text-yellow-600"
          }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className="rounded-xl bg-gray-50 p-4" key={item.label}>
              <div className="mb-2 flex items-center gap-2">
                <Icon aria-hidden className={cn("size-5", item.color)} />
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
              <p className="text-2xl font-black text-gray-950">{item.value}</p>
              <p className="mt-1 text-xs text-green-600">{item.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">주간 적중률</h2>
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex h-36 items-end justify-between gap-2">
            {score.weeklyHitRate.map((value, index) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={weekLabels[index]}>
                <div className="flex w-full items-end rounded-t bg-red-100">
                  <div
                    className="w-full rounded-t bg-red-600"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{weekLabels[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">신뢰도 등급 추이</h2>
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
          {score.gradeTrend.map((grade, index) => (
            <div className="flex flex-1 items-center" key={`${grade}-${index}`}>
              <div className="grid size-9 place-items-center rounded-full bg-white text-sm font-black text-red-600 shadow-sm">
                {grade}
              </div>
              {index < score.gradeTrend.length - 1 ? (
                <div className="h-0.5 flex-1 bg-gray-200" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <h2 className="mb-3 text-base font-bold text-gray-950">카테고리별 응답 분포</h2>
        <div className="space-y-3 rounded-xl bg-gray-50 p-4">
          {score.categories.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-bold text-gray-950">{item.count}개</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={cn("h-full rounded-full", item.color)}
                  style={{ width: `${(item.count / 45) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
