"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-slate-900 p-12 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">ThumbLab</span>
        </Link>
        <div>
          <blockquote className="text-xl font-medium text-white leading-relaxed mb-4">
            "ThumbLab 도입 후 썸네일 재작업 비용이 40% 줄었습니다. 데이터로 의사결정하는 것이 이렇게 간단할 줄 몰랐어요."
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
        <p className="text-xs text-slate-500">© 2026 ThumbLab</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 lg:hidden mb-8">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900">ThumbLab</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">다시 오셨군요!</h1>
            <p className="text-sm text-slate-500 mt-1">에이전시 계정으로 로그인하세요.</p>
          </div>

          {/* Google OAuth */}
          <button className="w-full flex items-center justify-center gap-3 h-10 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google로 계속하기
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">또는 이메일로</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
            <Input
              id="email"
              type="email"
              label="이메일"
              placeholder="agency@example.com"
              required
            />
            <Input
              id="password"
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-200 text-indigo-600" />
                로그인 상태 유지
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">비밀번호 찾기</a>
            </div>
            <Button type="submit" className="w-full" size="lg">
              로그인
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
