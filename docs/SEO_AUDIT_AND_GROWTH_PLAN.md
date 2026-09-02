# Auditoría, arquitectura y plan maestro SEO de ELBEDI

**Fecha de la intervención:** 11 de agosto de 2026  
**Dominio canónico:** `https://elbedi.com`  
**Plataforma:** Astro + React, repositorio en GitHub y despliegue en Vercel  
**Mercado principal:** México; atención remota para Latinoamérica y Estados Unidos

## 1. Resumen ejecutivo

La base técnica anterior tenía metadatos elementales, pero no una arquitectura capaz de posicionar de forma independiente las nuevas líneas de inteligencia artificial. La página principal intentaba explicar cuatro servicios dentro de una única experiencia cinematográfica, el sitemap solo contenía la portada y los datos estructurados describían a ELBEDI con tipos y activos que no correspondían a la entidad real.

La intervención convierte el sitio en dos capas complementarias:

1. **Capa de marca y experiencia:** el index conserva el storytelling interactivo y presenta la propuesta global del estudio.
2. **Capa de adquisición y conocimiento:** cada servicio cuenta con una URL estática, semántica, rápida, enlazada y con contenido verificable. Esta capa permite que buscadores y sistemas de respuesta recuperen un tema sin depender de interpretar toda la experiencia 3D.

No existe una configuración técnica capaz de garantizar la primera posición. Google, Bing y los sistemas de respuesta consideran competencia, autoridad externa, relevancia, historial, ubicación, intención y señales que no controla el código. El objetivo técnicamente responsable es eliminar barreras, aumentar comprensión, mejorar elegibilidad y establecer un sistema medible de crecimiento.

## 2. Hallazgos de la auditoría inicial

| Área | Estado inicial | Riesgo | Decisión |
|---|---|---:|---|
| Arquitectura | Una URL principal para cuatro intenciones de IA | Alto | Crear hub y páginas individuales por servicio |
| Sitemap | Archivo manual con una sola URL y fecha desactualizada | Alto | Generación automática desde las rutas de Astro |
| Entidad | Datos duplicados y `ProfessionalService` sin dirección verificable | Alto | Grafo único `Organization`, `WebSite`, `WebPage`, `Service` y `BreadcrumbList` |
| Logo en schema | Se utilizaba una portada de más de 4 MB como logo | Alto | Logo real como `ImageObject`; portadas sociales 1200 × 630 optimizadas |
| Metadatos | `meta keywords` masivo y sin valor para buscadores modernos | Medio | Eliminarlo y sustituirlo por contenido y enlaces internos reales |
| Open Graph | Imagen general sobredimensionada y sin dimensiones/alt explícitos | Medio | Dos imágenes sociales comprimidas, con tipo, tamaño y texto alternativo |
| Enlazado | Los servicios se alcanzaban principalmente mediante navegación por JavaScript | Alto | Añadir enlaces `<a href>` rastreables desde el index y las páginas temáticas |
| IA/search bots | Sin declaración explícita de bots de búsqueda de IA | Medio | Permitir OAI-SearchBot, Claude-SearchBot y PerplexityBot |
| Respuestas de IA | Sin documento de orientación y hechos canónicos | Medio | Añadir `llms.txt` y `llms-full.txt` como ayuda complementaria, no como factor garantizado |
| Observabilidad | Sin medición integrada de experiencia real en Vercel | Medio | Integrar Web Analytics y Speed Insights |
| Validación | Sin prueba automatizada de títulos, canonicals, schema o enlaces | Alto | Añadir `scripts/seo-audit.mjs` y comandos de validación |
| Accesibilidad | Sin enlace para saltar al contenido; campos sin metadatos de formulario | Medio | Añadir skip links, IDs de main, nombres y autocompletado |

## 3. Investigación aplicada

### 3.1 Google Search y experiencias de IA

Google indica que sus funciones de IA utilizan los mismos fundamentos de SEO: la página debe estar indexada, ser elegible para snippets, exponer contenido importante en texto, tener enlaces internos rastreables y utilizar datos estructurados coherentes con el contenido visible. No requiere un schema especial de “IA” ni un archivo de texto exclusivo para aparecer en AI Overviews o AI Mode.

Aplicación en ELBEDI:

- HTML estático prerenderizado para títulos, contenido comercial y preguntas frecuentes.
- Una URL canónica por intención de servicio.
- Enlaces internos HTML entre portada, hub, servicios, estudio y Websites.
- Datos estructurados que describen la misma información que puede leer una persona.
- Sitemap generado desde las rutas reales.

