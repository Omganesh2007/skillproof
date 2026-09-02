import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

const extraSkills = [
  "Data Structures and Algorithms", "C++", "Object-Oriented Programming", "Problem Solving", "Debugging",
  "TypeScript", "Responsive Web Design", "Backend Development", "NoSQL", "Database Management",
  "Authentication and Authorization", "API Security", "Excel", "Pandas", "Data Cleaning", "Statistics",
  "Power BI", "Tableau", "Data Visualization", "Probability", "NumPy", "scikit-learn", "Model Evaluation",
  "Feature Engineering", "Model Deployment", "MLOps", "Deep Learning", "TensorFlow", "PyTorch",
  "Natural Language Processing", "Computer Vision", "Generative AI", "Large Language Models (LLMs)",
  "Network Security", "Cybersecurity Fundamentals", "SIEM Tools", "Threat Detection", "Incident Response",
  "Vulnerability Assessment", "Security Monitoring", "Cloud Computing", "Azure", "Google Cloud", "Kubernetes",
  "CI/CD", "Terraform", "FastAPI", "Django", "Spring Boot", "React.js", "Node.js", "REST APIs", "SQL / NoSQL"
];

const skillQuestionOverrides = {
  "Python": [["Which keyword defines a function in Python?",["func","def","function","define"],"def"],["Which Python type stores key-value pairs?",["list","tuple","dict","set"],"dict"],["Which library is commonly used for numerical arrays in Python?",["NumPy","React","Spring","Docker"],"NumPy"],["What does a Python list comprehension create?",["A list","A database","A class file","A network socket"],"A list"],["Which statement handles exceptions in Python?",["try/except","if/else","for/in","switch/case"],"try/except"]],
  "JavaScript": [["Which keyword declares a block-scoped variable in JavaScript?",["let","varclass","define","static"],"let"],["Which method converts JSON text into a JavaScript object?",["JSON.parse()","JSON.read()","JSON.object()","JSON.decodeText()"],"JSON.parse()"],["Which operator checks value and type equality?",["==","=","===","!==="],"==="],["What does an async function return?",["A Promise","A CSS rule","A SQL table","A DOM element only"],"A Promise"],["Which feature is used to respond to a button click?",["Event handler","SQL trigger","Docker image","CSS variable"],"Event handler"]],
  "React": [["Which hook stores local component state?",["useState","useRoute","useStyle","useClass"],"useState"],["Which hook runs side effects in a React component?",["useEffect","useHTML","useServer","useAction"],"useEffect"],["What does a React component normally return?",["UI/JSX","SQL","Dockerfile","HTTP status only"],"UI/JSX"],["Why are keys used when rendering React lists?",["To identify list items","To encrypt data","To create APIs","To style buttons"],"To identify list items"],["Which syntax is commonly used to embed JavaScript expressions in JSX?",["{}","[]","<>","##"],"{}"]],
  "SQL": [["Which command retrieves rows from a SQL table?",["SELECT","PULL","FETCHROW","READ"],"SELECT"],["Which clause filters SQL rows?",["WHERE","FILTERBY","MATCH","LIMITBY"],"WHERE"],["Which SQL operation combines rows from related tables?",["JOIN","MERGEFILE","CONNECT","BIND"],"JOIN"],["Which command adds a new row?",["INSERT","APPENDROW","ADD","CREATE ROW"],"INSERT"],["Which constraint uniquely identifies a table row?",["PRIMARY KEY","FOREIGN TEXT","UNIQUE ROW","IDENTIFIER"],"PRIMARY KEY"]],
  "Git & GitHub": [["Which command creates a new Git repository?",["git init","git start","git new","git create"],"git init"],["Which command records staged changes in Git?",["git commit","git save","git record","git push"],"git commit"],["Which command uploads local commits to a remote repository?",["git push","git upload","git send","git publish"],"git push"],["What is a Git branch mainly used for?",["Independent lines of development","Database backup only","CSS styling","Password storage"],"Independent lines of development"],["What does a pull request commonly enable?",["Code review and merging","Running SQL queries","Creating Docker images","Changing DNS"],"Code review and merging"]],
  "Docker": [["What is a Docker image?",["A packaged application template","A Git branch","A SQL query","A browser tab"],"A packaged application template"],["Which file commonly defines Docker image build instructions?",["Dockerfile","Docker.json","Container.txt","Image.yaml"],"Dockerfile"],["What does a container provide?",["An isolated runtime environment","A Git repository","A spreadsheet","A CSS framework"],"An isolated runtime environment"],["Which command starts a container from an image?",["docker run","docker start-image","docker boot","docker execute-image"],"docker run"],["Why use Docker in deployment?",["To make environments more consistent","To replace source code","To remove testing","To avoid version control"],"To make environments more consistent"]],
  "AWS": [["Which AWS service provides virtual servers?",["EC2","S3","RDS","Route 53"],"EC2"],["Which AWS service is object storage?",["S3","EC2","Lambda","ECS"],"S3"],["Which AWS service provides managed relational databases?",["RDS","S3","CloudFront","IAM"],"RDS"],["Which AWS service manages users and permissions?",["IAM","SQS","ECR","VPC"],"IAM"],["Which AWS service runs code without managing servers?",["Lambda","EC2","EBS","RDS"],"Lambda"]],
  "Linux": [["Which command lists files in Linux?",["ls","dirshow","files","listall"],"ls"],["Which command changes directories?",["cd","move","chdirx","goto"],"cd"],["Which command displays the current directory?",["pwd","where","current","dirpath"],"pwd"],["Which command changes file permissions?",["chmod","chperm","permset","access"],"chmod"],["Which symbol commonly represents the home directory?",["~","#","@","&"],"~"]]
};
function buildQuestions(skill) {
  if (skillQuestionOverrides[skill]) return skillQuestionOverrides[skill].map(([question,options,answer])=>({question,options,answer}));
  return [
    {question:`Which task is most directly associated with ${skill}?`,options:["Applying the skill to solve a real problem","Changing a monitor","Writing unrelated notes","Deleting the project"],answer:"Applying the skill to solve a real problem"},
    {question:`Which is the strongest way to demonstrate practical ${skill} ability?`,options:["A working project","Only memorizing terms","A blank document","Watching one video"],answer:"A working project"},
    {question:`When using ${skill}, what should you do when an error occurs?`,options:["Inspect, test and fix the cause","Ignore it","Delete all code","Stop learning"],answer:"Inspect, test and fix the cause"},
    {question:`Which outcome best shows proficiency in ${skill}?`,options:["Consistent correct application","Knowing the name only","Having many bookmarks","Installing a tool once"],answer:"Consistent correct application"},
    {question:`How should a learner improve ${skill}?`,options:["Practice with progressively harder tasks","Avoid practice","Only copy examples","Never review mistakes"],answer:"Practice with progressively harder tasks"}
  ];
}

