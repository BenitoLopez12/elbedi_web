// Raíz de la experiencia cinematográfica del index:
// backdrop vivo + escenario de secciones + scroll inteligente + agente IA.

import { useRef } from "react";
import { SECTIONS } from "@/content/experience.js";
import { useSectionEngine } from "@/experience/navigation/useSectionEngine.js";
import SmartScrollNav from "@/experience/navigation/SmartScrollNav.jsx";
import ExperienceBackdrop from "@/experience/ExperienceBackdrop.jsx";
import ChatPanel from "@/experience/chat/ChatPanel.jsx";

import HeroSection from "@/experience/sections/HeroSection.jsx";
import WebsitesSection from "@/experience/sections/WebsitesSection.jsx";
import WhatsAppSection from "@/experience/sections/WhatsAppSection.jsx";
import AgentesSection from "@/experience/sections/AgentesSection.jsx";
import AnaliticasSection from "@/experience/sections/AnaliticasSection.jsx";
import ProcesoSection from "@/experience/sections/ProcesoSection.jsx";
import EstudioSection from "@/experience/sections/EstudioSection.jsx";
import FaqSection from "@/experience/sections/FaqSection.jsx";
import ContactoSection from "@/experience/sections/ContactoSection.jsx";
import FooterSection from "@/experience/sections/FooterSection.jsx";

const SECTION_COMPONENTS = {
  inicio: HeroSection,
  websites: WebsitesSection,
  "whatsapp-ia": WhatsAppSection,
  agentes: AgentesSection,
  analiticas: AnaliticasSection,
  proceso: ProcesoSection,
  estudio: EstudioSection,
  faq: FaqSection,
  contacto: ContactoSection,
  footer: FooterSection,
};

export default function Experience() {
  const stageRef = useRef(null);
  const sectionRefs = useRef([]);
  const { active } = useSectionEngine({ stageRef, sectionRefs });

  return (
    <div className="flex h-svh w-full overflow-hidden text-white">
      <ExperienceBackdrop />
      <SmartScrollNav />

      {/* Marca */}
      <a
        href="/"
        aria-label="ELBEDI — inicio"
        className="fixed left-5 top-4 z-40 block h-6 w-28 opacity-90 transition-opacity hover:opacity-100 md:left-6 md:top-5">
        <img
          src="/images/logo.webp"
          alt="ELBEDI"
          className="h-full w-full object-contain object-left"
        />
      </a>

      {/* Escenario de secciones */}
      <main
        ref={stageRef}
        className="cine-stage relative h-full min-w-0 flex-1">
        {SECTIONS.map((meta, index) => {
          const SectionBody = SECTION_COMPONENTS[meta.id];
          const isActive = index === active;
          return (
            <section
              key={meta.id}
              id={meta.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              aria-label={meta.name}
              inert={!isActive}
              className="cine-section absolute inset-0">
              <div
                data-cine-scroller
                className="cine-scroller h-full overflow-y-auto overscroll-contain md:pl-20 max-md:pb-28">
                <SectionBody />
              </div>
            </section>
          );
        })}
      </main>

      <ChatPanel />
    </div>
  );
}
