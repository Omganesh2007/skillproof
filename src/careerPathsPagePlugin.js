import { transformWithOxc } from "vite";

const PATHS = {
  "Cybersecurity Analyst": [
    ["Cybersecurity Foundations",80,"Foundation",[]],
    ["Networking Fundamentals",75,"Foundation",[]],
    ["Linux & System Administration",75,"Core",["Linux"]],
    ["Python & Scripting",65,"Core",["Python"]],
    ["Security Tools",70,"Tools",[]],
    ["Threat Detection & SIEM",70,"Detection",[]],
    ["Web & Application Security",65,"Security",[]],
    ["Incident Response",70,"Practice",[]]
  ],
  "Python Developer": [
    ["Programming Foundations",75,"Foundation",["Python"]],
    ["Python Development",80,"Core",["Python"]],
    ["SQL & Databases",70,"Core",["SQL"]],
    ["REST APIs",65,"Backend",["REST API"]],
    ["Git & GitHub",60,"Tools",["Git & GitHub"]],
    ["Testing & Debugging",65,"Practice",[]],
    ["Backend Portfolio Project",70,"Portfolio",[]]
  ],
  "Data Analyst": [
    ["Data & Statistics Foundations",80,"Foundation",[]],
    ["SQL & Databases",80,"Core",["SQL"]],
    ["Python for Analysis",70,"Core",["Python"]],
    ["Data Analysis",85,"Core",["Data Analysis"]],
    ["Data Visualization",75,"Tools",[]],
    ["Excel & Spreadsheets",70,"Tools",[]],
    ["Real-world Dataset Project",75,"Portfolio",[]]
  ],
  "AI/ML Engineer": [
    ["Programming & Math Foundations",80,"Foundation",["Python"]],
    ["Python",85,"Core",["Python"]],
    ["Data Analysis",75,"Core",["Data Analysis"]],
    ["Machine Learning",80,"Core",["Machine Learning"]],
    ["SQL & Data Handling",65,"Core",["SQL"]],
    ["Model Evaluation",75,"ML",[]],
    ["ML Portfolio Project",75,"Portfolio",[]]
  ],
  "Frontend Developer": [
    ["Web Foundations",80,"Foundation",["HTML & CSS"]],
    ["HTML & CSS",85,"Core",["HTML & CSS"]],
    ["JavaScript",80,"Core",["JavaScript"]],
    ["React",75,"Framework",["React"]],
    ["Git & GitHub",60,"Tools",["Git & GitHub"]],
    ["Responsive UI & Accessibility",75,"Practice",[]],
    ["Frontend Portfolio Project",75,"Portfolio",[]]
  ],
  "Full Stack Developer": [
    ["Web Foundations",80,"Foundation",["HTML & CSS"]],
    ["JavaScript",80,"Core",["JavaScript"]],
    ["React",75,"Frontend",["React"]],
    ["Node.js & Backend",70,"Backend",["Node.js"]],
    ["SQL & Databases",70,"Backend",["SQL"]],
    ["REST APIs",70,"Backend",["REST API"]],
    ["Git & GitHub",60,"Tools",["Git & GitHub"]],
    ["Full Stack Portfolio Project",75,"Portfolio",[]]
  ],
  "Java Backend Developer": [
    ["Java Programming Foundations",80,"Foundation",["Java"]],
    ["Object-Oriented Java",80,"Core",["Java"]],
    ["SQL & Databases",75,"Core",["SQL"]],
    ["Spring Boot",70,"Framework",["Spring Boot"]],
    ["REST APIs",70,"Backend",["REST API"]],
    ["Git & GitHub",60,"Tools",["Git & GitHub"]],
    ["Docker & Deployment",60,"DevOps",["Docker"]],
    ["Backend Portfolio Project",75,"Portfolio",[]]
  ],
  "Cloud Engineer": [
    ["Cloud & Networking Foundations",80,"Foundation",[]],
    ["Linux",70,"Foundation",["Linux"]],
    ["AWS Cloud Fundamentals",80,"Core",["AWS"]],
    ["Docker & Containers",75,"Core",["Docker"]],
    ["Git & GitHub",65,"Tools",["Git & GitHub"]],
    ["Cloud Security & IAM",70,"Security",[]],
    ["CI/CD & Monitoring",70,"DevOps",[]],
    ["Cloud Deployment Project",75,"Portfolio",[]]
  ]
};

