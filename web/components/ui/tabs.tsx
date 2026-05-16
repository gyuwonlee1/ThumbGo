"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-center gap-1 border-b border-slate-200 pb-0", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors",
        "hover:text-slate-900",
        "data-[state=active]:text-indigo-600",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-t-full after:bg-indigo-600 after:scale-x-0 after:transition-transform",
        "data-[state=active]:after:scale-x-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-lg",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    />
  );
}
