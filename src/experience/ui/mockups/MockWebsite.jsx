// Mockup vivo de un sitio cinematográfico (placeholder de captura real).

export default function MockWebsite() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1b1040] via-[#33125c] to-[#6d1257]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, rgba(255,158,207,0.5), transparent 45%), radial-gradient(circle at 20% 80%, rgba(120,206,255,0.4), transparent 40%)",
        }}
      />
      {/* Header del sitio ficticio */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4">
        <div className="h-3 w-16 rounded-full bg-white/80" />
        <div className="flex gap-3">
          <div className="h-2 w-10 rounded-full bg-white/40" />
          <div className="h-2 w-10 rounded-full bg-white/40" />
          <div className="h-2 w-10 rounded-full bg-white/40" />
          <div className="h-2 w-14 rounded-full bg-white/80" />
        </div>
      </div>
      {/* Hero del sitio ficticio */}
      <div className="absolute left-6 top-[28%] max-w-[52%]">
        <div className="mb-3 h-2 w-24 rounded-full bg-[#ffdc5b]/90" />
        <div className="mb-2 h-5 w-full rounded-md bg-white/90" />
        <div className="mb-2 h-5 w-4/5 rounded-md bg-white/90" />
        <div className="mb-4 h-2.5 w-3/5 rounded-full bg-white/50" />
        <div className="flex gap-2">
          <div className="h-7 w-24 rounded-lg bg-gradient-to-r from-[#FF9ECF] to-[#ffdc5b]" />
          <div className="h-7 w-20 rounded-lg border border-white/50 bg-white/10" />
        </div>
      </div>
      {/* Elemento 3D flotante */}
      <div className="absolute right-[8%] top-[30%] h-32 w-32 animate-[float_14s_linear_infinite] rounded-3xl bg-gradient-to-br from-[#78CEFF] via-[#9b73d4] to-[#BD0B91] shadow-2xl"
        style={{ transform: "rotate(12deg)" }}
      />
      <div className="absolute right-[24%] top-[58%] h-14 w-14 animate-[float_18s_linear_infinite] rounded-2xl bg-gradient-to-br from-[#FF9ECF] to-[#ffdc5b] opacity-90 shadow-xl" />
      {/* Barra de progreso de scroll */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#78CEFF] to-[#FF9ECF]" />
        </div>
        <div className="h-2 w-12 rounded-full bg-white/40" />
      </div>
    </div>
  );
}
