import Link from "next/link";
import {
  Zap, TrendingUp, Users, BarChart3, CheckCircle2, ArrowRight,
  Play, Star, Shield, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "카테고리 매칭 패널",
    description: "해당 채널의 실제 시청자 페르소나와 일치하는 테스터 풀로 정확한 검증",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "업로드 전 CTR 예측",
    description: "영상 제작 전에 클릭률 우열을 정량 데이터로 확보해 매몰비용 제거",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "채널 누적 인사이트",
    description: "채널별 썸네일 요소 분석 누적 → AI 기반 다음 썸네일 제작 가이드 자동 생성",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Shield,
    title: "에이전시 전용 기능",
    description: "멀티 채널 관리, 팀 권한, 채널별 리포트까지 에이전시에 최적화된 워크플로우",
    color: "bg-purple-100 text-purple-600",
  },
];

const steps = [
  { step: "01", title: "채널 연결", description: "관리하는 YouTube 채널을 연결하고 시청자 페르소나를 설정합니다." },
  { step: "02", title: "썸네일 후보 업로드", description: "2~4개의 썸네일 시안을 드래그앤드롭으로 업로드합니다." },
  { step: "03", title: "테스터 풀 매칭", description: "채널 카테고리·연령·성별 조건에 맞는 실제 시청자 패널이 매칭됩니다." },
  { step: "04", title: "결과 & 인사이트", description: "통계적 유의성 기반 CTR 분석과 AI 요소 분석을 즉시 확인합니다." },
];

