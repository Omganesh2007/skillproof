function findFunctionRange(code, name) {
  const start = code.indexOf(`function ${name}(`);
  if (start < 0) return null;
  const open = code.indexOf("{", start);
  if (open < 0) return null;
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = open; i < code.length; i += 1) {
    const ch = code[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { quote = ch; continue; }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return [start, i + 1];
    }
  }
  return null;
}

export function industryDashboardPlugin() {
  return {
    name: "skillproof-industry-dashboard",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const range = findFunctionRange(code, "IndustryAppShell");
      if (!range) return null;
      const replacement = `function IndustryAppShell({ logout }) {
  const [page, setPage] = useState("dashboard");
  const user = useMemo(() => { try { return JSON.parse(localStorage.getItem("skillproof_industry_user") || "{}"); } catch { return {}; } }, []);
  const company = user.company || user.organization || user.name || "Industry Partner";
  const email = user.email || "";
  const department = user.department || "Talent Acquisition";
  const initials = company.split(/\\s+/).map(x => x[0]).join("").slice(0, 2).toUpperCase() || "IP";
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200">
      <div className="p-5 border-b border-slate-100"><Logo dark/></div>
      <nav className="p-4 space-y-2">
        <NavItem active={page === "dashboard"} onClick={() => setPage("dashboard")} icon={LayoutDashboard} label="Dashboard"/>
        <NavItem active={page === "talent"} onClick={() => setPage("talent")} icon={Target} label="Talent"/>
        <NavItem active={page === "jobs"} onClick={() => setPage("jobs")} icon={BriefcaseBusiness} label="Jobs"/>
        <NavItem active={page === "profile"} onClick={() => setPage("profile")} icon={User} label="Industry Profile"/>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100"><button onClick={logout} className="w-full h-10 flex items-center gap-2 px-2 text-sm text-slate-500"><LogOut size={16}/>Sign out</button></div>
    </aside>
    <div className="ml-64 min-h-screen">
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
        <div><p className="text-xs text-slate-400">Industry workspace</p><h1 className="font-semibold">{page === "talent" ? "Discover talent" : page === "jobs" ? "Job opportunities" : page === "profile" ? "Industry Profile" : "Industry dashboard"}</h1></div>
        <button onClick={() => setPage("profile")} className="flex items-center gap-3 text-right"><div><p className="text-sm font-semibold">{company}</p><p className="text-xs text-slate-400">{department}</p></div><div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">{initials}</div></button>
      </header>
      <main className="p-8">
        {page === "dashboard" && <div className="space-y-6">
          <PageHeader eyebrow="INDUSTRY" title={\`Welcome, \${company}.\`} subtitle="Your hiring workspace for discovering evidence-backed student talent." action="Browse talent" onAction={() => setPage("talent")}/>
          <Panel title="Industry profile" subtitle="Your organization details used across the hiring workspace.">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Company / organization</p><p className="font-bold mt-2">{company}</p></div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Work email</p><p className="font-bold mt-2 break-all">{email || "Not provided"}</p></div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Hiring function</p><p className="font-bold mt-2">{department}</p></div>
            </div>
          </Panel>
          <Panel title="Hiring workspace" subtitle="Quick actions for your placement and recruitment workflow.">
            <div className="grid md:grid-cols-3 gap-4">
              <button onClick={() => setPage("talent")} className="text-left p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><Target size={20}/></div><h3 className="font-bold mt-4">Discover verified talent</h3><p className="text-sm text-slate-500 mt-2 leading-6">Find students by verified skills, readiness and career fit.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">Browse talent →</span></button>
              <button onClick={() => setPage("jobs")} className="text-left p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><BriefcaseBusiness size={20}/></div><h3 className="font-bold mt-4">Manage opportunities</h3><p className="text-sm text-slate-500 mt-2 leading-6">Review internship and placement opportunities for students.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">View jobs →</span></button>
              <button onClick={() => setPage("profile")} className="text-left p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/30"><div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><User size={20}/></div><h3 className="font-bold mt-4">Complete industry profile</h3><p className="text-sm text-slate-500 mt-2 leading-6">Keep your organization and hiring contact information ready for collaboration.</p><span className="inline-block mt-4 text-sm font-semibold text-teal-700">View profile →</span></button>
            </div>
          </Panel>
          <Panel title="How SkillProof helps your hiring" subtitle="A simple evidence-first recruitment workflow.">
            <div className="grid md:grid-cols-3 gap-4"><InfoCard icon={ShieldCheck} title="Verified evidence" text="Review assessment-backed skills instead of relying only on claims."/><InfoCard icon={Target} title="Career fit" text="Compare student strengths with the roles you are hiring for."/><InfoCard icon={BarChart3} title="Readiness signals" text="Use readiness scores to prioritize promising candidates."/></div>
          </Panel>
        </div>}
        {page === "talent" && <IndustryTalentPage/>}
        {page === "jobs" && <IndustryJobsPage/>}
        {page === "profile" && <div className="space-y-6"><PageHeader eyebrow="PROFILE" title="Industry profile" subtitle="Organization information for the SkillProof hiring workspace." action="Browse talent" onAction={() => setPage("talent")}/><Panel title={company} subtitle="Industry account details."><div className="grid md:grid-cols-2 gap-4"><ReadOnly label="Company / organization" value={company}/><ReadOnly label="Work email" value={email || "Not provided"}/><ReadOnly label="Hiring function" value={department}/><ReadOnly label="Account type" value="Industry partner"/></div></Panel><Panel title="Collaboration focus"><div className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="font-semibold">Connect with verified student talent</p><p className="text-sm text-slate-500 mt-2 leading-6">Use the Talent section to discover students with evidence-backed skills, compare career fit, and identify candidates for internships and placements.</p></div></Panel></div>}
      </main>
    </div>
  </div>;
}`;
      return { code: code.slice(0, range[0]) + replacement + code.slice(range[1]), map: null };
    },
  };
}
