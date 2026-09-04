export function studentWelcomePlugin() {
  return {
    name: "skillproof-student-welcome",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      let next = code;
      const welcome = `<div className="mb-5 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-white px-5 py-4"><p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-700 uppercase">WELCOME BACK</p><div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mt-1"><div><h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Hi, {student.name || "Student"}! 👋</h1><p className="text-xs sm:text-sm text-slate-600 mt-1">Here is your SkillProof career progress for today.</p></div><div className="text-xs font-semibold text-teal-700">{(student.careers || []).length} target career{(student.careers || []).length === 1 ? "" : "s"}</div></div></div>`;
      next = next.replace('<main className="p-5 md:p-8 max-w-[1500px] mx-auto">{children}</main>', '<main className="p-5 md:p-8 max-w-[1500px] mx-auto">{activePage === "dashboard" && '+welcome+'}{children}</main>');
      next = next.replace(/<OpportunitiesPage\s*\/>/g, '<OpportunitiesPage student={student} />');
      return next === code ? null : { code: next, map: null };
    },
  };
}
