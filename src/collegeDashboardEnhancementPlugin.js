export function collegeDashboardEnhancementPlugin() {
  return {
    name: "skillproof-college-dashboard-enhancements",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      if (code.includes("EnhancedCollegeDashboard")) return null;
      let next = `import React from "react";\nimport { EnhancedCollegeDashboard, EnhancedCollegeStudents, EnhancedCollegeAnalytics } from "./collegeDashboardEnhancements.jsx";\nimport FixedStudentProfileModal from "./FixedStudentProfileModal.jsx";\n` + code;
      const dashboardStart = next.indexOf("function CollegeDashboard(");
      const studentsStart = next.indexOf("function CollegeStudents(");
      const modalStart = next.indexOf("function StudentProfileModal(");
      const analyticsStart = next.indexOf("function CollegeAnalytics(");
      const profileStart = next.indexOf("function CollegeProfile(");
      if ([dashboardStart, studentsStart, modalStart, analyticsStart, profileStart].some((x) => x < 0)) return null;
      next = next.slice(0, dashboardStart) + "function CollegeDashboard(props) { return React.createElement(EnhancedCollegeDashboard, props); }\n" + next.slice(studentsStart);
      const s = next.indexOf("function CollegeStudents(");
      const m = next.indexOf("function StudentProfileModal(");
      next = next.slice(0, s) + "function CollegeStudents(props) { return React.createElement(EnhancedCollegeStudents, { ...props, StudentProfileModal: FixedStudentProfileModal }); }\n" + next.slice(m);
      const a = next.indexOf("function CollegeAnalytics(");
      const p = next.indexOf("function CollegeProfile(");
      next = next.slice(0, a) + "function CollegeAnalytics(props) { return React.createElement(EnhancedCollegeAnalytics, props); }\n" + next.slice(p);
      return { code: next, map: null };
    },
  };
}
