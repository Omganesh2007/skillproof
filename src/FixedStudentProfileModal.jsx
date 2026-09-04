import { X } from "lucide-react";

export default function FixedStudentProfileModal({ student, onClose }) {
  if (!student) return null;
  const skills = Array.isArray(student.skills) ? student.skills : [];
  const verifiedSkills = skills.filter((skill) => skill?.verified);
  const score = (skill) => Number(skill?.verificationScore ?? skill?.level ?? 0);
  const readiness = verifiedSkills.length
    ? Math.round(verifiedSkills.reduce((sum, skill) => sum + score(skill), 0) / verifiedSkills.length)
    : Number(student.verification_score ?? student.verificationScore ?? 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 md:p-8 overflow-y-auto" onClick={onClose}>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="px-6 py-5 md:px-8 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Student profile</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">{student.name || "Student"}</h2>
            <p className="text-slate-500 mt-1">{student.email || ""}</p>
          </div>
          <button type="button" onClick={onClose} className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50" aria-label="Close">
            <X size={21} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">College</p><p className="font-bold mt-1 truncate">{student.college || "-"}</p></div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Department</p><p className="font-bold mt-1">{student.department || "-"}</p></div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-xs text-slate-400">Graduation</p><p className="font-bold mt-1">{student.graduation_year || student.graduationYear || "-"}</p></div>
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100"><p className="text-xs text-teal-700">Career readiness</p><p className="text-2xl font-bold text-teal-800 mt-1">{readiness}%</p></div>
          </div>

          <section className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900">Target careers</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {(student.careers || []).map((career) => <span key={career} className="px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium">{career}</span>)}
              {!student.careers?.length && <span className="text-sm text-slate-400">No target careers selected.</span>}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-slate-900">Verified skills</h3>
              <span className="text-sm font-semibold text-teal-700">{verifiedSkills.length} verified</span>
            </div>
            {verifiedSkills.length ? (
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                {verifiedSkills.map((skill, index) => (
                  <div key={`${skill.name || "skill"}-${index}`} className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-slate-900">{skill.name || "Unnamed skill"}</p>
                      <p className="text-xl font-bold text-teal-700">{score(skill)}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 mt-4 overflow-hidden"><div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.max(0, Math.min(100, score(skill)))}%` }} /></div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-slate-500 mt-4">No verified skills yet.</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
