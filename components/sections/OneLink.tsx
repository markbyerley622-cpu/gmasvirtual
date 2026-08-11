"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, Item, Reveal, Stagger, useReducedMotionSafe } from "@/components/motion/primitives";
import { CreatorProfile } from "@/components/product/CreatorProfile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

const LINK = "gbms.xyz/yourname";

/** The link chip that persists across every context. */
function LinkChip({ tone = "line" }: { tone?: "line" | "solid" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-[11.5px] whitespace-nowrap",
        tone === "line"
          ? "border border-slice-500/40 bg-slice-500/10 text-slice-200"
          : "bg-crust text-ink"
      )}
    >
      {LINK}
    </span>
  );
}

/** Abstract interface metaphors — deliberately not real platform branding. */
const CONTEXTS = [
  {
    key: "In your bio",
    note: "Social profile",
    render: () => (
      <div className="w-full">
        <div className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-full bg-panel-2 ring-1 ring-white/10">
            <Image
              src="/assets/character.jpg"
              alt=""
              fill
              sizes="44px"
              className="translate-x-[8%] translate-y-[10%] scale-[1.9] object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-fg">pizzapepe</p>
            <p className="font-mono text-[11px] text-fg-faint">@pizzapepe</p>
          </div>
          <span className="ml-auto rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold text-ink">
            Follow
          </span>
        </div>
        <p className="mt-3.5 text-[13.5px] leading-relaxed text-fg-dim">
          charts, calls, occasional decent takes. slice me if it helped ↓
        </p>
        <div className="mt-2.5">
          <LinkChip />
        </div>
      </div>
    ),
  },
  {
    key: "In a thread",
    note: "Posts & replies",
    render: () => (
      <div className="w-full space-y-3">
        <div className="flex gap-3">
          <span className="size-8 shrink-0 rounded-full bg-white/10" aria-hidden />
          <div className="min-w-0">
            <p className="text-[13.5px] leading-relaxed text-fg-dim">
              wrote up the whole setup, levels and invalidation. free.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-fg-dim">
              if it made you money, slice me →
            </p>
            <div className="mt-2.5">
              <LinkChip />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "On stream",
    note: "Overlay & chat",
    render: () => (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <span className="rounded bg-pepperoni px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-white">
            LIVE
          </span>
          <span className="font-mono text-[11px] text-fg-faint">2,481 watching</span>
        </div>
        <div className="mt-3 space-y-1.5">
          <p className="text-[12.5px] text-fg-mute">
            <span className="text-slice-300">chatter92</span> that fit was clean
          </p>
          <p className="text-[12.5px] text-fg-mute">
            <span className="text-crust">streamer</span> !slice for the tip jar
          </p>
        </div>
        <div className="mt-3">
          <LinkChip />
        </div>
      </div>
    ),
  },
  {
    key: "In your community",
    note: "Group chat",
    render: () => (
      <div className="w-full">
        <div className="flex items-center gap-2 border-b border-line pb-2.5">
          <span className="font-mono text-[12px] text-fg-mute"># general</span>
          <span className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[9.5px] text-fg-faint">
            PINNED
          </span>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-fg-dim">
          Server costs are covered by the community. Drop in whatever you like:
        </p>
        <div className="mt-2.5">
          <LinkChip />
        </div>
      </div>
    ),
  },
  {
    key: "On your site",
    note: "Embed or button",
    render: () => (
      <div className="w-full">
        <div className="flex items-center gap-2 border-b border-line pb-2.5">
          <span className="size-2 rounded-full bg-white/15" aria-hidden />
          <span className="font-mono text-[11px] text-fg-faint">yourblog.com</span>
        </div>
        <p className="mt-3.5 text-[13.5px] leading-relaxed text-fg-dim">
          Thanks for reading. This one took a while.
        </p>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="rounded-lg bg-crust px-3.5 py-2 text-[12.5px] font-semibold text-ink">
            Send a Slice
          </span>
          <LinkChip />
        </div>
      </div>
    ),
  },
  {
    key: "From an agent",
    note: "Machine to machine",
    render: () => (
      <div className="w-full font-mono text-[12px]">
        <p className="text-fg-faint">
          <span className="text-slice-300">agent://scout</span> · task complete
        </p>
        <p className="mt-2 text-fg-mute">12 sources · summarised</p>
        <p className="mt-2 text-fg-mute">
          settle → <span className="text-crust">3.00 USDC</span>
        </p>
        <div className="mt-3">
          <LinkChip />
        </div>
      </div>
    ),
  },
];

export function OneLink() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % CONTEXTS.length), 3000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${LINK}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked — the link is on screen either way. */
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="shell relative">
        <Stagger className="mx-auto max-w-3xl text-center">
          <Item>
            <Eyebrow className="justify-center">One link</Eyebrow>
          </Item>
          <Item className="mt-6">
            <h2 className="display-tight type-section text-gradient">
              One link.
              <br />A hundred ways to use it.
            </h2>
          </Item>
          <Item className="mt-6">
            <p className="copy-pretty mx-auto max-w-lg text-[17px] leading-relaxed text-fg-dim">
              No store, no checkout, no account for every platform. Just somewhere to
              send it.
            </p>
          </Item>
        </Stagger>

        {/* The link */}
        <Reveal delay={0.1}>
          <div className="surface mx-auto mt-12 flex w-full max-w-md items-center gap-2 rounded-2xl p-2 pl-4">
            <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-fg-dim sm:text-[14.5px]">
              gbms.xyz/<span className="text-crust">yourname</span>
            </span>
            <button
              type="button"
              onClick={copy}
              className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-crust"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Reveal>

        {/* The link travelling through contexts */}
        <Reveal delay={0.16}>
          <div
            className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-[240px_1fr] lg:gap-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Context switcher */}
            <ul
              role="tablist"
              aria-label="Where the link lives"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
            >
              {CONTEXTS.map((c, idx) => {
                const active = idx === i;
                return (
                  <li key={c.key} className="shrink-0">
                    <button
                      role="tab"
                      aria-selected={active}
                      onClick={() => setI(idx)}
                      className={cn(
                        "relative w-full rounded-lg px-3.5 py-2.5 text-left text-[13.5px] whitespace-nowrap transition-colors duration-300",
                        active
                          ? "text-fg"
                          : "text-fg-mute hover:bg-white/[0.03] hover:text-fg-dim"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="ctx-pill"
                          className="absolute inset-0 -z-10 rounded-lg border border-line-2 bg-white/[0.05]"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}
                      {c.key}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* The context frame — content morphs, the link persists */}
            <div className="surface surface-lift relative min-h-[230px] overflow-hidden rounded-2xl p-6">
              <span className="eyebrow absolute right-5 top-5 text-fg-faint">
                {CONTEXTS[i].note}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={CONTEXTS[i].key}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  className="flex min-h-[180px] items-center pt-6"
                >
                  {CONTEXTS[i].render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* What sits behind it */}
        <div className="mt-24 grid items-center gap-12 border-t border-line pt-20 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Stagger>
              <Item>
                <Eyebrow tone="mute">Behind the link</Eyebrow>
              </Item>
              <Item className="mt-5">
                <h3 className="display-tight type-sub text-gradient">
                  One page.
                  <br />
                  Everything you offer.
                </h3>
              </Item>
              <Item className="mt-5">
                <p className="copy-pretty max-w-md text-[16px] leading-relaxed text-fg-dim">
                  Your Slice link opens a page that&apos;s yours: who you are, what you
                  make, and every way someone can pay for it — from a one-tap tip to
                  whatever you decide to price.
                </p>
              </Item>
            </Stagger>
          </div>
          <Reveal delay={0.1} className="flex min-w-0 justify-center lg:justify-end">
            <CreatorProfile />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
