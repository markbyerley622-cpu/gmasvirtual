import { MouseProvider } from "@/components/motion/mouse";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Behavior } from "@/components/sections/Behavior";
import { OneLink } from "@/components/sections/OneLink";
import { UseCases } from "@/components/sections/UseCases";
import { Plays } from "@/components/sections/Plays";
import { Agents } from "@/components/sections/Agents";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Roadmap } from "@/components/sections/Roadmap";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Page() {
  return (
    <MouseProvider>
      <Nav />
      <main id="main">
        <Hero />
        <Behavior />
        <OneLink />
        <UseCases />
        <Plays />
        <Agents />
        <Ecosystem />
        <Roadmap />
        <FinalCta />
      </main>
      <Footer />
    </MouseProvider>
  );
}
