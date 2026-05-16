"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Smartphone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewerCategories, type TesterProfileInput } from "@/lib/schemas";
import { saveProfile } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export function OnboardingFlow() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [profile, setProfile] = useState<TesterProfileInput>({
    nickname: "",
    gender: "UNDISCLOSED",
    birthYear: 2000,
    categories: [],
  });

  // 이미 로그인 상태면 step 0 건너뛰기
  if (user && step === 0) {
    setStep(1);
  }

  const handleSignUp = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        setStep(1);
      }
    } catch {
      setAuthError("인증 중 오류가 발생했습니다.");
    } finally {
      setAuthLoading(false);
    }
  };

  const canProceedStep1 = useMemo(
    () => profile.nickname.length >= 2 && profile.birthYear <= new Date().getFullYear() - 13,
    [profile.nickname, profile.birthYear]
  );

  const canProceedStep2 = useMemo(
    () => profile.categories.length >= 3 && profile.categories.length <= 5,
    [profile.categories]
  );

  const toggleCategory = (category: string) => {
    setProfile((current) => {
      if (current.categories.includes(category)) {
        return { ...current, categories: current.categories.filter((item) => item !== category) };
      }
      if (current.categories.length >= 5) return current;
      return { ...current, categories: [...current.categories, category] };
    });
  };

  const complete = async () => {
    setSaving(true);
    await saveProfile(profile);
    setSaving(false);
    router.push("/");
  };

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            aria-label="이전"
            className="rounded-full p-2 text-gray-700 disabled:opacity-30"
            disabled={step === 0}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            type="button"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-950">썸네일고수 시작하기</p>
            <p className="text-xs text-gray-500">{step + 1} / 3</p>
          </div>
          <div className="size-9" />
        </div>
      </header>

      <main className="px-4 py-6">
        {step === 0 && (
          <section>
            <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white">
              <Smartphone aria-hidden className="size-10" />
              <h1 className="mt-5 text-2xl font-black leading-tight">
                5초 테스트로 코인을 적립해요
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/85">
                이메일로 가입 후, 유튜브를 보듯 썸네일을 고르면 됩니다.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
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
                  className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email && password.length >= 6) void handleSignUp();
                  }}
                />
                {authError && <p className="text-sm text-red-600">{authError}</p>}
                <button
                  type="button"
                  disabled={authLoading || !email || password.length < 6}
                  onClick={() => void handleSignUp()}
                  className="flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white disabled:opacity-50"
                >
                  {authLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="mr-2 size-4" />
                      이메일로 가입
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="font-bold text-red-600">
                  로그인
                </Link>
              </p>
            </div>
          </section>
        )}

        {step === 1 && (
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
                onChange={(event) => setProfile({ ...profile, nickname: event.target.value })}
                value={profile.nickname}
              />
            </label>
            <label className="mt-4 block text-sm font-bold text-gray-800">
              생년
              <input
                className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-red-500"
                inputMode="numeric"
                onChange={(event) =>
                  setProfile({ ...profile, birthYear: Number(event.target.value || 0) })
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
                  ["응답 안 함", "UNDISCLOSED"],
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
                      setProfile({ ...profile, gender: value as TesterProfileInput["gender"] })
                    }
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <Button className="w-full" disabled={!canProceedStep1} onClick={() => setStep(2)}>
                다음
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
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
            <p className="mt-3 text-xs text-gray-400">
              {profile.categories.length}/5 선택됨 (최소 3개)
            </p>
            <div className="mt-8">
              <Button
                className="w-full"
                disabled={!canProceedStep2 || saving}
                onClick={() => void complete()}
              >
                {saving ? "저장 중..." : "완료"}
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
