"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/components/motion/primitives";
import { SliceGlyph } from "@/components/ui/SliceGlyph";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PoweredByVirtuals } from "@/components/ui/VirtualsMark";
import { cn } from "@/lib/utils";

const OFFERS = [
  { name: "Send a Slice", meta: "Any amount", price: "Tip", live: true },
  { name: "Friday trade setup", meta: "Weekly", price: "$10", live: false },
  { name: "Private community", meta: "Monthly", price: "$25", live: false },
];

/**
 * What a supporter lands on: the creator, what they offer, what each costs.
 * A presentation of the concept — nothing here is a live listing.
 */
export function CreatorProfile() {
  return (
    <div className="surface surface-lift w-full max-w-[400px] overflow-hidden rounded-[24px]">
      {/* Cover */}
      <div className="relative h-24">
        <Image
          src="/assets/community.jpg"
          alt=""
          fill
          sizes="400px"
          className="object-cover object-[68%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent"
        />
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-9 flex items-end justify-between gap-3">
          <div className="relative size-[68px] shrink-0 overflow-hidden rounded-2xl bg-panel-2 ring-4 ring-panel">
            <Image
              src="/assets/character.jpg"
              alt=""
              fill
              sizes="68px"
              className="translate-x-[8%] translate-y-[10%] scale-[1.9] object-cover"
            />
          </div>
          <span className="mb-1.5">
            <StatusBadge status="live" />
          </span>
        </div>

        <h3 className="mt-3.5 text-[18px] font-semibold tracking-[-0.025em] text-fg">
          @pizzapepe
        </h3>
        <p className="mt-1 text-[13.5px] leading-relaxed text-fg-mute">
          Charts, calls and the occasional decent take. Slices keep the lights on.
        </p>

        <ul className="mt-5 space-y-2">
          {OFFERS.map((o, i) => (
            <motion.li
              key={o.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: EASE }}
            >
              <div className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:bg-white/[0.05]">
                {o.live && (
                  <SliceGlyph
                    size={15}
                    className="shrink-0 text-crust transition-transform duration-300 group-hover:-rotate-12"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-fg">
                    {o.name}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                    {o.meta}
                  </span>
                </span>
                <span
                  className={cn(
                    "num shrink-0 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-300",
                    o.live
                      ? "bg-crust text-ink group-hover:shadow-[0_6px_20px_-6px_rgba(255,210,30,0.7)]"
                      : "border border-line text-fg-dim group-hover:border-line-2 group-hover:text-fg"
                  )}
                >
                  {o.price}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
            Concept
          </span>
          <PoweredByVirtuals />
        </div>
      </div>
    </div>
  );
}
