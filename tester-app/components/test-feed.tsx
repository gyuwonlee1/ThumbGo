"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Clock, Search } from "lucide-react";
import { getTestFeed, submitVote } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";
import { testerId } from "@/lib/fixtures";
import { ViewerCategories } from "@/lib/schemas";
import type { HomeSummary, Scorecard, ThumbnailOption, ThumbnailTest } from "@/lib/types";
import { createAppSessionId, createDeviceFingerprint } from "@/lib/utils";

// 계정별 localStorage 키 생성
function uidKey(base: string, uid: string | null) {
  return uid ? `${base}_${uid}` : base;
}

function applyVoteToCache(rewardCoins: number, uid: string | null) {
  try {
    const homeKey = uidKey("thumbgosu_home_summary", uid);
    const rawHome = localStorage.getItem(homeKey);
    if (rawHome) {
      const home = JSON.parse(rawHome) as HomeSummary;
      home.todayTests = (home.todayTests ?? 0) + 1;
      home.totalVotes = (home.totalVotes ?? 0) + 1;
      home.coinBalance = (home.coinBalance ?? 0) + rewardCoins;
      home.todayEarned = (home.todayEarned ?? 0) + rewardCoins;
      localStorage.setItem(homeKey, JSON.stringify(home));
    }
  } catch {}

  try {
    const scorecardKey = uidKey("thumbgosu_scorecard", uid);
    const rawScore = localStorage.getItem(scorecardKey);
    if (rawScore) {
      const score = JSON.parse(rawScore) as Scorecard;
      score.totalVotes = (score.totalVotes ?? 0) + 1;
      score.nextGradeVotes = Math.max(0, (score.nextGradeVotes ?? 1) - 1);
      localStorage.setItem(scorecardKey, JSON.stringify(score));
    }
  } catch {}
}

const DAILY_LIMIT = 5;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getTodayCount(uid: string | null): number {
  if (typeof window === "undefined") return 0;
  const today = new Date().toDateString();
  try {
    const stored = localStorage.getItem(uidKey("thumbgosu_daily", uid));
    if (!stored) return 0;
    const { date, count } = JSON.parse(stored) as { date: string; count: number };
    return date === today ? count : 0;
  } catch {
    return 0;
  }
}

function incrementTodayCount(uid: string | null) {
  const today = new Date().toDateString();
  const newCount = getTodayCount(uid) + 1;
  localStorage.setItem(uidKey("thumbgosu_daily", uid), JSON.stringify({ date: today, count: newCount }));
  return newCount;
}

