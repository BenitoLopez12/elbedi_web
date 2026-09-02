# Arquitectura técnica del agente de inteligencia artificial de ELBEDI

## Especificación de referencia para replicación

**Versión documentada:** 1.0  
**Fecha de auditoría:** 24 de julio de 2026  
**Alcance:** chat de IA del usuario final, backend LLM, navegación agéntica, botones de acción, continuidad por WhatsApp, tolerancia a fallos y operación local/producción.

---

## 1. Propósito del documento

Este documento explica de extremo a extremo cómo está construido el asistente de inteligencia artificial de ELBEDI y por qué produce la experiencia actual. No es únicamente una descripción visual: funciona como especificación técnica para reproducir el mismo patrón en otro proyecto sin copiar accidentalmente decisiones específicas de la marca.

La solución debe entenderse como un **agente comercial de navegación controlada**, no como un chatbot aislado. El sistema combina cinco responsabilidades:

1. Conversar y resolver dudas mediante un modelo de lenguaje.
2. Clasificar el tema de la conversación dentro de los servicios de ELBEDI.
3. Navegar la experiencia web hacia una sección válida.
4. Presentar acciones comerciales coherentes y deterministas.
5. Transferir la conversación a WhatsApp sin obligar al prospecto a repetir su contexto.

La decisión arquitectónica central es separar lo probabilístico de lo determinista:

- El LLM redacta, razona sobre el contexto y solicita navegación.
- El código valida la navegación, decide los botones, controla las URLs y ejecuta las acciones.
- Un cerebro local mantiene una funcionalidad mínima cuando el proveedor de IA no está disponible.

Esta separación reduce alucinaciones, evita enlaces inventados, garantiza coherencia visual y conserva capacidad de conversión aun durante fallos parciales.

---

## 2. Resumen ejecutivo de la arquitectura

El flujo principal tiene cuatro capas.

### 2.1 Capa de experiencia

`ChatPanel.jsx` contiene la interfaz React, el estado de la conversación, las animaciones, el envío de mensajes, el seguimiento del servicio activo y la presentación de acciones.

### 2.2 Capa de transporte

`agentClient.js` comunica el navegador con el backend mediante `fetch` y Server-Sent Events. Traduce los eventos del servidor a un contrato estable de cuatro tipos: texto, intención, sugerencia y finalización.

### 2.3 Capa agéntica

`ai-chat-server.mjs` configura el modelo, aporta contexto de negocio, expone la herramienta `navigate_to_section`, ejecuta el ciclo de herramientas y transmite la respuesta en tiempo real.

### 2.4 Capa de control

`experienceStore.js`, `useSectionEngine.js` y `experience.js` forman el plano de control. Validan secciones contra una lista permitida, ejecutan la transición cinematográfica y relacionan cada servicio con su demo.

Flujo conceptual:

```text
Usuario
  -> ChatPanel
  -> agentClient
  -> POST /api/ai/chat
  -> proxy Astro
  -> servidor agéntico
  -> proveedor LLM
  -> texto + tool call
  -> SSE
  -> bus de intents validado
  -> motor cinematográfico de secciones
  -> botones deterministas
  -> usuario
```

---

## 3. Inventario de componentes

### 3.1 Componentes principales

- `src/experience/chat/ChatPanel.jsx`: interfaz y orquestación del turno en el navegador.
- `src/experience/chat/agentClient.js`: cliente SSE y conmutación al fallback.
- `src/experience/chat/localBrain.js`: respuestas deterministas de emergencia.
- `src/experience/chat/compactor.js`: resumen bajo demanda para WhatsApp.
- `server/ai-chat-server.mjs`: servidor HTTP, prompts, proveedores, herramientas y streaming.
- `src/experience/state/experienceStore.js`: estado global y bus de intenciones.
- `src/experience/navigation/useSectionEngine.js`: ejecución visual de la navegación.
- `src/content/experience.js`: catálogo de secciones y demos.
- `astro.config.mjs`: proxy de desarrollo.
- `scripts/dev.mjs`: arranque conjunto del sitio y del backend.
- `.env.example`: contrato de configuración.

### 3.2 Dependencias funcionales

La interfaz utiliza React 19 y Motion para animaciones. Astro entrega la aplicación y configura el proxy. GSAP ejecuta la coreografía de cambio de secciones. El backend usa únicamente módulos nativos de Node, por lo que no introduce un framework de servidor ni dependencias de producción adicionales.

