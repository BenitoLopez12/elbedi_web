// Fondo cinematográfico: el "set" de cada sección. Interpola los degradados
// de marca (esquinas + glow radial) al cambiar de sección, con una deriva
// lenta permanente para que el mundo nunca se sienta estático.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SECTIONS } from "@/content/experience.js";
import { experienceStore } from "@/experience/state/experienceStore.js";

// Corrección de contraste global. Los colores de marca originales siguen
// intactos en src/content/experience.js; estos factores solo gobiernan la
// exposición del set y pueden revertirse sin alterar la paleta fuente.
const BACKDROP_DIM = 0.82;
const BACKDROP_GLOW_DIM = 0.62;

function dimHex(hex, localExposure = 1) {
  const exposure = BACKDROP_DIM * localExposure;
  if (exposure >= 1 || !/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const channels = [1, 3, 5].map((i) =>
    Math.round(parseInt(hex.slice(i, i + 2), 16) * exposure),
  );
  return `#${channels.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function dimRgba(rgba, localExposure = 1) {
  const match = rgba.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );
  if (!match) return rgba;

  const [, red, green, blue, alpha = "1"] = match;
  return `rgba(${red}, ${green}, ${blue}, ${Number(alpha) * BACKDROP_GLOW_DIM * localExposure})`;
}

function stopVars(section) {
  const {
    center,
    corners,
    glow,
    mirrorX = false,
    exposure = 1,
    spaceColor,
  } = section.backdrop;
  const mappedCorners = mirrorX
    ? [corners[1], corners[0], corners[3], corners[2]]
    : corners;
  const exposureMap =
    typeof exposure === "number"
      ? {
          center: exposure,
          left: exposure,
          right: exposure,
          glow: exposure,
        }
      : {
          center: exposure.center ?? 1,
          left: exposure.left ?? exposure.center ?? 1,
          right: exposure.right ?? exposure.center ?? 1,
          glow: exposure.glow ?? exposure.center ?? 1,
        };

  return {
    "--bg-center": dimHex(center, exposureMap.center),
    "--corner-a": dimHex(mappedCorners[0], exposureMap.left),
    "--corner-b": dimHex(mappedCorners[1], exposureMap.right),
    "--corner-c": dimHex(mappedCorners[2], exposureMap.left),
    "--corner-d": dimHex(mappedCorners[3], exposureMap.right),
    "--glow-color": dimRgba(glow, exposureMap.glow),
    "--space-color": spaceColor ?? "#080f24",
    "--space-opacity": spaceColor ? 1 : 0,
  };
}

export default function ExperienceBackdrop() {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return undefined;

    const current = { index: experienceStore.get().active };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    gsap.set(root, stopVars(SECTIONS[current.index]));

    const unsubscribe = experienceStore.subscribe((state) => {
      if (state.active === current.index) return;
      current.index = state.active;
      gsap.to(root, {
        ...stopVars(SECTIONS[state.active]),
        duration: reduceMotion || state.reducedMotion ? 0 : 1.4,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    });

    // Deriva lenta del glow — respiración del set.
    const drift = reduceMotion
      ? null
      : gsap.to(glow, {
          "--glow-x": "62%",
          "--glow-y": "38%",
          duration: 16,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

    // Parallax sutil con el puntero (profundidad de mundo 3D).
    const quickX =
      !reduceMotion && finePointer
        ? gsap.quickTo(glow, "x", {
            duration: 1.6,
            ease: "power2.out",
          })
        : null;
    const quickY =
      !reduceMotion && finePointer
        ? gsap.quickTo(glow, "y", {
            duration: 1.6,
            ease: "power2.out",
          })
        : null;
    const onPointer = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      quickX?.(nx * 46);
      quickY?.(ny * 34);
    };
    if (quickX && quickY) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      unsubscribe();
      drift?.kill();
      window.removeEventListener("pointermove", onPointer);
      gsap.killTweensOf([root, glow]);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="cine-backdrop fixed inset-0 z-0 overflow-hidden pointer-events-none"
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
      {/* Azul sólido del hero: conserva el rosa izquierdo y cubre los
          degradados y el glow desde el 58% del ancho hacia la derecha.
          La opacidad comparte la transición entre secciones del fondo. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--space-color)",
          opacity: "var(--space-opacity)",
          maskImage: "linear-gradient(to right, transparent 18%, #000 58%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 18%, #000 58%)",
        }}
      />
      {/* Grano cinematográfico sutil */}
      <div className="absolute inset-0 cine-grain" />
    </div>
  );
}
