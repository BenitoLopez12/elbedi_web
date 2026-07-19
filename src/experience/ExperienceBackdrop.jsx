// Fondo cinematográfico: el "set" de cada sección. Interpola los degradados
// de marca (esquinas + glow radial) al cambiar de sección, con una deriva
// lenta permanente para que el mundo nunca se sienta estático.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SECTIONS } from "@/content/experience.js";
import { experienceStore } from "@/experience/state/experienceStore.js";

// EXPERIMENTAL — Oscurecimiento global sutil de los fondos (~8%) para que
// los textos claros no se pierdan. Los colores ORIGINALES siguen intactos
// en src/content/experience.js; para revertir al look original basta con
// poner BACKDROP_DIM en 1.
const BACKDROP_DIM = 0.92;

function dimHex(hex) {
  if (BACKDROP_DIM >= 1 || !/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const channels = [1, 3, 5].map((i) =>
    Math.round(parseInt(hex.slice(i, i + 2), 16) * BACKDROP_DIM),
  );
  return `#${channels.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function stopVars(section) {
  const { center, corners, glow } = section.backdrop;
  return {
    "--bg-center": dimHex(center),
    "--corner-a": dimHex(corners[0]),
    "--corner-b": dimHex(corners[1]),
    "--corner-c": dimHex(corners[2]),
    "--corner-d": dimHex(corners[3]),
    "--glow-color": glow,
  };
}

export default function ExperienceBackdrop() {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const current = { index: experienceStore.get().active };
    gsap.set(root, stopVars(SECTIONS[current.index]));

    const unsubscribe = experienceStore.subscribe((state) => {
      if (state.active === current.index) return;
      current.index = state.active;
      gsap.to(root, {
        ...stopVars(SECTIONS[state.active]),
        duration: state.reducedMotion ? 0.4 : 1.4,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    });

    // Deriva lenta del glow — respiración del set.
    const drift = gsap.to(glowRef.current, {
      "--glow-x": "62%",
      "--glow-y": "38%",
      duration: 16,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Parallax sutil con el puntero (profundidad de mundo 3D).
    const quickX = gsap.quickTo(glowRef.current, "x", {
      duration: 1.6,
      ease: "power2.out",
    });
    const quickY = gsap.quickTo(glowRef.current, "y", {
      duration: 1.6,
      ease: "power2.out",
    });
    const onPointer = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      quickX(nx * 46);
      quickY(ny * 34);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      unsubscribe();
      drift.kill();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        ...stopVars(SECTIONS[0]),
        backgroundColor: "var(--bg-center)",
      }}>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--bg-center)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--corner-a) 0%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(225deg, var(--corner-b) 0%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, var(--corner-c) 0%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(315deg, var(--corner-d) 0%, transparent 52%)",
        }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          "--glow-x": "34%",
          "--glow-y": "58%",
          background:
            "radial-gradient(circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 46%)",
        }}
      />
      {/* Grano cinematográfico sutil */}
      <div className="absolute inset-0 cine-grain" />
    </div>
  );
}
