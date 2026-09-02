import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";

export default defineConfig({
  ...baseConfig,
  plugins: [studentUiPlugin(), ...(baseConfig.plugins || [])],
});
