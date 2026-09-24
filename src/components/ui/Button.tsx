import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-accent text-background hover:bg-accent-secondary shadow-[0_0_0_1px_rgba(57,255,136,0.4)] hover:shadow-[0_0_24px_rgba(57,255,136,0.35)]",
  secondary:
    "border border-border-strong text-foreground hover:border-accent/60 hover:text-accent bg-background-secondary/50",
  ghost: "text-foreground-secondary hover:text-accent",
};

type Variant = keyof typeof variants;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: { children: ReactNode; variant?: Variant; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: { children: ReactNode; variant?: Variant; className?: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
