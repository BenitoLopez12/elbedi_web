// Marcos de dispositivo para las "capturas" de producto.
// Los mockups internos son componentes vivos (SVG/CSS), no imágenes:
// se reemplazarán por capturas reales cuando existan.

export function BrowserFrame({ children, url = "elbedi.com", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/25 bg-slate-950/70 shadow-2xl backdrop-blur-md ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 rounded-md bg-white/10 px-3 py-1 text-[11px] tracking-wide text-white/60">
          {url}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.2rem] border-[6px] border-slate-950/90 bg-slate-950 shadow-2xl ${className}`}>
      <div className="absolute left-1/2 top-1.5 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-slate-950" />
      {children}
    </div>
  );
}

export function PanelFrame({ children, title = "Panel", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/25 bg-slate-950/75 shadow-2xl backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {title}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          En vivo
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
