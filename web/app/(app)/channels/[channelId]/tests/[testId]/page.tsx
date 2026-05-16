"use client";

import { use } from "react";
import Link from "next/link";
import {
  Trophy, RefreshCw, Users, TrendingUp, Brain,
  Clock, FlaskConical, CheckCircle2, StopCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockTestResultsMap, mockActiveTests } from "@/lib/mock-data";
import { timeUntil } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";

const THUMBNAIL_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
const THUMBNAIL_BG = ["bg-indigo-600", "bg-emerald-600", "bg-amber-600", "bg-red-600"];

export default function TestResultPage({ params }: { params: Promise<{ channelId: string; testId: string }> }) {
  const { channelId, testId } = use(params);

  const result = mockTestResultsMap[testId];
  const activeTest = !result ? mockActiveTests.find((t) => t.id === testId) : null;

  // ── 진행 중 테스트 화면 ──────────────────────────────────────────
  if (!result && activeTest) {
    const progress = Math.round((activeTest.totalVotes / activeTest.targetVotes) * 100);
    const labels = ["A", "B", "C", "D"].slice(0, activeTest.thumbnailCount);

    return (
      <div className="flex flex-col min-h-full">
        <Header title="테스트 진행 중" description={activeTest.title} />
        <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
          {/* Status Banner */}
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-blue-900">{activeTest.title}</p>
                <Badge variant="active" className="text-[10px]">진행 중</Badge>
              </div>
              <p className="text-xs text-blue-600">{activeTest.channelName} · 시안 {activeTest.thumbnailCount}개</p>
            </div>
          </div>

          {/* Vote Progress */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">투표 현황</p>
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">{timeUntil(activeTest.deadline)}</span>
                </div>
              </div>
              <div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-3xl font-bold text-slate-900">{activeTest.totalVotes.toLocaleString()}</span>
                  <span className="text-sm text-slate-400">/ {activeTest.targetVotes.toLocaleString()}표 목표</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-xs text-slate-400 mt-1.5">{progress}% 달성</p>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnails placeholder */}
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-slate-700 mb-4">참여 시안</p>
              <div className="grid grid-cols-2 gap-3">
                {labels.map((label, i) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <div className={`h-8 w-8 rounded-lg ${THUMBNAIL_BG[i]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {label}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-700">시안 {label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">집계 중...</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notice */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              테스트가 종료되면 시안별 CTR, 인구통계 분석, AI 인사이트를 포함한 전체 결과를 확인할 수 있습니다.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href={`/channels/${channelId}`}>
                <TrendingUp className="h-4 w-4" />
                채널로 돌아가기
              </Link>
            </Button>
            <Button variant="destructive" className="flex-1">
              <StopCircle className="h-4 w-4" />
              테스트 수동 종료
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ── 결과 없음 폴백 ───────────────────────────────────────────────
  if (!result) {
    return (
      <div className="flex flex-col min-h-full">
        <Header title="테스트" description="결과를 불러올 수 없습니다" />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-slate-500 text-sm">해당 테스트 결과를 찾을 수 없습니다.</p>
            <Button variant="outline" asChild>
              <Link href={`/channels/${channelId}`}>채널로 돌아가기</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ── 완료된 테스트 결과 화면 ──────────────────────────────────────
  const winner = result.thumbnails.reduce((a, b) => a.voteCount > b.voteCount ? a : b);
  const barData = result.thumbnails.map((t) => ({
    name: `시안 ${t.label}`,
    CTR: t.ctr,
    votes: t.voteCount,
  }));

  return (
    <div className="flex flex-col min-h-full">
      <Header title="테스트 결과" description={result.title} />
      <main className="flex-1 p-6 space-y-6">
        {/* Title & Actions */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{result.title}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              총 {result.totalVotes.toLocaleString()}표 수집 · 완료됨
            </p>
          </div>
          <Button variant="secondary" size="md" asChild>
            <Link href={`/channels/${channelId}/tests/new`}>
              <RefreshCw className="h-4 w-4" />
              유사 조건 재테스트
            </Link>
          </Button>
        </div>

        {/* Section 1: Result Summary */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            결과 요약
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Winner Card */}
            <Card className="border-2 border-amber-200 bg-amber-50 col-span-1">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold text-amber-700">우승 시안</span>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 aspect-video mb-3 flex items-center justify-center text-white font-bold text-2xl">
                  {winner.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-700">{winner.ctr}%</span>
                  <span className="text-xs text-amber-600">± {winner.ci}% (95% CI)</span>
                </div>
                <p className="text-xs text-amber-600 mt-1">{winner.voteCount.toLocaleString()}표 · 통계적 유의성 확인됨</p>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="col-span-2">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-slate-700 mb-4">시안별 클릭률 비교</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={barData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} unit="%" domain={[0, 100]} />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any) => [`${value ?? 0}%`, "CTR"]}
                      contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="CTR" fill="#6366f1" radius={[6, 6, 0, 0]}>
                      {barData.map((_, i) => (
                        <rect key={i} fill={THUMBNAIL_COLORS[i] ?? "#6366f1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {result.thumbnails.map((t, i) => (
                    <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <div className={`h-8 w-8 rounded-lg ${THUMBNAIL_BG[i] ?? "bg-slate-600"} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {t.label}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-700">시안 {t.label}</span>
                          <span className="text-xs font-bold text-slate-900">{t.ctr}%</span>
                        </div>
                        <Progress
                          value={t.ctr}
                          color={["bg-indigo-600", "bg-emerald-600", "bg-amber-500", "bg-red-500"][i]}
                          className="h-1.5"
                        />
                        <p className="text-[10px] text-slate-400 mt-0.5">{t.voteCount}표 · ±{t.ci}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Section 2: Demographics */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              인구통계별 선호도
            </h2>
            <Card>
              <CardContent className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">성별</p>
                  {Object.entries(result.demographicData.gender).map(([gender, pcts]) => (
                    <div key={gender} className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">{gender === "M" ? "남성" : "여성"}</span>
                      </div>
                      <div className="flex h-5 rounded-full overflow-hidden">
                        {Object.entries(pcts).map(([label, pct], i) => (
                          <div
                            key={label}
                            className={`${["bg-indigo-500", "bg-emerald-500"][i]} flex items-center justify-center text-[9px] text-white font-bold transition-all`}
                            style={{ width: `${pct}%` }}
                          >
                            {pct > 15 && `${label}: ${pct}%`}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">연령대</p>
                  {Object.entries(result.demographicData.ageGroups).map(([age, pcts]) => {
                    const ageLabel: Record<string, string> = { "10s": "10대", "20s": "20대", "30s": "30대", "40s": "40대" };
                    return (
                      <div key={age} className="mb-2">
                        <span className="text-xs text-slate-500 block mb-1">{ageLabel[age]}</span>
                        <div className="flex h-4 rounded-full overflow-hidden">
                          {Object.entries(pcts).map(([label, pct], i) => (
                            <div
                              key={label}
                              className={`${["bg-indigo-400", "bg-emerald-400"][i]}`}
                              style={{ width: `${pct}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex text-[9px] text-slate-400 gap-3 mt-0.5">
                          {Object.entries(pcts).map(([label, pct]) => (
                            <span key={label}>시안{label}: {pct}%</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Time Series */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              시간대별 누적 투표
            </h2>
            <Card>
              <CardContent className="p-5">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={result.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}h`} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e2e8f0" }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="A" stroke="#6366f1" strokeWidth={2} dot={false} name="시안 A" />
                    <Line type="monotone" dataKey="B" stroke="#10b981" strokeWidth={2} dot={false} name="시안 B" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 4: AI Insights */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-500" />
            AI 사후 분석
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {result.analysis.map((a, i) => (
              <Card key={a.thumbnailId} className={i === 0 ? "border-indigo-200" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-6 w-6 rounded-lg ${THUMBNAIL_BG[i] ?? "bg-slate-600"} flex items-center justify-center text-white text-xs font-bold`}>
                      {a.label}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">시안 {a.label}</span>
                    {i === 0 && <Badge variant="warning" className="ml-auto text-[10px]">우승</Badge>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "인물 등장", value: a.hasFace ? "있음" : "없음" },
                      { key: "표정", value: a.faceEmotion ?? "—" },
                      { key: "텍스트 위치", value: a.fontPosition },
                      { key: "채도", value: a.saturation },
                    ].map((item) => (
                      <div key={item.key} className="rounded-lg bg-slate-50 px-3 py-2">
                        <p className="text-[10px] text-slate-400">{item.key}</p>
                        <p className="text-xs font-semibold text-slate-800 mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="text-[10px] text-slate-400 mb-1">감지된 키워드</p>
                    <div className="flex flex-wrap gap-1">
                      {a.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Channel Insight Card */}
          <Card className="mt-4 border-purple-200 bg-purple-50">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-900 mb-1">채널 누적 인사이트</p>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    이 채널에서는 <strong>인물 등장 + 좌측 텍스트 + 고채도 배경</strong> 조합이 평균 <strong>1.7배</strong> 높은 CTR을 보였습니다.
                    놀란 표정 썸네일이 특히 <strong>10~20대 남성</strong>에게 강하게 반응합니다.
                  </p>
                  <Button size="sm" variant="outline" className="mt-3 text-purple-700 border-purple-200 hover:bg-purple-100" asChild>
                    <Link href={`/channels/${channelId}/insights`}>
                      전체 채널 인사이트 보기 →
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
