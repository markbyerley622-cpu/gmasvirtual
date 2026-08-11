"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/primitives";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#uses", label: "Use it for" },
  { href: "#agents", label: "Agents" },
  { href: "#roadmap", label: "Roadmap" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Mobile menu navigation, driven explicitly.
   *
   * Letting the browser handle the fragment jump doesn't work here: the menu's
   * collapse animation changes layout while the smooth scroll is in flight,
   * which cancels it and leaves the page at the top. So close the menu first,
   * then scroll once it has settled.
   */
  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    window.setTimeout(() => {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      window.history.replaceState(null, "", href);
    }, 380);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="shell flex h-16 items-center justify-between gap-4 md:h-[72px]"
      >
        <a href="#main" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo wordmarkClassName="hidden min-[380px]:block" />
          <span className="sr-only">Grab Me a Slice — home</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13.5px] text-fg-mute transition-colors hover:text-fg"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-crust transition-all duration-300 group-hover:w-full"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={brand.ctaHref}
            onClick={() => setOpen(false)}
            className="rounded-full bg-white px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-crust md:px-5 md:py-2.5 md:text-[13.5px]"
          >
            Create your link
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-line-2 lg:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="shell py-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => navigate(e, l.href)}
                    className="block rounded-lg px-2 py-3 text-[15px] text-fg-dim transition-colors hover:bg-white/[0.04] hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