---

## 4. Modelo de funcionamiento: agente híbrido

El agente no delega todo al modelo. Se divide en dos planos.

### 4.1 Plano probabilístico

El modelo recibe:

- Instrucciones de identidad y misión.
- Descripción compacta de los cuatro servicios.
- Reglas de respuesta.
- Reglas de alcance y resistencia a desvíos.
- Historial reciente saneado.
- Definición de la herramienta de navegación.

El modelo decide:

- Qué responder.
- Qué servicio encaja con la consulta.
- Si debe solicitar navegación.
- Qué sección debe abrir.

### 4.2 Plano determinista

El código decide:

- Qué secciones existen.
- Si una navegación es válida.
- Qué URL corresponde a cada demo.
- Qué botones aparecen.
- Cuándo compactar la conversación.
- Cómo construir y abrir WhatsApp.
- Qué ocurre si falla el backend.
- Cuántos mensajes y caracteres se envían al modelo.

### 4.3 Razón de esta división

Pedirle al modelo que redacte botones, URLs y acciones sería flexible, pero frágil. Podría repetir acciones, inventar rutas, mezclar servicios o devolver estructuras mal formadas. ELBEDI conserva la flexibilidad lingüística del LLM y lleva las acciones sensibles a estructuras de código cerradas.

Este patrón debe replicarse: **el modelo propone; la aplicación valida y ejecuta**.

---

## 5. Interfaz de usuario del chat

### 5.1 Estados visuales

El chat tiene tres representaciones:

1. Panel lateral de 380 px integrado en escritorio.
2. Sheet flotante de hasta 82 `svh` en móvil y tablet.
3. Botón flotante cuando el panel está cerrado.

El estado `chatOpen` comienza como `null`. En hidratación:

- En viewports de al menos 1280 px, el chat inicia abierto.
- En pantallas menores, inicia cerrado.

La elección evita cubrir contenido útil en móvil y aprovecha el espacio lateral en escritorio.

### 5.2 Diseño de las burbujas

Cada mensaje es una unidad animada con Motion:

- Entrada con opacidad, desplazamiento vertical y escala.
- Reordenamiento mediante `layout`.
- Salida con opacidad y desplazamiento.
- Burbuja del usuario con gradiente azul-violeta.
- Burbuja del asistente con cristal translúcido.
- Texto con `white-space: pre-wrap` para preservar saltos de línea.

Durante el streaming se añade un cursor vertical pulsante. Antes de recibir el primer delta se muestra un indicador de escritura con tres puntos animados.

### 5.3 Auto-scroll

Un `ref` apunta al contenedor de mensajes. Cada cambio en mensajes o estado de ocupación desplaza el contenedor a `scrollHeight` con comportamiento suave. El contenedor está marcado como exento del motor cinematográfico para que el wheel dentro del chat desplace la conversación y no cambie de sección.

### 5.4 Mensaje inicial

El objeto `WELCOME` es local y no consume tokens. Contiene:

- Presentación del asistente.
- Cuatro chips de descubrimiento: sitios web, WhatsApp IA, agentes IA y analíticas.
- Acción de WhatsApp.

Los chips no son enlaces: envían una frase predefinida como mensaje del usuario. Esto inicia una conversación real y permite al agente responder y navegar con contexto.

### 5.5 Control de concurrencia

El estado `busy` bloquea:

- Mensajes vacíos.
- Envíos simultáneos.
- El botón de envío mientras existe un turno activo.

El estado `compacting` bloquea múltiples compactaciones concurrentes y cambia temporalmente el texto del botón a “Preparando resumen…”.

---

## 6. Ciclo completo de un turno

### 6.1 Preparación del historial

Al enviar un mensaje:

1. Se normaliza a cadena y se eliminan espacios externos.
2. Se rechaza si está vacío o el agente está ocupado.
3. Se construye el historial desde el estado actual.
4. Se agrega el mensaje nuevo al historial destinado al agente.
5. Después se encola visualmente el mensaje en React.

Este orden es deliberado. El historial no se construye dentro del callback de `setMessages`, porque React puede ejecutarlo después. Hacerlo ahí produjo previamente un desfase donde el agente contestaba el mensaje anterior. La versión actual evita ese error.

