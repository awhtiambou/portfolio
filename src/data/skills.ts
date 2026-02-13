import type { MasteredTechnology, Skill, SkillCategory } from "@/types";

// Skills organized by category
export const skills: Skill[] = [
  // Machine Learning
  { name: "Python", level: "expert", category: "ml" },
  { name: "TensorFlow", level: "advanced", category: "ml" },
  { name: "PyTorch", level: "advanced", category: "ml" },
  { name: "Scikit-learn", level: "expert", category: "ml" },
  { name: "Keras", level: "advanced", category: "ml" },
  { name: "XGBoost", level: "advanced", category: "ml" },
  { name: "LightGBM", level: "advanced", category: "ml" },

  // Artificial Intelligence
  { name: "Natural Language Processing", level: "advanced", category: "ai" },
  { name: "Computer Vision", level: "advanced", category: "ai" },
  { name: "Transformers/BERT", level: "advanced", category: "ai" },
  { name: "Large Language Models", level: "advanced", category: "ai" },
  { name: "RAG Architecture", level: "intermediate", category: "ai" },
  { name: "Prompt Engineering", level: "advanced", category: "ai" },

  // Data Science
  { name: "Pandas", level: "expert", category: "data" },
  { name: "NumPy", level: "expert", category: "data" },
  { name: "Data Visualization", level: "advanced", category: "data" },
  { name: "Statistical Analysis", level: "advanced", category: "data" },
  { name: "Feature Engineering", level: "advanced", category: "data" },
  { name: "Jupyter Notebooks", level: "expert", category: "data" },

  // MLOps
  { name: "MLflow", level: "advanced", category: "mlops" },
  { name: "Model Deployment", level: "advanced", category: "mlops" },
  { name: "ML Pipelines", level: "intermediate", category: "mlops" },
  { name: "Model Monitoring", level: "intermediate", category: "mlops" },

  // DevOps
  { name: "Docker", level: "advanced", category: "devops" },
  { name: "Kubernetes", level: "intermediate", category: "devops" },
  { name: "CI/CD", level: "advanced", category: "devops" },
  { name: "GitHub Actions", level: "advanced", category: "devops" },
  { name: "Linux", level: "advanced", category: "devops" },
  { name: "Git", level: "expert", category: "devops" },

  // Cloud
  { name: "AWS", level: "advanced", category: "cloud" },
  { name: "Google Cloud", level: "intermediate", category: "cloud" },
  { name: "Azure", level: "intermediate", category: "cloud" },
  { name: "Serverless", level: "intermediate", category: "cloud" },

  // Frontend
  { name: "React", level: "advanced", category: "frontend" },
  { name: "Next.js", level: "advanced", category: "frontend" },
  { name: "TypeScript", level: "advanced", category: "frontend" },
  { name: "JavaScript", level: "expert", category: "frontend" },
  { name: "Tailwind CSS", level: "advanced", category: "frontend" },
  { name: "HTML/CSS", level: "expert", category: "frontend" },

  // Backend
  { name: "Node.js", level: "advanced", category: "backend" },
  { name: "FastAPI", level: "advanced", category: "backend" },
  { name: "Flask", level: "advanced", category: "backend" },
  { name: "REST APIs", level: "expert", category: "backend" },
  { name: "GraphQL", level: "intermediate", category: "backend" },

  // Databases
  { name: "PostgreSQL", level: "advanced", category: "databases" },
  { name: "MongoDB", level: "advanced", category: "databases" },
  { name: "Redis", level: "intermediate", category: "databases" },
  { name: "Vector Databases", level: "intermediate", category: "databases" },
  { name: "SQL", level: "advanced", category: "databases" },

  // Tools
  { name: "VS Code", level: "expert", category: "tools" },
  { name: "Postman", level: "advanced", category: "tools" },
  { name: "Figma", level: "intermediate", category: "tools" },
  { name: "Notion", level: "advanced", category: "tools" },

  // Soft Skills
  { name: "Problem Solving", level: "expert", category: "soft-skills" },
  { name: "Communication", level: "advanced", category: "soft-skills" },
  { name: "Team Collaboration", level: "advanced", category: "soft-skills" },
  { name: "Project Management", level: "intermediate", category: "soft-skills" },
  { name: "Technical Writing", level: "advanced", category: "soft-skills" },
];

// Helper to get skills by category
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

// Helper to get featured skills (expert + advanced level)
export function getFeaturedSkills(): Skill[] {
  return skills.filter((skill) => skill.level === "expert" || skill.level === "advanced");
}

