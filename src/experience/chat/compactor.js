// Compactado de conversación para "Continuar en WhatsApp".
//
// Economía de tokens (por diseño):
// - El compactado se genera ÚNICAMENTE cuando el usuario hace clic en el
//   botón, nunca por adelantado en cada turno.
// - Conversaciones cortas (1 solo mensaje del usuario) ni siquiera llaman
//   al LLM: una plantilla determinista basta y cuesta cero tokens.
// - Si el backend no responde (sin API key, apagado, timeout), degrada a la
//   misma plantilla determinista: el botón SIEMPRE funciona.
//
// El mensaje resultante lo LEE y ENVÍA el usuario final: debe ser cálido,
// en primera persona y sin ningún juicio sobre la persona.

const COMPACT_ENDPOINT = (
  import.meta.env.PUBLIC_AI_CHAT_ENDPOINT || "/api/ai/chat"
).replace(/\/chat\/?$/, "/compact");

const COMPACT_TIMEOUT_MS = 9000;
const MAX_SUMMARY_CHARS = 600;

const TOPIC_MATCHERS = [
  [/whats?app/i, "los agentes de IA para WhatsApp"],
  [/(analitica|dashboard|trafico|metrica|estadistica)/i, "las analíticas web con IA"],
  [/(agente|automatiz|sistema agentico|multiagente)/i, "los agentes de IA para empresas"],
  [/(pagina|sitio|web|landing|tienda)/i, "una página web"],
  [/(precio|costo|cotiza|presupuesto|inversion)/i, "recibir una cotización"],
];

function deterministicSummary(messages) {
  const userTexts = messages
    .filter((m) => m.role === "user")
    .map((m) => String(m.content || "").trim())
    .filter(Boolean);

  const allText = userTexts.join(" ");
  const topics = [
    ...new Set(
      TOPIC_MATCHERS.filter(([re]) => re.test(allText)).map(([, label]) => label),
    ),
  ].slice(0, 3);

  const interest = topics.length
    ? ` Me interesa conocer más sobre ${topics.join(", ")}.`
    : " Me gustaría conocer más sobre sus servicios.";

  const last = userTexts[userTexts.length - 1];
  const lastNote =
    last && last.length <= 180 && userTexts.length > 1
      ? ` Mi última consulta fue: «${last}»`
      : "";

  return `Hola ELBEDI 👋, vengo de su sitio web y quiero continuar la conversación que inicié con su asistente.${interest}${lastNote}`;
}

/**
 * Devuelve el mensaje prellenado para WhatsApp a partir del historial
 * [{role, content}].
 */
export async function compactConversation(messages) {
  const userTurns = messages.filter((m) => m.role === "user").length;

  // Ahorro: sin LLM cuando no hay conversación real que compactar.
  if (userTurns < 2) return deterministicSummary(messages);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), COMPACT_TIMEOUT_MS);

  try {
    const response = await fetch(COMPACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-16) }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`compact ${response.status}`);
    const data = await response.json();
    const summary = String(data?.summary || "").trim();
    if (!summary) throw new Error("compact vacío");
    return summary.slice(0, MAX_SUMMARY_CHARS);
  } catch {
    return deterministicSummary(messages);
  } finally {
    clearTimeout(timeout);
  }
}
