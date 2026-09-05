const demoStudent = {
  name: "Arjun Kumar",
  email: "arjun.demo@skillproof.local",
  college: "Panimalar Engineering College",
  collegeId: "COL-PANIMALA-153913",
  department: "Computer Science and Engineering",
  graduationYear: "2027",
  careers: ["Java Backend Developer", "Full Stack Developer", "Frontend Developer"],
  skills: [
    { name: "Java", level: 86, verified: true, verificationScore: 86 },
    { name: "Spring Boot", level: 78, verified: true, verificationScore: 78 },
    { name: "SQL", level: 82, verified: true, verificationScore: 82 },
    { name: "REST API", level: 80, verified: true, verificationScore: 80 },
    { name: "Git & GitHub", level: 88, verified: true, verificationScore: 88 },
    { name: "Docker", level: 72, verified: true, verificationScore: 72 },
    { name: "JavaScript", level: 76, verified: true, verificationScore: 76 },
    { name: "React", level: 73, verified: false },
    { name: "HTML & CSS", level: 84, verified: true, verificationScore: 84 }
  ]
};

export function demoStudentLoginPlugin() {
  return {
    name: "skillproof-demo-student-login",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const start = code.indexOf("  const login = async (e) => {");
      const end = code.indexOf("\n  const register = async", start);
      if (start < 0 || end < 0) return null;
      const replacement = `  const login = async (e) => { e.preventDefault(); if (student.email.toLowerCase().trim() === "arjun.demo@skillproof.local" && student.password === "Password123!") { const demo = ${JSON.stringify(demoStudent)}; saveStudent({ ...demo, password: "" }); setUserRole("student"); setScreen("app"); setActivePage("dashboard"); return; } try { const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email: student.email, password: student.password }) }); if (data.user?.role && data.user.role !== "student") throw new Error("This account is not a student account. Use the correct role login."); if (data.token) localStorage.setItem("skillproof_token", data.token); const u = data.user || {}; saveStudent({ ...student, name: u.name || student.name, email: u.email || student.email, college: u.college || student.college, collegeId: u.college_id ?? u.collegeId ?? student.collegeId, department: u.department || student.department, graduationYear: u.graduation_year || u.graduationYear || student.graduationYear, careers: u.careers || student.careers || [], skills: u.skills || student.skills || [] }); setUserRole("student"); setScreen("app"); setActivePage("dashboard"); } catch (error) { alert(error.message || "Student login failed."); } };`;
      return { code: code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
