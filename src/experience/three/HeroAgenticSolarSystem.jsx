import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";

const AgenticSolarScene = lazy(() => import("./AgenticSolarScene.jsx"));

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", { powerPreference: "high-performance" }) ||
      canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function detectQuality() {
  const memory = navigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const width = window.innerWidth;

  if (width < 768 || memory <= 4 || cores <= 4) return "lite";
  if (width < 1280 || memory <= 8 || cores <= 8) return "balanced";
  return "high";
}

class SolarSceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function SolarFallback() {
  return (
    <div className="cine-solar__fallback" aria-hidden="true">
      {[18, 29, 40, 51, 63, 75, 87, 99].map((size, index) => (
        <i
          key={size}
          className="cine-solar__fallback-orbit"
          style={{
            "--orbit-size": `${size}%`,
            "--orbit-delay": `${index * -1.4}s`,
          }}>
          <span />
        </i>
      ))}
      <div className="cine-solar__fallback-core">
        <span />
        <i />
        <i />
      </div>
    </div>
  );
}

export default function HeroAgenticSolarSystem() {
  const [runtime, setRuntime] = useState(null);
  const [allowSceneLoad, setAllowSceneLoad] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const containerRef = useRef(null);
  const resizeFrame = useRef(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canRender = detectWebGL();
    const saveData = navigator.connection?.saveData === true;

    const updateRuntime = () => {
      cancelAnimationFrame(resizeFrame.current);
      resizeFrame.current = requestAnimationFrame(() => {
        setRuntime({
          canRender: canRender && !motionQuery.matches && !saveData,
          quality: detectQuality(),
          compactViewport: window.innerWidth <= 1100,
          reducedMotion: motionQuery.matches,
        });
      });
    };

    updateRuntime();
    window.addEventListener("resize", updateRuntime, { passive: true });
    motionQuery.addEventListener?.("change", updateRuntime);

    return () => {
      cancelAnimationFrame(resizeFrame.current);
      window.removeEventListener("resize", updateRuntime);
      motionQuery.removeEventListener?.("change", updateRuntime);
    };
  }, []);

  useEffect(() => {
    let idleHandle;
    let timeoutHandle;

    const loadSceneWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(
          () => setAllowSceneLoad(true),
          { timeout: 1800 },
        );
      } else {
        timeoutHandle = window.setTimeout(() => setAllowSceneLoad(true), 450);
      }
    };

    if (document.readyState === "complete") {
      loadSceneWhenIdle();
    } else {
      window.addEventListener("load", loadSceneWhenIdle, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadSceneWhenIdle);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { threshold: 0.01, rootMargin: "12% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={containerRef}
      data-hero-solar
      className={`cine-hero__solar ${sceneReady ? "is-scene-ready" : ""}`}
      role="img"
      aria-label="Sistema solar agéntico: un orquestador central coordina ocho agentes de inteligencia artificial especializados.">
      <div className="cine-hero__solar-enter" data-hero-solar-enter>
        <div className="cine-solar__aura" aria-hidden="true" />
        <SolarFallback />

        {runtime?.canRender && allowSceneLoad && (
          <SolarSceneBoundary onFailure={() => setSceneReady(false)}>
            <Suspense fallback={null}>
              <AgenticSolarScene
                quality={runtime.quality}
                compactViewport={runtime.compactViewport}
                reducedMotion={runtime.reducedMotion}
                active={sceneActive}
                onReady={() => setSceneReady(true)}
              />
            </Suspense>
          </SolarSceneBoundary>
        )}

        <div className="cine-solar__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </aside>
  );
}
