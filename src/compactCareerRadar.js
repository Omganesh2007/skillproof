export function compactCareerRadarPlugin() {
  return {
    name: "skillproof-compact-career-radar",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const dashboard = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const careersList = student.careers || [];
  const selectedCareer = careersList[0] || "Choose a target career";
  const requirements = careerRequirements[selectedCareer] || {};
  const requirementNames = Object.keys(requirements);
  const scoreFor = (name) => {
    const skill = skills.find((s) => String(s.name).toLowerCase() === String(name).toLowerCase());
    return Math.max(0, Math.min(100, Number(skill?.verificationScore ?? skill?.level ?? 0)));
  };
  const readiness = requirementNames.length ? Math.round(requirementNames.reduce((sum, name) => sum + Math.min(100, scoreFor(name) / requirements[name] * 100), 0) / requirementNames.length) : 0;
  const verified = skills.filter((s) => s.verified).length;
  const grouped = [
    { label: "Technical Skills", keys: requirementNames.filter((n) => /python|java|javascript|sql|react|node|program|coding|algorithm|machine|learning|html|css|cloud|aws|azure|docker|git/i.test(n)) },
    { label: "Data & Tools", keys: requirementNames.filter((n) => /sql|excel|tableau|power bi|pandas|numpy|statistics|data|visual/i.test(n)) },
    { label: "Problem Solving", keys: requirementNames.filter((n) => /algorithm|problem|analytical|logic|reason/i.test(n)) },
    { label: "Domain Knowledge", keys: requirementNames.filter((n) => /domain|business|finance|marketing|security|network|database|ai|ml|model/i.test(n)) },
    { label: "Communication", keys: requirementNames.filter((n) => /communication|presentation|english|team|collaboration|leadership/i.test(n)) },
  ].map((g) => ({ ...g, keys: [...new Set(g.keys)] }));
  const used = new Set(grouped.flatMap((g) => g.keys));
  const finalGroups = grouped.map((g) => ({ ...g, keys: g.keys.length ? g.keys : requirementNames.filter((n) => !used.has(n)).slice(0, 3) }));
  const radarValues = finalGroups.map((g) => {
    const vals = g.keys.map((k) => Math.min(100, scoreFor(k) / (requirements[k] || 100) * 100));
    return vals.length ? Math.round(vals.reduce((a,b)=>a+b,0)/vals.length) : 0;
  });
  const points = radarValues.map((value, i) => {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
    const radius = 78;
    return [100 + Math.cos(angle) * radius * value / 100, 100 + Math.sin(angle) * radius * value / 100];
  });
  const polygon = points.map((p) => p.join(",")).join(" ");
  const outer = finalGroups.map((g, i) => {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
    return [100 + Math.cos(angle) * 78, 100 + Math.sin(angle) * 78];
  });
  const outerPolygon = outer.map((p) => p.join(",")).join(" ");
  const topGaps = requirementNames.map((name) => ({ name, target: requirements[name], current: scoreFor(name), gap: Math.max(0, requirements[name] - scoreFor(name)) })).sort((a,b)=>b.gap-a.gap).slice(0,5);
  const primaryGap = topGaps[0];
  const categoryIcons = [Code2, Database, Brain, BookOpen, Users];
  return <div className="space-y-5">
    <PageHeader eyebrow="OVERVIEW" title={"Good to see you, " + (student.name || "Student") + "."} subtitle="Track your skills, readiness and next steps from one place." action="Verify a skill" onAction={() => setActivePage("verify")} />
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><MetricCard icon={BookOpen} label="Skills added" value={skills.length}/><MetricCard icon={ShieldCheck} label="Verified skills" value={verified}/><MetricCard icon={Target} label="Target careers" value={careersList.length}/><MetricCard icon={Zap} label="Top readiness" value={readiness + "%"}/></div>

    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div><p className="text-[11px] font-extrabold tracking-[0.16em] text-teal-600">CAREER FOCUS</p><h2 className="text-xl font-bold text-slate-900 mt-1">Your character radar</h2><p className="text-xs text-slate-500 mt-1">See what your selected career needs and where you stand.</p></div>
        <div className="flex flex-wrap gap-2">{careersList.map((c,i)=><button key={c} type="button" onClick={()=>{ if(i>0){ const next=[c,...careersList.filter(x=>x!==c)]; localStorage.setItem("skillproof_primary_career",c); setActivePage("dashboard"); window.location.reload(); } }} className={"px-3 py-1.5 rounded-full text-xs font-bold border transition "+(i===0?"bg-teal-50 border-teal-200 text-teal-800":"bg-white border-slate-200 text-slate-600 hover:border-teal-200")}>{c}{i===0&&<span className="ml-1.5 text-[9px] uppercase">Primary</span>}</button>)}</div>
      </div>
      <div className="p-5 grid xl:grid-cols-[190px_minmax(300px,1fr)_300px] gap-5 items-center">
        <div className="space-y-4">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Primary target</p><h3 className="text-2xl font-extrabold text-slate-900 mt-1 leading-tight">{selectedCareer}</h3><span className="inline-flex mt-2 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold">{careersList.length > 1 ? "Primary career" : "Target career"}</span></div>
          <div className="w-24 h-24 rounded-full border-[9px] border-slate-100 relative flex items-center justify-center"><div className="absolute inset-0 rounded-full border-[9px] border-teal-400" style={{clipPath:"inset("+(100-readiness)+"% 0 0 0)"}}/><div className="text-center relative"><p className="text-2xl font-extrabold text-slate-900">{readiness}%</p><p className="text-[9px] text-slate-400">READINESS</p></div></div>
          <div><p className="text-xs font-semibold text-slate-700">{requirementNames.length} core skills needed</p><p className="text-[11px] text-slate-500 mt-1">{skills.length} added · {verified} verified</p></div>
        </div>

        <div className="relative flex items-center justify-center min-h-[270px]">
          <svg viewBox="0 0 200 200" className="w-[260px] h-[260px] max-w-full overflow-visible">
            <polygon points={outerPolygon} fill="none" stroke="#dbe5e8" strokeWidth="1"/>
            {[.75,.5,.25].map((scale)=><polygon key={scale} points={outer.map((p)=>[100+(p[0]-100)*scale,100+(p[1]-100)*scale].join(",")).join(" ")} fill="none" stroke="#e8eef0" strokeWidth="1"/>)}
            {outer.map((p,i)=><line key={i} x1="100" y1="100" x2={p[0]} y2={p[1]} stroke="#e4ecee" strokeWidth="1"/>)}
            <polygon points={polygon} fill="rgba(45,212,191,.16)" stroke="#14b8a6" strokeWidth="2.5"/>
            {points.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="3.2" fill="#14b8a6" stroke="white" strokeWidth="2"/>)}
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-slate-950 shadow-lg flex flex-col items-center justify-center text-white border-4 border-teal-100"><Target size={20} className="text-teal-300"/><p className="text-[11px] font-extrabold text-center leading-tight mt-1 max-w-[80px]">{selectedCareer}</p><p className="text-[8px] text-teal-300 mt-1">{readiness}% READY</p></div>
          {finalGroups.map((g,i)=>{const Icon=categoryIcons[i]; const angle=-Math.PI/2+i*(Math.PI*2/5); const x=50+Math.cos(angle)*43; const y=50+Math.sin(angle)*43; return <div key={g.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{left:x+"%",top:y+"%"}}><div className="w-9 h-9 mx-auto rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center"><Icon size={15} className="text-teal-600"/></div><p className="text-[9px] font-bold text-slate-700 mt-1 whitespace-nowrap">{g.label}</p><p className="text-[9px] text-slate-400">{radarValues[i]}%</p></div>})}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">NEXT MISSION</p><span className="text-[10px] font-bold text-teal-700">{primaryGap ? primaryGap.current + "/" + primaryGap.target : "0/0"}</span></div><p className="font-bold text-slate-900 mt-2">{primaryGap ? "Build " + primaryGap.name : "Add your first skill"}</p><p className="text-[11px] text-slate-500 mt-1">{primaryGap ? "Close your biggest skill gap for " + selectedCareer + "." : "Add skills to activate your career radar."}</p><button onClick={()=>setActivePage("skills")} className="mt-3 w-full h-9 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">Go to My Skills <ArrowRight size={13} className="inline ml-1"/></button></div>
          <div className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center justify-between mb-2"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">SKILLS NEEDED</p><button onClick={()=>setActivePage("gaps")} className="text-[10px] font-bold text-teal-700">View all</button></div><div className="space-y-2">{topGaps.map((g)=><div key={g.name} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"/><span className="text-[11px] font-medium text-slate-700 truncate flex-1">{g.name}</span><span className="text-[9px] text-slate-400">{g.current}/{g.target}</span></div>)}</div></div>
        </div>
      </div>
      {careersList.length > 1 && <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/60"><p className="text-[10px] font-extrabold tracking-wider text-slate-500 mb-2">YOUR TARGET CAREERS ({careersList.length})</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">{careersList.map((c,i)=><button key={c} type="button" onClick={()=>{if(i!==0){alert("To keep your dashboard data stable, select the career from the Careers page. This card is your target overview.");}}} className="text-left rounded-xl border border-slate-200 bg-white px-3 py-2.5 hover:border-teal-200"><div className="flex items-center gap-2"><Target size={14} className="text-teal-600"/><span className="text-xs font-bold text-slate-800 truncate">{c}</span><span className={"ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full "+(i===0?"bg-teal-50 text-teal-700":"bg-slate-100 text-slate-500")}>{i===0?"PRIMARY":"TARGET"}</span></div></button>)}</div></div>}
    </section>
  </div>;
}
`;
      const replaced = code.replace(/function Dashboard[\\s\\S]*?(?=function ProfilePage)/, dashboard);
      return replaced === code ? null : { code: replaced, map: null };
    },
  };
}
