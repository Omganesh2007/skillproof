import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { careerRequirementsPlugin } from "./src/careerRequirementsPlugin.js";
import { careerSkillTreePlugin } from "./src/careerSkillTreePlugin.js";
import { completeCareerDashboardPlugin } from "./src/completeCareerDashboardPlugin.js";
import { careerPathsPagePlugin } from "./src/careerPathsPagePlugin.js";
import { studentOpportunitiesPlugin } from "./src/studentOpportunitiesPlugin.js";
import { studentWelcomePlugin } from "./src/studentWelcomePlugin.js";
import { registrationFormPlugin } from "./src/registrationFormPlugin.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

export default defineConfig({
  plugins: [
    registrationFormPlugin(),
    studentWelcomePlugin(),
    studentOpportunitiesPlugin(),
    careerRequirementsPlugin(),
    studentUiPlugin(),
    studentDataPlugin(),
    careerSkillTreePlugin(),
    completeCareerDashboardPlugin(),
    careerPathsPagePlugin(),
    react(),
    tailwindcss(),
  ],
});
