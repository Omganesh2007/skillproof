import { useEffect, useMemo, useState } from "react";
import { Search, X, CheckCircle2 } from "lucide-react";

const departments = [
  "Computer Science and Engineering", "Computer Engineering", "Civil Engineering", "Chemical Engineering",
  "Computer Applications", "Computer Science", "Computer Science and Business Systems", "Computer Science and Design",
  "Cyber Security", "Data Science", "Electrical and Electronics Engineering", "Electronics and Communication Engineering",
  "Electronics and Instrumentation Engineering", "Information Technology", "Information Science and Engineering",
  "Mechanical Engineering", "Mechatronics Engineering", "Automobile Engineering", "Aeronautical Engineering",
  "Artificial Intelligence and Data Science", "Artificial Intelligence and Machine Learning", "Biotechnology",
  "Biomedical Engineering", "Production Engineering", "Industrial Engineering",
];

export default function PreviousRegister({ student, updateStudent, onRegister, onLogin }) {
  const [collegeSearch, setCollegeSearch] = useState(student.collegeId || student.college || "");
  const [colleges, setColleges] = useState([]);
  const [showColleges, setShowColleges] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState(student.department || "");
  const [showDepartments, setShowDepartments] = useState(false);
  const [careerSearch, setCareerSearch] = useState("");
  const [showCareers, setShowCareers] = useState(false);
  const [selectedCareers, setSelectedCareers] = useState(student.careers || []);

  useEffect(() => {
    setSelectedCareers(student.careers || []);
    setCollegeSearch(student.collegeId || student.college || "");
    setDepartmentSearch(student.department || "");
  }, [student.collegeId, student.college, student.department, student.careers]);

  useEffect(() => {
    fetch("https://skillproof-backend-1.onrender.com/api/students/colleges")
      .then(r => r.ok ? r.json() : { colleges: [] })
      .then(d => setColleges(d.colleges || []))
      .catch(() => setColleges([]));
  }, []);

  const careerList = [
    "Java Backend Developer", "Full Stack Developer", "Frontend Developer", "Python Developer",
    "AI/ML Engineer", "Data Analyst", "Cloud Engineer", "Cybersecurity Analyst",
  ];

  const collegeMatches = useMemo(() => {
    const q = collegeSearch.trim().toLowerCase();
    if (!q) return colleges.slice(0, 8);
    return colleges.filter(c => `${c.name || ""} ${c.college_id || ""}`.toLowerCase().includes(q)).slice(0, 8);
  }, [collegeSearch, colleges]);

  const departmentMatches = useMemo(() => {
    const q = departmentSearch.trim().toLowerCase();
    return q ? departments.filter(d => d.toLowerCase().startsWith(q)) : departments;
  }, [departmentSearch]);

  const careerMatches = useMemo(() => {
    const q = careerSearch.trim().toLowerCase();
    return careerList.filter(c => !selectedCareers.includes(c) && c.toLowerCase().includes(q));
  }, [careerSearch, selectedCareers]);

  const chooseCollege = (college) => {
    updateStudent("college", college.name || "");
    updateStudent("collegeId", college.college_id || "");
    setCollegeSearch(college.college_id || college.name || "");
    setShowColleges(false);
  };

  const chooseCareer = (career) => {
    if (selectedCareers.length >= 3) return;
    const next = [...selectedCareers, career];
    setSelectedCareers(next);
    updateStudent("careers", next);
    setCareerSearch("");
  };

  const removeCareer = (career) => {
    const next = selectedCareers.filter(c => c !== career);
    setSelectedCareers(next);
    updateStudent("careers", next);
  };

  const valid = Boolean(
    student.name && student.email && student.password && student.collegeId && student.college &&
    student.collegeEmail && student.department && student.graduationYear && selectedCareers.length
  );

  return (
    <Auth wide title="Create your profile" subtitle="Use your registered College ID so your institution can track your verified progress.">
      <form onSubmit={onRegister}>
        <SectionTitle title="Personal information" number="01" />
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full name" value={student.name} onChange={v => updateStudent("name", v)} placeholder="Your name" />
          <Field label="Personal email" value={student.email} onChange={v => updateStudent("email", v)} placeholder="you@example.com" type="email" />
          <Field label="Password" value={student.password} onChange={v => updateStudent("password", v)} placeholder="Create a password" type="password" />
          <Field label="College email ID" value={student.collegeEmail || ""} onChange={v => updateStudent("collegeEmail", v)} placeholder="you@college.edu" type="email" />
        </div>

        <div className="mt-5 relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Registered College ID</label>
          <input
            required value={collegeSearch}
            onFocus={() => setShowColleges(true)}
            onChange={e => { setCollegeSearch(e.target.value); setShowColleges(true); }}
            placeholder="Enter College ID or college name..."
            className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4"
          />
          {showColleges && collegeSearch.trim() && (
            <div className="absolute z-30 left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {collegeMatches.length ? collegeMatches.map(c => (
                <button key={c.college_id || c.name} type="button" onMouseDown={e => e.preventDefault()} onClick={() => chooseCollege(c)} className="w-full text-left px-4 py-3 hover:bg-teal-50 border-b border-slate-50">
                  <p className="font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-teal-700">College ID: {c.college_id}</p>
                </button>
              )) : <div className="px-4 py-3 text-sm text-slate-500">No registered college found.</div>}
            </div>
          )}
        </div>

        <div className="mt-3 rounded-xl bg-teal-50 border border-teal-100 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Registered college</p>
          <p className="text-sm font-bold text-slate-800 mt-1">{student.college || "Not selected"}</p>
          <p className="text-xs text-teal-700 mt-1">College ID: {student.collegeId || "Not selected"}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <label className="text-sm font-semibold text-slate-700">Department</label>
            <input required value={departmentSearch} onFocus={() => setShowDepartments(true)} onChange={e => { setDepartmentSearch(e.target.value); updateStudent("department", e.target.value); setShowDepartments(true); }} placeholder="Computer Science" className="w-full h-12 mt-2 rounded-xl border border-slate-200 bg-white px-4" />
            {showDepartments && <div className="absolute z-30 left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {departmentMatches.map(d => <button key={d} type="button" onMouseDown={e => e.preventDefault()} onClick={() => { setDepartmentSearch(d); updateStudent("department", d); setShowDepartments(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 border-b border-slate-50">{d}</button>)}
            </div>}
          </div>
          <Field label="Graduation year" value={student.graduationYear} onChange={v => updateStudent("graduationYear", v)} placeholder="2027" type="number" />
        </div>

        <SectionTitle title="Target careers" number="02" />
        <div className="relative mt-4">
          <div className="min-h-14 w-full rounded-xl border border-slate-200 bg-white p-2 flex flex-wrap gap-2 items-center">
            {selectedCareers.map(c => <span key={c} className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-sm">{c}<button type="button" onClick={() => removeCareer(c)} className="ml-2"><X size={14} /></button></span>)}
            {selectedCareers.length < 3 && <div className="flex-1 min-w-48 flex items-center"><Search size={16} className="text-slate-400 ml-1 mr-2" /><input value={careerSearch} onFocus={() => setShowCareers(true)} onChange={e => { setCareerSearch(e.target.value); setShowCareers(true); }} placeholder="Search target careers..." className="flex-1 h-9 outline-none text-sm" /></div>}
          </div>
          {showCareers && selectedCareers.length < 3 && <div className="absolute z-30 left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">{careerMatches.map(c => <button key={c} type="button" onMouseDown={e => e.preventDefault()} onClick={() => chooseCareer(c)} className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50">{c}</button>)}</div>}
        </div>
        <p className="text-xs text-slate-400 mt-2">Select up to 3 target careers.</p>

        <button disabled={!valid} className="w-full h-12 mt-6 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-40">Create SkillProof profile</button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <button type="button" onClick={onLogin} className="text-teal-700 font-semibold">Sign in</button></p>
    </Auth>
  );
}
