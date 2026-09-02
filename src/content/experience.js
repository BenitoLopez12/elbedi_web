// Contenido y metadatos de la experiencia cinematográfica (index).
// Todo el copy es de EJEMPLO y se irá refinando; la estructura es la definitiva.

export const SECTIONS = [
  {
    id: "inicio",
    name: "Inicio",
    icon: "home",
    kicker: "ELBEDI · Estudio de desarrollo e inteligencia artificial",
    backdrop: {
      center: "#9b73d4",
      corners: ["#3853F0", "#FF9ECF", "#78CEFF", "#BD0B91"],
      mirrorX: true,
      spaceColor: "#080f24",
      exposure: {
        left: 0.76,
        center: 0.32,
        right: 0.22,
        glow: 0.28,
      },
      glow: "rgba(255,255,255,0.22)",
    },
  },
  {
    id: "websites",
    name: "Websites",
    icon: "monitor",
    kicker: "Servicio 01 · Experiencias web",
    backdrop: {
      center: "#c2566b",
      corners: ["#ff4a8c", "#ffdc5b", "#ad0082", "#ffa442"],
      glow: "rgba(255,255,255,0.20)",
    },
  },
  {
    id: "whatsapp-ia",
    name: "WhatsApp IA",
    icon: "whatsapp",
    kicker: "Servicio 02 · Agentes de IA para WhatsApp",
    backdrop: {
      center: "#3f79c9",
      corners: ["#2a9bbd", "#add3ff", "#002aa6", "#293eb3"],
      glow: "rgba(255,255,255,0.16)",
    },
  },
  {
    id: "agentes",
    name: "Agentes IA",
    icon: "network",
    kicker: "Servicio 03 · Sistemas agénticos",
    backdrop: {
      center: "#7a3986",
      corners: ["#75459e", "#da63c5", "#472359", "#4e1559"],
      glow: "rgba(255,255,255,0.14)",
    },
  },
  {
    id: "analiticas",
    name: "Analíticas",
    icon: "chart",
    kicker: "Servicio 04 · Analíticas con IA",
    backdrop: {
      center: "#49387c",
      corners: ["#2e95d1", "#420032", "#000d57", "#bd3893"],
      glow: "rgba(255,255,255,0.14)",
    },
  },
  {
    id: "proceso",
    name: "Proceso",
    icon: "route",
    kicker: "Cómo trabajamos",
    backdrop: {
      center: "#454d95",
      corners: ["#66f5ff", "#6d38bd", "#0e1645", "#321b54"],
      glow: "rgba(255,255,255,0.14)",
    },
  },
  {
    id: "estudio",
    name: "El estudio",
    icon: "spark",
    kicker: "Manifiesto ELBEDI",
    backdrop: {
      center: "#805fb1",
      corners: ["#2a3ca3", "#fe79bd", "#57c0fe", "#800060"],
      glow: "rgba(255,255,255,0.16)",
    },
  },
  {
    id: "faq",
    name: "FAQ",
    icon: "question",
    kicker: "Preguntas frecuentes",
    backdrop: {
      center: "#4a3670",
      corners: ["#33418f", "#9b73d4", "#251a4d", "#6d2a7a"],
      glow: "rgba(255,255,255,0.12)",
    },
  },
  {
    id: "contacto",
    name: "Contacto",
    icon: "mail",
    kicker: "Hablemos de tu proyecto",
    backdrop: {
      center: "#8a5fb8",
      corners: ["#3853F0", "#FF9ECF", "#78CEFF", "#BD0B91"],
      glow: "rgba(255,255,255,0.24)",
    },
  },
  {
    id: "footer",
    name: "Footer",
    icon: "layers",
    kicker: "ELBEDI",
    backdrop: {
      center: "#9b73d4",
      corners: ["#3853F0", "#FF9ECF", "#78CEFF", "#BD0B91"],
      exposure: 0.86,
      glow: "rgba(255,255,255,0.22)",
    },
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

// Demos en vivo por servicio. Las páginas demo las integrará el equipo:
// SOLO hay que actualizar estas URLs cuando existan (un único lugar).
// El chat muestra el botón de demo del servicio en contexto automáticamente.
export const SERVICE_DEMOS = {
  websites: { label: "🎬 Ver demo: Página web IA", url: "/demos/websites" },
  "whatsapp-ia": { label: "🎬 Ver demo: WhatsApp IA", url: "/demos/whatsapp-ia" },
  agentes: { label: "🎬 Ver demo: Agentes IA", url: "/demos/agentes" },
  analiticas: { label: "🎬 Ver demo: Analíticas", url: "/demos/analiticas" },
};

export const HERO = {
  title: ["Integramos inteligencia artificial", "en los procesos", "que mueven tu empresa."],
  highlight: "inteligencia artificial",
  description:
    "ELBEDI es un estudio de implementación de inteligencia artificial: diseñamos agentes, sistemas agénticos e integraciones que conectan datos, herramientas y equipos con la operación real de cada empresa.",
  ctaPrimary: "Explorar los servicios",
  ctaSecondary: "Hablar con el equipo",
  chips: ["Agentes 24/7", "Sistemas agénticos", "IA en producción", "México · LATAM"],
};

export const WEBSITES = {
  title: "Sitios web que se sienten como una película.",
  description:
    "Diseño disruptivo, animaciones cinematográficas y una experiencia de usuario de última generación. Cada scroll cuenta una historia; cada interacción está dirigida.",
  bullets: [
    {
      title: "Dirección de arte y storytelling",
      text: "Cada sección es un capítulo: guion, cámara y ritmo pensados para generar el efecto wow.",
    },
    {
      title: "Animaciones y 3D de alto nivel",
      text: "Coreografías scroll-driven, microinteracciones y profundidad 3D con rendimiento impecable.",
    },
    {
      title: "Rendimiento, SEO y conversión",
      text: "Belleza medible: Core Web Vitals en verde, SEO técnico y flujos diseñados para vender.",
    },
  ],
  ctaPrimary: { label: "Ver ELBEDI Websites", href: "/websites" },
  ctaWhatsapp: "Hola, quiero un sitio web cinematográfico para mi negocio.",
};

export const WHATSAPP_IA = {
  title: "Tu WhatsApp, atendido por agentes de IA 24/7.",
  description:
    "Un panel profesional que conecta el WhatsApp de tu empresa con un sistema de agentes de inteligencia artificial cargado con todo el contexto de tu negocio.",
  agents: [
    {
      name: "Agente vendedor",
      role: "Convierte prospectos en clientes",
      text: "Detecta la intención de compra, resuelve objeciones y cierra la conversación con el siguiente paso.",
    },
    {
      name: "Agente de atención",
      role: "Responde todo, a toda hora",
      text: "Contesta cada mensaje 24/7 con la información y los servicios reales de tu empresa.",
    },
    {
      name: "Agente administrador",
      role: "Orquesta el sistema completo",
      text: "Supervisa a los demás agentes, escala a humanos cuando hace falta y reporta la operación.",
    },
  ],
  ctaWhatsapp: "Hola, me interesa el panel de agentes de IA para WhatsApp.",
  conversation: [
    { from: "user", text: "Hola, ¿tienen servicio a domicilio?" },
    { from: "ai", text: "¡Hola! Sí 🙌 Llevamos pedidos a toda la ciudad en menos de 40 min. ¿Te comparto el menú?" },
    { from: "user", text: "Sí, y ¿aceptan tarjeta?" },
    { from: "ai", text: "Aceptamos tarjeta, transferencia y efectivo. Aquí está el menú 📎 ¿Qué se te antoja hoy?" },
    { from: "user", text: "Quiero 2 pizzas grandes" },
    { from: "ai", text: "¡Excelente elección! Son $358. ¿Confirmo tu pedido con envío a tu dirección guardada?" },
  ],
};

export const AGENTES = {
  title: "Agentes de IA expertos, integrados a tu operación.",
  description:
    "Desde un agente dedicado a una tarea concreta hasta sistemas multi-agente robustos que operan áreas completas de tu empresa — con límites, auditoría y evaluación continua.",
  bullets: [
    {
      title: "Agentes a la medida",
      text: "Ventas, soporte, operaciones, finanzas: cada agente domina su área con el contexto de tu empresa.",
    },
    {
      title: "Sistemas multi-agente",
      text: "Orquestadores, especialistas y revisores trabajando en conjunto con presupuestos y control humano.",
    },
    {
      title: "Integración total",
      text: "Conectados a tus sistemas, bases de datos y flujos reales — la IA opera tu plataforma, no un demo.",
    },
  ],
  ctaWhatsapp: "Hola, quiero implementar agentes de IA en mi empresa.",
};

export const ANALITICAS = {
  title: "Tu tráfico web, explicado por un analista de IA.",
  description:
    "Un dashboard de analíticas para cualquier sitio web con un asistente de inteligencia artificial dentro del panel: pregúntale qué pasó, por qué pasó y qué hacer al respecto.",
  bullets: [
    {
      title: "Métricas en tiempo real",
      text: "Visitas, fuentes, conversiones y comportamiento en paneles claros y accionables.",
    },
    {
      title: "Un analista que responde",
      text: "“¿Por qué cayeron las visitas el martes?” — el asistente investiga y te lo explica en lenguaje claro.",
    },
    {
      title: "Reportes automáticos",
      text: "Resúmenes semanales con hallazgos y recomendaciones directo a tu correo o WhatsApp.",
    },
  ],
  ctaWhatsapp: "Hola, me interesa el dashboard de analíticas con IA.",
};

export const PROCESO = {
  title: "Un proceso de implementación, no una caja negra.",
  description:
    "Cada implementación parte de un proceso real: diagnosticamos el reto, diseñamos la arquitectura, evaluamos el comportamiento y desplegamos con observabilidad, límites y control humano.",
  steps: [
    {
      num: "01",
      title: "Descubrimiento",
      text: "Entendemos tu negocio, tus clientes y tu operación. Definimos el criterio de éxito medible.",
    },
    {
      num: "02",
      title: "Arquitectura y guardrails",
      text: "Definimos datos, herramientas, permisos, límites y puntos de supervisión antes de conectar la IA.",
    },
    {
      num: "03",
      title: "Construcción y evaluación",
      text: "Construimos las integraciones y evaluamos agentes contra casos reales, errores esperables y criterios de calidad.",
    },
    {
      num: "04",
      title: "Lanzamiento y operación",
      text: "Desplegamos, observamos y mejoramos en continuo. Tu equipo conserva visibilidad, control y trazabilidad.",
    },
  ],
};

export const ESTUDIO = {
  title: "Tu nuevo sistema de operación inteligente.",
  description:
    "Somos un estudio mexicano especializado en llevar inteligencia artificial a producción. Convertimos procesos empresariales en sistemas confiables, conectados con tus datos y herramientas, con evaluación, auditoría y control humano.",
  principles: [
    {
      title: "IA conectada a la operación",
      text: "Los agentes trabajan con tus sistemas, datos y reglas; no viven aislados en una demostración.",
    },
    {
      title: "Resultados que se miden",
      text: "Definimos métricas, evaluaciones y observabilidad para saber qué funciona y qué debe mejorar.",
    },
    {
      title: "IA con límites y auditoría",
      text: "Agentes con presupuestos, guardrails y control humano. Confianza que se gana, no que se asume.",
    },
    {
      title: "Socios de implementación",
      text: "Operamos y mejoramos contigo después del lanzamiento. La adopción y el impacto también son parte del proyecto.",
    },
  ],
};

export const FAQS = [
  {
    q: "¿Qué hace diferente a un sitio de ELBEDI?",
    a: "No entregamos plantillas: dirigimos una experiencia. Storytelling, animaciones cinematográficas y una experiencia de usuario diseñada para convertir, con rendimiento y SEO técnico de primer nivel.",
  },
  {
    q: "¿Cómo funciona el agente de IA para WhatsApp?",
    a: "Conectamos el WhatsApp de tu empresa a un panel con agentes de IA cargados con tu contexto: servicios, precios, horarios y tono. Responden 24/7, convierten prospectos y escalan a un humano cuando corresponde.",
  },
  {
    q: "¿La IA puede responder cosas incorrectas?",
    a: "Diseñamos cada agente con límites: solo habla de tu negocio, se apoya en tu información verificada y, ante la duda, deriva a tu equipo. Además evaluamos su comportamiento con casos reales antes y después del lanzamiento.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Una página web se entrega en 3 días hábiles. Los agentes de inteligencia artificial y los sistemas agénticos suelen requerir de una a dos semanas hábiles, según las integraciones, los datos y el nivel de control necesario. Siempre trabajamos por fases con entregas visibles.",
  },
  {
    q: "¿Necesito cambiar mis sistemas actuales?",
    a: "No. Integramos la IA con lo que ya usas: tu WhatsApp, tu sitio, tus hojas de cálculo o tu CRM. La plataforma sigue siendo 100% operable a mano si decides pausar la IA.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Operamos contigo: monitoreo, mejoras continuas, nuevos casos para los agentes y reportes claros. Un producto digital vivo, no un entregable congelado.",
  },
  {
    q: "¿Trabajan fuera de México?",
    a: "Sí. Nuestro estudio está en México y trabajamos con clientes de toda Latinoamérica y Estados Unidos de forma remota.",
  },
];

export const CONTACTO = {
  title: "Construyamos algo que trabaje por ti.",
  description:
    "Cuéntanos tu idea y te respondemos el mismo día con un plan claro: alcance, tiempos y siguiente paso.",
  whatsappMessage: "Hola ELBEDI, quiero platicar sobre un proyecto.",
  email: "contact@elbedi.com",
};
