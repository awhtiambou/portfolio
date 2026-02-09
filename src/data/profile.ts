import type { SocialLink } from "@/types";

// Personal profile data
export const profile = {
  name: "Abdoul-Wahabou H. Tiambou",
  firstName: "Abdoul-Wahabou",
  lastName: "Tiambou",
  nickname: "AWH",

  title: "AI/ML Engineer & Full-Stack Developer",
  tagline: "Building intelligent systems and scalable applications",

  email: "awhtiambou@kalfou.app",
  phone: "+1 (581) 447-8028",
  location: "Quebec, Canada",
  timezone: "EST",

  bio: {
    short: "Passionate AI/ML Engineer and Full-Stack Developer with expertise in building intelligent systems and scalable web applications.",

    long: `I'm a passionate AI/ML Engineer and Full-Stack Developer with a deep interest in 
    building intelligent systems that solve real-world problems. Currently pursuing my degree 
    in Computer Science, I combine academic knowledge with hands-on experience in machine 
    learning, deep learning, and modern web development.

    My journey in tech started with curiosity about how machines can learn and make decisions. 
    Today, I work on projects ranging from natural language processing to computer vision, 
    always seeking to push the boundaries of what's possible with AI.

    When I'm not coding, you can find me exploring new technologies, contributing to open-source 
    projects, or sharing knowledge through technical writing and mentoring.`,

    paragraphs: [
      "I'm a passionate AI/ML Engineer and Full-Stack Developer with a deep interest in building intelligent systems that solve real-world problems.",
      "Currently pursuing my degree in Computer Science, I combine academic knowledge with hands-on experience in machine learning, deep learning, and modern web development.",
      "My journey in tech started with curiosity about how machines can learn and make decisions. Today, I work on projects ranging from natural language processing to computer vision.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring.",
    ],
  },

  avatar: "/images/avatar.jpg",
  resume: "/resume.pdf",

  // Social links
  social: {
    github: "https://github.com/awhtiambou",
    linkedin: "https://www.linkedin.com/in/abdoul-wahabou-h-tiambou-475099210/",
    twitter: "https://twitter.com/awhtiambou",
    email: "mailto:contact@awhtiambou.com",
  } as const,

  // Stats for display
  stats: {
    yearsExperience: 3,
    projectsCompleted: 15,
    technologiesMastered: 25,
    coffeeCups: 1000,
  },

  // Interests and hobbies
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Open Source",
    "Cloud Computing",
    "Technical Writing",
    "Mentoring",
  ],

  // Currently working on / learning
  current: {
    learning: ["Advanced MLOps", "System Design", "Rust"],
    working: ["AI Chatbot Platform", "Portfolio Website"],
    reading: "Designing Machine Learning Systems by Chip Huyen",
  },
};

// Social links for components
export const socialLinksData: SocialLink[] = [
  {
    name: "GitHub",
    url: profile.social.github,
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: profile.social.linkedin,
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: profile.social.twitter,
    icon: "twitter",
  },
];

// Helper to get formatted name
export function getFormattedName(format: "full" | "first" | "nickname" = "full"): string {
  switch (format) {
    case "first":
      return profile.firstName;
    case "nickname":
      return profile.nickname;
    default:
      return profile.name;
  }
}
