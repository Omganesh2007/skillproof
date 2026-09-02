import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";
import { radarUiPlugin } from "./src/radarUiOverrides.js";

export default defineConfig({
  ...baseConfig,
  plugins: [radarUiPlugin(), ...(baseConfig.plugins || [])],
});
