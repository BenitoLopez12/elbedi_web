// Botón de la experiencia: gradiente de marca o vidrio, con micro-interacción.

import { buildWhatsAppUrl } from "@/lib/whatsapp.js";

export default function ActionButton({
  children,
  variant = "solid",
  href,
  whatsappMessage,
  onClick,
  className = "",
  order,
}) {
  // Dos degradados hermanos: "solid" (cálido: rosa→amarillo) y
  // "cool" (frío: azul→violeta→rosa). Se intercalan por sección.
  const variants = {
    solid:
      "bg-gradient-to-r from-[#FF9ECF] via-[#ff7ab0] to-[#ffdc5b] text-slate-900 shadow-[0_10px_30px_-10px_rgba(255,122,176,0.8)] hover:shadow-[0_14px_40px_-10px_rgba(255,220,91,0.85)] hover:-translate-y-0.5",
    cool: "bg-gradient-to-r from-[#3853F0] via-[#7d55e8] to-[#fe79bd] text-white shadow-[0_10px_30px_-10px_rgba(125,85,232,0.85)] hover:shadow-[0_14px_40px_-10px_rgba(254,121,189,0.85)] hover:-translate-y-0.5",
    glass:
      "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5",
    dark: "bg-slate-950/70 text-white border border-white/20 hover:bg-slate-950/90 hover:-translate-y-0.5",
  };

  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${variants[variant] ?? variants.solid} ${className}`;

  const resolvedHref = whatsappMessage ? buildWhatsAppUrl(whatsappMessage) : href;

  if (resolvedHref) {
    return (
      <a
        data-cine="pop"
        data-cine-order={order}
        href={resolvedHref}
        target={whatsappMessage ? "_blank" : undefined}
        rel={whatsappMessage ? "noreferrer" : undefined}
        className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      data-cine="pop"
      data-cine-order={order}
      type="button"
      onClick={onClick}
      className={classes}>
      {children}
    </button>
  );
}
