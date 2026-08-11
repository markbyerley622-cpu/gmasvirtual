"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { EASE, Item, Stagger, useReducedMotionSafe } from "@/components/motion/primitives";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { StatusKey } from "@/lib/brand";
import { cn } from "@/lib/utils";

const PHASES: { key: string; status: StatusKey; title: string; items: string[] }[] = [
  {
    key: "Now",
    status: "live",
    title: "Start with a Slice.",
    items: [
      "Creator profiles",
      "Crypto tips",
      "Messages",
      "Payment links",
      "Stablecoin settlement",
    ],
  },
  {
    key: "Next",
    status: "soon",
    title: "Price what you make.",
    items: [
      "Paid links",
      "Premium content",
      "Trading plays",
      "Digital products",
      "AI agent payments",
    ],
  },
  {
    key: "Later",
    status: "vision",
    title: "Build the creator economy.",
    items: [
      "Creator accounts",
      "Financial tools",
      "Global payouts",
      "Creator banking infrastructure",
    ],
  },
];

/** One phase. Split out so the node-opacity transform is a top-level hook. */
function PhaseCard({
  phase,
  index,
  progress,
  reduce,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // The node lights up as the rail reaches it.
  const nodeOn = useTransform(progress, (v) =>
    v >= index / PHASES.length + 0.06 ? 1 : 0.25
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className="w-[280px] shrink-0 sm:w-[340px] lg:w-auto"
    >
      <div className="relative flex h-full flex-col">
        <motion.span
          aria-hidden
          style={{ opacity: reduce ? 1 : nodeOn }}
          className={cn(
            "absolute -top-[46px] left-0 size-2.5 rounded-full",
            phase.status === "live" ? "bg-crust" : "bg-slice-400"
          )}
        />

        <div className="surface flex h-full flex-col rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="display text-[19px] uppercase tracking-[-0.02em] text-fg">
              {phase.key}
            </span>
            <StatusBadge status={phase.status} />
          </div>
          <p className="mt-3 text-[14.5px] text-fg-mute">{phase.title}</p>

          <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
            {phase.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[14px] text-fg-dim"
              >
                <span
                  aria-hidden
                  className="mt-[7px] size-1 shrink-0 rounded-full bg-fg-faint"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
  });
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="roadmap" className="relative overflow-hidden py-24 md:py-32">
      <div className="shell">
        <Stagger className="max-w-3xl">
          <Item>
            <Eyebrow>Roadmap</Eyebrow>
          </Item>
          <Item className="mt-6">
            <h2 className="display-tight type-section text-gradient">
              Start with a Slice.
              <br />
              <span className="text-gradient-crust">Build the creator economy.</span>
            </h2>
          </Item>
        </Stagger>
      </div>

      <div ref={ref} className="relative mt-16">
        {/* The rail: a single line that fills as the section passes through */}
        <div className="shell relative">
          <div className="relative mb-10 h-px w-full bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-crust to-slice-400"
              style={{ scaleX: reduce ? 1 : railScale, width: "100%" }}
            />
          </div>
        </div>

        {/* Scrolls horizontally below lg, resolves to a row above */}
        <div className="no-scrollbar overflow-x-auto pb-4">
          <div className="shell">
            <ol className="flex min-w-max gap-5 lg:grid lg:min-w-0 lg:grid-cols-3 lg:gap-6">
              {PHASES.map((p, i) => (
                <PhaseCard
                  key={p.key}
                  phase={p}
                  index={i}
                  progress={progress}
                  reduce={reduce}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
