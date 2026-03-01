
export const experiences = [
  {
    key: "kalfou",
    logo: "/assets/images/experiences/kalfou.png",
    url: "https://kalfou.app",
    startDate: "2025-12",
    endDate: null,
    current: true,
    responsibilityKeys: [
      "kalfou.r0", "kalfou.r1", "kalfou.r2",
      "kalfou.r3", "kalfou.r4", "kalfou.r5",
    ],
    technologies: [
      "ASP.NET Core 8", "Clean Architecture", "PostgreSQL",
      "Flutter", "Dart", "React", "TypeScript",
      "SignalR", "Docker", "AWS S3", "Firebase",
    ],
  },

  {
    key: "uqac",
    logo: "/assets/images/experiences/uqac.png",
    url: "https://www.uqac.ca",
    startDate: "2024-12",
    endDate: "2025-07",
    current: false,
    responsibilityKeys: [
      "uqac.r0", "uqac.r1", "uqac.r2",
      "uqac.r3", "uqac.r4",
    ],
    technologies: [
      "Python", "PyTorch", "YOLO", "Mask R-CNN", "SAM",
      "OccupancyNet", "OpenCV", "HoloLens 2", "Unity", "MRTK",
    ],
  },

  {
    key: "monastir",
    logo: "/assets/images/experiences/u-monastir.jpg",
    url: "https://www.enim.rnu.tn",
    startDate: "2022-10",
    endDate: "2023-05",
    current: false,
    responsibilityKeys: [
      "monastir.r0", "monastir.r1", "monastir.r2",
      "monastir.r3", "monastir.r4",
    ],
    technologies: [
      "ASP.NET Core", "C#", "React", "TypeScript",
      "SQL Server", "Tailwind CSS", "Redux Toolkit", "Scrum",
    ],
  },

  {
    key: "tiamtech",
    logo: "/assets/images/experiences/tiamtech.jpg",
    url: "https://tiamtech.netlify.app/",
    startDate: "2022-06",
    endDate: "2023-09",
    current: false,
    responsibilityKeys: [
      "tiamtech.r0", "tiamtech.r1", "tiamtech.r2",
    ],
    technologies: [
      "React", "Next.js", "TypeScript",
      "Tailwind CSS", "Node.js", "WordPress", "Figma",
    ],
  },
] as const;

export type ExperienceKey = typeof experiences[number]["key"];

export function getCurrentExperiences() {
  return experiences.filter(e => e.current);
}
export function getPastExperiences() {
  return experiences.filter(e => !e.current);
}