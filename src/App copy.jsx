import { useState } from "react";
import {
  Award,
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  User,
  XCircle,
  Zap,
} from "lucide-react";

const colleges = [
  "Anna University",
  "IIT Madras",
  "IIT Delhi",
  "IIT Bombay",
  "IIT Kanpur",
  "IIT Kharagpur",
  "NIT Trichy",
  "NIT Warangal",
  "NIT Surathkal",
  "VIT University",
  "SRM Institute of Science and Technology",
  "Amrita Vishwa Vidyapeetham",
  "PSG College of Technology",
  "SASTRA Deemed University",
  "SSN College of Engineering",
];

const careers = [
  "Java Backend Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Python Developer",
  "AI/ML Engineer",
  "Data Analyst",
  "Cloud Engineer",
  "Cybersecurity Analyst",
];

const skillList = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "SQL",
  "HTML & CSS",
  "Spring Boot",
  "Node.js",
  "REST API",
  "Git & GitHub",
  "Docker",
  "AWS",
  "Machine Learning",
  "Data Analysis",
  "Linux",
];

const careerRequirements = {
  "Java Backend Developer": {
    Java: 80,
    SQL: 75,
    "Spring Boot": 70,
    "REST API": 70,
    "Git & GitHub": 60,
    Docker: 60,
  },

  "Full Stack Developer": {
    JavaScript: 80,
    React: 75,
    "HTML & CSS": 80,
    SQL: 70,
    "Node.js": 65,
    "Git & GitHub": 60,
  },

  "Frontend Developer": {
    JavaScript: 80,
    React: 75,
    "HTML & CSS": 85,
    "Git & GitHub": 60,
  },

  "Python Developer": {
    Python: 80,
    SQL: 70,
    "REST API": 65,
    "Git & GitHub": 60,
  },

  "AI/ML Engineer": {
    Python: 85,
    "Machine Learning": 80,
    "Data Analysis": 75,
    SQL: 65,
    "Git & GitHub": 60,
  },

  "Data Analyst": {
    Python: 70,
    SQL: 80,
    "Data Analysis": 85,
    "Git & GitHub": 50,
  },

  "Cloud Engineer": {
    AWS: 80,
    Docker: 75,
    "Git & GitHub": 65,
    Linux: 70,
  },

  "Cybersecurity Analyst": {
    Python: 65,
    SQL: 60,
    Linux: 75,
    "Git & GitHub": 55,
  },
};

const javaQuestions = [
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "instance"],
    answer: "extends",
  },
  {
    question: "Which collection does not allow duplicate elements?",
    options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
    answer: "HashSet",
  },
  {
    question: "Which method is the entry point of a Java application?",
    options: ["start()", "run()", "main()", "execute()"],
    answer: "main()",
  },
  {
    question:
      "Which concept allows the same method name with different parameters?",
    options: [
      "Inheritance",
      "Overloading",
      "Encapsulation",
      "Abstraction",
    ],
    answer: "Overloading",
  },
  {
    question: "Which keyword prevents a variable from being reassigned?",
    options: ["static", "private", "final", "constant"],
    answer: "final",
  },
];

const defaultQuestions = (skill) => [
  {
    question: `Which approach best demonstrates practical ${skill} knowledge?`,
    options: [
      "Only watching tutorials",
      "Building and testing a project",
      "Memorizing definitions",
      "Reading documentation only",
    ],
    answer: "Building and testing a project",
  },
  {
    question: `Why is testing important when using ${skill}?`,
    options: [
      "It makes code longer",
      "It validates expected behavior",
      "It removes documentation",
      "It avoids using tools",
    ],
    answer: "It validates expected behavior",
  },
  {
    question: `Which is strongest evidence of ${skill} ability?`,
    options: [
      "A project they built",
      "A random social media post",
      "A copied tutorial",
      "A blank certificate",
    ],
    answer: "A project they built",
  },
  {
    question: "What should a developer do when facing an unfamiliar problem?",
    options: [
      "Ignore it",
      "Research, test and iterate",
      "Copy without understanding",
      "Stop development",
    ],
    answer: "Research, test and iterate",
  },
  {
    question: "Which best represents skill mastery?",
    options: [
      "Knowing terminology",
      "Being able to apply the skill",
      "Having many bookmarks",
      "Watching many videos",
    ],
    answer: "Being able to apply the skill",
  },
];

const emptyStudent = {
  name: "",
  email: "",
  password: "",
  college: "",
  department: "",
  graduationYear: "",
  careers: [],
  skills: [],
};

