import Image from "next/image";
import { VirtualsLogo } from "@/components/ui/VirtualsMark";
import { brand, social, virtuals } from "@/lib/brand";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Use it for", href: "#uses" },
  { label: "Agents", href: "#agents" },
  { label: "Roadmap", href: "#roadmap" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="shell py-16 md:py-20">
        {/* Oversized wordmark anchors the close */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/logo.png"
                alt=""
                width={52}
                height={52}
                className="rounded-[13px]"
              />
              <span className="display-tight text-[clamp(1.9rem,4.4vw,3rem)] text-gradient">
                Grab Me
                <br />a Slice
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg-mute">
              {brand.tagline} {brand.sub}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-20">
            <nav aria-label="Product">
              <p className="eyebrow text-fg-faint">Product</p>
              <ul className="mt-4 space-y-2.5">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[14px] text-fg-mute transition-colors hover:text-fg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow text-fg-faint">Follow</p>
              <a
                href={social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-[14px] text-fg-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:text-fg"
              >
                <XIcon className="size-3.5" />
                {social.xHandle}
              </a>

              <p className="eyebrow mt-8 text-fg-faint">Ecosystem</p>
              <div className="mt-4">
                <VirtualsLogo height={26} />
              </div>
              <p className="mt-2.5 text-[12px] text-fg-faint">{virtuals.poweredBy}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-[12.5px] text-fg-faint sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}.
          </p>
          <p className="max-w-xl sm:text-right">
            Product previews on this page are demonstrations. Features marked coming
            soon or vision are not yet available.
          </p>
        </div>
      </div>
    </footer>
  );
}
