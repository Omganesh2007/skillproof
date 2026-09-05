import { useMemo, useState } from "react";
import { ArrowRight, Award, Bell, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, Code2, FolderKanban, GitBranch, LayoutDashboard, Lightbulb, Pencil, Search, Settings, ShieldCheck, Sparkles, Target, User, Users, Wrench } from "lucide-react";

const DEFAULT_CAREERS = ["Frontend Developer", "Full Stack Developer", "Java Backend Developer"];
const CAREER_STAGES = {
  "Frontend Developer": [
    ["Web Foundations",60,"Understand browsers, HTTP, web structure and developer tools."],
    ["HTML & CSS",85,"Build semantic, responsive and maintainable web interfaces."],
    ["JavaScript",80,"Master modern JavaScript, DOM events, async code and modules."],
    ["React",75,"Build interactive user interfaces with React."],
    ["Responsive Design",70,"Create mobile-first, responsive layouts."],
    ["Git & GitHub",65,"Version control, collaboration and open source."],
    ["Frontend Portfolio Project",70,"Build and deploy a real-world project."]
  ],
  "Java Backend Developer": [
    ["Programming Fundamentals",60,"Learn core programming concepts with Java."],
    ["Data Structures & Algorithms",80,"Build problem-solving skills for technical interviews."],
    ["Core Java",85,"Master OOP, collections, exceptions and more."],
    ["Spring Boot",90,"Build real-world backend applications."],
    ["Databases",75,"Work with SQL, queries and database design."],
    ["APIs & Backend Systems",80,"Build REST APIs, authentication and deployment."],
    ["Real-world Projects",70,"Build and deploy complete backend projects."]
  ],
  "Full Stack Developer": [
    ["Web Foundations",60,"Understand browsers, HTTP and web structure."],
    ["HTML & CSS",80,"Build semantic and responsive interfaces."],
    ["JavaScript",80,"Master modern JavaScript and asynchronous programming."],
    ["React",75,"Build interactive frontend applications."],
    ["Backend Development",75,"Build APIs and server-side applications."],
    ["Databases",70,"Design schemas and write efficient queries."],
    ["Full Stack Project",75,"Build and deploy a complete full stack project."]
  ]
};
const ICONS = [BookOpen, Code2, Sparkles, Wrench, LayoutDashboard, GitBranch, FolderKanban];
const SKILL_ALIASES = {
  "web foundations": ["html & css","javascript"], "programming fundamentals": ["java"],
  "html & css": ["html & css"], javascript: ["javascript"], react: ["react"],
  "responsive design": ["html & css","react"], "git & github": ["git & github"],
  "frontend portfolio project": ["react","javascript"], "data structures & algorithms": ["java"],
  "core java": ["java"], "spring boot": ["spring boot"], databases: ["sql"],
  "apis & backend systems": ["rest api"], "real-world projects": ["java","spring boot"],
  "backend development": ["java","spring boot"], "full stack project": ["react","javascript"]
};

function stageScore(name, max, skills) {
  const set = new Set((skills || []).map(x => String(x).toLowerCase()));
  const matches = (SKILL_ALIASES[name.toLowerCase()] || []).filter(x => set.has(x));
  return matches.length ? Math.min(max, Math.round(max * 0.5)) : 0;
}

