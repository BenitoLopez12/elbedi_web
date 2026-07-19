// Capítulo 2 — Servicio 01: experiencias web cinematográficas.

import { WEBSITES, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import TiltFrame from "@/experience/ui/TiltFrame.jsx";
import { BrowserFrame } from "@/experience/ui/frames.jsx";
import MockWebsite from "@/experience/ui/mockups/MockWebsite.jsx";
import Icon from "@/experience/ui/icons.jsx";

export default function WebsitesSection() {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Kicker>{SECTIONS[1].kicker}</Kicker>
        <Title>
          Sitios web que se sienten{" "}
          <Accent variant="cool">como una película.</Accent>
        </Title>
        <Lead>{WEBSITES.description}</Lead>

        <div className="mt-7 flex flex-col gap-3">
          {WEBSITES.bullets.map((item, i) => (
            <GlassCard key={item.title} order={5 + i} className="py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/25 bg-gradient-to-br from-[#FF9ECF]/80 to-[#ffdc5b]/80 text-slate-900 text-xs font-bold">
                  0{i + 1}
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
        {/* CTAs sobre el mockup: distribuye el contenido entre columnas y
            evita que la columna de texto desborde la pantalla. */}
        <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-end">
          <ActionButton order={4} href={WEBSITES.ctaPrimary.href}>
            {WEBSITES.ctaPrimary.label}
            <Icon name="arrow" size={16} />
          </ActionButton>
          <ActionButton
            order={4.5}
            variant="glass"
            whatsappMessage={WEBSITES.ctaWhatsapp}>
            Cotizar mi sitio
          </ActionButton>
        </div>
        <div data-cine="panel" data-cine-order={3}>
          <TiltFrame>
            <BrowserFrame url="tunegocio.com — hecho por ELBEDI">
              <MockWebsite />
            </BrowserFrame>
          </TiltFrame>
          <p className="mt-3 text-center text-xs text-white/60">
            Vista de ejemplo — cada proyecto se dirige a la medida.
          </p>
        </div>
      </div>
    </div>
  );
}