### 6.2 Creación diferida de la burbuja

La burbuja del asistente no se crea inmediatamente. `ensureBubble()` la crea cuando llega el primer evento de texto, intención o sugerencia. Mientras tanto, la interfaz muestra el indicador de escritura.

### 6.3 Procesamiento de eventos

`runAgentTurn()` recibe manejadores:

- `onText(delta)`: concatena texto a la burbuja activa.
- `onSuggest(suggest)`: conserva compatibilidad con sugerencias del transporte.
- `onIntent(intent)`: registra el servicio y ejecuta navegación.
- `onDone()`: cierra el streaming y reemplaza las sugerencias por botones calculados.

### 6.4 Finalización

En `onDone`, la interfaz no confía en botones emitidos por el modelo. Ejecuta `buildTurnButtons(serviceContextRef.current)`. Por ello, la respuesta final siempre usa el servicio que realmente fue aceptado por el bus de navegación.

---

## 7. Contrato de eventos SSE

El servidor responde con `Content-Type: text/event-stream`. Cada evento se serializa como:

```text
data: {"type":"text","text":"..."}\n\n
```

El contrato contempla:

- `text`: delta visible de la respuesta.
- `intent`: acción estructurada, actualmente navegación.
- `suggest`: acción sugerida heredada para compatibilidad.
- `done`: fin del turno.

El cliente acumula bytes con `ReadableStreamDefaultReader`, decodifica UTF-8, mantiene un buffer y separa frames por doble salto de línea. Los JSON inválidos se ignoran sin romper el stream.

El cliente aplica un timeout de 30 segundos mediante `AbortController`. Si no recibe ningún evento, considera la respuesta inválida y activa el fallback.

Una particularidad: el servidor envía `done`, pero el cliente finaliza usando el cierre exitoso del stream y llama una sola vez a `onDone`. Esto mantiene un punto único de finalización en el frontend.

---

## 8. Backend agéntico

### 8.1 Implementación

El backend es un servidor HTTP nativo de Node. Expone:

- `GET /health`
- `POST /api/chat`
- `POST /api/compact`
- `OPTIONS` para CORS

No requiere Express. Esto reduce superficie de dependencias, aunque implica que validación, routing y streaming se mantienen manualmente.

### 8.2 Proveedores compatibles

La selección de proveedor sigue precedencia:

1. Si existe `ANTHROPIC_API_KEY`, usa Anthropic.
2. Si no existe y está `AI_API_KEY`, usa una API compatible con OpenAI.
3. Sin clave, el servidor responde 503 y el cliente usa el cerebro local.

La instalación auditada utiliza el proveedor compatible con OpenAI:

- Base URL: `https://api.minimax.io/v1`
- Modelo: `MiniMax-M2.7`

Las claves nunca deben documentarse ni exponerse al navegador.

### 8.3 Parámetros actuales

- Puerto por defecto: `8787`.
- Timeout upstream: 30 segundos.
- Iteraciones máximas del agente: 3.
- Historial máximo del servidor: 16 mensajes.
- Longitud máxima por mensaje: 2000 caracteres.
- Temperatura de conversación: 0.7.
- Tokens máximos: 2048 para proveedor OpenAI-compatible y 512 para Anthropic, salvo override.
- Modelo Anthropic predeterminado: versión fija `claude-haiku-4-5-20251001`.
- CORS: configurable; por defecto `*`.

El uso de versiones fijas evita cambios inesperados por aliases flotantes.

---

## 9. Instrucciones y contexto del modelo

El prompt del sistema está en `server/ai-chat-server.mjs`. Está diseñado para ser corto en relación con la tarea y se divide en cuatro bloques.

### 9.1 Identidad y misión

Define al agente como asistente del sitio de ELBEDI, estudio mexicano de desarrollo enfocado en IA. Su misión combina resolución de dudas, guía por el sitio y conversión a WhatsApp cuando existe interés real.

### 9.2 Contexto de servicios

Resume cuatro servicios y asocia cada uno con su ID de sección:

- `websites`
- `whatsapp-ia`
- `agentes`
- `analiticas`

También describe las secciones informativas: proceso, estudio, FAQ, contacto e inicio.

### 9.3 Política de respuesta

Las instrucciones exigen:

