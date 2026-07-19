// Estructura editorial compartida por las secciones: kicker + título con
// acento de marca + descripción, ya marcados para la coreografía.

export function Kicker({ children }) {
  return (
    <p
      data-cine="rise"
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#ffdc5b]" />
      {children}
    </p>
  );
}

export function Title({ children, as: Tag = "h2", className = "" }) {
  return (
    <Tag
      data-cine="mask"
      className={`text-balance text-4xl leading-[1.05] tracking-tight md:text-5xl 2xl:text-6xl ${className}`}>
      {children}
    </Tag>
  );
}

export function Lead({ children, className = "" }) {
  return (
    <p
      data-cine="rise"
      className={`mt-5 max-w-xl text-base leading-relaxed text-white/90 2xl:text-lg ${className}`}>
      {children}
    </p>
  );
}

export function GlassCard({ children, className = "", order }) {
  return (
    <div
      data-cine="pop"
      data-cine-order={order}
      className={`rounded-2xl border border-white/25 bg-white/10 p-5 shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-white/15 ${className}`}>
      {children}
    </div>
  );
}

// Dos versiones de degradado de marca en tonos MUY claros (casi blancos)
// para que el texto nunca se pierda contra el fondo: la fría viaja
// azul claro→violeta claro→rosa claro; la cálida rosa claro→coral
// claro→amarillo claro. Sin zonas grises en la transición.
const ACCENT_GRADIENTS = {
  cool: "from-[#cdeaff] via-[#e3d3ff] to-[#ffd9ec]",
  warm: "from-[#ffd9ec] via-[#ffe3c9] to-[#fff3b8]",
};

export function Accent({ children, variant = "warm" }) {
  return (
    <span
      className={`bg-gradient-to-r ${ACCENT_GRADIENTS[variant] ?? ACCENT_GRADIENTS.warm} bg-clip-text text-transparent`}>
      {children}
    </span>
  );
}
