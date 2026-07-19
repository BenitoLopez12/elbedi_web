// Capítulo 3 — Servicio 02: agentes de IA para WhatsApp.

import { WHATSAPP_IA, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import TiltFrame from "@/experience/ui/TiltFrame.jsx";
import { PhoneFrame } from "@/experience/ui/frames.jsx";
import MockWhatsApp from "@/experience/ui/mockups/MockWhatsApp.jsx";
import Icon from "@/experience/ui/icons.jsx";

export default function WhatsAppSection() {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr]">
      <div data-cine="panel" data-cine-order={3} className="mx-auto w-full max-w-[300px]">
        <TiltFrame max={12}>
          <PhoneFrame className="aspect-[9/18.5]">
            <MockWhatsApp />
          </PhoneFrame>
        </TiltFrame>
      </div>

      <div>
        <Kicker>{SECTIONS[2].kicker}</Kicker>
        <Title>
          Tu WhatsApp, atendido por{" "}
          <Accent variant="warm">agentes de IA 24/7.</Accent>
        </Title>
        <Lead>{WHATSAPP_IA.description}</Lead>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {WHATSAPP_IA.agents.map((agent, i) => (
            <GlassCard key={agent.name} order={5 + i} className="p-4">
              <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl border border-white/25 bg-gradient-to-br from-[#2a9bbd] to-[#293eb3] text-white">
                <Icon name="bot" size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#add3ff]">
                {agent.role}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                {agent.text}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8">
          <ActionButton
            order={9}
            variant="cool"
            whatsappMessage={WHATSAPP_IA.ctaWhatsapp}>
            <Icon name="whatsapp" size={17} />
            Quiero mi WhatsApp con IA
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
