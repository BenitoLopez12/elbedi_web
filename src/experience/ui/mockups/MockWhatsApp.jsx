// Conversación de WhatsApp atendida por IA (mockup vivo, placeholder).

import { WHATSAPP_IA } from "@/content/experience.js";
import Icon from "@/experience/ui/icons.jsx";

export default function MockWhatsApp() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0b141a]">
      {/* Header del chat */}
      <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-7">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#3853F0] to-[#BD0B91] text-white">
          <Icon name="bot" size={18} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-white">
            Tu Negocio · Agente IA
          </p>
          <p className="text-[10px] text-emerald-400">
            en línea · responde en segundos
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400">
          IA activa
        </span>
      </div>
      {/* Mensajes */}
      <div
        className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.06), transparent 50%)",
        }}>
        {WHATSAPP_IA.conversation.map((msg, i) => (
          <div
            key={i}
            data-cine="pop"
            data-cine-order={4 + i}
            className={`max-w-[82%] rounded-xl px-3 py-2 text-[11.5px] leading-snug shadow-md ${
              msg.from === "ai"
                ? "self-start rounded-tl-sm bg-[#1f2c34] text-white/95"
                : "self-end rounded-tr-sm bg-[#005c4b] text-white"
            }`}>
            {msg.text}
            <span className="mt-0.5 block text-right text-[8.5px] text-white/45">
              {msg.from === "ai" ? "Agente IA ✓✓" : "12:0" + i}
            </span>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
        <div className="h-8 flex-1 rounded-full bg-[#2a3942] px-3 text-[11px] leading-8 text-white/40">
          El agente responde por ti…
        </div>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#00a884] text-white">
          <Icon name="send" size={15} />
        </div>
      </div>
    </div>
  );
}
