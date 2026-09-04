import { transformWithOxc } from "vite";

const OPPORTUNITIES = [
  {company:"Deloitte",title:"Data Analyst Intern",type:"Internship",careers:["Data Analyst","AI/ML Engineer"],location:"India · Hybrid",skills:["SQL","Python","Data Analysis"],link:"https://www.deloitte.com/careers"},
  {company:"Accenture",title:"Data Analytics Intern",type:"Internship",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Data Analysis","Excel"],link:"https://www.accenture.com/in-en/careers"},
  {company:"IBM",title:"Data & AI Intern",type:"Internship",careers:["Data Analyst","AI/ML Engineer"],location:"India · Hybrid",skills:["Python","SQL","Machine Learning"],link:"https://www.ibm.com/careers"},
  {company:"TCS",title:"Data Analyst / Graduate Intern",type:"Internship",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://www.tcs.com/careers"},
  {company:"Amazon",title:"Business Intelligence Engineer Intern",type:"Internship",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Data Analysis","Python"],link:"https://www.amazon.jobs"},
  {company:"Microsoft",title:"Data & Applied Science Intern",type:"Internship",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["Python","Machine Learning","Data Analysis"],link:"https://careers.microsoft.com"},
  {company:"Walmart Global Tech",title:"Data Analyst Intern",type:"Internship",careers:["Data Analyst"],location:"India · Bengaluru",skills:["SQL","Python","Data Visualization"],link:"https://careers.walmart.com"},
  {company:"PwC",title:"Data Analytics Intern",type:"Internship",careers:["Data Analyst"],location:"India · Hybrid",skills:["SQL","Excel","Data Analysis"],link:"https://www.pwc.in/careers.html"},
  {company:"EY",title:"Data & Analytics Intern",type:"Internship",careers:["Data Analyst","AI/ML Engineer"],location:"India · Hybrid",skills:["SQL","Python","Data Analysis"],link:"https://www.ey.com/en_in/careers"},
  {company:"KPMG",title:"Data Analytics Intern",type:"Internship",careers:["Data Analyst"],location:"India · Hybrid",skills:["SQL","Excel","Data Analysis"],link:"https://kpmg.com/in/en/home/careers.html"},
  {company:"Google",title:"Data Analytics / Business Intelligence Roles",type:"Jobs",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://careers.google.com"},
  {company:"Fractal",title:"Data Analyst",type:"Jobs",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Python","Data Visualization"],link:"https://fractal.ai/careers/"},
  {company:"Mu Sigma",title:"Decision Sciences / Data Analyst",type:"Jobs",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Python","Statistics"],link:"https://www.mu-sigma.com/careers"},
  {company:"Tiger Analytics",title:"Data Analyst / Analytics Roles",type:"Jobs",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Python","Machine Learning"],link:"https://www.tigeranalytics.com/careers/"},
  {company:"Infosys",title:"Data & Analytics Graduate Roles",type:"Jobs",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://www.infosys.com/careers/"},
  {company:"Wipro",title:"Data Analyst / Analytics Roles",type:"Jobs",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://careers.wipro.com"},
  {company:"HCLTech",title:"Data & Analytics Roles",type:"Jobs",careers:["Data Analyst","AI/ML Engineer"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://www.hcltech.com/careers"},
  {company:"Capgemini",title:"Data Analyst / BI Roles",type:"Jobs",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Power BI","Data Analysis"],link:"https://www.capgemini.com/careers/"},
  {company:"Cognizant",title:"Data Analyst",type:"Jobs",careers:["Data Analyst"],location:"India · Multiple locations",skills:["SQL","Python","Data Analysis"],link:"https://careers.cognizant.com"},
];

export function studentOpportunitiesPlugin() {
  return {
    name: "skillproof-student-opportunities",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const opportunities = `function OpportunitiesPage({student}) { const careersList=student?.careers||[]; const [filter,setFilter]=useState("All"); const relevant=opportunityData.filter(item=>item.careers.some(c=>careersList.includes(c))); const list=filter==="All"?relevant:relevant.filter(item=>item.type===filter); return <div className="space-y-5"><PageHeader eyebrow="OPPORTUNITIES" title="Internships & Jobs" subtitle={careersList.length?"Opportunities matched to your target careers.":"Choose a target career to personalize your opportunities."}/><section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-700 uppercase">PERSONALIZED FOR YOU</p><h2 className="text-base font-extrabold text-slate-900 mt-1">{relevant.length} relevant opportunities</h2><p className="text-xs text-slate-600 mt-1">Showing roles matched to {careersList.length?careersList.join(", "):"your target career"}.</p></div><div className="flex gap-2">{["All","Internship","Jobs"].map(x=><button key={x} type="button" onClick={()=>setFilter(x)} className={"px-3 py-1.5 rounded-lg text-xs font-bold border "+(filter===x?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-600 border-slate-200")}>{x}</button>)}</div></div></section>{list.length?<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{list.map((item,i)=><article key={item.company+item.title+i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-200 hover:shadow-md transition"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-extrabold text-slate-900">{item.company}</p><p className="text-sm font-bold text-slate-700 mt-1">{item.title}</p></div><span className={"px-2 py-1 rounded-full text-[9px] font-extrabold "+(item.type==="Internship"?"bg-teal-50 text-teal-700":"bg-slate-100 text-slate-600")}>{item.type}</span></div><p className="text-xs text-slate-500 mt-3">{item.location}</p><div className="flex flex-wrap gap-1.5 mt-3">{item.skills.map(skill=><span key={skill} className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[9px] text-slate-600">{skill}</span>)}</div><p className="text-[9px] text-teal-700 font-bold mt-3">Matched to: {item.careers.filter(c=>careersList.includes(c)).join(", ")}</p><a href={item.link} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-1 w-full h-9 rounded-xl bg-slate-900 text-white text-xs font-bold">View opening <ArrowRight size={13}/></a></article>)}</div>:<div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-white"><p className="font-bold text-slate-700">No matching opportunities yet.</p><p className="text-xs text-slate-500 mt-1">Select a target career and SkillProof will filter internships and jobs for it.</p></div>}</div>; }`;
      let next=code;
      next=next.replace(/function OpportunitiesPage[\\s\\S]*?(?=function ProfilePage)/,opportunities);
      next=next.replace(/const javaQuestions =/,"const opportunityData = "+JSON.stringify(OPPORTUNITIES)+";\\nconst javaQuestions =");
      next=next.replace(/<OpportunitiesPage\s*\/>/g,"<OpportunitiesPage student={student} />");
      if(next===code)return null;
      const result=await transformWithOxc(next,id,{lang:"jsx",jsx:{runtime:"automatic"}});
      return {code:result.code,map:result.map||null};
    },
  };
}
