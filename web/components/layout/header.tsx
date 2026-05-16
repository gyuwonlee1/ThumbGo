"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Plus, FlaskConical, Clock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

const NOTIFICATIONS = [
  {
    id: "n1",
    icon: FlaskConical,
    color: "bg-emerald-100 text-emerald-600",
    title: "테스트 완료",
    body: "롤 시즌 14 격변 리뷰 썸네일 테스트가 완료됐습니다.",
    time: "방금 전",
    unread: true,
  },
  {
    id: "n2",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
    title: "마감 임박",
    body: "가을 감성 메이크업 테스트가 2시간 후 마감됩니다.",
    time: "1시간 전",
    unread: true,
  },
  {
    id: "n3",
    icon: Coins,
    color: "bg-indigo-100 text-indigo-600",
    title: "크레딧 부족",
    body: "남은 크레딧이 5개 이하입니다. 충전을 고려해 보세요.",
    time: "3시간 전",
    unread: false,
  },
];

export function Header({ title, description, action }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur px-6">
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h1 className="text-base font-semibold text-slate-900">{title}</h1>
          {description && (
            <span className="text-sm text-slate-400">{description}</span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="검색..."
          className="h-8 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Notification Bell */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-10 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900">
                알림
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs font-bold text-white bg-red-500 rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </p>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  모두 읽음
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? "bg-indigo-50/40" : ""}`}
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((x) => x.id === n.id ? { ...x, unread: false } : x)
                      )
                    }
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                    {n.unread && (
                      <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
            {notifications.every((n) => !n.unread) && (
              <p className="text-xs text-slate-400 text-center py-4">모든 알림을 읽었습니다.</p>
            )}
          </div>
        )}
      </div>

      {action && (
        <Button size="sm" asChild>
          <Link href={action.href}>
            <Plus className="h-3.5 w-3.5" />
            {action.label}
          </Link>
        </Button>
      )}

      {/* Avatar */}
      <Link href="/settings/profile">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity">
          A
        </div>
      </Link>
    </header>
  );
}
