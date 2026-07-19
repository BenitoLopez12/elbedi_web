// Coreografía cinematográfica de secciones.
// Cada elemento narrativo se marca con data-cine="rise|panel|mask|pop|line"
// y opcionalmente data-cine-order para afinar el orden de construcción.
// La entrada "construye" la sección pieza por pieza; la salida la desmonta.

import gsap from "gsap";

const ENTER_EASE = "power3.out";
const EXIT_EASE = "power2.in";

function collect(sectionEl) {
  const items = Array.from(sectionEl.querySelectorAll("[data-cine]"));
  return items.sort(
    (a, b) =>
      Number(a.dataset.cineOrder || 0) - Number(b.dataset.cineOrder || 0),
  );
}

function enterVars(kind, direction) {
  const dir = direction >= 0 ? 1 : -1;
  switch (kind) {
    case "panel":
      return {
        from: {
          opacity: 0,
          yPercent: 12 * dir,
          scale: 0.94,
          rotateX: 7 * dir,
          filter: "blur(14px)",
        },
        to: {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.05,
        },
      };
    case "mask":
      return {
        from: {
          clipPath:
            dir >= 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          opacity: 0,
          y: 34 * dir,
        },
        to: {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
      };
    case "pop":
      return {
        from: { opacity: 0, scale: 0.72, y: 22 * dir, filter: "blur(8px)" },
        to: {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "back.out(1.7)",
        },
      };
    case "line":
      return {
        from: { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" },
        to: { scaleX: 1, opacity: 1, duration: 0.8 },
      };
    default: // rise
      return {
        from: { opacity: 0, y: 54 * dir, filter: "blur(10px)" },
        to: { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
      };
  }
}

// La salida toca y/scale/filter en TODOS los elementos; la entrada debe
// restablecerlos siempre, aunque su variante no los anime. Sin esto, al
// volver a una sección los títulos quedan con el blur/offset de la salida.
const EXIT_RESET = { y: 0, scale: 1, filter: "blur(0px)" };

/**
 * Construye la sección: los elementos aparecen uno a uno, como si el
 * sistema los ensamblara frente al usuario.
 */
export function buildEnterTimeline(sectionEl, { direction = 1 } = {}) {
  const tl = gsap.timeline({ defaults: { ease: ENTER_EASE } });
  const items = collect(sectionEl);

  tl.set(sectionEl, { autoAlpha: 1 });

  items.forEach((el, index) => {
    const { from, to } = enterVars(el.dataset.cine, direction);
    tl.fromTo(
      el,
      from,
      { ...EXIT_RESET, ...to, immediateRender: true },
      index * 0.085,
    );
  });

  return tl;
}

/**
 * Desmonta la sección con rapidez elegante (la salida nunca compite en
 * protagonismo con la entrada de la siguiente).
 */
export function buildExitTimeline(sectionEl, { direction = 1 } = {}) {
  const tl = gsap.timeline({ defaults: { ease: EXIT_EASE } });
  const items = collect(sectionEl);
  const dir = direction >= 0 ? 1 : -1;

  if (items.length) {
    tl.to(items, {
      opacity: 0,
      y: -38 * dir,
      filter: "blur(8px)",
      scale: 0.985,
      duration: 0.34,
      stagger: 0.028,
    });
  }

  tl.set(sectionEl, { autoAlpha: 0 });
  return tl;
}

/** Variante reduced-motion: cross-fade simple, misma historia. */
export function buildReducedSwap(fromEl, toEl) {
  const tl = gsap.timeline();
  if (fromEl) tl.to(fromEl, { autoAlpha: 0, duration: 0.25, ease: "none" });
  tl.set(toEl.querySelectorAll("[data-cine]"), { clearProps: "all" });
  tl.fromTo(
    toEl,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.3, ease: "none" },
  );
  return tl;
}
