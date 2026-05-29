import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded border border-copper/50 bg-obsidian px-3 text-sm text-ink outline-none transition focus:border-warning focus:ring-1 focus:ring-warning/50",
        className
      )}
      {...props}
    />
  );
}
