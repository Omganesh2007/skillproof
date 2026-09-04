import { transformWithOxc } from "vite";

const PATHS = {
  "Cybersecurity Analyst": [
    ["Cybersecurity Foundations",60,"Learn CIA triad, threats, attacks and core security principles."],
    ["Networking Fundamentals",70,"Learn OSI, TCP/IP, IP addressing, ports, protocols and network security basics."],
    ["Linux & System Administration",75,"Command line, file systems, permissions, processes and shell scripting."],
    ["Python & Scripting",70,"Automate tasks, parse logs, work with files and build security scripts."],
    ["Security Tools",80,"Learn Nmap, Wireshark, Burp Suite, Metasploit and essential security tools."],
    ["Threat Detection & SIEM",80,"Log analysis, threat monitoring and SIEM tools such as Splunk and ELK."],
    ["Web & Application Security",75,"OWASP Top 10, SQLi, XSS, CSRF and secure coding basics."],
    ["Incident Response & Forensics",70,"Incident handling, digital forensics, recovery and investigation procedures."],
    ["Security Operations Project",70,"Build a practical security monitoring or incident-response project for your portfolio."],
  ],
  "Python Developer": [
    ["Programming Foundations",60,"Learn programming logic, algorithms, data structures and problem solving."],
    ["Python Development",80,"Master Python syntax, functions, modules, files, exceptions and packages."],
    ["Object-Oriented Programming",70,"Build maintainable Python applications with classes, inheritance and composition."],
    ["SQL & Databases",70,"Work with relational data, queries, joins, indexes and database design."],
    ["REST APIs",65,"Build and consume REST APIs, authentication, JSON and backend integrations."],
    ["Git & GitHub",60,"Use branches, commits, pull requests and collaborative development workflows."],
    ["Testing & Debugging",65,"Write tests, debug failures and improve application reliability."],
    ["Backend Project",70,"Build and deploy a complete Python backend project with documentation."],
  ],
  "Data Analyst": [
    ["Data & Statistics Foundations",65,"Learn descriptive statistics, distributions, sampling and analytical thinking."],
    ["SQL & Databases",80,"Query, join, filter and aggregate real business datasets."],
    ["Python for Analysis",70,"Use Python, Pandas and NumPy to clean and explore data."],
    ["Data Analysis",85,"Turn raw datasets into findings, KPIs and actionable insights."],
    ["Data Visualization",75,"Create clear charts and dashboards that communicate results."],
    ["Excel & Spreadsheets",70,"Use formulas, pivot tables and spreadsheet workflows for analysis."],
    ["Analytics Project",70,"Complete an end-to-end analysis using a real-world dataset."],
  ],
  "AI/ML Engineer": [
    ["Programming & Math Foundations",65,"Build programming, linear algebra, probability and statistics foundations."],
    ["Python",85,"Use Python for numerical computing, automation and machine-learning workflows."],
    ["Data Analysis",75,"Clean, explore and prepare datasets for modelling."],
    ["Machine Learning",80,"Learn supervised, unsupervised and practical model-building techniques."],
    ["SQL & Data Handling",65,"Retrieve, transform and manage structured training data."],
    ["Model Evaluation",70,"Evaluate models with appropriate metrics, validation and error analysis."],
    ["ML Project",75,"Build, evaluate and document a complete machine-learning project."],
  ],
  "Frontend Developer": [
    ["Web Foundations",60,"Understand browsers, HTTP, web structure and developer tools."],
    ["HTML & CSS",85,"Build semantic, responsive and maintainable web interfaces."],
    ["JavaScript",80,"Master modern JavaScript, DOM, events, async code and modules."],
    ["React",75,"Build component-based applications with state, props, hooks and routing."],
    ["Responsive UI & Accessibility",70,"Create accessible interfaces that work across devices."],
    ["Git & GitHub",60,"Use version control and collaborative development workflows."],
    ["Frontend Portfolio Project",70,"Build and deploy a polished frontend application."],
  ],
  "Full Stack Developer": [
    ["Web Foundations",60,"Understand browsers, HTTP, APIs and application architecture."],
    ["JavaScript",80,"Build modern interactive applications with JavaScript."],
    ["React",75,"Create reusable frontend applications with React."],
    ["Node.js & Backend",65,"Build server-side applications, routes and services with Node.js."],
    ["SQL & Databases",70,"Design and query relational databases for web applications."],
    ["REST APIs",65,"Connect frontend and backend through secure REST APIs."],
    ["Git & GitHub",60,"Use branches, pull requests and collaborative workflows."],
    ["Full Stack Project",70,"Build and deploy a complete frontend-backend application."],
  ],
  "Java Backend Developer": [
    ["Java Programming Foundations",60,"Learn syntax, control flow, collections and core Java."],
    ["Object-Oriented Java",75,"Use classes, interfaces, inheritance, abstraction and design principles."],
    ["SQL & Databases",75,"Design schemas and write production-ready SQL queries."],
    ["Spring Boot",70,"Build Java services, dependency injection and production APIs."],
    ["REST APIs",70,"Design, secure and test RESTful backend services."],
    ["Git & GitHub",60,"Use professional source-control workflows."],
    ["Docker & Deployment",60,"Containerize and deploy backend services."],
    ["Backend Portfolio Project",70,"Build and deploy a complete Java backend project."],
  ],
  "Cloud Engineer": [
    ["Cloud & Networking Foundations",65,"Learn cloud concepts, networking, DNS, TCP/IP and architecture."],
    ["Linux",70,"Manage Linux systems, processes, permissions and shell commands."],
    ["AWS Cloud Fundamentals",80,"Learn core AWS compute, storage, networking and IAM services."],
    ["Docker & Containers",75,"Build, run and manage containerized applications."],
    ["Git & GitHub",65,"Use source control and infrastructure workflows."],
    ["Cloud Security & IAM",70,"Apply identity, access and security best practices."],
    ["CI/CD & Monitoring",70,"Automate deployments and monitor production systems."],
    ["Cloud Deployment Project",70,"Deploy and document a production-style cloud application."],
  ],
};

