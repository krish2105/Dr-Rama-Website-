import { ArtBackdrop } from "./ArtBackdrop";

/** Blue-pottery artwork behind a page: ivory art in light mode, night art in dark mode, on phones and desktops. */
export function PageBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ArtBackdrop src="/art/services-bg.webp" className="inset-x-0 -top-24 h-[28rem]" opacity={0.8} />
      <ArtBackdrop src="/art/dark-pattern.webp" dark className="inset-x-0 -top-24 h-[22rem]" opacity={0.3} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