export default function StudentDashboardRedesign({ student = {}, setActivePage }) {
  const careers = useMemo(() => (Array.isArray(student.careers) && student.careers.length ? student.careers : DEFAULT_CAREERS).slice(0,3), [student.careers]);
  const [selectedCareer, setSelectedCareer] = useState(careers[0] || "Frontend Developer");
  const stages = (CAREER_STAGES[selectedCareer] || CAREER_STAGES["Frontend Developer"]).map(([name,max,description]) => ({ name,max,description,score:stageScore(name,max,student.skills) }));
  const completed = stages.filter(x => x.score >= x.max).length;
  const progress = Math.round(stages.reduce((a,x) => a+x.score,0) / stages.reduce((a,x) => a+x.max,0) * 100);
  const go = page => setActivePage?.(page);
  const initials = (student.name || "OM").slice(0,2).toUpperCase();

  return <div className="min-h-screen bg-[#f8fafc] text-[#10213f]">
    <header className="h-[98px] bg-white border-b border-slate-200 flex items-center justify-between px-5 lg:px-8">
      <div><p className="text-[13px] text-slate-400">SkillProof workspace</p><h1 className="text-[18px] font-bold leading-6">Dashboard</h1></div>
      <div className="flex items-center gap-4"><div className="hidden md:flex items-center gap-2 w-[310px] h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-400"><Search size={17}/><span className="text-xs">Search skills, jobs, or opportunities...</span></div><button aria-label="Notifications" className="relative w-10 h-10 flex items-center justify-center"><Bell size={21}/><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"/></button><div className="flex items-center gap-2"><div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-sm">{initials}</div><div className="hidden sm:block leading-tight"><p className="text-sm font-bold">{student.name || "Student"}</p><p className="text-xs text-slate-400">Student</p></div></div></div>
    </header>
    <div className="grid lg:grid-cols-[298px_minmax(0,1fr)] min-h-[calc(100vh-98px)]">
      <aside className="hidden lg:flex bg-white border-r border-slate-200 flex-col"><div className="h-[98px] px-5 flex items-center border-b border-slate-200"><div className="w-11 h-11 rounded-xl bg-teal-500 text-white flex items-center justify-center text-2xl font-bold mr-3">S</div><span className="text-[24px] font-bold">SkillProof</span></div><nav className="p-4 space-y-6 overflow-y-auto"><NavSection title="OVERVIEW"><NavItem active icon={LayoutDashboard} label="Dashboard" onClick={() => go("dashboard")}/><NavItem icon={BookOpen} label="My Learning" onClick={() => go("roadmap")}/><NavItem icon={Award} label="Skill Gap" onClick={() => go("gaps")}/><NavItem icon={Target} label="Roadmap" onClick={() => go("roadmap")}/></NavSection><NavSection title="SKILLS"><NavItem icon={BookOpen} label="My Skills" onClick={() => go("skills")}/><NavItem icon={ShieldCheck} label="Verify Skills" onClick={() => go("verify")}/><NavItem icon={Award} label="Certificates" onClick={() => go("verify")}/><NavItem icon={FolderKanban} label="Projects" onClick={() => go("opportunities")}/></NavSection><NavSection title="OPPORTUNITIES"><NavItem icon={BriefcaseBusiness} label="Internships & Jobs" onClick={() => go("opportunities")}/></NavSection></nav><div className="mt-auto border-t border-slate-100 p-4"><NavItem icon={User} label="My Profile" onClick={() => go("profile")}/><NavItem icon={Settings} label="Settings" onClick={() => go("settings")}/><button onClick={() => go("landing")} className="w-full mt-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500"><ArrowRight size={17}/>Sign out</button></div></aside>
      <main className="min-w-0 p-5 lg:p-9 overflow-hidden"><div className="max-w-[1410px] mx-auto">
        <section className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50/80 to-white px-6 py-6 mb-6 flex items-center justify-between gap-6"><div><p className="text-xs font-bold tracking-[0.16em] text-teal-700">WELCOME BACK</p><h2 className="text-[30px] lg:text-[32px] font-bold mt-1">Hi, {student.name || "Student"}! 👋</h2><p className="text-base text-slate-500 mt-1">Here is your SkillProof career progress for today.</p></div><div className="hidden md:block text-right"><p className="text-sm text-slate-500">{careers.length} target careers</p></div></section>
        <section className="mb-6"><div className="flex items-end justify-between gap-4 mb-4"><div><p className="text-xs font-bold tracking-[0.16em] text-teal-700">CAREER FOCUS</p><h2 className="text-[30px] font-bold mt-1">Career readiness</h2><p className="text-base text-slate-500 mt-1">Explore the complete skill path for your target career. Learn step by step and become job ready.</p></div></div><div className="flex gap-2 overflow-x-auto pb-1">{careers.map((career,i)=><button key={career} type="button" onClick={() => setSelectedCareer(career)} className={`shrink-0 px-4 py-3 rounded-xl border text-base ${selectedCareer===career ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-600"}`}>{career}<span className="ml-2 text-[10px] uppercase text-slate-400">{i===0?"Primary":"Target"}</span></button>)}</div></section>
        <div className="grid xl:grid-cols-[288px_minmax(500px,1fr)_340px] gap-5 items-start">
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"><p className="text-xs font-bold tracking-[0.15em] text-teal-700">TARGET CAREER</p><h3 className="text-[26px] font-bold leading-tight mt-3">{selectedCareer}</h3><p className="text-sm text-slate-500 leading-6 mt-3">Follow the complete learning path and build evidence as you progress.</p><div className="flex items-center gap-4 mt-6"><div className="w-24 h-24 rounded-full border-[8px] border-teal-400 flex items-center justify-center"><span className="text-2xl font-bold">{progress}%</span></div><div><p className="font-bold">Career readiness</p><p className="text-xs text-slate-400 mt-1">{completed} of {stages.length} stages completed</p></div></div><div className="mt-6 rounded-xl bg-teal-50/70 border border-teal-100 p-4"><p className="text-xs font-bold text-teal-700">HOW IT WORKS</p><p className="text-xs text-slate-500 leading-5 mt-2">Complete each stage in order. Build skills, verify evidence and unlock the next stage.</p></div></section>
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"><div className="px-5 py-5 flex items-center justify-between border-b border-slate-100"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Target size={20}/></div><div><h3 className="font-bold text-lg">Complete skill path for {selectedCareer}</h3><p className="text-xs text-slate-400">Follow these 7 stages to master the required skills.</p></div></div></div><div className="p-3 space-y-2">{stages.map((stage,index)=>{const Icon=ICONS[index]; const locked=index>completed && stage.score===0; return <div key={stage.name} className={`rounded-xl border p-4 flex items-center gap-3 ${index===completed ? "border-teal-300 bg-teal-50/30" : "border-slate-200"}`}><div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0"><span className="font-bold">{index+1}</span></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-sm">{stage.name}</p><p className="text-xs text-slate-400 mt-1">{stage.description}</p></div><div className="flex items-center gap-3 shrink-0"><span className="text-xs font-bold text-teal-600">{stage.score}/{stage.max}</span><span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] text-slate-500">{stage.score>=stage.max?"Completed":locked?"Locked":"Not started"}</span></div></div><div className="h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:`${Math.min(100,stage.score/stage.max*100)}%`}}/></div></div><Icon size={16} className="text-slate-300 hidden md:block"/></div>})}</div></section>
          <aside className="space-y-5"><section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">Skill Summary</h3><span className="text-xs text-slate-400">{stages.length} stages</span></div><div className="space-y-3">{stages.map(stage=><div key={stage.name}><div className="flex justify-between text-xs"><span>{stage.name}</span><span className="text-slate-400">{stage.score}/{stage.max}</span></div><div className="h-1.5 bg-slate-100 rounded-full mt-1.5"><div className="h-full bg-teal-300 rounded-full" style={{width:`${stage.score/stage.max*100}%`}}/></div></div>)}</div><button type="button" onClick={() => go("roadmap")} className="mt-5 text-sm font-semibold text-teal-700 flex items-center gap-1">Open full skill tree <ArrowRight size={14}/></button></section><section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Lightbulb size={19}/></div><div><h3 className="font-bold">Recommended for you</h3><p className="text-xs text-slate-400">Based on your career focus</p></div></div><Recommendation title={`Build Your First ${selectedCareer.includes("Backend") ? "Backend" : "Frontend"} Project`} text="A step-by-step guide to building your portfolio." onClick={() => go("opportunities")}/><Recommendation title={`Top ${selectedCareer.includes("Java") ? "Java" : "Career"} Projects`} text="Hands-on projects to boost your skills." onClick={() => go("opportunities")}/><Recommendation title="Internships for Developers" text="Find opportunities that match your skills." onClick={() => go("opportunities")}/></section></aside>
        </div>
      </div></main>
    </div>
  </div>;
}
function NavSection({title,children}){return <div><p className="px-3 mb-2 text-[11px] font-bold tracking-[0.16em] text-slate-400">{title}</p><div className="space-y-1">{children}</div></div>}
function NavItem({icon:Icon,label,active,onClick}){return <button type="button" onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm ${active?"bg-teal-50 text-teal-700 font-semibold":"text-slate-500 hover:bg-slate-50"}`}><Icon size={17}/>{label}</button>}
function Recommendation({title,text,onClick}){return <button type="button" onClick={onClick} className="w-full flex items-center gap-3 text-left border border-slate-200 rounded-xl p-3 mb-2 hover:border-teal-200"><div className="w-9 h-9 rounded-xl bg-slate-50 text-teal-600 flex items-center justify-center shrink-0"><Sparkles size={16}/></div><div className="min-w-0 flex-1"><p className="text-xs font-bold">{title}</p><p className="text-[10px] text-slate-400 mt-0.5 truncate">{text}</p></div><ChevronRight size={15} className="text-slate-300"/></button>}
