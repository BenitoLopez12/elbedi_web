// Panel del agente de IA: siempre presente a la derecha (desktop),
// sheet flotante en móvil. Cada interacción está animada con motion.
// El agente navega el sitio por el usuario a través del bus de intents.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/experience/ui/icons.jsx";
import { runAgentTurn } from "@/experience/chat/agentClient.js";
import {
  experienceStore,
  dispatchIntent,
} from "@/experience/state/experienceStore.js";
import { useExperienceSelector } from "@/experience/state/useExperienceSelector.js";
import { buildWhatsAppUrl } from "@/lib/whatsapp.js";
import { compactConversation } from "@/experience/chat/compactor.js";
import { SERVICE_DEMOS } from "@/content/experience.js";

// ---------------------------------------------------------------------------
// Botones por respuesta — el CÓDIGO los decide, no el modelo (coherencia
// garantizada y cero tokens extra). Máximo dos:
//   1. "Ver demo" del servicio en contexto (la sección de servicio a la que
//      el agente navegó por última vez). Sin servicio en contexto, no hay
//      botón de demo.
//   2. "Continuar en WhatsApp" — SIEMPRE presente. Al hacer clic compacta la
//      conversación en tiempo real (nunca por adelantado) y abre WhatsApp
//      con el resumen prellenado.
// ---------------------------------------------------------------------------

const WA_BUTTON = { kind: "whatsapp-live", label: "💬 Continuar en WhatsApp" };

function buildTurnButtons(serviceContext) {
  const demo = SERVICE_DEMOS[serviceContext];
  const buttons = [];
  if (demo) buttons.push({ kind: "demo", label: demo.label, value: demo.url });
  buttons.push(WA_BUTTON);
  return buttons;
}

const WELCOME = {
  id: "welcome",
  role: "assistant",
  text: "¡Hola! 👋 Soy el asistente de ELBEDI. Puedo navegar el sitio por ti, explicarte cada servicio y ayudarte a cotizar. ¿Qué te gustaría ver?",
  suggests: [
    { kind: "chip", label: "🌐 Sitios web", value: "Quiero un sitio web" },
    { kind: "chip", label: "🤖 WhatsApp con IA", value: "¿Cómo funciona el WhatsApp con IA?" },
    { kind: "chip", label: "🧠 Agentes de IA", value: "Quiero agentes de IA en mi empresa" },
    { kind: "chip", label: "📊 Analíticas", value: "Quiero analíticas de mi sitio web" },
    WA_BUTTON,
  ],
};

const spring = { type: "spring", stiffness: 380, damping: 32 };

