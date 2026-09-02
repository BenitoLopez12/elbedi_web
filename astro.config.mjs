// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://elbedi.com",
  trailingSlash: "never",
  compressHTML: true,
  vite: {
    // Build y servidor de desarrollo no comparten caché. Esto evita que una
    // compilación de Vercel o una validación local invalide una sesión activa.
    cacheDir:
      process.env.NODE_ENV === "production"
        ? "node_modules/.vite-build"
        : "node_modules/.vite",
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

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith("/404"),
      serialize(item) {
        item.lastmod = new Date("2026-08-11T00:00:00.000Z");
        return item;
      },
    }),
  ],
});
