# Auditoría maestra de animaciones GSAP + Lenis

**Proyecto:** ELBEDI — index cinematográfico  
**Fecha:** 25 de julio de 2026  
**Alcance:** página principal `/`; la subpágina `/websites` se mantuvo sin cambios.

## 1. Resultado ejecutivo

La falla crítica de las escenas 01–04 no era un problema aislado de opacidad. Era
la combinación de cuatro decisiones incompatibles:

1. Los `fromTo()` aplicaban estados iniciales invisibles al construir las
   timelines.
2. El escenario `sticky` crecía más que el viewport, aunque su contenido se
   recortaba con `overflow: hidden`.
3. La animación de salida comenzaba antes de que la CTA inferior entrara en el
   viewport.
4. Una misma composición sticky de escritorio se conservaba en tablet y móvil,
   donde el contenido necesariamente requiere flujo vertical.

La arquitectura corregida mantiene visibles y accionables el texto, beneficios
y CTA durante el 100 % del recorrido de cada servicio. El movimiento
cinematográfico queda concentrado en transformaciones, profundidad, deriva
visual y composición, sin utilizar la ilegibilidad como transición.

## 2. Investigación técnica aplicada

### GSAP y ScrollTrigger

- Una timeline asociada a `scrub` distribuye su duración total sobre la distancia
  de scroll; por tanto, la posición relativa de cada tween determina en qué
  porcentaje real empieza una salida.
- `from()` y `fromTo()` pueden aplicar inmediatamente el estado inicial. Un
  `autoAlpha: 0` en contenido esencial deja la interfaz vacía antes de alcanzar
  el trigger o al entrar por un enlace directo.
- `invalidateOnRefresh: true` permite recalcular valores dependientes del layout.
- `ScrollTrigger.refresh(true)` difiere de forma segura el recálculo cuando
  existe momentum de scroll, evitando saltos durante un cambio de tamaño.
- `gsap.context()` y la destrucción explícita de tweens/listeners son necesarias
  para evitar animaciones huérfanas en React.
- `gsap.quickTo()` es la opción apropiada para entradas de alta frecuencia como
  `pointermove`; crear un `gsap.to()` por evento genera acumulación de tweens.

Referencias oficiales:

- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [ScrollTrigger.refresh()](https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh%28%29/)
- [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/)
- [gsap.context()](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)

### Lenis

La integración activa sigue el patrón oficial:

1. `lenis.on("scroll", ScrollTrigger.update)`.
2. El ticker de GSAP ejecuta `lenis.raf(time * 1000)`.
3. `gsap.ticker.lagSmoothing(0)` evita que ambos relojes se desincronicen.
4. El ticker, el listener y Lenis se destruyen al desmontar.
5. Se restaura la configuración global del ticker al finalizar.

También se añadieron las reglas CSS recomendadas para contenido con
`data-lenis-prevent`, iframes y estado detenido.

