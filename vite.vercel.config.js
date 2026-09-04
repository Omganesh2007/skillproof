import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { registrationFormPlugin } from "./src/registrationFormPlugin.js";

// Registration is kept as the earlier SkillProof registration experience.
// Do not enable the other JSX-rewriting plugins in the Vercel build.
export default defineConfig({
  plugins: [registrationFormPlugin(), react(), tailwindcss()],
});
