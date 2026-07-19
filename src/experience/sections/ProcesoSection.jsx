// Capítulo 6 — El proceso del estudio, en cuatro actos.

import { PROCESO, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";

export default function ProcesoSection() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-16">
      <div className="max-w-2xl">
        <Kicker>{SECTIONS[5].kicker}</Kicker>
        <Title>
          Un proceso de <Accent variant="cool">estudio</Accent>, no de fábrica.
        </Title>
        <Lead>{PROCESO.description}</Lead>
      </div>

      <div
        data-cine="line"
        data-cine-order={4}
        aria-hidden="true"
        className="mt-10 hidden h-px w-full lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(120,206,255,0.6), rgba(155,115,212,0.6), rgba(255,158,207,0.6), rgba(255,220,91,0.6))",
        }}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        {PROCESO.steps.map((step, i) => (
          <GlassCard key={step.num} order={5 + i} className="relative pt-6">
            <span className="absolute -top-4 left-5 bg-gradient-to-r from-[#cdeaff] via-[#e3d3ff] to-[#ffd9ec] bg-clip-text font-['Bauhaus93'] text-4xl text-transparent">
              {step.num}
            </span>
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {step.text}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
