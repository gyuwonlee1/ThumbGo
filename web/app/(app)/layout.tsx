import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-60">
        {children}
      </div>
    </div>
  );
}
