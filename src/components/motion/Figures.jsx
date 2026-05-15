import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Figures() {
  const figure1Ref = useRef(null);
  const figure1ImageRef = useRef(null);
  const figure2Ref = useRef(null);
  const rootRef = useRef(null);
  const activeSectionRef = useRef("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let rafId;

    const setActiveLandingSection = (sectionEl, index, direction) => {
      const sectionId =
        sectionEl.id || sectionEl.dataset.section || `section-${index + 1}`;

      if (!sectionEl.id && !sectionEl.dataset.section) {
        sectionEl.dataset.section = sectionId;
      }

      if (activeSectionRef.current === sectionId) return;

      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
      document.documentElement.setAttribute("data-active-section", sectionId);

      window.dispatchEvent(
        new CustomEvent("landing:section-change", {
          detail: {
            sectionId,
            direction,
            isBack: direction < 0,
          },
        }),
      );
    };

    const ctx = gsap.context(() => {
      const sections = Array.from(document.querySelectorAll("section"));

      if (!sections.length) {
        rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      sections.forEach((sectionEl, index) => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top 125%",
          end: "bottom 40%",
          onEnter: (self) =>
            setActiveLandingSection(sectionEl, index, self.direction),
          onEnterBack: (self) =>
            setActiveLandingSection(sectionEl, index, self.direction),
        });
      });

      const servicesSection = document.getElementById("services");
      const cylinder = figure1Ref.current;
      const cylinderImage = figure1ImageRef.current;
      const figuresContainer = rootRef.current;

      const diamont = figure2Ref.current;

      const pauseCylinderFloat = () => {
        if (!cylinderImage) return;
        gsap.killTweensOf(cylinderImage);
        cylinderImage.classList.add("figures-paused");
        gsap.to(cylinderImage, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const resumeCylinderFloat = () => {
        if (!cylinderImage) return;
        gsap.killTweensOf(cylinderImage);
        cylinderImage.classList.remove("figures-paused");
        gsap.set(cylinderImage, { clearProps: "transform" });
      };

      const setFiguresBehind = () => {
        if (!figuresContainer) return;
        figuresContainer.classList.remove("-z-1");
        figuresContainer.classList.add("z-10");
      };

      const resetFiguresLayer = () => {
        if (!figuresContainer) return;
        figuresContainer.classList.remove("z-10");
        figuresContainer.classList.add("-z-1");
      };

      if (servicesSection && cylinder) {
        const motionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 130%",
            end: "top 20%",
            scrub: true,
            onEnter: () => {
              gsap.set(cylinder, { zIndex: 99 });
              pauseCylinderFloat();
              setFiguresBehind();
            },
            onEnterBack: () => {
              gsap.set(cylinder, { zIndex: 99 });
              pauseCylinderFloat();
              setFiguresBehind();
            },
            onLeave: () => {
              resumeCylinderFloat();
              resetFiguresLayer();
            },
            onLeaveBack: () => {
              resumeCylinderFloat();
              resetFiguresLayer();
            },
          },
        });

        motionTimeline
          .to(cylinder, {
            scale: 19,
            left: "40%",
            top: "50%",
            rotate: 120,
            xPercent: -50,
            yPercent: -50,
            ease: "none",
            duration: 1,
          })
          .to(cylinder, {
            scale: 1,
            left: "90%",
            top: "45%",
            rotate: 180,
            xPercent: 0,
            yPercent: 0,
            ease: "none",
            duration: 1,
          })
          .to(
            diamont,
            {
              scale: 1,
              left: "8%",
              top: "45%",
              rotate: 180,
              xPercent: 0,
              yPercent: 0,
              ease: "none",
              duration: 1,
            },
            "-=1",
          );
      }

      const firstActiveSection = sections.find((sectionEl) => {
        const rect = sectionEl.getBoundingClientRect();
        const triggerY = window.innerHeight * 1.3;
        return rect.top <= triggerY && rect.bottom >= triggerY;
      });

      if (firstActiveSection) {
        const sectionIndex = sections.indexOf(firstActiveSection);
        setActiveLandingSection(firstActiveSection, sectionIndex, 1);
      }

      rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.documentElement.removeAttribute("data-active-section");
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        data-active-section={activeSection}
        className="fixed inset-0 w-full h-full overflow-hidden -z-1 pointer-events-none content-figures">
        <div
          ref={figure1Ref}
          className="absolute 2xl:w-16 w-11 top-45 left-10/100 will-change-transform">
          <img
            ref={figure1ImageRef}
            src="/images/cilindro.webp"
            alt=""
            className="figures w-full rotate-30"
          />
        </div>
        <div
          ref={figure2Ref}
          className="absolute 2xl:w-16 w-11 bottom-45 lg:left-30/100 left-10/100 will-change-transform">
          <img
            src="/images/diamante.webp"
            alt=""
            className="figures rotate-30 "
            style={{ animationDelay: "-20s" }}
          />
        </div>
      </div>
    </>
  );
}
