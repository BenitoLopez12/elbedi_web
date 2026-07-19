// Grafo vivo de un sistema multi-agente: orquestador + especialistas,
// con pulsos de datos viajando por las conexiones.

import Icon from "@/experience/ui/icons.jsx";

const NODES = [
  { x: 50, y: 18, label: "Orquestador", icon: "network", main: true },
  { x: 15, y: 55, label: "Ventas", icon: "spark" },
  { x: 40, y: 78, label: "Soporte", icon: "chat" },
  { x: 66, y: 62, label: "Operaciones", icon: "route" },
  { x: 87, y: 34, label: "Finanzas", icon: "chart" },
];

export default function MockAgentsGraph() {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br from-[#170b2e] via-[#31114d] to-[#12082b]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full">
        {NODES.slice(1).map((node, i) => (
          <g key={i}>
            <line
              x1={NODES[0].x}
              y1={NODES[0].y}
              x2={node.x}
              y2={node.y}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.35"
              strokeDasharray="1.4 1.2"
            />
            <circle r="0.9" fill="#78CEFF">
              <animateMotion
                dur={`${2.4 + i * 0.7}s`}
                repeatCount="indefinite"
                path={`M ${NODES[0].x} ${NODES[0].y} L ${node.x} ${node.y}`}
              />
            </circle>
          </g>
        ))}
      </svg>
      {NODES.map((node, i) => (
        <div
          key={node.label}
          data-cine="pop"
          data-cine-order={5 + i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-center shadow-xl backdrop-blur-md ${
            node.main
              ? "border-white/40 bg-gradient-to-br from-[#3853F0]/80 to-[#BD0B91]/80"
              : "border-white/25 bg-white/10"
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-white/15 text-white">
            <Icon name={node.icon} size={15} />
          </div>
          <p className="text-[10px] font-semibold tracking-wide text-white">
            {node.label}
          </p>
          <p className="text-[8px] text-emerald-300">● activo</p>
        </div>
      ))}
      <div className="absolute bottom-3 left-4 rounded-lg border border-white/20 bg-slate-950/60 px-3 py-1.5 text-[9px] text-white/70 backdrop-blur-sm">
        128 tareas hoy · 0 incidentes · escalamiento humano: 3
      </div>
    </div>
  );
}
