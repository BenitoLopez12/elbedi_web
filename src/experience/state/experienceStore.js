// Store framework-agnóstico de la experiencia: una sola fuente de verdad
// para la sección activa, el estado de transición y el chat.
// El agente de IA y la UI navegan a través del mismo bus de intents.

import { SECTION_IDS } from "@/content/experience.js";

const state = {
  active: 0,
  previous: -1,
  direction: 1,
  transitioning: false,
  chatOpen: null, // null = decide por viewport en el cliente
  reducedMotion: false,
};

const listeners = new Set();

export const experienceStore = {
  get: () => state,
  set(partial) {
    Object.assign(state, partial);
    listeners.forEach((listener) => listener(state));
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// ---------------------------------------------------------------------------
// Bus de intents (navigate | chat | whatsapp). Validación central: el agente
// de IA propone, este módulo dispone. Solo secciones en allowlist.
// ---------------------------------------------------------------------------

let navigator = null;

export function bindNavigator(fn) {
  navigator = fn;
  return () => {
    if (navigator === fn) navigator = null;
  };
}

export function resolveSectionIndex(target) {
  if (typeof target === "number") {
    return target >= 0 && target < SECTION_IDS.length ? target : -1;
  }
  return SECTION_IDS.indexOf(String(target || "").toLowerCase().trim());
}

/**
 * Ejecuta un intent contra la experiencia. Devuelve true si fue válido.
 * { type: "navigate", section } — allowlist de SECTION_IDS
 * { type: "chat", open }       — abre/cierra el panel del agente
 */
export function dispatchIntent(intent) {
  if (!intent || typeof intent !== "object") return false;

  if (intent.type === "navigate") {
    const index = resolveSectionIndex(intent.section);
    if (index === -1 || !navigator) return false;
    navigator(index, intent.source || "intent");
    return true;
  }

  if (intent.type === "chat") {
    experienceStore.set({ chatOpen: Boolean(intent.open) });
    return true;
  }

  return false;
}
