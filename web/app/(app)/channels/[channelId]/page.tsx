"use client";

import Link from "next/link";
import { use } from "react";
import { Plus, BarChart3, FlaskConical, Calendar, Clock, Trophy } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { mockChannels, mockActiveTests, mockCompletedTests, mockCalendarEvents } from "@/lib/mock-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/schemas/channel";
import { formatNumber, formatDate, timeUntil } from "@/lib/utils";

export default function ChannelDetailPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = use(params);
  const channel = mockChannels.find((c) => c.id === channelId) ?? mockChannels[0];
  const activeTests = mockActiveTests.filter((t) => t.channelId === channelId);
  const completedTests = mockCompletedTests.filter((t) => t.channelId === channelId);
  const scheduledUploads = mockCalendarEvents.filter(
    (e) => e.channelId === channelId && e.type === "upload"
  );

  return (
    <div className="flex flex-col min-h-full">
      <Header title={channel.name} description="채널 상세" />
      <main className="flex-1 p-6 space-y-6">
        {/* Channel Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {channel.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{channel.name}</h1>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[channel.category]}`}>
                    {CATEGORY_LABELS[channel.category]}
                  </span>
                  {channel.activeTests > 0 && (
                    <Badge variant="active">{channel.activeTests}건 진행 중</Badge>
                  )}
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span>구독자 <strong className="text-slate-900">{formatNumber(channel.subscriberCount)}</strong></span>
                  <span>평균 조회수 <strong className="text-slate-900">{formatNumber(channel.avgViewCount)}</strong></span>
                  <span>총 테스트 <strong className="text-slate-900">{channel.totalTests}건</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="md" asChild>
                  <Link href={`/channels/${channelId}/insights`}>
                    <BarChart3 className="h-4 w-4" />
                    인사이트 보기
                  </Link>
                </Button>
                <Button size="md" asChild>
                  <Link href={`/channels/${channelId}/tests/new`}>
                    <Plus className="h-4 w-4" />
                    테스트 등록
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">진행 중인 테스트 <Badge variant="active" className="ml-1.5 text-[10px]">{activeTests.length}</Badge></TabsTrigger>
            <TabsTrigger value="completed">완료된 테스트</TabsTrigger>
            <TabsTrigger value="scheduled">예정된 업로드</TabsTrigger>
          </TabsList>

          {/* Active Tests */}
          <TabsContent value="active" className="space-y-3">
            {activeTests.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <FlaskConical className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">진행 중인 테스트가 없습니다.</p>
                  <Button className="mt-4" size="sm" asChild>
                    <Link href={`/channels/${channelId}/tests/new`}>첫 테스트 등록하기</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              activeTests.map((test) => (
                <Link key={test.id} href={`/channels/${channelId}/tests/${test.id}`}>
                  <Card className="hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{test.title}</h3>
                            <Badge variant="active">진행 중</Badge>
                          </div>
                          <p className="text-xs text-slate-400">
                            썸네일 {test.thumbnailCount}개 · {test.totalVotes}표 수집됨
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-medium text-amber-600 flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" />
                            {timeUntil(test.deadline)}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">마감</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">투표 진행률</span>
                          <span className="text-xs font-medium text-slate-600">
                            {test.totalVotes} / {test.targetVotes}표
                          </span>
                        </div>
                        <Progress
                          value={(test.totalVotes / test.targetVotes) * 100}
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>

          {/* Completed Tests */}
          <TabsContent value="completed">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">테스트 제목</th>
                      <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3">우승 시안</th>
                      <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3">최종 CTR</th>
                      <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3">총 투표</th>
                      <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">완료일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {completedTests.map((test) => (
                      <tr
                        key={test.id}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => window.location.href = `/channels/${channelId}/tests/${test.id}`}
                      >
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-slate-900">{test.title}</p>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Trophy className="h-3.5 w-3.5 text-amber-500" />
                            <span className="font-semibold text-amber-700">시안 {test.winner}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="font-semibold text-indigo-700">{test.winnerCTR}%</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-slate-600">
                          {test.totalVotes.toLocaleString()}표
                        </td>
                        <td className="px-5 py-3.5 text-right text-slate-400 text-xs">
                          {formatDate(test.completedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Scheduled Uploads */}
          <TabsContent value="scheduled">
            <Card>
              <CardContent className="p-5 space-y-3">
                {scheduledUploads.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatDate(item.date)}</p>
                    </div>
                    {item.hasTest ? (
                      <Badge variant="success" className="text-[10px]">테스트 연결됨</Badge>
                    ) : (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/channels/${channelId}/tests/new`}>
                          <Plus className="h-3.5 w-3.5" />
                          테스트 등록
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
