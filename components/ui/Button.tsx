import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared CTA. The arrow nudges on hover and the whole control lifts slightly —
 * enough tactility to feel responsive, not enough to be a party trick.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 will-change-transform",
        size === "md" && "px-6 py-3 text-[14.5px]",
        size === "lg" && "px-7 py-3.5 text-[15.5px]",
        variant === "primary" &&
          "bg-crust text-ink shadow-[0_8px_30px_-8px_rgba(255,210,30,0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(255,210,30,0.6)]",
        variant === "ghost" &&
          "border border-line-2 text-fg hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.04]",
        className
      )}
    >
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </a>
  );
}
