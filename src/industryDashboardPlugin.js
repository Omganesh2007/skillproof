export function industryDashboardPlugin() {
  return {
    name: "skillproof-industry-dashboard",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const start = code.indexOf("function IndustryAppShell(");
      if (start < 0) return null;
      const end = code.indexOf("\n\nfunction ", start + 10);
      if (end < 0) return null;
      const importLine = 'import { IndustryDashboard } from "./IndustryDashboard.jsx";\n';
      const replacement = "function IndustryAppShell({ logout }) { return React.createElement(IndustryDashboard, { logout }); }";
      return { code: importLine + code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
