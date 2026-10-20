/**
 * Subtle decorative artwork behind a section, drawn as a CSS background so the browser finds it early (it is often the largest
 * thing on screen) and never downloads the version for the other theme: hidden elements do not fetch their backgrounds.
 * Phones get the smaller "-sm" file. Purely decorative (aria-hidden), faded at the edges so text stays on a clean ground.
 * Light art sits on ivory and is hidden in dark mode; `dark` art shows only in dark mode. `desktopOnly` hides it on phones.
 */
export function ArtBackdrop({
  src,
  className = "",
  opacity = 0.7,
  position = "center",
  desktopOnly = false,
  fade = "to bottom",
  dark = false,
}: {
  src: string;
  className?: string;
  opacity?: number;
  position?: string;
  desktopOnly?: boolean;
  fade?: string;
  dark?: boolean;
}) {
  const mask = `linear-gradient(${fade}, #000 35%, transparent)`;
  const small = src.replace(/\.webp$/, "-sm.webp");
  return (
    <div
      aria-hidden="true"
      className={`art-bg ${dark ? "art-dark" : "art-light"} pointer-events-none absolute z-0 overflow-hidden ${desktopOnly && !dark ? "hidden md:block" : ""} ${className}`}
      style={{ WebkitMaskImage: mask, maskImage: mask, opacity, backgroundPosition: position, ["--bg" as string]: `url(${src})`, ["--bg-sm" as string]: `url(${small})` }}
    />
  );
}
