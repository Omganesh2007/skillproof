export function studentDashboardRedesignPlugin() {
  return {
    name: "skillproof-student-dashboard-redesign",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const start = code.indexOf("function Dashboard(");
      const nextFunction = code.indexOf("\nfunction MySkills(", start + 10);
      if (start < 0 || nextFunction < 0) return null;
      const importLine = 'import StudentDashboardSIH from "./StudentDashboardSIH.jsx";\n';
      const replacement = 'function Dashboard(props) { return <StudentDashboardSIH {...props} />; }';
      const prefix = code.includes(importLine.trim()) ? "" : importLine;
      return { code: prefix + code.slice(0, start) + replacement + code.slice(nextFunction), map: null };
    },
  };
}
