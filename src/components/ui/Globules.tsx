/**
 * Blue-pottery bowl of homeopathic globules. An original vector illustration (not a photograph, no remedy label),
 * always shown with a caption that says it is an illustration. Colours come from the site tokens, so it follows light and dark.
 */
export function Globules({ className = "" }: { className?: string }) {
  const balls: [number, number, number][] = [
    [64, 70, 9], [82, 62, 9.5], [101, 58, 10], [120, 60, 9.5], [138, 66, 9], [156, 74, 8.5],
    [73, 84, 9], [92, 78, 9.5], [111, 76, 10], [130, 80, 9.5], [148, 86, 9],
    [84, 96, 8.5], [103, 94, 9], [122, 96, 8.5], [139, 98, 8],
  ];
  return (
    <svg viewBox="0 0 220 150" role="img" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id="gl-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#F6F1E4" />
          <stop offset="1" stopColor="#D9D2BE" />
        </radialGradient>
        <clipPath id="gl-bowl"><path d="M38 100h144c0 34-28 46-72 46S38 134 38 100z" /></clipPath>
      </defs>
      <ellipse cx="110" cy="144" rx="58" ry="5" fill="#13203F" opacity="0.12" />
      {balls.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x + 2} cy={y + 8} r={r} fill="url(#gl-ball)" stroke="#BFB7A0" strokeWidth="0.6" />
      ))}
      {/* bowl */}
      <path d="M38 100h144c0 34-28 46-72 46S38 134 38 100z" fill="#F6F1E4" stroke="#1D4E9F" strokeWidth="2.5" />
      <g clipPath="url(#gl-bowl)">
        <path d="M30 112h160M34 124h152" stroke="#1D4E9F" strokeWidth="1.2" opacity="0.5" />
        <g fill="#1D4E9F">
          {[62, 86, 110, 134, 158].map((x) => (
            <g key={x} transform={`translate(${x} 122)`}>
              <circle r="3.2" fill="#8DB0F2" /><circle r="1.4" fill="#1D4E9F" />
              {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-8" rx="2.6" ry="5" transform={`rotate(${a})`} fill="#1D4E9F" opacity="0.85" />)}
            </g>
          ))}
        </g>
      </g>
      <path d="M34 100h152" stroke="#B58A33" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 100c10 5 20 5 30 0s20-5 30 0 20 5 30 0 20-5 30 0 20 5 24 0" fill="none" stroke="#1D4E9F" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}
