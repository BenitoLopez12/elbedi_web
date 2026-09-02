import { useSyncExternalStore } from "react";
import { experienceStore } from "@/experience/state/experienceStore.js";

/**
 * Suscripción React mínima al store de la experiencia.
 *
 * Vive separada del motor de secciones legado para que el chat y el rail
 * lateral no arrastren código de animación que el index scroll-driven ya no
 * ejecuta.
 */
export function useExperienceSelector(selector) {
  const getSnapshot = () => selector(experienceStore.get());
  return useSyncExternalStore(
    experienceStore.subscribe,
    getSnapshot,
    getSnapshot,
  );
}
