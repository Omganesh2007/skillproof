export function studentUiPlugin() {
  return {
    name: "skillproof-student-ui",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;

      const dashboard = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const verified = skills.filter((s) => s.verified).length;
  const career = (student.careers || [])[0] || "Choose a target career";
  const requirements = careerRequirements[career] || {};
  const scoreFor = (name) => Math.max(0, Math.min(100, Number((skills.find((s) => s.name === name))?.verificationScore ?? (skills.find((s) => s.name === name))?.level ?? 0)));
  const names = Object.keys(requirements);
  const readiness = names.length ? Math.round(names.reduce((sum, name) => sum + Math.min(100, (scoreFor(name) / requirements[name]) * 100), 0) / names.length) : 0;
  const gaps = names.map((name) => ({ name, current: scoreFor(name), target: requirements[name], gap: Math.max(0, requirements[name] - scoreFor(name)) })).sort((a, b) => b.gap - a.gap);
  const topGap = gaps[0];
  const level = readiness >= 100 ? 5 : readiness >= 80 ? 4 : readiness >= 60 ? 3 : readiness >= 35 ? 2 : readiness > 0 ? 1 : 0;
  const stages = [
    { title: "Profile", text: "Identity", icon: User, page: "profile" },
    { title: "Skills", text: "Build toolkit", icon: BookOpen, page: "skills" },
    { title: "Evidence", text: "Verify proof", icon: ShieldCheck, page: "verify" },
    { title: "Career Fit", text: "Close gaps", icon: Target, page: "gaps" },
    { title: "Ready", text: "Get noticed", icon: CheckCircle2, page: "opportunities" },
  ];
  const radarPoints = [
    { label: "PROFILE", short: "P", angle: -90, page: "profile", icon: User, done: level >= 1 },
    { label: "SKILLS", short: "S", angle: -18, page: "skills", icon: BookOpen, done: level >= 2 },
    { label: "EVIDENCE", short: "E", angle: 54, page: "verify", icon: ShieldCheck, done: level >= 3 },
    { label: "CAREER FIT", short: "C", angle: 126, page: "gaps", icon: Target, done: level >= 4 },
    { label: "READY", short: "R", angle: 198, page: "opportunities", icon: CheckCircle2, done: level >= 5 },
  ];
  return <div className="space-y-6">
    <PageHeader eyebrow="OVERVIEW" title={"Good to see you, " + (student.name || "Student") + "."} subtitle="Track your skills, readiness and next steps from one place." action="Verify a skill" onAction={() => setActivePage("verify")} />
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><MetricCard icon={BookOpen} label="Skills added" value={skills.length}/><MetricCard icon={ShieldCheck} label="Verified skills" value={verified}/><MetricCard icon={Target} label="Target careers" value={student.careers?.length || 0}/><MetricCard icon={Zap} label="Top readiness" value={readiness + "%"}/></div>

    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#071c2b] text-white shadow-xl">
      <div className="absolute inset-0 opacity-40" style={{backgroundImage:"linear-gradient(rgba(45,212,191,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,.08) 1px, transparent 1px)", backgroundSize:"34px 34px"}} />
      <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full border border-teal-400/20" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full border border-teal-400/10" />
      <div className="relative p-5 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div><div className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-teal-300"><span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"/> SKILLPROOF RADAR</div><h2 className="text-2xl md:text-3xl font-bold mt-2">Career mission map</h2><p className="text-sm text-slate-300 mt-1">Navigate your journey like a character map. Complete each node to unlock the next.</p></div>
          <div className="flex items-center gap-3 self-start md:self-auto rounded-2xl border border-teal-400/20 bg-slate-950/40 px-4 py-3"><div className="text-right"><p className="text-[10px] tracking-widest text-slate-400 font-bold">TARGET</p><p className="text-sm font-bold text-teal-200 max-w-[190px] truncate">{career}</p></div><div className="w-10 h-10 rounded-full border border-teal-300/50 bg-teal-300/10 flex items-center justify-center"><Target size={19} className="text-teal-300"/></div></div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_280px] gap-5 items-stretch">
          <div className="relative min-h-[430px] md:min-h-[500px] rounded-3xl border border-teal-400/20 bg-[#082638]/80 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(circle at center, rgba(45,212,191,.18) 1px, transparent 1px)", backgroundSize:"18px 18px"}} />
            <div className="absolute w-[250px] h-[250px] md:w-[330px] md:h-[330px] rounded-full border border-teal-300/20" />
            <div className="absolute w-[170px] h-[170px] md:w-[230px] md:h-[230px] rounded-full border border-teal-300/20" />
            <div className="absolute w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border border-teal-300/20" />
            <div className="absolute w-[76%] h-px bg-teal-300/15 rotate-0" />
            <div className="absolute h-[76%] w-px bg-teal-300/15 rotate-0" />
            <div className="absolute w-[66%] h-px bg-teal-300/10 rotate-45" />
            <div className="absolute w-[66%] h-px bg-teal-300/10 -rotate-45" />
            {radarPoints.map((node, index) => { const Icon=node.icon; const rad=(node.angle*Math.PI)/180; const x=50+Math.cos(rad)*38; const y=50+Math.sin(rad)*38; return <button key={node.label} type="button" onClick={()=>setActivePage(node.page)} className="absolute -translate-x-1/2 -translate-y-1/2 group z-10" style={{left:x+"%",top:y+"%"}}><div className={"w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 "+(node.done?"bg-teal-400 border-teal-100 text-slate-950":"bg-[#0c3145] border-teal-400/50 text-teal-200")}><Icon size={22}/></div><div className="mt-2 rounded-lg border border-teal-300/15 bg-slate-950/80 px-2.5 py-1.5 whitespace-nowrap"><p className="text-[10px] font-extrabold tracking-wider text-teal-100">{node.label}</p><p className="text-[9px] text-slate-400">{node.done?"UNLOCKED":"LOCKED"}</p></div></button>; })}
            <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-teal-300/70 bg-[#061722] shadow-[0_0_45px_rgba(45,212,191,.22)]"><div className="absolute inset-2 rounded-full border border-teal-300/20"/><div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-teal-300/10 border border-teal-300/40 flex items-center justify-center"><User size={27} className="text-teal-200"/></div><p className="text-[10px] tracking-[0.18em] font-extrabold text-teal-200 mt-2">YOU</p><p className="text-[9px] text-slate-500">LEVEL {level}/5</p></div>
            <div className="absolute top-4 left-4 text-[9px] font-mono text-teal-400/50 tracking-widest">LIVE / CAREER NETWORK</div><div className="absolute bottom-4 right-4 text-[9px] font-mono text-teal-400/50">SCAN {readiness}%</div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-teal-400/20 bg-slate-950/45 p-5"><p className="text-[10px] tracking-[0.18em] text-teal-300 font-extrabold">CURRENT STATUS</p><div className="flex items-end justify-between mt-2"><p className="text-4xl font-extrabold">{readiness}%</p><span className="text-xs text-slate-400">career ready</span></div><div className="h-2 bg-white/10 rounded-full mt-3 overflow-hidden"><div className="h-full bg-teal-300 rounded-full" style={{width:readiness+"%"}}/></div><p className="text-xs text-slate-400 mt-3">{level} of 5 mission nodes unlocked</p></div>
            <div className="rounded-2xl border border-teal-400/20 bg-slate-950/45 p-5"><p className="text-[10px] tracking-[0.18em] text-teal-300 font-extrabold">NEXT SIGNAL</p><p className="font-bold mt-2">{topGap&&topGap.gap>0?"Improve "+topGap.name:readiness>=100?"Career path complete":"Add your first skill"}</p><p className="text-xs leading-5 text-slate-400 mt-1">{topGap&&topGap.gap>0?"Current signal: "+topGap.current+"/100. Target: "+topGap.target+".":readiness>=100?"Your required skills are covered. Keep adding projects and evidence.":"Your radar is waiting for skill data. Add a skill to activate the next node."}</p><button onClick={()=>setActivePage(topGap&&topGap.gap>0?"skills":"verify")} className="mt-4 w-full h-10 rounded-xl bg-teal-300 text-slate-950 text-sm font-extrabold hover:bg-teal-200 transition">{topGap&&topGap.gap>0?"IMPROVE SKILL":"TAKE NEXT STEP"} <ArrowRight size={14} className="inline ml-1"/></button></div>
            <div className="rounded-2xl border border-teal-400/20 bg-slate-950/45 p-5"><p className="text-[10px] tracking-[0.18em] text-teal-300 font-extrabold">MISSION LOG</p><div className="mt-3 space-y-2">{stages.map((stage,index)=><button key={stage.title} onClick={()=>setActivePage(stage.page)} className="w-full flex items-center gap-3 text-left"><span className={"w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold "+(index<level?"bg-teal-300 text-slate-950":"border border-slate-600 text-slate-500")}>{index<level?"✓":index+1}</span><span className={index<level?"text-slate-200":"text-slate-500"}>{stage.title}</span></button>)}</div></div>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
`;

      const profile = `function ProfilePage({ student, saveStudent }) {
  const selectedCareer = (student.careers || [])[0] || "Not selected";
  const skills = student.skills || [];
  const verified = skills.filter((s) => s.verified).length;
  const requirements = careerRequirements[selectedCareer] || {};
  const names = Object.keys(requirements);
  const readiness = names.length ? Math.round(names.reduce((sum, name) => { const skill=skills.find((s)=>s.name===name); const score=Number(skill?.verificationScore??skill?.level??0); return sum+Math.min(100,(score/requirements[name])*100); },0)/names.length) : 0;
  const update = (field,value) => saveStudent({ ...student, [field]: value });
  return <div className="space-y-6"><PageHeader eyebrow="PROFILE" title="My Profile" subtitle="Keep your academic and career details ready for colleges and industry."/><section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm"><div className="flex flex-col md:flex-row md:items-center gap-5 pb-6 border-b border-slate-100"><div className="w-20 h-20 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-3xl font-extrabold">{(student.name||"S").charAt(0).toUpperCase()}</div><div className="flex-1"><p className="text-xs font-bold tracking-[0.16em] text-teal-600 uppercase">Student identity</p><h2 className="text-2xl font-bold mt-1">{student.name||"Your name"}</h2><p className="text-sm text-slate-500 mt-1">{student.email||"Add your personal email"}</p></div><div className="rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3"><p className="text-xs text-slate-400">Career readiness</p><p className="text-2xl font-extrabold mt-1">{readiness}%</p></div></div><div className="pt-6"><h3 className="text-lg font-bold">Personal & academic information</h3><p className="text-sm text-slate-500 mt-1">These details help colleges and recruiters understand your profile.</p><div className="grid md:grid-cols-2 gap-4 mt-5"><ProfileField label="Full name" value={student.name} onChange={(v)=>update("name",v)}/><ProfileField label="Personal email" value={student.email} onChange={(v)=>update("email",v)}/><ProfileField label="College" value={student.college}/><ProfileField label="College ID" value={student.collegeId||"Not linked"} readOnly/><ProfileField label="College email ID" value={student.collegeEmail||"Not added"} onChange={(v)=>update("collegeEmail",v)} placeholder="student@college.edu"/><ProfileField label="Department" value={student.department} onChange={(v)=>update("department",v)} placeholder="e.g. AIDS"/><ProfileField label="Graduation year" value={student.graduationYear} onChange={(v)=>update("graduationYear",v)} placeholder="e.g. 2028"/><ProfileField label="LinkedIn / portfolio" value={student.linkedin||""} onChange={(v)=>update("linkedin",v)} placeholder="linkedin.com/in/your-name"/><ProfileField label="Phone number" value={student.phone||""} onChange={(v)=>update("phone",v)} placeholder="10-digit mobile number"/><ProfileField label="City / location" value={student.location||""} onChange={(v)=>update("location",v)} placeholder="e.g. Chennai"/></div><p className="text-xs text-slate-400 mt-4">Important: your registered College ID links your profile to your institution.</p></div></section><section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs font-bold tracking-[0.16em] text-teal-600 uppercase">Career direction</p><h3 className="text-lg font-bold mt-1">Selected career</h3><p className="text-sm text-slate-500 mt-1">Only your selected career is shown here. Dashboard progress follows this primary goal.</p></div><Target className="text-teal-600" size={22}/></div><div className="mt-5 rounded-2xl border border-teal-200 bg-teal-50/60 p-5"><p className="text-xs text-teal-700 font-bold uppercase tracking-wider">Primary target</p><p className="text-xl font-extrabold text-slate-900 mt-2">{selectedCareer}</p><div className="flex flex-wrap gap-2 mt-3"><span className="px-3 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-semibold text-teal-800">{skills.length} skills added</span><span className="px-3 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-semibold text-teal-800">{verified} verified</span><span className="px-3 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-semibold text-teal-800">{readiness}% readiness</span></div></div></section></div>;
}
function ProfileField({ label, value, onChange, placeholder, readOnly }) { return <label className="block"><span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</span><input readOnly={readOnly} value={value??""} onChange={(e)=>onChange?.(e.target.value)} placeholder={placeholder} className={"w-full h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none "+(readOnly?"bg-slate-50 text-slate-500":"bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100")}/></label>
}
`;

      let next = code.replace(/function Dashboard[\s\S]*?(?=function MySkills)/, dashboard);
      next = next.replace(/function ProfilePage[\s\S]*?(?=function SettingsPage)/, profile);
      return { code: next, map: null };
    },
  };
}
