import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function collegeDashboardEnhancementPlugin() {
  return {
    name: "skillproof-college-dashboard-enhancements",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      if (code.includes("EnhancedCollegeDashboard")) return null;
      const helperPath = resolve(process.cwd(), "src/collegeDashboardEnhancements.js");
      if (!readFileSync(helperPath, "utf8")) return null;
      let next = code;
      next = `import { EnhancedCollegeDashboard, EnhancedCollegeStudents, EnhancedCollegeAnalytics } from "./collegeDashboardEnhancements.js";\n` + next;
      const dashboardStart = next.indexOf("function CollegeDashboard(");
      const studentsStart = next.indexOf("function CollegeStudents(");
      const modalStart = next.indexOf("function StudentProfileModal(");
      const analyticsStart = next.indexOf("function CollegeAnalytics(");
      const profileStart = next.indexOf("function CollegeProfile(");
      if ([dashboardStart, studentsStart, modalStart, analyticsStart, profileStart].some((x) => x < 0)) return null;
      next = next.slice(0, dashboardStart) + "function CollegeDashboard(props) { return <EnhancedCollegeDashboard {...props} />; }\n" + next.slice(studentsStart);
      const s = next.indexOf("function CollegeStudents(");
      const m = next.indexOf("function StudentProfileModal(");
      next = next.slice(0, s) + "function CollegeStudents(props) { return <EnhancedCollegeStudents {...props} StudentProfileModal={StudentProfileModal} />; }\n" + next.slice(m);
      const a = next.indexOf("function CollegeAnalytics(");
      const p = next.indexOf("function CollegeProfile(");
      next = next.slice(0, a) + "function CollegeAnalytics(props) { return <EnhancedCollegeAnalytics {...props} />; }\n" + next.slice(p);
      return { code: next, map: null };
    },
  };
}
