import Image from "next/image";
import { Spot } from "@/components/motion/atmosphere";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

/**
 * Editorial collage rather than an image grid.
 *
 * The supplied artwork carries its own baked-in typography, so nothing is
 * overlaid on top of it — captions sit alongside as real HTML, and the
 * composition does the work through scale, offset and parallax depth.
 */
export function UseCases() {
  return (
    <section id="uses" className="relative overflow-hidden py-24 md:py-32">
      <Spot
        className="right-[-14rem] top-[10rem]"
        color="rgba(31,92,255,0.16)"
        size={900}
      />

      <div className="shell relative">
        {/* ---- Opening statement ---- */}
        <Stagger className="max-w-3xl">
          <Item>
            <Eyebrow>Use it for</Eyebrow>
          </Item>
          <Item className="mt-6">
            <h2 className="display-tight type-section text-gradient">
              Your audience already wants to support you.
              <br />
              <span className="text-gradient-crust">
                Give them somewhere to send it.
              </span>
            </h2>
          </Item>
        </Stagger>

        {/* ---- Wide banner sets the tone ---- */}
        <Reveal delay={0.08} y={40}>
          <ParallaxImage
            src="/assets/community.jpg"
            alt="Grab Me a Slice — community first: built for creators, powered by the community"
            className="mt-14 aspect-[1280/430] rounded-3xl"
            sizes="(max-width: 1200px) 100vw, 1216px"
            distance={40}
          />
        </Reveal>

        {/* ---- Asymmetric pair ---- */}
        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7" y={40}>
            <ParallaxImage
              src="/assets/streamers.jpg"
              alt="Four panels showing supporters sending slices to an IRL streamer, a gaming streamer, an anime artist and a gym coach"
              className="aspect-[4/3] rounded-3xl md:aspect-[1280/1000]"
              sizes="(max-width: 768px) 100vw, 58vw"
              distance={54}
            />
            <div className="mt-6 max-w-md">
              <h3 className="display text-[clamp(1.35rem,2.1vw,1.75rem)] text-fg">
                Going live? Leave a Slice link.
              </h3>
              <p className="copy-pretty mt-3 text-[15px] leading-relaxed text-fg-mute">
                Streamers, artists, coaches. A tip that carries a message is worth more
                than a silent transfer — your audience gets to say why.
              </p>
            </div>
          </Reveal>

          {/* Offset downward so the composition never reads as a grid */}
          <Reveal className="md:col-span-5 md:pt-24" delay={0.1} y={40}>
            <ParallaxImage
              src="/assets/charity.jpg"
              alt="Four panels showing slices sent to a food bank, an animal rescue, a youth arts programme and a community garden"
              className="aspect-[4/3] rounded-3xl md:aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, 40vw"
              distance={68}
            />
            <div className="mt-6 max-w-sm">
              <h3 className="display text-[clamp(1.35rem,2.1vw,1.75rem)] text-fg">
                Sometimes the Slice isn&apos;t for you.
              </h3>
              <p className="copy-pretty mt-3 text-[15px] leading-relaxed text-fg-mute">
                Point your link at a cause, a fundraiser, or a community pot. Same link,
                different destination.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---- Global, with the character anchoring the composition ---- */}
        <div className="relative mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5" y={40}>
            <Eyebrow tone="crust">No borders</Eyebrow>
            <h3 className="display-tight mt-5 text-[clamp(1.6rem,3vw,2.4rem)] text-gradient">
              Your audience isn&apos;t in one country.
            </h3>
            <p className="copy-pretty mt-5 max-w-md text-[16px] leading-relaxed text-fg-dim">
              Crypto doesn&apos;t care where someone lives, which bank they use, or
              whether their card works abroad. If they can open a link, they can send
              you a Slice.
            </p>

            {/* Static on purpose — a transformed ancestor would isolate the
                `screen` blend and expose the artwork's black backdrop. */}
            <div
              aria-hidden
              className="pointer-events-none mt-4 hidden w-[190px] lg:block"
            >
              <Image
                src="/assets/character.jpg"
                alt=""
                width={420}
                height={420}
                className="knockout-black"
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1} y={40}>
            <ParallaxImage
              src="/assets/global.jpg"
              alt="Grab Me a Slice artwork with Simplified Chinese copy inviting supporters to share a slice"
              className="aspect-[5/4] rounded-3xl"
              sizes="(max-width: 768px) 100vw, 55vw"
              distance={52}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
