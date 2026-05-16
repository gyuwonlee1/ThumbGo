import type { PropsWithChildren } from "react";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white shadow-[0_0_40px_rgba(15,15,15,0.06)]">
      <main className="min-h-dvh pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