- Analizar la pregunta exacta.
- Considerar el historial.
- Elegir el servicio que encaja.
- Responder de forma específica.
- No repetir respuestas.
- Enumerar los cuatro servicios ante preguntas generales.
- Mantener español cálido y profesional.
- Limitarse aproximadamente a 80 palabras.
- Usar texto plano.
- Navegar de manera proactiva.
- No publicar precios ni inventar información.

### 9.4 Política de alcance

El prompt trata el contenido del usuario como información, no como autoridad. Prohíbe revelar instrucciones o aceptar cambios de identidad. Para temas ajenos:

1. Reconoce brevemente el desvío.
2. Lo conecta con un servicio solo si existe relación natural.
3. Si no existe relación, declina en una frase.
4. Ante insistencia, ofrece WhatsApp sin entrar en el tema.

### 9.5 Por qué funciona

El prompt no intenta contener toda la empresa. Contiene la información suficiente para clasificación, respuesta inicial y navegación. El resto de la coherencia proviene del código. Esto reduce consumo de tokens y disminuye instrucciones contradictorias.

### 9.6 Límite actual

No existe una base de conocimiento recuperada dinámicamente ni RAG. El contexto corporativo es estático y vive en el prompt y en el contenido del sitio. Para replicar el patrón en un negocio con catálogo amplio, documentación cambiante o políticas complejas, debe añadirse recuperación documental antes de ampliar indefinidamente el prompt.

---

## 10. Herramienta de navegación

El agente dispone de una única herramienta: `navigate_to_section`.

### 10.1 Esquema

La entrada contiene `section`, una cadena restringida por enum a:

```text
inicio, websites, whatsapp-ia, agentes, analiticas,
proceso, estudio, faq, contacto, footer
```

### 10.2 Ventaja de una sola herramienta

Una herramienta estrecha:

- Reduce ambigüedad.
- Facilita pruebas.
- Evita acciones destructivas.
- Simplifica el ciclo de tools.
- Mantiene al modelo dentro de la experiencia.

### 10.3 Ejecución en dos fases

La validación ocurre dos veces:

1. El servidor compara la sección contra `SECTION_IDS`.
2. El cliente envía el intent al bus, que vuelve a resolverlo contra la allowlist.

Solo después el motor ejecuta la transición. El modelo nunca obtiene acceso directo al DOM, `window.location`, funciones arbitrarias ni APIs del negocio.

### 10.4 Ciclo agéntico

El servidor admite hasta tres iteraciones:

1. El modelo responde y/o solicita herramienta.
2. El servidor ejecuta la herramienta.
3. Inserta el resultado “el usuario ahora está viendo…”.
4. El modelo puede continuar su respuesta con conocimiento del resultado.

Esto permite que navegación y explicación formen parte de un mismo turno sin loops ilimitados.

---

## 11. Integración con la experiencia cinematográfica

`experienceStore.js` es una fuente de verdad independiente del framework. Mantiene sección activa, dirección, transición, chat abierto y preferencia de movimiento reducido.

`bindNavigator()` conecta el store con `useSectionEngine()`. `dispatchIntent()` resuelve la sección y rechaza cualquier ID no permitido.

Cuando la navegación es válida, el motor:

1. Bloquea nuevas transiciones.
2. Determina dirección.
3. Actualiza el hash.
4. Alinea el scroll interno de la sección destino.
5. Ejecuta timelines de salida y entrada.
6. Libera el bloqueo.
7. Emite `elbedi:section-change`.

El agente usa exactamente el mismo mecanismo que el rail, teclado, wheel y gestos táctiles. No existe una navegación visual paralela exclusiva del chat; por eso la experiencia permanece coherente.

---

## 12. Sistema de botones de acción

### 12.1 Regla principal

Después de cada respuesta existen como máximo dos acciones:

1. Demo del servicio en contexto, si existe.
2. Continuar en WhatsApp, siempre.

### 12.2 Autoridad de los botones

Los botones no los redacta el modelo. `buildTurnButtons()` consulta `SERVICE_DEMOS` usando `serviceContextRef`.

`serviceContextRef` se actualiza únicamente cuando:

- llega un intent de navegación;
- el intent es de tipo `navigate`;
- la sección tiene una demo configurada.

Por lo tanto, una navegación a FAQ o contacto no destruye el último contexto comercial. El botón puede seguir representando el último servicio real tratado.

### 12.3 Coherencia demo-sección

El mapa central es:

