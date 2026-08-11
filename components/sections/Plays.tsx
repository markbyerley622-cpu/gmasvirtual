import { Spot } from "@/components/motion/atmosphere";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { LockedPlay } from "@/components/product/LockedPlay";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PRICED = [
  { name: "Bitcoin thesis", price: "$5" },
  { name: "Friday trade setup", price: "$10" },
  { name: "Private community", price: "$25" },
  { name: "Research report", price: "$15" },
];

export function Plays() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Spot
        className="left-[-10rem] top-[6rem]"
        color="rgba(31,92,255,0.18)"
        size={760}
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 flex min-w-0 justify-center lg:order-1 lg:justify-start" y={40}>
            <LockedPlay />
          </Reveal>

          <div className="order-1 min-w-0 lg:order-2">
            <Stagger>
              <Item>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>Beyond tips</Eyebrow>
                  <StatusBadge status="soon" />
                </div>
              </Item>
              <Item className="mt-6">
                <h2 className="display-tight type-section text-gradient">
                  A link can be more
                  <br />
                  than a <span className="text-gradient-crust">tip jar.</span>
                </h2>
              </Item>
              <Item className="mt-6">
                <p className="copy-pretty max-w-md text-[17px] leading-relaxed text-fg-dim">
                  Put the good stuff behind the payment. People see the teaser, pay
                  what it&apos;s worth, and get the rest.
                </p>
              </Item>
              <Item className="mt-4">
                <p className="text-[17px] font-medium text-fg">
                  Share it. Price it. Get paid.
                </p>
              </Item>
            </Stagger>

            <Reveal delay={0.2}>
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {PRICED.map((p) => (
                  <li
                    key={p.name}
                    className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
                  >
                    <span className="text-[15px] text-fg-dim transition-colors group-hover:text-fg">
                      {p.name}
                    </span>
                    <span className="num font-mono text-[13px] text-crust">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                Examples of what could be priced — not live products
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
