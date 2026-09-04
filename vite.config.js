import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { careerSkillTreePlugin } from "./src/careerSkillTreePlugin.js";
import { studentUiPlugin } from "./src/studentUiOverrides.js";
import { studentDataPlugin } from "./src/studentDataOverrides.js";

const collegeFlowPlugin = () => ({
  name: "skillproof-college-flow",
  async transform(code, id) {
    if (!id.endsWith("/src/App.jsx")) return null;
    let next = code;
    next = next.replace("college_id: normalized.collegeId, collegeId: normalized.collegeId, department:", "college_id: normalized.collegeId, collegeId: normalized.collegeId, college_email: normalized.collegeEmail, department:");
    const collegeReplacement = `function CollegeLogin({ onBack, onLogin }) { const [mode,setMode]=useState("login"); const [identifier,setIdentifier]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [college,setCollege]=useState(""); const [newPassword,setNewPassword]=useState(""); const [busy,setBusy]=useState(false); const submit=async e=>{e.preventDefault();setBusy(true);try{const d=await api("/auth/login",{method:"POST",body:JSON.stringify({collegeId:identifier.trim(),password})});if(d.user?.role!=="college")throw new Error("This is not a college account.");localStorage.setItem("skillproof_college_token",d.token);localStorage.setItem("skillproof_college_user",JSON.stringify(d.user));onLogin()}catch(err){alert(err.message||"College login failed")}finally{setBusy(false)}}; const create=async e=>{e.preventDefault();setBusy(true);try{const d=await api("/auth/register",{method:"POST",body:JSON.stringify({name:name.trim(),email:email.trim(),password:newPassword,role:"college",college:college.trim()})});alert("College account created. Your College ID is "+(d.user?.college_login_id||""));setIdentifier(d.user?.college_login_id||"");setPassword(newPassword);setMode("login")}catch(err){alert(err.message||"College account creation failed")}finally{setBusy(false)}}; return <Auth title={mode==="login"?"College sign in":"Create college account"} subtitle="Sign in with the College ID created by your institution."><div className="flex gap-2 mb-5"><button type="button" onClick={()=>setMode("login")} className="flex-1 h-10 rounded-lg bg-slate-900 text-white">Sign in</button><button type="button" onClick={()=>setMode("create")} className="flex-1 h-10 rounded-lg bg-slate-100 text-slate-700">Create account</button></div>{mode==="login"?<form onSubmit={submit} className="space-y-4"><Field label="College ID" value={identifier} onChange={setIdentifier} placeholder="COL-ANNAUNIV-XXXXXX"/><Field label="Password" value={password} onChange={setPassword} type="password" placeholder="College password"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold">{busy?"Signing in…":"Sign in as College"}</button></form>:<form onSubmit={create} className="space-y-4"><Field label="Administrator name" value={name} onChange={setName} placeholder="College administrator"/><Field label="Official college email" value={email} onChange={setEmail} type="email" placeholder="admin@college.edu"/><Field label="College / Institution name" value={college} onChange={setCollege} placeholder="Your institution name"/><Field label="Password" value={newPassword} onChange={setNewPassword} type="password" placeholder="At least 8 characters"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold">{busy?"Creating…":"Create college account"}</button></form>}<button type="button" onClick={onBack} className="w-full mt-4 text-sm text-slate-500">← Back to workspace selection</button></Auth>; }`;
    next=next.replace(/function CollegeLogin[\s\S]*?(?=function IndustryLogin)/,collegeReplacement);
    if(next===code)return null;
    const result=await transformWithOxc(next,id,{lang:"jsx",jsx:{runtime:"automatic"}});
    return {code:result.code,map:result.map||null};
  },
});

export default defineConfig({plugins:[studentUiPlugin(),studentDataPlugin(),careerSkillTreePlugin(),collegeFlowPlugin(),react(),tailwindcss()]});
