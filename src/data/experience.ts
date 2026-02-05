import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Company Name",
    position: "AI/ML Engineer",
    location: "Remote",
    startDate: "2024-01",
    current: true,
    description:
      "Working on cutting-edge machine learning solutions and deploying AI systems at scale.",
    responsibilities: [
      "Develop and deploy production-ready machine learning models",
      "Build and maintain ML pipelines using modern MLOps practices",
      "Collaborate with cross-functional teams to integrate AI features",
      "Research and implement state-of-the-art ML techniques",
      "Optimize model performance and reduce inference latency",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "AWS",
      "Docker",
      "Kubernetes",
      "MLflow",
    ],
  },
  {
    id: "exp-2",
    company: "Startup Inc",
    position: "Full-Stack Developer",
    location: "Hybrid",
    startDate: "2023-06",
    endDate: "2023-12",
    description:
      "Built scalable web applications and contributed to core product development.",
    responsibilities: [
      "Developed responsive frontend interfaces using React and TypeScript",
      "Designed and implemented RESTful APIs with Node.js",
      "Managed PostgreSQL databases and optimized queries",
      "Implemented CI/CD pipelines using GitHub Actions",
      "Participated in code reviews and mentored junior developers",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Git",
    ],
  },
  {
    id: "exp-3",
    company: "Research Lab",
    position: "ML Research Assistant",
    location: "On-site",
    startDate: "2022-09",
    endDate: "2023-05",
    description:
      "Conducted research on natural language processing and computer vision applications.",
    responsibilities: [
      "Implemented and evaluated NLP models for text classification",
      "Collaborated on research papers and presentations",
      "Collected and preprocessed datasets for experiments",
      "Developed visualization tools for model analysis",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Transformers",
      "BERT",
      "Pandas",
      "Matplotlib",
    ],
  },
];

// Helper to get current experiences
export function getCurrentExperiences(): Experience[] {
  return experiences.filter((exp) => exp.current);
}

// Helper to get past experiences
export function getPastExperiences(): Experience[] {
  return experiences.filter((exp) => !exp.current);
}

// Calculate total years of experience
export function getTotalExperienceYears(): number {
  // Placeholder - calculate based on actual dates
  return 3;
}
