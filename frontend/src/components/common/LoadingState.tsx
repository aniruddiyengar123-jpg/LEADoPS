export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded border border-copper/45 bg-[#101211] p-6 text-sm text-sand/75">
      {label}
    </div>
  );
}
