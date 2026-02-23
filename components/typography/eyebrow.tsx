import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  as?: "p" | "div" | "span";
  className?: string;
  variant?: "accent" | "muted";
};

const eyebrowVariantClassName: Record<NonNullable<EyebrowProps["variant"]>, string> = {
  accent: "text-accent/90",
  muted: "text-muted-foreground"
};

export function Eyebrow({ children, as: Component = "p", className, variant = "accent" }: EyebrowProps) {
  return (
    <Component
      className={cn(
        "uppercase tracking-[0.22em] text-xs sm:text-sm font-medium leading-none",
        eyebrowVariantClassName[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
