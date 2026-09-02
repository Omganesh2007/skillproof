import { defineConfig, transformWithOxc } from "vite";
import baseConfig from "./vite.config.js";

const dashboardMapPlugin = () => ({
  name: "skillproof-career-map",
  enforce: "pre",
  async transform(code, id) {
    if (!id.endsWith("/src/App.jsx")) return null;
    const dashboardReplacement = `function Dashboard({ student, setActivePage }) {
  const skills = student.skills || [];
  const verified = skills.filter((s) => s.verified).length;
  const career = (student.careers || [])[0] || "Choose a target career";
  const requirements = careerRequirements[career] || {};
  const scoreFor = (name) => {
    const item = skills.find((s) => s.name === name);
    return Math.max(0, Math.min(100, Number(item?.verificationScore ?? item?.level ?? 0)));
  };
  const requirementNames = Object.keys(requirements);
  const readiness = requirementNames.length
    ? Math.round(requirementNames.reduce((sum, name) => sum + Math.min(100, (scoreFor(name) / requirements[name]) * 100), 0) / requirementNames.length)
    : 0;
  const missing = requirementNames
    .map((name) => ({ name, gap: Math.max(0, requirements[name] - scoreFor(name)) }))
    .sort((a, b) => b.gap - a.gap)[0];
  const stageCount = readiness >= 100 ? 5 : readiness >= 80 ? 4 : readiness >= 60 ? 3 : readiness >= 35 ? 2 : readiness > 0 ? 1 : 0;
  const stages = [
    { title: "Profile", text: "Create your base", icon: User },
    { title: "Skills", text: "Build your toolkit", icon: BookOpen },
    { title: "Evidence", text: "Prove what you know", icon: ShieldCheck },
    { title: "Fit", text: "Close career gaps", icon: Target },
    { title: "Ready", text: "Career ready", icon: CheckCircle2 },
  ];
  return <div className="space-y-6">
    <PageHeader eyebrow="OVERVIEW" title={"Good to see you, " + (student.name || "Student") + "."} subtitle="Track your skills, readiness and next steps from one place." action="Verify a skill" onAction={() => setActivePage("verify")} />
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard icon={BookOpen} label="Skills added" value={skills.length}/>
      <MetricCard icon={ShieldCheck} label="Verified skills" value={verified}/>
      <MetricCard icon={Target} label="Target careers" value={student.careers?.length || 0}/>
      <MetricCard icon={Zap} label="Top readiness" value={readiness + "%"}/>
    </div>

    <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-6 md:px-8 pt-6 md:pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-teal-600"><Sparkles size={14}/> CAREER QUEST</div>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Your path to {career}</h2>
          <p className="text-sm text-slate-500 mt-1">Complete each checkpoint to move your career avatar forward.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center"><Target className="text-teal-600" size={22}/></div>
          <div><p className="text-xs text-slate-400">Current progress</p><p className="text-2xl font-bold">{readiness}%</p></div>
        </div>
      </div>

      <div className="px-5 md:px-8 pb-7 pt-5">
        <div className="relative">
          <div className="hidden md:block absolute left-[10%] right-[10%] top-10 h-1 rounded-full bg-slate-100"/>
          <div className="hidden md:block absolute left-[10%] top-10 h-1 rounded-full bg-teal-400 transition-all" style={{ width: Math.max(0, Math.min(80, stageCount * 20)) + "%" }}/>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stages.map((stage, index) => {
              const done = index < stageCount;
              const current = index === stageCount && stageCount < stages.length;
              const Icon = stage.icon;
              return <button key={stage.title} type="button" onClick={() => current ? setActivePage(index < 2 ? "skills" : "verify") : undefined} className="group text-left md:text-center">
                <div className="flex md:block items-center gap-4">
                  <div className={"w-20 h-20 shrink-0 mx-auto rounded-full border-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 " + (done ? "bg-teal-500 border-teal-100 text-white" : current ? "bg-white border-teal-400 text-teal-600 ring-8 ring-teal-50" : "bg-slate-50 border-slate-200 text-slate-400")}>
                    <Icon size={26}/>
                  </div>
                  <div className="mt-0 md:mt-3"><p className={"font-bold text-sm " + (current ? "text-teal-700" : "text-slate-800")}>{stage.title}</p><p className="text-xs text-slate-400 mt-1">{stage.text}</p></div>
                </div>
                {current && <span className="inline-flex mt-3 ml-0 md:ml-0 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold">YOU ARE HERE</span>}
                {done && <span className="inline-flex mt-3 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-[11px] font-semibold">✓ Complete</span>}
              </button>;
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-6 md:px-8 py-5 grid md:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0"><Zap size={18} className="text-teal-600"/></div>
          <div><p className="text-sm font-bold">Next mission</p><p className="text-sm text-slate-500 mt-1">{missing && missing.gap > 0 ? "Improve " + missing.name + " by about " + missing.gap + " points to unlock the next checkpoint." : readiness >= 100 ? "Amazing! Your career path is complete. Keep your evidence fresh." : "Add and verify skills to start your career quest."}</p></div>
        </div>
        <button onClick={() => setActivePage(missing && missing.gap > 0 ? "skills" : "verify")} className="h-11 px-5 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2">{missing && missing.gap > 0 ? "Improve skill" : "Start next step"}<ArrowRight size={16}/></button>
      </div>
    </section>
  </div>;
}
`;
    const next = code.replace(/function Dashboard[\\s\\S]*?(?=function MySkills)/, dashboardReplacement);
    if (next === code) return null;
    const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
    return { code: result.code, map: result.map || null };
  },
});

export default defineConfig({ ...baseConfig, plugins: [dashboardMapPlugin(), ...(baseConfig.plugins || [])] });
