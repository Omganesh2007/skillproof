export function careerSkillGapPagePlugin() {
  return {
    name: "skillproof-career-and-skill-gap-pages",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;

      // Keep the existing Careers / Skill Gap UI in App.jsx. Only normalize the
      // data calculation here so saved skills from older registrations, logins,
      // or assessments all contribute to readiness.
      const oldAnalysis = 'function careerAnalysis(student,career){const req=careerRequirements[career]||{};const skills=Object.entries(req).map(([name,required])=>{const found=(student.skills||[]).find(s=>s.name===name);const current=Number(found?.verified?found.verificationScore||found.level||0:found?.level||0);return {name,required,current,gap:Math.max(0,required-current)};});const readiness=skills.length?Math.round(skills.reduce((sum,s)=>sum+Math.min(s.current/s.required,1)*100,0)/skills.length):0;return {readiness,skills};}';
      const newAnalysis = 'function careerAnalysis(student,career){const req=careerRequirements[career]||{};const skills=Object.entries(req).map(([name,required])=>{const found=(student.skills||[]).find(s=>(typeof s==="string"?s:s?.name)===name);const current=typeof found==="string"?50:Number(found?.verified?found?.verificationScore??found?.level??0:found?.level??found?.verificationScore??0)||0;return {name,required,current:Math.max(0,Math.min(100,current)),gap:Math.max(0,required-Math.max(0,Math.min(100,current)))};});const readiness=skills.length?Math.round(skills.reduce((sum,s)=>sum+Math.min(s.current/s.required,1)*100,0)/skills.length):0;return {readiness,skills};}';

      let next = code.replace(oldAnalysis, newAnalysis);
      // A gap is a positive amount still needed, not a negative number.
      next = next.replace('{s.gap?`-${s.gap}% gap`:"Requirement met"}', '{s.gap?`${s.gap}% gap`:"Requirement met"}');
      return next === code ? null : { code: next, map: null };
    },
  };
}
