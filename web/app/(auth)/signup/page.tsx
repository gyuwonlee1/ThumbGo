"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const benefits = [
  "월 3회 무료 썸네일 테스트",
  "채널 2개 무료 연결",
  "신용카드 불필요",
  "5분 내 첫 테스트 시작",
];

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-12 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">썸네일고수</span>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">무료로 시작하세요</h2>
          <p className="text-indigo-200 text-sm mb-8">신용카드 없이 지금 바로 썸네일을 검증하세요.</p>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-indigo-100">
                <CheckCircle2 className="h-4 w-4 text-indigo-300 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-indigo-400">© 2026 썸네일고수</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 lg:hidden mb-8">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900">썸네일고수</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">에이전시 계정 만들기</h1>
            <p className="text-sm text-slate-500 mt-1">팀 전체가 사용할 수 있는 에이전시 계정입니다.</p>
          </div>

          {success ? (
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-green-800">가입 완료!</p>
              <p className="text-xs text-green-600 mt-1">대시보드로 이동합니다...</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => void handleSignup(e)}>
              <Input
                id="email"
                type="email"
                label="이메일"
                placeholder="agency@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                type="password"
                label="비밀번호"
                placeholder="6자 이상"
                hint="영문·숫자·특수문자 조합 권장"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="text-xs text-slate-400 leading-relaxed">
                가입하면{" "}
                <a href="#" className="text-indigo-600 hover:underline">이용약관</a>과{" "}
                <a href="#" className="text-indigo-600 hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "무료 계정 만들기"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 mt-6">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
