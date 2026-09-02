// Conversación de WhatsApp atendida por IA (mockup vivo, placeholder).

import { WHATSAPP_IA } from "@/content/experience.js";
import Icon from "@/experience/ui/icons.jsx";
import useMockupTimeline from "@/experience/ui/mockups/useMockupTimeline.js";

function setupWhatsAppTimeline({ root, gsap }) {
  const messages = gsap.utils.toArray(
    root.querySelectorAll("[data-wa-message]"),
  );
  const thread = root.querySelector("[data-wa-thread]");
  const typing = root.querySelector("[data-wa-typing]");
  const dots = gsap.utils.toArray(root.querySelectorAll("[data-wa-dot]"));
  const send = root.querySelector("[data-wa-send]");

  gsap.set(messages, { autoAlpha: 0, y: 16, scale: 0.97 });
  gsap.set(typing, { autoAlpha: 0, y: 8, scale: 0.96 });
  gsap.set(dots, { y: 0 });
  gsap.set(thread, { y: 0 });

  return gsap
    .timeline({
      repeat: -1,
      repeatDelay: 0.08,
      defaults: { ease: "power2.out" },
    })
    .to(
      messages[0],
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.48 },
      0.08,
    )
    .to(typing, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 }, 1.15)
    .to(
      dots,
      {
        y: -3,
        duration: 0.22,
        stagger: { each: 0.1, repeat: 3, yoyo: true },
        ease: "sine.inOut",
      },
      1.24,
    )
    .to(typing, { autoAlpha: 0, y: -5, duration: 0.2 }, 2.25)
    .to(
      messages[1],
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.48 },
      2.32,
    )
    .to(send, { scale: 0.86, duration: 0.13, yoyo: true, repeat: 1 }, 3.3)
    .to(
      messages[2],
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.48 },
      3.48,
    )
    .to(thread, { y: -34, duration: 0.65, ease: "power2.inOut" }, 4.18)
    .to(typing, { autoAlpha: 1, y: 34, scale: 1, duration: 0.28 }, 4.28)
    .to(
      dots,
      {
        y: -3,
        duration: 0.22,
        stagger: { each: 0.1, repeat: 3, yoyo: true },
        ease: "sine.inOut",
      },
      4.36,
    )
    .to(typing, { autoAlpha: 0, y: 27, duration: 0.2 }, 5.38)
    .to(
      messages[3],
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.52 },
      5.46,
    )
    .to(thread, { y: -58, duration: 0.72, ease: "power2.inOut" }, 5.46)
    .to(
      messages,
      {
        autoAlpha: 0,
        y: -12,
        duration: 0.26,
        stagger: 0.025,
        ease: "power2.in",
      },
      8.15,
    )
    .set(thread, { y: 0 }, 8.45);
}

export default function MockWhatsApp() {
  const rootRef = useMockupTimeline(setupWhatsAppTimeline);

  return (
    <div ref={rootRef} className="flex h-full w-full flex-col bg-[#0b141a]">
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
        className="relative flex flex-1 flex-col overflow-hidden px-3 py-3"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.06), transparent 50%)",
        }}>
        <div data-wa-thread className="flex flex-col gap-2">
          {WHATSAPP_IA.conversation.slice(0, 4).map((msg, i) => (
            <div
              key={i}
              data-wa-message
              className={`max-w-[82%] rounded-xl px-3 py-2 text-[11.5px] leading-snug shadow-md ${
                msg.from === "ai"
                  ? "self-start rounded-tl-sm bg-[#1f2c34] text-white/95"
                  : "self-end rounded-tr-sm bg-[#005c4b] text-white"
              }`}>
              {msg.text}
              <span className="mt-0.5 block text-right text-[8.5px] text-white/45">
                {msg.from === "ai" ? "Agente IA ✓✓" : `12:0${i}`}
              </span>
            </div>
          ))}
          <div
            data-wa-typing
            aria-label="El agente está escribiendo"
            className="flex w-fit items-center gap-1 self-start rounded-xl rounded-tl-sm bg-[#1f2c34] px-3 py-2.5 shadow-md">
            {[0, 1, 2].map((dot) => (
              <i
                key={dot}
                data-wa-dot
                className="h-1.5 w-1.5 rounded-full bg-white/55"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
        <div className="h-8 flex-1 rounded-full bg-[#2a3942] px-3 text-[11px] leading-8 text-white/40">
          El agente responde por ti…
        </div>
        <div
          data-wa-send
          className="grid h-8 w-8 place-items-center rounded-full bg-[#00a884] text-white">
          <Icon name="send" size={15} />
        </div>
      </div>
    </div>
  );
}
