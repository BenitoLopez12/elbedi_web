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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const rx = gsap.quickTo(inner, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(inner, "rotationY", {
      duration: 0.7,
      ease: "power3.out",
    });

    const onMove = (event) => {
      const box = wrap.getBoundingClientRect();
      const nx = (event.clientX - box.left) / box.width - 0.5;
      const ny = (event.clientY - box.top) / box.height - 0.5;
      ry(nx * max);
      rx(-ny * max);
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.5,
          x: nx * box.width * 0.45,
          y: ny * box.height * 0.45,
          duration: 0.5,
        });
      }
    };

    const onLeave = () => {
      rx(0);
      ry(0);
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.7 });
      }
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: "1200px" }}>
      <div
        ref={innerRef}
        className="relative will-change-transform"
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
