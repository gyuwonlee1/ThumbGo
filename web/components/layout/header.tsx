"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function Header({ title, description, action }: HeaderProps) {
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

      <button className="relative h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {action && (
        <Button size="sm" asChild>
          <Link href={action.href}>
            <Plus className="h-3.5 w-3.5" />
            {action.label}
          </Link>
        </Button>
      )}

      {/* Avatar */}
      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
        A
      </div>
    </header>
  );
}
