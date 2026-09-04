export function industryDashboardPlugin() {
  return {
    name: "skillproof-industry-dashboard-v4",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const start = code.indexOf("function IndustryAppShell(");
      if (start < 0) return null;
      const bodyOpen = code.indexOf("{", code.indexOf(")", start) + 1);
      if (bodyOpen < 0) return null;
      let depth = 0;
      let end = -1;
      for (let i = bodyOpen; i < code.length; i += 1) {
        if (code[i] === "{") depth += 1;
        else if (code[i] === "}") {
          depth -= 1;
          if (depth === 0) { end = i + 1; break; }
        }
      }
      if (end < 0) return null;
      const importLine = 'import React from "react";\nimport { IndustryDashboard } from "./IndustryDashboard.jsx";\n';
      const replacement = "function IndustryAppShell({ logout }) { return React.createElement(IndustryDashboard, { logout }); }";
      return { code: importLine + code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
