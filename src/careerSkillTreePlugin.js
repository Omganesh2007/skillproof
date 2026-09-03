import { transformWithOxc } from "vite";

export function careerSkillTreePlugin() {
  return {
    name: "skillproof-career-skill-tree",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;

      const dashboard = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const careersList = student.careers || [];
  const [activeCareer, setActiveCareer] = useState(careersList[0] || "Choose a target career");
  const career = careersList.includes(activeCareer) ? activeCareer : (careersList[0] || "Choose a target career");
  const requirements = careerRequirements[career] || {};
  const names = Object.keys(requirements);
  const score = (name) => {
    const found = skills.find((item) => String(item.name).trim().toLowerCase() === String(name).trim().toLowerCase());
    return Number(found?.verificationScore ?? found?.level ?? 0);
  };
  const skillRows = names.map((name, index) => ({
    name,
    target: Number(requirements[name] || 0),
    current: Math.round(score(name)),
    index,
  }));
  const readiness = names.length ? Math.round(skillRows.reduce((sum, row) => sum + Math.min(100, row.target ? (row.current / row.target) * 100 : 0), 0) / names.length) : 0;
  const verified = skills.filter((item) => item.verified).length;
  const gaps = skillRows.map((row) => ({ ...row, gap: Math.max(0, row.target - row.current) })).sort((a, b) => b.gap - a.gap);
  const topGap = gaps[0];
  const scoreForCareer = (targetCareer) => {
    const req = careerRequirements[targetCareer] || {};
    const roleSkills = Object.keys(req);
    return roleSkills.length ? Math.round(roleSkills.reduce((sum, name) => sum + Math.min(100, req[name] ? (score(name) / req[name]) * 100 : 0), 0) / roleSkills.length) : 0;
  };
  return <div className="space-y-5">
    <PageHeader eyebrow="OVERVIEW" title={"Good to see you, " + (student.name || "Student") + "."} subtitle="Track your skills, readiness and next steps from one place." action="Verify a skill" onAction={() => setActivePage("verify")} />
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard icon={BookOpen} label="Skills added" value={skills.length}/>
      <MetricCard icon={ShieldCheck} label="Verified skills" value={verified}/>
      <MetricCard icon={Target} label="Target careers" value={careersList.length}/>
      <MetricCard icon={Zap} label="Career readiness" value={readiness + "%"}/>
    </div>

    <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-600 uppercase">CAREER FOCUS</p>
          <h2 className="text-lg font-bold text-slate-900 mt-1">Career readiness</h2>
          <p className="text-xs text-slate-500 mt-1">Follow the skill path in order to move closer to your target role.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {careersList.map((item, index) => <button type="button" key={item} onClick={() => setActiveCareer(item)} className={"px-3 py-1.5 rounded-full border text-[10px] font-bold transition " + (career === item ? "bg-teal-50 border-teal-200 text-teal-800" : "bg-white border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-700")}>{item}{index === 0 ? " · Primary" : " · Target"}</button>)}
        </div>
      </div>

      <div className="p-5 grid lg:grid-cols-[185px_minmax(0,1fr)_285px] gap-5 items-start">
        <div className="lg:pt-8">
          <p className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-slate-400">TARGET CAREER</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-tight">{career}</h3>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-[6px] border-teal-500 bg-teal-50 flex items-center justify-center shrink-0"><span className="text-sm font-extrabold text-slate-900">{readiness}%</span></div>
            <div><p className="text-xs font-bold text-slate-800">Career readiness</p><p className="text-[10px] text-slate-400 mt-0.5">{names.length} required skills</p></div>
          </div>
          <div className="mt-5 rounded-2xl bg-teal-50/70 border border-teal-100 p-3.5">
            <p className="text-[10px] font-extrabold text-teal-800">HOW IT WORKS</p>
            <p className="text-[10px] leading-relaxed text-slate-600 mt-1.5">Complete the skills from top to bottom. Each step builds the foundation for the next.</p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center"><Target size={16} className="text-teal-600"/></div>
            <div><p className="text-sm font-extrabold text-slate-900">Skill tree for {career}</p><p className="text-[10px] text-slate-500">Build your skills step by step</p></div>
          </div>
          <div className="max-h-[430px] overflow-y-auto pr-1 pl-1">
            {skillRows.length ? skillRows.map((row, index) => {
              const percent = Math.min(100, row.target ? (row.current / row.target) * 100 : 0);
              const complete = percent >= 100;
              return <div key={row.name} className="relative">
                <div className={"rounded-2xl border p-3.5 sm:p-4 transition " + (complete ? "border-teal-200 bg-teal-50/30" : "border-slate-200 bg-white hover:border-teal-200 hover:shadow-sm")}>
                  <div className="flex items-start gap-3">
                    <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold " + (complete ? "bg-teal-100 text-teal-700" : "bg-slate-50 text-slate-500 border border-slate-200")}>{index + 1}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2"><p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{row.name}</p><span className={"ml-auto shrink-0 text-[9px] font-extrabold " + (complete ? "text-teal-700" : "text-slate-400")}>{row.current}/{row.target}</span></div>
                      <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className="h-full bg-teal-400 rounded-full transition-all" style={{width: percent + "%"}}/></div>
                      <p className="text-[9px] text-slate-400 mt-1.5">{complete ? "Completed · next skill unlocked" : row.current > 0 ? "In progress · keep building this skill" : index === 0 ? "Start here · foundation skill" : "Locked until the previous step is complete"}</p>
                    </div>
                  </div>
                </div>
                {index < skillRows.length - 1 && <div className="h-5 flex justify-center"><div className="w-px bg-slate-200 relative"><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-slate-200"/></div></div>}
              </div>;
            }) : <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center"><p className="text-sm font-bold text-slate-700">No skill path available yet.</p><p className="text-xs text-slate-400 mt-1">Choose a target career to build your skill tree.</p></div>}
          </div>
          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-[10px] text-slate-500">Complete each skill to unlock the next and increase your career readiness.</div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center justify-between"><p className="text-[10px] font-extrabold tracking-wider text-slate-500">SKILL SUMMARY</p><span className="text-[9px] font-bold text-slate-400">{names.length} skills</span></div>
            <div className="mt-3 space-y-2.5">{gaps.slice(0, 5).map((row) => { const pct = Math.min(100, row.target ? (row.current / row.target) * 100 : 0); return <div key={row.name}><div className="flex items-center gap-2"><span className={"w-1.5 h-1.5 rounded-full " + (pct >= 100 ? "bg-teal-500" : "bg-slate-300")}/><span className="text-[10px] text-slate-700 truncate flex-1">{row.name}</span><span className="text-[9px] font-bold text-slate-400">{row.current}/{row.target}</span></div><div className="h-1 bg-slate-200 rounded-full mt-1 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:pct + "%"}}/></div></div>; })}</div>
            <button type="button" onClick={() => setActivePage("gaps")} className="mt-3 text-[10px] font-bold text-teal-700 hover:text-teal-800">Open full skill tree →</button>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-500">NEXT STEP</p>
            <p className="text-sm font-bold text-slate-900 mt-1">{topGap && topGap.gap > 0 ? "Improve " + topGap.name : "Add a skill"}</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{topGap && topGap.gap > 0 ? "Close the biggest gap for " + career + "." : "Your required skills are covered."}</p>
            <button type="button" onClick={() => setActivePage(topGap && topGap.gap > 0 ? "skills" : "verify")} className="mt-3 w-full h-9 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">Open skill progress <ArrowRight size={12} className="inline ml-1"/></button>
          </div>
        </div>
      </div>

      {careersList.length > 1 && <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/60"><p className="text-[10px] font-extrabold tracking-wider text-slate-500 mb-2">YOUR TARGET CAREERS ({careersList.length})</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">{careersList.map((item, index) => { const rr = scoreForCareer(item); return <button type="button" key={item} onClick={() => setActiveCareer(item)} className={"text-left rounded-xl border px-3 py-3 transition " + (career === item ? "border-teal-300 bg-teal-50/50" : "border-slate-200 bg-white hover:border-teal-200")}><div className="flex items-center gap-2"><Target size={14} className="text-teal-600"/><span className="text-xs font-bold text-slate-800 truncate">{item}</span><span className={"ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full " + (index === 0 ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-500")}>{index === 0 ? "PRIMARY" : "TARGET"}</span></div><div className="mt-2 flex items-center gap-2"><span className="text-[9px] text-slate-500">{rr}% readiness</span><div className="h-1.5 bg-slate-100 rounded-full flex-1 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width: rr + "%"}}/></div></div></button>; })}</div></div>}
    </section>
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
