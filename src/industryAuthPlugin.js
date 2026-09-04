import React from "react";
import { IndustryAuth } from "./industryAuth.jsx";

export function industryAuthPlugin() {
  return {
    name: "skillproof-industry-auth",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const start = code.indexOf("function IndustryLogin(");
      const end = code.indexOf("\n\nfunction CollegeAppShell", start);
      if (start < 0 || end < 0) return null;
      const replacement = `function IndustryLogin({ onBack, onLogin }) { return React.createElement(Auth, { title: "Industry sign in", subtitle: "Discover verified student talent." }, React.createElement(IndustryAuth, { onBack, onLogin })); }`;
      return { code: code.slice(0, start) + replacement + code.slice(end), map: null };
    },
  };
}
