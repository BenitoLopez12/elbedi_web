// Dashboard de analíticas con asistente IA integrado (mockup vivo).

import Icon from "@/experience/ui/icons.jsx";
import useMockupTimeline from "@/experience/ui/mockups/useMockupTimeline.js";

const BARS = [34, 52, 41, 66, 58, 79, 72, 90, 84, 96, 88, 100];
const METRICS = [
  {
    label: "Visitas",
    start: 8.1,
    target: 12.4,
    decimals: 1,
    suffix: "k",
    delta: "+18%",
  },
  {
    label: "Conversión",
    start: 3.8,
    target: 4.7,
    decimals: 1,
    suffix: "%",
    delta: "+0.9",
  },
  {
    label: "Leads",
    start: 244,
    target: 312,
    decimals: 0,
    suffix: "",
    delta: "+27%",
  },
];

function formatMetric(value, decimals, suffix) {
  return `${Number(value).toFixed(decimals)}${suffix}`;
}

function setupDashboardTimeline({ root, gsap }) {
  const bars = gsap.utils.toArray(root.querySelectorAll("[data-dashboard-bar]"));
  const metrics = gsap.utils.toArray(
    root.querySelectorAll("[data-dashboard-metric]"),
  );
  const messages = gsap.utils.toArray(
    root.querySelectorAll("[data-dashboard-message]"),
  );
  const typing = root.querySelector("[data-dashboard-typing]");
  const dots = gsap.utils.toArray(
    root.querySelectorAll("[data-dashboard-dot]"),
  );
  const live = root.querySelector("[data-dashboard-live]");

  gsap.set(bars, { scaleY: 0.34, transformOrigin: "center bottom" });
  gsap.set(messages, { autoAlpha: 0, y: 12 });
  gsap.set(typing, { autoAlpha: 0, y: 8 });

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.08,
    defaults: { ease: "power2.out" },
  });

  timeline
    .to(
      bars,
      {
        scaleY: 1,
        duration: 1.7,
        stagger: 0.07,
        ease: "power3.out",
      },
      0.15,
    )
    .to(
      live,
      {
        scale: 1.35,
        autoAlpha: 0.5,
        duration: 0.5,
        yoyo: true,
        repeat: 7,
        ease: "sine.inOut",
      },
      0.2,
    );

  metrics.forEach((node, index) => {
    const start = Number(node.dataset.start);
    const target = Number(node.dataset.target);
    const decimals = Number(node.dataset.decimals);
    const suffix = node.dataset.suffix ?? "";
    const counter = { value: start };

    timeline.fromTo(
      counter,
      { value: start },
      {
        value: target,
        duration: 2.8,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = formatMetric(counter.value, decimals, suffix);
        },
      },
      0.3 + index * 0.14,
    );
  });

  timeline
    .to(messages[0], { autoAlpha: 1, y: 0, duration: 0.44 }, 0.12)
    .to(typing, { autoAlpha: 1, y: 0, duration: 0.28 }, 2.0)
    .to(
      dots,
      {
        y: -3,
        duration: 0.2,
        stagger: { each: 0.09, repeat: 3, yoyo: true },
        ease: "sine.inOut",
      },
      2.08,
    )
    .to(typing, { autoAlpha: 0, y: -4, duration: 0.2 }, 3.02)
    .to(messages[1], { autoAlpha: 1, y: 0, duration: 0.52 }, 3.1)
    .to(messages[2], { autoAlpha: 1, y: 0, duration: 0.46 }, 4.12)
    .to(
      bars,
      {
        scaleY: (index) => 0.78 + ((index * 17) % 23) / 100,
        duration: 1.15,
        stagger: 0.045,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
      4.65,
    )
    .to(
      messages,
      {
        autoAlpha: 0,
        y: -8,
        duration: 0.24,
        stagger: 0.025,
        ease: "power2.in",
      },
      7.45,
    );

  return timeline;
}

export default function MockDashboard() {
  const rootRef = useMockupTimeline(setupDashboardTimeline);

  return (
    <div
      ref={rootRef}
      className="grid aspect-[16/10] w-full grid-cols-[1fr_38%] gap-3 bg-gradient-to-br from-[#0c1230] via-[#1a1748] to-[#0a0f2b] p-4">
      {/* Columna de métricas */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/15 bg-white/5 p-2.5">
              <p className="text-[9px] uppercase tracking-wide text-white/55">
                {metric.label}
              </p>
              <p
                data-dashboard-metric
                data-start={metric.start}
                data-target={metric.target}
                data-decimals={metric.decimals}
                data-suffix={metric.suffix}
                className="text-lg font-bold text-white">
                {formatMetric(
                  metric.target,
                  metric.decimals,
                  metric.suffix,
                )}
              </p>
              <p className="text-[9px] font-semibold text-emerald-300">
                {metric.delta} ↑
              </p>
            </div>
          ))}
        </div>
        <div
          className="flex flex-1 flex-col rounded-xl border border-white/15 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
              Tráfico · últimos 12 días
            </p>
            <span className="flex items-center gap-1.5 text-[9px] text-white/50">
              <i
                data-dashboard-live
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              tiempo real
            </span>
          </div>
          <div className="flex flex-1 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                data-dashboard-bar
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#3853F0] via-[#9b73d4] to-[#FF9ECF]"
                style={{ height: `${h}%`, opacity: 0.55 + (h / 100) * 0.45 }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Asistente IA del panel */}
      <div
        className="flex flex-col rounded-xl border border-white/20 bg-slate-950/60 p-3">
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <div className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-[#78CEFF] to-[#BD0B91] text-white">
            <Icon name="bot" size={13} />
          </div>
          <p className="text-[10px] font-semibold text-white">
            Analista IA
          </p>
        </div>
        <div className="relative flex flex-1 flex-col gap-2 text-[9.5px] leading-snug">
          <div
            data-dashboard-message
            className="self-end rounded-lg rounded-tr-sm bg-[#3853F0]/60 px-2 py-1.5 text-white">
            ¿Por qué subieron las visitas el jueves?
          </div>
          <div
            data-dashboard-typing
            aria-label="El analista está escribiendo"
            className="flex w-fit items-center gap-1 self-start rounded-lg rounded-tl-sm bg-white/10 px-2.5 py-2">
            {[0, 1, 2].map((dot) => (
              <i
                key={dot}
                data-dashboard-dot
                className="h-1 w-1 rounded-full bg-white/55"
              />
            ))}
          </div>
          <div
            data-dashboard-message
            className="self-start rounded-lg rounded-tl-sm bg-white/10 px-2 py-1.5 text-white/90">
            Tu campaña de Instagram generó 2.1k visitas nuevas (+64%). La
            página de planes convirtió al 6.2%. Te sugiero duplicar ese
            anuncio 📈
          </div>
          <div
            data-dashboard-message
            className="self-start rounded-lg bg-white/5 px-2 py-1.5 text-white/60">
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
