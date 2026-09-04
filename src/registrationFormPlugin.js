export function registrationFormPlugin() {
  return {
    name: "skillproof-registration-form",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const start = code.indexOf("function Register(");
      const end = code.indexOf("\nfunction CollegeLogin", start);
      if (start < 0 || end < 0 || code.includes("import PreviousRegister")) return null;
      const importLine = 'import PreviousRegister from "./PreviousRegister.jsx";\n';
      const replacement = 'function Register(props) { return <PreviousRegister {...props} />; }';
      return { code: importLine + code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
