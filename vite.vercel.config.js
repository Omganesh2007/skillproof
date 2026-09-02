import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

export default defineConfig({
  ...baseConfig,
  plugins: [studentUiPlugin(), studentDataPlugin(), ...(baseConfig.plugins || [])],
});
