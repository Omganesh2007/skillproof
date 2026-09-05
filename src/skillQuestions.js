const q = (question, options, answer) => ({ question, options, answer });

export const skillQuestions = {
  Java: [
    q("Which keyword is used to inherit a class in Java?", ["implements", "extends", "inherits", "instance"], "extends"),
    q("Which collection does not allow duplicate elements?", ["ArrayList", "LinkedList", "HashSet", "Vector"], "HashSet"),
    q("Which method is the entry point of a Java application?", ["start()", "run()", "main()", "execute()"], "main()"),
    q("Which concept allows the same method name with different parameters?", ["Inheritance", "Overloading", "Encapsulation", "Abstraction"], "Overloading"),
    q("Which keyword prevents a variable from being reassigned?", ["static", "private", "final", "constant"], "final")
  ],
  Python: [
    q("Which Python data type stores key-value pairs?", ["list", "tuple", "dict", "set"], "dict"),
    q("Which keyword defines a function in Python?", ["func", "define", "def", "function"], "def"),
    q("What does len([10, 20, 30]) return?", ["2", "3", "30", "Error"], "3"),
    q("Which symbol starts a comment in Python?", ["//", "#", "/*", "--"], "#"),
    q("Which construct is commonly used to handle exceptions in Python?", ["try/except", "if/error", "catch/throw", "handle/rescue"], "try/except")
  ],
  JavaScript: [
    q("Which keyword declares a block-scoped variable that can be reassigned?", ["var", "let", "const", "define"], "let"),
    q("What does === check in JavaScript?", ["Only value", "Only type", "Value and type", "Object identity only"], "Value and type"),
    q("Which method converts a JSON string into a JavaScript object?", ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.decode()"], "JSON.parse()"),
    q("Which array method creates a new array by transforming each element?", ["filter()", "map()", "reduce()", "find()"], "map()"),
    q("What is Promise used for?", ["Styling pages", "Handling asynchronous results", "Declaring classes", "Creating CSS variables"], "Handling asynchronous results")
  ],
  React: [
    q("Which hook is used to manage local state in a React function component?", ["useRoute", "useState", "useStyle", "useClass"], "useState"),
    q("What is JSX?", ["A database", "A syntax extension for JavaScript", "A CSS framework", "A backend server"], "A syntax extension for JavaScript"),
    q("Which hook is commonly used for side effects such as data fetching?", ["useEffect", "useFetchOnly", "useAction", "useSide"], "useEffect"),
    q("Why should React list items have a key prop?", ["For CSS", "To help React identify changed items", "To encrypt data", "To create routes"], "To help React identify changed items"),
    q("Props in React are primarily used to:", ["Pass data to components", "Store database tables", "Compile CSS", "Create server ports"], "Pass data to components")
  ],
  SQL: [
    q("Which SQL statement retrieves rows from a table?", ["GET", "SELECT", "FETCHROW", "READ"], "SELECT"),
    q("Which clause filters rows based on a condition?", ["ORDER BY", "GROUP BY", "WHERE", "SORT"], "WHERE"),
    q("Which JOIN returns matching rows from both tables?", ["INNER JOIN", "OUTER ONLY", "CROSS ONLY", "MATCH JOIN"], "INNER JOIN"),
    q("Which command adds a new row to a table?", ["ADD", "INSERT", "CREATE ROW", "APPEND SQL"], "INSERT"),
    q("What is a primary key used for?", ["Styling data", "Uniquely identifying rows", "Encrypting passwords", "Sorting every column"], "Uniquely identifying rows")
  ],
  "HTML & CSS": [
    q("Which HTML element is most appropriate for the main heading?", ["<h1>", "<head>", "<title>", "<header1>"], "<h1>"),
    q("Which CSS property controls the space inside an element's border?", ["margin", "padding", "gap", "spacing"], "padding"),
    q("Which CSS layout system is designed for one-dimensional rows or columns?", ["Flexbox", "FloatBox", "PositionGrid", "InlineTable"], "Flexbox"),
    q("Which attribute provides alternative text for an image?", ["title", "alt", "srcText", "description"], "alt"),
    q("Which CSS unit is relative to the root element's font size?", ["px", "rem", "vh", "%"], "rem")
  ],
  "Spring Boot": [
    q("Which annotation marks a Spring Boot application entry class?", ["@SpringApplication", "@SpringBootApplication", "@BootApp", "@StartSpring"], "@SpringBootApplication"),
    q("Which annotation is commonly used to create a REST controller?", ["@RestController", "@ApiPage", "@WebEndpointOnly", "@HttpController"], "@RestController"),
    q("Which file commonly stores Spring Boot application configuration?", ["application.properties", "spring.config.exe", "boot.json", "server.java"], "application.properties"),
    q("What does dependency injection provide?", ["Automatic object dependency wiring", "Database encryption", "CSS rendering", "HTTP compression only"], "Automatic object dependency wiring"),
    q("Which annotation maps a method to an HTTP GET request?", ["@GetMapping", "@ReadMapping", "@HttpGetOnly", "@FetchMapping"], "@GetMapping")
  ],
  "Node.js": [
    q("What is Node.js primarily used for?", ["Running JavaScript outside the browser", "Styling HTML", "Managing CSS", "Designing databases only"], "Running JavaScript outside the browser"),
    q("Which built-in Node.js module handles file system operations?", ["fs", "file", "storage", "diskjs"], "fs"),
    q("Which command initializes a Node.js project?", ["npm init", "node start-project", "npm create-node-only", "node init-app"], "npm init"),
    q("Which object is commonly used to create an HTTP server in Node.js?", ["http", "serverOnly", "web", "requestServer"], "http"),
    q("What package manager is bundled with Node.js?", ["npm", "pip", "maven", "gradle"], "npm")
  ],
  "REST API": [
    q("Which HTTP method is normally used to retrieve a resource?", ["POST", "GET", "PATCH", "DELETE"], "GET"),
    q("Which status code means a resource was successfully created?", ["200", "201", "204", "302"], "201"),
    q("Which HTTP method is commonly used to partially update a resource?", ["PATCH", "FETCH", "CHANGE", "MODIFY"], "PATCH"),
    q("What does a REST API typically expose?", ["Resources through HTTP endpoints", "Only database files", "CSS classes", "Compiler instructions"], "Resources through HTTP endpoints"),
    q("Which header commonly carries a bearer access token?", ["Authorization", "Credential", "Access-Key", "Session"], "Authorization")
  ],
  "Git & GitHub": [
    q("Which command creates a new Git repository?", ["git init", "git start", "git create", "git new"], "git init"),
    q("Which command records staged changes in Git history?", ["git save", "git commit", "git record", "git push"], "git commit"),
    q("Which command downloads commits from a remote without merging them?", ["git fetch", "git download", "git pull-only", "git sync"], "git fetch"),
    q("What is a Git branch used for?", ["Parallel lines of development", "Database backups only", "CSS themes", "Password storage"], "Parallel lines of development"),
    q("What does a GitHub pull request primarily do?", ["Proposes changes for review and merging", "Deletes a repository", "Encrypts commits", "Creates a database"], "Proposes changes for review and merging")
  ],
  Docker: [
    q("What is a Docker image?", ["A template used to create containers", "A running database only", "A Git branch", "A browser plugin"], "A template used to create containers"),
    q("Which file commonly defines how to build a Docker image?", ["Dockerfile", "Containerfile.js", "docker.json", "image.config"], "Dockerfile"),
    q("Which command lists running Docker containers?", ["docker ps", "docker list-running", "docker containers", "docker active"], "docker ps"),
    q("What is a container?", ["An isolated runtime instance of an image", "A source code editor", "A Git commit", "A cloud account"], "An isolated runtime instance of an image"),
    q("Why are containers useful in deployment?", ["They package applications with their runtime dependencies", "They replace source code", "They eliminate all testing", "They create user accounts"], "They package applications with their runtime dependencies")
  ],
  AWS: [
    q("Which AWS service provides object storage?", ["S3", "EC2", "RDS", "Lambda"], "S3"),
    q("Which AWS service provides virtual servers?", ["EC2", "S3", "CloudFront", "Route 53"], "EC2"),
    q("Which AWS service is designed for serverless functions?", ["Lambda", "EBS", "VPC", "SQS"], "Lambda"),
    q("What does IAM manage in AWS?", ["Users, roles and permissions", "HTML pages", "Git branches", "Database rows only"], "Users, roles and permissions"),
    q("Which AWS service is a managed relational database service?", ["RDS", "S3", "IAM", "CloudWatch"], "RDS")
  ],
  "Machine Learning": [
    q("What is supervised learning trained with?", ["Labeled data", "Only unlabeled data", "CSS files", "Git commits"], "Labeled data"),
    q("What is a feature in machine learning?", ["An input variable used by a model", "A deployment server", "A password", "A UI component"], "An input variable used by a model"),
    q("Why split data into training and test sets?", ["To evaluate generalization on unseen data", "To make files smaller", "To remove all features", "To avoid preprocessing"], "To evaluate generalization on unseen data"),
    q("Which metric is commonly used for classification accuracy?", ["Accuracy", "Latency", "Memory", "Throughput"], "Accuracy"),
    q("What is overfitting?", ["When a model learns training data too closely and generalizes poorly", "When data is missing", "When a server crashes", "When a model has no parameters"], "When a model learns training data too closely and generalizes poorly")
  ],
  "Data Analysis": [
    q("Which Python library is widely used for tabular data analysis?", ["Pandas", "React", "Express", "Spring"], "Pandas"),
    q("What does the mean represent?", ["The arithmetic average", "The middle value only", "The most frequent value only", "The largest value"], "The arithmetic average"),
    q("Which chart is commonly used to show a distribution?", ["Histogram", "Logo", "Wireframe", "Tree map only"], "Histogram"),
    q("What is data cleaning?", ["Finding and correcting or handling inaccurate/incomplete data", "Encrypting every row", "Creating CSS", "Deploying an API"], "Finding and correcting or handling inaccurate/incomplete data"),
    q("Which SQL operation groups rows for aggregate calculations?", ["GROUP BY", "ORDER ONLY", "MERGE BY", "CLUSTER BY"], "GROUP BY")
  ],
  Linux: [
    q("Which command lists files in a Linux directory?", ["ls", "dirlist", "showfiles", "files"], "ls"),
    q("Which command prints the current working directory?", ["pwd", "where", "cwd", "path"], "pwd"),
    q("Which command changes directories?", ["cd", "move", "chdir-only", "goto"], "cd"),
    q("Which command changes file permissions?", ["chmod", "perm", "access", "chperm"], "chmod"),
    q("Which symbol represents the home directory in a typical Linux shell?", ["~", "#", "@", "&"], "~")
  ]
};

export function getSkillQuestions(skill) {
  return skillQuestions[skill] || [
    q(`In ${skill}, which approach best demonstrates practical ability?`, ["Building and testing a real project", "Only watching tutorials", "Memorizing definitions", "Avoiding hands-on work"], "Building and testing a real project"),
    q(`Which is strong evidence of ${skill} proficiency?`, ["A working project using the skill", "A blank certificate", "A copied screenshot", "A random post"], "A working project using the skill"),
    q(`When debugging a ${skill} problem, what should you do first?`, ["Reproduce the issue and inspect the evidence", "Delete the project", "Guess and deploy immediately", "Ignore the error"], "Reproduce the issue and inspect the evidence"),
    q(`What is the best way to improve ${skill}?`, ["Practice, build projects and review results", "Never practice", "Only memorize terms", "Avoid documentation"], "Practice, build projects and review results"),
    q(`Which result best demonstrates that you can apply ${skill}?`, ["A tested working implementation", "Only a course bookmark", "Only a definition", "Only a resume keyword"], "A tested working implementation")
  ];
}
