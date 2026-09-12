import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/send-email": {
        target: "https://hotel-sherpa-soul.vercel.app",
        changeOrigin: true,
      },
      "/api/contact": {
        target: "https://hotel-sherpa-soul.vercel.app",
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
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "vendor-icons";
            }
            if (id.includes("i18next")) {
              return "vendor-i18n";
            }
            if (id.includes("framer-motion") || id.includes("motion")) {
              return "vendor-animation";
            }
            if (
              id.includes("react") ||
              id.includes("scheduler") ||
              id.includes("@remix-run") ||
              id.includes("use-sync-external-store")
            ) {
              return "vendor-react";
            }
            return "vendor-libs";
          }
        },
      },
    },
  },
});
