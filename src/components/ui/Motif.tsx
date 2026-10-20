/** Decorative blue-pottery motifs (vector art, never a stand-in for a real photo). */
export function Rosette({ className = "", petals = 12 }: { className?: string; petals?: number }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="100" cy="100" r="92" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="70" strokeDasharray="2 7" strokeLinecap="round" />
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="100" cy="30" rx="9" ry="22" transform={`rotate(${(360 / petals) * i} 100 100)`} />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <circle key={`d${i}`} cx="100" cy="14" r="2.5" fill="currentColor" stroke="none" transform={`rotate(${(360 / petals) * i + 360 / petals / 2} 100 100)`} />
      ))}
    </svg>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <rect width="40" height="40" rx="13" fill="currentColor" />
      <g transform="translate(20 20)" fill="none" stroke="var(--on-primary)" strokeWidth="1.5">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-8" rx="2.6" ry="5.4" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="2" fill="var(--on-primary)" stroke="none" />
      </g>
    </svg>
  );
}
