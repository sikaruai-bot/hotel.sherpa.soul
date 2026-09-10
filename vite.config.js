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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-animation": ["framer-motion"],
          "vendor-i18n": ["i18next", "react-i18next"],
          "vendor-icons": ["lucide-react", "react-icons"],
        },
      },
    },
  },
});
