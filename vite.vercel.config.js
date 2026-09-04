import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { careerRequirementsPlugin } from "./src/careerRequirementsPlugin.js";
import { personalizationPlugin } from "./src/personalizationPlugin.js";
import { careerSkillTreePlugin } from "./src/careerSkillTreePlugin.js";
import { completeCareerDashboardPlugin } from "./src/completeCareerDashboardPlugin.js";
import { careerPathsPagePlugin } from "./src/careerPathsPagePlugin.js";
import { studentOpportunitiesPlugin } from "./src/studentOpportunitiesPlugin.js";
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
  "skillproof-compact-career-radar",
  "skillproof-career-focus",
  "skillproof-student-ui",
  "skillproof-student-data",
]);
const safeBasePlugins = basePlugins.filter((plugin) => !excluded.has(plugin?.name));

export default defineConfig({
  ...baseConfig,
  plugins: [
    careerRequirementsPlugin(),
    personalizationPlugin(),
    studentUiPlugin(),
    studentDataPlugin(),
    careerSkillTreePlugin(),
    completeCareerDashboardPlugin(),
    careerPathsPagePlugin(),
    studentOpportunitiesPlugin(),
    ...safeBasePlugins,
  ],
});