export function completeCareerDashboardPlugin() {
  return {
    name: "skillproof-complete-career-dashboard",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const dashboard = `function Dashboard({ student, setActivePage }) {
  const careersList = student.careers || [];
  const skills = student.skills || [];
  const [activeCareer, setActiveCareer] = useState(careersList[0] || "Cybersecurity Analyst");
  const career = careersList.includes(activeCareer) ? activeCareer : (careersList[0] || "Cybersecurity Analyst");
  const paths = ${JSON.stringify(PATHS)};
  const path = paths[career] || [];
  const score = (label) => { const s = skills.find((x) => String(x.name).trim().toLowerCase() === String(label).trim().toLowerCase()); return Number(s?.verificationScore ?? s?.level ?? 0); };
  const rows = path.map((item, i) => ({ name:item[0], target:item[1], description:item[2], current:Math.round(score(item[0])), index:i }));
  const readiness = rows.length ? Math.round(rows.reduce((sum,r)=>sum+Math.min(100,(r.current/r.target)*100),0)/rows.length) : 0;
  const next = rows.find(r => r.current < r.target) || rows[rows.length-1];
  const completed = rows.filter(r => r.current >= r.target).length;
  const verified = skills.filter(s => s.verified).length;
  const careerReadiness = (c) => { const p=paths[c]||[]; return p.length ? Math.round(p.reduce((sum,x)=>sum+Math.min(100,(score(x[0])/x[1])*100),0)/p.length) : 0; };
  return <div className="space-y-5">
    <PageHeader eyebrow="CAREER FOCUS" title="Career readiness" subtitle="Explore the complete skill path for your target career. Learn step by step and become job ready." />
    <div className="flex flex-wrap gap-2">{careersList.map((c,i)=><button key={c} type="button" onClick={()=>setActiveCareer(c)} className={"px-3 py-2 rounded-xl border text-xs font-bold "+(career===c?"bg-teal-50 border-teal-300 text-teal-800":"bg-white border-slate-200 text-slate-600 hover:border-teal-200")}>{c}<span className="ml-1.5 text-[9px] text-slate-400">{i===0?"PRIMARY":"TARGET"}</span></button>)}</div>
    <div className="grid xl:grid-cols-[245px_minmax(0,1fr)_290px] gap-4 items-start">
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p className="text-[10px] font-extrabold tracking-[.16em] text-teal-600">TARGET CAREER</p><h2 className="text-2xl font-extrabold text-slate-900 mt-2 leading-tight">{career}</h2><p className="text-xs text-slate-500 mt-2">Follow the complete learning path and build evidence as you progress.</p>
        <div className="mt-5 flex items-center gap-3"><div className="w-20 h-20 rounded-full border-[7px] border-teal-500 bg-teal-50 flex items-center justify-center"><span className="text-lg font-extrabold">{readiness}%</span></div><div><p className="text-sm font-bold">Career readiness</p><p className="text-[10px] text-slate-400">{completed} of {rows.length} stages completed</p></div></div>
        <div className="mt-5 rounded-xl bg-teal-50 border border-teal-100 p-3"><p className="text-[10px] font-extrabold text-teal-800">HOW IT WORKS</p><p className="text-[11px] text-slate-600 leading-5 mt-1">Complete each stage in order. Each stage builds your expertise and unlocks the next.</p></div>
        <div className="mt-4 space-y-2 text-[11px] text-slate-600"><div>⚪ Not started</div><div>🟠 In progress</div><div>🟢 Completed</div><div>🔒 Locked</div></div>
      </section>
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 min-w-0">
        <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center"><Target size={16} className="text-teal-600"/></div><div><h2 className="text-base font-extrabold">Complete skill path for {career}</h2><p className="text-[10px] text-slate-500">Follow these {rows.length} stages to master the required skills.</p></div></div>
        <div className="space-y-0">{rows.map((r,i)=>{const pct=Math.min(100,(r.current/r.target)*100);const done=pct>=100;const unlocked=i===0||rows[i-1].current>=rows[i-1].target;return <div key={r.name} className="relative"><div className={"rounded-xl border p-3 sm:p-3.5 "+(i===0?"border-teal-300 shadow-sm":"border-slate-200")+" "+(done?"bg-teal-50/30":"bg-white") }><div className="flex gap-3"><div className={"w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-xs font-extrabold "+(done?"bg-teal-100 text-teal-700":"bg-slate-50 border border-slate-200 text-slate-500")}>{i+1}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-xs sm:text-sm font-extrabold text-slate-900">{r.name}</p><span className={"ml-auto shrink-0 text-[9px] font-extrabold "+(done?"text-teal-700":"text-teal-600")}>{r.current}/{r.target}</span><span className="hidden sm:inline text-[9px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">{done?"Completed":unlocked?"Not started":"Locked"}</span></div><p className="text-[10px] leading-4 text-slate-500 mt-1">{r.description}</p><div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:pct+"%"}}/></div></div></div></div>{i<rows.length-1&&<div className="h-3 border-l border-slate-200 ml-[18px]"/>}</div>})}</div>
      </section>
      <aside className="space-y-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">SKILL SUMMARY</p><span className="text-[9px] text-slate-400">{rows.length} stages</span></div><div className="mt-3 space-y-2">{rows.map(r=><div key={r.name}><div className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"/><span className="text-[10px] text-slate-700 truncate flex-1">{r.name}</span><span className="text-[9px] font-bold text-slate-400">{r.current}/{r.target}</span></div><div className="h-1 bg-slate-100 rounded-full mt-1"><div className="h-full bg-teal-400 rounded-full" style={{width:Math.min(100,(r.current/r.target)*100)+"%"}}/></div></div>)}</div><button type="button" onClick={()=>setActivePage("gaps")} className="mt-3 text-[10px] font-bold text-teal-700">Open full skill tree →</button></div>
        <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-4"><p className="text-[10px] font-extrabold tracking-wider text-teal-800">NEXT STEP</p><p className="text-sm font-extrabold text-slate-900 mt-1">{next ? (next.current ? "Continue "+next.name : "Start with "+next.name) : "Career path complete"}</p><p className="text-[10px] leading-4 text-slate-600 mt-1">{next ? next.description : "Keep adding evidence and projects."}</p><button type="button" onClick={()=>setActivePage("skills")} className="mt-3 w-full h-9 rounded-xl bg-slate-900 text-white text-xs font-bold">Open skill progress <ArrowRight size={12} className="inline ml-1"/></button></div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">PROFILE SNAPSHOT</p><div className="mt-2 space-y-1.5 text-[10px] text-slate-600"><p><b>{skills.length}</b> skills added</p><p><b>{verified}</b> skills verified</p><p><b>{careersList.length}</b> target careers</p></div></div>
      </aside>
    </div>
    {careersList.length>1&&<section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">YOUR TARGET CAREERS ({careersList.length})</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">{careersList.map((c,i)=><button key={c} type="button" onClick={()=>setActiveCareer(c)} className={"text-left rounded-xl border p-3 "+(career===c?"border-teal-300 bg-teal-50/40":"border-slate-200 bg-white") }><div className="flex items-center gap-2"><Target size={14} className="text-teal-600"/><span className="text-xs font-bold truncate">{c}</span><span className="ml-auto text-[9px] font-bold text-slate-500">{i===0?"PRIMARY":"TARGET"}</span></div><p className="text-[10px] text-slate-500 mt-1">{careerReadiness(c)}% readiness · View skill path →</p></button>)}</div></section>}
  </div>;
}
`;
      const next = code.replace(/function Dashboard[\s\S]*?(?=function MySkills)/, dashboard);
      if (next === code) return null;
      const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
      return { code: result.code, map: result.map || null };
    },
  };
}
