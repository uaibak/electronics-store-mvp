"use client";

import { UILabel } from "@/components/ui/label";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  id: string;
  className?: string;
};

export function FormField({ label, id, className = "", ...props }: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <UILabel htmlFor={id}>{label}</UILabel>
      <Input id={id} {...props} />
    </div>
  );
}

export function TextAreaField({ label, id, className = "", ...props }: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <UILabel htmlFor={id}>{label}</UILabel>
      <textarea
        id={id}
        className="min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-accent"
        {...props}
      />
    </div>
  );
}
