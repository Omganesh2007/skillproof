import { defineConfig, transformWithEsbuild } from "vite";
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
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [collegeError, setCollegeError] = useState("");
  const loadColleges = async () => {
    if (registeredColleges.length || loadingColleges) return;
    setLoadingColleges(true);
    try { const data = await api("/students/colleges"); setRegisteredColleges(data.colleges || []); }
    catch (error) { setCollegeError(error.message || "Could not load registered colleges."); }
    finally { setLoadingColleges(false); }
  };
  const toggleCareer = (career) => {
    const current = student.careers || [];
    if (current.includes(career)) updateStudent("careers", current.filter((x) => x !== career));
    else if (current.length < 3) updateStudent("careers", [...current, career]);
  };
  const valid = student.name && student.email && student.password && student.collegeId && student.collegeEmail && student.department && student.graduationYear && (student.careers || []).length;
  return <Auth wide title="Create your profile" subtitle="Use your registered College ID so your institution can track your verified progress.">
    <form onSubmit={(e) => { e.preventDefault(); onRegister(e); }}>
      <SectionTitle title="Personal information" number="01" />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full name" value={student.name} onChange={(v) => updateStudent("name", v)} placeholder="Your name" />
        <Field label="Personal email" value={student.email} onChange={(v) => updateStudent("email", v)} placeholder="you@example.com" type="email" />
        <Field label="Password" value={student.password} onChange={(v) => updateStudent("password", v)} placeholder="Create a password" type="password" />
        <Field label="College email ID" value={student.collegeEmail || ""} onChange={(v) => updateStudent("collegeEmail", v)} placeholder="you@college.edu" type="email" />
      </div>
      <div className="mt-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Registered College ID</label>
        <select required value={student.collegeId || ""} onFocus={loadColleges} onChange={(e) => { const c = registeredColleges.find((x) => String(x.college_id) === e.target.value); updateStudent("collegeId", e.target.value); if (c) updateStudent("college", c.name); }} className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4">
          <option value="">{loadingColleges ? "Loading registered colleges…" : "Select your College ID"}</option>
          {registeredColleges.map((c) => <option key={c.college_id} value={c.college_id}>{c.name} — {c.college_id}</option>)}
        </select>
        {collegeError && <p className="text-xs text-red-600 mt-2">{collegeError}</p>}
        <p className="text-xs text-slate-500 mt-2">Your college administrator must create the college account first. Only registered College IDs can be used.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Field label="Department" value={student.department} onChange={(v) => updateStudent("department", v)} placeholder="Computer Science" />
        <Field label="Graduation year" value={student.graduationYear} onChange={(v) => updateStudent("graduationYear", v)} placeholder="2027" type="number" />
      </div>
      <SectionTitle title="Target careers" number="02" />
      <div className="grid md:grid-cols-2 gap-3">{careers.map((career) => <button key={career} type="button" onClick={() => toggleCareer(career)} className={"text-left p-4 rounded-xl border " + ((student.careers || []).includes(career) ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white")}>{career}</button>)}</div>
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
    return await transformWithEsbuild(next, id, { loader: "jsx", jsx: "automatic", sourcemap: true });
  },
});

export default defineConfig({ plugins: [collegeFlowPlugin(), react(), tailwindcss()] });
