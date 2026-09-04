import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { registrationFormPlugin } from "./src/registrationFormPlugin.js";
import { collegeIndustryPlugin } from "./src/collegeIndustryPlugin.js";

export default defineConfig({
  plugins: [
    registrationFormPlugin(),
    collegeIndustryPlugin(),
    react(),
    tailwindcss(),
  ],
});
