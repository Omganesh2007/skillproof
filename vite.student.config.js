import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { radarUiPlugin } from "./src/radarUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

export default defineConfig({
  ...baseConfig,
  plugins: [radarUiPlugin(), studentDataPlugin(), ...(baseConfig.plugins || [])],
});
