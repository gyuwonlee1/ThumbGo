"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-slate-900 p-12 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">썸네일고수</span>
        </Link>
        <div>
          <blockquote className="text-xl font-medium text-white leading-relaxed mb-4">
            "썸네일고수 도입 후 썸네일 재작업 비용이 40% 줄었습니다. 데이터로 의사결정하는 것이 이렇게 간단할 줄 몰랐어요."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              김
            </div>
            <div>
              <p className="text-sm font-medium text-white">김지훈</p>
              <p className="text-xs text-slate-400">콘텐츠 디렉터 · ABC 크리에이터즈</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">© 2026 썸네일고수</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 lg:hidden mb-8">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900">썸네일고수</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">다시 오셨군요!</h1>
            <p className="text-sm text-slate-500 mt-1">에이전시 계정으로 로그인하세요.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => void handleLogin(e)}>
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
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "로그인"}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
              무료로 시작하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
