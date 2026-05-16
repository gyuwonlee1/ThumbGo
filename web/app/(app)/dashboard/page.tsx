"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MonitorPlay, FlaskConical, Upload, Coins, Plus,
  ChevronRight, Clock, AlertCircle, TrendingUp
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { mockChannels, mockUpcomingEvents, mockActiveTests, addMockChannel } from "@/lib/mock-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/schemas/channel";
import { formatNumber, timeUntil } from "@/lib/utils";

const kpiCards = [
  { label: "관리 채널", value: "5", icon: MonitorPlay, color: "text-indigo-600 bg-indigo-50", trend: "+1 이번 달" },
  { label: "진행 중 테스트", value: "3", icon: FlaskConical, color: "text-blue-600 bg-blue-50", trend: "활성 테스트" },
  { label: "이번 주 업로드 예정", value: "8", icon: Upload, color: "text-amber-600 bg-amber-50", trend: "7일 이내" },
  { label: "남은 크레딧", value: "47", icon: Coins, color: "text-emerald-600 bg-emerald-50", trend: "/ 100 Starter" },
];

function getEventIcon(type: string) {
  if (type === "upload") return <Upload className="h-3.5 w-3.5 text-blue-500" />;
  return <Clock className="h-3.5 w-3.5 text-amber-500" />;
}

function getEventBadge(type: string) {
  if (type === "upload") return <Badge variant="active" className="text-[10px]">업로드 예정</Badge>;
  return <Badge variant="warning" className="text-[10px]">마감 임박</Badge>;
}

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("GAMING");
  const [newChannelName, setNewChannelName] = useState("");
  const [, setTick] = useState(0);

  const handleAddChannel = () => {
    if (!newChannelName.trim()) return;
    addMockChannel({ name: newChannelName.trim(), category: selectedCategory });
    setNewChannelName("");
    setSelectedCategory("GAMING");
    setShowAddModal(false);
    setTick((t) => t + 1);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="대시보드"
        description="에이전시 전체 현황"
        action={{ label: "새 테스트 등록", href: "/channels" }}
      />
      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                      <p className="text-xs text-slate-400 mt-1">{kpi.trend}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Channel Grid */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">관리 채널</h2>
              <Link href="/channels" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                전체 보기 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockChannels.map((ch) => (
                <Link key={ch.id} href={`/channels/${ch.id}`}>
                  <Card className="hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {ch.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-sm font-semibold text-slate-900 truncate">{ch.name}</p>
                            {ch.activeTests > 0 && (
                              <Badge variant="active" className="text-[10px] shrink-0">
                                {ch.activeTests}건
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[ch.category]}`}>
                              {CATEGORY_LABELS[ch.category]}
                            </span>
                            <span className="text-xs text-slate-400">{formatNumber(ch.subscriberCount)} 구독</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-slate-400">총 테스트 {ch.totalTests}건</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {/* Add Channel Card */}
              <button onClick={() => setShowAddModal(true)} className="text-left">
                <Card className="border-dashed hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-center h-full min-h-[88px]">
                    <div className="text-center">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                        <Plus className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-xs font-medium text-slate-500">채널 추가</p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            </div>

            {/* Active Tests */}
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-sm font-semibold text-slate-700">진행 중인 테스트</h2>
            </div>
            <div className="space-y-3">
              {mockActiveTests.map((test) => (
                <Link key={test.id} href={`/channels/${test.channelId}/tests/${test.id}`}>
                  <Card className="hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 line-clamp-1">{test.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{test.channelName} · 시안 {test.thumbnailCount}개</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">{timeUntil(test.deadline)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress
                          value={(test.totalVotes / test.targetVotes) * 100}
                          className="flex-1 h-1.5"
                        />
                        <span className="text-xs text-slate-500 shrink-0 tabular-nums">
                          {test.totalVotes}/{test.targetVotes}표
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Panel: Upcoming Events */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">다가오는 일정</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {mockUpcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getEventIcon(event.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
                            {event.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{event.channelName}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {getEventBadge(event.type)}
                            <span className="text-[10px] text-slate-400 font-medium">
                              {timeUntil(event.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  이번 달 요약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  {[
                    { label: "완료된 테스트", value: "12건" },
                    { label: "총 투표 수", value: "4,821표" },
                    { label: "평균 테스트 소요", value: "18.4시간" },
                    { label: "사용 크레딧", value: "53 / 100" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <dt className="text-xs text-slate-500">{stat.label}</dt>
                      <dd className="text-xs font-semibold text-slate-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">크레딧 사용률</span>
                    <span className="text-xs font-semibold text-slate-900">53%</span>
                  </div>
                  <Progress value={53} />
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Banner */}
            <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-indigo-200 shrink-0 mt-0.5" />
                <p className="text-xs font-medium">크레딧이 47개 남았습니다</p>
              </div>
              <p className="text-[10px] text-indigo-200 mb-3 leading-relaxed">
                Pro로 업그레이드하면 월 100회 테스트와 채널 무제한 이용이 가능합니다.
              </p>
              <Button size="sm" className="w-full bg-white text-indigo-700 hover:bg-indigo-50 text-xs" asChild>
                <Link href="/billing">플랜 업그레이드</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Channel Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>새 채널 연결</DialogTitle>
            <DialogDescription>
              YouTube 채널 정보를 입력하거나 채널 ID로 자동 가져오기 하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-2 space-y-4">
            <Input label="채널 이름" placeholder="예: 게임왕 채널" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)} />
            <Input label="YouTube 채널 ID (선택)" placeholder="UCxxxxxxxxxxxxxxxx" hint="입력 시 구독자 수 자동 가져오기" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">카테고리</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                      selectedCategory === key
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button onClick={handleAddChannel} disabled={!newChannelName.trim()}>
              <Plus className="h-4 w-4" />
              채널 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
