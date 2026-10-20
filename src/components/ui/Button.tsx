import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-200 focus-visible:outline-offset-4";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-onprimary hover:brightness-110",
  secondary: "border border-primary/50 text-primary hover:bg-soft",
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
