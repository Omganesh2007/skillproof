const pageData = (student) => {
  const selected = Array.isArray(student?.careers) ? student.careers : [];
  return (selected.length ? selected : ["Frontend Developer", "Full Stack Developer", "Java Backend Developer"]).slice(0, 3);
};

const skillValue = (student, skill) => {
  const item = (student?.skills || []).find((entry) => (typeof entry === "string" ? entry : entry?.name) === skill);
  return Math.max(0, Math.min(100, Number(typeof item === "string" ? 0 : item?.level ?? item?.verificationScore ?? 0) || 0));
};

const readiness = (student, requirements) => {
  const values = Object.entries(requirements).map(([skill, required]) => Math.min(skillValue(student, skill), required) / required);
  return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length * 100) : 0;
};

export function careerSkillGapPagePlugin() {
  return {
    name: "skillproof-career-and-skill-gap-pages",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;

      const careersReplacement = `function CareersPage({ student }) {
  const roles = pageData(student);
  return <main className="max-w-7xl mx-auto px-6 py-8">
    <p className="text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">Career</p>
    <h1 className="text-4xl font-bold tracking-tight text-slate-950 mt-2">Career readiness</h1>
    <p className="text-lg text-slate-500 mt-3">See how your current profile matches each target role.</p>
    <div className="grid lg:grid-cols-3 gap-5 mt-8">
      {roles.map((role) => {
        const requirements = careerRequirements[role] || {};
        const score = readiness(student, requirements);
        return <section key={role} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-950">{role}</h2><span className="text-lg font-bold text-teal-700">{score}%</span></div>
          <Progress value={score} />
          <div className="mt-5 space-y-3">{Object.entries(requirements).map(([skill, required]) => <div key={skill} className="flex items-center justify-between text-sm"><span className="text-slate-500">{skill}</span><span className="font-medium text-slate-900">{skillValue(student, skill)}/{required}</span></div>)}</div>
        </section>;
      })}
    </div>
  </main>;
}`;

      const gapReplacement = `function SkillGapPage({ student }) {
  const roles = pageData(student);
  return <main className="max-w-7xl mx-auto px-6 py-8">
    <p className="text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">Career</p>
    <h1 className="text-4xl font-bold tracking-tight text-slate-950 mt-2">Skill Gap</h1>
    <p className="text-lg text-slate-500 mt-3">The gap is calculated against the requirements of each target role.</p>
    <div className="grid lg:grid-cols-3 gap-5 mt-8">
      {roles.map((role) => {
        const requirements = careerRequirements[role] || {};
        return <section key={role} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{role}</h2>
          <div className="mt-5 space-y-3">{Object.entries(requirements).map(([skill, required]) => {
            const current = skillValue(student, skill);
            const gap = Math.max(0, required - current);
            return <div key={skill} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0"><span className="text-slate-600">{skill}</span><span className={gap === 0 ? "font-semibold text-teal-700" : "font-semibold text-rose-500"}>{gap === 0 ? "Requirement met" : "-" + gap + "% gap"}</span></div>;
          })}</div>
        </section>;
      })}
    </div>
  </main>;
}`;

      const replaceFunction = (source, name, replacement) => {
        const start = source.indexOf(`function ${name}(`);
        if (start < 0) return source;
        const next = source.indexOf("\nfunction ", start + 10);
        const end = next < 0 ? source.length : next;
        return source.slice(0, start) + replacement + source.slice(end);
      };

      let next = replaceFunction(code, "CareersPage", careersReplacement);
      next = replaceFunction(next, "SkillGapPage", gapReplacement);
      return { code: next, map: null };
    },
  };
}
