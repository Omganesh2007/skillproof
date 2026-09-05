export function dashboardReferencePlugin() {
  return {
    name: "skillproof-dashboard-reference",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const start = code.indexOf("function Dashboard(");
      const end = code.indexOf("function MySkills(", start);
      if (start < 0 || end < 0) return null;
      const replacement = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const verified = skills.filter(s => s.verified).length;
  const careers = (student.careers || []).slice(0, 3);
  const primaryCareer = careers[0] || "Frontend Developer";
  const careerStages = {
    "Java Backend Developer": [
      ["Programming Fundamentals", 60, "Learn core programming concepts with Java."],
      ["Data Structures & Algorithms", 80, "Build problem-solving skills for technical interviews."],
      ["Core Java", 85, "Master OOP, collections, exceptions and more."],
      ["Spring Boot", 90, "Build real-world backend applications."],
      ["Databases", 75, "Work with MySQL, efficient queries and database design."],
      ["APIs & Backend Systems", 80, "Build REST APIs, authentication and deployment."],
      ["Real-world Projects", 70, "Build and deploy complete backend projects."]
    ],
    "Full Stack Developer": [
      ["Web Foundations", 60, "Understand browsers, HTTP and web structure."],
      ["HTML & CSS", 80, "Build semantic and responsive interfaces."],
      ["JavaScript", 80, "Master modern JavaScript and asynchronous programming."],
      ["React", 75, "Build interactive frontend applications."],
      ["Backend Development", 75, "Build APIs and server-side applications."],
      ["Databases", 70, "Design schemas and write efficient queries."],
      ["Full Stack Project", 75, "Build and deploy a complete full stack project."]
    ],
    "Frontend Developer": [
      ["Web Foundations", 60, "Understand browsers, HTTP, web structure and developer tools."],
      ["HTML & CSS", 85, "Build semantic, responsive and maintainable web interfaces."],
      ["JavaScript", 80, "Master modern JavaScript, DOM events, async code and modules."],
      ["React", 75, "Build interactive user interfaces with React."],
      ["Responsive Design", 70, "Create mobile-first, responsive layouts."],
      ["Git & GitHub", 65, "Version control, collaboration and open source."],
      ["Frontend Portfolio Project", 70, "Build and deploy a real-world project."]
    ]
  };
  const stages = careerStages[primaryCareer] || careerStages["Frontend Developer"];
  const stageIcons = [BookOpen, BarChart3, Code2, Sparkles, Target, ShieldCheck, BriefcaseBusiness];
  const scoreFor = (name, max) => {
    const normalized = skills.map(s => String(s.name || s).toLowerCase());
    const aliases = {
      "programming fundamentals": ["java"], "data structures & algorithms": ["java"], "core java": ["java"], "spring boot": ["spring boot"],
      databases: ["sql"], "apis & backend systems": ["rest api"], "real-world projects": ["java", "spring boot"], "backend development": ["java", "spring boot"],
      "full stack project": ["react", "javascript"], "web foundations": ["html & css", "javascript"], "html & css": ["html & css"], javascript: ["javascript"],
      react: ["react"], "responsive design": ["html & css", "react"], "git & github": ["git & github"], "frontend portfolio project": ["react", "javascript"]
    };
    return (aliases[name.toLowerCase()] || []).some(a => normalized.includes(a)) ? Math.round(max * 0.5) : 0;
  };
  const scored = stages.map(([name, max, description]) => ({ name, max, description, score: scoreFor(name, max) }));
  const completed = scored.filter(s => s.score >= s.max).length;
  const readiness = Math.round(scored.reduce((a, s) => a + s.score, 0) / scored.reduce((a, s) => a + s.max, 0) * 100);
  return <div className="space-y-7">
    <section className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50/80 to-white px-6 py-6 flex items-center justify-between gap-6">
      <div><p className="text-xs font-bold tracking-[0.16em] text-teal-700">WELCOME BACK</p><h2 className="text-[30px] font-bold mt-1">Hi, {student.name || "Student"}! 👋</h2><p className="text-base text-slate-500 mt-1">Here is your SkillProof career progress for today.</p></div>
      <div className="hidden md:block text-right"><p className="text-sm text-slate-500">{careers.length || 3} target careers</p></div>
    </section>
    <section>
      <div className="mb-4"><p className="text-xs font-bold tracking-[0.16em] text-teal-700">CAREER FOCUS</p><h2 className="text-[30px] font-bold mt-1">Career readiness</h2><p className="text-base text-slate-500 mt-1">Explore the complete skill path for your target career. Learn step by step and become job ready.</p></div>
      <div className="flex gap-2 overflow-x-auto pb-1">{(careers.length ? careers : ["Frontend Developer", "Full Stack Developer", "Java Backend Developer"]).map((career, i) => <button key={career} type="button" onClick={() => setActivePage("careers")} className={i === 0 ? "shrink-0 px-4 py-3 rounded-xl border border-teal-400 bg-teal-50 text-teal-800 text-sm" : "shrink-0 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm"}>{career}<span className="ml-2 text-[10px] uppercase text-slate-400">{i === 0 ? "Primary" : "Target"}</span></button>)}</div>
    </section>
    <div className="grid xl:grid-cols-[288px_minmax(0,1fr)_340px] gap-5 items-start">
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"><p className="text-xs font-bold tracking-[0.15em] text-teal-700">TARGET CAREER</p><h3 className="text-[26px] font-bold leading-tight mt-3">{primaryCareer}</h3><p className="text-sm text-slate-500 leading-6 mt-3">Follow the complete learning path and build evidence as you progress.</p><div className="flex items-center gap-4 mt-6"><div className="w-24 h-24 rounded-full border-[8px] border-teal-400 flex items-center justify-center"><span className="text-2xl font-bold">{readiness}%</span></div><div><p className="font-bold">Career readiness</p><p className="text-xs text-slate-400 mt-1">{completed} of {scored.length} stages completed</p></div></div><div className="mt-6 rounded-xl bg-teal-50/70 border border-teal-100 p-4"><p className="text-xs font-bold text-teal-700">HOW IT WORKS</p><p className="text-xs text-slate-500 leading-5 mt-2">Complete each stage in order. Each stage unlocks the next one.</p></div></section>
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"><div className="px-5 py-5 border-b border-slate-100"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Target size={20}/></div><div><h3 className="font-bold text-lg">Complete skill path for {primaryCareer}</h3><p className="text-xs text-slate-400">Follow these 7 stages to master the required skills.</p></div></div></div><div className="p-3 space-y-2">{scored.map((stage, index) => { const Icon = stageIcons[index]; const locked = index > completed && stage.score === 0; return <div key={stage.name} className="rounded-xl border border-slate-200 p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0"><span className="text-sm font-bold">{index + 1}</span></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div><p className="font-bold text-sm">{stage.name}</p><p className="text-xs text-slate-400 mt-1 truncate">{stage.description}</p></div><div className="flex items-center gap-2 shrink-0"><span className="text-xs font-bold text-teal-600">{stage.score}/{stage.max}</span><span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] text-slate-500">{stage.score >= stage.max ? "Completed" : locked ? "Locked" : "Not started"}</span></div></div><div className="h-1.5 bg-slate-100 rounded-full mt-2"><div className="h-full bg-teal-400 rounded-full" style={{width: Math.min(100, stage.score / stage.max * 100) + "%"}}/></div></div><Icon size={15} className="text-slate-300 hidden md:block"/></div>; })}</div></section>
      <aside className="space-y-5"><section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">Skill Summary</h3><span className="text-xs text-slate-400">7 stages</span></div><div className="space-y-3">{scored.map(stage => <div key={stage.name}><div className="flex justify-between text-xs"><span>{stage.name}</span><span className="text-slate-400">{stage.score}/{stage.max}</span></div><div className="h-1.5 bg-slate-100 rounded-full mt-1.5"><div className="h-full bg-teal-300 rounded-full" style={{width: Math.min(100, stage.score / stage.max * 100) + "%"}}/></div></div>)}</div><button onClick={() => setActivePage("roadmap")} className="mt-5 text-sm font-semibold text-teal-700">Open full skill tree →</button></section><section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Sparkles size={19}/></div><div><h3 className="font-bold">Recommended for you</h3><p className="text-xs text-slate-400">Based on your career focus</p></div></div><button onClick={() => setActivePage("opportunities")} className="w-full text-left p-3 rounded-xl border border-slate-100 mb-2"><b>Build Your First Project</b><span className="block text-xs text-slate-400 mt-1">A step-by-step guide to building your portfolio.</span></button><button onClick={() => setActivePage("opportunities")} className="w-full text-left p-3 rounded-xl border border-slate-100"><b>Internships for Developers</b><span className="block text-xs text-slate-400 mt-1">Find opportunities that match your skills.</span></button></section></aside>
    </div>
  </div>;
}
`;
      return { code: code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
