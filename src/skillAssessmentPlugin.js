export function skillAssessmentPlugin() {
  return {
    name: "skillproof-skill-assessment-questions",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const start = code.indexOf("const defaultQuestions = (skill) => [");
      if (start < 0) return null;
      const end = code.indexOf("];", start);
      if (end < 0) return null;
      const importLine = 'import { getSkillQuestions } from "./skillQuestions.js";\n';
      const replacement = "const defaultQuestions = (skill) => getSkillQuestions(skill);";
      const prefix = code.includes(importLine.trim()) ? "" : importLine;
      return { code: prefix + code.slice(0, start) + replacement + code.slice(end + 2), map: null };
    },
  };
}
