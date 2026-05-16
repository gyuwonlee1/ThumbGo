"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MonitorPlay,
  Calendar,
  CreditCard,
  Users,
  Settings,
  ChevronRight,
  Zap,
  Bell,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "채널 관리", href: "/channels", icon: MonitorPlay },
  { label: "일정 캘린더", href: "/calendar", icon: Calendar },
  { label: "요금제·결제", href: "/billing", icon: CreditCard },
];

const settingsItems = [
  { label: "팀 관리", href: "/settings/team", icon: Users },
  { label: "프로필 설정", href: "/settings/profile", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 flex flex-col bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white">썸네일고수</span>
          <span className="text-xs text-slate-400 block -mt-0.5">for Agencies</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          메뉴
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-3 w-3 opacity-60" />}
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            설정
          </p>
          {settingsItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Credits Banner */}
      <div className="mx-3 mb-3 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-800 p-3 border border-indigo-700">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-indigo-200">남은 크레딧</span>
          <span className="text-sm font-bold text-white">47</span>
        </div>
        <div className="h-1.5 rounded-full bg-indigo-700/50 overflow-hidden">
          <div className="h-full w-[47%] rounded-full bg-indigo-400" />
        </div>
        <Link
          href="/billing"
          className="mt-2 block text-center text-xs font-medium text-indigo-300 hover:text-white transition-colors"
        >
          크레딧 충전하기 →
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3 space-y-0.5">
        <Link href="/settings/profile#notifications" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Bell className="h-4 w-4" />
          알림
        </Link>
        <button
          onClick={() => router.push("/login")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
