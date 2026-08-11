/** Drives the interactive demo surfaces and asserts they respond. */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4319/";
const browser = await chromium.launch();
const fails = [];
const ok = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) fails.push(name);
};

// --- Desktop: payment demo, unlock, copy ---
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Amount selection updates the CTA total.
  await page.getByRole("button", { name: /^\$25/ }).first().click();
  ok(
    "amount tier updates total",
    /\$25\.00/.test(await page.getByRole("button", { name: /Send a Slice/ }).innerText())
  );

  // Message + send produces the receipt.
  await page.getByPlaceholder("Say something nice…").fill("Great work");
  await page.getByRole("button", { name: /Send a Slice/ }).click();
  // The card holds a ~1.15s "Sending…" phase before the receipt.
  await page.getByText("Slice sent.").waitFor({ state: "visible", timeout: 6000 });
  ok("send shows receipt", await page.getByText("Slice sent.").isVisible());
  ok("receipt echoes message", await page.getByText("“Great work”").isVisible());
  await page.screenshot({ path: "shots/receipt.png", clip: { x: 900, y: 150, width: 480, height: 560 } });

  // Replay returns to the form.
  await page.getByRole("button", { name: /Replay demo/ }).click();
  await page.getByPlaceholder("Say something nice…").waitFor({ state: "visible", timeout: 4000 });
  ok("replay restores form", await page.getByPlaceholder("Say something nice…").isVisible());

  // Copy link.
  await page.getByRole("button", { name: "Copy" }).click();
  await page.waitForTimeout(250);
  ok("copy button confirms", await page.getByRole("button", { name: "Copied" }).isVisible());

  // Paid content unlock.
  const unlock = page.getByRole("button", { name: /Unlock for \$5/ });
  await unlock.scrollIntoViewIfNeeded();
  await unlock.click();
  await page.waitForTimeout(600);
  ok("unlock toggles state", await page.getByRole("button", { name: /Lock again/ }).isVisible());
  await page.screenshot({ path: "shots/unlocked.png", clip: { x: 100, y: 200, width: 560, height: 520 } });

  ok("no runtime errors", errors.length === 0);
  if (errors.length) console.log("   ", errors.slice(0, 3).join(" | "));
  await page.close();
}

// --- Mobile: menu ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });

  const menu = page.locator("#mobile-menu");
  const roadmapLink = menu.getByRole("link", { name: "Roadmap" });
  const toggle = page.getByRole("button", { name: "Open menu" });
  ok("menu toggle present on mobile", await toggle.isVisible());
  await toggle.click();
  await page.waitForTimeout(300);
  ok("menu opens", await roadmapLink.isVisible());
  await page.screenshot({ path: "shots/mobile-menu.png" });

  await roadmapLink.click();
  // Smooth-scroll across a very tall page. Wait for the target itself to come
  // to rest near the top rather than for scrollY to stop changing — the latter
  // reports "settled" before the scroll has even started moving.
  await page.waitForFunction(
    () => {
      const t = document.getElementById("roadmap").getBoundingClientRect().top;
      return t >= 50 && t <= 110;
    },
    null,
    { polling: 100, timeout: 20000 }
  );

  // The anchor target must clear the fixed header.
  const top = await page.evaluate(
    () => document.getElementById("roadmap").getBoundingClientRect().top
  );
  // Must clear the 72px fixed header without overshooting into dead space.
  ok(`roadmap anchor clears fixed nav (top=${Math.round(top)})`, top >= 74 && top <= 130);
  // The menu plays a collapse animation before it leaves the DOM.
  await roadmapLink.waitFor({ state: "hidden", timeout: 4000 }).catch(() => {});
  ok("menu closes after navigating", !(await roadmapLink.isVisible()));
  await page.close();
}

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILED` : "\nall passed");
process.exit(fails.length ? 1 : 0);
