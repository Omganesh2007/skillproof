import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const collegeFlowPlugin = () => ({
  name: "skillproof-college-flow",
  async transform(code, id) {
    if (!id.endsWith("/src/App.jsx")) return null;
    let next = code;
    next = next.replace(
      "college_id: normalized.collegeId, collegeId: normalized.collegeId, department:",
      "college_id: normalized.collegeId, collegeId: normalized.collegeId, college_email: normalized.collegeEmail, department:"
    );

    const registerReplacement = `function Register({ student, updateStudent, onRegister, onLogin }) {
  const [registeredColleges, setRegisteredColleges] = useState([]);
  const [collegeSearch, setCollegeSearch] = useState(student.college || "");
  const [showColleges, setShowColleges] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [collegeError, setCollegeError] = useState("");
  const [careerSearch, setCareerSearch] = useState("");
  const [showCareers, setShowCareers] = useState(false);

  const loadColleges = async () => {
    if (registeredColleges.length || loadingColleges) return;
    setLoadingColleges(true);
    try { const data = await api("/students/colleges"); setRegisteredColleges(data.colleges || []); }
    catch (error) { setCollegeError(error.message || "Could not load registered colleges."); }
    finally { setLoadingColleges(false); }
  };

  const collegeQuery = collegeSearch.trim().toLowerCase();
  const matchingColleges = collegeQuery.length >= 2
    ? registeredColleges.filter((c) => `${c.name} ${c.college_id}`.toLowerCase().includes(collegeQuery)).slice(0, 8)
    : [];

  const chooseCollege = (college) => {
    setCollegeSearch(college.name);
    updateStudent("college", college.name);
    updateStudent("collegeId", college.college_id);
    setShowColleges(false);
  };

  const toggleCareer = (career) => {
    const current = student.careers || [];
    if (current.includes(career)) updateStudent("careers", current.filter((x) => x !== career));
    else if (current.length < 3) updateStudent("careers", [...current, career]);
    setCareerSearch("");
    setShowCareers(false);
  };

  const selectedCareers = student.careers || [];
  const filteredCareers = careers.filter((career) => !selectedCareers.includes(career) && career.toLowerCase().includes(careerSearch.trim().toLowerCase()));
  const valid = student.name && student.email && student.password && student.collegeId && student.collegeEmail && student.department && student.graduationYear && selectedCareers.length;

  return <Auth wide title="Create your profile" subtitle="Use your registered College ID so your institution can track your verified progress.">
    <form onSubmit={(e) => { e.preventDefault(); onRegister(e); }}>
      <SectionTitle title="Personal information" number="01" />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full name" value={student.name} onChange={(v) => updateStudent("name", v)} placeholder="Your name" />
        <Field label="Personal email" value={student.email} onChange={(v) => updateStudent("email", v)} placeholder="you@example.com" type="email" />
        <Field label="Password" value={student.password} onChange={(v) => updateStudent("password", v)} placeholder="Create a password" type="password" />
        <Field label="College email ID" value={student.collegeEmail || ""} onChange={(v) => updateStudent("collegeEmail", v)} placeholder="you@college.edu" type="email" />
      </div>

      <div className="mt-5 relative">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Registered College ID</label>
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            required
            value={collegeSearch}
            onFocus={() => { loadColleges(); setShowColleges(true); }}
            onChange={(e) => { setCollegeSearch(e.target.value); setShowColleges(true); if (!e.target.value.trim()) { updateStudent("college", ""); updateStudent("collegeId", null); } }}
            placeholder="Type at least 2 letters of your college name or ID..."
            className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-11 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>
        {showColleges && collegeQuery.length >= 2 && <div className="absolute z-30 left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {loadingColleges && <p className="px-4 py-3 text-sm text-slate-500">Loading registered colleges…</p>}
          {!loadingColleges && matchingColleges.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No registered college matches.</p>}
          {!loadingColleges && matchingColleges.map((college) => <button key={college.college_id} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => chooseCollege(college)} className="w-full text-left px-4 py-3 hover:bg-teal-50 border-b border-slate-100 last:border-b-0">
            <p className="font-semibold text-slate-800">{college.name}</p>
            <p className="text-xs text-teal-700 mt-1">College ID: {college.college_id}</p>
          </button>)}
        </div>}
        {student.collegeId && student.college && <div className="mt-3 flex flex-wrap items-center gap-2 p-3 rounded-xl bg-teal-50 border border-teal-100">
          <span className="text-sm font-semibold text-slate-800">{student.college}</span>
          <span className="text-xs font-bold text-teal-800 bg-white border border-teal-200 px-2.5 py-1 rounded-full">{student.collegeId}</span>
        </div>}
        {collegeError && <p className="text-xs text-red-600 mt-2">{collegeError}</p>}
        <p className="text-xs text-slate-500 mt-2">Type 2 or more letters. Select the matching registered college to automatically fill its College ID.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Field label="Department" value={student.department} onChange={(v) => updateStudent("department", v)} placeholder="Computer Science" />
        <Field label="Graduation year" value={student.graduationYear} onChange={(v) => updateStudent("graduationYear", v)} placeholder="2027" type="number" />
      </div>

      <SectionTitle title="Target careers" number="02" />
      <div className="relative">
        <div className="min-h-14 w-full rounded-xl border border-slate-200 bg-white p-2 flex flex-wrap items-center gap-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
          {selectedCareers.map((career) => <span key={career} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-sm font-medium">
            {career}<button type="button" onClick={() => toggleCareer(career)} className="text-teal-700 hover:text-slate-900"><X size={14} /></button>
          </span>)}
          {selectedCareers.length < 3 && <input value={careerSearch} onFocus={() => setShowCareers(true)} onChange={(e) => { setCareerSearch(e.target.value); setShowCareers(true); }} placeholder={selectedCareers.length ? "Add another career..." : "Search and select target careers..."} className="flex-1 min-w-52 h-9 px-2 outline-none text-sm" />}
        </div>
        {showCareers && selectedCareers.length < 3 && <div className="absolute z-30 left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {filteredCareers.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No matching careers.</p>}
          {filteredCareers.map((career) => <button key={career} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => toggleCareer(career)} className="w-full text-left px-4 py-3 hover:bg-teal-50 border-b border-slate-100 last:border-b-0 text-sm font-medium text-slate-800">{career}</button>)}
        </div>}
        <p className="text-xs text-slate-500 mt-2">Select up to 3 careers. Your choices appear as removable tags, like a professional profile skill selector.</p>
      </div>

      <button disabled={!valid} className="w-full h-12 mt-6 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-40">Create SkillProof profile</button>
    </form>
    <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <button type="button" onClick={onLogin} className="text-teal-700 font-semibold">Sign in</button></p>
  </Auth>;
}
`;

    const collegeReplacement = `function CollegeLogin({ onBack, onLogin }) {
  const [mode, setMode] = useState("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createdId, setCreatedId] = useState("");
  const [busy, setBusy] = useState(false);
  const submitLogin = async (e) => {
    e.preventDefault(); setBusy(true);
    try { const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ collegeId: identifier.trim(), password }) }); if (data.user?.role !== "college") throw new Error("This is not a college account."); localStorage.setItem("skillproof_college_token", data.token); localStorage.setItem("skillproof_college_user", JSON.stringify(data.user)); onLogin(); }
    catch (error) { alert(error.message || "College login failed."); } finally { setBusy(false); }
  };
  const create = async (e) => {
    e.preventDefault(); setBusy(true);
    try { const data = await api("/auth/register", { method: "POST", body: JSON.stringify({ name: name.trim(), email: email.trim(), password: newPassword, role: "college", college: college.trim() }) }); const id = data.user?.college_login_id || ""; if (!id) throw new Error("College account was created but no College ID was returned."); setCreatedId(id); setIdentifier(id); setPassword(newPassword); setMode("login"); alert("College account created successfully. Your College ID is " + id); }
    catch (error) { alert(error.message || "College account creation failed."); } finally { setBusy(false); }
  };
  return <Auth title={mode === "login" ? "College sign in" : "Create college account"} subtitle={mode === "login" ? "Sign in with the College ID created by your institution." : "Create your institution account and receive a unique College ID."}>
    <div className="flex gap-2 mb-5"><button type="button" onClick={() => setMode("login")} className={"flex-1 h-10 rounded-lg " + (mode === "login" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}>Sign in</button><button type="button" onClick={() => setMode("create")} className={"flex-1 h-10 rounded-lg " + (mode === "create" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}>Create account</button></div>
    {mode === "login" ? <form onSubmit={submitLogin} className="space-y-4"><Field label="College ID" value={identifier} onChange={setIdentifier} placeholder="COL-ANNAUNIV-XXXXXX" /><Field label="Password" value={password} onChange={setPassword} type="password" placeholder="College password" /><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50">{busy ? "Signing in…" : "Sign in as College"}</button>{createdId && <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-sm"><p className="text-slate-600">Your new College ID</p><p className="font-bold text-teal-800 mt-1">{createdId}</p></div>}</form> : <form onSubmit={create} className="space-y-4"><Field label="Administrator name" value={name} onChange={setName} placeholder="College administrator" /><Field label="Official college email" value={email} onChange={setEmail} type="email" placeholder="admin@college.edu" /><Field label="College / Institution name" value={college} onChange={setCollege} placeholder="Your institution name" /><Field label="Password" value={newPassword} onChange={setNewPassword} type="password" placeholder="At least 8 characters" /><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50">{busy ? "Creating…" : "Create college account"}</button></form>}
    <button type="button" onClick={onBack} className="w-full mt-4 text-sm text-slate-500">← Back to workspace selection</button>
  </Auth>;
}
`;

    next = next.replace(/function Register[\s\S]*?(?=function CollegeLogin)/, registerReplacement);
    next = next.replace(/function CollegeLogin[\s\S]*?(?=function IndustryLogin)/, collegeReplacement);
    if (next === code) return null;
    const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
    return { code: result.code, map: result.map || null };
  },
});

export default defineConfig({ plugins: [collegeFlowPlugin(), react(), tailwindcss()] });
