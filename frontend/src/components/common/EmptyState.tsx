import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="grid min-h-48 place-items-center rounded border border-dashed border-copper/55 bg-[#101211] p-8 text-center">
      <div>
        <h2 className="text-base font-semibold text-warning">{title}</h2>
        <p className="mt-1 text-sm text-sand/75">{description}</p>
        {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}
