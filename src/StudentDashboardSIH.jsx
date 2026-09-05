import { useMemo, useState } from "react";
import { ArrowRight, Award, BookOpen, BriefcaseBusiness, CheckCircle2, Code2, FolderKanban, LayoutDashboard, Search, ShieldCheck, Sparkles, Target, User } from "lucide-react";

const stagesByCareer = {
  "Java Backend Developer": [
    ["Programming Fundamentals", "Learn core programming concepts with Java."],
    ["Data Structures & Algorithms", "Build problem-solving skills for technical interviews."],
    ["Core Java", "Master OOP, collections, exceptions and more."],
    ["Spring Boot", "Build real-world backend applications."],
    ["Databases", "Work with SQL, queries and database design."],
    ["APIs & Backend Systems", "Build REST APIs, authentication and deployment."],
    ["Real-world Projects", "Build and deploy complete backend projects."]
  ],
  "Full Stack Developer": [
    ["Web Foundations", "Understand browsers, HTTP and web structure."],
    ["HTML & CSS", "Build semantic and responsive interfaces."],
    ["JavaScript", "Master modern JavaScript and asynchronous programming."],
    ["React", "Build interactive frontend applications."],
    ["Backend Development", "Build APIs and server-side applications."],
    ["Databases", "Design schemas and write efficient queries."],
    ["Full Stack Project", "Build and deploy a complete full stack project."]
  ],
  "Frontend Developer": [
    ["Web Foundations", "Understand browsers, HTTP, web structure and developer tools."],
    ["HTML & CSS", "Build semantic, responsive and maintainable web interfaces."],
    ["JavaScript", "Master modern JavaScript, DOM events, async code and modules."],
    ["React", "Build interactive user interfaces with React."],
    ["Responsive Design", "Create mobile-first, responsive layouts."],
    ["Git & GitHub", "Version control, collaboration and open source."],
    ["Frontend Portfolio Project", "Build and deploy a real-world project."]
  ]
};

export default function StudentDashboardSIH({ student = {}, setActivePage }) {
  const careers = useMemo(() => (Array.isArray(student.careers) && student.careers.length ? student.careers : ["Java Backend Developer", "Full Stack Developer", "Frontend Developer"]).slice(0, 3), [student.careers]);
  const [selected, setSelected] = useState(careers[0]);
  const stages = stagesByCareer[selected] || stagesByCareer["Java Backend Developer"];
  const skills = Array.isArray(student.skills) ? student.skills : [];
  const verified = skills.filter((s) => s && s.verified).length;
  const initials = (student.name || "OM").slice(0, 2).toUpperCase();
  const go = (page) => setActivePage && setActivePage(page);

  return <div className="w-full">
    <section className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-white px-6 py-6 mb-7 flex items-center justify-between gap-6">
      <div><p className="text-xs font-bold tracking-[0.18em] text-teal-700">WELCOME BACK</p><h2 className="text-3xl font-bold mt-2">Hi, {student.name || "Student"}! 👋</h2><p className="text-base text-slate-500 mt-1">Here is your SkillProof career progress for today.</p></div>
      <p className="hidden md:block text-sm text-slate-500">{careers.length} target careers</p>
    </section>

    <section className="mb-7">
      <p className="text-xs font-bold tracking-[0.18em] text-teal-700">CAREER FOCUS</p>
      <div className="flex items-center justify-between gap-4"><div><h2 className="text-3xl font-bold mt-1">Career readiness</h2><p className="text-base text-slate-500 mt-2">Explore the complete skill path for your target career. Learn step by step and become job ready.</p></div><button onClick={() => go("careers")} className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-teal-200 text-teal-700 font-semibold">Change Career Focus <Target size={17}/></button></div>
      <div className="flex gap-2 mt-5 overflow-x-auto">{careers.map((career, i) => <button key={career} onClick={() => setSelected(career)} className={`shrink-0 px-4 py-3 rounded-xl border bg-white text-left ${selected === career ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-600"}`}><span className="font-medium">{career}</span><span className="ml-2 text-[10px] uppercase text-slate-400">{i === 0 ? "Primary" : "Target"}</span></button>)}</div>
    </section>

    <div className="grid xl:grid-cols-[290px_minmax(0,1fr)_330px] gap-5 items-start">
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <p className="text-xs font-bold tracking-[0.16em] text-teal-700">TARGET CAREER</p><h3 className="text-2xl font-bold leading-tight mt-3">{selected}</h3><p className="text-sm text-slate-500 leading-6 mt-3">Follow the complete learning path and build evidence as you progress.</p>
        <div className="flex items-center gap-4 mt-7"><div className="w-24 h-24 rounded-full border-[8px] border-teal-400 flex items-center justify-center"><b className="text-2xl">0%</b></div><div><b>Career readiness</b><p className="text-xs text-slate-400 mt-1">0 of {stages.length} stages completed</p></div></div>
        <div className="mt-7 rounded-xl bg-teal-50 border border-teal-100 p-4"><p className="text-xs font-bold text-teal-700">HOW IT WORKS</p><p className="text-xs text-slate-500 leading-5 mt-2">Complete each stage in order. Build skills, verify evidence and unlock the next stage.</p></div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-5 border-b border-slate-100 flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Target size={20}/></div><div><h3 className="font-bold text-lg">Complete skill path for {selected}</h3><p className="text-xs text-slate-400">Follow these 7 stages to master the required skills.</p></div></div>
        <div className="p-3 space-y-2">{stages.map(([name, description], i) => <div key={name} className={`rounded-xl border p-4 ${i === 0 ? "border-teal-300 bg-teal-50/30" : "border-slate-200"}`}><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold shrink-0">{i + 1}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><p className="font-bold text-sm">{name}</p><p className="text-xs text-slate-400 mt-1">{description}</p></div><span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] text-slate-500 h-fit">{i === 0 ? "Not started" : "Locked"}</span></div><div className="h-1.5 bg-slate-100 rounded-full mt-3"><div className="h-full bg-teal-400 rounded-full" style={{width: "0%"}}/></div></div></div></div>)}</div>
      </section>

      <aside className="space-y-5">
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">Skill Summary</h3><span className="text-xs text-slate-400">{stages.length} stages</span></div><div className="space-y-3">{stages.map(([name]) => <div key={name}><div className="flex justify-between text-xs"><span>{name}</span><span className="text-slate-400">0/100</span></div><div className="h-1.5 bg-slate-100 rounded-full mt-1.5"/></div>)}</div><button onClick={() => go("roadmap")} className="mt-5 text-sm font-semibold text-teal-700 flex items-center gap-1">Open full skill tree <ArrowRight size={14}/></button></section>
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center"><Sparkles size={18}/></div><div><h3 className="font-bold">Recommended for you</h3><p className="text-xs text-slate-400">Based on your career focus</p></div></div><button onClick={() => go("opportunities")} className="w-full text-left p-3 rounded-xl border border-slate-200 mb-2"><b className="text-sm">Build your first project</b><p className="text-xs text-slate-400 mt-1">Create portfolio evidence for {selected}.</p></button><button onClick={() => go("opportunities")} className="w-full text-left p-3 rounded-xl border border-slate-200"><b className="text-sm">Internships & jobs</b><p className="text-xs text-slate-400 mt-1">Find opportunities matching your skills.</p></button></section>
      </aside>
    </div>
  </div>;
}