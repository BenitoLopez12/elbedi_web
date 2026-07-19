// Capítulo 10 — Footer: EXACTAMENTE el mismo componente compartido que usa
// /websites (src/layouts/partials/footer.jsx). Un solo footer para todo el
// sitio. Los enlaces con hash que coinciden con secciones de la experiencia
// se interceptan y viajan por el bus de intents (misma navegación que el
// scroll inteligente y el agente IA); el resto navega normal.

import Footer from "@/layouts/partials/footer.jsx";
import site from "@/content/site.js";
import {
  dispatchIntent,
  resolveSectionIndex,
} from "@/experience/state/experienceStore.js";

const FOOTER_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Websites", href: "/websites" },
  { label: "WhatsApp IA", href: "#whatsapp-ia" },
  { label: "Agentes IA", href: "#agentes" },
  { label: "Analíticas", href: "#analiticas" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function FooterSection() {
  const onClickCapture = (event) => {
    const anchor = event.target.closest?.("a[href^='#']");
    if (!anchor) return;
    const sectionId = anchor.getAttribute("href").slice(1);
    if (resolveSectionIndex(sectionId) === -1) return;
    event.preventDefault();
    dispatchIntent({ type: "navigate", section: sectionId, source: "footer" });
  };

  return (
    <div
      data-cine="rise"
      className="mx-auto w-full max-w-7xl px-4 md:px-6"
      onClickCapture={onClickCapture}>
      <Footer
        brand={site.name}
        email={site.email}
        phone={site.phone}
        links={FOOTER_LINKS}
        variant="plain"
      />
    </div>
  );
}
