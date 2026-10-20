"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="press no-print inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary hover:bg-soft">
      {label}
    </button>
  );
}
