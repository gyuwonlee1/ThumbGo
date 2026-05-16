"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300",
        outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100",
        ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200",
        destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        success: "bg-emerald-500 text-white hover:bg-emerald-600",
        link: "text-indigo-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "text-xs px-3 py-1.5 h-7",
        md: "text-sm px-4 py-2 h-9",
        lg: "text-sm px-5 py-2.5 h-10",
        xl: "text-base px-6 py-3 h-12",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
