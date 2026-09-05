export function studentDashboardRedesignPlugin() {
  return {
    name: "skillproof-student-dashboard-redesign",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const start = code.indexOf("function Dashboard(");
      if (start < 0) return null;
      const nextFunction = code.indexOf("\nfunction ", start + 10);
      if (nextFunction < 0) return null;
      const importLine = 'import StudentDashboardRedesign from "./StudentDashboardRedesign.jsx";\n';
      const replacement = 'function Dashboard(props) { return <StudentDashboardRedesign {...props} />; }';
      const prefix = code.includes('import StudentDashboardRedesign from "./StudentDashboardRedesign.jsx";') ? "" : importLine;
      return { code: prefix + code.slice(0, start) + replacement + code.slice(nextFunction), map: null };
    },
  };
}