```text
websites    -> /demos/websites
whatsapp-ia -> /demos/whatsapp-ia
agentes     -> /demos/agentes
analiticas  -> /demos/analiticas
```

Actualizar una demo requiere cambiar una sola configuración en `experience.js`. El modelo no conoce las URLs y no puede inventarlas.

### 12.4 Tipos de acción

- `chip`: envía un mensaje al agente.
- `demo`: abre una URL en otra pestaña con `noopener` implícito por `noreferrer`.
- `whatsapp-live`: ejecuta compactación y abre WhatsApp.

### 12.5 Prevención del bucle anterior

Una versión anterior reutilizaba botones que enviaban de nuevo la misma intención, creando un ciclo conversacional. La solución actual separa:

- Descubrimiento inicial mediante chips.
- Conversación mediante el modelo.
- Acción final mediante demo o WhatsApp.

El botón demo no reenvía el mensaje y WhatsApp no vuelve a invocar el turno conversacional.

---

## 13. Continuidad conversacional por WhatsApp

### 13.1 Objetivo

Transferir al prospecto sin pedirle que repita lo conversado.

### 13.2 Compactación bajo demanda

El resumen no se genera en cada respuesta. Solo se genera cuando el usuario hace clic en “Continuar en WhatsApp”. Esto evita consumo de tokens para usuarios que nunca abandonan el chat.

### 13.3 Prevención del bloqueador de pop-ups

El navegador exige que una pestaña nueva se abra durante el gesto del usuario. La implementación:

1. Abre inmediatamente una pestaña vacía.
2. Muestra “Preparando tu conversación…”.
3. Compacta el historial de forma asíncrona.
4. Construye la URL de WhatsApp.
5. Asigna la URL a la pestaña ya abierta.

Si el navegador no entrega la referencia, intenta abrir WhatsApp al terminar.

### 13.4 Economía de tokens

- Con menos de dos turnos del usuario, usa resumen determinista: cero tokens.
- Con conversación real, envía como máximo los últimos 16 mensajes.
- El endpoint recorta la transcripción a 4000 caracteres.
- Timeout cliente de compactación: 9 segundos.
- Resultado visible limitado a 600 caracteres.
- Si falla, vuelve a una plantilla determinista.

### 13.5 Prompt de compactación

El compactador:

- Escribe en primera persona.
- Empieza con saludo a ELBEDI.
- Conserva servicio, necesidad, giro y datos compartidos.
- Tiene máximo 80 palabras.
- Evita juicios sobre el usuario.
- No inventa información.
- Devuelve únicamente el mensaje.
- Ignora instrucciones incrustadas en la transcripción.

### 13.6 Consideración de privacidad

El usuario ve el texto antes de enviarlo porque WhatsApp abre con un mensaje prellenado. Esto proporciona consentimiento operativo y oportunidad de editar. Sin embargo, al replicar debe documentarse qué proveedor procesa la conversación, la retención aplicable y el aviso de privacidad.

---

## 14. Fallback determinista

### 14.1 Propósito

El fallback no pretende sustituir al LLM. Mantiene orientación, navegación y conversión si:

- el backend no está iniciado;
- falta API key;
- el proxy responde 503;
- expira el timeout;
- el proveedor devuelve error;
- el stream está vacío.

### 14.2 Clasificación

Normaliza:

- minúsculas;
- caracteres Unicode NFD;
- eliminación de marcas diacríticas.

Después evalúa reglas regex en orden. Las categorías incluyen servicios, precio, proceso, contacto, humano, FAQ, estudio y saludo.

### 14.3 Respuesta y navegación

Cada regla puede devolver texto e intents. El texto se transmite con un typewriter simulado para conservar continuidad visual.

### 14.4 Fallbacks rotativos

Las consultas no reconocidas alternan entre tres mensajes para evitar repetición inmediata. Aun así, esta capa no entiende contexto multivuelta. Debe considerarse una degradación y monitorearse su tasa de activación.

---

## 15. Proveedor LLM y normalización del streaming

### 15.1 Anthropic

Usa Messages API con:

- `system` separado;
- tools nativas;
- bloques `text` y `tool_use`;
- streaming SSE;
- resultados de herramienta como `tool_result`.

### 15.2 OpenAI-compatible

Usa `/chat/completions` con:

