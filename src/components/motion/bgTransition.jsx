import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_BACKGROUND_STOP = {
  svh: 0,
  transitionSvh: 0,
  centerColor: "#9b73d4",
  corners: {
    topLeft: "#3853F0",
    topRight: "#FF9ECF ",
    bottomLeft: "#78CEFF",
    bottomRight: "#BD0B91",
  },
  radial: {
    positionXPercent: 20,
    positionYPercent: 50,
    color: "rgba(0, 0, 0, 0.1)",
    sizePercent: 60,
  },
};

// Define aqui cada estado objetivo del fondo por distancia en svh.
// Regla: el primer stop debe ser 0 y, desde el segundo, svh es distancia respecto al stop anterior.
// transitionSvh indica cuantos svh dura la transicion para llegar a ese estado.
// Ejemplo: 123 y luego 149 => segundo cambio llega en 272svh acumulados.
const BACKGROUND_SCROLL_STOPS = [
  INITIAL_BACKGROUND_STOP,
  {
    svh: 200,
    transitionSvh: 100,
    centerColor: "#ec746b",
    corners: {
      topLeft: "#ff4a8c",
      topRight: "#ffdc5b",
      bottomLeft: "#ad0082",
      bottomRight: "#ffa442",
    },
    radial: {
      positionXPercent: 68,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0.42)",
      sizePercent: 44,
    },
  },
  {
    svh: 100,
    transitionSvh: 20,
    centerColor: "#4177c5",
    corners: {
      topLeft: "#2a9bbd",
      topRight: "#add3ff",
      bottomLeft: "#002aa6",
      bottomRight: "#293eb3",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
  {
    svh: 150,
    transitionSvh: 60,
    centerColor: "#7a3986",
    corners: {
      topLeft: "#75459e",
      topRight: "#da63c5",
      bottomLeft: "#472359",
      bottomRight: "#4e1559",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
  {
    svh: 150,
    transitionSvh: 60,
    centerColor: "#c2b542",
    corners: {
      topLeft: "#a89d39",
      topRight: "#827a2d",
      bottomLeft: "#ffef5e",
      bottomRight: "#4f4b24",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
  {
    svh: 300,
    transitionSvh: 60,
    centerColor: "#49387c",
    corners: {
      topLeft: "#2e95d1",
      topRight: "#420032",
      bottomLeft: "#000d57",
      bottomRight: "#bd3893",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
  {
    svh: 250,
    transitionSvh: 50,
    centerColor: "#454d95",
    corners: {
      topLeft: "#66f5ff",
      topRight: "#6d38bd",
      bottomLeft: "#0e1645",
      bottomRight: "#321b54",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
  {
    svh: 100,
    transitionSvh: 50,
    centerColor: "#805fb1",
    corners: {
      topLeft: "#2a3ca3",
      topRight: "#fe79bd",
      bottomLeft: "#57c0fe",
      bottomRight: "#800060",
    },
    radial: {
      positionXPercent: 20,
      positionYPercent: 60,
      color: "rgba(255, 255, 255, 0)",
      sizePercent: 44,
    },
  },
];

function toPositiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeStops(stops) {
  const preparedStops = [...stops].filter(
    (stop) => stop && Number.isFinite(Number(stop.svh)),
  );

  if (!preparedStops.length || Number(preparedStops[0].svh) !== 0) {
    preparedStops.unshift(INITIAL_BACKGROUND_STOP);
  }

  return preparedStops.reduce((acc, stop, index) => {
    const previous = acc[acc.length - 1] ?? INITIAL_BACKGROUND_STOP;
    const stopSvh = toPositiveNumber(stop.svh, index === 0 ? 0 : 100);
    const svh = index === 0 ? 0 : previous.svh + stopSvh;

    acc.push({
      svh,
      transitionSvh:
        index === 0 ? 0 : toPositiveNumber(stop.transitionSvh, 100),
      centerColor: stop.centerColor ?? previous.centerColor,
      corners: {
        topLeft: stop.corners?.topLeft ?? previous.corners.topLeft,
        topRight: stop.corners?.topRight ?? previous.corners.topRight,
        bottomRight: stop.corners?.bottomRight ?? previous.corners.bottomRight,
        bottomLeft: stop.corners?.bottomLeft ?? previous.corners.bottomLeft,
      },
      radial: {
        positionXPercent:
          stop.radial?.positionXPercent ?? previous.radial.positionXPercent,
        positionYPercent:
          stop.radial?.positionYPercent ?? previous.radial.positionYPercent,
        color: stop.radial?.color ?? previous.radial.color,
        sizePercent: stop.radial?.sizePercent ?? previous.radial.sizePercent,
      },
    });

    return acc;
  }, []);
}

function stopToCssVars(stop) {
  return {
    "--bg-center": stop.centerColor,
    "--corner-top-left": stop.corners.topLeft,
    "--corner-top-right": stop.corners.bottomLeft,
    "--corner-bottom-right": stop.corners.topRight,
    "--corner-bottom-left": stop.corners.bottomRight,
    "--radial-x": `${stop.radial.positionXPercent}%`,
    "--radial-y": `${stop.radial.positionYPercent}%`,
    "--radial-color": stop.radial.color,
    "--radial-size": `${stop.radial.sizePercent}%`,
  };
}

function interpolateNumber(start, end, progress) {
  return start + (end - start) * progress;
}

function interpolateStop(fromStop, toStop, progress) {
  const p = Math.max(0, Math.min(1, progress));

  return {
    ...toStop,
    centerColor: gsap.utils.interpolate(
      fromStop.centerColor,
      toStop.centerColor,
      p,
    ),
    corners: {
      topLeft: gsap.utils.interpolate(
        fromStop.corners.topLeft,
        toStop.corners.topLeft,
        p,
      ),
      topRight: gsap.utils.interpolate(
        fromStop.corners.topRight,
        toStop.corners.topRight,
        p,
      ),
      bottomRight: gsap.utils.interpolate(
        fromStop.corners.bottomRight,
        toStop.corners.bottomRight,
        p,
      ),
      bottomLeft: gsap.utils.interpolate(
        fromStop.corners.bottomLeft,
        toStop.corners.bottomLeft,
        p,
      ),
    },
    radial: {
      positionXPercent: interpolateNumber(
        fromStop.radial.positionXPercent,
        toStop.radial.positionXPercent,
        p,
      ),
      positionYPercent: interpolateNumber(
        fromStop.radial.positionYPercent,
        toStop.radial.positionYPercent,
        p,
      ),
      color: gsap.utils.interpolate(
        fromStop.radial.color,
        toStop.radial.color,
        p,
      ),
      sizePercent: interpolateNumber(
        fromStop.radial.sizePercent,
        toStop.radial.sizePercent,
        p,
      ),
    },
  };
}

function getStopAtSvh(stops, scrollSvh) {
  if (!stops.length) return INITIAL_BACKGROUND_STOP;
  if (scrollSvh <= 0) return stops[0];

  let previousStop = stops[0];

  for (let index = 1; index < stops.length; index += 1) {
    const currentStop = stops[index];
    const segmentStartSvh = previousStop.svh;
    const segmentEndSvh = currentStop.svh;
    const segmentSpan = Math.max(0, segmentEndSvh - segmentStartSvh);

    const effectiveTransitionSvh = Math.min(
      Math.max(0, currentStop.transitionSvh),
      segmentSpan,
    );

    const transitionStartSvh = Math.max(
      segmentStartSvh,
      segmentEndSvh - effectiveTransitionSvh,
    );

    if (scrollSvh < transitionStartSvh) {
      return previousStop;
    }

    if (scrollSvh <= segmentEndSvh) {
      if (effectiveTransitionSvh <= 0.0001) {
        return currentStop;
      }

      const progress =
        (scrollSvh - transitionStartSvh) / (segmentEndSvh - transitionStartSvh);
      return interpolateStop(previousStop, currentStop, progress);
    }

    previousStop = currentStop;
  }

  return stops[stops.length - 1];
}

export default function BgTransition() {
  const rootRef = useRef(null);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement || typeof window === "undefined") return undefined;

    const normalizedStops = normalizeStops(BACKGROUND_SCROLL_STOPS);
    const maxSvh = normalizedStops[normalizedStops.length - 1]?.svh ?? 0;

    gsap.set(rootElement, stopToCssVars(normalizedStops[0]));

    if (normalizedStops.length < 2 || maxSvh <= 0) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const renderFromProgress = (progress) => {
        const clampedProgress = Math.max(0, Math.min(1, progress));
        const currentSvh = clampedProgress * maxSvh;
        const currentStop = getStopAtSvh(normalizedStops, currentSvh);
        gsap.set(rootElement, stopToCssVars(currentStop));
      };

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: () => `+=${(window.innerHeight * maxSvh) / 100}`,
        scrub: true,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          const scrollY = Math.max(0, window.scrollY || 0);
          const range = (window.innerHeight * maxSvh) / 100;
          const progress = range > 0 ? Math.min(1, scrollY / range) : 0;
          renderFromProgress(progress);
        },
        onUpdate: (self) => {
          renderFromProgress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 w-full h-full -z-1 overflow-hidden pointer-events-none"
      style={{
        ...stopToCssVars(INITIAL_BACKGROUND_STOP),
        backgroundColor: INITIAL_BACKGROUND_STOP.centerColor,
      }}>
      <div className="">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "var(--bg-center, #9b73d4)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, var(--corner-top-left, #3853F0) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(45deg, var(--corner-top-right, #78CEFF) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(225deg, var(--corner-bottom-right, #FF9ECF) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(315deg, var(--corner-bottom-left, #BD0B91) 0%, transparent 50%)",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-full h-full bg-bottom-right bg-no-repeat"
        style={{
          backgroundImage:
            "radial-gradient(circle at var(--radial-x, 70%) var(--radial-y, 65%), var(--radial-color, rgba(255, 255, 255, 0.5)), transparent var(--radial-size, 40%))",
        }}
      />
    </div>
  );
}
