"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { ThumbnailCard } from "@/components/thumbnail-card";
import { Button } from "@/components/ui/button";
import { getTestFeed, submitVote } from "@/lib/api-client";
import { testerId } from "@/lib/fixtures";
import type { ThumbnailOption, ThumbnailTest } from "@/lib/types";
import {
  createAppSessionId,
  createDeviceFingerprint,
  formatCoins
} from "@/lib/utils";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function TestFeed() {
  const [tests, setTests] = useState<ThumbnailTest[]>([]);
  const [index, setIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState<ThumbnailOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reward, setReward] = useState<number | null>(null);
  const [sessionTotal, setSessionTotal] = useState(0);
  const startTimeRef = useRef<number>(0);
  const appSessionIdRef = useRef<string>("00000000-0000-4000-8000-000000000000");
  const deviceFingerprintRef = useRef<string>("server-fixture-device");

  useEffect(() => {
    appSessionIdRef.current = createAppSessionId();
    deviceFingerprintRef.current = createDeviceFingerprint();
    void getTestFeed().then((feed) => {
      setTests(feed);
      setLoading(false);
    });
  }, []);

  const currentTest = tests[index];

  useEffect(() => {
    if (!currentTest) {
      return;
    }

    setVisibleThumbnails(shuffle(currentTest.thumbnails));
    startTimeRef.current = Date.now();
  }, [currentTest]);

  const progress = useMemo(() => {
    if (tests.length === 0) {
      return 0;
    }

    return Math.min(((index + 1) / tests.length) * 100, 100);
  }, [index, tests.length]);

  const handleSelect = async (
    thumbnailId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!currentTest || submitting) {
      return;
    }

    const responseTimeMs = Date.now() - startTimeRef.current;
    const awardedCoins = currentTest.rewardCoins;
    setSubmitting(true);
    setReward(awardedCoins);
    setSessionTotal((current) => current + awardedCoins);

    await submitVote({
      testId: currentTest.id,
      testerId,
      chosenThumbnailId: thumbnailId,
      responseTimeMs,
      tapPosition: { x: event.clientX, y: event.clientY },
      thumbnailOrder: visibleThumbnails.map((thumbnail) => thumbnail.id),
      appSessionId: appSessionIdRef.current,
      deviceFingerprint: deviceFingerprintRef.current,
      clientTimestamp: new Date().toISOString()
    });

    window.setTimeout(() => {
      setReward(null);
      setSubmitting(false);
      setIndex((current) => current + 1);
    }, 950);
  };

  if (loading) {
    return (
      <>
        <PageHeader subtitle="매칭된 테스트를 불러오는 중" title="테스트 진행" />
        <div className="space-y-6 px-4 pt-6">
          <div className="h-4 animate-pulse rounded bg-gray-100" />
          <div className="aspect-video animate-pulse rounded-xl bg-gray-100" />
          <div className="aspect-video animate-pulse rounded-xl bg-gray-100" />
        </div>
      </>
    );
  }

  if (!currentTest) {
    return (
      <>
        <PageHeader subtitle={`이번 세션 +${formatCoins(sessionTotal)} 코인`} title="테스트 진행" />
        <EmptyState
          action={
            <div className="space-y-3">
              <Button className="w-full">
                <Bell aria-hidden className="mr-2 size-4" />
                푸시 알림 켜기
              </Button>
              <Link
                className="flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 text-sm font-bold text-gray-800"
                href="/"
              >
                홈으로 돌아가기
              </Link>
            </div>
          }
          description="오늘의 미션이 끝났어요. 다음 테스트는 약 2시간 후에 도착할 예정입니다."
          icon={<Clock aria-hidden className="size-7" />}
          title="오늘의 테스트 완료"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        action={
          <div className="rounded-lg bg-red-50 px-3 py-2 text-right">
            <p className="text-[11px] text-gray-500">세션 적립</p>
            <p className="text-sm font-black text-red-600">
              +{formatCoins(sessionTotal)} 코인
            </p>
          </div>
        }
        subtitle={`${index + 1} / ${tests.length} · ${currentTest.category}`}
        title="테스트 진행"
      />

      <div className="px-4 pt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-red-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className="px-4 pt-6 text-center">
        <h1 className="text-lg font-black text-gray-950">{currentTest.question}</h1>
        <p className="mt-2 text-xs leading-5 text-gray-500">
          실제 제목은 가려져 있어요. 썸네일만 보고 가장 클릭하고 싶은 영상을 선택해주세요.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 px-4 pt-6">
        {visibleThumbnails.map((thumbnail) => (
          <ThumbnailCard
            disabled={submitting}
            key={thumbnail.id}
            onSelect={(event) => void handleSelect(thumbnail.id, event)}
            thumbnail={thumbnail}
          />
        ))}
      </section>

      {currentTest.isAttentionCheck ? (
        <section className="px-4 pt-6">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
            <div className="flex gap-3">
              <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
              <p className="text-xs leading-5">
                품질 확인 문항입니다. 정상적으로 보이는 썸네일을 골라주세요.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {reward !== null ? (
        <div className="coin-pop fixed left-1/2 top-[42%] z-50 rounded-2xl bg-white px-8 py-7 text-center shadow-2xl">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Sparkles aria-hidden className="size-8" />
          </div>
          <p className="text-2xl font-black text-gray-950">+{reward} 코인</p>
          <p className="mt-1 text-sm text-gray-500">응답 완료</p>
        </div>
      ) : null}
    </>
  );
}
