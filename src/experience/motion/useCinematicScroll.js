import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SECTION_IDS } from "@/content/experience.js";
import {
  bindNavigator,
  experienceStore,
  heroSceneMotion,
} from "@/experience/state/experienceStore.js";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_DESKTOP_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const SERVICE_FLOW_QUERY =
  "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const HERO_DESKTOP_QUERY =
  "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const HERO_FLOW_QUERY =
  "(max-width: 1100px) and (prefers-reduced-motion: no-preference)";
const LENIS_EASE = (progress) => 1 - Math.pow(1 - progress, 3);

function serviceParts(section) {
  const details = section.querySelector("[data-service-details]");

  return {
    promise: section.querySelector("[data-service-promise]"),
    details,
    detailItems: details?.querySelectorAll("[data-service-detail-item]") ?? [],
    visual: section.querySelector("[data-service-visual]"),
  };
}

function createServiceStory(section, index, { compact = false } = {}) {
  const { promise, details, detailItems, visual } = serviceParts(section);
  if (!promise || !details || !visual) return null;

  // El copy vive en flujo normal: no hay capas superpuestas, pin ni cambio de
  // estado. Cada acto entra cuando alcanza el viewport y después continúa con
  // el documento.
  gsap.set([promise, details, visual, ...detailItems], {
    filter: "none",
  });
  gsap.set(visual, { autoAlpha: 1, xPercent: 0 });

  const actTweens = [promise, details].map((act, actIndex) =>
    gsap.fromTo(
      act,
      {
        autoAlpha: 0,
        y: compact ? 30 : 52,
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          id: `service-act-${section.id}-${actIndex + 1}`,
          trigger: act,
          start: "top 91%",
          end: compact ? "top 66%" : "top 59%",
          scrub: compact ? 0.72 : 0.9,
          invalidateOnRefresh: true,
          refreshPriority: index + 10,
          onToggle: (self) => {
            gsap.set(act, {
              willChange: self.isActive ? "transform, opacity" : "auto",
            });
          },
        },
      },
    ),
  );

  // Parallax de seguimiento: el gráfico sigue desplazándose, pero a una
  // velocidad menor que el documento mientras pasan ambos bloques de copy.
  // El factor deliberadamente menor a 1 evita que se perciba como un pin.
  const visualDrift = gsap.fromTo(
    visual,
    { y: 0 },
    {
      y: () => {
        const available = Math.max(
          0,
          section.offsetHeight - visual.offsetHeight - (compact ? 96 : 150),
        );
        // En una sola columna el gráfico comparte el flujo vertical con el
        // segundo acto; limitamos el recorrido para que nunca lo invada.
        return compact
          ? Math.min(64, available * 0.08)
          : available * 0.58;
      },
      ease: "none",
      scrollTrigger: {
        id: `service-visual-drift-${section.id}`,
        trigger: section,
        start: "top 88%",
        end: "bottom 12%",
        scrub: compact ? 0.95 : 1.2,
        invalidateOnRefresh: true,
        refreshPriority: index + 10,
        onToggle: (self) => {
          gsap.set(visual, {
            willChange: self.isActive ? "transform, opacity" : "auto",
          });
        },
      },
    },
  );

  return { actTweens, visualDrift };
}

function createDesktopServiceTimeline(section, index) {
  return createServiceStory(section, index);
}

function createFlowServiceTimeline(section, index) {
  return createServiceStory(section, index, { compact: true });
}

