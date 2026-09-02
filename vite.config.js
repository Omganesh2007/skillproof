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
  "Python": [
    ["Which keyword defines a function in Python?", ["func", "def", "function", "define"], "def"],
    ["Which Python type stores key-value pairs?", ["list", "tuple", "dict", "set"], "dict"],
    ["Which library is commonly used for numerical arrays in Python?", ["NumPy", "React", "Spring", "Docker"], "NumPy"],
    ["What does a Python list comprehension create?", ["A list", "A database", "A class file", "A network socket"], "A list"],
    ["Which statement handles exceptions in Python?", ["try/except", "if/else", "for/in", "switch/case"], "try/except"]
  ],
  "JavaScript": [
    ["Which keyword declares a block-scoped variable in JavaScript?", ["let", "varclass", "define", "static"], "let"],
    ["Which method converts JSON text into a JavaScript object?", ["JSON.parse()", "JSON.read()", "JSON.object()", "JSON.decodeText()"], "JSON.parse()"],
    ["Which operator checks value and type equality?", ["==", "=", "===", "!==="], "==="],
    ["What does an async function return?", ["A Promise", "A CSS rule", "A SQL table", "A DOM element only"], "A Promise"],
    ["Which feature is used to respond to a button click?", ["Event handler", "SQL trigger", "Docker image", "CSS variable"], "Event handler"]
  ],
  "React": [
    ["Which hook stores local component state?", ["useState", "useRoute", "useStyle", "useClass"], "useState"],
    ["Which hook runs side effects in a React component?", ["useEffect", "useHTML", "useServer", "useAction"], "useEffect"],
    ["What does a React component normally return?", ["UI/JSX", "SQL", "Dockerfile", "HTTP status only"], "UI/JSX"],
    ["Why are keys used when rendering React lists?", ["To identify list items", "To encrypt data", "To create APIs", "To style buttons"], "To identify list items"],
    ["Which syntax is commonly used to embed JavaScript expressions in JSX?", ["{}", "[]", "<>", "##"], "{}"]
  ],
  "SQL": [
    ["Which command retrieves rows from a SQL table?", ["SELECT", "PULL", "FETCHROW", "READ"], "SELECT"],
    ["Which clause filters SQL rows?", ["WHERE", "FILTERBY", "MATCH", "LIMITBY"], "WHERE"],
    ["Which SQL operation combines rows from related tables?", ["JOIN", "MERGEFILE", "CONNECT", "BIND"], "JOIN"],
    ["Which command adds a new row?", ["INSERT", "APPENDROW", "ADD", "CREATE ROW"], "INSERT"],
    ["Which constraint uniquely identifies a table row?", ["PRIMARY KEY", "FOREIGN TEXT", "UNIQUE ROW", "IDENTIFIER"], "PRIMARY KEY"]
  ],
  "Git & GitHub": [
    ["Which command creates a new Git repository?", ["git init", "git start", "git new", "git create"], "git init"],
    ["Which command records staged changes in Git?", ["git commit", "git save", "git record", "git push"], "git commit"],
    ["Which command uploads local commits to a remote repository?", ["git push", "git upload", "git send", "git publish"], "git push"],
    ["What is a Git branch mainly used for?", ["Independent lines of development", "Database backup only", "CSS styling", "Password storage"], "Independent lines of development"],
    ["What does a pull request commonly enable?", ["Code review and merging", "Running SQL queries", "Creating Docker images", "Changing DNS"], "Code review and merging"]
  ],
  "Docker": [
    ["What is a Docker image?", ["A packaged application template", "A Git branch", "A SQL query", "A browser tab"], "A packaged application template"],
    ["Which file commonly defines Docker image build instructions?", ["Dockerfile", "Docker.json", "Container.txt", "Image.yaml"], "Dockerfile"],
    ["What does a container provide?", ["An isolated runtime environment", "A Git repository", "A spreadsheet", "A CSS framework"], "An isolated runtime environment"],
    ["Which command starts a container from an image?", ["docker run", "docker start-image", "docker boot", "docker execute-image"], "docker run"],
    ["Why use Docker in deployment?", ["To make environments more consistent", "To replace source code", "To remove testing", "To avoid version control"], "To make environments more consistent"]
  ],
  "AWS": [
    ["Which AWS service provides virtual servers?", ["EC2", "S3", "RDS", "Route 53"], "EC2"],
    ["Which AWS service is object storage?", ["S3", "EC2", "Lambda", "ECS"], "S3"],
    ["Which AWS service provides managed relational databases?", ["RDS", "S3", "CloudFront", "IAM"], "RDS"],
    ["Which AWS service manages users and permissions?", ["IAM", "SQS", "ECR", "VPC"], "IAM"],
    ["Which AWS service runs code without managing servers?", ["Lambda", "EC2", "EBS", "RDS"], "Lambda"]
  ],
  "Linux": [
    ["Which command lists files in Linux?", ["ls", "dirshow", "files", "listall"], "ls"],
    ["Which command changes directories?", ["cd", "move", "chdirx", "goto"], "cd"],
    ["Which command displays the current directory?", ["pwd", "where", "current", "dirpath"], "pwd"],
    ["Which command changes file permissions?", ["chmod", "chperm", "permset", "access"], "chmod"],
    ["Which symbol commonly represents the home directory?", ["~", "#", "@", "&"], "~"]
  ]
};

