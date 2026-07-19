// Capítulo 8 — Preguntas frecuentes (acordeón animado con scroll interno).

import { useState } from "react";
import { FAQS, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Accent } from "@/experience/ui/SectionShell.jsx";
import Icon from "@/experience/ui/icons.jsx";

// Icono temático por pregunta (mismo lenguaje visual que las cards).
const FAQ_ICONS = [
  "monitor",
  "whatsapp",
  "bot",
  "route",
  "network",
  "chart",
  "spark",
];

function FaqItem({ item, index, open, onToggle }) {
  return (
    <div
      data-cine="rise"
      data-cine-order={4 + index}
      className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 ${
        open
          ? "border-white/40 bg-white/15"
          : "border-white/20 bg-white/8 hover:bg-white/12"
      }`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/25 text-white transition-colors duration-300 ${
              open
                ? "bg-gradient-to-br from-[#75459e] to-[#da63c5]"
                : "bg-white/10"
            }`}>
            <Icon name={FAQ_ICONS[index % FAQ_ICONS.length]} size={17} />
          </span>
          <span className="text-base font-semibold text-white 2xl:text-lg">
            {item.q}
          </span>
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-transform duration-500 ${
            open ? "rotate-45 bg-white/20" : ""
          }`}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-white/85">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center px-6 py-16">
      <div className="text-center">
        <Kicker>{SECTIONS[7].kicker}</Kicker>
        <Title>
          Las dudas de siempre,{" "}
          <Accent variant="cool">respondidas claro.</Accent>
        </Title>
        <p data-cine="rise" className="mx-auto mt-4 max-w-xl text-sm text-white/75">
          ¿No encuentras tu pregunta? El asistente de la derecha responde
          cualquier duda al instante — o escríbenos por WhatsApp.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-3">
        {FAQS.map((item, index) => (
          <FaqItem
            key={item.q}
            item={item}
            index={index}
            open={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? -1 : index))
            }
          />
        ))}
      </div>
    </div>
  );
}
