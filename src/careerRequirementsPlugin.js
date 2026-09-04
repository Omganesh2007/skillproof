import { transformWithOxc } from "vite";

const expandedRequirements = {
  "Java Backend Developer": {
    "Java Foundations": 60,
    Java: 80,
    "Object-Oriented Programming": 75,
    SQL: 75,
    "Spring Boot": 70,
    "REST API": 70,
    "Git & GitHub": 60,
    Docker: 60,
    "Testing & Debugging": 65,
    "Backend Project": 70,
  },
  "Full Stack Developer": {
    "Web Foundations": 60,
    "HTML & CSS": 80,
    JavaScript: 80,
    React: 75,
    "Node.js": 65,
    SQL: 70,
    "REST API": 65,
    "Git & GitHub": 60,
    "Full Stack Project": 70,
  },
  "Frontend Developer": {
    "Web Foundations": 60,
    "HTML & CSS": 85,
    JavaScript: 80,
    React: 75,
    "Responsive Design": 70,
    Accessibility: 60,
    "Git & GitHub": 60,
    "Frontend Portfolio Project": 70,
  },
  "Python Developer": {
    "Programming Foundations": 60,
    Python: 80,
    "Object-Oriented Programming": 70,
    SQL: 70,
    "REST API": 65,
    "Git & GitHub": 60,
    "Testing & Debugging": 65,
    "Backend Project": 70,
  },
  "AI/ML Engineer": {
    "Programming & Math Foundations": 65,
    Python: 85,
    "Data Analysis": 75,
    "Statistics": 75,
    "Machine Learning": 80,
    SQL: 65,
    "Model Evaluation": 70,
    "Git & GitHub": 60,
    "ML Project": 75,
  },
  "Data Analyst": {
    "Data & Statistics Foundations": 65,
    SQL: 80,
    Python: 70,
    "Data Analysis": 85,
    "Data Visualization": 75,
    "Excel & Spreadsheets": 70,
    "Git & GitHub": 50,
    "Analytics Project": 70,
  },
  "Cloud Engineer": {
    "Cloud & Networking Foundations": 65,
    Linux: 70,
    AWS: 80,
    Docker: 75,
    "Git & GitHub": 65,
    "Cloud Security & IAM": 70,
    "CI/CD": 70,
    "Monitoring & Logging": 65,
    "Cloud Deployment Project": 70,
  },
  "Cybersecurity Analyst": {
    "Cybersecurity Foundations": 60,
    "Networking Fundamentals": 70,
    Linux: 75,
    "Python & Scripting": 65,
    "Security Tools": 70,
    "Threat Detection & SIEM": 75,
    "Web & Application Security": 70,
    "Incident Response & Forensics": 70,
    "Security Operations Project": 70,
  },
};

export function careerRequirementsPlugin() {
  return {
    name: "skillproof-expanded-career-requirements",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith("/src/App.jsx")) return null;
      const replacement = `const careerRequirements = ${JSON.stringify(expandedRequirements)};`;
      const next = code.replace(/const careerRequirements = \{[\\s\\S]*?\n\};/, replacement);
      if (next === code) return null;
      const result = await transformWithOxc(next, id, { lang: "jsx", jsx: { runtime: "automatic" } });
      return { code: result.code, map: result.map || null };
    },
  };
}
