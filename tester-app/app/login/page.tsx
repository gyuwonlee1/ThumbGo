"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white px-4">
      <div className="pt-16 pb-8">
        <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white">
          <Smartphone aria-hidden className="size-10" />
          <h1 className="mt-5 text-2xl font-black leading-tight">다시 오셨군요!</h1>
          <p className="mt-3 text-sm leading-6 text-white/85">
            계속해서 썸네일을 고르고 코인을 적립하세요.
          </p>
        </div>
      </div>

      <div className="space-y-3">
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
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && email && password) void handleLogin();
            }}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="button"
            disabled={loading || !email || !password}
            onClick={() => void handleLogin()}
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <Mail className="mr-2 size-4" />
                이메일로 로그인
              </>
            )}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <Link href="/onboarding" className="font-bold text-red-600">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