function VideoCard({
  thumbnail,
  onSelect,
  disabled,
  isSelected,
  isDimmed,
}: {
  thumbnail: ThumbnailOption;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  isSelected?: boolean;
  isDimmed?: boolean;
}) {
  return (
    <button
      className="w-full text-left group"
      onClick={onSelect}
      disabled={disabled}
      type="button"
      style={{
        opacity: isDimmed ? 0.35 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          alt=""
          src={thumbnail.imageUrl}
          className="h-full w-full object-cover transition duration-150 group-active:brightness-90"
        />
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-green-500/20">
            <div className="check-pop flex items-center justify-center rounded-full bg-green-500 p-4 shadow-xl shadow-green-500/40">
              <Check className="size-10 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-3 px-0.5">
        <div className="mt-0.5 size-9 shrink-0 rounded-full bg-gradient-to-br from-red-500 to-gray-800" />
        <div className="min-w-0">
          <p className="line-clamp-2 text-[14px] font-semibold leading-snug text-gray-950">
            {thumbnail.title}
          </p>
          <p className="mt-1 text-xs text-gray-500">{thumbnail.channel}</p>
          <p className="text-xs text-gray-500">{thumbnail.meta}</p>
        </div>
      </div>
    </button>
  );
}

export function TestFeed() {
  const [tests, setTests] = useState<ThumbnailTest[]>([]);
  const [index, setIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState<ThumbnailOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [coinEffect, setCoinEffect] = useState<{ x: number; y: number; coins: number; key: number } | null>(null);
  const startTimeRef = useRef<number>(0);
  const appSessionIdRef = useRef<string>("00000000-0000-4000-8000-000000000000");
  const deviceFingerprintRef = useRef<string>("server-fixture-device");
  const userUidRef = useRef<string | null>(null);

  useEffect(() => {
    appSessionIdRef.current = createAppSessionId();
    deviceFingerprintRef.current = createDeviceFingerprint();

    // 계정별 UID 로드 후 일일 카운트 반영
    supabase.auth.getUser().then(({ data }) => {
      userUidRef.current = data.user?.id ?? null;
      setTodayCount(getTodayCount(userUidRef.current));
    });

    void getTestFeed().then((feed) => {
      setTests(feed);
      setLoading(false);
    });
  }, []);

  const currentTest = tests[index];

  useEffect(() => {
    if (!currentTest) return;
    setVisibleThumbnails(shuffle(currentTest.thumbnails));
    startTimeRef.current = Date.now();
  }, [currentTest]);

  const handleSelect = async (
    thumbnailId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!currentTest || submitting) return;

    const responseTimeMs = Date.now() - startTimeRef.current;
    setSubmitting(true);

    // 클릭 이펙트 즉시 표시
    setSelectedId(thumbnailId);
    setCoinEffect({
      x: event.clientX,
      y: event.clientY,
      coins: currentTest.rewardCoins,
      key: Date.now(),
    });

    const uid = userUidRef.current;
    const newCount = incrementTodayCount(uid);
    setTodayCount(newCount);

    const result = await submitVote({
      testId: currentTest.id,
      testerId,
      chosenThumbnailId: thumbnailId,
      responseTimeMs,
      tapPosition: { x: event.clientX, y: event.clientY },
      thumbnailOrder: visibleThumbnails.map((t) => t.id),
      appSessionId: appSessionIdRef.current,
      deviceFingerprint: deviceFingerprintRef.current,
      clientTimestamp: new Date().toISOString(),
    });

    // 홈 요약 및 성적표 캐시 즉시 반영 (투표 성공 시만)
    if (result.accepted) {
      applyVoteToCache(result.awardedCoins ?? currentTest.rewardCoins, uid);
    }

    window.setTimeout(() => {
      setSubmitting(false);
      setSelectedId(null);
      setIndex((current) => current + 1);
    }, 650);
  };

  // 로딩 중
  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
          <span className="text-base font-black text-gray-950">썸네일고수</span>
          <div className="flex-1" />
          <Search className="size-5 text-gray-400" />
        </div>
        <div className="space-y-6 px-4 pt-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video animate-pulse rounded-xl bg-gray-100" />
              <div className="flex gap-3">
                <div className="size-9 shrink-0 animate-pulse rounded-full bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 오늘 한도 초과
  if (todayCount >= DAILY_LIMIT) {
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center px-8 text-center">
        <div className="rounded-full bg-orange-50 p-5">
          <Clock className="size-10 text-orange-400" />
        </div>
        <h2 className="mt-5 text-xl font-black text-gray-950">오늘은 여기까지예요</h2>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          하루 {DAILY_LIMIT}개의 영상을 모두 봤습니다.
          <br />
          내일 새로운 영상이 기다리고 있어요.
        </p>
        <Link
          href="/"
          className="mt-8 flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 font-bold text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 피드 소진
  if (!currentTest) {
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center px-8 text-center">
        <div className="rounded-full bg-gray-100 p-5">
          <Clock className="size-10 text-gray-400" />
        </div>
        <h2 className="mt-5 text-xl font-black text-gray-950">새 영상 준비 중</h2>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          오늘 올라온 영상을 모두 봤어요.
          <br />
          잠시 후 새 영상이 추가됩니다.
        </p>
        <Link
          href="/"
          className="mt-8 flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 font-bold text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* YouTube-style header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <span className="text-base font-black text-gray-950">썸네일고수</span>
        <div className="flex-1" />
        <button type="button" aria-label="검색" className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100">
          <Search aria-hidden className="size-5" />
        </button>
      </header>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none]">
        {["전체", ...ViewerCategories].map((cat, i) => (
          <span
            key={cat}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${
              i === 0 ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Video cards — natural feed */}
      <div className="space-y-8 px-4 pb-10 pt-2">
        {visibleThumbnails.map((thumbnail) => (
          <VideoCard
            key={thumbnail.id}
            thumbnail={thumbnail}
            disabled={submitting}
            isSelected={selectedId === thumbnail.id}
            isDimmed={selectedId !== null && selectedId !== thumbnail.id}
            onSelect={(event) => void handleSelect(thumbnail.id, event)}
          />
        ))}
      </div>

      {/* 코인 플로팅 이펙트 */}
      {coinEffect && (
        <div
          key={coinEffect.key}
          className="coin-pop pointer-events-none fixed z-50 rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-black text-gray-900 shadow-lg"
          style={{ left: coinEffect.x, top: coinEffect.y - 16 }}
        >
          +{coinEffect.coins} 코인
        </div>
      )}
    </div>
  );
}
