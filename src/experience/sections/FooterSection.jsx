// Capítulo 10 — Footer: EXACTAMENTE el mismo componente compartido que usa
// /websites (src/layouts/partials/footer.jsx). Un solo footer para todo el
// sitio. Los enlaces con hash que coinciden con secciones de la experiencia
// se interceptan y viajan por el bus de intents (la misma navegación del
// menú interactivo); el resto navega normal.

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
    <Footer
      id="footer"
      data-chapter
      data-reversible-section
      data-post-studio-item
      className="cine-footer"
      onClickCapture={onClickCapture}
      brand={site.name}
      email={site.email}
      phone={site.phone}
      links={FOOTER_LINKS}
    />
  );
}