export function useCinematicScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    experienceStore.set({ reducedMotion: reduceMotion, transitioning: false });

    let lenis = null;
    const ticker = (time) => {
      const timeMs = time * 1000;
      lenis?.raf(timeMs);
    };

    if (!reduceMotion) {
      lenis = new Lenis({
        autoRaf: false,
        duration: 1.3,
        easing: LENIS_EASE,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        syncTouch: false,
        overscroll: false,
        anchors: false,
        prevent: (node) =>
          Boolean(node?.closest?.("[data-lenis-prevent], [role='dialog']")),
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const scrollToChapter = (targetIndex) => {
      const id = SECTION_IDS[targetIndex];
      const target = id ? root.querySelector(`#${CSS.escape(id)}`) : null;
      if (!target) return false;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: 1,
          duration: 1.5,
          easing: LENIS_EASE,
        });
      } else {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
      return true;
    };

    const unbindNavigator = bindNavigator(scrollToChapter);
    const serviceMedia = gsap.matchMedia();
    const aiNodeBatchTriggers = [];
    const aiNodeBatchTweens = new Set();
    const context = gsap.context(() => {
      const chapters = SECTION_IDS.map((id) => root.querySelector(`#${CSS.escape(id)}`));

      chapters.forEach((chapter, index) => {
        if (!chapter) return;
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 52%",
          end: "bottom 48%",
          onToggle: (self) => {
            if (!self.isActive) return;
            const previous = experienceStore.get().active;
            experienceStore.set({
              previous,
              active: index,
              direction: index >= previous ? 1 : -1,
              transitioning: false,
            });
            history.replaceState(null, "", `#${SECTION_IDS[index]}`);
          },
        });
      });

      gsap.to("[data-scroll-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      if (reduceMotion) {
        gsap.set(
          "[data-hero-line], [data-hero-line-enter], [data-hero-kicker], [data-hero-kicker-enter], [data-hero-lead], [data-hero-lead-enter], [data-hero-actions], [data-hero-actions-enter], [data-hero-solar], [data-hero-solar-enter], .cine-reveal, [data-service-promise], [data-service-details], [data-service-detail-item], [data-service-visual], [data-process-step], [data-ai-core], [data-ai-flow], [data-ai-node], [data-faq-item], .cine-contact__form",
          { clearProps: "all", autoAlpha: 1 },
        );
        return;
      }

      // Estados completos antes de crear los timelines. Esto evita que una
      // reconstrucción del componente o un refresh de ScrollTrigger herede una
      // máscara parcialmente cerrada.
      gsap.set("[data-hero-solar]", { autoAlpha: 1 });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
        })
        .from("[data-hero-kicker-enter]", { autoAlpha: 0, y: 24, duration: 0.62 })
        .from(
          "[data-hero-line-enter]",
          {
            autoAlpha: 0,
            yPercent: 110,
            rotateX: -14,
            stagger: 0.1,
            duration: 0.92,
          },
          "-=0.36",
        )
        .from(
          "[data-hero-lead-enter], [data-hero-actions-enter]",
          { autoAlpha: 0, y: 28, stagger: 0.08, duration: 0.66 },
          "-=0.48",
        )
        .from("[data-scroll-cue]", { autoAlpha: 0, y: -10, duration: 0.52 }, "-=0.36");

      serviceMedia.add(HERO_DESKTOP_QUERY, () => {
        gsap.set("[data-hero-solar-enter]", {
          autoAlpha: 0,
          clipPath: "none",
        });
        gsap.to("[data-hero-solar-enter]", {
          autoAlpha: 1,
          duration: 1.05,
          delay: 0.46,
          ease: "power3.out",
        });
      });

      serviceMedia.add(HERO_FLOW_QUERY, () => {
        heroSceneMotion.setProgress(0);
        gsap.set("[data-hero-solar-enter]", {
          autoAlpha: 0,
          clipPath: "circle(0% at 50% 50%)",
        });
        gsap.to("[data-hero-solar-enter]", {
          autoAlpha: 1,
          clipPath: "circle(125% at 50% 50%)",
          duration: 1.18,
          delay: 0.38,
          ease: "power3.out",
        });
      });

      // El sistema solar solo permanece fijo y ejecuta su máscara de salida en
      // escritorio. En móvil/tablet forma parte del flujo y sale naturalmente
      // con el documento, evitando superposición con el copy durante el scroll.
      serviceMedia.add(HERO_DESKTOP_QUERY, () => {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".cine-hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => heroSceneMotion.setProgress(self.progress),
          },
        });

        heroTimeline
          .addLabel("fade", 0.58)
          .to(
          "[data-hero-solar]",
          {
            autoAlpha: 0,
            duration: 0.42,
            ease: "none",
          },
          "fade",
        );

        return () => {
          heroSceneMotion.setProgress(0);
          gsap.set("[data-hero-solar]", { autoAlpha: 1, clearProps: "visibility" });
        };
      });

      gsap.fromTo(
        ".cine-prologue__title",
        {
          autoAlpha: 0.38,
          y: 68,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".cine-prologue__title",
            start: "top 88%",
            // El trigger parte con y: 68; cerrar al 46% compensa ese offset
            // y garantiza nitidez total cuando el borde visual llega al 40%.
            end: "top 46%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      const prologueAccent = root.querySelector("[data-prologue-accent]");
      if (prologueAccent) {
        gsap.fromTo(
          prologueAccent,
          { backgroundPosition: "0% 50%" },
          {
            backgroundPosition: "100% 50%",
            duration: 8,
            repeat: -1,
            ease: "none",
          },
        );
      }

      gsap.from(".cine-prologue__axis i", {
        scaleX: 0,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".cine-prologue__axis",
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      gsap.utils
        .toArray(".cine-reveal")
        .filter((element) => !element.closest("[data-reversible-section]"))
        .forEach((element) => {
          gsap.set(element, {
            autoAlpha: 0,
            y: 34,
            filter: "blur(5px)",
          });
          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        });

      const processSteps = gsap.utils.toArray("[data-process-step]");
      processSteps.forEach((step, index) => {
        gsap.set(step, {
          autoAlpha: 0,
          x: index % 2 ? 42 : -42,
          rotationY: index % 2 ? -5 : 5,
        });
        gsap.to(step, {
          autoAlpha: 1,
          x: 0,
          rotationY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            end: "center 58%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(".cine-process__rail i", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".cine-process__track",
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });

      const aiNetwork = root.querySelector("[data-ai-network]");
      if (aiNetwork) {
        const aiCore = aiNetwork.querySelector("[data-ai-core]");
        const aiFlows = aiNetwork.querySelectorAll("[data-ai-flow]");
        const aiNodes = aiNetwork.querySelectorAll("[data-ai-node]");

        gsap.set(aiCore, {
          autoAlpha: 0,
          scale: 0.72,
          filter: "blur(10px)",
        });
        gsap.set(aiFlows, { autoAlpha: 0 });
        gsap.set(aiNodes, {
          autoAlpha: 0,
          y: 42,
          scale: 0.94,
          filter: "blur(9px)",
        });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: aiCore,
              start: "top 78%",
              once: true,
              invalidateOnRefresh: true,
            },
          })
          .to(
            aiCore,
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.78,
            },
            0,
          )
          .to(aiFlows, { autoAlpha: 1, duration: 0.62 }, 0.26);

        aiNodeBatchTriggers.push(
          ...ScrollTrigger.batch(aiNodes, {
            start: "top 78%",
            once: true,
            interval: 0.08,
            // Escritorio: cascada completa de izquierda a derecha. En
            // tablet/móvil: una cascada por fila para no animar fuera de vista.
            batchMax: () =>
              window.matchMedia("(max-width: 1023px)").matches ? 2 : 4,
            onEnter: (batch) => {
              const tween = gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.5,
                stagger: { each: 0.2, from: "start" },
                ease: "power3.out",
                overwrite: "auto",
                onComplete: () => aiNodeBatchTweens.delete(tween),
              });
              aiNodeBatchTweens.add(tween);
            },
          }),
        );
      }

        root
          .querySelectorAll("[data-reversible-section]")
          .forEach((section) => {
          const reversibleSelector =
            ".cine-reveal, [data-faq-item], .cine-contact__form, [data-post-studio-item]";
          const targets = [
            ...(section.matches(reversibleSelector) ? [section] : []),
            ...section.querySelectorAll(reversibleSelector),
          ];
          if (!targets.length) return;

          gsap.set(targets, {
            autoAlpha: 0,
            y: 42,
            scale: 0.985,
          });

          const timeline = gsap
            .timeline({ paused: true })
            .to(targets, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              stagger: 0.055,
              ease: "power3.out",
            });

          ScrollTrigger.create({
            id: `post-studio-${section.id}`,
            trigger: section,
            start: "top 84%",
            animation: timeline,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          });
        });

    }, root);

    if (!reduceMotion) {
      serviceMedia.add(
        SERVICE_DESKTOP_QUERY,
        () => {
          root.querySelectorAll("[data-service]").forEach(createDesktopServiceTimeline);
        },
        root,
      );
      serviceMedia.add(
        SERVICE_FLOW_QUERY,
        () => {
          root.querySelectorAll("[data-service]").forEach(createFlowServiceTimeline);
        },
        root,
      );
    }

    const refresh = () => ScrollTrigger.refresh(true);
    let disposed = false;
    document.fonts?.ready?.then(() => {
      if (!disposed) refresh();
    });
    window.addEventListener("load", refresh, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      unbindNavigator();
      aiNodeBatchTweens.forEach((tween) => tween.kill());
      aiNodeBatchTriggers.forEach((trigger) => trigger.kill());
      serviceMedia.revert();
      context.revert();
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        gsap.ticker.remove(ticker);
        gsap.ticker.lagSmoothing(500, 33);
      }
    };
  }, [rootRef]);
}
