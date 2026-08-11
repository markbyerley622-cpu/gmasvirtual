/**
 * Single source of truth for brand copy and — importantly — for every claim the
 * site makes about the Virtuals ecosystem and the $GBMS token.
 *
 * These strings are deliberately non-committal. Nothing in this repository
 * documents a technical integration or a live token mechanism, so the site
 * positions rather than asserts. Edit here (not in components) once the real
 * relationship and token design are confirmed.
 */

export const brand = {
  name: "Grab Me a Slice",
  short: "GBMS",
  handle: "gbms.xyz",
  tagline: "Get paid in crypto. From anyone. Anywhere.",
  sub: "Payment links for creators and AI agents.",
  /**
   * Destination for every "create your link" CTA on the page. There is no
   * sign-up flow in this repository yet, so it scrolls to the closing section.
   * Point this at the real app URL and all CTAs follow.
   */
  ctaHref: "#create",
} as const;

export const social = {
  x: "https://x.com/grabmeasliceman",
  xHandle: "@grabmeasliceman",
} as const;

export const virtuals = {
  /** Rendered as a wordmark, not a reproduction of the Virtuals logo. */
  wordmark: "Virtuals",
  /** Used in the payment-link footer. Kept to ecosystem language. */
  poweredBy: "Powered by the Virtuals ecosystem",
  headline: "Built for the agent economy.",
  body: "Agents are starting to do real work — research, trading calls, code, support. Grab Me a Slice is a payment layer for the people and the agents creating that value.",
  disclaimer:
    "Ecosystem positioning. Integration scope and technical details to be confirmed.",
} as const;

export const token = {
  headline: "Every Slice can strengthen the ecosystem.",
  body: "The intent is for a share of eligible transaction revenue to support $GBMS token buybacks — value flowing back from real product usage rather than emissions.",
  disclaimer:
    "Not implemented. Exact mechanics, eligibility and implementation are subject to final token design. Nothing here is financial advice or a promise of returns.",
} as const;

/** Status labels used across the site so "what's real" is never ambiguous. */
export const STATUS = {
  live: { label: "Live", tone: "live" },
  soon: { label: "Coming soon", tone: "soon" },
  vision: { label: "Vision", tone: "vision" },
} as const;

export type StatusKey = keyof typeof STATUS;
