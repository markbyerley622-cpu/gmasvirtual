import { Grid, Spot } from "@/components/motion/atmosphere";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { AgentFlow } from "@/components/product/AgentFlow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function Agents() {
  return (
    <section id="agents" className="relative overflow-hidden py-24 md:py-32">
      <Grid size={64} fade="radial-gradient(ellipse at 70% 50%, black 5%, transparent 65%)" />
      <Spot
        className="right-[-8rem] top-[4rem]"
        color="rgba(31,92,255,0.2)"
        size={800}
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0">
            <Stagger>
              <Item>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>Agents</Eyebrow>
                  <StatusBadge status="soon" />
                </div>
              </Item>
              <Item className="mt-6">
                <h2 className="display-tight type-section text-gradient">
                  If an agent creates value,
                  <br />
                  <span className="text-gradient-crust">
                    it should be able to get paid.
                  </span>
                </h2>
              </Item>
              <Item className="mt-6">
                <p className="copy-pretty max-w-md text-[17px] leading-relaxed text-fg-dim">
                  An agent that does research, writes code or answers questions is
                  doing work. The same link that pays a person can pay a machine.
                </p>
              </Item>

              <Item className="mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="surface flex items-center gap-2.5 rounded-lg px-3.5 py-2">
                    <span className="font-mono text-[11px] text-fg-mute">
                      API access
                    </span>
                    <span className="num text-[12.5px] font-semibold text-crust">
                      $0.25
                    </span>
                  </span>
                  <span className="surface flex items-center gap-2.5 rounded-lg px-3.5 py-2">
                    <span className="font-mono text-[11px] text-fg-mute">
                      Per completion
                    </span>
                    <span className="num text-[12.5px] font-semibold text-crust">
                      $0.02
                    </span>
                  </span>
                  <span className="flex items-center gap-2 rounded-lg border border-dashed border-line-2 px-3.5 py-2">
                    <span className="text-[11.5px] text-fg-faint">
                      Machine-to-machine
                    </span>
                    <StatusBadge status="vision" />
                  </span>
                </div>
              </Item>
            </Stagger>
          </div>

          <Reveal className="flex min-w-0 justify-center lg:justify-end" y={40}>
            <AgentFlow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
