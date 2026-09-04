export function registrationFormPlugin() {
  return {
    name: "skillproof-registration-form",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;
      let next = code.replace(/onRegister=\{\(\) => setScreen\("register"\)\}/, 'onRegister={() => { setStudent({ ...emptyStudent, careers: [], skills: [] }); setScreen("register"); }}');
      const start = next.indexOf("function Register(");
      const end = next.indexOf("\nfunction CollegeLogin", start);
      if (start < 0 || end < 0) return next === code ? null : { code: next, map: null };
      const importLine = 'import PreviousRegister from "./PreviousRegister.jsx";\n';
      const replacement = 'function Register(props) { return <PreviousRegister {...props} />; }';
      return { code: importLine + next.slice(0, start) + replacement + next.slice(end), map: null };
    },
  };
}
