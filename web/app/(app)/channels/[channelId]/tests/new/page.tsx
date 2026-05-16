"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Upload, X, Check,
  Users, Target, Zap, ImagePlus, AlertTriangle
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockChannels, addMockActiveTest } from "@/lib/mock-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/schemas/channel";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "기본 정보", icon: Zap },
  { id: 2, label: "썸네일 업로드", icon: ImagePlus },
  { id: 3, label: "테스터 풀", icon: Users },
  { id: 4, label: "종료 방식", icon: Target },
];

const AGE_GROUPS = ["10대", "20대", "30대", "40대", "50대+"];
const AGE_KEYS = ["10s", "20s", "30s", "40s", "50s+"];

const END_CONDITIONS = [
  { id: "MANUAL", label: "수동 종료", desc: "원할 때 직접 종료 버튼을 누릅니다." },
  { id: "VOTE_COUNT", label: "목표 투표 수 도달 시", desc: "설정한 투표 수에 도달하면 자동 종료됩니다." },
  { id: "DURATION", label: "기간 경과 시", desc: "설정한 시간이 지나면 자동 종료됩니다." },
  { id: "FIRST_OF", label: "먼저 도달하는 조건", desc: "투표 수 또는 기간 중 먼저 충족되면 종료됩니다." },
];

const DURATION_PRESETS = [24, 48, 72, 168];

type Thumbnail = { label: string; file: File | null; note: string; preview: string | null };