- mensaje `system`;
- tools en formato function;
- acumulación incremental de `tool_calls`;
- mensajes `tool` con `tool_call_id`.

### 15.3 Modelos con razonamiento

Algunos proveedores emiten razonamiento en `reasoning_content` o etiquetas `<think>`. El backend:

- ignora `reasoning_content`;
- elimina bloques `<think>` incluso cuando las etiquetas llegan partidas;
- transmite solo el contenido visible.

### 15.4 Limpieza de formato

La UI muestra texto plano. En el camino OpenAI-compatible se eliminan asteriscos para evitar Markdown sin renderizar. El primer delta elimina espacios y saltos iniciales sueltos.

---

## 16. Seguridad, guardrails y límites

### 16.1 Controles implementados

- API key exclusivamente en servidor.
- Allowlist de secciones en servidor y cliente.
- Herramienta única y sin acceso arbitrario.
- Límite HTTP de 64 KB.
- Máximo de historial y caracteres.
- Roles normalizados.
- Conversaciones obligadas a iniciar y terminar correctamente.
- Timeout upstream.
- Máximo de tres iteraciones.
- CORS configurable.
- Prompt contra extracción de instrucciones.
- Compactador instruido contra prompt injection en transcripciones.

### 16.2 Saneamiento del historial

`sanitizeMessages()`:

1. Rechaza valores no array.
2. Toma solo los últimos mensajes permitidos.
3. Convierte cualquier rol desconocido en `user`.
4. Recorta contenido.
5. Descarta mensajes vacíos.
6. Fusiona roles consecutivos.
7. Elimina prefijos hasta comenzar con usuario.
8. Exige que el último mensaje sea de usuario para chat.

### 16.3 Riesgos residuales

- No existe autenticación ni rate limiting en el backend.
- CORS por defecto permite cualquier origen.
- No existe moderación independiente del proveedor.
- No hay persistencia ni trazabilidad por sesión.
- No hay métricas de latencia, costo, fallback o conversión.
- El prompt contiene contexto estático.
- La eliminación global de `*` puede alterar contenido legítimo.
- El error upstream se convierte en texto dentro de un stream 200; dificulta distinguir fallo técnico en analítica cliente.

Para producción replicada se recomienda gateway con rate limiting, origen estricto, identificador anónimo de sesión, logs estructurados sin PII, métricas, evaluación automatizada y políticas de retención.

---

## 17. Configuración y variables de entorno

### 17.1 Servidor

- `ANTHROPIC_API_KEY`: activa Anthropic y tiene precedencia.
- `AI_API_KEY`: activa proveedor OpenAI-compatible.
- `AI_API_URL`: base URL compatible.
- `AI_MODEL`: modelo del proveedor compatible.
- `AI_CHAT_MODEL`: override global del modelo.
- `AI_CHAT_PORT`: puerto; predeterminado 8787.
- `AI_CHAT_MAX_TOKENS`: presupuesto de salida.
- `AI_CHAT_ALLOWED_ORIGIN`: CORS.
- `WHATSAPP_PHONE`: número de destino.

### 17.2 Frontend

- `PUBLIC_AI_CHAT_ENDPOINT`: endpoint público en producción.

En desarrollo se omite porque Astro proxifica `/api/ai/*` hacia `localhost:8787` y reescribe `/api/ai` como `/api`.

### 17.3 Política de secretos

Nunca usar variables `PUBLIC_*` para claves. Nunca incluir `.env` en el repositorio ni exponer el valor en documentación, logs o respuestas de health.

---

## 18. Operación local y despliegue

### 18.1 Desarrollo

`npm run dev` ejecuta `scripts/dev.mjs`, que levanta:

- Astro mediante `npx astro dev`.
- Backend mediante `node server/ai-chat-server.mjs`.

Si el backend termina, Astro sigue vivo y el chat usa fallback. Si el puerto está ocupado, el backend asume que ya existe otra instancia.

### 18.2 Proxy

Astro reenvía `/api/ai` a `http://localhost:8787`. Ante `ECONNREFUSED`, el proxy devuelve un 503 JSON limpio en lugar de una traza ruidosa.

### 18.3 Producción

La arquitectura estática de Astro requiere hospedar el backend como proceso o función separada. El frontend debe apuntar a ese endpoint por `PUBLIC_AI_CHAT_ENDPOINT` o mediante reverse proxy del dominio.

