"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { SliceGlyph } from "@/components/ui/SliceGlyph";
import { PoweredByVirtuals } from "@/components/ui/VirtualsMark";
import { cn } from "@/lib/utils";

const TIERS = [
  { slices: 1, usd: 5 },
  { slices: 3, usd: 10 },
  { slices: 5, usd: 25 },
] as const;

type Phase = "idle" | "sending" | "sent";

/**
 * The product's core surface: what a supporter sees when they open someone's
 * Slice link. Fully interactive but entirely local — it settles nothing and
 * talks to no backend. Labelled Demo in its own footer.
 */
export function SliceCard({ className }: { className?: string }) {
  const [tier, setTier] = useState(1);
  const [custom, setCustom] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const reduce = useReducedMotionSafe();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const amount = custom ? Number(custom) || 0 : TIERS[tier].usd;
  const slices = custom ? Math.max(1, Math.round(amount / 5)) : TIERS[tier].slices;

  const send = () => {
    if (phase !== "idle") return;
    setPhase("sending");
    timers.current.push(setTimeout(() => setPhase("sent"), reduce ? 0 : 1150));
  };

  const reset = () => {
    setPhase("idle");
    setMessage("");
    setCustom("");
  };

  return (
    <div className={cn("relative w-full max-w-[400px]", className)}>
      {/* Ambient glow sits well outside the card: any closer and it washes
          through the translucent panel as a visible blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(31,92,255,0.32), transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      <div className="surface-solid surface-lift overflow-hidden rounded-[24px]">
        {/* Browser chrome grounds it as a real link someone opened */}
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-[7px] rounded-full bg-white/15" />
            <span className="size-[7px] rounded-full bg-white/15" />
            <span className="size-[7px] rounded-full bg-white/15" />
          </span>
          <span className="mx-auto truncate rounded-md border border-line bg-black/30 px-3 py-[3px] font-mono text-[10.5px] text-fg-mute">
            gbms.xyz/pizzapepe
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {phase === "sent" ? (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
              className="px-6 py-9 text-center"
            >
              <motion.div
                initial={{ scale: reduce ? 1 : 0.55, rotate: reduce ? 0 : -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 15 }}
                className="glow-crust mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-crust"
              >
                <SliceGlyph size={30} className="text-ink" />
              </motion.div>

              <p className="display text-[26px] text-fg">Slice sent.</p>
              <p className="mt-1.5 text-[13.5px] text-fg-mute">
                {slices} {slices === 1 ? "slice" : "slices"} to{" "}
                <span className="text-fg-dim">@pizzapepe</span>
              </p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.18, duration: 0.5, ease: EASE }}
                className="num mt-5 text-[42px] font-semibold text-crust"
              >
                ${amount.toFixed(2)}
              </motion.p>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.3, duration: 0.5, ease: EASE }}
                  className="mx-auto mt-5 max-w-[280px] rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[13.5px] text-fg-dim italic"
                >
                  “{message}”
                </motion.p>
              )}

              <button
                onClick={reset}
                className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint transition-colors hover:text-fg"
              >
                Replay demo
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              className="p-5 sm:p-6"
            >
              {/* Creator */}
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-panel-2 ring-1 ring-white/12">
                  {/* Source art is a full-body character on black; this
                      zoom/offset frames the face inside the circle. */}
                  <Image
                    src="/assets/character.jpg"
                    alt=""
                    fill
                    sizes="48px"
                    className="translate-x-[8%] translate-y-[10%] scale-[1.9] object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold tracking-[-0.02em] text-fg">
                    @pizzapepe
                  </p>
                  <p className="truncate text-[13px] text-fg-mute">
                    Make something worth a Slice.
                  </p>
                </div>
              </div>

              {/* Amount */}
              <fieldset className="mt-5">
                <legend className="eyebrow mb-2.5 text-fg-faint">Send a slice</legend>
                <div className="grid grid-cols-4 gap-2">
                  {TIERS.map((t, i) => {
                    const active = !custom && tier === i;
                    return (
                      <button
                        key={t.usd}
                        type="button"
                        onClick={() => {
                          setTier(i);
                          setCustom("");
                        }}
                        aria-pressed={active}
                        className={cn(
                          "group relative overflow-hidden rounded-xl border py-2.5 text-center transition-all duration-300",
                          active
                            ? "border-crust bg-crust text-ink"
                            : "border-line bg-white/[0.02] text-fg-dim hover:border-line-2 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="num block text-[13.5px] font-semibold">
                          ${t.usd}
                        </span>
                        <span className="mt-0.5 flex items-center justify-center gap-[3px]">
                          {Array.from({ length: t.slices > 3 ? 3 : t.slices }).map(
                            (_, k) => (
                              <SliceGlyph
                                key={k}
                                size={8}
                                className={active ? "text-ink/70" : "text-fg-faint"}
                              />
                            )
                          )}
                          {t.slices > 3 && (
                            <span
                              className={cn(
                                "font-mono text-[8px]",
                                active ? "text-ink/70" : "text-fg-faint"
                              )}
                            >
                              +
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                  <label className="relative">
                    <span className="sr-only">Custom amount in dollars</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={1}
                      placeholder="Any"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className={cn(
                        "h-full w-full rounded-xl border bg-white/[0.02] text-center text-[13.5px] font-semibold text-fg outline-none transition-colors placeholder:font-normal placeholder:text-fg-faint",
                        custom ? "border-crust" : "border-line hover:border-line-2"
                      )}
                    />
                  </label>
                </div>
              </fieldset>

              <label className="mt-2.5 block">
                <span className="sr-only">Message to the creator</span>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice…"
                  className="w-full resize-none rounded-xl border border-line bg-white/[0.02] px-3.5 py-3 text-[13.5px] text-fg outline-none transition-colors placeholder:text-fg-faint hover:border-line-2 focus:border-slice-500"
                />
              </label>

              <button
                type="button"
                onClick={send}
                disabled={phase === "sending"}
                className="group relative mt-2.5 w-full overflow-hidden rounded-xl bg-crust py-3.5 text-[14.5px] font-semibold tracking-[-0.01em] text-ink transition-all duration-300 hover:brightness-[1.06] active:scale-[0.99] disabled:cursor-wait"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {phase === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="size-3.5 animate-spin rounded-full border-2 border-ink/25 border-t-ink" />
                      Sending…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <SliceGlyph size={15} className="text-ink" />
                      Send a Slice · ${amount.toFixed(2)}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Specular sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-none group-hover:animate-[sweep_0.9s_ease-out]"
                />
              </button>

              <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  Demo
                </span>
                <PoweredByVirtuals />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
