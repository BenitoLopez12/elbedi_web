// Capítulo 1 — Apertura: la promesa del estudio.

import { HERO } from "@/content/experience.js";
import { Kicker, Title, Lead, Accent } from "@/experience/ui/SectionShell.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import Icon from "@/experience/ui/icons.jsx";
import { dispatchIntent } from "@/experience/state/experienceStore.js";

export default function HeroSection() {
  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 pt-16 pb-32 text-center md:text-left">
      {/* Imagen de apoyo: mano con teléfono (la misma del hero de /websites).
          Vive detrás del texto (z-0) para que el copy siempre tenga prioridad. */}
      <div
        data-cine="panel"
        data-cine-order={2}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden max-h-[76svh] items-end justify-end lg:flex lg:w-[44%]">
        <img
          src="/images/hero-phone.webp"
          alt=""
          aria-hidden="true"
          className="max-h-[76svh] w-auto max-w-full object-contain object-bottom"
        />
      </div>

      {/* Figuras decorativas de marca (las mismas de /websites), con
          flotación + rotación lenta de 360° (30s). */}
      <div
        data-cine="pop"
        data-cine-order={9}
        aria-hidden="true"
        className="target-float absolute right-[6%] top-[10%] z-[1] hidden w-20 2xl:w-28 lg:block">
        <img
          src="/images/cilindro.webp"
          alt=""
          aria-hidden="true"
          className="cine-spin w-full drop-shadow-2xl"
        />
      </div>
      <div
        data-cine="pop"
        data-cine-order={10}
        aria-hidden="true"
        className="target-float absolute bottom-[16%] right-[38%] z-[1] hidden w-16 2xl:w-22 lg:block"
        style={{ animationDelay: "-9000ms" }}>
        <img
          src="/images/diamante.webp"
          alt=""
          aria-hidden="true"
          className="cine-spin w-full drop-shadow-2xl"
          style={{ animationDelay: "-15s", animationDirection: "reverse" }}
        />
      </div>

      <div className="relative z-10 md:max-w-3xl">
        <Kicker>ELBEDI · Estudio de desarrollo e IA</Kicker>
        <Title as="h1" className="text-5xl md:text-6xl 2xl:text-7xl">
          Construimos experiencias web y{" "}
          <Accent variant="warm">agentes de IA</Accent> que trabajan por tu
          negocio.
        </Title>
        <Lead className="mx-auto md:mx-0">{HERO.description}</Lead>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <ActionButton
            order={5}
            variant="cool"
            onClick={() =>
              dispatchIntent({ type: "navigate", section: "websites" })
            }>
            {HERO.ctaPrimary}
            <Icon name="arrow" size={16} />
          </ActionButton>
          <ActionButton
            order={6}
            variant="glass"
            onClick={() => dispatchIntent({ type: "chat", open: true })}>
            <Icon name="bot" size={17} />
            {HERO.ctaSecondary}
          </ActionButton>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start">
          {HERO.chips.map((chip, i) => (
            <li
              key={chip}
              data-cine="pop"
              data-cine-order={7 + i * 0.1}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* Indicador: el scroll es el mando */}
      <div
        data-cine="rise"
        data-cine-order={12}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-white/70">
          Desliza para explorar
        </span>
        <span className="mx-auto block h-8 w-[1.5px] overflow-hidden rounded-full bg-white/25">
          <span className="block h-3 w-full animate-[scrollhint_1.8s_ease-in-out_infinite] rounded-full bg-white/90" />
        </span>
      </div>
    </div>
  );
}
