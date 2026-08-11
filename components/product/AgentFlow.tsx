"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { PoweredByVirtuals } from "@/components/ui/VirtualsMark";
import { cn } from "@/lib/utils";

type Step = "working" | "done" | "paying" | "paid";

const SEQUENCE: { step: Step; hold: number }[] = [
  { step: "working", hold: 2000 },
  { step: "done", hold: 2200 },
  { step: "paying", hold: 1400 },
  { step: "paid", hold: 3000 },
];

const LOG = [
  "fetching sources",
  "reading 12 documents",
  "cross-checking claims",
  "writing summary",
];

/**
 * An agent doing work and then being paid for it. Auto-plays once the card is
 * on screen and loops. Presentation of a concept — no agent, no settlement.
 */
export function AgentFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotionSafe();
  const [i, setI] = useState(0);
  const step = SEQUENCE[i].step;

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SEQUENCE.length), SEQUENCE[i].hold);
    return () => clearTimeout(t);
  }, [i, inView, reduce]);

  const paid = step === "paid";

  return (
    <div ref={ref} className="surface surface-lift w-full max-w-[420px] rounded-[24px] p-5 sm:p-6">
      {/* Agent identity */}
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="relative flex size-2" aria-hidden>
            <span
              className={cn(
                "absolute inline-flex size-full rounded-full",
                paid ? "bg-emerald-400" : "bg-slice-400",
                step === "working" && !reduce && "animate-ping opacity-60"
              )}
            />
            <span
              className={cn(
                "relative inline-flex size-2 rounded-full",
                paid ? "bg-emerald-400" : "bg-slice-400"
              )}
            />
          </span>
          <span className="font-mono text-[11.5px] tracking-[0.04em] text-slice-300">
            agent://scout
          </span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
          {step === "working" ? "Running" : paid ? "Settled" : "Complete"}
        </span>
      </div>

      {/* Work log */}
      <div className="mt-5 min-h-[104px] space-y-1.5">
        {LOG.map((line, k) => {
          const active = step === "working" ? k <= 1 : true;
          return (
            <motion.p
              key={line}
              initial={false}
              animate={{ opacity: active ? 1 : 0.25 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 font-mono text-[11.5px] text-fg-mute"
            >
              <span className={cn(active ? "text-emerald-400" : "text-fg-faint")}>
                {active ? "✓" : "·"}
              </span>
              {line}
            </motion.p>
          );
        })}
      </div>

      {/* Result → payment */}
      <div className="mt-5 border-t border-line pt-5">
        <AnimatePresence mode="wait" initial={false}>
          {step === "working" ? (
            <motion.div
              key="w"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              className="flex items-center gap-2.5 text-[13.5px] text-fg-mute"
            >
              <span className="size-3.5 animate-spin rounded-full border-2 border-white/15 border-t-slice-400" />
              Working…
            </motion.div>
          ) : (
            <motion.div
              key="r"
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            >
              <p className="text-[14.5px] text-fg">Research completed.</p>
              <p className="mt-1 font-mono text-[11px] text-fg-faint">
                12 sources · summarised
              </p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="num text-[26px] font-semibold text-fg">3.00 USDC</span>

                <AnimatePresence mode="wait" initial={false}>
                  {paid ? (
                    <motion.span
                      key="paid"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-[13px] font-semibold text-emerald-300"
                    >
                      ✓ Paid
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "rounded-lg bg-white px-5 py-2 text-[13px] font-semibold text-ink",
                        step === "paying" && "opacity-70"
                      )}
                    >
                      {step === "paying" ? "Paying…" : "Pay"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
          Concept
        </span>
        <PoweredByVirtuals />
      </div>
    </div>
  );
}
