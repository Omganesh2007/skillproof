import { useMemo, useState } from "react";
import { BriefcaseBusiness, Building2, ChevronDown, ChevronUp, LogOut, Mail, Search, ShieldCheck, Target, UserRound } from "lucide-react";

const API_BASE = "https://skillproof-backend-1.onrender.com/api";
const ROLES = [
  "Java Backend Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Python Developer",
  "AI/ML Engineer",
  "Data Analyst",
  "Cloud Engineer",
  "Cybersecurity Analyst",
];

async function searchTalent(role) {
  const token = localStorage.getItem("skillproof_industry_token") || localStorage.getItem("skillproof_token");
  const response = await fetch(`${API_BASE}/students/industry/talent?role=${encodeURIComponent(role)}`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to search talent");
  return data;
}

function passedOutLabel(student) {
  return student.passedOut ? "Passed out" : "Not passed out";
}

function suitabilityTone(score) {
  if (score >= 80) return "text-teal-700 bg-teal-50 border-teal-100";
  if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-slate-600 bg-slate-50 border-slate-200";
}

function StudentResult({ student, onOpen }) {
  return <button type="button" onClick={() => onOpen(student)} className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 hover:shadow-sm transition">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3"><h3 className="font-bold text-lg truncate">{student.name}</h3><span className="text-xs px-2.5 py-1 rounded-full border border-slate-200 text-slate-500">{student.department || "Department not provided"}</span></div>
        <p className="text-sm text-slate-500 mt-1">{student.college || "College not provided"}</p>
        <div className="flex flex-wrap gap-2 mt-3">{(student.matchingSkills || []).slice(0, 5).map((skill) => <span key={skill.name} className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">✓ {skill.name} {skill.score}%</span>)}</div>
      </div>
      <div className="lg:text-right shrink-0"><p className="text-xs text-slate-400">Role suitability</p><p className="text-3xl font-bold text-teal-700">{student.suitability}%</p><p className="text-xs text-slate-500 mt-1">{passedOutLabel(student)} · {student.graduationYear || "Year not provided"}</p></div>
    </div>
  </button>;
}

function StudentDetail({ student, onClose }) {
  if (!student) return null;
  return <div className="fixed inset-0 z-50 bg-slate-900/30 flex items-center justify-center p-4" onClick={onClose}>
    <div className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-widest text-teal-700">CANDIDATE PROFILE</p><h2 className="text-2xl font-bold mt-2">{student.name}</h2><p className="text-sm text-slate-500 mt-1">{student.college} · {student.department || "Department not provided"}</p></div><button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl">×</button></div>
      <div className="grid sm:grid-cols-3 gap-3 mt-6"><div className={`rounded-2xl border p-4 ${suitabilityTone(student.suitability)}`}><p className="text-xs opacity-70">Role suitability</p><p className="text-2xl font-bold mt-1">{student.suitability}%</p></div><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-400">Graduation</p><p className="font-bold mt-1">{student.graduationYear || "Not provided"}</p><p className="text-xs text-slate-500 mt-1">{passedOutLabel(student)}</p></div><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-400">Readiness</p><p className="font-bold mt-1">{student.verification_score || 0}%</p></div></div>
      <div className="mt-5 rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2"><Mail size={17} className="text-teal-700"/><p className="text-sm font-semibold">Student email</p></div><p className="mt-2 text-slate-700 break-all">{student.email || "Email not provided"}</p></div>
      <div className="mt-5"><h3 className="font-bold">Skills matching this role</h3><div className="flex flex-wrap gap-2 mt-3">{(student.matchingSkills || []).map((skill) => <span key={skill.name} className="text-sm px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100">{skill.name} · {skill.score}%</span>)}{!(student.matchingSkills || []).length && <p className="text-sm text-slate-500">No verified matching skills yet.</p>}</div></div>
      {(student.missingSkills || []).length > 0 && <div className="mt-5"><h3 className="font-bold">Role skill gaps</h3><div className="flex flex-wrap gap-2 mt-3">{student.missingSkills.map((skill) => <span key={skill} className="text-sm px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">{skill}</span>)}</div></div>}
      <div className="mt-6 pt-5 border-t border-slate-100"><p className="text-xs text-slate-400">Career preference</p><p className="text-sm text-slate-600 mt-1">{student.careers?.length ? student.careers.join(" · ") : "Not specified"}</p></div>
    </div>
  </div>;
}

export function IndustryDashboard({ logout }) {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState(ROLES[0]);
  const [roleQuery, setRoleQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCollege, setOpenCollege] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const user = useMemo(() => { try { return JSON.parse(localStorage.getItem("skillproof_industry_user") || "{}"); } catch { return {}; } }, []);
  const company = user.company || user.organization || user.name || "Industry Partner";
  const email = user.email || "Not provided";
  const department = user.department || "Talent Acquisition";
  const initials = company.split(/\s+/).map((x) => x[0]).join("").slice(0, 2).toUpperCase() || "IP";
  const filteredRoles = ROLES.filter((item) => item.toLowerCase().includes(roleQuery.toLowerCase()));

  const runSearch = async () => {
    if (!role) return;
    setLoading(true); setError(""); setOpenCollege("");
    try { setResults(await searchTalent(role)); }
    catch (err) { setResults(null); setError(err.message || "Unable to search talent"); }
    finally { setLoading(false); }
  };

  const nav = [["dashboard", "Dashboard", Building2], ["talent", "Talent", Target], ["jobs", "Jobs", BriefcaseBusiness], ["profile", "Industry Profile", UserRound]];

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200">
      <div className="p-5 border-b border-slate-100"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">S</div><div><p className="font-bold">SkillProof</p><p className="text-xs text-slate-400">Industry</p></div></div></div>
      <nav className="p-4 space-y-2">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setPage(id)} className={`w-full h-11 rounded-xl px-3 flex items-center gap-3 text-sm font-medium ${page === id ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}><Icon size={17}/>{label}</button>)}</nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100"><button onClick={logout} className="w-full h-10 flex items-center gap-2 px-2 text-sm text-slate-500"><LogOut size={16}/>Sign out</button></div>
    </aside>

    <div className="ml-64 min-h-screen"><header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between"><div><p className="text-xs text-slate-400">Industry workspace</p><h1 className="font-semibold">{page === "talent" ? "Discover talent" : page === "jobs" ? "Job opportunities" : page === "profile" ? "Industry Profile" : "Industry dashboard"}</h1></div><button onClick={() => setPage("profile")} className="flex items-center gap-3 text-right"><div><p className="text-sm font-semibold">{company}</p><p className="text-xs text-slate-400">{department}</p></div><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold">{initials}</div></button></header>
      <main className="p-8 max-w-7xl mx-auto">
        {page === "dashboard" && <div className="space-y-6"><section><p className="text-xs font-bold tracking-widest text-teal-700">INDUSTRY</p><h2 className="text-3xl font-bold mt-2">Welcome, {company}.</h2><p className="text-slate-500 mt-2">Search verified student talent by the exact role you need to hire.</p></section><section className="bg-white border border-slate-200 rounded-3xl p-6"><h2 className="text-xl font-bold">Find candidates by role</h2><p className="text-sm text-slate-500 mt-1">Choose a role and SkillProof ranks students by verified role suitability.</p><button onClick={() => setPage("talent")} className="mt-5 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold">Search talent →</button></section></div>}

        {page === "talent" && <div className="space-y-6"><section><p className="text-xs font-bold tracking-widest text-teal-700">TALENT SEARCH</p><h2 className="text-3xl font-bold mt-2">Find students for a role</h2><p className="text-slate-500 mt-2">Search a job role to see colleges and the students who best fit it.</p></section>
          <section className="bg-white border border-slate-200 rounded-3xl p-6"><div className="grid lg:grid-cols-[1fr_auto] gap-4 items-end"><div><label className="text-sm font-semibold text-slate-700">Search job role</label><div className="relative mt-2"><Search size={17} className="absolute left-4 top-4 text-slate-400"/><input value={roleQuery} onChange={(e) => setRoleQuery(e.target.value)} placeholder="Search e.g. Java Backend Developer" className="w-full h-12 rounded-xl border border-slate-200 pl-11 pr-4 outline-none focus:border-teal-400" />{roleQuery && filteredRoles.length > 0 && <div className="absolute z-20 left-0 right-0 top-14 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">{filteredRoles.map((item) => <button key={item} type="button" onClick={() => { setRole(item); setRoleQuery(item); }} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50">{item}</button>)}</div>}</div></div><button type="button" onClick={runSearch} disabled={loading} className="h-12 px-6 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-60">{loading ? "Searching..." : "Search talent"}</button></div><div className="flex flex-wrap gap-2 mt-4">{ROLES.map((item) => <button key={item} type="button" onClick={() => { setRole(item); setRoleQuery(item); }} className={`text-xs px-3 py-2 rounded-full border ${role === item ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-white text-slate-500 border-slate-200"}`}>{item}</button>)}</div></section>
          {error && <div className="rounded-2xl border border-rose-100 bg-rose-50 text-rose-700 px-5 py-4 text-sm">{error}</div>}
          {results && <section className="space-y-4"><div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><p className="text-xs text-slate-400">ROLE SELECTED</p><h3 className="text-xl font-bold mt-1">{results.role}</h3><p className="text-sm text-slate-500 mt-1">Required skills: {results.requiredSkills.join(" · ")}</p></div><div className="text-left md:text-right"><p className="text-xs text-slate-400">Candidates</p><p className="text-2xl font-bold">{results.totalStudents}</p></div></div>{results.colleges.map((group) => <div key={group.college} className="bg-white border border-slate-200 rounded-2xl overflow-hidden"><button type="button" onClick={() => setOpenCollege(openCollege === group.college ? "" : group.college)} className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50"><div><div className="flex items-center gap-3"><Building2 size={18} className="text-teal-700"/><h3 className="font-bold">{group.college}</h3></div><p className="text-sm text-slate-500 mt-1">{group.studentCount} matching student{group.studentCount === 1 ? "" : "s"} · Best suitability {group.topSuitability}%</p></div>{openCollege === group.college ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</button>{openCollege === group.college && <div className="p-4 pt-0 space-y-3">{group.students.map((student) => <StudentResult key={student.id} student={student} onOpen={setSelectedStudent} />)}</div>}</div>)}{!results.colleges.length && <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">No students found for this role yet.</div>}</section>}
        </div>}

        {page === "jobs" && <div className="space-y-5"><section><p className="text-xs font-bold tracking-widest text-teal-700">JOBS</p><h2 className="text-3xl font-bold mt-2">Job opportunities</h2><p className="text-slate-500 mt-2">Create and manage internship and placement opportunities.</p></section><div className="grid md:grid-cols-2 gap-4"><div className="bg-white border border-slate-200 rounded-2xl p-5"><BriefcaseBusiness size={21}/><h3 className="font-bold mt-4">Java Backend Intern</h3><p className="text-sm text-slate-500 mt-2">Spring Boot, REST APIs and SQL · 6 month internship.</p></div><div className="bg-white border border-slate-200 rounded-2xl p-5"><BriefcaseBusiness size={21}/><h3 className="font-bold mt-4">Frontend Intern</h3><p className="text-sm text-slate-500 mt-2">React, JavaScript and responsive UI · 3 month internship.</p></div></div></div>}

        {page === "profile" && <div className="space-y-5"><section><p className="text-xs font-bold tracking-widest text-teal-700">PROFILE</p><h2 className="text-3xl font-bold mt-2">Industry profile</h2><p className="text-slate-500 mt-2">Organization information for the SkillProof collaboration workspace.</p></section><section className="bg-white border border-slate-200 rounded-3xl p-6"><div className="grid md:grid-cols-2 gap-4"><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Company / organization</p><p className="font-bold mt-2">{company}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Work email</p><p className="font-bold mt-2 break-all">{email}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Hiring function</p><p className="font-bold mt-2">{department}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Account type</p><p className="font-bold mt-2">Industry partner</p></div></div></section><section className="bg-white border border-slate-200 rounded-3xl p-6"><div className="flex items-center gap-2"><ShieldCheck size={20} className="text-teal-700"/><h2 className="font-bold">Verified hiring</h2></div><p className="text-sm text-slate-500 mt-2 leading-6">Talent results are ranked using verified student skills, readiness and career preference for the selected role.</p></section></div>}
      </main>
    </div>
    <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />
  </div>;
}
