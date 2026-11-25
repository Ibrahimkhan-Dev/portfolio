import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
    {
      name: "validate-turnstile-site-key",
      apply: "build",
      configResolved(config) {
        const key = config.env.VITE_TURNSTILE_SITE_KEY?.trim();
        const isTestKey = /^[123]x0{20}(?:AA|AB|BB|FF)$/.test(key ?? "");
        if (isTestKey || (!key && process.env.CF_PAGES === "1")) {
          throw new Error("Set VITE_TURNSTILE_SITE_KEY to a live Turnstile site key before deploying.");
        }
      },
    },
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  root: path.resolve(import.meta.dirname, "client"),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Home is statically bundled so the root route needs no JS waterfall.
    // Combined gzip (~161 kB) matches the previous home + shared + entry split.
    chunkSizeWarningLimit: 600,
  },

  server: {
    host: true,
    port: 5000,
  },
});
