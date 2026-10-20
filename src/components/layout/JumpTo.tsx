"use client";

/** Floating "Jump to" chip for long pages. A native <details> list, so it works without any script. */
export function JumpTo({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  return (
    <details className="no-print fixed bottom-[5.5rem] end-3 z-40 md:bottom-6 md:start-6 md:end-auto">
      <summary className="press glass flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink shadow-[var(--shadow-float)]">
        <span aria-hidden="true">☰</span>{label}
      </summary>
      <ul className="absolute bottom-[calc(100%+0.5rem)] end-0 w-56 rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-float)] md:start-0 md:end-auto">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="flex min-h-12 items-center rounded-xl px-3 text-sm text-ink hover:bg-soft">{i.label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
