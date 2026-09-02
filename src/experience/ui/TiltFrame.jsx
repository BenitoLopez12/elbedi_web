// Contenedor con profundidad 3D real: inclina su contenido siguiendo el
// puntero (rotateX/rotateY con inercia) y devuelve el plano al salir.

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TiltFrame({
  children,
  max = 9,
  className = "",
  glare = true,
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) {
      return undefined;
    }

    const glareNode = glareRef.current;
    const rx = gsap.quickTo(inner, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(inner, "rotationY", {
      duration: 0.7,
      ease: "power3.out",
    });
    const glareX = glareNode
      ? gsap.quickTo(glareNode, "x", { duration: 0.5, ease: "power2.out" })
      : null;
    const glareY = glareNode
      ? gsap.quickTo(glareNode, "y", { duration: 0.5, ease: "power2.out" })
      : null;
    const glareOpacity = glareNode
      ? gsap.quickTo(glareNode, "opacity", {
          duration: 0.36,
          ease: "power2.out",
        })
      : null;

    let box = null;
    const measure = () => {
      box = wrap.getBoundingClientRect();
    };

    const onMove = (event) => {
      if (!box) measure();
      if (!box?.width || !box?.height) return;
      const nx = (event.clientX - box.left) / box.width - 0.5;
      const ny = (event.clientY - box.top) / box.height - 0.5;
      ry(nx * max);
      rx(-ny * max);
      glareOpacity?.(0.5);
      glareX?.(nx * box.width * 0.45);
      glareY?.(ny * box.height * 0.45);
    };

    const onLeave = () => {
      box = null;
      rx(0);
      ry(0);
      glareOpacity?.(0);
    };

    wrap.addEventListener("pointerenter", measure);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointerenter", measure);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([inner, glareNode].filter(Boolean));
    };
  }, [glare, max]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: "1200px" }}>
      <div
        ref={innerRef}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}>
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.35), transparent 55%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
