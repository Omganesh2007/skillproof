import { useState } from "react";

const API_BASE = "https://skillproof-backend-1.onrender.com/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function Field({ label, value, onChange, placeholder, type = "text", required = true }) {
  return <div><label className="text-sm font-semibold text-slate-700">{label}</label><input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 mt-2 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-teal-400" /></div>;
}

export function IndustryAuth({ onBack, onLogin }) {
  const [mode, setMode] = useState("login");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const body = mode === "register"
        ? { name: company.trim(), email: email.trim(), password, role: "industry", organization: company.trim(), company_name: company.trim(), department: department.trim() || null }
        : { email: email.trim(), password };
      const data = await request(`/auth/${mode === "register" ? "register" : "login"}`, { method: "POST", body: JSON.stringify(body) });
      if (data.user?.role && data.user.role !== "industry") throw new Error("This account is not an industry account.");
      if (data.token) localStorage.setItem("skillproof_industry_token", data.token);
      localStorage.setItem("skillproof_industry_user", JSON.stringify(data.user || {}));
      onLogin(data.user);
    } catch (err) { setError(err.message || "Industry account request failed."); }
    finally { setLoading(false); }
  };

  return <div>
    <form onSubmit={submit} className="space-y-5">
      {mode === "register" && <Field label="Company / Organization name" value={company} onChange={setCompany} placeholder="Your company name" />}
      <Field label="Work email" value={email} onChange={setEmail} type="email" placeholder="industry@example.com" />
      <Field label="Password" value={password} onChange={setPassword} type="password" placeholder={mode === "register" ? "Create a password" : "Password"} />
      {mode === "register" && <Field label="Department (optional)" value={department} onChange={setDepartment} placeholder="HR / Talent Acquisition / Engineering" required={false} />}
      {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">{error}</p>}
      <button disabled={loading} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-60">{loading ? (mode === "register" ? "Creating account..." : "Signing in...") : (mode === "register" ? "Create Industry account" : "Sign in as Industry")}</button>
    </form>
    <div className="text-center mt-6"><button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="text-sm text-teal-700 font-semibold">{mode === "login" ? "New industry? Create an account" : "Already have an account? Sign in"}</button></div>
    {mode === "login" && <p className="text-xs text-slate-400 mt-4 text-center">Demo workspace for hackathon presentation.</p>}
    <button type="button" onClick={onBack} className="w-full mt-4 text-sm text-slate-500">← Back to role selection</button>
  </div>;
}
