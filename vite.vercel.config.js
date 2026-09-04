import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Keep the production build on the real App.jsx source.
// Feature plugins are intentionally disabled here because Vercel's
// current Rolldown JSX parser rejects generated/transformed JSX.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
