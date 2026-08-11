"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, Particles, Spot } from "@/components/motion/atmosphere";
import { Parallax, TiltCard } from "@/components/motion/mouse";
import { EASE, Item, Stagger, useReducedMotionSafe } from "@/components/motion/primitives";
import { SliceCard } from "@/components/product/SliceCard";
import { Button } from "@/components/ui/Button";
import { SliceGlyph } from "@/components/ui/SliceGlyph";
import { VirtualsLogo } from "@/components/ui/VirtualsMark";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Satellites orbiting the payment card — each one a real product moment. */
function Satellite({
  children,
  className,
  delay,
  depth,
  float = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  depth: number;
  float?: number;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <Parallax depth={depth} className={cn("absolute", className)}>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ delay, duration: reduce ? 0 : 0.9, ease: EASE }}
      >
        {/* The global prefers-reduced-motion rule collapses this animation, so
            it can be declared unconditionally and stay hydration-stable. */}
        <div style={{ animation: `float-soft ${float || 8}s ease-in-out infinite` }}>
          {children}
        </div>
      </motion.div>
    </Parallax>
  );
}

function MessageChip({ msg, amount }: { msg: string; amount: string }) {
  return (
    <div className="surface surface-lift flex w-max max-w-[280px] items-center gap-3 rounded-xl px-3.5 py-2.5">
      <SliceGlyph size={15} className="text-crust" />
      <span className="truncate text-[12.5px] text-fg-dim">“{msg}”</span>
      <span className="num shrink-0 text-[13px] font-semibold text-crust">{amount}</span>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative overflow-hidden pb-24 pt-24 md:pt-28 lg:pb-32">
      {/* Atmosphere — one grid, one particle field, one light */}
      <Grid />
      <Particles className="opacity-70" />
      <Spot
        className="left-1/2 top-[-18rem] -translate-x-1/2"
        color="rgba(31,92,255,0.28)"
        size={1100}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="shell relative">
        {/* ---- Copy ---- */}
        <Stagger onMount gap={0.1} className="mx-auto max-w-4xl text-center">
          <Item>
            <span className="surface inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
              <span className="relative flex size-1.5" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-crust opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-crust" />
              </span>
              <span className="eyebrow text-fg-mute">Tip jar for the internet</span>
            </span>
          </Item>

          <Item className="mt-6">
            <h1 className="display-tight type-hero text-gradient">
              Get paid in crypto.
              <br />
              From anyone.{" "}
              <span className="text-gradient-crust">Anywhere.</span>
            </h1>
          </Item>

          <Item className="mt-6">
            <p className="copy-pretty mx-auto max-w-lg text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-fg-dim">
              Payment links for creators and AI agents. Share one link, accept crypto,
              and get paid.
            </p>
          </Item>

          <Item className="mt-9">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={brand.ctaHref} size="lg" arrow>
                Create your link
              </Button>
              <Button href="#how" variant="ghost" size="lg">
                See how it works
              </Button>
            </div>
          </Item>
        </Stagger>

        {/* ---- The scene ---- */}
        <div className="relative mx-auto mt-14 flex max-w-[400px] justify-center">
          {/* Satellites: desktop only, positioned around the card */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            <Satellite
              delay={1.15}
              depth={26}
              float={7}
              className="-left-[330px] top-[42px]"
            >
              <MessageChip msg="That call printed." amount="$20" />
            </Satellite>

            <Satellite
              delay={1.45}
              depth={18}
              float={8.5}
              className="-left-[290px] top-[150px]"
            >
              <MessageChip msg="Your tutorial fixed my problem." amount="$5" />
            </Satellite>

            <Satellite
              delay={1.3}
              depth={-22}
              float={7.5}
              className="-right-[320px] top-[80px]"
            >
              <div className="surface surface-lift w-[220px] rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                  <span className="eyebrow text-fg-faint">Slice sent</span>
                </div>
                <p className="num mt-2.5 text-[26px] font-semibold text-fg">$25.00</p>
                <p className="mt-1 font-mono text-[10.5px] text-fg-faint">
                  to @pizzapepe
                </p>
              </div>
            </Satellite>

            <Satellite
              delay={1.6}
              depth={-14}
              float={9}
              className="-right-[300px] top-[240px]"
            >
              <div className="surface flex w-max items-center gap-2.5 rounded-lg px-3 py-2">
                <span className="font-mono text-[11px] text-slice-300">
                  gbms.xyz/yourname
                </span>
              </div>
            </Satellite>

            {/* Character peeks in beside the card.
                Rendered with NO entrance animation on purpose: any transform or
                opacity on an ancestor creates a stacking context, which isolates
                the `screen` blend and makes the artwork's black backdrop render
                as a visible box. Static is the only reliable option here. */}
            <div
              aria-hidden
              className="absolute -bottom-[40px] -left-[290px] w-[230px]"
            >
              <Image
                src="/assets/character.jpg"
                alt=""
                width={420}
                height={420}
                className="knockout-black"
                priority
              />
            </div>
          </div>

          {/* The product itself */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.55, duration: reduce ? 0 : 1.1, ease: EASE }}
            className="w-full"
          >
            <TiltCard strength={6}>
              <SliceCard />
            </TiltCard>
          </motion.div>
        </div>

        {/* ---- Ecosystem credit + scroll cue ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="eyebrow text-fg-faint">Built for the agent economy</span>
            <VirtualsLogo height={30} />
          </div>

          <a
            href="#how"
            aria-label="Scroll to how it works"
            className="group flex flex-col items-center gap-2"
          >
            <span className="relative h-10 w-px overflow-hidden bg-line-2">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-crust"
                animate={reduce ? undefined : { y: [-16, 40] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