function App() {
  const [screen, setScreen] = useState("landing");
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("skillproof_student");

    try {
      return saved ? JSON.parse(saved) : emptyStudent;
    } catch {
      return emptyStudent;
    }
  });

  const saveStudent = (next) => {
    setStudent(next);
    localStorage.setItem("skillproof_student", JSON.stringify(next));
  };

  const updateStudent = (field, value) => {
    setStudent((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem("skillproof_student");

    if (!saved) {
      alert("No SkillProof profile found. Please create an account first.");
      return;
    }

    setStudent(JSON.parse(saved));
    setScreen("app");
    setActivePage("dashboard");
  };

  const register = (e) => {
    e.preventDefault();

    const normalized = {
      ...student,
      careers: student.careers || [],
      skills: student.skills || [],
    };

    saveStudent(normalized);
    setScreen("app");
    setActivePage("dashboard");
  };

  if (screen === "landing") {
    return (
      <Landing
        onLogin={() => setScreen("login")}
        onRegister={() => setScreen("register")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        student={student}
        updateStudent={updateStudent}
        onLogin={login}
        onRegister={() => setScreen("register")}
      />
    );
  }

  if (screen === "register") {
    return (
      <Register
        student={student}
        updateStudent={updateStudent}
        onRegister={register}
        onLogin={() => setScreen("login")}
      />
    );
  }

  return (
    <AppShell
      student={student}
      activePage={activePage}
      setActivePage={(page) => {
        setActivePage(page);
        setMobileOpen(false);
      }}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      logout={() => setScreen("landing")}
    >
      {activePage === "dashboard" && (
        <Dashboard student={student} setActivePage={setActivePage} />
      )}

      {activePage === "skills" && (
        <MySkills
          student={student}
          saveStudent={saveStudent}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "verify" && (
        <Verification
          student={student}
          saveStudent={saveStudent}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "careers" && <CareersPage student={student} />}

      {activePage === "gaps" && <SkillGapPage student={student} />}

      {activePage === "roadmap" && <RoadmapPage student={student} />}

      {activePage === "opportunities" && (
        <OpportunitiesPage student={student} />
      )}

      {activePage === "profile" && (
        <ProfilePage student={student} saveStudent={saveStudent} />
      )}

      {activePage === "settings" && <SettingsPage />}
    </AppShell>
  );
}

/* =========================================================
   LANDING
========================================================= */

function Landing({ onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo dark />

        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Sign in
          </button>

          <button
            onClick={onRegister}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
          >
            Get started
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <section className="grid lg:grid-cols-2 gap-14 items-center pt-16 pb-20">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-xs font-semibold">
              <ShieldCheck size={14} />
              Evidence-based career readiness
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mt-6">
              Prove your skills.
              <span className="block text-teal-600">
                Build your future.
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-8 max-w-xl mt-6">
              SkillProof connects verified student skills with career
              requirements, skill gaps, learning roadmaps and opportunities.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={onRegister}
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center gap-2 hover:bg-slate-800"
              >
                Create profile
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onLogin}
                className="px-6 py-3.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Student dashboard
                </p>

                <h3 className="font-bold text-lg mt-1">
                  Career readiness
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Target className="text-teal-600" size={19} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <MiniMetric value="8" label="Skills" />
              <MiniMetric value="4" label="Verified" />
              <MiniMetric value="76%" label="Ready" />
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">
                  Java Backend Developer
                </span>

                <span className="text-teal-700 font-bold">76%</span>
              </div>

              <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                <div className="h-full w-[76%] bg-teal-500 rounded-full" />
              </div>

              <p className="text-xs text-slate-500 mt-3">
                Top gap: Spring Boot · 20 points
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <FeaturePreview
                icon={ShieldCheck}
                title="Verified skills"
              />

              <FeaturePreview
                icon={Sparkles}
                title="Smart roadmap"
              />
            </div>
          </div>
        </section>

        <section className="py-14 border-t border-slate-200">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              [
                "01",
                "Build profile",
                "Add academics, skills and career goals.",
              ],
              [
                "02",
                "Verify skills",
                "Take assessments and submit evidence.",
              ],
              [
                "03",
                "Find gaps",
                "Compare your profile with target roles.",
              ],
              [
                "04",
                "Take action",
                "Follow a roadmap and find opportunities.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <span className="text-xs font-bold text-teal-600">
                  {number}
                </span>

                <h3 className="font-bold mt-3">{title}</h3>

                <p className="text-sm text-slate-500 leading-6 mt-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   AUTH
========================================================= */

function Login({
  student,
  updateStudent,
  onLogin,
  onRegister,
}) {
  return (
    <Auth
      title="Welcome back"
      subtitle="Continue building your verified career profile."
    >
      <form onSubmit={onLogin} className="space-y-5">
        <Field
          label="Email"
          value={student.email}
          onChange={(value) => updateStudent("email", value)}
          placeholder="you@example.com"
          type="email"
        />

        <Field
          label="Password"
          value={student.password}
          onChange={(value) => updateStudent("password", value)}
          placeholder="Enter your password"
          type="password"
        />

        <button className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800">
          Sign in
          <ArrowRight size={17} />
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{" "}
        <button
          onClick={onRegister}
          className="text-teal-700 font-semibold"
        >
          Create one
        </button>
      </p>
    </Auth>
  );
}

function Register({
  student,
  updateStudent,
  onRegister,
  onLogin,
}) {
  const [collegeSearch, setCollegeSearch] = useState(
    student.college || ""
  );

  const [showColleges, setShowColleges] = useState(false);

  const filtered = colleges
    .filter((college) =>
      college.toLowerCase().includes(collegeSearch.toLowerCase())
    )
    .slice(0, 6);

  const toggleCareer = (career) => {
    const current = student.careers || [];

    if (current.includes(career)) {
      updateStudent(
        "careers",
        current.filter((item) => item !== career)
      );
    } else if (current.length < 3) {
      updateStudent("careers", [...current, career]);
    }
  };

  const valid =
    student.name &&
    student.email &&
    student.password &&
    student.college &&
    student.department &&
    student.graduationYear &&
    student.careers?.length;

  return (
    <Auth
      wide
      title="Create your profile"
      subtitle="Tell SkillProof where you are today and where you want to go."
    >
      <form onSubmit={onRegister}>
        <SectionTitle title="Personal information" number="01" />

        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Full name"
            value={student.name}
            onChange={(value) => updateStudent("name", value)}
            placeholder="Your name"
          />

          <Field
            label="Email"
            value={student.email}
            onChange={(value) => updateStudent("email", value)}
            placeholder="you@example.com"
            type="email"
          />

          <Field
            label="Password"
            value={student.password}
            onChange={(value) =>
              updateStudent("password", value)
            }
            placeholder="Create a password"
            type="password"
          />
        </div>

        <SectionTitle title="Education" number="02" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-sm font-semibold text-slate-700">
              College / Institution
            </label>

            <div className="relative mt-2">
              <Search
                size={17}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <input
                required
                value={collegeSearch}
                onFocus={() => setShowColleges(true)}
                onChange={(e) => {
                  setCollegeSearch(e.target.value);
                  updateStudent("college", e.target.value);
                }}
                placeholder="Type at least 2 letters..."
                className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-11 pr-10 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50 text-slate-900"
              />

              <ChevronDown
                size={16}
                className="absolute right-4 top-3.5 text-slate-400"
              />
            </div>

            {showColleges &&
              collegeSearch.length >= 2 &&
              filtered.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-2 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xl">
                  {filtered.map((college) => (
                    <button
                      type="button"
                      key={college}
                      onClick={() => {
                        updateStudent("college", college);
                        setCollegeSearch(college);
                        setShowColleges(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 text-slate-700"
                    >
                      {college}
                    </button>
                  ))}
                </div>
              )}
          </div>

          <Field
            label="Department"
            value={student.department}
            onChange={(value) =>
              updateStudent("department", value)
            }
            placeholder="CSE / IT / ECE"
          />

          <Field
            label="Graduation year"
            value={student.graduationYear}
            onChange={(value) =>
              updateStudent("graduationYear", value)
            }
            placeholder="2027"
            type="number"
          />
        </div>

        <SectionTitle title="Target careers" number="03" />

        <div className="flex justify-between text-sm text-slate-500">
          <span>Select up to 3 roles.</span>

          <span className="font-semibold text-teal-700">
            {student.careers?.length || 0}/3
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {careers.map((career) => {
            const selected = student.careers?.includes(career);

            const disabled =
              !selected && student.careers?.length >= 3;

            return (
              <button
                type="button"
                key={career}
                disabled={disabled}
                onClick={() => toggleCareer(career)}
                className={`text-left p-4 rounded-xl border transition ${
                  selected
                    ? "border-teal-500 bg-teal-50 text-teal-800"
                    : disabled
                    ? "border-slate-100 text-slate-300"
                    : "border-slate-200 hover:border-teal-300 text-slate-700"
                }`}
              >
                <div className="flex justify-between gap-2 text-sm font-medium">
                  <span>{career}</span>

                  {selected && (
                    <CheckCircle2
                      size={17}
                      className="text-teal-600 shrink-0"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          disabled={!valid}
          className="w-full h-12 mt-8 rounded-xl bg-slate-900 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2"
        >
          Create SkillProof profile
          <ArrowRight size={17} />
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          className="text-teal-700 font-semibold"
        >
          Sign in
        </button>
      </p>
    </Auth>
  );
}

function Auth({
  children,
  title,
  subtitle,
  wide = false,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-10">
      <div className={`w-full ${wide ? "max-w-4xl" : "max-w-md"}`}>
        <div className="flex justify-center mb-7">
          <Logo dark />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-9 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold">
            {title}
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          SkillProof · Evidence-based placement readiness
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   APP SHELL
========================================================= */

function AppShell({
  children,
  student,
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
  logout,
}) {
  const groups = [
    {
      title: "OVERVIEW",
      items: [
        ["dashboard", "Dashboard", LayoutDashboard],
      ],
    },

    {
      title: "CAREER",
      items: [
        ["careers", "Careers", Target],
        ["gaps", "Skill Gap", BarChart3],
        ["roadmap", "Roadmap", Sparkles],
      ],
    },

    {
      title: "SKILLS",
      items: [
        ["skills", "My Skills", BookOpen],
        ["verify", "Verify Skills", ShieldCheck],
      ],
    },

    {
      title: "OPPORTUNITIES",
      items: [
        [
          "opportunities",
          "Internships & Jobs",
          BriefcaseBusiness,
        ],
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-slate-200 transition-transform duration-200 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-5 h-20 flex items-center border-b border-slate-100">
            <Logo dark />
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {groups.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400 mb-2">
                  {group.title}
                </p>

                {group.items.map(
                  ([id, label, Icon]) => (
                    <NavItem
                      key={id}
                      active={activePage === id}
                      onClick={() => setActivePage(id)}
                      icon={Icon}
                      label={label}
                    />
                  )
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-slate-100">
              <NavItem
                active={activePage === "profile"}
                onClick={() => setActivePage("profile")}
                icon={User}
                label="My Profile"
              />

              <NavItem
                active={activePage === "settings"}
                onClick={() => setActivePage("settings")}
                icon={Settings}
                label="Settings"
              />
            </div>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                {student.name?.charAt(0)?.toUpperCase() ||
                  "S"}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {student.name || "Student"}
                </p>

                <p className="text-xs text-slate-400 truncate">
                  {student.email || "student"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full h-10 rounded-lg text-sm text-slate-500 hover:bg-slate-50 flex items-center gap-2 px-2"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden"
        />
      )}

      <div className="lg:ml-64 min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="h-full px-5 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center"
              >
                <Menu size={19} />
              </button>

              <div>
                <p className="text-xs text-slate-400">
                  SkillProof workspace
                </p>

                <p className="font-semibold text-sm mt-0.5">
                  {pageTitle(activePage)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage("profile")}
              className="flex items-center gap-3"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold">
                  {student.name || "Student"}
                </p>

                <p className="text-xs text-slate-400">
                  {student.department || "Profile"}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <User size={18} className="text-slate-500" />
              </div>
            </button>
          </div>
        </header>

        <main className="p-5 md:p-8 max-w-[1500px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  student,
  setActivePage,
}) {
  const skills = student.skills || [];

  const verified = skills.filter(
    (skill) => skill.verified
  ).length;

  const analyses = (student.careers || []).map(
    (career) => ({
      career,
      ...careerAnalysis(student, career),
    })
  );

  const best = analyses[0]?.readiness || 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="OVERVIEW"
        title={`Good to see you, ${
          student.name || "Student"
        }.`}
        subtitle="Track your skills, readiness and next steps from one place."
        action="Verify a skill"
        onAction={() => setActivePage("verify")}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          icon={BookOpen}
          label="Skills added"
          value={skills.length}
        />

        <MetricCard
          icon={ShieldCheck}
          label="Verified skills"
          value={verified}
        />

        <MetricCard
          icon={Target}
          label="Target careers"
          value={student.careers?.length || 0}
        />

        <MetricCard
          icon={Zap}
          label="Top readiness"
          value={`${best}%`}
        />
      </div>

      <div className="grid xl:grid-cols-[1.6fr_1fr] gap-6">
        <Panel
          title="Target careers"
          subtitle="How closely your verified profile matches each role."
          action="View careers"
          onAction={() => setActivePage("careers")}
        >
          <div className="space-y-4">
            {analyses.length ? (
              analyses.map(
                ({ career, readiness }) => (
                  <div
                    key={career}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-sm">
                          {career}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {statusText(readiness)}
                        </p>
                      </div>

                      <span className="font-bold text-teal-700">
                        {readiness}%
                      </span>
                    </div>

                    <Progress value={readiness} />
                  </div>
                )
              )
            ) : (
              <EmptyState
                title="Choose your target careers"
                text="Add career goals to start measuring readiness."
                button="Edit profile"
                onClick={() => setActivePage("profile")}
              />
            )}
          </div>
        </Panel>

        <Panel
          title="Your next best action"
          subtitle="A simple step to improve your profile."
        >
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Sparkles
                size={19}
                className="text-teal-600"
              />
            </div>

            <h3 className="font-bold mt-4">
              {verified === 0
                ? "Verify your first skill"
                : "Close your biggest skill gap"}
            </h3>

            <p className="text-sm text-slate-600 leading-6 mt-2">
              {verified === 0
                ? "Assessment + practical evidence makes your Skill Passport more credible."
                : "Use the roadmap to turn your weakest required skill into a measurable improvement."}
            </p>

            <button
              onClick={() =>
                setActivePage(
                  verified === 0 ? "verify" : "roadmap"
                )
              }
              className="mt-4 text-sm font-bold text-teal-700 flex items-center gap-1"
            >
              Continue
              <ArrowRight size={15} />
            </button>
          </div>
        </Panel>
      </div>

      <Panel
        title="Recent verification activity"
        subtitle="Your verified skills appear here automatically."
      >
        {skills.filter((skill) => skill.verified).length ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {skills
              .filter((skill) => skill.verified)
              .slice(0, 6)
              .map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                    <CheckCircle2
                      size={17}
                      className="text-teal-600"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {skill.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      Verified at{" "}
                      {skill.verificationScore}%
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No verified skills yet. Start with your strongest
            skill.
          </p>
        )}
      </Panel>
    </div>
  );
}

/* =========================================================
   MY SKILLS
========================================================= */

function MySkills({
  student,
  saveStudent,
  setActivePage,
}) {
  const [selected, setSelected] = useState("");

  const skills = student.skills || [];

  const available = skillList.filter(
    (skill) =>
      !skills.some(
        (existingSkill) => existingSkill.name === skill
      )
  );

  const add = () => {
    if (!selected) return;

    saveStudent({
      ...student,
      skills: [
        ...skills,
        {
          name: selected,
          level: 50,
          verified: false,
        },
      ],
    });

    setSelected("");
  };

  const remove = (name) => {
    saveStudent({
      ...student,
      skills: skills.filter(
        (skill) => skill.name !== name
      ),
    });
  };

  const level = (name, value) => {
    saveStudent({
      ...student,
      skills: skills.map((skill) =>
        skill.name === name
          ? {
              ...skill,
              level: Number(value),
            }
          : skill
      ),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="SKILLS"
        title="My Skills"
        subtitle="Manage the skills you want SkillProof to evaluate."
        action="Verify a skill"
        onAction={() => setActivePage("verify")}
      />

      <Panel
        title="Add a skill"
        subtitle="Start with skills you can genuinely demonstrate."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-teal-500"
          >
            <option value="">Select a skill...</option>

            {available.map((skill) => (
              <option key={skill}>{skill}</option>
            ))}
          </select>

          <button
            onClick={add}
            disabled={!selected}
            className="h-12 px-5 rounded-xl bg-slate-900 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2"
          >
            <Plus size={17} />
            Add skill
          </button>
        </div>
      </Panel>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            remove={() => remove(skill.name)}
            level={(value) => level(skill.name, value)}
            verify={() => setActivePage("verify")}
          />
        ))}
      </div>

      {!skills.length && (
        <EmptyState
          title="Your Skill Passport is empty"
          text="Add your first technical skill above."
        />
      )}
    </div>
  );
}

function SkillCard({
  skill,
  remove,
  level,
  verify,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{skill.name}</h3>

            {skill.verified && (
              <Badge>✓ Verified</Badge>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-1">
            {skill.verified
              ? `Verification score ${skill.verificationScore}%`
              : "Self declared"}
          </p>
        </div>

        <button
          onClick={remove}
          className="text-slate-300 hover:text-red-500"
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="mt-5 flex justify-between text-xs">
        <span className="text-slate-500">
          {skill.verified
            ? "Verification score"
            : "Current level"}
        </span>

        <b>{skill.level}%</b>
      </div>

      <Progress value={skill.level} />

      {!skill.verified && (
        <input
          type="range"
          min="0"
          max="100"
          value={skill.level}
          onChange={(e) => level(e.target.value)}
          className="w-full mt-3 accent-teal-600"
        />
      )}

      {!skill.verified && (
        <button
          onClick={verify}
          className="w-full mt-4 h-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-700 flex items-center justify-center gap-2"
        >
          <ShieldCheck size={16} />
          Verify {skill.name}
        </button>
      )}
    </div>
  );
}

/* =========================================================
   VERIFICATION
========================================================= */

function Verification({
  student,
  saveStudent,
  setActivePage,
}) {
  const skills = student.skills || [];

  const [skill, setSkill] = useState(
    skills[0]?.name || ""
  );

  const [stage, setStage] = useState(1);

  const [qNo, setQNo] = useState(1);

  const [answers, setAnswers] = useState({});

  const [practical, setPractical] = useState("");

  const [project, setProject] = useState({
    name: "",
    link: "",
    description: "",
  });

  const [result, setResult] = useState(null);

  const questions =
    skill === "Java"
      ? javaQuestions
      : defaultQuestions(skill);

  const current = questions[qNo - 1];

  const submit = () => {
    let correct = 0;

    questions.forEach((question, index) => {
      if (answers[index + 1] === question.answer) {
        correct++;
      }
    });

    const assessmentScore = Math.round(
      (correct / questions.length) * 100
    );

    const practicalScore =
      practical.trim().length >= 100
        ? 90
        : practical.trim().length >= 30
        ? 75
        : 50;

    const evidenceScore =
      project.name.trim() &&
      project.description.trim()
        ? project.link.trim()
          ? 95
          : 85
        : 50;

    const verificationScore = Math.round(
      assessmentScore * 0.6 +
        practicalScore * 0.25 +
        evidenceScore * 0.15
    );

    const passed = verificationScore >= 70;

    saveStudent({
      ...student,
      skills: skills.map((item) =>
        item.name === skill
          ? {
              ...item,
              level: verificationScore,
              verified: passed,
              verificationScore,
              assessmentScore,
              practicalScore,
              evidenceScore,
              projectName: project.name,
              projectLink: project.link,
              projectDescription: project.description,
              verificationDate:
                new Date().toISOString(),
            }
          : item
      ),
    });

    setResult({
      verificationScore,
      assessmentScore,
      practicalScore,
      evidenceScore,
      passed,
    });

    setStage(5);
  };

  if (!skills.length) {
    return (
      <EmptyState
        title="Add a skill first"
        text="Go to My Skills and add the skill you want to verify."
        button="Go to My Skills"
        onClick={() => setActivePage("skills")}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        eyebrow="SKILLS · VERIFICATION"
        title="Prove your skill"
        subtitle="Knowledge → practical ability → project evidence."
      />

      {stage !== 5 && (
        <VerificationSteps stage={stage} />
      )}

      {stage === 1 && (
        <Panel
          title="Choose a skill"
          subtitle="Select one skill for this verification attempt."
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {skills.map((item) => (
              <button
                key={item.name}
                onClick={() => setSkill(item.name)}
                className={`p-4 rounded-xl border text-left ${
                  skill === item.name
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-teal-300"
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {item.name}
                  </span>

                  {skill === item.name && (
                    <CheckCircle2
                      className="text-teal-600"
                      size={17}
                    />
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Current level: {item.level}%
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setQNo(1);
              setAnswers({});
              setStage(2);
            }}
            className="w-full h-12 mt-6 rounded-xl bg-slate-900 text-white font-semibold"
          >
            Start assessment
          </button>
        </Panel>
      )}

      {stage === 2 && current && (
        <Panel
          title={`${skill} assessment`}
          subtitle={`Question ${qNo} of ${questions.length}`}
        >
          <div className="flex gap-2 mb-6">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index + 1 <= qNo
                    ? "bg-teal-500"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <h2 className="text-xl font-bold leading-8">
            {current.question}
          </h2>

          <div className="grid gap-3 mt-6">
            {current.options.map((option) => {
              const selected =
                answers[qNo] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setAnswers((currentAnswers) => ({
                      ...currentAnswers,
                      [qNo]: option,
                    }))
                  }
                  className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 ${
                    selected
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-200 hover:border-teal-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      selected
                        ? "border-teal-600"
                        : "border-slate-300"
                    }`}
                  >
                    {selected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    )}
                  </span>

                  <span className="text-sm font-medium">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-7">
            <button
              disabled={qNo === 1}
              onClick={() =>
                setQNo((number) => number - 1)
              }
              className="px-5 h-11 rounded-xl border border-slate-200 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={!answers[qNo]}
              onClick={() =>
                qNo < questions.length
                  ? setQNo((number) => number + 1)
                  : setStage(3)
              }
              className="px-5 h-11 rounded-xl bg-slate-900 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-400"
            >
              {qNo === questions.length
                ? "Continue"
                : "Next"}
            </button>
          </div>
        </Panel>
      )}

      {stage === 3 && (
        <Panel
          title="Practical challenge"
          subtitle="Explain how you would actually use this skill in a real scenario."
        >
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Scenario
            </p>

            <p className="font-semibold mt-2">
              Design a small student management solution
              using {skill}. Explain the architecture, main
              components, data flow and important technical
              decisions.
            </p>
          </div>

          <textarea
            value={practical}
            onChange={(e) =>
              setPractical(e.target.value)
            }
            placeholder="Write your approach..."
            className="w-full h-56 mt-5 rounded-xl border border-slate-200 p-4 outline-none focus:border-teal-500 resize-none"
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStage(2)}
              className="px-5 h-11 rounded-xl border border-slate-200"
            >
              Previous
            </button>

            <button
              disabled={practical.trim().length < 30}
              onClick={() => setStage(4)}
              className="px-5 h-11 rounded-xl bg-slate-900 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-400"
            >
              Continue
            </button>
          </div>
        </Panel>
      )}

      {stage === 4 && (
        <Panel
          title="Project evidence"
          subtitle="Show where you have applied this skill."
        >
          <div className="space-y-5">
            <Field
              label="Project name"
              value={project.name}
              onChange={(value) =>
                setProject({
                  ...project,
                  name: value,
                })
              }
              placeholder="Student Management System"
            />

            <Field
              label="GitHub / Project URL"
              value={project.link}
              onChange={(value) =>
                setProject({
                  ...project,
                  link: value,
                })
              }
              placeholder="https://github.com/..."
            />

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Project description
              </label>

              <textarea
                value={project.description}
                onChange={(e) =>
                  setProject({
                    ...project,
                    description: e.target.value,
                  })
                }
                placeholder="What did you build and how did you use this skill?"
                className="w-full h-40 mt-2 rounded-xl border border-slate-200 p-4 outline-none focus:border-teal-500 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStage(3)}
              className="px-5 h-11 rounded-xl border border-slate-200"
            >
              Previous
            </button>

            <button
              disabled={
                !project.name.trim() ||
                !project.description.trim()
              }
              onClick={submit}
              className="px-5 h-11 rounded-xl bg-slate-900 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-400"
            >
              Submit verification
            </button>
          </div>
        </Panel>
      )}

      {stage === 5 && result && (
        <VerificationResult
          result={result}
          skill={skill}
          onDone={() => setActivePage("skills")}
          onRetry={() => {
            setResult(null);
            setStage(1);
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   CAREERS
========================================================= */

function CareersPage({ student }) {
  const analyses = (student.careers || []).map(
    (career) => ({
      career,
      ...careerAnalysis(student, career),
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CAREER"
        title="Career readiness"
        subtitle="See how your current profile matches each target role."
      />

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {analyses.map(
          ({ career, readiness, skills }) => (
            <CareerCard
              key={career}
              career={career}
              readiness={readiness}
              skills={skills}
            />
          )
        )}
      </div>

      {!analyses.length && (
        <EmptyState
          title="No target careers yet"
          text="Add up to three career goals in your profile."
        />
      )}
    </div>
  );
}

/* =========================================================
   SKILL GAP
========================================================= */

function SkillGapPage({ student }) {
  const analyses = (student.careers || []).map(
    (career) => ({
      career,
      ...careerAnalysis(student, career),
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CAREER"
        title="Skill Gap"
        subtitle="The gap is calculated against the requirements of each target role."
      />

      {analyses.map(({ career, skills }) => {
        const gaps = skills
          .filter((skill) => skill.gap > 0)
          .sort((a, b) => b.gap - a.gap);

        return (
          <Panel
            key={career}
            title={career}
            subtitle={`${gaps.length} skill${
              gaps.length === 1 ? "" : "s"
            } need attention.`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-xl border border-slate-100"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">
                      {skill.name}
                    </span>

                    <span
                      className={
                        skill.gap
                          ? "text-rose-600 font-semibold"
                          : "text-teal-700 font-semibold"
                      }
                    >
                      {skill.gap
                        ? `-${skill.gap}% gap`
                        : "Requirement met"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mt-2">
                    You {skill.current}% · Required{" "}
                    {skill.required}%
                  </div>

                  <Progress
                    value={Math.min(
                      (skill.current /
                        skill.required) *
                        100,
                      100
                    )}
                  />
                </div>
              ))}
            </div>
          </Panel>
        );
      })}

      {!analyses.length && (
        <EmptyState
          title="Skill gap analysis needs a target career"
          text="Choose your target careers in My Profile."
        />
      )}
    </div>
  );
}

/* =========================================================
   ROADMAP
========================================================= */

function RoadmapPage({ student }) {
  const analyses = (student.careers || []).map(
    (career) => ({
      career,
      ...careerAnalysis(student, career),
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CAREER"
        title="Learning Roadmap"
        subtitle="Turn your biggest gaps into concrete learning and project actions."
      />

      {analyses.map(({ career, skills }) => {
        const gaps = skills
          .filter((skill) => skill.gap > 0)
          .sort((a, b) => b.gap - a.gap)
          .slice(0, 4);

        return (
          <Panel
            key={career}
            title={`${career} roadmap`}
            subtitle="Prioritized from your largest requirement gaps."
          >
            {gaps.length ? (
              <div className="space-y-4">
                {gaps.map((gap, index) => (
                  <div
                    key={gap.name}
                    className="flex gap-4 p-4 rounded-2xl border border-slate-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between gap-3">
                        <h3 className="font-bold">
                          {gap.name}
                        </h3>

                        <span className="text-xs font-bold text-rose-600">
                          -{gap.gap}%
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {roadmapText(gap.name)}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs">
                          Learn fundamentals
                        </span>

                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs">
                          Build a mini project
                        </span>

                        <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs">
                          Re-verify
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-teal-700 font-semibold">
                Great — no major gaps detected for this role.
              </p>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

/* =========================================================
   OPPORTUNITIES
========================================================= */

function OpportunitiesPage({ student }) {
  const verified = (student.skills || [])
    .filter((skill) => skill.verified)
    .map((skill) => skill.name);

  const opportunities = [
    [
      "Backend Development Intern",
      "TechNova Labs",
      "Remote",
      ["Java", "SQL", "REST API"],
    ],
    [
      "Full Stack Developer Intern",
      "BuildSphere",
      "Chennai",
      ["JavaScript", "React", "Node.js"],
    ],
    [
      "Cloud Engineering Intern",
      "CloudGrid",
      "Bengaluru",
      ["AWS", "Docker", "Linux"],
    ],
    [
      "Data Analytics Intern",
      "InsightWorks",
      "Remote",
      ["Python", "SQL", "Data Analysis"],
    ],
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="OPPORTUNITIES"
        title="Internships & Jobs"
        subtitle="Prototype view: opportunities are ranked against your verified skills."
      />

      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-sm text-teal-900">
        <b>
          {verified.length} verified skill
          {verified.length === 1 ? "" : "s"}
        </b>{" "}
        are being used for matching. Add more verified skills
        to improve relevance.
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {opportunities.map(
          ([role, company, location, required]) => {
            const match = Math.round(
              required.reduce(
                (sum, skill) =>
                  sum +
                  (verified.includes(skill) ? 100 : 35),
                0
              ) / required.length
            );

            return (
              <div
                key={role}
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold">{role}</p>

                    <p className="text-sm text-slate-500 mt-1">
                      {company} · {location}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg h-fit">
                    {match}% match
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {required.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg text-xs ${
                        verified.includes(skill)
                          ? "bg-teal-50 text-teal-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {verified.includes(skill) ? "✓ " : ""}
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full h-10 mt-5 rounded-xl border border-slate-200 text-sm font-semibold hover:border-teal-400 hover:text-teal-700">
                  View opportunity
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function ProfilePage({
  student,
  saveStudent,
}) {
  const [editing, setEditing] = useState(false);

  const [draft, setDraft] = useState(student);

  const save = () => {
    saveStudent(draft);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        eyebrow="PROFILE"
        title="My Profile"
        subtitle="Keep your academic and career information current."
        action={editing ? "Save changes" : "Edit profile"}
        onAction={
          editing
            ? save
            : () => setEditing(true)
        }
      />

      <Panel title="Student information">
        <div className="grid md:grid-cols-2 gap-5">
          <ProfileValue
            label="Full name"
            value={student.name}
            editing={editing}
            onChange={(value) =>
              setDraft({
                ...draft,
                name: value,
              })
            }
          />

          <ProfileValue
            label="Email"
            value={student.email}
            editing={editing}
            onChange={(value) =>
              setDraft({
                ...draft,
                email: value,
              })
            }
          />

          <ProfileValue
            label="College"
            value={student.college}
            editing={editing}
            onChange={(value) =>
              setDraft({
                ...draft,
                college: value,
              })
            }
          />

          <ProfileValue
            label="Department"
            value={student.department}
            editing={editing}
            onChange={(value) =>
              setDraft({
                ...draft,
                department: value,
              })
            }
          />

          <ProfileValue
            label="Graduation year"
            value={student.graduationYear}
            editing={editing}
            onChange={(value) =>
              setDraft({
                ...draft,
                graduationYear: value,
              })
            }
          />
        </div>
      </Panel>

      <Panel
        title="Target careers"
        subtitle="Your selected roles drive readiness and skill-gap analysis."
      >
        <div className="flex flex-wrap gap-2">
          {(student.careers || []).map((career) => (
            <span
              key={career}
              className="px-3 py-2 rounded-xl bg-teal-50 text-teal-800 text-sm font-semibold"
            >
              {career}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="SETTINGS"
        title="Settings"
        subtitle="Prototype settings for your SkillProof workspace."
      />

      <Panel title="Account preferences">
        <div className="space-y-4">
          <SettingRow
            title="Skill verification reminders"
            text="Keep verification progress visible in your dashboard."
          />

          <SettingRow
            title="Opportunity matching"
            text="Use verified skills when calculating opportunity matches."
          />
        </div>
      </Panel>
    </div>
  );
}

function SettingRow({
  title,
  text,
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
      <div>
        <p className="font-semibold text-sm">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {text}
        </p>
      </div>

      <div className="w-10 h-6 rounded-full bg-teal-500 p-1">
        <div className="w-4 h-4 bg-white rounded-full ml-auto" />
      </div>
    </div>
  );
}

/* =========================================================
   CAREER CARD
========================================================= */

function CareerCard({
  career,
  readiness,
  skills,
}) {
  const gaps = skills
    .filter((skill) => skill.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">
            TARGET CAREER
          </p>

          <h3 className="font-bold mt-1">
            {career}
          </h3>
        </div>

        <Target
          className="text-teal-600"
          size={19}
        />
      </div>

      <p className="text-4xl font-bold mt-6">
        {readiness}%
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {statusText(readiness)}
      </p>

      <Progress value={readiness} />

      <div className="mt-5 pt-5 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Top gaps
        </p>

        {gaps.length ? (
          <div className="space-y-2 mt-3">
            {gaps.map((gap) => (
              <div
                key={gap.name}
                className="flex justify-between text-sm"
              >
                <span>{gap.name}</span>

                <span className="text-rose-600 font-semibold">
                  -{gap.gap}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-teal-700 font-semibold mt-3">
            Requirements met.
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   VERIFICATION RESULT
========================================================= */

function VerificationResult({
  result,
  skill,
  onDone,
  onRetry,
}) {
  return (
    <Panel
      title="Verification complete"
      subtitle={skill}
    >
      <div className="text-center py-4">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
            result.passed
              ? "bg-teal-50"
              : "bg-rose-50"
          }`}
        >
          {result.passed ? (
            <Award
              size={40}
              className="text-teal-600"
            />
          ) : (
            <XCircle
              size={40}
              className="text-rose-500"
            />
          )}
        </div>

        <p className="text-6xl font-bold mt-5">
          {result.verificationScore}%
        </p>

        <p
          className={`font-bold mt-2 ${
            result.passed
              ? "text-teal-700"
              : "text-rose-600"
          }`}
        >
          {result.passed
            ? "VERIFIED SKILL"
            : "Verification not passed"}
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        <Score
          label="Assessment"
          value={result.assessmentScore}
        />

        <Score
          label="Practical"
          value={result.practicalScore}
        />

        <Score
          label="Evidence"
          value={result.evidenceScore}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onRetry}
          className="flex-1 h-11 rounded-xl border border-slate-200 font-semibold"
        >
          Try again
        </button>

        <button
          onClick={onDone}
          className="flex-1 h-11 rounded-xl bg-slate-900 text-white font-semibold"
        >
          View Skill Passport
        </button>
      </div>
    </Panel>
  );
}

function Score({
  label,
  value,
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 text-center">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-xl font-bold mt-1">
        {value}%
      </p>
    </div>
  );
}

function VerificationSteps({ stage }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        "Skill",
        "Assessment",
        "Practical",
        "Evidence",
      ].map((label, index) => (
        <div
          key={label}
          className="flex items-center gap-2"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              stage > index
                ? "bg-teal-500 text-white"
                : "bg-white border border-slate-200 text-slate-400"
            }`}
          >
            {stage > index + 1 ? (
              <Check size={14} />
            ) : (
              index + 1
            )}
          </div>

          <span className="hidden sm:block text-xs font-semibold text-slate-500">
            {label}
          </span>

          {index < 3 && (
            <div className="h-px bg-slate-200 flex-1" />
          )}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SHARED UI
========================================================= */

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.16em] text-teal-700">
          {eyebrow}
        </p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
          {title}
        </h1>

        <p className="text-slate-500 mt-2 max-w-2xl">
          {subtitle}
        </p>
      </div>

      {action && (
        <button
          onClick={onAction}
          className="h-11 px-5 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center gap-2 shrink-0"
        >
          {action}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  onAction,
  children,
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="font-bold">{title}</h2>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <button
            onClick={onAction}
            className="text-sm font-semibold text-teal-700"
          >
            {action}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <Icon
          size={18}
          className="text-teal-600"
        />
      </div>

      <p className="text-3xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
}

function MiniMetric({
  value,
  label,
}) {
  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
      <p className="font-bold text-lg">
        {value}
      </p>

      <p className="text-[11px] text-slate-400 mt-1">
        {label}
      </p>
    </div>
  );
}

function FeaturePreview({
  icon: Icon,
  title,
}) {
  return (
    <div className="p-3 rounded-xl border border-slate-100 flex items-center gap-2">
      <Icon
        size={16}
        className="text-teal-600"
      />

      <span className="text-xs font-semibold">
        {title}
      </span>
    </div>
  );
}

function Progress({ value }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
      <div
        className="h-full bg-teal-500 rounded-full transition-all"
        style={{
          width: `${Math.max(
            0,
            Math.min(100, value)
          )}%`,
        }}
      />
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold">
      {children}
    </span>
  );
}

function EmptyState({
  title,
  text,
  button,
  onClick,
}) {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
      <BookOpen
        className="mx-auto text-slate-300"
        size={30}
      />

      <h3 className="font-bold mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {text}
      </p>

      {button && (
        <button
          onClick={onClick}
          className="mt-5 h-10 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold"
        >
          {button}
        </button>
      )}
    </div>
  );
}

function SectionTitle({
  number,
  title,
}) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-5 pt-7 border-t border-slate-100">
      <span className="text-xs font-bold text-teal-700">
        {number}
      </span>

      <h2 className="font-bold">{title}</h2>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full h-12 mt-2 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50 text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}

function ProfileValue({
  label,
  value,
  editing,
  onChange,
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      {editing ? (
        <input
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full h-11 mt-2 border border-slate-200 rounded-xl px-3 outline-none focus:border-teal-500"
        />
      ) : (
        <p className="font-semibold mt-2">
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}

function NavItem({
  active,
  onClick,
  icon: Icon,
  label,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-10 rounded-xl px-3 flex items-center gap-3 text-sm font-medium mb-1 ${
        active
          ? "bg-teal-50 text-teal-800"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
        <ShieldCheck
          size={20}
          className="text-teal-600"
        />
      </div>

      <span
        className={`font-bold text-lg ${
          dark
            ? "text-slate-900"
            : "text-white"
        }`}
      >
        Skill<span className="text-teal-600">Proof</span>
      </span>
    </div>
  );
}

/* =========================================================
   LOGIC
========================================================= */

function pageTitle(page) {
  return {
    dashboard: "Dashboard",
    skills: "My Skills",
    verify: "Verify Skills",
    careers: "Careers",
    gaps: "Skill Gap",
    roadmap: "Learning Roadmap",
    opportunities: "Opportunities",
    profile: "My Profile",
    settings: "Settings",
  }[page] || "Dashboard";
}

function careerAnalysis(
  student,
  career
) {
  const requirements =
    careerRequirements[career] || {};

  const skills = Object.entries(
    requirements
  ).map(([name, required]) => {
    const currentSkill = (
      student.skills || []
    ).find(
      (skill) => skill.name === name
    );

    const current = Number(
      currentSkill?.level || 0
    );

    return {
      name,
      required,
      current,
      gap: Math.max(
        required - current,
        0
      ),
      verified:
        !!currentSkill?.verified,
    };
  });

  const readiness = skills.length
    ? Math.round(
        skills.reduce(
          (sum, skill) =>
            sum +
            Math.min(
              skill.current /
                skill.required,
              1
            ) *
              100,
          0
        ) / skills.length
      )
    : 0;

  return {
    readiness,
    skills,
  };
}

function statusText(readiness) {
  if (readiness >= 80) {
    return "Strong match";
  }

  if (readiness >= 60) {
    return "Needs improvement";
  }

  return "Skill gaps detected";
}

function roadmapText(skill) {
  const map = {
    Java: "Strengthen OOP, collections, exception handling and build a backend feature using Java.",

    "Spring Boot":
      "Learn dependency injection, REST controllers, services and persistence through a small API.",

    SQL: "Practice joins, indexing, aggregation and database design using a realistic dataset.",

    React: "Build reusable components, state management and API integration in a small frontend.",

    JavaScript:
      "Practice modern ES6+, async programming, DOM concepts and API consumption.",

    Docker:
      "Containerize a working project and understand images, containers, volumes and networking.",

    AWS: "Deploy a small application and learn the basics of compute, storage and IAM.",
  };

  return (
    map[skill] ||
    `Learn ${skill} fundamentals, apply them in a mini project and then re-verify the skill.`
  );
}

export default App; 