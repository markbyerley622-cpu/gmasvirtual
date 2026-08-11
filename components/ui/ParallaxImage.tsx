"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/primitives";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Image that drifts against the scroll inside a fixed frame.
 *
 * The inner layer is over-scaled so the travel never exposes an edge, and the
 * whole thing animates transform-only so it stays on the compositor.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  /** Travel in px across the full scroll pass. */
  distance = 48,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  distance?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  // Enough over-scale to cover the travel at both extremes.
  const scale = 1 + (distance * 2) / 420;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 gpu"
        style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
