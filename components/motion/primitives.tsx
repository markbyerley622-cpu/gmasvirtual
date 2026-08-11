"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One easing curve across the whole site. This is what makes the page feel
 * like a single object rather than twenty separate animations.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hydration-safe reduced-motion.
 *
 * framer's `useReducedMotion` reads the media query during the first client
 * render, so it can disagree with the server (which always sees `false`) and
 * produce a hydration mismatch. This returns `false` through hydration and
 * flips in an effect — one frame of motion for reduced-motion users at worst,
 * against a guaranteed-consistent tree.
 */
export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** The house entrance: rise + fade + a touch of defocus resolving. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Scroll-triggered stagger container. Children must be <Item>.
 * `once` so nothing re-animates on the way back up.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
  onMount = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  /** Play immediately instead of on scroll — used by the hero. */
  onMount?: boolean;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-70px" } })}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function Item({
  children,
  className,
  duration = 0.85,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  as?: "div" | "li" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={rise} transition={{ duration, ease: EASE }}>
      {children}
    </Tag>
  );
}

/** Standalone reveal for one-off elements outside a Stagger. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 0.85,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Counts up once in view. Tabular figures so the layout never jitters. */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotionSafe();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const fmt = (v: number) =>
      prefix +
      v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix;

    if (reduce) {
      if (inView && ref.current) ref.current.textContent = fmt(to);
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = fmt(v);
    });
  }, [spring, decimals, prefix, suffix, reduce, inView, to]);

  return (
    <span ref={ref} className={cn("num", className)}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Animated dashed connector for value-flow diagrams. */
export function FlowLine({
  d,
  color = "var(--color-slice-400)",
  delay = 0,
  width = 1.5,
}: {
  d: string;
  color?: string;
  delay?: number;
  width?: number;
}) {
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.09)" strokeWidth={width} fill="none" />
      <path
        d={d}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeDasharray="5 7"
        style={{
          animation: "flow 1.1s linear infinite",
          animationDelay: `${delay}s`,
          filter: `drop-shadow(0 0 5px ${color})`,
        }}
      />
    </>
  );
}
