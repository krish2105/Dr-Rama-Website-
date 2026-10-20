/** Cobalt line icons matching the approved icon set (re-drawn as SVG so they stay sharp and themeable). */
const paths: Record<string, React.ReactNode> = {
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  whatsapp: <><path d="M4 20l1.3-4.1A8 8 0 1 1 8.2 18.8L4 20Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.7a3.5 3.5 0 0 1-1.9-1.9l.7-.8-1-2L9 9.5Z" /></>,
  pin: <><path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.8" r="2.4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  directions: <path d="M4 11.5 20 4l-7.5 16-2.2-6.3L4 11.5Z" />,
  clipboard: <><rect x="5.5" y="4.5" width="13" height="16.5" rx="2.2" /><path d="M9 4.5V3.2h6v1.3" /><path d="M9 10h6M9 13.5h3" /></>,
  question: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.6a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2.9-1.2 1.8" /><path d="M12 16.9h.01" /></>,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

/** Icon inside the thin cobalt ring used by the approved set. Decorative: the label next to it carries the meaning. */
export function IconBadge({ name }: { name: IconName }) {
  return (
    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/35 text-primary">
      <Icon name={name} />
    </span>
  );
}
