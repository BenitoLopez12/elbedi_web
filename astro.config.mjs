// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "lottie-web": "lottie-web/build/player/lottie_light",
      },
    },
    server: {
      // En dev, /api/ai/* se sirve desde el backend del agente de IA
      // (server/ai-chat-server.mjs). Arranca con: npm run ai
      proxy: {
        "/api/ai": {
          target: "http://localhost:8787",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, "/api"),
          // Si el backend de IA no está corriendo (npm run ai), responde un
          // 503 limpio en lugar de tirar ECONNREFUSED: el chat detecta el
          // fallo y usa su cerebro local sin ruido en la consola.
          configure: (proxy) => {
            proxy.on("error", (_err, _req, res) => {
              try {
                if (res && !res.headersSent && res.writeHead) {
                  res.writeHead(503, { "Content-Type": "application/json" });
                }
                res?.end?.(JSON.stringify({ error: "ai_backend_offline" }));
              } catch {
                /* respuesta ya cerrada */
              }
            });
          },
        },
      },
    },
  },

  integrations: [react()],
});
