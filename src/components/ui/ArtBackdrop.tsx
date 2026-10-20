import Image from "next/image";

/**
 * Subtle decorative artwork behind a section. Purely decorative (empty alt, aria-hidden), faded at the edges so text stays on a clean
 * ground, hidden in dark mode (the artwork is on ivory) and, when `desktopOnly`, hidden on phones.
 */
export function ArtBackdrop({
  src,
  className = "",
  opacity = 0.7,
  position = "center",
  desktopOnly = false,
  fade = "to bottom",
  priority = false,
}: {
  src: string;
  className?: string;
  opacity?: number;
  position?: string;
  desktopOnly?: boolean;
  fade?: string;
  priority?: boolean;
}) {
  const mask = `linear-gradient(${fade}, #000 35%, transparent)`;
  return (
    <div
      aria-hidden="true"
      className={`art-light pointer-events-none absolute z-0 overflow-hidden ${desktopOnly ? "hidden md:block" : ""} ${className}`}
      style={{ WebkitMaskImage: mask, maskImage: mask, opacity }}
    >
      <Image src={src} alt="" fill sizes="(min-width:1280px) 1280px, 100vw" quality={70} priority={priority} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}
