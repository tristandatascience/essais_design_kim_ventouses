import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const racine = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(racine, "index.html"),
        maquette1: resolve(racine, "maquette-1.html"),
        maquette2: resolve(racine, "maquette-2.html"),
        maquette3: resolve(racine, "maquette-3.html"),
      },
    },
  },
});
