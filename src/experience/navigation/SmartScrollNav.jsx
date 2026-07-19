// Scroll inteligente: rail lateral (desktop) / dock inferior (móvil).
// Sustituye al scroll del navegador; cada icono es una sección y el
// indicador viaja con animación spring.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Icon from "@/experience/ui/icons.jsx";
import { SECTIONS } from "@/content/experience.js";
import { useExperienceSelector } from "@/experience/navigation/useSectionEngine.js";
import { dispatchIntent } from "@/experience/state/experienceStore.js";

export default function SmartScrollNav() {
  const active = useExperienceSelector((s) => s.active);
  const transitioning = useExperienceSelector((s) => s.transitioning);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const railRef = useRef(null);
  const [hovered, setHovered] = useState(-1);

  // El indicador viaja hasta el icono activo (vertical u horizontal).
  useEffect(() => {
    const indicator = indicatorRef.current;
    const target = itemRefs.current[active];
    const rail = railRef.current;
    if (!indicator || !target || !rail) return;

    const railBox = rail.getBoundingClientRect();
    const box = target.getBoundingClientRect();

    gsap.to(indicator, {
      x: box.left - railBox.left,
      y: box.top - railBox.top,
      width: box.width,
      height: box.height,
      duration: 0.65,
      ease: "elastic.out(0.9, 0.6)",
      overwrite: true,
    });
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const indicator = indicatorRef.current;
      const target = itemRefs.current[experienceActive()];
      const rail = railRef.current;
      if (!indicator || !target || !rail) return;
      const railBox = rail.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      gsap.set(indicator, {
        x: box.left - railBox.left,
        y: box.top - railBox.top,
        width: box.width,
        height: box.height,
      });
    };
    const experienceActive = () => active;
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <nav
      aria-label="Navegación de secciones"
      className="cine-nav fixed z-40 md:left-4 md:top-1/2 md:-translate-y-1/2 max-md:bottom-3 max-md:left-1/2 max-md:-translate-x-1/2">
      <div
        ref={railRef}
        className="relative flex md:flex-col flex-row items-center gap-1 rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl p-1.5 shadow-2xl max-md:max-w-[92vw] max-md:overflow-x-auto cine-dock-scroll">
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute left-0 top-0 rounded-xl bg-white/90 shadow-lg pointer-events-none"
          style={{ width: 44, height: 44 }}
        />
        {SECTIONS.map((section, index) => {
          const isActive = index === active;
          return (
            <button
              key={section.id}
              ref={(el) => (itemRefs.current[index] = el)}
              type="button"
              aria-label={section.name}
              aria-current={isActive ? "true" : undefined}
              disabled={transitioning}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(-1)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(-1)}
              onClick={() =>
                dispatchIntent({
                  type: "navigate",
                  section: section.id,
                  source: "nav",
                })
              }
              className={`relative z-10 grid place-items-center h-11 w-11 shrink-0 rounded-xl transition-colors duration-300 ${
                isActive
                  ? "text-slate-900"
                  : "text-white/85 hover:text-white"
              }`}>
              <Icon name={section.icon} size={21} />
              {/* Tooltip con el nombre de la sección */}
              <span
                className={`cine-tooltip md:left-[calc(100%+14px)] md:top-1/2 md:-translate-y-1/2 max-md:bottom-[calc(100%+12px)] max-md:left-1/2 max-md:-translate-x-1/2 ${
                  hovered === index ? "cine-tooltip--on" : ""
                }`}
                role="presentation">
                {section.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
