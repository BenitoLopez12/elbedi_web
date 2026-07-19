// Cerebro local determinista del asistente.
// Es el fallback cuando el backend de IA no está disponible: cubre la
// intención principal del agente (guiar, navegar y convertir) con reglas
// — el patrón más determinista que resuelve el problema sigue funcionando
// aunque el LLM se apague (degradación elegante).

const COMBINING_MARKS = new RegExp(
  "[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]",
  "g",
);

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "");
}

const RULES = [
  {
    match:
      /(servicios|que ofrecen|que hacen|catalogo|recomiend|por donde empiezo|para empezar|opciones tienen)/,
    reply:
      "Ofrecemos 4 servicios: 1) sitios web cinematográficos e inteligentes, 2) agentes de IA para WhatsApp, 3) sistemas agénticos para empresas y 4) analíticas web con IA. La mayoría empieza por su sitio web — te llevo a verlo 👇 ¿Cuál va más con tu negocio?",
    intents: [{ type: "navigate", section: "websites" }],
  },
  {
    match:
      /(precio|costo|cuanto (cuesta|vale|cobran)|cotiza|inversion|presupuesto|planes)/,
    reply:
      "Cada proyecto se cotiza a la medida según su alcance — por eso no manejamos precios genéricos. Cuéntame qué necesitas (sitio web, WhatsApp con IA, agentes o analíticas) y te llevo a esa sección; o cotiza directo con el equipo usando el botón de WhatsApp aquí abajo 👇",
    intents: [{ type: "navigate", section: "contacto" }],
  },
  {
    match: /(whats?app|chatbot|bot de mensajes|responder mensajes|prospectos)/,
    reply:
      "Nuestro panel conecta el WhatsApp de tu empresa con agentes de IA que responden 24/7, convierten prospectos en clientes y administran todo el sistema. Te muestro cómo funciona 👇",
    intents: [{ type: "navigate", section: "whatsapp-ia" }],
  },
  {
    match:
      /(sitio|pagina|web(?!.*trafico)|landing|tienda en linea|ecommerce|diseno)/,
    reply:
      "Creamos sitios web cinematográficos: diseño disruptivo, animaciones de alto nivel y experiencias que convierten. Aquí está el servicio 👇 y abajo puedes abrir la demo en vivo.",
    intents: [{ type: "navigate", section: "websites" }],
  },
  {
    match:
      /(analitica|dashboard|trafico|metrica|estadistica|visitas|reportes)/,
    reply:
      "Tenemos un dashboard de analíticas para cualquier sitio web con un analista de IA integrado: le preguntas qué pasó con tu tráfico y te lo explica en lenguaje claro. Míralo aquí 👇",
    intents: [{ type: "navigate", section: "analiticas" }],
  },
  {
    match:
      /(agente|automatizar|sistema agentico|multiagente|ia (en|para) mi empresa|operaciones)/,
    reply:
      "Implementamos agentes de IA expertos para empresas: desde un agente para una tarea concreta hasta sistemas multi-agente que operan áreas completas, con límites y auditoría. Te llevo a verlo 👇",
    intents: [{ type: "navigate", section: "agentes" }],
  },
  {
    match: /(proceso|como trabajan|cuanto tarda|tiempo|semanas|entrega|metodologia)/,
    reply:
      "Trabajamos en 4 fases: descubrimiento, dirección y diseño, construcción con evaluación, y lanzamiento con operación continua. Un sitio típico toma de 3 a 6 semanas. Aquí el detalle 👇",
    intents: [{ type: "navigate", section: "proceso" }],
  },
  {
    match: /(contacto|correo|email|telefono|llamar|hablar con|asesoria|cita)/,
    reply:
      "¡Claro! Puedes escribirnos por WhatsApp (respuesta el mismo día) con el botón de aquí abajo, o por correo. Te dejo en la sección de contacto 👇",
    intents: [{ type: "navigate", section: "contacto" }],
  },
  {
    match: /(humano|persona real|asesor|alguien del equipo)/,
    reply:
      "Por supuesto — el equipo humano de ELBEDI te atiende directo por WhatsApp. Usa el botón «Continuar en WhatsApp» aquí abajo: tu conversación viaja contigo para que no tengas que repetir nada 👇",
  },
  {
    match: /(pregunta|duda|faq|garantia|seguro|confiable)/,
    reply:
      "Buenísima pregunta — la sección de preguntas frecuentes responde las dudas más comunes sobre nuestros servicios, tiempos y cómo cuidamos que la IA responda bien. Te llevo 👇",
    intents: [{ type: "navigate", section: "faq" }],
  },
  {
    match: /(quienes son|acerca|sobre ustedes|el estudio|equipo|elbedi|manifiesto)/,
    reply:
      "ELBEDI es un estudio mexicano de desarrollo enfocado en herramientas de IA: unimos dirección de arte cinematográfica con ingeniería de inteligencia artificial de producción. Conócenos 👇",
    intents: [{ type: "navigate", section: "estudio" }],
  },
  {
    match: /(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)/,
    reply:
      "¡Hola! 👋 Soy el asistente de ELBEDI. Puedo mostrarte nuestros servicios navegando el sitio por ti, resolver tus dudas o conectarte con el equipo. ¿Qué te interesa: sitios web, WhatsApp con IA, agentes para tu empresa o analíticas?",
  },
];

// Varios fallbacks rotados: aunque el visitante haga dos preguntas seguidas
// que ninguna regla reconozca, nunca recibe dos veces el mismo texto.
const FALLBACKS = [
  "No estoy seguro de haber entendido bien 🤔 Puedo ayudarte con sitios web cinematográficos, agentes de IA para WhatsApp, sistemas agénticos para empresas y analíticas con IA. ¿Cuál de esos temas se acerca a lo que buscas?",
  "Esa me la reservo para el equipo humano 😄 — por WhatsApp te la responden directo (botón aquí abajo 👇). Mientras, ¿te muestro alguno de nuestros servicios: sitios web, WhatsApp con IA, agentes o analíticas?",
  "Cuéntame un poco más de tu negocio o de lo que necesitas y te llevo a la sección indicada. Y para cualquier duda puntual, el equipo te atiende directo por WhatsApp con el botón de abajo 👇",
];

let fallbackCursor = 0;

/** Devuelve { reply, intents[], suggest[] } para el último mensaje del usuario. */
export function localBrainRespond(userText) {
  const text = normalize(userText);
  const rule = RULES.find((r) => r.match.test(text));
  const chosen =
    rule || { reply: FALLBACKS[fallbackCursor++ % FALLBACKS.length] };
  return {
    reply: chosen.reply,
    intents: chosen.intents || [],
    suggest: chosen.suggest || [],
  };
}
