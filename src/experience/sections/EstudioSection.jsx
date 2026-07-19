// Capítulo 7 — Manifiesto del estudio.

import { ESTUDIO, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import Icon from "@/experience/ui/icons.jsx";

export default function EstudioSection() {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr]">
      <div>
        <Kicker>{SECTIONS[6].kicker}</Kicker>
        <Title>
          La IA como <Accent variant="warm">operador</Accent>, no como adorno.
        </Title>
        <Lead>{ESTUDIO.description}</Lead>

        <blockquote
          data-cine="rise"
          data-cine-order={5}
          className="mt-8 border-l-2 border-[#FF9ECF] pl-5 text-lg italic leading-relaxed text-white/90 2xl:text-xl">
          “No hacemos páginas. Construimos experiencias que trabajan por tu
          negocio mientras tú duermes.”
        </blockquote>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ESTUDIO.principles.map((principle, i) => (
          <GlassCard key={principle.title} order={4 + i}>
            <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl border border-white/25 bg-gradient-to-br from-[#2a3ca3] via-[#7d55c8] to-[#fe79bd] text-white">
              <Icon
                name={["spark", "chart", "bot", "route"][i] || "spark"}
                size={18}
              />
            </div>
            <h3 className="text-base font-semibold text-white">
              {principle.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/80">
              {principle.text}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
