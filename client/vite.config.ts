import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(currentDirectory, "src"),
    },
  },

  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "tiptap-runtime",
              test: /node_modules\/@tiptap\//,
              maxSize: 350_000,
            },
            {
              name: "editor-highlighting",
              test: /node_modules\/(highlight\.js|lowlight)\//,
            },
          ],
        },
      },
    },
  },
});