function buildQuestions(skill) {
  if (skillQuestionOverrides[skill]) {
    return skillQuestionOverrides[skill].map(([question, options, answer]) => ({ question, options, answer }));
  }
  const clean = skill.replace(/\s*\/\s*/g, " / ");
  return [
    { question: `Which task is most directly associated with ${clean}?`, options: ["Applying the skill to solve a real problem", "Changing a monitor", "Writing unrelated notes", "Deleting the project"], answer: "Applying the skill to solve a real problem" },
    { question: `Which is the strongest way to demonstrate practical ${clean} ability?`, options: ["A working project", "Only memorizing terms", "A blank document", "Watching one video"], answer: "A working project" },
    { question: `When using ${clean}, what should you do when an error occurs?`, options: ["Inspect, test and fix the cause", "Ignore it", "Delete all code", "Stop learning"], answer: "Inspect, test and fix the cause" },
    { question: `Which outcome best shows proficiency in ${clean}?`, options: ["Consistent correct application", "Knowing the name only", "Having many bookmarks", "Installing a tool once"], answer: "Consistent correct application" },
    { question: `How should a learner improve ${clean}?`, options: ["Practice with progressively harder tasks", "Avoid practice", "Only copy examples", "Never review mistakes"], answer: "Practice with progressively harder tasks" }
  ];
}

function collegeDirectoryPlugin() {
  return {
    name: "skillproof-college-directory",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const colleges = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src/colleges.json"), "utf8"));
      const careerData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src/careerRoles.json"), "utf8")).roles;
      const roleSkills = careerData.flatMap((role) => role.skills);
      const skills = [...new Set([...roleSkills, ...extraSkills])];
      const collegeLiteral = JSON.stringify(colleges);
      const careerNamesLiteral = JSON.stringify(careerData.map((role) => role.name));
      const careerRequirementsLiteral = JSON.stringify(Object.fromEntries(careerData.map((role) => [role.name, Object.fromEntries(role.skills.map((skill) => [skill, 70]))])));
      const skillListLiteral = JSON.stringify(skills);
      const questionsLiteral = JSON.stringify(Object.fromEntries(skills.map((skill) => [skill, buildQuestions(skill)])));

      let next = code.replace(/const colleges = \[[\s\S]*?\];/, `const colleges = ${collegeLiteral};`);
      next = next.replace(/const careers = \[[\s\S]*?\];/, `const careers = ${careerNamesLiteral};`);
      next = next.replace(/const skillList = \[[\s\S]*?\];/, `const skillList = ${skillListLiteral};`);
      next = next.replace(/const careerRequirements = \{[\s\S]*?\n\};/, `const careerRequirements = ${careerRequirementsLiteral};`);
      next = next.replace(/const defaultQuestions = \(skill\) => \[[\s\S]*?\n\];/, `const skillQuestionBank = ${questionsLiteral};\nconst defaultQuestions = (skill) => skillQuestionBank[skill] || [];`);
      next = next.replace("const filtered=[...startsWith,...contains].slice(0,10);", "const filtered=[...startsWith,...contains];");
      return next === code ? null : { code: next, map: null };
    },
  };
}

export default defineConfig({
  plugins: [collegeDirectoryPlugin(), react(), tailwindcss()],
});