Debe verificarse que el hosting soporte:

- Respuestas streaming.
- Conexiones de al menos 30 segundos.
- Headers sin buffering.
- CORS correcto.
- Secretos de servidor.

---

## 19. Decisiones de diseño que deben preservarse al replicar

1. Los botones pertenecen al código, no al modelo.
2. Las rutas de demo viven en un mapa central.
3. La sección activa se deriva de una navegación validada.
4. La compactación se ejecuta solo por clic.
5. La pestaña de WhatsApp se reserva antes de esperar.
6. El agente tiene una herramienta estrecha.
7. Navegación manual y navegación IA comparten motor.
8. El backend transmite texto incremental.
9. El fallback conserva el mismo contrato de eventos.
10. El contexto de negocio es breve y explícito.
11. El historial se arma antes de actualizar estado React.
12. El servidor y el cliente imponen límites independientes.

---

## 20. Blueprint para otro proyecto

### Fase 1: contrato de dominio

Definir un catálogo único:

```javascript
const SERVICES = {
  serviceA: { section: "service-a", demoUrl: "/demos/a" },
  serviceB: { section: "service-b", demoUrl: "/demos/b" },
};
```

Cada ID debe ser estable y compartido por prompt, tool schema, store, navegación y botones.

### Fase 2: bus de acciones

Crear un bus que acepte solo acciones declaradas. No pasar funciones del DOM al modelo. Validar target y payload en cliente y servidor.

### Fase 3: chat UI

Implementar:

- estado de mensajes;
- bloqueo por turno;
- streaming;
- scroll interno;
- diseño responsive;
- indicador de escritura;
- acciones por tipo;
- accesibilidad de botones y formularios.

### Fase 4: cliente de agente

Definir un contrato independiente del proveedor:

```text
text(delta)
intent(payload)
done()
```

El cliente debe soportar timeout, stream parcial, JSON inválido y fallback.

### Fase 5: servidor

Configurar:

- proveedor;
- modelo fijo;
- prompt de negocio;
- tools;
- límites;
- CORS;
- SSE;
- health check;
- manejo de error.

### Fase 6: handoff

Separar compactación del chat principal. Ejecutarla únicamente por intención explícita. Añadir plantilla determinista.

### Fase 7: evaluaciones

Construir una suite con:

- consultas por cada servicio;
- consulta general;
- pregunta de precio;
- conversación multivuelta;
- cambio de servicio;
- prompt injection;
- tema fuera de alcance;
- backend apagado;
- timeout;
- tool call inválido;
- clic WhatsApp con conversación corta y larga.

---

## 21. Matriz de pruebas de aceptación

### Conversación

- Una pregunta concreta recibe una respuesta concreta.
- Dos preguntas distintas no reciben el mismo texto genérico.
- El agente recuerda información reciente.
- Una consulta general enumera los cuatro servicios.
- No inventa precios.

### Navegación

- Cada servicio abre su sección.
- Un ID no permitido se rechaza.
- El cambio usa la misma coreografía que el rail.
- El chat sigue siendo desplazable sin cambiar la página.

### Botones

- WhatsApp aparece en toda respuesta terminada.
- Demo aparece solo si hay servicio válido.
- Demo corresponde a la última navegación comercial.
- Ningún botón vuelve a enviar el mismo mensaje automáticamente.

### Resiliencia

- Sin backend, existe respuesta local.
- Sin key, no se bloquea la interfaz.
- Ante timeout, el usuario recibe fallback.
- Un stream malformado no rompe React.

### WhatsApp

- La pestaña no es bloqueada.
- Una conversación corta no usa LLM.
- Una conversación larga se resume al hacer clic.
- El mensaje está en primera persona y es editable.
- Ante fallo del compactador se usa plantilla.

---

## 22. Observabilidad recomendada

Para replicación profesional deben registrarse, sin almacenar contenido sensible por defecto:

- `conversation_started`
- `turn_completed`
- `turn_latency_ms`
- `provider`
- `model`
- `fallback_used`
- `tool_requested`
- `tool_accepted`
- `section_target`
- `demo_clicked`
- `whatsapp_clicked`
- `compaction_source` (`llm` o `deterministic`)
- `error_class`

Los KPIs útiles son tasa de fallback, latencia p50/p95, costo por conversación, porcentaje de navegación válida, CTR de demo, CTR de WhatsApp y conversión posterior.

