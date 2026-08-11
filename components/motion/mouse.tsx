"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * A single pointer signal for the whole page.
 *
 * One listener at the root feeds normalised springs (-0.5 → 0.5 per axis).
 * Components subscribe via `useParallax(depth)`. Doing this once rather than
 * per-component is what keeps cursor motion at display refresh rate no matter
 * how many layers react to it.
 */

type Ctx = {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
};

const MouseCtx = createContext<Ctx | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawPX = useMotionValue(0);
  const rawPY = useMotionValue(0);

  const spring = { stiffness: 110, damping: 22, mass: 0.4 };
  const nx = useSpring(rawX, spring);
  const ny = useSpring(rawY, spring);
  const px = useSpring(rawPX, { stiffness: 260, damping: 34, mass: 0.5 });
  const py = useSpring(rawPY, { stiffness: 260, damping: 34, mass: 0.5 });

  useEffect(() => {
    // Coarse pointers have no hover state — skip the listener entirely.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(e.clientX / window.innerWidth - 0.5);
        rawY.set(e.clientY / window.innerHeight - 0.5);
        rawPX.set(e.clientX);
        rawPY.set(e.clientY);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rawX, rawY, rawPX, rawPY]);

  return <MouseCtx.Provider value={{ nx, ny, px, py }}>{children}</MouseCtx.Provider>;
}

function useMouse() {
  return useContext(MouseCtx);
}

/** Translate by `depth` px at the viewport edges. Negative depth inverts. */
export function useParallax(depth = 12) {
  const ctx = useMouse();
  const zero = useMotionValue(0);
  const source = ctx ?? { nx: zero, ny: zero };
  return {
    x: useTransform(source.nx, (v) => v * depth * 2),
    y: useTransform(source.ny, (v) => v * depth * 2),
  };
}

/** Wrap anything to give it cursor parallax without touching its layout. */
export function Parallax({
  depth = 12,
  children,
  className,
}: {
  depth?: number;
  children: ReactNode;
  className?: string;
}) {
  // Always the same element type — the pointer listener is simply never
  // attached on coarse pointers, and the springs stay at zero.
  const p = useParallax(depth);
  return (
    <motion.div style={{ x: p.x, y: p.y }} className={cn("gpu", className)}>
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the cursor. Used for the floating product UI. */
export function TiltCard({
  children,
  className,
  strength = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceRef = useRef(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const sx = useSpring(mx, { stiffness: 240, damping: 20 });
  const sy = useSpring(my, { stiffness: 240, damping: 20 });

  const rotateX = useTransform(sy, (v) => -v * strength);
  const rotateY = useTransform(sx, (v) => v * strength);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduceRef.current) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
