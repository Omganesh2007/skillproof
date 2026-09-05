const PANIMALAR = "Panimalar Engineering College";
const firstNames = ["Arjun", "Sneha", "Karthik", "Priya", "Rahul", "Ananya", "Naveen", "Divya", "Sanjay", "Monisha", "Yogesh", "Subash", "Harini", "Vignesh", "Janani", "Akash", "Keerthana", "Dinesh", "Pavithra", "Vivek", "Swetha", "Lokesh", "Nithya", "Sathish", "Aishwarya", "Gokul", "Meena", "Rohit", "Varsha", "Surya", "Deepak", "Ramya", "Pranav", "Sowmya", "Manoj", "Lavanya", "Abhishek", "Hema", "Ashwin", "Kavya"];
const lastNames = ["Kumar", "Ramesh", "V", "Dharshini", "Mohan", "S", "Harini", "G", "K", "T", "B", "L", "P", "A", "Raj", "Krish", "Nair", "M", "Sharma", "R"];
const departments = ["Computer Science and Engineering", "Information Technology", "Artificial Intelligence and Data Science", "Electronics and Communication Engineering", "Computer Science and Business Systems"];
const roleSkills = {
  "Java Backend Developer": ["Java", "Spring Boot", "SQL", "REST API", "Git & GitHub", "Docker"],
  "Full Stack Developer": ["JavaScript", "React", "HTML & CSS", "SQL", "Node.js", "Git & GitHub"],
  "Frontend Developer": ["JavaScript", "React", "HTML & CSS", "Git & GitHub"],
  "Python Developer": ["Python", "SQL", "REST API", "Git & GitHub"],
  "AI/ML Engineer": ["Python", "Machine Learning", "Data Analysis", "SQL", "Git & GitHub"],
  "Data Analyst": ["Python", "SQL", "Data Analysis", "Git & GitHub"],
  "Cloud Engineer": ["AWS", "Docker", "Git & GitHub", "Linux"],
  "Cybersecurity Analyst": ["Python", "Linux", "SQL", "Git & GitHub"],
};

function mockPanimalarStudents(role) {
  const skills = roleSkills[role] || roleSkills["Full Stack Developer"];
  return firstNames.map((first, i) => {
    const name = `${first} ${lastNames[i % lastNames.length]}`;
    const score = Math.max(62, 94 - i);
    const matched = skills.slice(0, Math.max(2, skills.length - (i % 3))).map((skill, j) => ({ name: skill, score: Math.max(60, score - j * 3) }));
    return { id: `panimalar-demo-${i + 1}`, name, email: `student${i + 1}.demo@panimalar.skillproof.local`, college: PANIMALAR, department: departments[i % departments.length], graduationYear: i % 4 === 0 ? 2026 : 2027, passedOut: false, suitability: score, verification_score: Math.max(60, score - 2), matchingSkills: matched, missingSkills: skills.slice(matched.length), careers: [role, i % 2 ? "Full Stack Developer" : "Frontend Developer"] };
  });
}

const demoSource = `\nconst PANIMALAR = "Panimalar Engineering College";\nconst firstNames = ${JSON.stringify(firstNames)};\nconst lastNames = ${JSON.stringify(lastNames)};\nconst departments = ${JSON.stringify(departments)};\nconst roleSkills = ${JSON.stringify(roleSkills)};\nfunction mockPanimalarStudents(role) {\n  const skills = roleSkills[role] || roleSkills["Full Stack Developer"];\n  return firstNames.map((first, i) => {\n    const score = Math.max(62, 94 - i);\n    const matched = skills.slice(0, Math.max(2, skills.length - (i % 3))).map((skill, j) => ({ name: skill, score: Math.max(60, score - j * 3) }));\n    return { id: \"panimalar-demo-\" + (i + 1), name: first + \" \" + lastNames[i % lastNames.length], email: \"student\" + (i + 1) + \".demo@panimalar.skillproof.local\", college: PANIMALAR, department: departments[i % departments.length], graduationYear: i % 4 === 0 ? 2026 : 2027, passedOut: false, suitability: score, verification_score: Math.max(60, score - 2), matchingSkills: matched, missingSkills: skills.slice(matched.length), careers: [role, i % 2 ? \"Full Stack Developer\" : \"Frontend Developer\"] };\n  });\n}\n`;

export function panimalarTalentDemoPlugin() {
  return {
    name: "skillproof-panimalar-talent-demo",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/IndustryDashboard.jsx")) return null;
      const marker = "const colleges = (data.colleges || []).map((group) => {";
      if (!code.includes(marker) || code.includes("panimalar-demo-")) return null;
      let normalized = code;
      normalized = demoSource + normalized;
      const injection = `\n  const panimalarDemoStudents = mockPanimalarStudents(role);\n  const panimalarExisting = students.filter((s) => (s.college || "") === PANIMALAR);\n  const panimalarIds = new Set(panimalarExisting.map((s) => s.id));\n  const panimalarStudents = [...panimalarExisting, ...panimalarDemoStudents.filter((s) => !panimalarIds.has(s.id))];\n  const mergedStudents = [...students.filter((s) => (s.college || "") !== PANIMALAR), ...panimalarStudents];\n`;
      const replacement = `const colleges = [\n    { name: PANIMALAR },\n    ...(data.colleges || []).filter((group) => group.name !== PANIMALAR)\n  ].map((group) => {`;
      normalized = normalized.replace(marker, injection + "  " + replacement);
      normalized = normalized.replace("const groupStudents = students.filter((s) => (s.college || \"College not provided\") === group.name);", "const groupStudents = mergedStudents.filter((s) => (s.college || \"College not provided\") === group.name);");
      normalized = normalized.replace("totalStudents: Number(data.count ?? students.length),", "totalStudents: colleges.reduce((sum, group) => sum + group.studentCount, 0),");
      return { code: normalized, map: null };
    },
  };
}
