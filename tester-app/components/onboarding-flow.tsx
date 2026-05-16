"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, ChevronLeft, Gift, Smartphone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewerCategories, type TesterProfileInput } from "@/lib/schemas";
import { saveProfile } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

const watchTimes: { label: string; value: TesterProfileInput["dailyWatchTime"] }[] = [
  { label: "30분 미만", value: "<30m" },
  { label: "1시간", value: "~1h" },
  { label: "2시간", value: "~2h" },
  { label: "3시간 이상", value: "3h+" }
];

const devices: { label: string; value: TesterProfileInput["device"] }[] = [
  { label: "모바일", value: "MOBILE" },
  { label: "PC", value: "PC" },
  { label: "TV", value: "TV" },
  { label: "섞어서 봄", value: "MIXED" }
];

export function OnboardingFlow() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Auth 관련 state
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const [profile, setProfile] = useState<TesterProfileInput>({
    nickname: "테스터23",
    gender: "UNDISCLOSED",
    birthYear: 1998,
    categories: ["게임", "푸드", "IT·테크"],
    dailyWatchTime: "~2h",
    device: "MOBILE"
  });

  // 이미 로그인 상태면 step 0 건너뛰기
  if (user && step === 0) {
    setStep(1);
  }

  const handleAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess("가입 완료! 계속 진행합니다.");
          setTimeout(() => setStep(1), 500);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setAuthError(error.message === "Invalid login credentials"
            ? "이메일 또는 비밀번호가 올바르지 않습니다."
            : error.message
          );
        } else {
          setStep(1);
        }
      }
    } catch {
      setAuthError("인증 중 오류가 발생했습니다.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/onboarding`
          : undefined,
      },
    });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    }
  };

  const canContinue = useMemo(() => {
    if (step === 1) {
      return profile.nickname.length >= 2 && profile.birthYear <= new Date().getFullYear() - 13;
    }

    if (step === 2) {
      return profile.categories.length >= 3 && profile.categories.length <= 5;
    }

    return true;
  }, [profile, step]);

  const toggleCategory = (category: string) => {
    setProfile((current) => {
      if (current.categories.includes(category)) {
        return {
          ...current,
          categories: current.categories.filter((item) => item !== category)
        };
      }

      if (current.categories.length >= 5) {
        return current;
      }

      return { ...current, categories: [...current.categories, category] };
    });
  };

  const complete = async () => {
    setSaving(true);
    await saveProfile(profile);
    setSaving(false);
    setStep(4);
  };

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            aria-label="이전"
            className="rounded-full p-2 text-gray-700 disabled:opacity-30"
            disabled={step === 0 || step === 4}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            type="button"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-950">ThumbLab 시작하기</p>
            <p className="text-xs text-gray-500">{Math.min(step + 1, 4)} / 4</p>
          </div>
          <div className="size-9" />
        </div>
      </header>

      <main className="px-4 py-6">
        {step === 0 ? (
          <section>
            <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white">
              <Smartphone aria-hidden className="size-10" />
              <h1 className="mt-5 text-2xl font-black leading-tight">
                5초 테스트로 코인을 적립해요
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/85">
                이메일로 시작하거나 소셜 로그인 후, 유튜브를 보듯 썸네일을 고르면 됩니다.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {/* 이메일 인증 폼 */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 rounded-lg py-2 text-sm font-bold transition-colors",
                      authMode === "signup"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                    onClick={() => { setAuthMode("signup"); setAuthError(null); }}
                  >
                    회원가입
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 rounded-lg py-2 text-sm font-bold transition-colors",
                      authMode === "login"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                    onClick={() => { setAuthMode("login"); setAuthError(null); }}
                  >
                    로그인
                  </button>
                </div>

                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
                />
                <input
                  type="password"
                  placeholder="비밀번호 (6자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email && password.length >= 6) {
                      handleAuth();
                    }
                  }}
                />

                {authError && (
                  <p className="mt-2 text-sm text-red-600">{authError}</p>
                )}
                {authSuccess && (
                  <p className="mt-2 text-sm text-green-600">{authSuccess}</p>
                )}

                <button
                  type="button"
                  disabled={authLoading || !email || password.length < 6}
                  onClick={handleAuth}
                  className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white disabled:opacity-50"
                >
                  {authLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="mr-2 size-4" />
                      {authMode === "signup" ? "이메일로 가입" : "이메일로 로그인"}
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">또는</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google 로그인 (추후 활성화) */}
              <button
                type="button"
                className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900"
                onClick={handleGoogleLogin}
                disabled={authLoading}
              >
                Google로 시작
              </button>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section>
            <h1 className="text-xl font-black text-gray-950">기본 정보를 알려주세요</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              생년은 만 14세 이상 확인과 연령대 매칭에만 사용됩니다.
            </p>
            <label className="mt-6 block text-sm font-bold text-gray-800">
              닉네임
              <input
                className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-red-500"
                maxLength={20}
                onChange={(event) =>
                  setProfile({ ...profile, nickname: event.target.value })
                }
                value={profile.nickname}
              />
            </label>
            <label className="mt-4 block text-sm font-bold text-gray-800">
              생년
              <input
                className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-red-500"
                inputMode="numeric"
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    birthYear: Number(event.target.value || 0)
                  })
                }
                value={profile.birthYear}
              />
            </label>
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-800">성별</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  ["남", "M"],
                  ["여", "F"],
                  ["응답 안 함", "UNDISCLOSED"]
                ].map(([label, value]) => (
                  <button
                    className={cn(
                      "min-h-11 rounded-xl border text-sm font-bold",
                      profile.gender === value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-700"
                    )}
                    key={value}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        gender: value as TesterProfileInput["gender"]
                      })
                    }
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section>
            <h1 className="text-xl font-black text-gray-950">시청 성향을 골라주세요</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              자주 보는 카테고리를 3개에서 5개까지 선택해주세요.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {ViewerCategories.map((category) => {
                const selected = profile.categories.includes(category);
                return (
                  <button
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-bold",
                      selected
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    )}
                    key={category}
                    onClick={() => toggleCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <div className="mt-6">
              <p className="text-sm font-bold text-gray-800">하루 시청 시간</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {watchTimes.map((item) => (
                  <button
                    className={cn(
                      "min-h-11 rounded-xl border text-sm font-bold",
                      profile.dailyWatchTime === item.value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-700"
                    )}
                    key={item.value}
                    onClick={() =>
                      setProfile({ ...profile, dailyWatchTime: item.value })
                    }
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-bold text-gray-800">주로 보는 기기</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {devices.map((item) => (
                  <button
                    className={cn(
                      "min-h-11 rounded-xl border text-sm font-bold",
                      profile.device === item.value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-700"
                    )}
                    key={item.value}
                    onClick={() => setProfile({ ...profile, device: item.value })}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section>
            <h1 className="text-xl font-black text-gray-950">마지막 설정이에요</h1>
            <div className="mt-5 rounded-2xl border border-gray-200 p-4">
              <div className="flex gap-3">
                <Bell aria-hidden className="mt-1 size-5 shrink-0 text-red-600" />
                <div>
                  <p className="font-bold text-gray-950">새 테스트 푸시 알림</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    매칭된 테스트가 도착하면 바로 알려드릴게요.
                  </p>
                </div>
              </div>
            </div>
            <label className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 p-4">
              <span>
                <span className="block text-sm font-bold text-gray-950">
                  마케팅 정보 수신 동의
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  이벤트와 보너스 소식을 받을 수 있어요.
                </span>
              </span>
              <input
                checked={marketingConsent}
                className="size-5 accent-red-600"
                onChange={(event) => setMarketingConsent(event.target.checked)}
                type="checkbox"
              />
            </label>
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-bold text-gray-950">샘플 테스트 보상</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                가입 후 샘플 테스트 1회를 완료하면 즉시 50코인이 지급됩니다.
              </p>
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-red-100 p-5 text-red-600">
              <Gift aria-hidden className="size-10" />
            </div>
            <h1 className="mt-5 text-2xl font-black text-gray-950">+50 코인 지급 완료</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              샘플 테스트가 끝났어요. 이제 실제 매칭 테스트를 시작할 수 있습니다.
            </p>
            <Link
              className="mt-8 flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-4 font-bold text-white"
              href="/"
            >
              홈으로 이동
            </Link>
          </section>
        ) : null}
      </main>

      {step < 4 ? (
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-gray-100 bg-white p-4 safe-bottom">
          <Button
            className="w-full"
            disabled={!canContinue || saving}
            onClick={() => {
              if (step === 3) {
                void complete();
                return;
              }
              setStep((current) => current + 1);
            }}
          >
            {step === 3 ? (
              <>
                <CheckCircle2 aria-hidden className="mr-2 size-4" />
                {saving ? "저장 중" : "샘플 테스트 완료"}
              </>
            ) : (
              "계속"
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
