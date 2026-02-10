import type { Skill, SkillCategory } from "@/types";

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