---

## 23. Mejoras recomendadas antes de escalar

### Prioridad alta

1. Añadir rate limiting por IP/sesión.
2. Restringir CORS al dominio real.
3. Añadir logs estructurados y métricas.
4. Separar error técnico de respuesta conversacional.
5. Crear pruebas automatizadas del prompt y tools.
6. Incluir aviso de privacidad y retención.

### Prioridad media

1. Mover catálogo de servicios a una fuente compartida generadora del prompt y tool enum para evitar duplicidad.
2. Persistir un ID anónimo de sesión.
3. Añadir RAG si crece la información corporativa.
4. Introducir cancelación visible del turno.
5. Medir calidad del resumen de WhatsApp.

### Prioridad evolutiva

1. Handoff a CRM.
2. Captura voluntaria de nombre y empresa.
3. Experimentos A/B de CTA.
4. Evaluación automática por intención.
5. Escalamiento humano en tiempo real.

---

## 24. Qué es reutilizable y qué debe cambiar

### Reutilizable

- Contrato SSE.
- Patrón LLM + tool.
- Bus validado.
- Botones deterministas.
- Compactación bajo demanda.
- Fallback local.
- Diseño responsive.
- Arranque conjunto.

### Debe personalizarse

- Identidad y tono.
- Servicios.
- IDs de sección.
- URLs de demo.
- Número de WhatsApp.
- Reglas de precio.
- Política de alcance.
- Proveedor y modelo.
- Aviso de privacidad.
- Copys del fallback.

### No debe copiarse literalmente

- Credenciales.
- Número productivo sin autorización.
- Prompt de ELBEDI para otra marca.
- IDs que no existan en el nuevo sitio.
- Capacidades no implementadas en el nuevo negocio.

---

## 25. Conclusión arquitectónica

La calidad del asistente no proviene únicamente del modelo seleccionado. Proviene de la combinación de:

- un prompt breve y específico;
- contexto reciente acotado;
- una herramienta con alcance mínimo;
- navegación validada;
- acciones comerciales controladas por código;
- streaming;
- continuidad por WhatsApp;
- fallback funcional;
- integración visual con el motor de experiencia.

La réplica correcta no consiste en copiar `SYSTEM_PROMPT`. Consiste en reconstruir el mismo reparto de responsabilidades: **lenguaje y criterio contextual en el modelo; autoridad, seguridad, rutas y conversión en la aplicación**.

---

## Apéndice A. Mapa de trazabilidad del código

- Prompt, configuración y tools: `server/ai-chat-server.mjs`, desde las constantes `CONFIG`, `SYSTEM_PROMPT` y `TOOLS`.
- Sanitización del historial: `server/ai-chat-server.mjs`, función `sanitizeMessages`.
- Streaming Anthropic: `callAnthropicStream`.
- Streaming OpenAI-compatible: `callOpenAIStream`.
- Ciclos de herramientas: `runAgentAnthropic` y `runAgentOpenAI`.
- Compactación de servidor: `COMPACT_SYSTEM` y `runCompact`.
- Endpoints: callback de `http.createServer`.
- UI y botones: `src/experience/chat/ChatPanel.jsx`.
- Transporte y fallback: `src/experience/chat/agentClient.js`.
- Reglas locales: `src/experience/chat/localBrain.js`.
- Compactación cliente: `src/experience/chat/compactor.js`.
- Bus de intents: `src/experience/state/experienceStore.js`.
- Navegación visual: `src/experience/navigation/useSectionEngine.js`.
- Secciones y demos: `src/content/experience.js`.
- Proxy: `astro.config.mjs`.
- Arranque: `scripts/dev.mjs`.

## Apéndice B. Checklist de réplica

- [ ] Catálogo de servicios e IDs definido.
- [ ] Prompt breve y sin contradicciones.
- [ ] Tool enum generado desde IDs válidos.
- [ ] Navegación validada en dos capas.
- [ ] Botones calculados fuera del LLM.
- [ ] Demos centralizadas.
- [ ] WhatsApp compactado solo por clic.
- [ ] Plantilla determinista de handoff.
- [ ] Timeout y fallback.
- [ ] Rate limiting y CORS productivos.
- [ ] Pruebas de contexto y no repetición.
- [ ] Observabilidad de conversión.
- [ ] Política de privacidad revisada.

