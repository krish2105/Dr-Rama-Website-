/** Decorative botanical line art (vector, not a photo of anything real). */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M80 214 C78 160 84 110 76 20" />
      <path d="M79 190 C58 184 42 170 36 150 C58 150 74 164 79 190Z" />
      <path d="M79 190 C100 182 116 168 122 148 C100 148 84 162 79 190Z" />
      <path d="M78 150 C58 142 46 128 42 108 C62 110 74 124 78 150Z" />
      <path d="M78 150 C98 142 110 128 114 108 C94 110 82 124 78 150Z" />
      <path d="M77 110 C60 102 52 88 50 70 C68 72 76 86 77 110Z" />
      <path d="M77 110 C94 102 102 88 104 70 C86 72 78 86 77 110Z" />
      <path d="M76 72 C66 62 64 48 68 36 C78 44 80 58 76 72Z" />
      <path d="M76 20 C70 12 72 6 80 4 C86 10 84 16 76 20Z" />
      <path d="M79 190 C70 168 56 156 40 150" opacity=".5" />
      <path d="M79 190 C90 168 104 156 120 148" opacity=".5" />
    </svg>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <rect width="40" height="40" rx="11" fill="currentColor" opacity=".12" />
      <path d="M20 33 C19 26 21 20 20 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 26 C14 25 10 21 9 16 C15 16 19 20 20 26Z" fill="currentColor" />
      <path d="M20 20 C26 19 30 15 31 10 C25 10 21 14 20 20Z" fill="currentColor" opacity=".7" />
    </svg>
  );
}
