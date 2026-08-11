"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PoweredByVirtuals } from "@/components/ui/VirtualsMark";
import { cn } from "@/lib/utils";

const FIELDS = [
  { label: "Entry", value: "3,180 – 3,240" },
  { label: "Invalidation", value: "2,940" },
  { label: "Targets", value: "3,520 / 3,800" },
];

/**
 * Concept UI for paid content: the teaser is public, the substance sits behind
 * a payment. Unlocking is a local demo — there is no content behind it.
 */
export function LockedPlay() {
  const [unlocked, setUnlocked] = useState(false);
  const reduce = useReducedMotionSafe();

  return (
    <div className="relative w-full max-w-[420px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(31,92,255,0.26), transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      <div className="surface-solid surface-lift overflow-hidden rounded-[24px]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <span className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg border border-line bg-white/[0.03] font-mono text-[10.5px] text-fg-dim">
              ETH
            </span>
            <span className="text-[14.5px] font-semibold tracking-[-0.02em] text-fg">
              Friday Trade Setup
            </span>
          </span>
          <StatusBadge status="soon" />
        </div>

        <div className="px-5 py-5">
          <p className="text-[14.5px] leading-relaxed text-fg-dim">
            ETH looks ready for the next leg. Full thesis, levels and invalidation
            inside.
          </p>

          <dl className="mt-5 space-y-0">
            {FIELDS.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0"
              >
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">
                  {f.label}
                </dt>
                <dd className="num text-[13.5px] text-fg">
                  <motion.span
                    className="inline-block select-none"
                    initial={false}
                    animate={{
                      filter: unlocked ? "blur(0px)" : "blur(7px)",
                      opacity: unlocked ? 1 : 0.5,
                    }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      delay: reduce ? 0 : unlocked ? i * 0.09 : 0,
                      ease: EASE,
                    }}
                  >
                    {f.value}
                  </motion.span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Lock / unlock */}
          <div className="mt-5">
            <AnimatePresence mode="wait" initial={false}>
              {unlocked ? (
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                >
                  <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-3 text-[13.5px] leading-relaxed text-fg-dim">
                    Unlocked. In the real product the full write-up would appear here.
                  </p>
                  <button
                    type="button"
                    onClick={() => setUnlocked(false)}
                    className="mt-3 w-full rounded-xl border border-line py-3 text-[13.5px] font-medium text-fg-mute transition-colors hover:border-line-2 hover:text-fg"
                  >
                    Lock again
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="locked"
                  type="button"
                  onClick={() => setUnlocked(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                  className="group relative w-full overflow-hidden rounded-xl bg-crust py-3.5 text-[14.5px] font-semibold text-ink transition-all duration-300 hover:brightness-[1.06] active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none">
                      <path
                        d="M7 10V7a5 5 0 0 1 10 0v3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="origin-bottom transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:rotate-[14deg]"
                      />
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="10"
                        rx="2.5"
                        fill="currentColor"
                      />
                    </svg>
                    Unlock for $5
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent group-hover:animate-[sweep_0.9s_ease-out]"
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint"
              )}
            >
              Concept
            </span>
            <PoweredByVirtuals />
          </div>
        </div>
      </div>
    </div>
  );
}
