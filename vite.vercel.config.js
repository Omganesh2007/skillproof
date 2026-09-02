import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { compactCareerRadarPlugin } from "./src/compactCareerRadar.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

const basePlugins = baseConfig.plugins || [];
const excluded = new Set([
  "skillproof-compact-career-radar",
  "skillproof-career-focus",
  "skillproof-student-ui",
  "skillproof-student-data",
]);
const safeBasePlugins = basePlugins.filter((plugin) => !excluded.has(plugin?.name));

export default defineConfig({
  ...baseConfig,
  plugins: [
    studentUiPlugin(),
    studentDataPlugin(),
    compactCareerRadarPlugin(),
    ...safeBasePlugins,
  ],
});
