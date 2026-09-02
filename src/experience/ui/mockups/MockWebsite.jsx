// Mockup vivo de un sitio cinematográfico (placeholder de captura real).

import useMockupTimeline from "@/experience/ui/mockups/useMockupTimeline.js";

function setupWebsiteTimeline({ root, gsap }) {
  const lines = gsap.utils.toArray(root.querySelectorAll("[data-web-line]"));
  const orbs = gsap.utils.toArray(root.querySelectorAll("[data-web-orb]"));
  const particles = gsap.utils.toArray(
    root.querySelectorAll("[data-web-particle]"),
  );
  const progress = root.querySelector("[data-web-progress]");
  const scan = root.querySelector("[data-web-scan]");
  const cursor = root.querySelector("[data-web-cursor]");
  const button = root.querySelector("[data-web-button]");

  gsap.set(lines, { transformOrigin: "left center" });
  gsap.set(orbs, { transformOrigin: "center center" });
  gsap.set(particles, { autoAlpha: 0, scale: 0.45 });
  gsap.set(progress, { scaleX: 0.08, transformOrigin: "left center" });
  gsap.set(scan, { autoAlpha: 0, xPercent: -140 });
  gsap.set(cursor, { autoAlpha: 0, x: 40, y: 72, scale: 0.82 });

  return gsap
    .timeline({
      repeat: -1,
      repeatDelay: 0.55,
      defaults: { ease: "power2.out" },
    })
    .fromTo(
      lines,
      { autoAlpha: 0.42, x: -10, scaleX: 0.88 },
      {
        autoAlpha: 1,
        x: 0,
        scaleX: 1,
        duration: 0.52,
        stagger: 0.07,
      },
      0.08,
    )
    .to(
      progress,
      { scaleX: 1, duration: 5.8, ease: "none" },
      0,
    )
    .to(
      orbs[0],
      {
        y: -13,
        rotation: 18,
        duration: 2.7,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0,
    )
    .to(
      orbs[1],
      {
        x: 9,
        y: 11,
        rotation: -14,
        duration: 2.35,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.12,
    )
    .to(
      particles,
      {
        autoAlpha: 0.9,
        scale: 1,
        y: (index) => (index % 2 ? -12 : 10),
        duration: 0.7,
        stagger: 0.13,
      },
      0.44,
    )
    .to(
      particles,
      {
        autoAlpha: 0,
        y: (index) => (index % 2 ? -28 : 25),
        duration: 1.25,
        stagger: 0.08,
        ease: "sine.in",
      },
      1.34,
    )
    .to(scan, { autoAlpha: 0.7, duration: 0.18 }, 0.78)
    .to(scan, { xPercent: 520, duration: 1.45, ease: "power1.inOut" }, 0.82)
    .to(scan, { autoAlpha: 0, duration: 0.2 }, 2.08)
    .to(cursor, { autoAlpha: 1, duration: 0.25 }, 1.42)
    .to(
      cursor,
      { x: 112, y: 112, scale: 1, duration: 1.05, ease: "power2.inOut" },
      1.48,
    )
    .to(
      button,
      {
        scale: 0.94,
        boxShadow: "0 0 26px rgba(255, 222, 111, 0.72)",
        duration: 0.16,
        yoyo: true,
        repeat: 1,
      },
      2.52,
    )
    .to(cursor, { autoAlpha: 0, x: 132, y: 96, duration: 0.4 }, 3.1);
}

export default function MockWebsite() {
  const rootRef = useMockupTimeline(setupWebsiteTimeline);

  return (
    <div
      ref={rootRef}
      className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1b1040] via-[#33125c] to-[#6d1257]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, rgba(255,158,207,0.5), transparent 45%), radial-gradient(circle at 20% 80%, rgba(120,206,255,0.4), transparent 40%)",
        }}
      />

      <div
        data-web-scan
        aria-hidden="true"
        className="absolute -left-1/4 top-0 z-20 h-full w-[18%] skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Header del sitio ficticio */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4">
        <div data-web-line className="h-3 w-16 rounded-full bg-white/80" />
        <div className="flex gap-3">
          <div data-web-line className="h-2 w-10 rounded-full bg-white/40" />
          <div data-web-line className="h-2 w-10 rounded-full bg-white/40" />
          <div data-web-line className="h-2 w-10 rounded-full bg-white/40" />
          <div data-web-line className="h-2 w-14 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Hero del sitio ficticio */}
      <div className="absolute left-6 top-[28%] z-10 max-w-[52%]">
        <div
          data-web-line
          className="mb-3 h-2 w-24 rounded-full bg-[#ffdc5b]/90"
        />
        <div
          data-web-line
          className="mb-2 h-5 w-full rounded-md bg-white/90"
        />
        <div
          data-web-line
          className="mb-2 h-5 w-4/5 rounded-md bg-white/90"
        />
        <div
          data-web-line
          className="mb-4 h-2.5 w-3/5 rounded-full bg-white/50"
        />
        <div className="flex gap-2">
          <div
            data-web-button
            className="h-7 w-24 rounded-lg bg-gradient-to-r from-[#FF9ECF] to-[#ffdc5b]"
          />
          <div
            data-web-line
            className="h-7 w-20 rounded-lg border border-white/50 bg-white/10"
          />
        </div>
      </div>

      {/* Elementos 3D y partículas vivas */}
      <div
        data-web-orb
        className="absolute right-[8%] top-[30%] h-32 w-32 rounded-3xl bg-gradient-to-br from-[#78CEFF] via-[#9b73d4] to-[#BD0B91] shadow-2xl"
        style={{ transform: "rotate(12deg)" }}
      />
      <div
        data-web-orb
        className="absolute right-[24%] top-[58%] h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FF9ECF] to-[#ffdc5b] opacity-90 shadow-xl"
      />
      {[
        ["right-[13%]", "top-[24%]", "bg-[#b9e8ff]"],
        ["right-[32%]", "top-[43%]", "bg-[#ffd0e5]"],
        ["right-[8%]", "top-[67%]", "bg-[#ffe995]"],
        ["right-[39%]", "top-[70%]", "bg-[#d7c3ff]"],
      ].map(([right, top, color], index) => (
        <i
          key={index}
          data-web-particle
          className={`absolute h-1.5 w-1.5 rounded-full shadow-[0_0_12px_currentColor] ${right} ${top} ${color}`}
          aria-hidden="true"
        />
      ))}

      <svg
        data-web-cursor
        aria-hidden="true"
        className="absolute left-[42%] top-[39%] z-30 h-6 w-6 drop-shadow-[0_4px_8px_rgba(0,0,0,.55)]"
        viewBox="0 0 24 24"
        fill="none">
        <path
          d="M4.4 2.8 19 13.1l-7.1 1.2-3.6 6.2L4.4 2.8Z"
          fill="white"
          stroke="#20123f"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>

      {/* Barra de progreso de scroll */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <div
            data-web-progress
            className="h-full w-full rounded-full bg-gradient-to-r from-[#78CEFF] to-[#FF9ECF]"
          />
        </div>
        <div className="h-2 w-12 rounded-full bg-white/40" />
      </div>
    </div>
  );
}
