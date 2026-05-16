"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Clock, Search } from "lucide-react";
import { getDailyVoteQuota, getTestFeed, submitVote } from "@/lib/api-client";
import { ViewerCategories } from "@/lib/schemas";
import type { ThumbnailOption, ThumbnailTest } from "@/lib/types";
import { createAppSessionId, createDeviceFingerprint } from "@/lib/utils";

const DAILY_LIMIT = 5;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [coinEffect, setCoinEffect] = useState<{ x: number; y: number; coins: number; key: number } | null>(null);
  const startTimeRef = useRef<number>(0);
  const appSessionIdRef = useRef<string>("00000000-0000-4000-8000-000000000000");
  const deviceFingerprintRef = useRef<string>("server-fixture-device");

  useEffect(() => {
    appSessionIdRef.current = createAppSessionId();
    deviceFingerprintRef.current = createDeviceFingerprint();

    void Promise.all([getDailyVoteQuota(), getTestFeed()]).then(([quota, feed]) => {
      setTodayCount(quota.todayTests);
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

    setSelectedId(thumbnailId);
    setErrorMessage(null);

    const result = await submitVote({
      testId: currentTest.id,
      chosenThumbnailId: thumbnailId,
      responseTimeMs,
      tapPosition: { x: event.clientX, y: event.clientY },
      thumbnailOrder: visibleThumbnails.map((t) => t.id),
      appSessionId: appSessionIdRef.current,
      deviceFingerprint: deviceFingerprintRef.current,
      clientTimestamp: new Date().toISOString(),
    });

    if (!result.accepted) {
      if ("todayTests" in result && typeof result.todayTests === "number") {
        setTodayCount(result.todayTests);
      }
      setErrorMessage(
        result.error === "DAILY_LIMIT_REACHED"
          ? "오늘 응답 가능한 테스트를 모두 완료했어요."
          : result.error ?? "응답 저장에 실패했어요. 잠시 후 다시 시도해 주세요."
      );
      setSubmitting(false);
      setSelectedId(null);
      setCoinEffect(null);
      return;
    }

    setTodayCount(result.todayTests ?? todayCount + 1);
    setCoinEffect({
      x: event.clientX,
      y: event.clientY,
      coins: result.awardedCoins ?? currentTest.rewardCoins,
      key: Date.now(),
    });

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

      {errorMessage ? (
        <div className="mx-4 mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

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
