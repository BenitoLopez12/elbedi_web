import { initLenis } from "../lib/lenis.js";

const PRELOADER_DONE_EVENT = "elbedi:preloader:done";
const DEFAULT_LENIS_START_FALLBACK_MS = 7000;
const LENIS_FALLBACK_BUFFER_MS = 1200;

let hasLenisStarted = false;

function resolveLenisFallbackMs() {
  const expectedMaxMs = Number(window.__elbediPreloaderExpectedMaxMs);

  if (Number.isFinite(expectedMaxMs) && expectedMaxMs > 0) {
    return expectedMaxMs + LENIS_FALLBACK_BUFFER_MS;
  }

  return DEFAULT_LENIS_START_FALLBACK_MS;
}

function startLenis() {
  if (hasLenisStarted) return;
  hasLenisStarted = true;
  initLenis();
}

if (typeof window !== "undefined") {
  if (window.__elbediPreloaderDone) {
    startLenis();
  } else {
    window.addEventListener(PRELOADER_DONE_EVENT, startLenis, { once: true });
    window.setTimeout(startLenis, resolveLenisFallbackMs());
  }
}