export default function NewTestPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = use(params);
  const router = useRouter();
  const channel = mockChannels.find((c) => c.id === channelId) ?? mockChannels[0];

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([
    { label: "A", file: null, note: "", preview: null },
    { label: "B", file: null, note: "", preview: null },
  ]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(["M", "F"]);
  const [selectedAges, setSelectedAges] = useState<string[]>(["10s", "20s", "30s", "40s", "50s+"]);
  const [endType, setEndType] = useState("VOTE_COUNT");
  const [voteTarget, setVoteTarget] = useState(100);
  const [durationHours, setDurationHours] = useState(48);
  const [selectedCategory, setSelectedCategory] = useState<string>(channel.category);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const THUMBNAIL_LABELS = ["A", "B", "C", "D"];
  const matchCount = Math.round(1240 * (selectedGenders.length / 2) * (selectedAges.length / 5));
  const estimatedCredits = endType === "MANUAL" ? null : Math.ceil(voteTarget / 50);

  const addThumbnail = () => {
    if (thumbnails.length < 4) {
      setThumbnails([...thumbnails, { label: THUMBNAIL_LABELS[thumbnails.length], file: null, note: "", preview: null }]);
    }
  };

  const removeThumbnail = (idx: number) => {
    if (thumbnails.length > 2) {
      const next = thumbnails.filter((_, i) => i !== idx).map((t, i) => ({ ...t, label: THUMBNAIL_LABELS[i] }));
      setThumbnails(next);
    }
  };

  const handleFileChange = (idx: number, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnails(thumbnails.map((t, i) => i === idx ? { ...t, file, preview: url } : t));
  };

  const toggleGender = (g: string) => {
    setSelectedGenders((prev) =>
      prev.includes(g) ? (prev.length > 1 ? prev.filter((x) => x !== g) : prev) : [...prev, g]
    );
  };

  const toggleAge = (a: string) => {
    setSelectedAges((prev) =>
      prev.includes(a) ? (prev.length > 1 ? prev.filter((x) => x !== a) : prev) : [...prev, a]
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    const deadline = endType === "DURATION" || endType === "FIRST_OF"
      ? new Date(Date.now() + durationHours * 60 * 60 * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    addMockActiveTest({
      id: `test_${Date.now()}`,
      channelId,
      channelName: channel.name,
      title,
      thumbnailCount: thumbnails.length,
      totalVotes: 0,
      targetVotes: endType === "MANUAL" ? 300 : voteTarget,
      status: "ACTIVE",
      endConditionType: endType,
      deadline,
    });

    router.push(`/channels/${channelId}`);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="새 테스트 등록" description={channel.name} />
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center mb-8">
            {STEPS.map((s, i) => {
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className={cn(
                    "flex items-center gap-2 transition-colors",
                    isCurrent ? "text-indigo-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                  )}>
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isCurrent ? "bg-indigo-600 text-white ring-4 ring-indigo-100" :
                        isCompleted ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {isCompleted ? <Check className="h-4 w-4" /> : s.id}
                    </div>
                    <span className={cn(
                      "text-xs font-medium hidden sm:block",
                      isCurrent ? "text-slate-900" : isCompleted ? "text-emerald-700" : "text-slate-400"
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 mx-3 rounded-full transition-colors",
                      isCompleted ? "bg-emerald-400" : "bg-slate-200"
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card className="animate-fade-in">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">기본 정보</h2>
                  <p className="text-sm text-slate-500">테스트할 영상의 기본 정보를 입력하세요.</p>
                </div>
                <Input
                  label="영상 가제목 *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 롤 시즌 14 격변 리뷰 — 진짜 바뀐 거 맞냐고?"
                />
                <Input
                  type="date"
                  label="예정 업로드일 (선택)"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  hint="캘린더에 일정으로 표시됩니다."
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">카테고리</label>
                    <span className="text-xs text-slate-400">채널 기본값에서 변경 가능</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedCategory(key)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all",
                          selectedCategory === key
                            ? `${CATEGORY_COLORS[key]} border-current`
                            : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Thumbnail Upload */}
          {step === 2 && (
            <Card className="animate-fade-in">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">썸네일 업로드</h2>
                  <p className="text-sm text-slate-500">2~4개의 썸네일 후보를 업로드하세요. (1280×720, 최대 2MB)</p>
                </div>
                <div className="space-y-3">
                  {thumbnails.map((thumb, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      {/* Upload Box */}
                      <label
                        className={cn(
                          "relative w-36 h-20 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all",
                          thumb.preview ? "border-transparent" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50",
                          isDragging === idx && "border-indigo-400 bg-indigo-50"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(idx); }}
                        onDragLeave={() => setIsDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(null);
                          handleFileChange(idx, e.dataTransfer.files[0] ?? null);
                        }}
                      >
                        {thumb.preview ? (
                          <img src={thumb.preview} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-1">
                            <Upload className="h-5 w-5 text-slate-300" />
                            <span className="text-[10px] text-slate-400 font-medium">시안 {thumb.label}</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        />
                      </label>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                            {thumb.label}
                          </span>
                          <span className="text-xs font-medium text-slate-600">시안 {thumb.label}</span>
                          {thumbnails.length > 2 && (
                            <button
                              onClick={() => removeThumbnail(idx)}
                              className="ml-auto h-5 w-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="시안 메모 (예: 충격 표정, 키워드 강조형)"
                          value={thumb.note}
                          onChange={(e) => setThumbnails(thumbnails.map((t, i) => i === idx ? { ...t, note: e.target.value } : t))}
                          className="h-8 w-full rounded-lg border border-slate-200 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                  {thumbnails.length < 4 && (
                    <button
                      onClick={addThumbnail}
                      className="w-full h-12 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-sm font-medium text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                    >
                      <ImagePlus className="h-4 w-4" />
                      시안 추가 ({thumbnails.length}/4)
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Tester Pool */}
          {step === 3 && (
            <Card className="animate-fade-in">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">테스터 풀 선택</h2>
                  <p className="text-sm text-slate-500">어떤 시청자에게 투표받을지 설정하세요.</p>
                </div>
                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">성별</label>
                  <div className="flex gap-2">
                    {[{ id: "M", label: "남성" }, { id: "F", label: "여성" }].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => toggleGender(g.id)}
                        className={cn(
                          "flex-1 h-10 rounded-xl border-2 text-sm font-medium transition-all",
                          selectedGenders.includes(g.id)
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        )}
                      >
                        {selectedGenders.includes(g.id) && <Check className="h-3.5 w-3.5 inline mr-1" />}
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">연령대 (다중 선택)</label>
                  <div className="flex gap-2">
                    {AGE_GROUPS.map((ag, i) => (
                      <button
                        key={AGE_KEYS[i]}
                        onClick={() => toggleAge(AGE_KEYS[i])}
                        className={cn(
                          "flex-1 h-10 rounded-xl border-2 text-xs font-medium transition-all",
                          selectedAges.includes(AGE_KEYS[i])
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        )}
                      >
                        {ag}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Match Count */}
                <div className={cn(
                  "rounded-xl p-4 flex items-start gap-3",
                  matchCount < 200 ? "bg-amber-50 border border-amber-200" : "bg-emerald-50 border border-emerald-200"
                )}>
                  <Users className={cn("h-5 w-5 shrink-0 mt-0.5", matchCount < 200 ? "text-amber-500" : "text-emerald-500")} />
                  <div>
                    <p className={cn("text-sm font-semibold", matchCount < 200 ? "text-amber-700" : "text-emerald-700")}>
                      약 {matchCount.toLocaleString()}명 매칭 예상
                    </p>
                    {matchCount < 200 ? (
                      <p className="text-xs text-amber-600 mt-0.5">
                        매칭 인원이 적습니다. 조건을 완화하면 더 빠른 결과를 얻을 수 있습니다.
                      </p>
                    ) : (
                      <p className="text-xs text-emerald-600 mt-0.5">
                        충분한 패널이 확보되었습니다. 신뢰도 높은 결과를 기대할 수 있습니다.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: End Condition */}
          {step === 4 && (
            <Card className="animate-fade-in">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">종료 방식</h2>
                  <p className="text-sm text-slate-500">테스트를 어떤 조건에서 종료할지 설정하세요.</p>
                </div>
                <div className="space-y-2">
                  {END_CONDITIONS.map((ec) => (
                    <button
                      key={ec.id}
                      onClick={() => setEndType(ec.id)}
                      className={cn(
                        "w-full text-left rounded-xl border-2 p-4 transition-all",
                        endType === ec.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                          endType === ec.id ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                        )}>
                          {endType === ec.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={cn("text-sm font-medium", endType === ec.id ? "text-indigo-700" : "text-slate-700")}>
                          {ec.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 pl-6">{ec.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Vote Count Setting */}
                {(endType === "VOTE_COUNT" || endType === "FIRST_OF") && (
                  <div className="space-y-3 animate-fade-in">
                    <label className="text-sm font-medium text-slate-700">목표 투표 수</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { votes: 50, credits: 1, label: "50명", sub: "1 크레딧", warn: true },
                        { votes: 100, credits: 2, label: "100명", sub: "2 크레딧", warn: false },
                        { votes: 150, credits: 3, label: "150명", sub: "3 크레딧", warn: false },
                        { votes: 200, credits: 4, label: "200명", sub: "4 크레딧", warn: false },
                      ].map((opt) => (
                        <button
                          key={opt.votes}
                          type="button"
                          onClick={() => setVoteTarget(opt.votes)}
                          className={cn(
                            "rounded-xl border-2 p-3 text-center transition-all",
                            voteTarget === opt.votes
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          )}
                        >
                          <p className={cn(
                            "text-sm font-bold",
                            voteTarget === opt.votes ? "text-indigo-700" : "text-slate-800"
                          )}>
                            {opt.label}
                          </p>
                          <p className={cn(
                            "text-xs mt-0.5 font-medium",
                            voteTarget === opt.votes ? "text-indigo-500" : "text-slate-400"
                          )}>
                            {opt.sub}
                          </p>
                          {opt.warn && (
                            <AlertTriangle className="h-3 w-3 text-amber-400 mx-auto mt-1" />
                          )}
                        </button>
                      ))}
                    </div>
                    {voteTarget === 50 && (
                      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 animate-fade-in">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 leading-relaxed">
                          <span className="font-semibold">통계 신뢰도 주의</span> — 50명 결과는 오차 ±14%p로,
                          28%p 이상의 명확한 차이만 신뢰할 수 있습니다. 빠른 초안 스크리닝 용도로 사용하세요.
                        </p>
                      </div>
                    )}
                    {voteTarget === 100 && (
                      <p className="text-xs text-emerald-600 font-medium">
                        ✓ 권장 기본값 — 오차 ±10%p, 대부분의 영상에 적합합니다.
                      </p>
                    )}
                  </div>
                )}

                {/* Duration Setting */}
                {(endType === "DURATION" || endType === "FIRST_OF") && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-sm font-medium text-slate-700">기간</label>
                    <div className="flex gap-2">
                      {DURATION_PRESETS.map((h) => (
                        <button
                          key={h}
                          onClick={() => setDurationHours(h)}
                          className={cn(
                            "flex-1 h-9 rounded-lg text-sm font-medium transition-all",
                            durationHours === h ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          )}
                        >
                          {h >= 24 ? `${h / 24}일` : `${h}h`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-700 mb-3">테스트 요약</p>
                  {[
                    { label: "썸네일 후보", value: `${thumbnails.length}개` },
                    { label: "예상 매칭 인원", value: `${matchCount.toLocaleString()}명` },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{r.label}</span>
                      <span className="text-xs font-semibold text-slate-900">{r.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">크레딧 차감</span>
                    {estimatedCredits !== null ? (
                      <span className="text-xs font-semibold text-slate-900">{estimatedCredits} 크레딧</span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600">종료 후 실제 투표 수 기준 정산</span>
                    )}
                  </div>
                  {endType === "MANUAL" && (
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      수동 종료 시 실제 집계된 투표 수 기준으로 크레딧이 차감됩니다. (50표당 1크레딧)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-4 w-4" />
                이전
              </Button>
            ) : (
              <Button variant="ghost" asChild>
                <Link href={`/channels/${channelId}`}>
                  <ChevronLeft className="h-4 w-4" />
                  취소
                </Link>
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={step === 1 && !title.trim()}>
                다음
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    등록 중...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    테스트 시작
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
