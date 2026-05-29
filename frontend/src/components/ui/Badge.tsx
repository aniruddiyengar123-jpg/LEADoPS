import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const toneClasses = {
  neutral: "border border-sand/25 bg-sand/10 text-sand",
  blue: "border border-sky-300/30 bg-sky-400/10 text-sky-200",
  green: "border border-success/30 bg-success/10 text-success",
  amber: "border border-warning/35 bg-warning/10 text-warning",
  red: "border border-danger/35 bg-danger/10 text-danger"
};

export function Badge({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return <span className={cn("rounded px-2 py-1 text-xs font-medium", toneClasses[tone])}>{children}</span>;
}
