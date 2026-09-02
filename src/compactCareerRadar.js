export function compactCareerRadarPlugin() {
  return {
    name: "skillproof-compact-career-radar",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const dashboard = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const careersList = student.careers || [];
  const career = careersList[0] || "Choose a target career";
  const requirements = careerRequirements[career] || {};
  const names = Object.keys(requirements);
  const score = (name) => Number(skills.find((s) => String(s.name).toLowerCase() === String(name).toLowerCase())?.verificationScore ?? skills.find((s) => String(s.name).toLowerCase() === String(name).toLowerCase())?.level ?? 0);
  const readiness = names.length ? Math.round(names.reduce((sum,n) => sum + Math.min(100, score(n) / requirements[n] * 100), 0) / names.length) : 0;
  const verified = skills.filter((s) => s.verified).length;
  const gaps = names.map((name) => ({ name, current: Math.round(score(name)), target: requirements[name], gap: Math.max(0, requirements[name] - score(name)) })).sort((a,b) => b.gap - a.gap);
  const groups = [
    { label: "Technical", icon: BookOpen, keys: names.filter(n => /python|java|javascript|react|node|spring|html|css|program|git|docker|aws|linux/i.test(n)) },
    { label: "Data", icon: BarChart3, keys: names.filter(n => /sql|data|pandas|numpy|statistics|excel|tableau/i.test(n)) },
    { label: "Problem solving", icon: Sparkles, keys: names.filter(n => /algorithm|problem|logic|analytical|reason/i.test(n)) },
    { label: "Domain", icon: ShieldCheck, keys: names.filter(n => /machine|learning|ai|ml|security|network|database|cloud/i.test(n)) },
    { label: "Communication", icon: Target, keys: names.filter(n => /communication|presentation|team|leadership|collaboration/i.test(n)) },
  ].map(g => ({ ...g, keys: g.keys.length ? g.keys : names.slice(0, 2) }));
  const values = groups.map(g => g.keys.length ? Math.round(g.keys.reduce((sum,n) => sum + Math.min(100, score(n) / (requirements[n] || 100) * 100), 0) / g.keys.length) : 0);
  const outer = groups.map((_,i) => { const a=-Math.PI/2+i*Math.PI*2/5; return [100+Math.cos(a)*70,100+Math.sin(a)*70]; });
  const inner = values.map((v,i) => { const a=-Math.PI/2+i*Math.PI*2/5; return [100+Math.cos(a)*70*v/100,100+Math.sin(a)*70*v/100]; });
  const polygon = p => p.map(x => x.join(",")).join(" ");
  const topGap = gaps[0];
  return <div className="space-y-5">
    <PageHeader eyebrow="OVERVIEW" title={"Good to see you, " + (student.name || "Student") + "."} subtitle="Track your skills, readiness and next steps from one place." action="Verify a skill" onAction={() => setActivePage("verify")} />
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><MetricCard icon={BookOpen} label="Skills added" value={skills.length}/><MetricCard icon={ShieldCheck} label="Verified skills" value={verified}/><MetricCard icon={Target} label="Target careers" value={careersList.length}/><MetricCard icon={Zap} label="Top readiness" value={readiness+"%"}/></div>
    <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-600 uppercase">CAREER FOCUS</p><h2 className="text-lg font-bold text-slate-900 mt-1">Character radar</h2><p className="text-xs text-slate-500 mt-1">Your skill profile against your target career.</p></div>
        <div className="flex flex-wrap gap-1.5">{careersList.map((c,i)=><span key={c} className={"px-2.5 py-1 rounded-full border text-[10px] font-bold "+(i===0?"bg-teal-50 border-teal-200 text-teal-800":"bg-slate-50 border-slate-200 text-slate-500")}>{c}{i===0?" · Primary":""}</span>)}</div>
      </div>
      <div className="p-5 grid lg:grid-cols-[170px_minmax(240px,1fr)_250px] gap-5 items-center">
        <div><p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">TARGET CAREER</p><h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-tight">{career}</h3><div className="mt-4 flex items-center gap-3"><div className="w-14 h-14 rounded-full border-[5px] border-teal-500 bg-teal-50 flex items-center justify-center"><span className="text-sm font-extrabold text-slate-900">{readiness}%</span></div><div><p className="text-xs font-bold text-slate-800">Career readiness</p><p className="text-[10px] text-slate-400">{names.length} core skills</p></div></div></div>
        <div className="relative min-h-[230px] flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-[225px] h-[225px] max-w-full overflow-visible">
            {[1,.75,.5,.25].map(s=><polygon key={s} points={polygon(outer.map(p=>[100+(p[0]-100)*s,100+(p[1]-100)*s]))} fill="none" stroke="#e2e8f0" strokeWidth="1"/>)}
            {outer.map((p,i)=><line key={i} x1="100" y1="100" x2={p[0]} y2={p[1]} stroke="#e2e8f0" strokeWidth="1"/>)}
            <polygon points={polygon(inner)} fill="rgba(20,184,166,.16)" stroke="#14b8a6" strokeWidth="2.5"/>
            {inner.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#14b8a6" stroke="white" strokeWidth="1.5"/>)}
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-slate-900 text-white flex flex-col items-center justify-center shadow-md border-4 border-teal-100"><Target size={16} className="text-teal-300"/><span className="text-[9px] font-extrabold text-center leading-tight mt-1 px-2">{career}</span><span className="text-[8px] text-teal-300 mt-1">{readiness}% READY</span></div>
          {groups.map((g,i)=>{const a=-Math.PI/2+i*Math.PI*2/5;const x=50+Math.cos(a)*42;const y=50+Math.sin(a)*42;const Icon=g.icon;return <div key={g.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{left:x+"%",top:y+"%"}}><div className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto"><Icon size={12} className="text-teal-600"/></div><p className="text-[8px] font-bold text-slate-600 mt-1 whitespace-nowrap">{g.label}</p><p className="text-[8px] text-slate-400">{values[i]}%</p></div>})}
        </div>
        <div className="space-y-3"><div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">SKILLS NEEDED</p><div className="mt-2 space-y-2">{gaps.slice(0,5).map(g=><div key={g.name} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"/><span className="text-[11px] text-slate-700 truncate flex-1">{g.name}</span><span className="text-[9px] font-bold text-slate-400">{g.current}/{g.target}</span></div>)}</div></div><div className="rounded-2xl border border-slate-200 p-4"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">NEXT STEP</p><p className="text-sm font-bold text-slate-900 mt-1">{topGap&&topGap.gap>0?"Improve "+topGap.name:"Add a skill"}</p><p className="text-[10px] text-slate-500 mt-1">{topGap&&topGap.gap>0?"Close the biggest gap for "+career+".":"Add skills to build your radar."}</p><button onClick={()=>setActivePage(topGap&&topGap.gap>0?"skills":"verify")} className="mt-3 w-full h-9 rounded-xl bg-slate-900 text-white text-xs font-bold">Open skill progress <ArrowRight size={12} className="inline ml-1"/></button></div></div>
      </div>
    </section>
  </div>;
}
`;
      const replaced = code.replace(/function Dashboard[\s\S]*?(?=function MySkills)/, dashboard);
      return replaced === code ? null : { code: replaced, map: null };
    },
  };
}
