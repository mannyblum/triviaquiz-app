import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    lib: {
      entry: "src/main.tsx",
      name: "TriviaQuizSubmodule",
      fileName: "triviaquiz-submodule",
      formats: ["es"],
    },
  },
  plugins: [react(), tailwindcss()],
});
