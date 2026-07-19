// Dashboard de analíticas con asistente IA integrado (mockup vivo).

import Icon from "@/experience/ui/icons.jsx";

const BARS = [34, 52, 41, 66, 58, 79, 72, 90, 84, 96, 88, 100];

export default function MockDashboard() {
  return (
    <div className="grid aspect-[16/10] w-full grid-cols-[1fr_38%] gap-3 bg-gradient-to-br from-[#0c1230] via-[#1a1748] to-[#0a0f2b] p-4">
      {/* Columna de métricas */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Visitas", "12.4k", "+18%"],
            ["Conversión", "4.7%", "+0.9"],
            ["Leads", "312", "+27%"],
          ].map(([label, value, delta], i) => (
            <div
              key={label}
              data-cine="pop"
              data-cine-order={4 + i}
              className="rounded-xl border border-white/15 bg-white/5 p-2.5">
              <p className="text-[9px] uppercase tracking-wide text-white/55">
                {label}
              </p>
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="text-[9px] font-semibold text-emerald-300">
                {delta} ↑
              </p>
            </div>
          ))}
        </div>
        <div
          data-cine="panel"
          data-cine-order={7}
          className="flex flex-1 flex-col rounded-xl border border-white/15 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
              Tráfico · últimos 12 días
            </p>
            <span className="text-[9px] text-white/50">tiempo real</span>
          </div>
          <div className="flex flex-1 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#3853F0] via-[#9b73d4] to-[#FF9ECF]"
                style={{ height: `${h}%`, opacity: 0.55 + (h / 100) * 0.45 }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Asistente IA del panel */}
      <div
        data-cine="panel"
        data-cine-order={8}
        className="flex flex-col rounded-xl border border-white/20 bg-slate-950/60 p-3">
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <div className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-[#78CEFF] to-[#BD0B91] text-white">
            <Icon name="bot" size={13} />
          </div>
          <p className="text-[10px] font-semibold text-white">
            Analista IA
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 text-[9.5px] leading-snug">
          <div className="self-end rounded-lg rounded-tr-sm bg-[#3853F0]/60 px-2 py-1.5 text-white">
            ¿Por qué subieron las visitas el jueves?
          </div>
          <div className="self-start rounded-lg rounded-tl-sm bg-white/10 px-2 py-1.5 text-white/90">
            Tu campaña de Instagram generó 2.1k visitas nuevas (+64%). La
            página de planes convirtió al 6.2%. Te sugiero duplicar ese
            anuncio 📈
          </div>
          <div className="self-start rounded-lg bg-white/5 px-2 py-1.5 text-white/60">
            Reporte semanal listo · enviado a tu correo ✓
          </div>
        </div>
        <div className="mt-2 h-6 rounded-full bg-white/10 px-2 text-[9px] leading-6 text-white/40">
          Pregunta lo que quieras…
        </div>
      </div>
    </div>
  );
}
