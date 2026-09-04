export function collegeIndustryPlugin() {
  return {
    name: "skillproof-college-industry",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      let next = code;

      const collegeStudents = `function CollegeStudents({ students, loading, error, reload, selected, setSelected }) {
  const [department, setDepartment] = useState("All departments");
  const [status, setStatus] = useState("All status");
  const [career, setCareer] = useState("All careers");
  const [search, setSearch] = useState("");
  const departments = ["All departments", ...Array.from(new Set(students.map(s => s.department).filter(Boolean)))];
  const careersInStudents = Array.from(new Set(students.flatMap(s => s.careers || []).filter(Boolean)));
  const filtered = students.filter(s => {
    const text = search.trim().toLowerCase();
    const matchesSearch = !text || [s.name, s.email, s.department, s.college].some(v => String(v || "").toLowerCase().includes(text));
    const matchesDepartment = department === "All departments" || s.department === department;
    const verified = (s.skills || []).filter(x => x.verified).length;
    const matchesStatus = status === "All status" || (status === "Verified" ? verified > 0 : status === "Pending verification" ? verified === 0 : false);
    const matchesCareer = career === "All careers" || (s.careers || []).includes(career);
    return matchesSearch && matchesDepartment && matchesStatus && matchesCareer;
  });
  return <div className="space-y-6">
    <PageHeader eyebrow="STUDENTS" title="Registered students" subtitle="View students linked to this college, filter their departments and track verification work." action="Refresh" onAction={reload}/>
    {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">{error}</p>}
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="grid md:grid-cols-4 gap-3">
        <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500">Search students</label><div className="relative mt-1"><Search size={16} className="absolute left-3 top-3.5 text-slate-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, email or department" className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-3"/></div></div>
        <div><label className="text-xs font-bold text-slate-500">Department</label><select value={department} onChange={e => setDepartment(e.target.value)} className="w-full h-11 mt-1 rounded-xl border border-slate-200 px-3 bg-white">{departments.map(d => <option key={d}>{d}</option>)}</select></div>
        <div><label className="text-xs font-bold text-slate-500">Verification</label><select value={status} onChange={e => setStatus(e.target.value)} className="w-full h-11 mt-1 rounded-xl border border-slate-200 px-3 bg-white"><option>All status</option><option>Verified</option><option>Pending verification</option></select></div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3"><label className="text-xs font-bold text-slate-500">Target career:</label><button type="button" onClick={() => setCareer("All careers")} className={"px-3 py-1.5 rounded-full text-xs border "+(career === "All careers" ? "bg-teal-50 border-teal-200 text-teal-700" : "border-slate-200 text-slate-500")}>All</button>{careersInStudents.map(c => <button type="button" key={c} onClick={() => setCareer(c)} className={"px-3 py-1.5 rounded-full text-xs border "+(career === c ? "bg-teal-50 border-teal-200 text-teal-700" : "border-slate-200 text-slate-500")}>{c}</button>)}</div>
      <div className="flex flex-wrap gap-3 mt-4 text-xs"><span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"><b>{filtered.length}</b> shown</span><span className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700"><b>{filtered.filter(s => !(s.skills || []).some(x => x.verified)).length}</b> pending verification</span><span className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><b>{filtered.filter(s => (s.skills || []).some(x => x.verified)).length}</b> verified</span></div>
    </div>
    {loading ? <Panel title="Students"><p className="text-sm text-slate-500">Loading students...</p></Panel> : !students.length ? <EmptyState title="No students yet" text="Students registered with this college will appear here."/> : !filtered.length ? <EmptyState title="No matching students" text="Try another department, career, status or search term."/> : <div className="grid lg:grid-cols-2 gap-4">{filtered.map(s => { const verified=(s.skills||[]).filter(x=>x.verified).length; return <button type="button" key={s.id || s.email} onClick={() => setSelected(s)} className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-200 hover:shadow-sm"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{s.name || "Student"}</h3><p className="text-xs text-slate-400 mt-1">{s.email}</p><p className="text-xs text-slate-500 mt-1">{s.college || "College not provided"}</p></div><span className={"text-xs font-bold px-2.5 py-1 rounded-full "+(verified ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700")}>{verified ? "Verified" : "Pending"}</span></div><div className="grid grid-cols-3 gap-3 mt-5"><MiniMetric value={s.department || "-"} label="Department"/><MiniMetric value={verified} label="Verified skills"/><MiniMetric value={(s.careers || []).length} label="Target roles"/></div><div className="mt-4 flex items-center justify-between"><span className="text-sm font-semibold text-teal-700">View Profile →</span><span className="text-sm font-bold text-slate-700">{bestStudentReadiness(s)}% ready</span></div></button>})}</div>}
    {selected && <StudentProfileModal student={selected} onClose={() => setSelected(null)}/>}</div>;
}`;

      const industryLogin = `function IndustryLogin({ onBack, onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("industry@skillproof.local");
  const [password, setPassword] = useState("Password123!");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async e => { e.preventDefault(); setBusy(true); try { const data = await api("/auth/login", { method:"POST", body:JSON.stringify({ email, password }) }); if (data.user?.role && data.user.role !== "industry") throw new Error("This account is not an industry account."); if (data.token) localStorage.setItem("skillproof_industry_token", data.token); localStorage.setItem("skillproof_industry_user", JSON.stringify(data.user || {email,company})); onLogin(); } catch (err) { alert(err.message || "Industry login failed."); } finally { setBusy(false); } };
  const registerIndustry = async e => { e.preventDefault(); setBusy(true); try { const data = await api("/auth/register", { method:"POST", body:JSON.stringify({ name:name.trim() || company.trim(), email:email.trim(), password, role:"industry", company:company.trim() }) }); if (data.token) localStorage.setItem("skillproof_industry_token", data.token); localStorage.setItem("skillproof_industry_user", JSON.stringify(data.user || {name, email, company, role:"industry"})); alert("Industry account created successfully."); onLogin(); } catch (err) { alert(err.message || "Industry registration failed."); } finally { setBusy(false); } };
  return <Auth title={mode === "login" ? "Industry sign in" : "Create industry account"} subtitle="Discover verified student talent by skills, career goals and college."><div className="flex gap-2 mb-5"><button type="button" onClick={() => setMode("login")} className={"flex-1 h-10 rounded-lg "+(mode === "login" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}>Sign in</button><button type="button" onClick={() => setMode("register")} className={"flex-1 h-10 rounded-lg "+(mode === "register" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}>Register</button></div>{mode === "login" ? <form onSubmit={submit} className="space-y-4"><Field label="Work email" value={email} onChange={setEmail} type="email" placeholder="industry@company.com"/><Field label="Password" value={password} onChange={setPassword} type="password" placeholder="Password"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold">{busy ? "Signing in..." : "Sign in as Industry"}</button></form> : <form onSubmit={registerIndustry} className="space-y-4"><Field label="Industry / company name" value={company} onChange={setCompany} placeholder="Your company"/><Field label="Recruiter name" value={name} onChange={setName} placeholder="Recruiter name"/><Field label="Work email" value={email} onChange={setEmail} type="email" placeholder="recruiter@company.com"/><Field label="Password" value={password} onChange={setPassword} type="password" placeholder="Create a password"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold">{busy ? "Creating..." : "Create industry account"}</button></form>}<button type="button" onClick={onBack} className="w-full mt-4 text-sm text-slate-500">← Back to role selection</button></Auth>;
}`;

      const industryTalent = `function IndustryTalentPage() {
  const demo = [
    {name:"Rahul Kumar",college:"Anna University",department:"CSE",careers:["Java Backend Developer","Full Stack Developer"],skills:["Java","Spring Boot","SQL"],readiness:86,verified:true},
    {name:"Priya S",college:"IIT Madras",department:"CSE",careers:["Frontend Developer","Full Stack Developer"],skills:["React","JavaScript","HTML & CSS"],readiness:82,verified:true},
    {name:"Arun K",college:"NIT Trichy",department:"IT",careers:["Python Developer","AI/ML Engineer"],skills:["Python","SQL","Machine Learning"],readiness:79,verified:true},
    {name:"Meena R",college:"Panimalar Engineering College",department:"ECE",careers:["Data Analyst","AI/ML Engineer"],skills:["Python","Data Analysis","SQL"],readiness:74,verified:false}
  ];
  const [search,setSearch]=useState(""); const [role,setRole]=useState("All roles"); const [college,setCollege]=useState("All colleges"); const [verified,setVerified]=useState(false);
  const roles=Array.from(new Set(demo.flatMap(x=>x.careers))); const collegesList=Array.from(new Set(demo.map(x=>x.college)));
  const filtered=demo.filter(s=>{const q=search.trim().toLowerCase(); return (!q || [s.name,s.college,s.department,...s.skills,...s.careers].join(" ").toLowerCase().includes(q)) && (role === "All roles" || s.careers.includes(role)) && (college === "All colleges" || s.college === college) && (!verified || s.verified);});
  return <div className="space-y-6"><PageHeader eyebrow="TALENT" title="Discover versatile talent" subtitle="Search across target roles, verified skills, departments and colleges."/><div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"><div className="grid md:grid-cols-4 gap-3"><div className="md:col-span-2"><label className="text-xs font-bold text-slate-500">Search talent</label><div className="relative mt-1"><Search size={16} className="absolute left-3 top-3.5 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, skill, role or college" className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-3"/></div></div><div><label className="text-xs font-bold text-slate-500">Target role</label><select value={role} onChange={e=>setRole(e.target.value)} className="w-full h-11 mt-1 rounded-xl border border-slate-200 px-3 bg-white"><option>All roles</option>{roles.map(x=><option key={x}>{x}</option>)}</select></div><div><label className="text-xs font-bold text-slate-500">College</label><select value={college} onChange={e=>setCollege(e.target.value)} className="w-full h-11 mt-1 rounded-xl border border-slate-200 px-3 bg-white"><option>All colleges</option>{collegesList.map(x=><option key={x}>{x}</option>)}</select></div></div><label className="inline-flex items-center gap-2 mt-3 text-xs font-semibold text-slate-600"><input type="checkbox" checked={verified} onChange={e=>setVerified(e.target.checked)}/> Show verified talent only</label><div className="mt-3 text-xs text-slate-500">{filtered.length} candidate{filtered.length===1?"":"s"} match your search.</div></div>{!filtered.length?<EmptyState title="No matching talent" text="Try another role, college or skill."/>:<div className="grid lg:grid-cols-2 gap-4">{filtered.map(s=><div key={s.name} className="bg-white border border-slate-200 rounded-2xl p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{s.name}</h3><p className="text-sm text-slate-500 mt-1">{s.college}</p><p className="text-xs text-slate-400 mt-1">{s.department} · {s.verified ? "Verified profile" : "Verification pending"}</p></div><div className="text-right"><p className="text-xs text-slate-400">Readiness</p><p className="text-xl font-bold text-teal-700">{s.readiness}%</p></div></div><div className="flex flex-wrap gap-1.5 mt-4">{s.careers.map(c=><Badge key={c}>{c}</Badge>)}</div><p className="text-xs font-semibold text-slate-500 mt-4">Verified / listed skills</p><div className="flex flex-wrap gap-1.5 mt-2">{s.skills.map(x=><span key={x} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">{x}</span>)}</div><button type="button" className="mt-4 w-full h-10 rounded-xl bg-slate-900 text-white text-sm font-semibold">View candidate profile</button></div>)}</div>}</div>;
}`;

      next = next.replace(/function CollegeStudents[\\s\\S]*?(?=function StudentProfileModal)/, collegeStudents);
      next = next.replace(/function IndustryLogin[\\s\\S]*?(?=function CollegeAppShell|function IndustryAppShell)/, industryLogin);
      next = next.replace(/function IndustryTalentPage[\\s\\S]*?(?=function IndustryJobsPage)/, industryTalent);
      return next === code ? null : { code: next, map: null };
    },
  };
}
