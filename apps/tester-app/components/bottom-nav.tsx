"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Coins, Home, Play, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "홈", icon: Home },
  { href: "/test", label: "테스트", icon: Play },
  { href: "/me/scorecard", label: "성적표", icon: BarChart3 },
  { href: "/me/coins", label: "코인", icon: Coins },
  { href: "/me/profile", label: "프로필", icon: User }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto h-[64px] max-w-md border-t border-gray-200 bg-white/95 px-1 backdrop-blur">
      <div className="grid h-full grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className="flex min-w-0 flex-col items-center justify-center gap-1"
              href={tab.href}
              key={tab.href}
            >
              <Icon
                aria-hidden
                className={cn(
                  "size-5",
                  isActive ? "text-red-600" : "text-gray-500"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "truncate text-[11px]",
                  isActive ? "font-semibold text-red-600" : "text-gray-500"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