Referencia oficial: [Lenis — README e integración GSAP](https://github.com/darkroomengineering/lenis).

## 3. Contrato visual de las escenas 01–04

### Escritorio, desde 1024 px

- Cada servicio mide `240svh`.
- Su escenario sticky mide exactamente `100svh`.
- El copy, beneficios y CTA empiezan con opacidad `1`.
- El mockup empieza en `0.78`, entra suavemente a `1` y conserva una deriva 3D
  muy sutil durante la meseta de lectura.
- No existe animación destructiva de salida.
- Las capas solo reciben `will-change` mientras su ScrollTrigger está activo.

### Tablet y móvil, hasta 1023 px

- Se abandona la composición sticky.
- El contenido vuelve a flujo documental real.
- `height: auto` y `overflow: visible` impiden recortes.
- La entrada es discreta, se reproduce una sola vez y nunca revierte a un
  estado oculto.

### Invariantes

En cualquier progreso, dirección o entrada directa:

- título: opacidad `1`, `filter: none`;
- CTA: opacidad `1`, visible y clicable;
- overflow horizontal: `0`;
- el viewport no contiene un intervalo vacío antes de la entrada;
- hacer scroll hacia atrás no reactiva una salida borrosa.

## 4. Iteración 1 — Corrección estructural

### Hallazgos

- El escenario medía entre 1165 y 1231 px dentro de un viewport de 900 px.
- En la escena 01, la CTA solo entraba cerca del 90 % del recorrido.
- En ese mismo punto ya tenía una opacidad aproximada de `0.18`.
- Al 100 %, la CTA y el copy estaban completamente ocultos.

### Implementación

- Se sustituyó la timeline de servicios por dos estrategias con
  `gsap.matchMedia()`:
  - timeline scroll-driven para escritorio;
  - reveal de una sola ejecución para tablet/móvil.
- Se fijó la altura del stage a `100svh`.
- Se compactaron tipografía y espaciados en laptops de poca altura.
- Se eliminó la salida que desenfocaba contenido esencial.
- Se añadió una meseta de lectura prolongada.
- Se marcó la CTA primaria con una clase estable para pruebas y layout.

### Resultado

En 1440×900, 1366×768 y 1280×720 las cuatro CTA permanecieron completamente
dentro del viewport y con opacidad `1` en progreso `0`, `0.5` y `1`.

## 5. Iteración 2 — Navegación, Lenis y breakpoints

### Hallazgos

- El enlace del logotipo enviaba `sectionId`, pero el bus de intents exige
  `section`; visualmente parecía clicable, aunque no navegaba.
- Faltaban reglas actuales de Lenis para contenedores preventivos.
- El refresh inmediato podía competir con el momentum al abrir/cerrar el chat.

### Implementación

- Se corrigió el contrato del logotipo y ahora usa el mismo bus validado que el
  rail y el agente.
- Se cambió a `ScrollTrigger.refresh(true)`.
- Se incorporó la configuración CSS oficial de Lenis.
- Se declararon `autoRaf: false` y `overscroll: false`.
- Se validó hash inicial, navegación directa, marcha atrás, resize y apertura
  del panel de IA.

### Resultado

- Todos los botones del rail aterrizan con la sección en `top ≈ 0`.
- El hash coincide con el servicio visible.
- Entrar directamente a `#agentes` conserva título y CTA visibles.
- En 900×900 y 390×844 el stage es relativo, no sticky, y usa flujo sin
  recortes.
- El logotipo vuelve a `#inicio` y deja `scrollY ≈ 0`.

## 6. Iteración 3 — Rendimiento, limpieza y accesibilidad

### Hallazgos

- `TiltFrame` creaba un tween nuevo del glare en cada `pointermove`.
- El fondo mantenía drift y parallax incluso con movimiento reducido.
- El selector React del store vivía dentro del motor de secciones legado,
  arrastrando una arquitectura que el index actual ya no ejecuta.
- Revels secundarios todavía usaban opacidad cero y reversa.

### Implementación

- Se reemplazaron los tweens por evento con `gsap.quickTo()`.
- El rectángulo del tilt se mide al entrar, no en cada frame.
- Se añadieron `killTweensOf()` y limpieza de listeners.
- El backdrop detiene drift y parallax bajo `prefers-reduced-motion`.
- Los reveals de proceso, estudio, FAQ y contacto tienen un piso de visibilidad,
  se ejecutan una sola vez y no desaparecen al retroceder.
- Se redujeron blur y desplazamientos de superficies grandes.
- Se extrajo `useExperienceSelector` a un módulo ligero del store; el rail y el
  chat ya no importan el motor legado.
- La navegación con movimiento reducido usa comportamiento inmediato.

### Resultado

- Ningún capítulo secundario presentó elementos con opacidad inferior a `0.65`
  al aterrizar por navegación directa.
- En modo reducido: Lenis no se instancia, no quedan elementos ocultos y todas
  las transformaciones se neutralizan.
- No se detectaron errores de página ni consola en el build de producción.

## 7. Matriz final de validación

| Prueba | Resultado |
|---|---|
| Build Astro de producción | Correcto |
| `/` en 1440×900 | HTTP 200, sticky 900 px, CTA visible |
| `/` en 1280×720 | HTTP 200, sticky 720 px, CTA visible |
| `/` en 900×900 | HTTP 200, flujo relativo, sin recorte |
| `/` en 390×844 | HTTP 200, flujo relativo, sin overflow |
| Progreso 0/5/50/95/100 % en escenas 01–04 | Copy y CTA visibles |
| Navegación directa a los cuatro servicios | Hash y sección coherentes |
| Scroll inverso | Sin blur ni salida destructiva |
| `prefers-reduced-motion: reduce` | Sin Lenis y sin contenido oculto |
| Imágenes rotas | 0 |
| Overflow horizontal | 0 |
| Errores de consola en producción | 0 |
| Errores de página en producción | 0 |
| `/websites` | HTTP 200; sin cambios de implementación |

Durante la auditoría apareció un `504 Outdated Optimize Dep` exclusivo del
servidor Vite que estaba abierto mientras se generaba el build. Se confirmó que
no existía en producción y se reinició el servidor de desarrollo con
optimización forzada. La comprobación posterior quedó en HTTP 200 y sin errores.

## 8. Archivos principales modificados

- `src/experience/motion/useCinematicScroll.js`
- `src/styles/experience.css`
- `src/experience/Experience.jsx`
- `src/experience/ExperienceBackdrop.jsx`
- `src/experience/ui/TiltFrame.jsx`
- `src/experience/navigation/SmartScrollNav.jsx`
- `src/experience/state/useExperienceSelector.js`
- `src/experience/chat/ChatPanel.jsx` — solo cambió el origen del selector del store.

## 9. Posible cuarta iteración

No quedan defectos críticos en la matriz automatizada. Una cuarta iteración
sería de refinamiento, no de reparación:

1. Perfilado de GPU/CPU en hardware Android físico de gama media.
2. Ajuste artístico del mockup inicial de `0.78` a un valor más brillante si se
   desea mayor presencia antes del primer gesto.
3. Reducción opcional del solapamiento entre FAB/chat y mockup en pantallas de
   390 px.
4. Eliminación definitiva de los archivos del motor de secciones legado,
   actualmente fuera del grafo activo, después de confirmar que no se desea
   conservarlos como referencia.
5. Pruebas visuales de regresión basadas en capturas para CI.

## 10. Corrección posterior — salto al activar el reveal

Después de la auditoría se detectó un defecto de preparación de estado en los
reveals secundarios. Varias animaciones usaban `immediateRender: false`: el
elemento permanecía en su estado final mientras estaba fuera del trigger y, al
cruzarlo, GSAP aplicaba entonces el estado inicial. Visualmente parecía que el
contenido ya visible retrocedía, se desplazaba y volvía a entrar.

La corrección establece primero cada estado con `gsap.set()` y anima después
exclusivamente con `gsap.to()`. El contrato queda así:

1. Fuera del trigger: `autoAlpha: 0` y transformación inicial ya aplicada.
2. Al cruzar el trigger: transición continua hacia opacidad `1` y transform
   neutro.
3. Tras completarse: no existe reversa ni reaplicación del estado inicial.
4. En enlaces directos, ScrollTrigger sincroniza inmediatamente el progreso y
   deja visible el contenido que ya se encuentra dentro del viewport.

El mismo patrón se aplicó a entradas móviles de servicios, encabezados
`cine-reveal`, pasos del proceso, principios, FAQ y formulario de contacto.
