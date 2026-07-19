// Capítulo 5 — Servicio 04: analíticas web con analista de IA.

import { ANALITICAS, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import TiltFrame from "@/experience/ui/TiltFrame.jsx";
import { PanelFrame } from "@/experience/ui/frames.jsx";
import MockDashboard from "@/experience/ui/mockups/MockDashboard.jsx";
import Icon from "@/experience/ui/icons.jsx";

export default function AnaliticasSection() {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-end">
          <ActionButton
            order={4}
            variant="cool"
            whatsappMessage={ANALITICAS.ctaWhatsapp}>
            Ver mis analíticas con IA
            <Icon name="arrow" size={16} />
          </ActionButton>
        </div>
        <div data-cine="panel" data-cine-order={3}>
          <TiltFrame>
            <PanelFrame title="ELBEDI Analytics · tusitio.com">
              <MockDashboard />
            </PanelFrame>
          </TiltFrame>
          <p className="mt-3 text-center text-xs text-white/60">
            Panel de ejemplo — funciona con cualquier sitio web.
          </p>
        </div>
      </div>

      <div>
        <Kicker>{SECTIONS[4].kicker}</Kicker>
        <Title>
          Tu tráfico web,{" "}
          <Accent variant="warm">explicado por un analista de IA.</Accent>
        </Title>
        <Lead>{ANALITICAS.description}</Lead>

        <div className="mt-7 flex flex-col gap-3">
          {ANALITICAS.bullets.map((item, i) => (
            <GlassCard key={item.title} order={5 + i} className="py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/25 bg-gradient-to-br from-[#2e95d1] via-[#7a55c8] to-[#bd3893] text-white">
                  <Icon name={["chart", "bot", "mail"][i] || "spark"} size={17} />
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
    </div>
  );
}
