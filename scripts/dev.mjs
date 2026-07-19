// Arranque de desarrollo: levanta Astro y el agente de IA juntos.
// Así el chat del sitio usa el LLM real sin tener que recordar `npm run ai`.
// Si el agente IA no puede arrancar (sin API key, puerto ocupado), el sitio
// sigue funcionando con el cerebro local — nunca bloquea el dev server.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const astroArgs = process.argv.slice(2); // p. ej. --port 4325

const astro = spawn("npx", ["astro", "dev", ...astroArgs], {
  cwd: rootDir,
  stdio: "inherit",
  shell: process.platform === "win32",
});

const ai = spawn(process.execPath, ["server/ai-chat-server.mjs"], {
  cwd: rootDir,
  stdio: "inherit",
});

ai.on("exit", (code) => {
  if (code && code !== 0) {
    console.log(
      "[dev] el agente IA terminó — el chat seguirá con el cerebro local.",
    );
  }
});

astro.on("exit", (code) => {
  if (!ai.killed) ai.kill();
  process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!astro.killed) astro.kill(signal);
    if (!ai.killed) ai.kill(signal);
  });
}
