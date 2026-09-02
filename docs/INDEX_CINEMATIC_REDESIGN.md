# Rediseño cinematográfico del index de ELBEDI

## Alcance

Este rediseño afecta exclusivamente al index (`/`). La ruta `/websites`, su layout y sus secciones permanecen independientes y sin modificaciones.

## Investigación aplicada

La solución toma como base:

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) para coreografías ligadas al progreso, capítulos sticky y sincronización precisa.
- [Lenis](https://github.com/darkroomengineering/lenis) para interpolar el desplazamiento sin secuestrar la navegación nativa.
- [Web animation performance](https://web.dev/articles/animations-and-performance) para priorizar `transform` y `opacity` sobre propiedades que fuerzan layout.
- [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) como referencia de progresión y mejora progresiva.
- `prefers-reduced-motion` como contrato de accesibilidad y ruta alternativa sin movimiento complejo.

La dirección visual adopta profundidad por capas, tipografía de gran escala, interfaces de producto integradas en escena, iluminación de marca y movimiento con función narrativa. No se agregaron efectos que no ayudaran a explicar un servicio.

## Storytelling

La experiencia se organiza en tres actos:

1. **Despertar:** el Hero presenta a ELBEDI como sistema operativo de inteligencia para negocios.
2. **Demostración:** cuatro capítulos sticky explican sitios web cinematográficos, WhatsApp con IA, sistemas agénticos y analítica con IA.
3. **Conversión:** proceso, manifiesto, preguntas frecuentes y contacto reducen incertidumbre y conducen al agente o WhatsApp.

Cada capítulo tiene un mensaje principal, una composición propia y un producto visual. La progresión habitual es: anticipación, entrada, lectura, demostración y salida.

## Arquitectura de movimiento

`useCinematicScroll.js` es el director central:

- Una sola instancia de Lenis.
- Lenis avanza desde `gsap.ticker`; no existe un segundo `requestAnimationFrame`.
- ScrollTrigger recibe cada actualización de Lenis.
- El Hero usa una entrada temporal independiente; después responde al scroll para evitar contenido invisible al cargar.
- Cada servicio usa una timeline encapsulada con entrada, revelado de beneficios, respiración 3D y salida.
- El store publica la sección activa para navegación, fondos y agente.
- Al cambiar el ancho del chat se recalculan las métricas de ScrollTrigger.
- Todo se registra dentro de `gsap.context()` y se revierte al desmontar.

## Sistema visual y 3D

- El “núcleo de IA” del Hero usa perspectiva CSS, planos, órbitas, profundidad Z y parallax de puntero.
- Los mockups usan marcos de producto existentes y `TiltFrame` para profundidad reactiva.
- El fondo cinematográfico conserva los degradados de marca y cambia por sección.
- Las figuras originales `cilindro.webp` y `diamante.webp` permanecen como activos de marca.
- La jerarquía de capas separa fondo, contenido, navegación, viñeta y agente.

## Integración con el agente

La navegación visual y el agente comparten `experienceStore` y `dispatchIntent()`:

- El modelo solo propone una sección permitida.
- El cliente valida el identificador contra `SECTION_IDS`.
- El navegador cinematográfico desplaza Lenis hasta el capítulo correspondiente.
- El agente permanece sticky en escritorio y se convierte en sheet móvil.
- Su área interna usa `data-lenis-prevent`, evitando que el scroll de mensajes mueva la historia principal.

## Responsive y accesibilidad

- Escritorio: rail lateral, agente integrado y composiciones en dos columnas.
- Tablet: agente flotante, escenas apiladas y mockups centrados.
- Móvil: dock inferior, títulos resegmentados, CTA compactos y profundidad decorativa sin bloquear lectura.
- No existe overflow horizontal.
- Con `prefers-reduced-motion`, se elimina Lenis y se muestran todos los elementos sin desenfoques ni desplazamientos.
- La navegación mantiene botones y etiquetas accesibles; FAQ conserva controles semánticos.

## Rendimiento

- Animaciones principales limitadas a `transform`, `opacity` y filtros puntuales.
- `will-change` se concentra en objetos que realmente se animan.
- Sin video pesado ni WebGL obligatorio para el primer render.
- Los recursos visuales existentes se reutilizan y los mockups son DOM/SVG.
- La compilación sigue siendo estática mediante Astro.

## Validación

- Build de Astro completado para `/` y `/websites`.
- Prueba real con Chrome a 1440×900 y 390×844.
- Scroll horizontal medido: `scrollWidth === innerWidth`.
- Capítulos de servicios comprobados en estados intermedios de timeline.
- Apertura del chat contemplada en las mediciones de ScrollTrigger.
