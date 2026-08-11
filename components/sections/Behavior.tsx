"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Grid, Spot } from "@/components/motion/atmosphere";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SliceGlyph } from "@/components/ui/SliceGlyph";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

/** Illustrative examples of why people send — internet voice, not corporate. */
const SLICES = [
  { msg: "That call printed.", amount: 20, from: "@degenmark" },
  { msg: "Your tutorial fixed my problem.", amount: 5, from: "@sam.eth" },
  { msg: "This research was worth paying for.", amount: 10, from: "@0xlina" },
  { msg: "Your agent just saved me three hours.", amount: 3, from: "agent://scout" },
];

const TOTALS = SLICES.reduce<number[]>((acc, s, i) => {
  acc.push((acc[i - 1] ?? 0) + s.amount);
  return acc;
}, []);

/**
 * A cinematic scroll moment: the section pins and Slices arrive one at a time
 * as the user scrolls, with the creator's balance counting up alongside. The
 * point being made visually rather than in prose — a Slice is money plus a
 * message plus appreciation.
 */
export function Behavior() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  // Starts empty on both server and client so hydration always matches; the
  // effect below fills it immediately when motion is reduced.
  const [live, setLive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  // Drive how many slices have landed from scroll position.
  useEffect(() => {
    if (reduce) {
      // No scroll choreography — show the whole story at once.
      setLive(SLICES.length);
      return;
    }
    return smooth.on("change", (v) => {
      // Messages land across the first 80% of the pin, leaving a beat at the end.
      const n = Math.round(Math.min(1, v / 0.8) * SLICES.length);
      setLive(n);
    });
  }, [smooth, reduce]);

  const total = live === 0 ? 0 : TOTALS[live - 1];
  const railScale = useTransform(smooth, [0, 0.8], [0, 1]);

  return (
    <section id="how" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
        <Grid size={80} />
        <Spot
          className="left-[-12rem] top-[-8rem]"
          color="rgba(31,92,255,0.2)"
          size={800}
        />

        <div className="shell relative w-full">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* ---- Statement ---- */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>The behaviour</Eyebrow>
                <StatusBadge status="live" />
              </div>

              {/* Slightly tighter than type-section: at the full size the first
                  line breaks and leaves "you." stranded in this column width. */}
              <h2 className="display-tight text-gradient mt-6 text-[clamp(2rem,4.3vw,3.3rem)]">
                Someone helped you.
                <br />
                <span className="text-gradient-crust">Give them a Slice.</span>
              </h2>

              <p className="copy-pretty mt-6 max-w-md text-[17px] leading-relaxed text-fg-dim">
                A Slice is a tip with a message attached. One tap, settled in crypto,
                straight to the creator&apos;s own wallet.
              </p>

              {/* Running balance */}
              <div className="surface mt-10 inline-flex items-center gap-5 rounded-2xl px-6 py-4">
                <div>
                  <p className="eyebrow text-fg-faint">Received</p>
                  <p className="num mt-1.5 text-[34px] font-semibold text-fg tabular-nums">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <span className="h-10 w-px bg-line-2" aria-hidden />
                <div>
                  <p className="eyebrow text-fg-faint">Slices</p>
                  <p className="num mt-1.5 text-[34px] font-semibold text-crust">
                    {live}
                  </p>
                </div>
              </div>

              {/* Progress rail mirrors scroll position through the scene */}
              <div className="mt-8 h-px w-full max-w-xs overflow-hidden bg-line">
                <motion.div
                  className="h-full origin-left bg-crust"
                  style={{ scaleX: reduce ? 1 : railScale }}
                />
              </div>
            </div>

            {/* ---- Slices landing ---- */}
            <ul className="min-w-0 space-y-3">
              {SLICES.map((s, i) => {
                const landed = i < live;
                return (
                  <motion.li
                    key={s.msg}
                    initial={false}
                    animate={{
                      opacity: landed ? 1 : 0,
                      x: landed ? 0 : 40,
                      filter: landed ? "blur(0px)" : "blur(8px)",
                    }}
                    transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                    className="gpu"
                  >
                    <div
                      className={cn(
                        "surface surface-lift flex items-center gap-4 rounded-2xl p-4 sm:p-5",
                        landed && "glow-slice"
                      )}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-crust">
                        <SliceGlyph size={18} className="text-ink" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] text-fg">
                          “{s.msg}”
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-[11px] text-fg-faint">
                          {s.from}
                        </span>
                      </span>
                      <span className="num shrink-0 text-[19px] font-semibold text-crust">
                        ${s.amount}
                      </span>
                    </div>
                  </motion.li>
                );
              })}

              <li className="pt-2">
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  Illustrative examples
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
