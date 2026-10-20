/**
 * Homeopathy artwork: original vector drawings (not photographs). The main picture follows the composition on the clinic's
 * business card: a blue-capped glass tube lying on its side, its loose cap beside it, and white globules spilled out.
 * The tube label is left blank on purpose (no remedy names). Always show a caption that calls it an illustration.
 */

const BALLS: [number, number, number][] = [
  [226, 178, 9.5], [248, 168, 9], [270, 176, 9.5], [238, 198, 9.5], [262, 202, 9], [284, 198, 9],
  [222, 218, 9], [246, 226, 9.5], [270, 228, 9], [292, 222, 8.5],
];

export function GlobuleVial({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 330 270" role="img" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id="hv-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#E6EBF5" />
          <stop offset="1" stopColor="#B7C2DA" />
        </linearGradient>
        <linearGradient id="hv-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F78D0" />
          <stop offset="0.5" stopColor="#1D4E9F" />
          <stop offset="1" stopColor="#123672" />
        </linearGradient>
        <radialGradient id="hv-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#F4F1E8" />
          <stop offset="1" stopColor="#CFC9B6" />
        </radialGradient>
        <linearGradient id="hv-loose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#C9D2E6" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ellipse cx="170" cy="252" rx="140" ry="9" fill="#13203F" opacity="0.1" />
      {/* loose cap */}
      <g transform="translate(34 150) rotate(-10)">
        <rect x="0" y="0" width="62" height="52" rx="11" fill="url(#hv-loose)" stroke="#AEB9D2" strokeWidth="1.5" />
        <g stroke="#AEB9D2" strokeWidth="1.3" opacity="0.8">
          {[10, 20, 30, 40, 50].map((x) => <path key={x} d={`M${x} 6V46`} />)}
        </g>
        <ellipse cx="62" cy="26" rx="7" ry="22" fill="#DDE3F0" stroke="#AEB9D2" strokeWidth="1.3" />
      </g>
      {/* tube lying on its side, open end towards the globules */}
      <g transform="translate(58 36) rotate(32)">
        <rect x="0" y="0" width="158" height="52" rx="10" fill="url(#hv-glass)" stroke="#9DAACB" strokeWidth="1.6" />
        <path d="M10 9h120" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* blank label */}
        <rect x="22" y="14" width="96" height="24" rx="3" fill="#FFFFFF" opacity="0.55" />
        <path d="M30 22h70M30 30h46" stroke="#C3CCE0" strokeWidth="3" strokeLinecap="round" />
        {/* blue cap and open end */}
        <rect x="150" y="-3" width="34" height="58" rx="9" fill="url(#hv-cap)" />
        <path d="M156 5v42" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
        <ellipse cx="184" cy="26" rx="9" ry="27" fill="#13203F" />
        <ellipse cx="183" cy="26" rx="6" ry="22" fill="#0B1430" />
      </g>
      {/* spilled globules */}
      {BALLS.map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <ellipse cx={x + 2} cy={y + r * 0.85} rx={r * 0.9} ry={r * 0.35} fill="#13203F" opacity="0.14" />
          <circle cx={x} cy={y} r={r} fill="url(#hv-ball)" stroke="#BDB6A0" strokeWidth="0.7" />
        </g>
      ))}
    </svg>
  );
}

/** Small cobalt line glyphs, in the same style as the site icon set. */
const glyphs = {
  globules: <><circle cx="8" cy="9" r="2.6" /><circle cx="15.5" cy="8" r="2.6" /><circle cx="12" cy="14.5" r="2.6" /><circle cx="18" cy="15.5" r="2.2" /><circle cx="6.5" cy="16.5" r="2.2" /></>,
  vial: <><path d="M9 3h6M10 3v3M14 3v3" /><rect x="8" y="6" width="8" height="15" rx="2.2" /><path d="M8 11h8" /></>,
  dropper: <><path d="M10 3h4v4h-4z" /><path d="M8 7h8v3a4 4 0 0 1-8 0V7Z" /><path d="M9 14v5.5a3 3 0 0 0 6 0V14" /><path d="M9 17h6" /></>,
  leaf: <><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" /><path d="M5 19 14 10" /></>,
  mortar: <><path d="M4 11h16a8 8 0 0 1-16 0Z" /><path d="M9 20h6" /><path d="M13 3l4 4-5 5" /></>,
} as const;

export type HomeoGlyphName = keyof typeof glyphs;
export const HOMEO_GLYPHS = Object.keys(glyphs) as HomeoGlyphName[];

export function HomeoGlyph({ name, className = "h-6 w-6" }: { name: HomeoGlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {glyphs[name]}
    </svg>
  );
}

/** A few spilled globules as a quiet watermark for card corners. Decorative only. */
export function GlobuleScatter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id="gs-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D8D2BF" />
        </radialGradient>
      </defs>
      {[[22, 52, 9], [44, 40, 8.5], [66, 54, 9], [88, 38, 8], [98, 60, 8.5], [54, 68, 7.5], [30, 26, 7]].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="url(#gs-ball)" stroke="#BDB6A0" strokeWidth="0.7" />
      ))}
    </svg>
  );
}
