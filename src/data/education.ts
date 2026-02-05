import type { Education } from "@/types";

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "University Name",
    degree: "Bachelor of Science",
    field: "Computer Science",
    location: "City, Country",
    startDate: "2021-09",
    current: true,
    description:
      "Pursuing a degree in Computer Science with a focus on Artificial Intelligence, Machine Learning, and Software Engineering. Engaged in research projects and extracurricular activities that enhance practical skills.",
    achievements: [
      "Dean's List - Multiple Semesters",
      "AI/ML Research Assistant",
      "Hackathon Winner - 1st Place",
      "Computer Science Club President",
      "Teaching Assistant for Data Structures",
    ],
    gpa: "3.8/4.0",
    courses: [
      "Machine Learning",
      "Deep Learning",
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Computer Vision",
      "Natural Language Processing",
      "Distributed Systems",
    ],
  },
];

// Certifications
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    date: "2024-01",
    url: "https://aws.amazon.com/certification/",
  },
  {
    id: "cert-2",
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2023-08",
    url: "https://www.tensorflow.org/certificate",
  },
  {
    id: "cert-3",
    name: "Deep Learning Specialization",
    issuer: "Coursera / deeplearning.ai",
    date: "2023-05",
    url: "https://www.coursera.org/specializations/deep-learning",
  },
];

// Helper to get current education
export function getCurrentEducation(): Education[] {
  return education.filter((edu) => edu.current);
}

// Helper to get all certifications by issuer
export function getCertificationsByIssuer(issuer: string): Certification[] {
  return certifications.filter((cert) => cert.issuer === issuer);
}
