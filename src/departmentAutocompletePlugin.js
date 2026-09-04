export function departmentAutocompletePlugin() {
  return {
    name: "skillproof-department-autocomplete",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const departments = [
        "Computer Science and Engineering",
        "Computer Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Computer Applications",
        "Computer Science",
        "Computer Science and Business Systems",
        "Computer Science and Design",
        "Cyber Security",
        "Data Science",
        "Electrical and Electronics Engineering",
        "Electronics and Communication Engineering",
        "Electronics and Instrumentation Engineering",
        "Information Technology",
        "Information Science and Engineering",
        "Mechanical Engineering",
        "Mechatronics Engineering",
        "Automobile Engineering",
        "Aeronautical Engineering",
        "Artificial Intelligence and Data Science",
        "Artificial Intelligence and Machine Learning",
        "Biotechnology",
        "Biomedical Engineering",
        "Production Engineering",
        "Industrial Engineering",
      ];
      const deptCode = JSON.stringify(departments);
      const old = '<Field label="Department" value={student.department} onChange={(v)=>updateStudent("department",v)} placeholder="CSE / IT / ECE" />';
      const fresh = `<DepartmentAutocomplete value={student.department} onChange={(v)=>updateStudent("department",v)} departments={${deptCode}} />`;
      let next = code.replace(old, fresh);
      if (next === code) return null;
      const component = `function DepartmentAutocomplete({value,onChange,departments}){const [open,setOpen]=useState(false);const q=(value||"").trim().toLowerCase();const matches=q?departments.filter(d=>d.toLowerCase().startsWith(q)):departments;return <div className="relative"><label className="text-sm font-semibold text-slate-700">Department</label><input required value={value||""} onFocus={()=>setOpen(true)} onChange={e=>{onChange(e.target.value);setOpen(true)}} placeholder="CSE / IT / ECE" className="w-full h-12 mt-2 rounded-xl border border-slate-200 bg-white px-4" autoComplete="off"/>{open&&<div className="absolute z-30 left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">{matches.map(d=><button key={d} type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>{onChange(d);setOpen(false)}} className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 border-b border-slate-50">{d}</button>)}{!matches.length&&<div className="px-4 py-3 text-sm text-slate-500">No department found.</div>}</div>}</div>}`;
      next = next.replace(/function CollegeLogin/, component + "\nfunction CollegeLogin");
      return { code: next, map: null };
    },
  };
}
