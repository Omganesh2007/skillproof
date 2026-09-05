import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { collegeDashboardEnhancementPlugin } from "./src/collegeDashboardEnhancementPlugin.js";
import { registrationFormPlugin } from "./src/registrationFormPlugin.js";
import { industryAuthPlugin } from "./src/industryAuthPlugin.js";
import { industryDashboardPlugin } from "./src/industryDashboardPlugin.js";
import { studentDashboardRedesignPlugin } from "./src/studentDashboardRedesignPlugin.js";
import { skillAssessmentPlugin } from "./src/skillAssessmentPlugin.js";
import { careerSkillGapPagePlugin } from "./src/careerSkillGapPagePlugin.js";

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
    careerSkillGapPagePlugin(),
    studentDashboardRedesignPlugin(),
    skillAssessmentPlugin(),
    collegeDashboardEnhancementPlugin(),
    registrationFormPlugin(),
    industryAuthPlugin(),
    industryDashboardPlugin(),
    ...safeBasePlugins,
  ],
});
