import { useEffect, useRef, useState } from "react";

const DEFAULT_MESSAGE =
  "Hola, me gustaría recibir información sobre sus servicios.";

function normalizePhone(phone = "") {
  return String(phone).replace(/\D/g, "");
}

export default function WhatsApp({
  phone,
  message = DEFAULT_MESSAGE,
  label = "Chatea por WhatsApp",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    return null;
  }

  const href = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleOutsideClick(event) {
      if (!panelRef.current) {
        return;
      }

      if (!panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className="pointer-events-none fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-70 flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="Ventana de chat de WhatsApp"
          className="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border border-[#d6efe0] bg-[#f0f2f5] shadow-[0_24px_50px_-26px_rgba(0,0,0,0.55)] motion-safe:animate-[whatsChatEnter_340ms_cubic-bezier(0.16,1,0.3,1)_both]">
          <header className="flex items-center justify-between bg-[#075e54] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <img
                src="/images/icons/whatsapp.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-8 w-8 brightness-200"
              />
              <div>
                <p className="text-sm font-semibold leading-none">
                  Asesor ELBEDI
                </p>
                <p className="text-sm text-white/80">Responde en minutos</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 px-3 text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
              aria-label="Cerrar chat flotante">
              <span
                aria-hidden="true"
                className="font-sans text-xl leading-none font-semibold select-none">
                ×
              </span>
            </button>
          </header>

          <div className="space-y-3 bg-[url('/images/heroBack.webp')] bg-cover bg-center px-4 py-4">
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm motion-safe:animate-[whatsBubbleEnter_320ms_cubic-bezier(0.22,1,0.36,1)_both]">
              Hola, soy parte del equipo de ELBEDI. ¿En qué te apoyamos hoy?
            </p>
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm motion-safe:animate-[whatsBubbleEnter_320ms_cubic-bezier(0.22,1,0.36,1)_both] motion-safe:[animation-delay:90ms]">
              Puedes abrir WhatsApp y te atendemos de inmediato.
            </p>
          </div>

          <div className="bg-white px-4 py-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir conversación en WhatsApp"
              aria-label={`${label} (abre una nueva pestaña)`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40">
              Continuar en WhatsApp
            </a>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar chat de WhatsApp" : label}
        className="group pointer-events-auto relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_30px_-14px_rgba(37,211,102,0.95)] ring-1 ring-white/30 transition-transform duration-300 ease-out hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/45 motion-safe:animate-[floatWhats_4.4s_ease-in-out_infinite] cursor-pointer">
        <span className="sr-only">{label}</span>

        <img
          src="/images/icons/whatsapp.svg"
          alt=""
          aria-hidden="true"
          className="h-10 w-10 brightness-200"
          loading="lazy"
          decoding="async"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </button>
    </div>
  );
}
