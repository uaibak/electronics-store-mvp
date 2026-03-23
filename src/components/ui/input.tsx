"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const UIInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border bg-white px-4 py-2 text-sm text-foreground shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-accent",
        className
      )}
      {...props}
    />
  )
);

UIInput.displayName = "UIInput";
