import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/chat": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/send-email": {
        target: "https://hotelsherpasoul.com",
        changeOrigin: true,
      },
      "/api/contact": {
        target: "https://hotelsherpasoul.com",
        changeOrigin: true,
      },
      "/api": {
        target: "https://hotelsherpasoulpms-sigma.vercel.app",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // Lower warning limit so we notice large chunks early
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Use content-hashed filenames for long-term caching
        entryFileNames:  "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          // ---------- i18n locale JSON — each language is its own chunk ----------
          // They are lazy-imported on demand; Rollup still needs to know where to
          // put them so they don't bloat the main bundle.
          if (id.includes("/Locales/")) {
            const match = id.match(/\/Locales\/([^/]+)\.json/);
            if (match) return `locale-${match[1]}`;
          }

          if (!id.includes("node_modules")) return undefined;

          // ---------- React core (smallest possible critical chunk) ----------
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/@remix-run/") ||
            id.includes("/use-sync-external-store/")
          ) {
            return "vendor-react";
          }

          // ---------- Router ----------
          if (id.includes("react-router")) {
            return "vendor-router";
          }

          // ---------- Framer-motion (heavy — keep isolated) ----------
          if (id.includes("framer-motion") || id.includes("/motion/")) {
            return "vendor-animation";
          }

          // ---------- i18next runtime (small, needed on first paint) ----------
          if (
            id.includes("i18next") ||
            id.includes("react-i18next")
          ) {
            return "vendor-i18n";
          }

          // ---------- react-toastify ----------
          if (id.includes("react-toastify")) {
            return "vendor-toastify";
          }

          // ---------- lucide icons ----------
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }

          // Everything else goes into a generic vendor chunk
          return "vendor-libs";
        },
      },
    },
  },
});
