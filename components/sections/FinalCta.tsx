import Image from "next/image";
import { Grid, Particles, Spot } from "@/components/motion/atmosphere";
import { Item, Stagger } from "@/components/motion/primitives";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export function FinalCta() {
  return (
    <section id="create" className="relative overflow-hidden py-28 md:py-36">
      <Grid size={80} />
      <Particles className="opacity-60" />
      <Spot
        className="bottom-[-16rem] left-1/2 -translate-x-1/2"
        color="rgba(31,92,255,0.26)"
        size={1100}
      />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Static on purpose: a transformed ancestor would isolate the
              `screen` blend and expose the artwork's black backdrop. */}
          <div aria-hidden className="mx-auto mb-10 w-[180px] sm:w-[210px]">
            <Image
              src="/assets/character.jpg"
              alt=""
              width={420}
              height={420}
              className="knockout-black"
            />
          </div>

          <Stagger>
            <Item>
              <h2 className="display-tight type-section text-gradient">
                Make something
                <br />
                worth a <span className="text-gradient-crust">Slice.</span>
              </h2>
            </Item>
            <Item className="mt-6">
              <p className="copy-pretty mx-auto max-w-md text-[17px] leading-relaxed text-fg-dim">
                Create your link and start accepting crypto from your audience.
              </p>
            </Item>
            <Item className="mt-10">
              <div className="flex flex-wrap justify-center gap-3">
                <Button href={brand.ctaHref} size="lg" arrow>
                  Create my link
                </Button>
                <Button href="#how" variant="ghost" size="lg">
                  See how it works
                </Button>
              </div>
            </Item>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
