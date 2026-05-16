import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SectionContainer from "@/components/common/SectionContainer";
import LimitContainer from "@/components/common/LimitContainer";

const PROJECTS = [
  {
    key: "archive",
    title: "ARCHIVE_01",
    description:
      "Sitio web para fotógrafo con una propuesta visual inspirada en la estética neón de la CDMX. Integra animaciones cinematográficas con scroll, composición editorial y una experiencia inmersiva que resalta el trabajo fotográfico con una identidad fuerte y contemporánea.",
    background: "/images/projects/archive-bg.webp",
    laptop: "/images/projects/archive-lap.webp",
    tablet: "/images/projects/archive-tablet.webp",
    phone: "/images/projects/archive-phone.webp",
    accent: "bg-sky-500",
    backdropClass: "grayscale",
  },
  {
    key: "rupture",
    title: "Rupture Technologies",
    description:
      "Rediseño de sitio web corporativo enfocado en claridad, estructura comercial y percepción premium. Se reorganizó la información de servicios y se construyó una experiencia moderna alineada con una empresa tecnológica orientada a la eficiencia y el crecimiento.",
    background: "/images/projects/rup-bg.webp",
    laptop: "/images/projects/rup-lap.webp",
    tablet: "/images/projects/rup-tablet.webp",
    phone: "/images/projects/rup-phone.webp",
    accent: "bg-blue-500",
    backdropClass: "",
  },
  {
    key: "horloger",
    title: "Horloger Genevois",
    description:
      "Sitio web para una marca de relojería de lujo enfocado en transmitir exclusividad, identidad y curaduría de piezas de alto valor. Se trabajó una estética elegante y minimalista, con narrativa visual y estructura que refuerzan el concepto del tiempo como símbolo de carácter y selección intencional.",
    background: "/images/projects/hg-bg.webp",
    laptop: "/images/projects/hg-lap.webp",
    tablet: "/images/projects/hg-tablet.webp",
    phone: "/images/projects/hg-phone.webp",
    accent: "bg-slate-500",
    backdropClass: "",
  },
];

