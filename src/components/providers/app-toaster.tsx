"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex w-full items-start gap-3 rounded-[24px] border border-primary/10 bg-white/95 p-4 text-primary shadow-soft backdrop-blur",
          title: "font-heading text-sm font-semibold text-primary",
          description: "mt-1 text-sm leading-6 text-slate-600",
          actionButton:
            "rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700",
          cancelButton:
            "rounded-full border border-primary/10 bg-slate-50 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-slate-100",
          success:
            "border-emerald-200 bg-[linear-gradient(135deg,rgba(16,185,129,0.10),rgba(255,255,255,0.96))]",
          error:
            "border-rose-200 bg-[linear-gradient(135deg,rgba(244,63,94,0.10),rgba(255,255,255,0.96))]",
          warning:
            "border-amber-200 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),rgba(255,255,255,0.96))]",
          info:
            "border-blue-200 bg-[linear-gradient(135deg,rgba(37,99,235,0.10),rgba(255,255,255,0.96))]"
        }
      }}
    />
  );
}
