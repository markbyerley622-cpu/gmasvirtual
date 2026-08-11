/**
 * Visual QA harness. Captures the page at a set of widths and reports any
 * horizontal overflow plus console errors.
 *
 *   node scripts/shot.mjs [outDir] [width:height,...]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4319/";
const outDir = process.argv[2] ?? "shots";
const sizes = (process.argv[3] ?? "1440:900,390:844")
  .split(",")
  .map((s) => s.split(":").map(Number));

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
let failed = false;

for (const [width, height] of sizes) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    // Reveal-on-scroll content renders immediately under reduced motion, which
    // makes full-page captures deterministic (and doubles as an a11y check).
    reducedMotion: process.env.MOTION === "1" ? "no-preference" : "reduce",
  });

  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle" });
  // Let scroll-triggered sections play through.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > docW + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.pointerEvents === "none") continue;
        // Content inside a deliberately scrollable track (e.g. the roadmap
        // rail) is allowed to extend past the viewport.
        let p = el.parentElement;
        let inScroller = false;
        while (p && p !== document.body) {
          const ox = getComputedStyle(p).overflowX;
          if (ox === "auto" || ox === "scroll") {
            inScroller = true;
            break;
          }
          p = p.parentElement;
        }
        if (inScroller) continue;
        const host = el.closest("section, footer, header");
        const sec = host
          ? `${host.tagName.toLowerCase()}${host.id ? "#" + host.id : ""}`
          : "?";
        offenders.push(
          `[${sec}] ${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} → ${Math.round(r.left)}..${Math.round(r.right)}`
        );
      }
    }
    return {
      scrollW: document.documentElement.scrollWidth,
      clientW: docW,
      offenders: offenders.slice(0, 6),
    };
  });

  await page.screenshot({ path: `${outDir}/${width}.png`, fullPage: true });

  const bad = overflow.scrollW > overflow.clientW + 1;
  if (bad || errors.length) failed = true;
  console.log(
    `${width}px  scroll=${overflow.scrollW}/${overflow.clientW} ${bad ? "OVERFLOW" : "ok"}` +
      (overflow.offenders.length ? `\n   ${overflow.offenders.join("\n   ")}` : "") +
      (errors.length ? `\n   console: ${errors.slice(0, 4).join(" | ")}` : "")
  );
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
