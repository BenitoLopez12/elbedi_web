// Menú inteligente de la experiencia. El isotipo, el estado de capítulo y
// los accesos forman un único panel de altura completa. Su viewport interno
// solo aparece cuando la altura disponible no alcanza para todos los iconos.

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Icon from "@/experience/ui/icons.jsx";
import { SECTIONS } from "@/content/experience.js";
import { useExperienceSelector } from "@/experience/state/useExperienceSelector.js";
import { dispatchIntent } from "@/experience/state/experienceStore.js";

export default function SmartScrollNav() {
  const active = useExperienceSelector((state) => state.active);
  const transitioning = useExperienceSelector((state) => state.transitioning);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const railRef = useRef(null);
  const viewportRef = useRef(null);
  const [hovered, setHovered] = useState({ index: -1, top: 0 });
  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    setScrollState({
      canScrollUp: viewport.scrollTop > 2,
      canScrollDown: viewport.scrollTop < maxScroll - 2,
    });
  }, []);

  const moveMenu = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({
      top: direction * Math.max(120, viewport.clientHeight * 0.58),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  useEffect(() => {
    const indicator = indicatorRef.current;
    const target = itemRefs.current[active];
    const rail = railRef.current;
    if (!indicator || !target || !rail) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const viewport = viewportRef.current;
    if (viewport) {
      const targetTop = target.offsetTop;
      const targetBottom = targetTop + target.offsetHeight;
      const viewportBottom = viewport.scrollTop + viewport.clientHeight;
      const nextTop =
        targetTop < viewport.scrollTop
          ? targetTop
          : targetBottom > viewportBottom
            ? targetBottom - viewport.clientHeight
            : viewport.scrollTop;
      viewport.scrollTo({
        top: nextTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    const tween = gsap.to(indicator, {
      y: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight,
      duration: reduceMotion ? 0 : 0.62,
      ease: "elastic.out(0.9, 0.62)",
      overwrite: true,
    });

    const frame = requestAnimationFrame(updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      tween.kill();
    };
  }, [active, updateScrollState]);

  const showTooltip = (index, target) => {
    const box = target.getBoundingClientRect();
    const menuBox = target.closest(".cine-side-menu")?.getBoundingClientRect();
    setHovered({
      index,
      top: box.top - (menuBox?.top ?? 0) + box.height / 2,
    });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return undefined;

    const syncIndicator = () => {
      const indicator = indicatorRef.current;
      const target = itemRefs.current[active];
      if (indicator && target) {
        gsap.set(indicator, {
          y: target.offsetTop,
          width: target.offsetWidth,
          height: target.offsetHeight,
        });
      }
      updateScrollState();
    };

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncIndicator);
    observer?.observe(viewport);
    observer?.observe(rail);
    viewport.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", syncIndicator);
    syncIndicator();

    return () => {
      observer?.disconnect();
      viewport.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", syncIndicator);
      gsap.killTweensOf(indicatorRef.current);
    };
  }, [active, updateScrollState]);

  return (
    <header className="cine-side-menu">
      <a
        href="#inicio"
        className="cine-side-menu__brand"
        aria-label="ELBEDI AI — Inicio"
        onClick={(event) => {
          event.preventDefault();
          dispatchIntent({ type: "navigate", section: "inicio", source: "brand" });
        }}>
        <img
          src="/images/favicon.svg"
          width="38"
          height="38"
          alt="Isotipo ELBEDI AI"
        />
      </a>

      <div className="cine-side-menu__navigation">
        <button
          type="button"
          className="cine-side-menu__scroll cine-side-menu__scroll--up"
          aria-label="Mostrar secciones anteriores"
          disabled={!scrollState.canScrollUp}
          onClick={() => moveMenu(-1)}>
          <Icon name="arrow" size={16} />
        </button>

        <nav className="cine-nav" aria-label="Navegación de secciones">
          <div
            ref={viewportRef}
            className="cine-nav__viewport"
            data-lenis-prevent>
            <div ref={railRef} className="cine-nav__rail">
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="cine-nav__indicator"
              />

              {SECTIONS.map((section, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={section.id}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    type="button"
                    aria-label={section.name}
                    aria-current={isActive ? "page" : undefined}
                    disabled={transitioning}
                    onMouseEnter={(event) => showTooltip(index, event.currentTarget)}
                    onMouseLeave={() => setHovered({ index: -1, top: 0 })}
                    onFocus={(event) => showTooltip(index, event.currentTarget)}
                    onBlur={() => setHovered({ index: -1, top: 0 })}
                    onClick={() =>
                      dispatchIntent({
                        type: "navigate",
                        section: section.id,
                        source: "nav",
                      })
                    }
                    className={`cine-nav__item ${isActive ? "is-active" : ""}`}>
                    <Icon name={section.icon} size={24} />
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <button
          type="button"
          className="cine-side-menu__scroll cine-side-menu__scroll--down"
          aria-label="Mostrar secciones siguientes"
          disabled={!scrollState.canScrollDown}
          onClick={() => moveMenu(1)}>
          <Icon name="arrow" size={16} />
        </button>
      </div>

      <span
        className={`cine-tooltip ${
          hovered.index >= 0 ? "cine-tooltip--on" : ""
        }`}
        style={{ top: hovered.top }}
        role="presentation">
        {hovered.index >= 0 ? SECTIONS[hovered.index]?.name : ""}
      </span>
    </header>
  );
}
