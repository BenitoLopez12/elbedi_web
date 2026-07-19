// Cliente del agente: intenta el backend LLM (streaming SSE) y degrada al
// cerebro local determinista si no está disponible. El contrato de eventos
// es el mismo en ambos caminos:
//   { type: "text", text }        — delta de texto del asistente
//   { type: "intent", intent }    — intent validado contra el bus (navigate…)
//   { type: "suggest", suggest }  — acción sugerida (whatsapp/link/chip)
//   { type: "done" }              — fin del turno

import { localBrainRespond } from "@/experience/chat/localBrain.js";
import { dispatchIntent } from "@/experience/state/experienceStore.js";

const ENDPOINT =
  import.meta.env.PUBLIC_AI_CHAT_ENDPOINT || "/api/ai/chat";
const REQUEST_TIMEOUT_MS = 30000;

async function streamFromBackend(messages, handlers) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-12) }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error(`Backend IA no disponible (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let receivedAny = false;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        const line = chunk.split("\n").find((l) => l.startsWith("data: "));
        if (!line) continue;
        let event;
        try {
          event = JSON.parse(line.slice(6));
        } catch {
          continue;
        }
        receivedAny = true;
        routeEvent(event, handlers);
      }
    }

    if (!receivedAny) throw new Error("Respuesta vacía del backend IA");
    handlers.onDone?.();
    return true;
  } finally {
    clearTimeout(timeout);
  }
}

function routeEvent(event, handlers) {
  switch (event.type) {
    case "text":
      if (typeof event.text === "string") handlers.onText?.(event.text);
      break;
    case "intent":
      // El agente propone, el bus valida (allowlist de secciones).
      if (dispatchIntent(event.intent)) handlers.onIntent?.(event.intent);
      break;
    case "suggest":
      if (event.suggest?.label) handlers.onSuggest?.(event.suggest);
      break;
    default:
      break;
  }
}

function typewriter(text, onText, onDone) {
  // Streaming simulado para que el fallback conserve la sensación viva.
  const words = text.split(" ");
  let index = 0;
  const tick = () => {
    if (index >= words.length) {
      onDone?.();
      return;
    }
    onText?.((index === 0 ? "" : " ") + words[index]);
    index += 1;
    setTimeout(tick, 18 + Math.random() * 30);
  };
  setTimeout(tick, 260);
}

/**
 * Ejecuta un turno del agente. `messages` = [{role:"user"|"assistant", content}]
 * Devuelve una promesa que resuelve cuando el turno terminó.
 */
export async function runAgentTurn(messages, handlers) {
  try {
    await streamFromBackend(messages, handlers);
    return { source: "llm" };
  } catch {
    // Degradación elegante: cerebro local, mismo contrato de eventos.
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const { reply, intents, suggest } = localBrainRespond(lastUser?.content);

    await new Promise((resolve) => {
      typewriter(reply, handlers.onText, () => {
        intents.forEach((intent) => {
          if (dispatchIntent(intent)) handlers.onIntent?.(intent);
        });
        suggest.forEach((s) => handlers.onSuggest?.(s));
        handlers.onDone?.();
        resolve();
      });
    });
    return { source: "local" };
  }
}
