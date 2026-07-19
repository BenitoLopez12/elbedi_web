// Capítulo 9 — Resolución: el llamado a la acción en calma total.

import { useState } from "react";
import { CONTACTO, SECTIONS } from "@/content/experience.js";
import { Kicker, Title, Lead, GlassCard, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import Icon from "@/experience/ui/icons.jsx";
import { buildWhatsAppUrl } from "@/lib/whatsapp.js";
import site from "@/content/site.js";

export default function ContactoSection() {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");

  const message = `Hola ELBEDI, soy ${name || "…"}. ${idea || "Quiero platicar sobre un proyecto."}`;

  return (
    <div className="mx-auto grid min-h-full w-full max-w-5xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <Kicker>{SECTIONS[8].kicker}</Kicker>
        <Title>
          Construyamos algo que <Accent variant="warm">trabaje por ti.</Accent>
        </Title>
        <Lead>{CONTACTO.description}</Lead>

        <div className="mt-8 flex flex-col gap-3">
          <a
            data-cine="pop"
            data-cine-order={5}
            href={buildWhatsAppUrl(CONTACTO.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]/90 text-white">
              <Icon name="whatsapp" size={22} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">
                WhatsApp directo
              </span>
              <span className="block text-xs text-white/70">
                Respuesta el mismo día · {site.phone}
              </span>
            </span>
            <Icon
              name="arrow"
              size={18}
              className="ml-auto text-white/50 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            data-cine="pop"
            data-cine-order={6}
            href={`mailto:${CONTACTO.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#3853F0] to-[#BD0B91] text-white">
              <Icon name="mail" size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">
                Correo del estudio
              </span>
              <span className="block text-xs text-white/70">
                {CONTACTO.email}
              </span>
            </span>
            <Icon
              name="arrow"
              size={18}
              className="ml-auto text-white/50 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <p data-cine="rise" data-cine-order={7} className="mt-8 text-xs text-white/60">
          ELBEDI · Estudio de desarrollo e inteligencia artificial · México
        </p>
      </div>

      <GlassCard order={4} className="p-6">
        <h3 className="text-lg font-semibold text-white">
          Cuéntanos tu idea
        </h3>
        <p className="mt-1 text-xs text-white/70">
          Se abre directo en WhatsApp con tu mensaje listo.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <label className="text-xs font-medium uppercase tracking-wide text-white/70">
            Tu nombre
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="mt-1.5 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none backdrop-blur-sm transition-colors focus:border-[#FF9ECF]/70 focus:bg-white/15"
            />
          </label>
          <label className="text-xs font-medium uppercase tracking-wide text-white/70">
            Tu proyecto
            <textarea
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Quiero un sitio web / agentes de IA para…"
              className="mt-1.5 w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none backdrop-blur-sm transition-colors focus:border-[#FF9ECF]/70 focus:bg-white/15"
            />
          </label>
          <ActionButton whatsappMessage={message} className="mt-1 w-full">
            Enviar por WhatsApp
            <Icon name="send" size={16} />
          </ActionButton>
        </div>
      </GlassCard>
    </div>
  );
}
