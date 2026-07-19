// Capítulo 4 — Servicio 03: sistemas agénticos empresariales.

import { AGENTES, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import TiltFrame from "@/experience/ui/TiltFrame.jsx";
import { PanelFrame } from "@/experience/ui/frames.jsx";
import MockAgentsGraph from "@/experience/ui/mockups/MockAgentsGraph.jsx";
import Icon from "@/experience/ui/icons.jsx";

export default function AgentesSection() {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Kicker>{SECTIONS[3].kicker}</Kicker>
        <Title>
          Agentes de IA expertos,{" "}
          <Accent variant="cool">integrados a tu operación.</Accent>
        </Title>
        <Lead>{AGENTES.description}</Lead>

        <div className="mt-7 flex flex-col gap-3">
          {AGENTES.bullets.map((item, i) => (
            <GlassCard key={item.title} order={5 + i} className="py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/25 bg-gradient-to-br from-[#75459e] to-[#da63c5] text-white">
                  <Icon
                    name={["bot", "network", "route"][i] || "spark"}
                    size={17}
                  />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">
                    {item.text}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>

      <div className="max-lg:order-first">
        <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-end">
          <ActionButton order={4} whatsappMessage={AGENTES.ctaWhatsapp}>
            Diseñar mi sistema de agentes
            <Icon name="arrow" size={16} />
          </ActionButton>
        </div>
        <div data-cine="panel" data-cine-order={3}>
          <TiltFrame>
            <PanelFrame title="Sistema multi-agente · Tu empresa">
              <MockAgentsGraph />
            </PanelFrame>
          </TiltFrame>
          <p className="mt-3 text-center text-xs text-white/60">
            Orquestación de ejemplo — cada sistema se diseña a la medida.
          </p>
        </div>
      </div>
    </div>
  );
}
