// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/static/", // Match Django's static path

  plugins: [react(), tailwindcss()],

  build: {
    outDir: "../backend/frontend", // Output to Django staticfiles
    emptyOutDir: true,
    sourcemap: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