// Category display configuration - using react-icons icon names
export const skillCategoryConfig: Record<SkillCategory, { label: string; iconName: string; color: string }> = {
  ml: { label: "Machine Learning", iconName: "SiPython", color: "#8b5cf6" },
  ai: { label: "Artificial Intelligence", iconName: "FaBrain", color: "#06b6d4" },
  data: { label: "Data Science", iconName: "FaChartBar", color: "#22c55e" },
  mlops: { label: "MLOps", iconName: "FaCogs", color: "#f59e0b" },
  devops: { label: "DevOps", iconName: "FaDocker", color: "#10b981" },
  cloud: { label: "Cloud", iconName: "FaCloud", color: "#8b5cf6" },
  frontend: { label: "Frontend", iconName: "FaReact", color: "#ec4899" },
  backend: { label: "Backend", iconName: "FaServer", color: "#3b82f6" },
  tools: { label: "Tools", iconName: "FaTools", color: "#f59e0b" },
  databases: { label: "Databases", iconName: "FaDatabase", color: "#06b6d4" },
  "soft-skills": { label: "Soft Skills", iconName: "FaLightbulb", color: "#ec4899" },
  other: { label: "Other", iconName: "FaBox", color: "#6b7280" },
};

export const masteredTechnologies: MasteredTechnology[] = [
  // Programming Languages
  {
    name: "python",
    title: "Python",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    iconColor: "#3776AB",
    bgColor: "#FFE873"
  },
  {
    name: "csharp",
    title: "C#",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    iconColor: "#239120",
    bgColor: "#E8F5E9"
  },
  {
    name: "typescript",
    title: "TypeScript",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    iconColor: "#3178C6",
    bgColor: "#E3F2FD"
  },
  {
    name: "javascript",
    title: "JavaScript",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    iconColor: "#F7DF1E",
    bgColor: "#FFFDE7"
  },
  {
    name: "sql",
    title: "SQL",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
    iconColor: "#CC2927",
    bgColor: "#FFEBEE"
  },
  
  // Frontend Frameworks & Libraries
  {
    name: "react",
    title: "React",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    iconColor: "#61DAFB",
    bgColor: "#E1F5FE"
  },
  {
    name: "nextjs",
    title: "Next.js",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    iconColor: "#000000",
    bgColor: "#F5F5F5"
  },
  {
    name: "html5",
    title: "HTML5",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    iconColor: "#E34F26",
    bgColor: "#FFEBEE"
  },
  {
    name: "css3",
    title: "CSS3",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    iconColor: "#1572B6",
    bgColor: "#E3F2FD"
  },
  {
    name: "tailwindcss",
    title: "Tailwind CSS",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    iconColor: "#06B6D4",
    bgColor: "#E0F2FE"
  },
  {
    name: "materialui",
    title: "Material-UI",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    iconColor: "#007FFF",
    bgColor: "#E3F2FD"
  },
  {
    name: "redux",
    title: "Redux",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    iconColor: "#764ABC",
    bgColor: "#EDE7F6"
  },
  
  // Backend & APIs
  {
    name: "dotnetcore",
    title: "ASP.NET Core",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    iconColor: "#512BD4",
    bgColor: "#EDE7F6"
  },
  {
    name: "dotnet",
    title: ".NET",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    iconColor: "#512BD4",
    bgColor: "#EDE7F6"
  },
  {
    name: "flask",
    title: "Flask",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    iconColor: "#000000",
    bgColor: "#F5F5F5"
  },
  {
    name: "fastapi",
    title: "FastAPI",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    iconColor: "#009688",
    bgColor: "#E0F2F1"
  },
  {
    name: "nodejs",
    title: "Node.js",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    iconColor: "#339933",
    bgColor: "#E8F5E9"
  },
  {
    name: "express",
    title: "Express.js",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    iconColor: "#000000",
    bgColor: "#F5F5F5"
  },
  
  // Databases
  {
    name: "postgresql",
    title: "PostgreSQL",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    iconColor: "#4169E1",
    bgColor: "#E8EAF6"
  },
  {
    name: "mysql",
    title: "MySQL",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    iconColor: "#4479A1",
    bgColor: "#E3F2FD"
  },
  {
    name: "microsoftsqlserver",
    title: "SQL Server",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    iconColor: "#CC2927",
    bgColor: "#FFEBEE"
  },
  {
    name: "mongodb",
    title: "MongoDB",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    iconColor: "#47A248",
    bgColor: "#E8F5E9"
  },
  {
    name: "redis",
    title: "Redis",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    iconColor: "#DC382D",
    bgColor: "#FFEBEE"
  },
  {
    name: "sqlite",
    title: "SQLite",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    iconColor: "#003B57",
    bgColor: "#E3F2FD"
  },
  
  // AI/ML Frameworks & Libraries
  {
    name: "tensorflow",
    title: "TensorFlow",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    iconColor: "#FF6F00",
    bgColor: "#FFF3E0"
  },
  {
    name: "pytorch",
    title: "PyTorch",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    iconColor: "#EE4C2C",
    bgColor: "#FFEBEE"
  },
  {
    name: "keras",
    title: "Keras",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    iconColor: "#D00000",
    bgColor: "#FFEBEE"
  },
  {
    name: "opencv",
    title: "OpenCV",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    iconColor: "#5C3EE8",
    bgColor: "#EDE7F6"
  },
  {
    name: "scikitlearn",
    title: "Scikit-learn",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    iconColor: "#F7931E",
    bgColor: "#FFF8E1"
  },
  {
    name: "numpy",
    title: "NumPy",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    iconColor: "#013243",
    bgColor: "#E0F2F1"
  },
  {
    name: "pandas",
    title: "Pandas",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    iconColor: "#150458",
    bgColor: "#EDE7F6"
  },
  {
    name: "jupyter",
    title: "Jupyter",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    iconColor: "#F37626",
    bgColor: "#FFF3E0"
  },
  
  // Cloud Platforms
  {
    name: "aws",
    title: "AWS",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    iconColor: "#FF9900",
    bgColor: "#FFF8E1"
  },
  {
    name: "azure",
    title: "Microsoft Azure",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    iconColor: "#0078D4",
    bgColor: "#E3F2FD"
  },
  {
    name: "googlecloud",
    title: "Google Cloud",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    iconColor: "#4285F4",
    bgColor: "#E8EAF6"
  },
  
  // DevOps & CI/CD
  {
    name: "docker",
    title: "Docker",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    iconColor: "#2496ED",
    bgColor: "#E1F5FE"
  },
  {
    name: "kubernetes",
    title: "Kubernetes",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    iconColor: "#326CE5",
    bgColor: "#E8EAF6"
  },
  {
    name: "jenkins",
    title: "Jenkins",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    iconColor: "#D24939",
    bgColor: "#FFEBEE"
  },
  {
    name: "githubactions",
    title: "GitHub Actions",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    iconColor: "#2088FF",
    bgColor: "#E3F2FD"
  },
  {
    name: "terraform",
    title: "Terraform",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    iconColor: "#7B42BC",
    bgColor: "#EDE7F6"
  },
  
  // Version Control & Tools
  {
    name: "git",
    title: "Git",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    iconColor: "#F05032",
    bgColor: "#FFEBEE"
  },
  {
    name: "github",
    title: "GitHub",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    iconColor: "#181717",
    bgColor: "#F5F5F5"
  },
  {
    name: "gitlab",
    title: "GitLab",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    iconColor: "#FC6D26",
    bgColor: "#FFF3E0"
  },
  {
    name: "vscode",
    title: "VS Code",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    iconColor: "#007ACC",
    bgColor: "#E3F2FD"
  },
  {
    name: "postman",
    title: "Postman",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    iconColor: "#FF6C37",
    bgColor: "#FFF3E0"
  },
  {
    name: "vim",
    title: "Vim",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
    iconColor: "#019733",
    bgColor: "#E8F5E9"
  },
  
  // Operating Systems
  {
    name: "linux",
    title: "Linux",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    iconColor: "#FCC624",
    bgColor: "#FFFDE7"
  },
  {
    name: "ubuntu",
    title: "Ubuntu",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    iconColor: "#E95420",
    bgColor: "#FFEBEE"
  },
  {
    name: "windows",
    title: "Windows",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    iconColor: "#0078D6",
    bgColor: "#E3F2FD"
  },
  {
    name: "bash",
    title: "Bash",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    iconColor: "#4EAA25",
    bgColor: "#F1F8E9"
  },
  
  // Mobile Development
  {
    name: "flutter",
    title: "Flutter",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    iconColor: "#02569B",
    bgColor: "#E1F5FE"
  },
  {
    name: "dart",
    title: "Dart",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    iconColor: "#0175C2",
    bgColor: "#E3F2FD"
  },
  {
    name: "android",
    title: "Android",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    iconColor: "#3DDC84",
    bgColor: "#E8F5E9"
  },
  
  // Testing & Quality
  {
    name: "jest",
    title: "Jest",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    iconColor: "#C21325",
    bgColor: "#FFEBEE"
  },
  {
    name: "pytest",
    title: "Pytest",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg",
    iconColor: "#0A9EDC",
    bgColor: "#E1F5FE"
  },
  
  // Build Tools & Package Managers
  {
    name: "npm",
    title: "npm",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    iconColor: "#CB3837",
    bgColor: "#FFEBEE"
  },
  {
    name: "yarn",
    title: "Yarn",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
    iconColor: "#2C8EBB",
    bgColor: "#E1F5FE"
  },
  {
    name: "webpack",
    title: "Webpack",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    iconColor: "#8DD6F9",
    bgColor: "#E1F5FE"
  },
  {
    name: "vite",
    title: "Vite",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    iconColor: "#646CFF",
    bgColor: "#EDE7F6"
  },
  
  // Additional Tools
  {
    name: "nginx",
    title: "Nginx",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    iconColor: "#009639",
    bgColor: "#E8F5E9"
  },
  {
    name: "graphql",
    title: "GraphQL",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    iconColor: "#E10098",
    bgColor: "#FCE4EC"
  },
  {
    name: "figma",
    title: "Figma",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    iconColor: "#F24E1E",
    bgColor: "#FFEBEE"
  },
  {
    name: "jira",
    title: "Jira",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    iconColor: "#0052CC",
    bgColor: "#E3F2FD"
  },
  {
    name: "slack",
    title: "Slack",
    logoImageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    iconColor: "#4A154B",
    bgColor: "#F3E5F5"
  }
];