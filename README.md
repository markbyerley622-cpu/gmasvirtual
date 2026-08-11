# Grab Me a Slice

Marketing and product site for **Grab Me a Slice** — payment links for creators
and AI agents.

Next.js 15 (App Router) · TypeScript · Tailwind v4 · framer-motion.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (runs typecheck + lint)
npm start
```

## QA scripts

```bash
node scripts/shot.mjs shots/out "1440:900,390:844"   # screenshots + overflow report
node scripts/interact.mjs                            # drives the demo surfaces
```

Both default to `http://localhost:4319`; override with `BASE_URL`. `shot.mjs`
captures under `prefers-reduced-motion: reduce` so full-page shots are
deterministic — set `MOTION=1` to capture with animation enabled.

## Structure

```
app/                    layout (fonts, metadata), globals.css (design tokens), page
components/motion/      motion system — see below
components/product/     product UI: SliceCard, CreatorProfile, LockedPlay, AgentFlow
components/sections/    page sections, composed in app/page.tsx
components/ui/          Button, Eyebrow, StatusBadge, Logo, SliceGlyph,
                        VirtualsMark, ParallaxImage
lib/brand.ts            brand copy, CTA target, socials, and all Virtuals/$GBMS claims
public/assets/          supplied artwork + official Virtuals marks
```

### Motion system

- `components/motion/primitives.tsx` — one shared easing curve (`EASE`), the
  house `rise` entrance, `Stagger`/`Item`/`Reveal`, `Counter`, and
  `useReducedMotionSafe`.
- `components/motion/mouse.tsx` — a single pointer listener at the root feeds
  normalised springs; `useParallax`, `Parallax` and `TiltCard` subscribe. Doing
  it once rather than per-component is what keeps cursor motion smooth.
- `components/motion/atmosphere.tsx` — `Grid`, `Particles` (canvas, one
  composited layer), `Spot`, `EdgeGlow`.

**`useReducedMotionSafe`, not framer's `useReducedMotion`.** The latter reads
the media query during the first client render, so it disagrees with the server
and throws a hydration error. Ours returns `false` through hydration and flips
in an effect.

## Gotchas worth knowing before editing

- **`overflow-x: clip`, never `hidden`, on `html`/`body`.** `hidden` makes the
  element a scroll container and silently breaks every `position: sticky`
  descendant — including the pinned "Give them a Slice" scene.
- **The character artwork ships on pure black** and is knocked out with
  `mix-blend-mode: screen` (`.knockout-black`). Blending is cancelled by any
  ancestor that creates a stacking context — a transform or `opacity < 1` — and
  the black backdrop then renders as a visible box. Every character instance is
  therefore deliberately **static**, with no entrance animation.
- **`truncate` inside a grid** sets `white-space: nowrap`, which inflates the
  column's min-content width and blows out narrow layouts. Add `min-w-0`.
- **The mobile menu navigates programmatically.** Its collapse animation
  changes layout mid-scroll, which cancels the browser's smooth fragment jump,
  so `Nav.tsx` closes the menu then scrolls once it has settled.

## Two things you will want to change

1. **CTA destination.** Every "create your link" button reads `brand.ctaHref`
   in `lib/brand.ts`. It currently scrolls to the closing section because there
   is no sign-up flow in this repo. Point it at the real app URL and all CTAs
   follow.

2. **Virtuals + $GBMS wording.** Nothing in this repository documents a
   technical integration or a live token mechanism, so the copy positions
   rather than asserts. All of that wording lives in `lib/brand.ts` — update it
   once the relationship and token design are confirmed.

The Virtuals marks in `public/assets/` are the official supplied assets
(`virtuals-logo-dark.svg`, `virtuals-icon.png`), used as-is — never redrawn,
recoloured or stretched.

## Honesty rules the site follows

Every feature carries a status: `Live`, `Coming soon`, or `Vision`
(`components/ui/StatusBadge.tsx`). Interactive demos are labelled **Demo** or
**Concept** in their own UI, no backend is implied, and the site contains no
invented statistics, testimonials, users or transaction volumes.