export function careerPathsPagePlugin() {
  return {
    name: "skillproof-career-paths-page",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const page = `function CareersPage({student}) {
  const analyses = (student.careers || []).map((career) => {
    const path = careerPathData[career] || [];
    const currentSkills = student.skills || [];
    const score = (aliases) => {
      const matches = currentSkills.filter((s) => aliases.some((name) => String(s.name).trim().toLowerCase() === String(name).trim().toLowerCase()));
      return matches.length ? Math.max(...matches.map((s) => Number(s.verificationScore ?? s.level ?? 0))) : 0;
    };
    const rows = path.map(([name,target,phase,aliases], index) => ({name,target,phase,aliases,current:score(aliases),index}));
    const readiness = rows.length ? Math.round(rows.reduce((sum,row) => sum + Math.min(100,row.target ? row.current / row.target * 100 : 0),0) / rows.length) : 0;
    return {career,rows,readiness};
  });
  return <div className="space-y-6">
    <PageHeader eyebrow="CAREER" title="Career readiness" subtitle="Build each target role from foundations to real-world projects." />
    {analyses.length ? <div className="grid lg:grid-cols-2 gap-5">{analyses.map(({career,rows,readiness}) => <section key={career} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-600 uppercase">TARGET ROLE</p><h2 className="text-lg font-extrabold text-slate-900 mt-1">{career}</h2><p className="text-xs text-slate-500 mt-1">Foundation → core skills → tools → practice → portfolio</p></div><div className="text-right shrink-0"><p className="text-xl font-extrabold text-teal-700">{readiness}%</p><p className="text-[9px] text-slate-400">READY</p></div></div><div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:readiness+"%"}}/></div></div>
      <div className="p-5"><div className="space-y-0">{rows.map((row,index) => { const pct=Math.min(100,row.target ? row.current/row.target*100 : 0); const complete=pct>=100; const phaseChanged=index===0 || row.phase!==rows[index-1].phase; return <div key={row.name}>{phaseChanged && <div className="flex items-center gap-2 py-2"><span className="text-[9px] font-extrabold tracking-[0.16em] text-slate-400 uppercase">{row.phase}</span><div className="h-px bg-slate-100 flex-1"/></div>}<div className="flex gap-3"><div className="w-7 flex flex-col items-center"><div className={"w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-extrabold shrink-0 "+(complete?"border-teal-400 bg-teal-50 text-teal-700":"border-slate-200 bg-white text-slate-500")}>{complete?"✓":index+1}</div>{index<rows.length-1&&<div className="w-px bg-slate-200 flex-1 my-1"/>}</div><div className={"flex-1 rounded-2xl border p-3 mb-2 "+(complete?"border-teal-100 bg-teal-50/30":"border-slate-200 bg-slate-50/30")}><div className="flex items-center gap-2"><p className="text-xs font-extrabold text-slate-900 truncate">{row.name}</p><span className={"ml-auto text-[9px] font-extrabold shrink-0 "+(complete?"text-teal-700":"text-slate-400")}>{row.current}/{row.target}</span></div><div className="h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:pct+"%"}}/></div><p className="text-[9px] text-slate-400 mt-1.5">{complete?"Completed":"Start building this skill"}{row.phase==="Foundation"?" · foundation":""}</p></div></div></div>})}</div><div className="mt-3 rounded-xl bg-teal-50/60 border border-teal-100 px-3 py-2.5"><p className="text-[10px] font-bold text-teal-800">LEARNING ORDER</p><p className="text-[10px] text-slate-600 mt-1">Start with foundations, then progress through core programs, tools, practice and portfolio evidence.</p></div></div>
    </section>)}</div> : <EmptyState title="Choose a target career" text="Select a career during registration or from your profile to build its learning path."/>}
  </div>;
}
`;
      let next = code.replace(/function CareersPage[\s\S]*?(?=function SkillGapPage)/, page);
      if (next === code) return null;
      const injected = `const careerPathData = ${JSON.stringify(PATHS)};\n`;
      next = next.replace(/const javaQuestions =/, injected + "const javaQuestions =");
      const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
      return { code: result.code, map: result.map || null };
    },
  };
}
