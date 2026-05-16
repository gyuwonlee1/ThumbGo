import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45",
        variant === "primary" && "bg-red-600 text-white shadow-sm shadow-red-200",
        variant === "secondary" &&
          "border border-gray-200 bg-white text-gray-900 shadow-sm",
        variant === "ghost" && "bg-transparent text-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
