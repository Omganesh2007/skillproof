import { useMemo, useState } from "react";
import { BriefcaseBusiness, Building2, LogOut, Search, ShieldCheck, Target, UserRound } from "lucide-react";

const demoTalent = [
  { name: "Rahul Kumar", college: "Anna University", skill: "Java", readiness: 86 },
  { name: "Priya S", college: "IIT Madras", skill: "React", readiness: 82 },
  { name: "Arun K", college: "NIT Trichy", skill: "Python", readiness: 79 },
];

export function IndustryDashboard({ logout }) {
  const [page, setPage] = useState("dashboard");
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("skillproof_industry_user") || "{}"); }
    catch { return {}; }
  }, []);
  const company = user.company || user.organization || user.name || "Industry Partner";
  const email = user.email || "Not provided";
  const department = user.department || "Talent Acquisition";
  const initials = company.split(/\s+/).map(x => x[0]).join("").slice(0, 2).toUpperCase() || "IP";

  const nav = [
    ["dashboard", "Dashboard", Building2],
    ["talent", "Talent", Target],
    ["jobs", "Jobs", BriefcaseBusiness],
    ["profile", "Industry Profile", UserRound],
  ];

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">S</div><div><p className="font-bold">SkillProof</p><p className="text-xs text-slate-400">Industry</p></div></div>
      </div>
      <nav className="p-4 space-y-2">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setPage(id)} className={`w-full h-11 rounded-xl px-3 flex items-center gap-3 text-sm font-medium ${page === id ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}><Icon size={17}/>{label}</button>)}</nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100"><button onClick={logout} className="w-full h-10 flex items-center gap-2 px-2 text-sm text-slate-500"><LogOut size={16}/>Sign out</button></div>
    </aside>

    <div className="ml-64 min-h-screen">
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
        <div><p className="text-xs text-slate-400">Industry workspace</p><h1 className="font-semibold">{page === "talent" ? "Discover talent" : page === "jobs" ? "Job opportunities" : page === "profile" ? "Industry Profile" : "Industry dashboard"}</h1></div>
        <button onClick={() => setPage("profile")} className="flex items-center gap-3 text-right"><div><p className="text-sm font-semibold">{company}</p><p className="text-xs text-slate-400">{department}</p></div><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold">{initials}</div></button>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {page === "dashboard" && <div className="space-y-6">
          <section><p className="text-xs font-bold tracking-widest text-teal-700">INDUSTRY</p><h2 className="text-3xl font-bold mt-2">Welcome, {company}.</h2><p className="text-slate-500 mt-2">Your hiring workspace for discovering evidence-backed student talent.</p></section>

          <section className="bg-white border border-slate-200 rounded-3xl p-6"><div className="flex items-center justify-between mb-5"><div><h2 className="text-xl font-bold">Industry profile</h2><p className="text-sm text-slate-500 mt-1">Organization details used across your hiring workspace.</p></div><button onClick={() => setPage("profile")} className="text-sm font-semibold text-teal-700">View profile →</button></div><div className="grid md:grid-cols-3 gap-4"><div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Company / organization</p><p className="font-bold mt-2">{company}</p></div><div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Work email</p><p className="font-bold mt-2 break-all">{email}</p></div><div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Hiring function</p><p className="font-bold mt-2">{department}</p></div></div></section>

          <section className="bg-white border border-slate-200 rounded-3xl p-6"><h2 className="text-xl font-bold">Hiring workspace</h2><p className="text-sm text-slate-500 mt-1 mb-5">Quick actions for recruitment and academia-industry collaboration.</p><div className="grid md:grid-cols-3 gap-4">
            <button onClick={() => setPage("talent")} className="text-left p-5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><Target size={20}/></div><h3 className="font-bold mt-4">Discover verified talent</h3><p className="text-sm text-slate-500 mt-2 leading-6">Find students using verified skills, readiness and career fit.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">Browse talent →</span></button>
            <button onClick={() => setPage("jobs")} className="text-left p-5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><BriefcaseBusiness size={20}/></div><h3 className="font-bold mt-4">Manage opportunities</h3><p className="text-sm text-slate-500 mt-2 leading-6">Review internship and placement opportunities.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">View jobs →</span></button>
            <button onClick={() => setPage("profile")} className="text-left p-5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><UserRound size={20}/></div><h3 className="font-bold mt-4">Industry profile</h3><p className="text-sm text-slate-500 mt-2 leading-6">Keep organization and hiring contact information ready.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">Open profile →</span></button>
          </div></section>

          <section className="bg-white border border-slate-200 rounded-3xl p-6"><h2 className="text-xl font-bold">How SkillProof helps your hiring</h2><p className="text-sm text-slate-500 mt-1 mb-5">An evidence-first workflow for placement collaboration.</p><div className="grid md:grid-cols-3 gap-4"><div className="p-5 rounded-2xl bg-slate-50"><ShieldCheck className="text-teal-700" size={22}/><h3 className="font-bold mt-4">Verified evidence</h3><p className="text-sm text-slate-500 mt-2">Review assessment-backed skills instead of relying only on claims.</p></div><div className="p-5 rounded-2xl bg-slate-50"><Target className="text-teal-700" size={22}/><h3 className="font-bold mt-4">Career fit</h3><p className="text-sm text-slate-500 mt-2">Compare student strengths with the roles you are hiring for.</p></div><div className="p-5 rounded-2xl bg-slate-50"><Search className="text-teal-700" size={22}/><h3 className="font-bold mt-4">Readiness signals</h3><p className="text-sm text-slate-500 mt-2">Prioritize candidates with stronger evidence and career readiness.</p></div></div></section>
        </div>}

        {page === "talent" && <div className="space-y-5"><section><p className="text-xs font-bold tracking-widest text-teal-700">TALENT</p><h2 className="text-3xl font-bold mt-2">Discover talent</h2><p className="text-slate-500 mt-2">Explore students with evidence-backed skills.</p></section>{demoTalent.map(d => <div key={d.name} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between"><div><h3 className="font-bold">{d.name}</h3><p className="text-sm text-slate-500 mt-1">{d.college} · Strong in {d.skill}</p></div><div className="text-right"><p className="text-xs text-slate-400">Readiness</p><p className="text-xl font-bold text-teal-700">{d.readiness}%</p></div></div>)}</div>}

        {page === "jobs" && <div className="space-y-5"><section><p className="text-xs font-bold tracking-widest text-teal-700">JOBS</p><h2 className="text-3xl font-bold mt-2">Job opportunities</h2><p className="text-slate-500 mt-2">Internship and placement opportunities for verified student talent.</p></section><div className="grid md:grid-cols-2 gap-4"><div className="bg-white border border-slate-200 rounded-2xl p-5"><BriefcaseBusiness size={21}/><h3 className="font-bold mt-4">Java Backend Intern</h3><p className="text-sm text-slate-500 mt-2">Spring Boot, REST APIs and SQL · 6 month internship.</p></div><div className="bg-white border border-slate-200 rounded-2xl p-5"><BriefcaseBusiness size={21}/><h3 className="font-bold mt-4">Frontend Intern</h3><p className="text-sm text-slate-500 mt-2">React, JavaScript and responsive UI · 3 month internship.</p></div></div></div>}

        {page === "profile" && <div className="space-y-5"><section><p className="text-xs font-bold tracking-widest text-teal-700">PROFILE</p><h2 className="text-3xl font-bold mt-2">Industry profile</h2><p className="text-slate-500 mt-2">Organization information for the SkillProof collaboration workspace.</p></section><section className="bg-white border border-slate-200 rounded-3xl p-6"><div className="grid md:grid-cols-2 gap-4"><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Company / organization</p><p className="font-bold mt-2">{company}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Work email</p><p className="font-bold mt-2 break-all">{email}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Hiring function</p><p className="font-bold mt-2">{department}</p></div><div className="p-5 rounded-2xl bg-slate-50"><p className="text-xs text-slate-400">Account type</p><p className="font-bold mt-2">Industry partner</p></div></div></section><section className="bg-white border border-slate-200 rounded-3xl p-6"><h2 className="font-bold">Collaboration focus</h2><p className="text-sm text-slate-500 mt-2 leading-6">Connect with verified student talent for internships and placements. Use Talent to review skills, career fit and readiness signals.</p></section></div>}
      </main>
    </div>
  </div>;
}
