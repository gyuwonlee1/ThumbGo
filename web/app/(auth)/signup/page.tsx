"use client";

import Link from "next/link";
import { Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "월 3회 무료 썸네일 테스트",
  "채널 2개 무료 연결",
  "신용카드 불필요",
  "5분 내 첫 테스트 시작",
];

export default function SignupPage() {
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

          <button className="w-full flex items-center justify-center gap-3 h-10 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google로 회원가입
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
            <div className="grid grid-cols-2 gap-3">
              <Input id="fname" label="이름" placeholder="홍" required />
              <Input id="lname" label="성" placeholder="길동" required />
            </div>
            <Input id="agency" label="에이전시명" placeholder="ABC 크리에이터즈" required />
            <Input id="email" type="email" label="이메일" placeholder="agency@example.com" required />
            <Input
              id="password"
              type="password"
              label="비밀번호"
              placeholder="8자 이상"
              hint="영문·숫자·특수문자 조합 권장"
              required
            />
            <div className="text-xs text-slate-400 leading-relaxed">
              가입하면{" "}
              <a href="#" className="text-indigo-600 hover:underline">이용약관</a>과{" "}
              <a href="#" className="text-indigo-600 hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
            </div>
            <Button type="submit" className="w-full" size="lg">
              무료 계정 만들기
            </Button>
          </form>

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