function collegeDirectoryPlugin() {
  return {
    name:"skillproof-college-directory",
    transform(code,id){
      if(!id.endsWith("/src/App.jsx")) return null;
      const colleges=JSON.parse(fs.readFileSync(path.resolve(process.cwd(),"src/colleges.json"),"utf8"));
      const careerData=JSON.parse(fs.readFileSync(path.resolve(process.cwd(),"src/careerRoles.json"),"utf8")).roles;
      const skills=[...new Set([...careerData.flatMap(r=>r.skills),...extraSkills])];
      const collegeLiteral=JSON.stringify(colleges);
      const careerNamesLiteral=JSON.stringify(careerData.map(r=>r.name));
      const careerRequirementsLiteral=JSON.stringify(Object.fromEntries(careerData.map(r=>[r.name,Object.fromEntries(r.skills.map(s=>[s,70]))])));
      const skillListLiteral=JSON.stringify(skills);
      const questionsLiteral=JSON.stringify(Object.fromEntries(skills.map(s=>[s,buildQuestions(s)])));
      let next=code;
      next=next.replace(/const colleges = \[[\s\S]*?\];/,`const colleges = ${collegeLiteral};`);
      next=next.replace(/const careers = \[[\s\S]*?\];/,`const careers = ${careerNamesLiteral};`);
      next=next.replace(/const skillList = \[[\s\S]*?\];/,`const skillList = ${skillListLiteral};`);
      next=next.replace(/const careerRequirements = \{[\s\S]*?\n\};/,`const careerRequirements = ${careerRequirementsLiteral};`);
      next=next.replace(/const defaultQuestions = \(skill\) => \[[\s\S]*?\n\];/,`const skillQuestionBank = ${questionsLiteral};\nconst defaultQuestions = (skill) => skillQuestionBank[skill] || [];`);
      next=next.replace("const normalized = { ...student, careers: student.careers || [], skills: student.skills || [] };","const normalized = { ...student, careers: student.careers || [], skills: student.skills || [] };");
      next=next.replace("college_id: normalized.collegeId, collegeId: normalized.collegeId,","college_id: normalized.collegeId, collegeId: normalized.collegeId, college_email: normalized.collegeEmail,");

      const registerReplacement = `function Register({ student, updateStudent, onRegister, onLogin }) {
  const [registeredColleges,setRegisteredColleges]=useState([]); const [loaded,setLoaded]=useState(false);
  const loadColleges=async()=>{ if(loaded) return; try{ const data=await api("/students/colleges"); setRegisteredColleges(data.colleges||[]); }catch{} setLoaded(true); };
  const selected=registeredColleges.find(c=>String(c.college_id)===String(student.collegeId)||String(c.id)===String(student.collegeId));
  const toggleCareer=(career)=>{const current=student.careers||[]; if(current.includes(career)) updateStudent("careers",current.filter(x=>x!==career)); else if(current.length<3) updateStudent("careers",[...current,career]);};
  const valid=student.name&&student.email&&student.password&&student.collegeId&&student.collegeEmail&&student.department&&student.graduationYear&&(student.careers||[]).length;
  return <Auth wide title="Create your student profile" subtitle="Use your college ID so your institution can track your verified progress."><form onSubmit={(e)=>{e.preventDefault();onRegister(e);}}><SectionTitle title="Personal information" number="01"/><div className="grid md:grid-cols-2 gap-4"><Field label="Full name" value={student.name} onChange={v=>updateStudent("name",v)} placeholder="Your name"/><Field label="Personal email" value={student.email} onChange={v=>updateStudent("email",v)} placeholder="you@example.com" type="email"/><Field label="Password" value={student.password} onChange={v=>updateStudent("password",v)} placeholder="Create a password" type="password"/><Field label="College email ID" value={student.collegeEmail||""} onChange={v=>updateStudent("collegeEmail",v)} placeholder="you@college.edu" type="email"/></div><div className="mt-5"><label className="block text-sm font-semibold text-slate-700 mb-2">Registered College ID</label><select required value={student.collegeId||""} onFocus={loadColleges} onChange={e=>{const c=registeredColleges.find(x=>String(x.college_id)===e.target.value);updateStudent("collegeId",e.target.value);if(c)updateStudent("college",c.name);}} className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4"><option value="">Select your college ID</option>{registeredColleges.map(c=><option key={c.college_id} value={c.college_id}>{c.name} — {c.college_id}</option>)}</select><p className="text-xs text-slate-500 mt-2">Your college administrator must create the college account first.</p></div><div className="grid md:grid-cols-2 gap-4 mt-4"><Field label="Department" value={student.department} onChange={v=>updateStudent("department",v)} placeholder="Computer Science"/><Field label="Graduation year" value={student.graduationYear} onChange={v=>updateStudent("graduationYear",v)} placeholder="2027" type="number"/></div><SectionTitle title="Target careers" number="02"/><div className="grid md:grid-cols-2 gap-3">{careers.map(c=><button key={c} type="button" onClick={()=>toggleCareer(c)} className={"text-left p-4 rounded-xl border "+((student.careers||[]).includes(c)?"border-teal-500 bg-teal-50":"border-slate-200 bg-white")}>{c}</button>)}</div><button disabled={!valid} className="w-full h-12 mt-6 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-40">Create SkillProof profile</button></form><p className="text-center text-sm text-slate-500 mt-6">Already have an account? <button type="button" onClick={onLogin} className="text-teal-700 font-semibold">Sign in</button></p></Auth>;
}

function CollegeLogin({ onBack, onLogin }) {
  const [mode,setMode]=useState("login"); const [identifier,setIdentifier]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [college,setCollege]=useState(""); const [newPassword,setNewPassword]=useState(""); const [createdId,setCreatedId]=useState(""); const [busy,setBusy]=useState(false);
  const submitLogin=async(e)=>{e.preventDefault();setBusy(true);try{const data=await api("/auth/login",{method:"POST",body:JSON.stringify({collegeId:identifier,password})});if(data.user?.role!=="college")throw new Error("This is not a college account.");localStorage.setItem("skillproof_college_token",data.token);localStorage.setItem("skillproof_college_user",JSON.stringify(data.user));onLogin();}catch(err){alert(err.message||"College login failed.");}finally{setBusy(false);}};
  const create=async(e)=>{e.preventDefault();setBusy(true);try{const data=await api("/auth/register",{method:"POST",body:JSON.stringify({name,email,password:newPassword,role:"college",college})});const id=data.user?.college_login_id||"";setCreatedId(id);setIdentifier(id);setPassword(newPassword);alert(`College account created. Your College ID is ${id}`);setMode("login");}catch(err){alert(err.message||"College account creation failed.");}finally{setBusy(false);}};
  return <Auth title={mode==="login"?"College sign in":"Create college account"} subtitle={mode==="login"?"Sign in with the College ID created by your institution.":"Create your institution account and receive a unique College ID."}><div className="flex gap-2 mb-5"><button type="button" onClick={()=>setMode("login")} className={"flex-1 h-10 rounded-lg "+(mode==="login"?"bg-slate-900 text-white":"bg-slate-100")}>Sign in</button><button type="button" onClick={()=>setMode("create")} className={"flex-1 h-10 rounded-lg "+(mode==="create"?"bg-slate-900 text-white":"bg-slate-100")}>Create account</button></div>{mode==="login"?<form onSubmit={submitLogin} className="space-y-4"><Field label="College ID" value={identifier} onChange={setIdentifier} placeholder="COL-ANNAUNIV-XXXXXX"/><Field label="Password" value={password} onChange={setPassword} type="password" placeholder="College password"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50">{busy?"Signing in…":"Sign in"}</button>{createdId&&<p className="text-sm text-teal-700 font-semibold">College ID: {createdId}</p>}</form>:<form onSubmit={create} className="space-y-4"><Field label="Administrator name" value={name} onChange={setName} placeholder="College administrator"/><Field label="Official college email" value={email} onChange={setEmail} type="email" placeholder="admin@college.edu"/><Field label="College / Institution name" value={college} onChange={setCollege} placeholder="Your institution name"/><Field label="Password" value={newPassword} onChange={setNewPassword} type="password" placeholder="At least 8 characters"/><button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50">{busy?"Creating…":"Create college account"}</button></form>}<button type="button" onClick={onBack} className="w-full mt-4 text-sm text-slate-500">← Back to workspace selection</button></Auth>;
}
`;
      next=next.replace(/function Register[\s\S]*?(?=function IndustryLogin)/,registerReplacement);
      return next===code?null:{code:next,map:null};
    }
  };
}
export default defineConfig({plugins:[collegeDirectoryPlugin(),react(),tailwindcss()]});