Fuentes oficiales:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Console: URL Inspection](https://support.google.com/webmasters/answer/9012289)

### 3.2 Bing y Copilot

Las directrices actuales de Bing conectan explícitamente la indexación tradicional con las respuestas fundamentadas de Copilot. Recomiendan URLs claras, sitemaps, enlaces rastreables, hechos verificables y consistencia de entidad. IndexNow acelera la notificación de cambios, pero requiere una clave y una operación de publicación externa.

Aplicación en ELBEDI:

- Arquitectura temática con una intención por URL.
- Entidad y contacto consistentes en todo el sitio.
- Sitemap compatible con Bing Webmaster Tools.
- Plan operativo para habilitar IndexNow después del despliegue; no se genera una clave ficticia dentro del repositorio.

Fuentes oficiales:

- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Bing IndexNow](https://www.bing.com/webmasters/help/indexnow-0z209wby)

### 3.3 ChatGPT, Claude y Perplexity

El acceso de búsqueda y el entrenamiento son controles diferentes. Para descubrimiento en respuestas se priorizan los bots de búsqueda o recuperación:

- `OAI-SearchBot`: inclusión en ChatGPT Search.
- `Claude-SearchBot`: descubrimiento para resultados de búsqueda de Claude.
- `PerplexityBot`: indexación para respuestas de Perplexity.
- `ChatGPT-User` y `Claude-User`: recuperación iniciada por una persona.

El sitio los permite expresamente en `robots.txt`. El contenido canónico y las páginas de servicio ofrecen fragmentos autocontenidos, definiciones, alcance, proceso, riesgos y preguntas frecuentes; esto mejora la recuperabilidad sin redactar texto artificialmente para un modelo específico.

Fuentes oficiales:

- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic web crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

### 3.4 `llms.txt`

`llms.txt` es una propuesta emergente, no un estándar de ranking. Google declara que no necesita un archivo especial para sus funciones de IA. Se incorporó como índice legible para agentes y como capa de orientación factual, sin considerarlo sustituto de HTML, sitemap, schema ni autoridad externa.

Fuentes:

- [Propuesta llms.txt](https://llmstxt.org/)
- [Lighthouse: llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)

### 3.5 SEMrush

La implementación se alinea con las familias de controles de Site Audit: rastreabilidad, HTTPS, metadatos, enlaces internos, markup, rendimiento y Core Web Vitals. Para AI Search Health también se cubren acceso de crawlers, claridad de entidad, orientación mediante `llms.txt` y frescura a través de sitemap generado.

Fuentes:

- [SEMrush Site Audit thematic reports](https://www.semrush.com/kb/959-site-audit-thematic-reports)
- [SEMrush AI Visibility Toolkit](https://www.semrush.com/kb/1496-getting-started-with-ai-visibility-toolkit)

## 4. Arquitectura de información implementada

```text
/
├── /servicios
│   ├── /servicios/sitios-web-inteligentes
│   ├── /servicios/agentes-ia-whatsapp
│   ├── /servicios/sistemas-agenticos
│   └── /servicios/analitica-web-ia
├── /estudio
└── /websites
```

### Función de cada nivel

- `/`: entidad, posicionamiento, narrativa, servicios, metodología, FAQ y conversión.
- `/servicios`: hub de intención amplia para “inteligencia artificial para empresas”.
- Páginas individuales: intención comercial específica, alcance, adecuación, resultados, proceso, entregables y FAQ.
- `/estudio`: identidad, enfoque, metodología y cobertura geográfica.
- `/websites`: oferta de sitios web comerciales. Su UI se conserva; solo se normalizan metadatos y schema.

## 5. Implementaciones técnicas

### 5.1 Metadatos

- Título y descripción únicos por URL.
- Canonical absoluto y consistente sin slash final, excepto la raíz.
- Directivas `index,follow` y límites amplios de snippet/preview.
- Open Graph y Twitter Cards con imagen, texto alternativo, tipo y dimensiones.
- Verificaciones opcionales mediante `PUBLIC_GOOGLE_SITE_VERIFICATION` y `PUBLIC_BING_SITE_VERIFICATION`.
- Eliminación completa de `meta keywords`.
- Preload de las dos fuentes locales utilizadas en el primer render.

### 5.2 Datos estructurados

El grafo usa identificadores permanentes:

- `https://elbedi.com/#organization`
- `https://elbedi.com/#website`
- `URL#webpage`
- `URL#service`
- `URL#faq`

Tipos usados según contexto:

- `Organization`
- `WebSite`
- `WebPage`, `CollectionPage` o `AboutPage`
- `Service`
- `ItemList`
- `BreadcrumbList`
- `FAQPage` cuando las preguntas también aparecen visibles

Se evita declarar `LocalBusiness` o dirección postal porque no existe una dirección pública confirmada. Tampoco se incluyen valoraciones, precios, clientes o certificaciones no verificadas.

### 5.3 Rastreo e indexación

- `@astrojs/sitemap` genera el sitemap después de cada build.
- `/sitemap.xml` redirige permanentemente al índice generado para conservar compatibilidad con envíos anteriores.
- `robots.txt` declara el sitemap y acceso de bots convencionales y de búsqueda con IA.
- Página 404 útil con `noindex,follow`.
- Enlaces internos reales, no únicamente eventos de React.

### 5.4 Vercel

- Vercel Web Analytics para tráfico sin instrumentación invasiva.
- Speed Insights para Core Web Vitals de usuarios reales.
- Encabezados de seguridad básicos.
- Caché de larga duración para fuentes y caché revalidable para imágenes.
- Redirección compatible con sitemap anterior.

La medición solo comenzará después de activar las funciones correspondientes en el proyecto de Vercel y publicar el código.

### 5.5 Rendimiento y experiencia

Objetivos de campo al percentil 75:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

Fuente: [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

La experiencia principal es visualmente intensiva. Las páginas temáticas se diseñaron como documentos estáticos y ligeros para reducir dependencia de Three.js, GSAP y React en entradas orgánicas específicas. Esto evita que toda intención de búsqueda pague el costo de la escena 3D.

### 5.6 Accesibilidad que afecta descubrimiento y conversión

- Enlace “Ir al contenido”.
- `main` identificable y enfocable.
- Un H1 por documento.
- Jerarquía semántica de secciones.
- Breadcrumb visible.
- Campos del formulario con `name` y `autocomplete`.
- Dimensiones explícitas para logotipos e iconos compartidos.
- Respeto de `prefers-reduced-motion` en páginas temáticas.

### 5.7 Cadena de suministro y reproducibilidad

La primera compilación limpia reveló que la integración anterior de Tailwind
dependía de una resolución transitiva de Vite y podía fallar en Vercel. Se migró
Tailwind 4 a su integración PostCSS oficial, se fijaron overrides para cinco
dependencias transitivas vulnerables y se sincronizó el lockfile. El resultado de
`npm audit` pasó de cuatro vulnerabilidades altas y una baja a cero.

La escena 3D continúa generando un chunk superior a 500 KB. Para proteger la ruta
crítica, su importación se difiere hasta después de `load` y un periodo idle; la
composición CSS queda visible inmediatamente. En conexiones con `saveData` o con
movimiento reducido se conserva el fallback y no se descarga la escena WebGL.

## 6. Matriz de preparación para SEMrush Site Audit

| Control | Implementación | Verificación posterior al despliegue |
|---|---|---|
| HTTPS | Vercel + HSTS | Confirmar certificado y cadenas de redirección |
| Crawlability | robots abierto, enlaces HTML, sitemap | Crawl con SemrushBot y renderizado JS |
| Status codes | Rutas estáticas + 404 dedicada | Revisar 3xx/4xx externos e internos |
| Canonical | Una canonical absoluta por página | Confirmar que producción no inyecte duplicados |
| Titles/descriptions | Únicos por intención | Revisar truncamiento y canibalización |
| H1/estructura | Un H1 y H2/H3 semánticos | Validar HTML final |
| Structured data | Grafo JSON-LD centralizado | Schema Markup Validator y Rich Results Test |
| Internal linking | Hub, servicios relacionados, index | Profundidad máxima objetivo: 2 clics |
| Images | OG optimizadas y dimensiones compartidas | Revisar imágenes legacy de `/websites` |
| Sitemap | Generado automáticamente | Enviar `sitemap-index.xml` |
| Core Web Vitals | Speed Insights integrado | Medir datos de campo después de 28 días |
| AI crawler access | Search bots permitidos | Comprobar logs y AI Search Health |
| llms.txt | Índice y contexto ampliado | Verificar 200, `text/plain`, URLs canónicas |

### Configuración recomendada del proyecto SEMrush

1. Scope: `elbedi.com`, HTTPS, todas las subcarpetas.
2. Source: sitemap + crawl del sitio.
3. User agent: SemrushBot Desktop; segunda corrida Mobile.
4. Render JavaScript: activado para comparar el index interactivo con las páginas estáticas.
5. Límite inicial: 100 URLs, suficiente para detectar duplicados y activos enlazados.
6. Programación: semanal durante las primeras ocho semanas; luego quincenal.
7. Conectar Google Search Console y Analytics únicamente con una cuenta autorizada.

Una “salud 100%” no debe obtenerse ocultando páginas o ignorando avisos útiles. Los hallazgos deben clasificarse por impacto, validez en esta arquitectura y riesgo de regresión.

## 7. Plan de presencia para buscadores y respuestas de IA

### Fase 1 — Entidad y consistencia

- Mantener exactamente el mismo nombre, dominio, teléfono, correo y descripción breve en LinkedIn, Facebook, Instagram, TikTok y directorios legítimos.
- Actualizar perfiles externos que aún describan a ELBEDI exclusivamente como agencia web.
- Crear o completar Google Business Profile solo si la empresa cumple las reglas de ubicación o área de servicio; nunca inventar una dirección.
- Vincular desde perfiles externos a la URL temática más relevante, no siempre a la portada.

### Fase 2 — Evidencia propia

Publicar casos de estudio con:

- problema inicial;
- alcance y restricciones;
- arquitectura a nivel comprensible;
- metodología de evaluación;
- resultados que puedan documentarse;
- fecha, autor y cambios posteriores.

No publicar cifras sin evidencia. Para sistemas de IA, explicar también fallos detectados, mecanismos de control y condiciones donde el sistema escala a una persona.

### Fase 3 — Autoridad externa

- Obtener menciones editoriales y enlaces desde clientes, socios tecnológicos, cámaras, comunidades y medios relevantes.
- Participar con contenido técnico original en comunidades de IA empresarial en México.
- Mantener directorios de calidad actualizados y eliminar descripciones inconsistentes.
- Evitar compra masiva de enlaces, redes privadas, contenido duplicado o reseñas fabricadas.

### Fase 4 — Demanda y prompts

Construir un conjunto de consultas reales y medir mensualmente:

- “agentes de IA para WhatsApp en México”;
- “empresa de sistemas agénticos en México”;
- “implementación de inteligencia artificial para empresas”;
- “analítica web con inteligencia artificial”;
- consultas de marca y comparativas pertinentes.

Para cada prompt se registra motor, fecha, respuesta, fuentes citadas, posición relativa, exactitud y URL mencionada. Las respuestas de IA son variables; una sola prueba no constituye una métrica.

## 8. Operación después del despliegue

### Google Search Console

1. Verificar la propiedad de dominio mediante DNS o configurar `PUBLIC_GOOGLE_SITE_VERIFICATION` en Vercel.
2. Enviar `https://elbedi.com/sitemap-index.xml`.
3. Inspeccionar la portada, el hub y las cuatro páginas de servicio.
4. Solicitar indexación solo de páginas canónicas importantes, sin automatizar solicitudes masivas.
5. Revisar Page Indexing, Core Web Vitals, Enhancements y consultas cada semana durante el lanzamiento.

### Bing Webmaster Tools

1. Importar la propiedad desde Search Console o verificarla con `PUBLIC_BING_SITE_VERIFICATION`.
2. Enviar el sitemap.
3. Validar robots y URL Inspection.
4. Crear una clave IndexNow y notificar URLs únicamente al publicar, actualizar o retirar contenido.

### Vercel

1. Activar Web Analytics y Speed Insights en el dashboard.
2. Verificar que Production Branch apunte a la rama correcta de GitHub.
3. Añadir variables de verificación solo en Production y Preview cuando corresponda.
4. Probar encabezados, redirecciones y sitemap en la URL de producción.

## 9. Roadmap editorial de 90 días

### Primer mes

- Publicar un caso de estudio verificable por cada capacidad que ya tenga evidencia.
- Crear una guía sobre cómo evaluar un caso de uso de IA empresarial.
- Crear una guía sobre límites, evaluación y escalamiento humano en agentes.
- Actualizar perfiles y directorios con el nuevo posicionamiento.

### Segundo mes

- Publicar una comparación práctica entre automatización determinista y sistemas agénticos.
- Publicar una guía de preparación de conocimiento para un agente de WhatsApp.
- Publicar una guía de taxonomía de eventos para analítica asistida.
- Conseguir menciones editoriales relacionadas con los materiales publicados.

### Tercer mes

- Actualizar páginas con preguntas extraídas de Search Console y conversaciones comerciales.
- Publicar resultados y aprendizajes de implementaciones autorizadas.
- Comparar visibilidad en Google, Bing, ChatGPT, Claude y Perplexity.
- Consolidar o expandir contenido según impresiones, clics, citas y oportunidades reales.

## 10. Sistema de medición

### Indicadores técnicos

- Páginas indexables válidas.
- Errores de sitemap, canonical y schema.
- Core Web Vitals por plantilla.
- Profundidad de clic y enlaces internos rotos.
- Salud de Site Audit y errores nuevos por despliegue.

### Indicadores orgánicos

- Impresiones y clics sin marca por servicio.
- Consultas en top 3, top 10 y top 20.
- Páginas que generan conversaciones por WhatsApp.
- Conversión orgánica asistida y directa.
- Dominios relevantes que mencionan o enlazan a ELBEDI.

### Indicadores de respuestas de IA

- Porcentaje de prompts donde ELBEDI aparece.
- Porcentaje de respuestas que citan `elbedi.com`.
- Exactitud factual de la descripción.
- Servicio y URL citados.
- Comparación por motor y mes.

## 11. Pruebas automatizadas del repositorio

Comandos:

```bash
npm run build
npm run seo:audit
```

`seo:audit` valida:

- existencia de todas las rutas previstas;
- un título, una descripción, una canonical y un H1 por página;
- idioma `es-MX`;
- directivas de indexación;
- Open Graph y Twitter Cards;
- JSON-LD sintácticamente válido;
- imágenes sin atributo `alt`;
- enlaces internos construidos;
- URLs dentro del sitemap;
- robots y bots de búsqueda con IA;
- `llms.txt`, `security.txt`, portadas OG y `vercel.json`.

Las pruebas estáticas detectan regresiones del repositorio, pero no sustituyen un crawl sobre producción. Redirecciones, encabezados, certificados y datos de campo deben verificarse después del despliegue en Vercel.

## 12. Segunda iteración crítica

La segunda fase se concentra en lo que no puede resolverse solo con metadatos:

1. Comparar el HTML construido con el HTML accesible a un crawler.
2. Revisar enlaces y activos legacy de `/websites` sin modificar su diseño.
3. Auditar peso de JavaScript y bloqueo del hilo principal en el index 3D.
4. Confirmar que el preloader no retrase LCP ni oculte contenido en dispositivos reales.
5. Revisar resultados de campo cuando Vercel acumule tráfico suficiente.
6. Validar Search Console, Bing y SEMrush sobre producción.
7. Priorizar contenido y autoridad externa según demanda observada, no según volumen estimado aislado.

## 13. Criterio de finalización

La capa técnica queda lista cuando:

- la compilación es reproducible;
- todas las rutas devuelven HTML semántico;
- no existen errores del auditor SEO interno;
- sitemap, robots y archivos de IA responden correctamente;
- canonicals y schema coinciden con el contenido visible;
- no hay enlaces internos rotos;
- producción conserva HTTPS, encabezados y redirecciones;
- Search Console, Bing y SEMrush pueden rastrear el sitio sin bloqueos.

El posicionamiento es un programa continuo. Después de alcanzar estos criterios, el crecimiento depende principalmente de evidencia, autoridad, contenido útil, reputación consistente y comportamiento real de las personas.

## 14. Resultados de las dos iteraciones ejecutadas

### Iteración 1

- Build estático: correcto, nueve documentos generados.
- Auditor SEO interno: cero errores y una advertencia.
- Advertencia: 27 imágenes legacy de `/websites` sin dimensiones intrínsecas.
- Corrección: dimensiones reales añadidas sin alterar composición ni estilos.

### Iteración 2

- Build estático: correcto.
- Auditor SEO interno: 10 comprobaciones aprobadas, cero advertencias y cero errores.
- Enlaces internos: cero rutas rotas detectadas.
- Sitemap: ocho URLs indexables y 404 excluida.
- Auditoría de dependencias: cero vulnerabilidades después de actualizaciones compatibles.
- Navegador de producción: portada y página de servicio comprobadas en 1280 × 720 y 390 × 844.
- Responsive: se corrigió el posicionamiento del copy del hero móvil y se eliminó un desbordamiento horizontal de las páginas SEO.
- Consola: sin errores propios de la aplicación; Three.js emite un aviso de deprecación interno de `Clock` desde React Three Fiber, sin impacto funcional y pendiente de la actualización upstream.
- Rendimiento: el chunk 3D de aproximadamente 1 MB queda fuera de la ruta crítica mediante carga posterior a `load` + idle y fallback inmediato.

No se ejecutó un trace de Lighthouse/Chrome DevTools porque el entorno no expuso
la integración especializada de trazas. Los datos reales se obtendrán con Vercel
Speed Insights y Search Console después del despliegue; no se inventan puntajes de
laboratorio.
