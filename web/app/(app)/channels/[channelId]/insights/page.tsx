"use client";

import { use } from "react";
import { Brain, TrendingUp, Users, BarChart3, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockChannels, mockChannelInsights } from "@/lib/mock-data";
import { CATEGORY_LABELS } from "@/lib/schemas/channel";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const elementData = [
  { name: "인물 있음", winRate: 68, loseRate: 32 },
  { name: "인물 없음", winRate: 32, loseRate: 68 },
  { name: "좌측 텍스트", winRate: 74, loseRate: 26 },
  { name: "중앙 텍스트", winRate: 45, loseRate: 55 },
  { name: "우측 텍스트", winRate: 38, loseRate: 62 },
  { name: "고채도 배경", winRate: 71, loseRate: 29 },
  { name: "저채도 배경", winRate: 29, loseRate: 71 },
];

const emotionData = [
  { emotion: "놀람", winRate: 76 },
  { emotion: "긍정", winRate: 58 },
  { emotion: "중립", winRate: 42 },
  { emotion: "집중", winRate: 65 },
  { emotion: "웃음", winRate: 53 },
];

const quarterData = [
  { quarter: "Q4 2025", avgCTR: 51.2 },
  { quarter: "Q1 2026", avgCTR: 56.8 },
  { quarter: "Q2 2026", avgCTR: 62.3 },
];

const radarData = [
  { subject: "인물 등장", A: 90 },
  { subject: "좌측 텍스트", A: 85 },
  { subject: "고채도", A: 78 },
  { subject: "놀람 표정", A: 92 },
  { subject: "짧은 키워드", A: 70 },
  { subject: "질문형 제목", A: 60 },
];

export default function ChannelInsightsPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = use(params);
  const channel = mockChannels.find((c) => c.id === channelId) ?? mockChannels[0];
  const insights = mockChannelInsights[channelId] ?? mockChannelInsights["ch_1"];
  const { recommendations, bestTestTitle, bestCTR } = insights;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="채널 인사이트" description={channel.name} />
      <main className="flex-1 p-6 space-y-6">
        {/* Header Info */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-5 w-5 text-indigo-200" />
              <p className="font-semibold">AI 누적 인사이트 보고서</p>
            </div>
            <p className="text-indigo-100 text-sm">
              지난 3개월간 <strong className="text-white">18건</strong>의 테스트 데이터 기반 ·{" "}
              <strong className="text-white">{CATEGORY_LABELS[channel.category]}</strong> 카테고리 시청자 분석
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* Element Win Rate */}
          <div className="col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              요소별 승률
            </h2>
            <Card>
              <CardContent className="p-5">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={elementData} layout="vertical" barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} unit="%" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} width={80} />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(v: any) => [`${v ?? 0}%`, "승률"]}
                      contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="winRate" fill="#6366f1" radius={[0, 6, 6, 0]} name="승률" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Emotion Data */}
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mt-4">
              <Users className="h-4 w-4 text-emerald-600" />
              표정·감정별 CTR
            </h2>
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  {emotionData.map((e) => (
                    <div key={e.emotion} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-16 shrink-0">{e.emotion}</span>
                      <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                          style={{ width: `${e.winRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 w-10 text-right">{e.winRate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Trend */}
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              분기별 평균 CTR 추이
            </h2>
            <Card>
              <CardContent className="p-5">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={quarterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} unit="%" domain={[40, 70]} />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(v: any) => [`${v ?? 0}%`, "평균 CTR"]}
                      contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="avgCTR" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right: Radar + Recommendations */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">채널 강점 프로파일</h2>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748b" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Next Thumbnail Guide */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  다음 썸네일 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                      <span className="h-4 w-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: r.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <Card>
              <CardContent className="p-4 space-y-3">
                {[
                  { label: "평균 CTR", value: "62.3%", trend: "+10.8%p (3개월)" },
                  { label: "총 테스트", value: `${channel.totalTests}건`, trend: "3개월 누적" },
                  { label: "분석 시안 수", value: `${channel.totalTests * 2 + 11}개`, trend: "전체 썸네일" },
                  { label: "최고 CTR 시안", value: bestCTR, trend: `시안 A (${bestTestTitle})` },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">{s.label}</p>
                      <p className="text-[10px] text-slate-400">{s.trend}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{s.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
