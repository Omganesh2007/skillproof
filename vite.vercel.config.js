import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use the original App.jsx directly for the showcase build.
// No JSX-rewriting plugins: they were causing the Vercel Rolldown
// "Adjacent JSX elements" build failure.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