const wrapIndex = (index, length) => ((index % length) + length) % length;
const AUTOPLAY_DELAY = 9000;

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const rootRef = useRef(null);
  const tabletRef = useRef(null);
  const laptopRef = useRef(null);
  const phoneRef = useRef(null);
  const orbRef = useRef(null);
  const orbImageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const badgeRef = useRef(null);

  const directionRef = useRef(1);
  const introCompletedRef = useRef(false);
  const transitionTimelineRef = useRef(null);

  const activeProject = PROJECTS[activeIndex];

  const runEnterAnimation = (direction) => {
    transitionTimelineRef.current?.kill();

    transitionTimelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIsAnimating(false),
      })
      .fromTo(
        [titleRef.current, descriptionRef.current, badgeRef.current],
        {
          autoAlpha: 0,
          y: 40,
          x: direction > 0 ? 36 : -36,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.65,
        },
      )
      .fromTo(
        orbRef.current,
        {
          clipPath: "circle(18% at 50% 50%)",
          scale: 0.92,
          autoAlpha: 0.7,
        },
        {
          clipPath: "circle(72% at 50% 50%)",
          scale: 1,
          autoAlpha: 1,
          duration: 0.9,
        },
        "<",
      )
      .fromTo(
        orbImageRef.current,
        { scale: 1.18, filter: "blur(10px) brightness(0.5)" },
        { scale: 1, filter: "blur(1px) brightness(0.55)", duration: 0.9 },
        "<",
      )
      .fromTo(
        [tabletRef.current, laptopRef.current, phoneRef.current],
        {
          autoAlpha: 0,
          y: 56,
          x: (i) => (i === 1 ? 0 : i === 0 ? -26 : 26),
          rotate: (i) => (i === 1 ? 0 : i === 0 ? -5 : 5),
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.09,
        },
        "<0.12",
      );
  };

  const handleProjectChange = (direction) => {
    if (isAnimating || direction === 0) return;

    setIsAnimating(true);
    directionRef.current = direction;

    const nextIndex = wrapIndex(activeIndex + direction, PROJECTS.length);

    transitionTimelineRef.current?.kill();

    transitionTimelineRef.current = gsap
      .timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => setActiveIndex(nextIndex),
      })
      .to([titleRef.current, descriptionRef.current, badgeRef.current], {
        autoAlpha: 0,
        y: -18,
        duration: 0.24,
      })
      .to(
        [tabletRef.current, laptopRef.current, phoneRef.current],
        {
          autoAlpha: 0,
          x: direction > 0 ? -60 : 60,
          y: 20,
          scale: 0.9,
          filter: "blur(8px)",
          duration: 0.28,
          stagger: 0.04,
        },
        "<",
      )
      .to(
        orbRef.current,
        {
          clipPath: "circle(20% at 50% 50%)",
          scale: 0.93,
          autoAlpha: 0.75,
          duration: 0.3,
        },
        "<",
      )
      .to(
        orbImageRef.current,
        {
          scale: 1.12,
          filter: "blur(8px) brightness(0.45)",
          duration: 0.3,
        },
        "<",
      );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!introCompletedRef.current) {
        setIsAnimating(true);
        runEnterAnimation(1);
        introCompletedRef.current = true;
        return;
      }

      runEnterAnimation(directionRef.current);
    }, rootRef);

    return () => ctx.revert();
  }, [activeIndex]);

  useLayoutEffect(() => {
    return () => {
      transitionTimelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (PROJECTS.length <= 1) return;

    const autoplayTimeout = setTimeout(() => {
      if (!isAnimating) {
        handleProjectChange(1);
      }
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(autoplayTimeout);
  }, [activeIndex, isAnimating]);

  return (
    <SectionContainer id="portfolio">
      <LimitContainer>
        <div ref={rootRef} className="pt-50 pb-30">
          <div className="mt-12 rounded-3xl backdrop-blur-xs border border-white/15 bg-white/5 p-6 md:p-8 lg:p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div
                ref={badgeRef}
                className="sm:block hidden px-3 py-1 rounded-full border border-cyan-100/60 text-cyan-100 text-xs uppercase tracking-wide">
                Proyecto {activeIndex + 1} / {PROJECTS.length}
              </div>
              <h2 className="2xl:text-6xl xl:text-5xl text-4xl text-center">
                Casos de <span className="text-cyan-200"> Éxito </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleProjectChange(-1)}
                  disabled={isAnimating}
                  className="h-11 w-11 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition disabled:opacity-45 disabled:cursor-not-allowed"
                  aria-label="Proyecto anterior">
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleProjectChange(1)}
                  disabled={isAnimating}
                  className="h-11 w-11 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition disabled:opacity-45 disabled:cursor-not-allowed"
                  aria-label="Siguiente proyecto">
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-140">
              <div className="relative h-85 sm:h-105 md:h-125">
                <div
                  ref={orbRef}
                  className="absolute inset-0 m-auto h-full max-w-130 rounded-full aspect-square overflow-hidden shadow-2xl">
                  <div
                    className={`absolute inset-0 rounded-full blur-2xl opacity-80 ${activeProject.accent}`}
                  />
                  <img
                    ref={orbImageRef}
                    src={activeProject.background}
                    alt={`Fondo visual del proyecto ${activeProject.title}`}
                    title={`Fondo visual del proyecto ${activeProject.title}`}
                    className={`w-full h-full object-cover blur-xs brightness-50 opacity-75 ${activeProject.backdropClass}`}
                  />
                </div>

                <div className="absolute inset-0 flex justify-center items-center translate-y-12">
                  <img
                    ref={tabletRef}
                    src={activeProject.tablet}
                    alt={`${activeProject.title} vista tablet`}
                    title={`${activeProject.title} en tablet`}
                    className="h-39 sm:h-52 2xl:h-58 relative z-20 -mr-14"
                  />
                  <img
                    ref={laptopRef}
                    src={activeProject.laptop}
                    alt={`${activeProject.title} vista laptop`}
                    title={`${activeProject.title} en laptop`}
                    className="h-55 sm:h-72 2xl:h-80 relative z-10"
                  />
                  <img
                    ref={phoneRef}
                    src={activeProject.phone}
                    alt={`${activeProject.title} vista teléfono`}
                    title={`${activeProject.title} en teléfono`}
                    className="h-28 sm:h-40 2xl:h-46 relative z-20 -ml-16"
                  />
                </div>
              </div>

              <div>
                <h3
                  ref={titleRef}
                  className="text-4xl lg:text-5xl 2xl:text-6xl leading-tight">
                  {activeProject.title}
                </h3>
                <p
                  ref={descriptionRef}
                  className="mt-5 text-lg 2xl:text-xl leading-relaxed text-white/85">
                  {activeProject.description}
                </p>

                <div className="mt-8 flex items-center gap-2">
                  {PROJECTS.map((project, index) => (
                    <button
                      key={project.key}
                      type="button"
                      onClick={() => handleProjectChange(index - activeIndex)}
                      aria-label={`Ir al proyecto ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-10 bg-cyan-100"
                          : "w-2.5 bg-white/35 hover:bg-white/60"
                      }`}>
                      <span className="sr-only">{project.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LimitContainer>
    </SectionContainer>
  );
}
