import { transformWithOxc } from "vite";

export function personalizationPlugin() {
  return {
    name: "skillproof-personalization",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      let next = code;
      const welcome = `function WelcomeBanner({student}) { const name=(student?.name||"Student").trim()||"Student"; const first=name.split(/\\s+/)[0]; const career=(student?.careers||[])[0]; return <section className="mb-5 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-slate-50 px-5 py-4 shadow-sm"><div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-600 uppercase">WELCOME BACK</p><h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Welcome, {first} 👋</h2><p className="text-xs sm:text-sm text-slate-500 mt-1">{career?"Your "+career+" journey is ready. Keep building skills and evidence.":"Your career journey is ready. Choose a target role to get started."}</p></div><div className="hidden sm:flex w-11 h-11 rounded-xl bg-white border border-teal-100 items-center justify-center text-teal-700 font-extrabold">{first.charAt(0).toUpperCase()}</div></div></section>; }`;
      if (!next.includes("function WelcomeBanner")) next = next.replace(/\nfunction App\(/, "\n" + welcome + "\nfunction App(");
      next = next.replace(/<OpportunitiesPage\s*\/>/g, "<OpportunitiesPage student={student} />");
      const appShellPattern = /function AppShell\(([\s\S]*?)\)\s*\{([\s\S]*?)(return\s+<div)([^>]*)>/;
      if (appShellPattern.test(next) && !next.includes("<WelcomeBanner student={student} />")) {
        next = next.replace(appShellPattern, (match, args, body, ret, attrs) => `function AppShell(${args}) {${body}${ret}${attrs}><WelcomeBanner student={student} />`);
      }
      if (next === code) return null;
      const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
      return { code: result.code, map: result.map || null };
    },
  };
}
