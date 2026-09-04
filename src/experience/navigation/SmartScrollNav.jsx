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
  const mobileMenuButtonRef = useRef(null);
  const mobileDialogRef = useRef(null);
  const [hovered, setHovered] = useState({ index: -1, top: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
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

  const navigateTo = (section, source) => {
    setMobileMenuOpen(false);
    dispatchIntent({ type: "navigate", section, source });
  };

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const dialog = mobileDialogRef.current;
    const pageRegions = [
      document.querySelector(".cine-main"),
      document.querySelector(".cine-footer"),
    ].filter(Boolean);
    const previousInert = pageRegions.map((region) => region.inert);
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    pageRegions.forEach((region) => {
      region.inert = true;
    });
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll(
          "button:not(:disabled), a[href]:not([aria-hidden='true'])",
        ) ?? [],
      );
    const focusFrame = requestAnimationFrame(() => focusable()[0]?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      pageRegions.forEach((region, index) => {
        region.inert = previousInert[index];
      });
      document.removeEventListener("keydown", onKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMobileMenuOpen(false);
    };
    desktopQuery.addEventListener?.("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener?.("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;
    let lastDirection = 0;
    let frame = 0;

    const updateHeader = () => {
      frame = 0;
      const currentScrollY = Math.max(0, window.scrollY);

      if (!mobileQuery.matches || currentScrollY <= 32) {
        setMobileHeaderHidden(false);
        lastScrollY = currentScrollY;
        accumulatedDelta = 0;
        lastDirection = 0;
        return;
      }

      const delta = currentScrollY - lastScrollY;
      const direction = Math.sign(delta);
      if (direction && direction !== lastDirection) accumulatedDelta = 0;
      if (direction) {
        accumulatedDelta += delta;
        lastDirection = direction;
      }
      if (accumulatedDelta > 18) {
        setMobileHeaderHidden(true);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -14) {
        setMobileHeaderHidden(false);
        accumulatedDelta = 0;
      }
      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateHeader);
    };
    const onBreakpointChange = () => {
      lastScrollY = window.scrollY;
      accumulatedDelta = 0;
      lastDirection = 0;
      setMobileHeaderHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mobileQuery.addEventListener?.("change", onBreakpointChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      mobileQuery.removeEventListener?.("change", onBreakpointChange);
    };
  }, []);

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
    <>
      <header className="cine-side-menu">
      <a
        href="#inicio"
        className="cine-side-menu__brand"
        aria-label="ELBEDI AI — Inicio"
        onClick={(event) => {
          event.preventDefault();
          navigateTo("inicio", "brand");
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
                    onClick={() => navigateTo(section.id, "nav")}
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

      <header
        className={`cine-mobile-header ${
          mobileHeaderHidden && !mobileMenuOpen ? "is-hidden" : ""
        }`}
        aria-hidden={mobileMenuOpen || mobileHeaderHidden ? "true" : undefined}
        inert={mobileMenuOpen || mobileHeaderHidden ? true : undefined}>
        <a
          href="#inicio"
          className="cine-mobile-header__brand"
          aria-label="ELBEDI AI — Inicio"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("inicio", "mobile-brand");
          }}>
          <img
            src="/images/favicon.svg"
            width="38"
            height="38"
            alt="Isotipo ELBEDI AI"
          />
        </a>
        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="cine-mobile-header__toggle"
          aria-label="Abrir menú de navegación"
          aria-expanded={mobileMenuOpen}
          aria-controls="cine-mobile-navigation"
          onClick={() => setMobileMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      {mobileMenuOpen ? (
        <div
          ref={mobileDialogRef}
          id="cine-mobile-navigation"
          className="cine-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación del sitio"
          data-lenis-prevent>
          <div className="cine-mobile-menu__topbar">
            <a
              href="#inicio"
              className="cine-mobile-menu__brand"
              aria-label="ELBEDI AI — Inicio"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("inicio", "mobile-menu-brand");
              }}>
              <img
                src="/images/favicon.svg"
                width="42"
                height="42"
                alt="Isotipo ELBEDI AI"
              />
            </a>
            <button
              type="button"
              className="cine-mobile-menu__close"
              aria-label="Cerrar menú de navegación"
              onClick={() => setMobileMenuOpen(false)}>
              <Icon name="close" size={25} />
            </button>
          </div>

          <nav className="cine-mobile-menu__navigation" aria-label="Secciones">
            <p>Explorar la experiencia</p>
            <div className="cine-mobile-menu__grid">
              {SECTIONS.map((section, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={section.id}
                    type="button"
                    className={`cine-mobile-menu__item ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    disabled={transitioning}
                    onClick={() => navigateTo(section.id, "mobile-nav")}>
                    <Icon name={section.icon} size={27} />
                    <span>{section.name}</span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
