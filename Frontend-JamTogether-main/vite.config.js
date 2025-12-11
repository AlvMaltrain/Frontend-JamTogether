import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 1. Configuración del Servidor (AQUÍ ARREGLAMOS EL CORS)
  server: {
    port: 3000,       // Fuerzas el puerto 3000 (el que espera tu Backend)
    strictPort: true, // Si el 3000 está ocupado, falla en lugar de cambiar a otro
  },

  // 2. Configuración Base (Debe estar fuera de 'server')
  base: "./",

  // 3. Configuración de Tests (Debe estar fuera de 'server')
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});