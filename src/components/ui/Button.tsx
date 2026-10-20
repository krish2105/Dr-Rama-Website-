import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-colors duration-200 focus-visible:outline-offset-4";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-onprimary shadow-[0_6px_16px_color-mix(in_srgb,var(--primary)_30%,transparent)] hover:brightness-110",
  secondary: "border-2 border-primary text-primary hover:bg-soft",
  ghost: "text-primary hover:bg-soft",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function ExternalButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export const buttonClass = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;
