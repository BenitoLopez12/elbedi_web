import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Crea una timeline GSAP aislada para un mockup y la mantiene pausada cuando
 * sale del viewport. Los componentes continúan siendo estáticos y legibles
 * cuando el usuario solicita movimiento reducido.
 */
export default function useMockupTimeline(setup) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let timeline = null;
    const context = gsap.context(() => {
      timeline = setup({ root, gsap });
      timeline?.pause(0);
    }, root);

    if (!timeline) {
      context.revert();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeline.play();
        } else {
          timeline.pause();
        }
      },
      { threshold: 0.18, rootMargin: "10% 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [setup]);

  return rootRef;
}
