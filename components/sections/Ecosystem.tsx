import Image from "next/image";
import { Particles, Spot } from "@/components/motion/atmosphere";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SliceGlyph } from "@/components/ui/SliceGlyph";
import { VirtualsLogo } from "@/components/ui/VirtualsMark";
import { token, virtuals } from "@/lib/brand";

const FLOW = [
  { label: "Creator", sub: "makes something" },
  { label: "Slice", sub: "someone pays" },
  { label: "Activity", sub: "real usage" },
  { label: "Ecosystem", sub: "value returns" },
];

export function Ecosystem() {
  return (
    <section className="relative overflow-hidden bg-void py-28 md:py-36">
      {/* Quieter atmosphere — this moment should feel discovered, not sold. */}
      <Particles className="opacity-50" color="120, 200, 205" />
      <Spot
        className="left-1/2 top-[-10rem] -translate-x-1/2"
        color="rgba(68,188,195,0.13)"
        size={1000}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(68,188,195,0.4) 30%, rgba(68,188,195,0.4) 70%, transparent)",
        }}
      />

      <div className="shell relative">
        <Stagger className="mx-auto max-w-3xl text-center">
          <Item>
            <Eyebrow tone="mute" className="justify-center">
              Underneath
            </Eyebrow>
          </Item>
          <Item className="mt-6">
            <h2 className="display-tight type-section text-gradient">
              {virtuals.headline}
            </h2>
          </Item>
        </Stagger>

        {/* The lockup — equal optical weight, generous symmetrical gap.
            Neither brand may read as subordinate to the other. */}
        <Reveal delay={0.12}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-[clamp(1.5rem,4vw,3.5rem)]">
            <span className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt=""
                width={44}
                height={44}
                className="rounded-[11px]"
              />
              <span className="text-[clamp(1.05rem,1.7vw,1.35rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-fg">
                Grab Me
                <br />a Slice
              </span>
            </span>

            <span
              aria-hidden
              className="h-[clamp(1.8rem,3vw,2.8rem)] w-px shrink-0 bg-line-2"
            />

            <VirtualsLogo height={44} />
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="copy-pretty mx-auto mt-12 max-w-xl text-center text-[17px] leading-relaxed text-fg-dim">
            {virtuals.body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          {/* A truthfulness note — kept legible rather than decorative. */}
          <p className="mx-auto mt-6 max-w-lg text-center font-mono text-[11px] leading-relaxed tracking-[0.02em] text-fg-mute">
            {virtuals.disclaimer}
          </p>
        </Reveal>

        {/* ---- Token story: visually secondary to the product ---- */}
        <Reveal delay={0.1}>
          <div className="surface mx-auto mt-24 max-w-4xl rounded-3xl p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow tone="crust">$GBMS</Eyebrow>
              <span className="rounded-md border border-line-2 bg-white/[0.03] px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.12em] text-fg-mute">
                Not implemented
              </span>
            </div>

            <h3 className="display-tight mt-5 text-[clamp(1.4rem,2.6vw,2rem)] text-fg">
              {token.headline}
            </h3>

            {/* Flow diagram */}
            <ol className="mt-10 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
              {FLOW.map((f, i) => (
                <li key={f.label} className="flex flex-1 items-center gap-3 md:flex-col md:gap-0">
                  <div className="flex w-full flex-1 items-center gap-3 md:flex-col md:gap-0">
                    <div className="surface-solid flex w-full items-center gap-3 rounded-xl px-4 py-3 md:flex-col md:items-start md:gap-1">
                      <span className="flex items-center gap-2">
                        {i === 1 && <SliceGlyph size={13} className="text-crust" />}
                        <span className="text-[13.5px] font-medium text-fg">
                          {f.label}
                        </span>
                      </span>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-fg-faint md:ml-0">
                        {f.sub}
                      </span>
                    </div>
                  </div>

                  {i < FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="flow-dash hidden h-px w-8 shrink-0 self-center md:block"
                    />
                  )}
                </li>
              ))}
            </ol>

            <p className="copy-pretty mt-8 max-w-2xl text-[15px] leading-relaxed text-fg-dim">
              {token.body}
            </p>
            <p className="mt-6 border-t border-line pt-5 text-[12.5px] leading-relaxed text-fg-faint">
              {token.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
