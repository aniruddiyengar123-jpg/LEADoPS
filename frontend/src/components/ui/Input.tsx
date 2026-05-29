import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded border border-copper/50 bg-obsidian px-3 text-sm text-ink outline-none transition placeholder:text-stone-600 focus:border-warning focus:ring-1 focus:ring-warning/50",
        className
      )}
      {...props}
    />
  );
}