function Bubble({ message, onChip, onWhatsApp, compacting }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={spring}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-md ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-[#3853F0] to-[#7a3fd4] text-white"
            : "rounded-bl-sm border border-white/15 bg-white/10 text-white/95 backdrop-blur-sm"
        }`}>
        {message.text}
        {message.streaming && (
          <motion.span
            className="ml-1 inline-block h-3 w-[2px] translate-y-0.5 bg-white/80"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        )}
      </div>
      {message.suggests?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...spring }}
          className="mt-2 flex max-w-[92%] flex-wrap gap-1.5">
          {message.suggests.map((s, i) => {
            if (s.kind === "demo") {
              return (
                <a
                  key={i}
                  href={s.value}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#c9a6ff]/50 bg-[#7d55e8]/25 px-3 py-1.5 text-[11px] font-semibold text-[#ead9ff] transition-colors hover:bg-[#7d55e8]/45">
                  {s.label} ↗
                </a>
              );
            }
            if (s.kind === "whatsapp-live") {
              return (
                <button
                  key={i}
                  type="button"
                  disabled={compacting}
                  onClick={onWhatsApp}
                  className="rounded-full border border-[#25D366]/50 bg-[#25D366]/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-100 transition-colors hover:bg-[#25D366]/30 disabled:opacity-60">
                  {compacting ? "⏳ Preparando resumen…" : `${s.label} ↗`}
                </button>
              );
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => onChip(s.value)}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 transition-colors hover:bg-white/20">
                {s.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
      style={{ width: "fit-content" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
    </motion.div>
  );
}

export default function ChatPanel() {
  const chatOpen = useExperienceSelector((s) => s.chatOpen);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [compacting, setCompacting] = useState(false);
  const scrollRef = useRef(null);
  const idRef = useRef(0);
  // Servicio en contexto = última sección de servicio a la que navegó el
  // agente. De aquí sale el botón de demo coherente con lo que ve el usuario.
  const serviceContextRef = useRef(null);

  // "Continuar en WhatsApp": la pestaña se abre de forma síncrona (conserva
  // el gesto del usuario frente a bloqueadores de pop-ups) y el compactado se
  // genera en ese momento — nunca por adelantado.
  const openWhatsApp = async () => {
    if (compacting) return;
    setCompacting(true);

    const pending = window.open("", "_blank");
    try {
      if (pending) {
        pending.document.write(
          "<title>Abriendo WhatsApp…</title><body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'>Preparando tu conversación…</body>",
        );
      }
      const history = messages
        .filter((m) => m.text)
        .map((m) => ({ role: m.role, content: m.text }));
      const summary = await compactConversation(history);
      const url = buildWhatsAppUrl(summary);
      if (pending) pending.location.href = url;
      else window.open(url, "_blank");
    } catch {
      pending?.close?.();
    } finally {
      setCompacting(false);
    }
  };

  // Estado inicial según viewport: abierto en desktop, cerrado en móvil.
  useEffect(() => {
    if (experienceStore.get().chatOpen === null) {
      experienceStore.set({
        chatOpen: window.matchMedia("(min-width: 1280px)").matches,
      });
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (rawText) => {
    const text = String(rawText ?? input).trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);

    // El historial se arma desde el estado actual ANTES de encolar el nuevo
    // mensaje (nunca dentro del updater: React lo ejecuta después y el
    // cerebro recibiría el historial desordenado).
    const history = messages
      .filter((m) => m.text)
      .map((m) => ({ role: m.role, content: m.text }));
    history.push({ role: "user", content: text });

    setMessages((prev) => [
      ...prev,
      { id: `u${++idRef.current}`, role: "user", text },
    ]);

    const assistantId = `a${++idRef.current}`;
    let started = false;

    const ensureBubble = () => {
      if (started) return;
      started = true;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", text: "", streaming: true, suggests: [] },
      ]);
    };

    await runAgentTurn(history, {
      onText: (delta) => {
        ensureBubble();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: m.text + delta } : m,
          ),
        );
      },
      onSuggest: (suggest) => {
        ensureBubble();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, suggests: [...(m.suggests || []), suggest] }
              : m,
          ),
        );
      },
      onIntent: (intent) => {
        if (intent.type === "navigate" && SERVICE_DEMOS[intent.section]) {
          serviceContextRef.current = intent.section;
        }
      },
      onDone: () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  streaming: false,
                  // Los botones finales los decide el código: demo del
                  // servicio en contexto + WhatsApp, nada más.
                  suggests: buildTurnButtons(serviceContextRef.current),
                }
              : m,
          ),
        );
      },
    });

    setBusy(false);
  };

  const panelBody = (
    <div
      className="flex h-full min-h-0 flex-col"
      data-chat-panel
      data-lenis-prevent>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/15 px-4 py-3.5">
        <div className="relative">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#3853F0] via-[#9b73d4] to-[#BD0B91] text-white shadow-lg">
            <Icon name="bot" size={21} />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Asistente ELBEDI</p>
          <p className="text-[11px] text-emerald-300">
            En línea · navega el sitio por ti
          </p>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Cerrar asistente"
          onClick={() => dispatchIntent({ type: "chat", open: false })}
          className="grid h-8 w-8 place-items-center rounded-lg border border-white/20 bg-white/5 text-white/80 hover:bg-white/15">
          <Icon name="close" size={15} />
        </motion.button>
      </div>

      {/* Mensajes */}
      <div
        ref={scrollRef}
        data-cine-scroller-exempt
        className="cine-chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <Bubble
              key={message.id}
              message={message}
              onChip={send}
              onWhatsApp={openWhatsApp}
              compacting={compacting}
            />
          ))}
          {busy && !messages.some((m) => m.streaming) && <Typing key="typing" />}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form
        className="border-t border-white/15 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}>
        <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm transition-colors focus-within:border-[#FF9ECF]/60">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame lo que quieras…"
            aria-label="Mensaje para el asistente"
            className="h-9 flex-1 bg-transparent text-[13px] text-white placeholder-white/40 outline-none"
          />
          <motion.button
            type="submit"
            disabled={busy || !input.trim()}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Enviar mensaje"
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#FF9ECF] to-[#ffdc5b] text-slate-900 shadow-md disabled:opacity-40">
            <Icon name="send" size={16} />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/45">
          Agente de IA de ELBEDI · puede llevarte a cualquier sección
        </p>
      </form>
    </div>
  );

  return (
    <>
      {/* Desktop: columna lateral integrada al layout */}
      <AnimatePresence>
        {chatOpen && (
          <motion.aside
            key="chat-desktop"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="sticky top-0 z-50 hidden h-svh shrink-0 overflow-hidden xl:block">
            <div className="h-full w-[380px] border-l border-white/15 bg-slate-950/45 backdrop-blur-2xl">
              {panelBody}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Móvil / tablet: sheet flotante */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            key="chat-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end bg-slate-950/40 p-3 backdrop-blur-sm xl:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget)
                dispatchIntent({ type: "chat", open: false });
            }}>
            <motion.div
              initial={{ y: "100%", opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "110%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="h-[82svh] w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-slate-950/80 shadow-2xl backdrop-blur-2xl">
              {panelBody}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante cuando el chat está cerrado */}
      <AnimatePresence>
        {chatOpen === false && (
          <motion.button
            key="chat-fab"
            type="button"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => dispatchIntent({ type: "chat", open: true })}
            aria-label="Abrir asistente de IA"
            className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-2xl border-2 border-white/80 bg-gradient-to-br from-[#7f9dff] via-[#b98af0] to-[#ff9ed9] text-white shadow-[0_12px_36px_-8px_rgba(185,138,240,0.95)] md:bottom-6 md:right-6">
            <Icon name="bot" size={26} />
            <motion.span
              className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-400"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