const plans = [
  {
    name: "무료",
    price: "0",
    description: "개인 크리에이터·소규모 에이전시",
    credits: 3,
    channels: 2,
    features: ["월 3회 테스트", "채널 2개", "기본 결과 분석", "이메일 지원"],
    cta: "무료로 시작",
    highlight: false,
  },
  {
    name: "Starter",
    price: "79,000",
    description: "성장하는 MCN · 5인 이하 팀",
    credits: 30,
    channels: 10,
    features: ["월 30회 테스트", "채널 10개", "AI 썸네일 분석", "채널 인사이트", "팀 멤버 3명", "우선 지원"],
    cta: "14일 무료 체험",
    highlight: true,
  },
  {
    name: "Pro",
    price: "199,000",
    description: "대형 MCN · 에이전시",
    credits: 100,
    channels: 999,
    features: ["월 100회 테스트", "채널 무제한", "AI 전체 분석", "API 연동", "팀 멤버 무제한", "전담 매니저"],
    cta: "문의하기",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "김지훈",
    role: "콘텐츠 디렉터 · ABC 크리에이터즈",
    avatar: "김",
    text: "업로드 후 CTR이 기대치를 못 미쳐서 다시 만드는 경우가 잦았는데, ThumbLab 도입 후 첫 영상부터 목표 CTR을 달성했습니다.",
  },
  {
    name: "이소연",
    role: "PD · 뷰티채널 4개 담당",
    avatar: "이",
    text: "카테고리 매칭 패널이 진짜 효과적이에요. 일반 설문과 달리 실제 뷰티 콘텐츠 시청자들의 반응을 얻을 수 있어서 신뢰도가 높습니다.",
  },
  {
    name: "박민준",
    role: "대표 · MCN 스타트업",
    avatar: "박",
    text: "채널 인사이트 기능 덕분에 팀 전체가 데이터 기반으로 썸네일을 논의하게 됐습니다. PD마다 달랐던 기준이 통일됐어요.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">ThumbLab</span>
            <span className="text-xs text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">for Agencies</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">기능</a>
            <a href="#how" className="hover:text-slate-900 transition-colors">작동 방식</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">요금제</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">무료 시작하기</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700 mb-8">
            <Star className="h-3 w-3 fill-indigo-700" />
            유튜브 MCN·에이전시 전용 썸네일 검증 SaaS
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            업로드 전에
            <span className="text-indigo-600"> CTR을 알 수 있다면</span>
            <br />
            어떻게 하시겠어요?
          </h1>
          <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            카테고리 매칭된 실제 시청자 패널로 썸네일 클릭률을 사전 검증하세요.
            <br />
            영상 제작 전에 데이터로 의사결정하는 에이전시를 위한 서비스입니다.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link href="/signup">
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/dashboard">
                <Play className="h-4 w-4" />
                데모 보기
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-400">신용카드 불필요 · 월 3회 무료 · 설정 5분</p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-16 max-w-5xl px-6">
          <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200 overflow-hidden bg-slate-100">
            {/* Mock Browser Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-200/80 border-b border-slate-300">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="mx-4 flex-1 h-5 rounded-full bg-white/60 flex items-center px-3">
                <span className="text-xs text-slate-400">thumblab.io/dashboard</span>
              </div>
            </div>
            {/* Mock Dashboard */}
            <div className="flex bg-slate-900 min-h-[360px]">
              {/* Mock Sidebar */}
              <div className="w-48 bg-slate-900 border-r border-slate-800 p-4 space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white">ThumbLab</span>
                </div>
                {["대시보드", "채널 관리", "일정 캘린더", "요금제"].map((item, i) => (
                  <div key={i} className={`rounded-lg px-3 py-1.5 text-xs ${i === 0 ? "bg-indigo-600 text-white" : "text-slate-400"}`}>
                    {item}
                  </div>
                ))}
              </div>
              {/* Mock Content */}
              <div className="flex-1 p-5">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "관리 채널", value: "12" },
                    { label: "진행 중 테스트", value: "5" },
                    { label: "이번 주 업로드", value: "8" },
                    { label: "남은 크레딧", value: "47" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-slate-400">{kpi.label}</p>
                      <p className="text-xl font-bold text-white mt-0.5">{kpi.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["게임 채널 A", "뷰티 채널 B", "테크 채널 C"].map((ch, i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {ch[0]}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{ch}</p>
                          <p className="text-[10px] text-slate-400">구독자 {["12.4만", "45.2만", "8.7만"][i]}</p>
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${[65, 48, 80][i]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">에이전시에 꼭 필요한 기능만</h2>
            <p className="mt-3 text-slate-500">직관에 의존하던 썸네일 의사결정을 데이터로 바꿉니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-slate-100 p-6 hover:border-slate-200 transition-colors">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">어떻게 작동하나요?</h2>
            <p className="mt-3 text-slate-500">5분 설정으로 첫 테스트를 시작할 수 있습니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="text-3xl font-bold text-indigo-100 mb-3">{s.step}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">에이전시들의 이야기</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">합리적인 요금제</h2>
            <p className="mt-3 text-slate-500">팀 규모와 테스트 양에 맞게 선택하세요.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  plan.highlight
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    가장 인기
                  </div>
                )}
                <h3 className={`font-bold text-lg ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>
                  {plan.description}
                </p>
                <div className="mt-4 mb-6">
                  <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    ₩{plan.price}
                  </span>
                  {plan.price !== "0" && (
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>/월</span>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-emerald-500"}`} />
                      <span className={plan.highlight ? "text-indigo-100" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlight ? "bg-white text-indigo-600 hover:bg-indigo-50" : ""}`}
                  variant={plan.highlight ? "outline" : "default"}
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-indigo-600">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Clock className="h-8 w-8 text-indigo-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">지금 바로 첫 테스트를 시작하세요</h2>
          <p className="mt-3 text-indigo-200">신용카드 없이 월 3회 무료. 에이전시 팀 계정으로 즉시 시작.</p>
          <Button variant="secondary" size="xl" className="mt-8" asChild>
            <Link href="/signup">
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">ThumbLab</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 ThumbLab. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600">개인정보처리방침</a>
            <a href="#" className="hover:text-slate-600">이용약관</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
