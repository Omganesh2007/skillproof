function findFunctionRange(code, name) {
  const start = code.indexOf(`function ${name}(`);
  if (start < 0) return null;
  const open = code.indexOf("{", start);
  if (open < 0) return null;
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = open; i < code.length; i += 1) {
    const ch = code[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { quote = ch; continue; }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return [start, i + 1];
    }
  }
  return null;
}

export function industryDashboardPlugin() {
  return {
    name: "skillproof-industry-dashboard",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const range = findFunctionRange(code, "IndustryAppShell");
      if (!range) return null;
      const importLine = 'import { IndustryDashboard } from "./IndustryDashboard.jsx";\n';
      const replacement = "function IndustryAppShell({ logout }) { return React.createElement(IndustryDashboard, { logout }); }";
      return { code: importLine + code.slice(0, range[0]) + replacement + code.slice(range[1]), map: null };
    },
  };
}
