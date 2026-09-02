import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

function collegeDirectoryPlugin() {
  return {
    name: "skillproof-college-directory",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const file = path.resolve(process.cwd(), "src/colleges.json");
      const directory = JSON.parse(fs.readFileSync(file, "utf8"));
      const collegeLiteral = JSON.stringify(directory);
      const replacedDirectory = code.replace(/const colleges = \[[\s\S]*?\];/, `const colleges = ${collegeLiteral};`);
      const replacedLimit = replacedDirectory.replace("const filtered=[...startsWith,...contains].slice(0,10);", "const filtered=[...startsWith,...contains,\"Other / College not listed\"]; ");
      return replacedLimit === code ? null : { code: replacedLimit, map: null };
    },
  };
}

export default defineConfig({
  plugins: [collegeDirectoryPlugin(), react(), tailwindcss()],
});
