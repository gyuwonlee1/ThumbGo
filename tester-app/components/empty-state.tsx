import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[58dvh] flex-col items-center justify-center px-8 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-700">{icon}</div>
      <h2 className="text-lg font-bold text-gray-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
      {action ? <div className="mt-6 w-full">{action}</div> : null}
    </div>
  );
}
