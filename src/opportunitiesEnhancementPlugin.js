const jobs = [
  { title: "Java Backend Developer Intern", company: "NexaByte Labs", location: "Chennai", type: "Internship", role: "Java Backend Developer", salary: "₹18k–25k / month", skills: ["Java", "Spring Boot", "SQL"] },
  { title: "Junior Java Developer", company: "CloudNest Technologies", location: "Bengaluru", type: "Full-time", role: "Java Backend Developer", salary: "₹5–7 LPA", skills: ["Java", "REST API", "Docker"] },
  { title: "Spring Boot Engineering Intern", company: "CodeOrbit Systems", location: "Hyderabad", type: "Internship", role: "Java Backend Developer", salary: "₹20k / month", skills: ["Java", "Spring Boot", "REST API"] },
  { title: "Backend Platform Intern", company: "DataForge", location: "Pune", type: "Internship", role: "Java Backend Developer", salary: "₹22k / month", skills: ["Java", "SQL", "Git & GitHub"] },
  { title: "React Frontend Developer", company: "PixelCraft", location: "Bengaluru", type: "Full-time", role: "Frontend Developer", salary: "₹6–9 LPA", skills: ["React", "JavaScript", "HTML & CSS"] },
  { title: "Frontend Engineering Intern", company: "BrightLayer", location: "Chennai", type: "Internship", role: "Frontend Developer", salary: "₹18k–24k / month", skills: ["React", "JavaScript", "Git & GitHub"] },
  { title: "UI Developer Intern", company: "WebSpring", location: "Mumbai", type: "Internship", role: "Frontend Developer", salary: "₹16k / month", skills: ["HTML & CSS", "JavaScript", "React"] },
  { title: "Frontend Developer", company: "OrbitWorks", location: "Pune", type: "Full-time", role: "Frontend Developer", salary: "₹5–8 LPA", skills: ["React", "JavaScript", "Git & GitHub"] },
  { title: "Full Stack Developer Intern", company: "StackBridge", location: "Hyderabad", type: "Internship", role: "Full Stack Developer", salary: "₹25k / month", skills: ["React", "Node.js", "SQL"] },
  { title: "Full Stack Engineer", company: "AppVista", location: "Bengaluru", type: "Full-time", role: "Full Stack Developer", salary: "₹7–11 LPA", skills: ["JavaScript", "React", "Node.js"] },
  { title: "MERN Developer Intern", company: "LaunchPad Digital", location: "Chennai", type: "Internship", role: "Full Stack Developer", salary: "₹20k / month", skills: ["React", "Node.js", "Git & GitHub"] },
  { title: "Product Engineer", company: "NovaStack", location: "Gurugram", type: "Full-time", role: "Full Stack Developer", salary: "₹8–12 LPA", skills: ["JavaScript", "React", "SQL"] },
  { title: "Python Developer Intern", company: "AIWorks Studio", location: "Chennai", type: "Internship", role: "Python Developer", salary: "₹20k–28k / month", skills: ["Python", "SQL", "REST API"] },
  { title: "Python Backend Engineer", company: "LogicLeaf", location: "Pune", type: "Full-time", role: "Python Developer", salary: "₹6–10 LPA", skills: ["Python", "REST API", "Git & GitHub"] },
  { title: "Machine Learning Intern", company: "VisionGrid AI", location: "Bengaluru", type: "Internship", role: "AI/ML Engineer", salary: "₹25k / month", skills: ["Python", "Machine Learning", "Data Analysis"] },
  { title: "AI Engineer Intern", company: "ModelMint", location: "Hyderabad", type: "Internship", role: "AI/ML Engineer", salary: "₹30k / month", skills: ["Python", "Machine Learning", "SQL"] },
  { title: "Data Analyst Intern", company: "InsightWorks", location: "Mumbai", type: "Internship", role: "Data Analyst", salary: "₹18k–23k / month", skills: ["Python", "SQL", "Data Analysis"] },
  { title: "Cloud Engineering Intern", company: "SkyRoute Systems", location: "Bengaluru", type: "Internship", role: "Cloud Engineer", salary: "₹24k / month", skills: ["AWS", "Docker", "Linux"] },
  { title: "Cloud DevOps Engineer", company: "InfraNova", location: "Hyderabad", type: "Full-time", role: "Cloud Engineer", salary: "₹7–12 LPA", skills: ["AWS", "Docker", "Linux"] },
  { title: "Cloud Support Associate", company: "ByteCloud", location: "Chennai", type: "Full-time", role: "Cloud Engineer", salary: "₹5–8 LPA", skills: ["AWS", "Linux", "Git & GitHub"] },
];

export function opportunitiesEnhancementPlugin() {
  return {
    name: "skillproof-opportunities-enhancement",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      const replacement = `function OpportunitiesPage(){
  const [role, setRole] = useState("All roles");
  const roles = ["All roles", ...careers];
  const filtered = ${JSON.stringify(jobs)}.filter(job => role === "All roles" || job.role === role);
  return <div className="space-y-6">
    <PageHeader eyebrow="OPPORTUNITIES" title="Internships & Jobs" subtitle="Explore opportunities matched to the career you want."/>
    <Panel title="Find your next opportunity" subtitle="Choose a target role to narrow the list.">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1"><label className="text-sm font-semibold text-slate-700">Filter by role</label><select value={role} onChange={e => setRole(e.target.value)} className="w-full h-12 mt-2 rounded-xl border border-slate-200 bg-white px-4"><option value="All roles">All roles</option>{roles.slice(1).map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        <div className="md:pt-7 text-sm text-slate-500"><b className="text-slate-900">{filtered.length}</b> opportunities found</div>
      </div>
    </Panel>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {filtered.map(job => <article key={job.title + job.company} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><BriefcaseBusiness size={19}/></div><Badge>{job.type}</Badge></div>
        <h2 className="font-bold text-lg mt-5">{job.title}</h2><p className="text-sm font-medium text-slate-600 mt-1">{job.company}</p>
        <div className="flex flex-wrap gap-2 mt-4"><span className="text-xs text-slate-500">📍 {job.location}</span><span className="text-xs text-slate-500">💰 {job.salary}</span></div>
        <div className="flex flex-wrap gap-2 mt-4">{job.skills.map(skill => <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">{skill}</span>)}</div>
        <button type="button" className="w-full h-10 mt-5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800">View opportunity</button>
      </article>)}
    </div>
  </div>;
}`;
      const start = code.indexOf("function OpportunitiesPage(");
      if (start < 0) return null;
      const end = code.indexOf("\nfunction ", start + 10);
      return { code: code.slice(0, start) + replacement + code.slice(end < 0 ? code.length : end), map: null };
    },
  };
}
`;
      return { code: next, map: null };
    },
  };
}
