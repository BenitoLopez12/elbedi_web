// Motor de secciones: sustituye el scroll del documento por una máquina de
// estados cinematográfica. Wheel/touch/teclado avanzan de sección cuando el
// scroll interno de la sección activa llega a su límite (o no existe).

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import {
  experienceStore,
  bindNavigator,
} from "@/experience/state/experienceStore.js";
import { SECTIONS, SECTION_IDS } from "@/content/experience.js";
import {
  buildEnterTimeline,
  buildExitTimeline,
  buildReducedSwap,
} from "@/experience/motion/choreography.js";

const WHEEL_THRESHOLD = 60;
const TOUCH_THRESHOLD = 68;
const NAV_COOLDOWN_MS = 850;

export function useExperienceSelector(selector) {
  const getSnapshot = () => selector(experienceStore.get());
  return useSyncExternalStore(experienceStore.subscribe, getSnapshot, getSnapshot);
}

function getScroller(sectionEl) {
  return sectionEl?.querySelector("[data-cine-scroller]") || null;
}

function scrollerCanConsume(scroller, dir) {
  if (!scroller) return false;
  if (scroller.scrollHeight - scroller.clientHeight < 4) return false;
  return dir > 0
    ? scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 2
    : scroller.scrollTop > 2;
}

export function useSectionEngine({ stageRef, sectionRefs }) {
  const active = useExperienceSelector((s) => s.active);
  const engineRef = useRef({
    locked: false,
    lastNavAt: 0,
    wheelAccum: 0,
    wheelResetTimer: 0,
    timeline: null,
  });

  const api = useMemo(() => {
    const goTo = (targetIndex, source = "user") => {
      const engine = engineRef.current;
      const { active: current, reducedMotion } = experienceStore.get();
      const sections = sectionRefs.current;

      if (
        targetIndex === current ||
        targetIndex < 0 ||
        targetIndex >= SECTION_IDS.length ||
        engine.locked
      ) {
        return false;
      }

      const fromEl = sections[current];
      const toEl = sections[targetIndex];
      if (!toEl) return false;

      const direction = targetIndex > current ? 1 : -1;
      engine.locked = true;
      engine.wheelAccum = 0;

      experienceStore.set({
        previous: current,
        active: targetIndex,
        direction,
        transitioning: true,
      });

      try {
        history.replaceState(null, "", `#${SECTION_IDS[targetIndex]}`);
      } catch {
        /* history no disponible: irrelevante */
      }

      // La sección que entra se coloca sobre la que sale y con su scroll
      // interno alineado a la dirección del viaje (continuidad espacial).
      const targetScroller = getScroller(toEl);
      if (targetScroller) {
        targetScroller.scrollTop =
          direction > 0 ? 0 : targetScroller.scrollHeight;
      }
      gsap.set(toEl, { zIndex: 3 });
      if (fromEl) gsap.set(fromEl, { zIndex: 2 });

      const unlock = () => {
        engine.locked = false;
        engine.lastNavAt = performance.now();
        experienceStore.set({ transitioning: false });
        if (fromEl) gsap.set(fromEl, { zIndex: 1 });
        window.dispatchEvent(
          new CustomEvent("elbedi:section-change", {
            detail: { index: targetIndex, id: SECTION_IDS[targetIndex], source },
          }),
        );
      };

      engine.timeline?.kill();

      if (reducedMotion) {
        engine.timeline = buildReducedSwap(fromEl, toEl).eventCallback(
          "onComplete",
          unlock,
        );
        return true;
      }

      const master = gsap.timeline({ onComplete: unlock });
      if (fromEl) master.add(buildExitTimeline(fromEl, { direction }));
      master.add(buildEnterTimeline(toEl, { direction }), "-=0.08");
      engine.timeline = master;
      return true;
    };

    return {
      goTo,
      next: (source) => goTo(experienceStore.get().active + 1, source),
      prev: (source) => goTo(experienceStore.get().active - 1, source),
    };
  }, [sectionRefs]);

  // --- Estado inicial + apertura cinematográfica -------------------------
  useEffect(() => {
    const sections = sectionRefs.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const hashIndex = SECTION_IDS.indexOf(
      (location.hash || "").replace("#", ""),
    );
    const startIndex = hashIndex > -1 ? hashIndex : 0;

    experienceStore.set({ reducedMotion, active: startIndex });

    sections.forEach((el) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: 0, zIndex: 1 });
    });

    const reveal = () => {
      const el = sections[startIndex];
      if (!el) return;
      if (reducedMotion) {
        buildReducedSwap(null, el);
      } else {
        buildEnterTimeline(el, { direction: 1 });
      }
      engineRef.current.lastNavAt = performance.now();
    };

    if (window.__elbediPreloaderDone) {
      reveal();
    } else {
      window.addEventListener("elbedi:preloader:done", reveal, { once: true });
    }

    return () => window.removeEventListener("elbedi:preloader:done", reveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Navegador expuesto al bus de intents (agente IA, chat, rail) ------
  useEffect(() => bindNavigator(api.goTo), [api]);

  // --- Entradas: wheel, touch, teclado ------------------------------------
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const engine = engineRef.current;

    const canNavigate = () =>
      !engine.locked &&
      performance.now() - engine.lastNavAt > NAV_COOLDOWN_MS &&
      !experienceStore.get().transitioning;

    // Los modales (p. ej. avisos legales del footer) manejan su propio
    // scroll: mientras exista un modal abierto, el motor no navega — ni
    // siquiera desde su backdrop.
    const dialogIsOpen = () => Boolean(document.querySelector('[role="dialog"]'));

    const onWheel = (event) => {
      if (dialogIsOpen()) return;
      const dir = event.deltaY > 0 ? 1 : -1;
      const activeEl = sectionRefs.current[experienceStore.get().active];
      const scroller = getScroller(activeEl);

      if (scrollerCanConsume(scroller, dir) && !engine.locked) {
        // El scroll interno de la sección consume el gesto de forma nativa.
        return;
      }

      event.preventDefault();
      if (!canNavigate()) return;

      engine.wheelAccum += Math.abs(event.deltaY);
      clearTimeout(engine.wheelResetTimer);
      engine.wheelResetTimer = setTimeout(() => {
        engine.wheelAccum = 0;
      }, 260);

      if (engine.wheelAccum >= WHEEL_THRESHOLD) {
        engine.wheelAccum = 0;
        dir > 0 ? api.next("wheel") : api.prev("wheel");
      }
    };

    let touchStartY = 0;
    let touchHandled = false;

    const onTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
      touchHandled = false;
    };

    const onTouchMove = (event) => {
      if (touchHandled || dialogIsOpen()) return;
      const delta = touchStartY - event.touches[0].clientY;
      const dir = delta > 0 ? 1 : -1;
      const activeEl = sectionRefs.current[experienceStore.get().active];
      const scroller = getScroller(activeEl);
      const insideScroller =
        scroller && scroller.contains(event.target) &&
        scrollerCanConsume(scroller, dir);

      if (insideScroller || engine.locked) return;

      if (Math.abs(delta) > TOUCH_THRESHOLD && canNavigate()) {
        touchHandled = true;
        dir > 0 ? api.next("touch") : api.prev("touch");
      }
    };

    const onKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.closest("input, textarea, select, [contenteditable=true]") ||
          target.closest("[data-chat-panel]"))
      ) {
        return;
      }
      // Con un modal abierto, el teclado le pertenece al modal.
      if (document.querySelector('[role="dialog"]')) return;

      const nextKeys = ["ArrowDown", "PageDown", " "];
      const prevKeys = ["ArrowUp", "PageUp"];

      if (nextKeys.includes(event.key)) {
        const activeEl = sectionRefs.current[experienceStore.get().active];
        if (scrollerCanConsume(getScroller(activeEl), 1)) return;
        event.preventDefault();
        if (canNavigate()) api.next("keyboard");
      } else if (prevKeys.includes(event.key)) {
        const activeEl = sectionRefs.current[experienceStore.get().active];
        if (scrollerCanConsume(getScroller(activeEl), -1)) return;
        event.preventDefault();
        if (canNavigate()) api.prev("keyboard");
      } else if (event.key === "Home") {
        event.preventDefault();
        api.goTo(0, "keyboard");
      } else if (event.key === "End") {
        event.preventDefault();
        api.goTo(SECTION_IDS.length - 1, "keyboard");
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(engine.wheelResetTimer);
      engine.timeline?.kill();
    };
  }, [api, stageRef, sectionRefs]);

  return { active, ...api, sections: SECTIONS };
}
