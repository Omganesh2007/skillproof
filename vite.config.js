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
      const colleges = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src/colleges.json"), "utf8"));
      const careerData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src/careerRoles.json"), "utf8")).roles;
      const collegeLiteral = JSON.stringify(colleges);
      const careerNamesLiteral = JSON.stringify(careerData.map((role) => role.name));
      const careerRequirementsLiteral = JSON.stringify(Object.fromEntries(careerData.map((role) => [role.name, Object.fromEntries(role.skills.map((skill) => [skill, 70]))])));

      let next = code.replace(/const colleges = \[[\s\S]*?\];/, `const colleges = ${collegeLiteral};`);
      next = next.replace(/const careers = \[[\s\S]*?\];/, `const careers = ${careerNamesLiteral};`);
      next = next.replace(/const careerRequirements = \{[\s\S]*?\n\};/, `const careerRequirements = ${careerRequirementsLiteral};`);
      next = next.replace("const filtered=[...startsWith,...contains].slice(0,10);", "const filtered=[...startsWith,...contains];");
      return next === code ? null : { code: next, map: null };
    },
  };
}

export default defineConfig({
  plugins: [collegeDirectoryPlugin(), react(), tailwindcss()],
});
