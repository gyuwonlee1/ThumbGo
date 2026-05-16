"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "./bottom-nav";
import { useAuth } from "@/lib/auth-context";

export function AppShell({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white shadow-[0_0_40px_rgba(15,15,15,0.06)]">
      <main className="min-h-dvh pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
