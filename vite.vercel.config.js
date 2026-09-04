import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { collegeDashboardEnhancementPlugin } from "./src/collegeDashboardEnhancementPlugin.js";
import { registrationFormPlugin } from "./src/registrationFormPlugin.js";
import { careerRequirementsPlugin } from "./src/careerRequirementsPlugin.js";
import { careerSkillTreePlugin } from "./src/careerSkillTreePlugin.js";
import { completeCareerDashboardPlugin } from "./src/completeCareerDashboardPlugin.js";
import { careerPathsPagePlugin } from "./src/careerPathsPagePlugin.js";
import { studentOpportunitiesPlugin } from "./src/studentOpportunitiesPlugin.js";
import { studentWelcomePlugin } from "./src/studentWelcomePlugin.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

const basePlugins = baseConfig.plugins || [];
const excluded = new Set([
  "skillproof-expanded-career-requirements",
  "skillproof-personalization",
  "skillproof-career-skill-tree",
  "skillproof-complete-career-dashboard",
  "skillproof-career-paths-page",
  "skillproof-student-opportunities",
  "skillproof-student-welcome",
  "skillproof-compact-career-radar",
  "skillproof-career-focus",
  "skillproof-student-ui",
  "skillproof-student-data",
]);
const safeBasePlugins = basePlugins.filter((plugin) => !excluded.has(plugin?.name));

export default defineConfig({
  ...baseConfig,
  plugins: [
    collegeDashboardEnhancementPlugin(),
    registrationFormPlugin(),
    studentWelcomePlugin(),
    studentOpportunitiesPlugin(),
    careerRequirementsPlugin(),
    studentUiPlugin(),
    studentDataPlugin(),
    careerSkillTreePlugin(),
    completeCareerDashboardPlugin(),
    careerPathsPagePlugin(),
    ...safeBasePlugins,
  ],
});
