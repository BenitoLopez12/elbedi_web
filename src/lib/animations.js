import { gsap } from "gsap";

export function fadeUp(element, { delay = 0, duration = 0.8, y = 40 } = {}) {
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: "power3.out" },
  );
}
