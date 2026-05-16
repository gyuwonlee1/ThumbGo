"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, FlaskConical, TrendingUp, Trash2, Edit } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { mockChannels } from "@/lib/mock-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/schemas/channel";
import { formatNumber } from "@/lib/utils";

const CATEGORY_BG: Record<string, string> = {
  GAMING: "from-purple-600 to-indigo-700",
  BEAUTY: "from-pink-500 to-rose-600",
  FOOD: "from-orange-500 to-amber-600",
  VLOG: "from-yellow-500 to-amber-500",
  EDUCATION: "from-blue-600 to-indigo-700",
  TECH: "from-cyan-600 to-blue-600",
  KIDS: "from-green-500 to-emerald-600",
  MUSIC: "from-indigo-600 to-violet-700",
  SPORTS: "from-red-500 to-orange-600",
  ENTERTAINMENT: "from-rose-500 to-pink-600",
  ETC: "from-slate-600 to-slate-700",
};

export default function ChannelsPage() {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockChannels.filter((ch) =>
    ch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      <Header title="채널 관리" description={`${mockChannels.length}개 채널`} />
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="채널 검색..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" />
            채널 추가
          </Button>
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((ch) => (
            <div key={ch.id} className="relative group">
              <Link href={`/channels/${ch.id}`}>
                <Card className="hover:border-indigo-200 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
                  {/* Color Header */}
                  <div className={`h-20 bg-gradient-to-br ${CATEGORY_BG[ch.category]} flex items-center justify-center`}>
                    <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                      {ch.name[0]}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{ch.name}</h3>
                        <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-1 ${CATEGORY_COLORS[ch.category]}`}>
                          {CATEGORY_LABELS[ch.category]}
                        </span>
                      </div>
                      {ch.activeTests > 0 && (
                        <Badge variant="active">{ch.activeTests}건 진행 중</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400">구독자</p>
                        <p className="text-sm font-semibold text-slate-900">{formatNumber(ch.subscriberCount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">평균 조회</p>
                        <p className="text-sm font-semibold text-slate-900">{formatNumber(ch.avgViewCount)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <FlaskConical className="h-3.5 w-3.5" />
                        총 {ch.totalTests}건 테스트
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              {/* Context Menu */}
              <div className="absolute top-[84px] right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative">
                  <button
                    onClick={(e) => { e.preventDefault(); setDeleteTarget(ch.id); }}
                    className="h-7 w-7 rounded-lg bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Channel Card */}
          <button onClick={() => setShowAddModal(true)} className="text-left">
            <Card className="border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-200 cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px] gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">채널 추가하기</p>
                  <p className="text-xs text-slate-400 mt-1">YouTube 채널을 연결하세요</p>
                </div>
              </CardContent>
            </Card>
          </button>
        </div>
      </main>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>채널을 삭제하시겠어요?</DialogTitle>
            <DialogDescription>
              삭제된 채널과 모든 테스트 데이터는 복구할 수 없습니다.
              진행 중인 테스트가 있으면 삭제할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => setDeleteTarget(null)}>
              <Trash2 className="h-4 w-4" />
              채널 삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Input label="채널 이름" placeholder="예: 게임왕 채널" />
            <Input label="YouTube 채널 ID (선택)" placeholder="UCxxxxxxxxxxxxxxxx" hint="입력 시 구독자 수 자동 가져오기" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">카테고리</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                      key === "GAMING"
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
            <Button onClick={() => setShowAddModal(false)}>
              <Plus className="h-4 w-4" />
              채널 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
