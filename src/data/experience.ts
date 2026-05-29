
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
      "ASP.NET Core", "Clean Architecture", "PostgreSQL",
      "Flutter", "Dart", "React", "TypeScript",
      "SignalR", "Docker", "AWS", "Firebase", "C#",
    ],
  },

  {
    key: "liara",
    logo: "/assets/images/experiences/uqac.png",
    url: "https://liara.uqac.ca",
    startDate: "2024-12",
    endDate: "2025-07",
    current: false,
    responsibilityKeys: [
      "liara.r0", "liara.r1", "liara.r2",
      "liara.r3", "liara.r4",
    ],
    technologies: [
      "Python", "PyTorch", "YOLO", "Mask R-CNN", "SAM",
      "OccupancyNet", "OpenCV", "C#", "HoloLens 2", "Unity", "MRTK",
    ],
  },
  {
    key: "docstream",
    logo: "/assets/images/experiences/u-monastir.jpg",
    url: "https://docstream.tn",
    startDate: "2022-10",
    endDate: "2023-05",
    current: false,
    responsibilityKeys: [
      "docstream.r0", "docstream.r1", "docstream.r2", "docstream.r3",
    ],
    technologies: [
      "ASP.NET Core", "C#", "React", "TypeScript",
      "SQL Server", "Tailwind CSS", "Redux Toolkit",
      "Jest", "Azure DevOps", "Netlify", "Scrum",
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
      "React", "TypeScript", "Tailwind CSS", "C#", "ASP.NET Core", "Wix", "Figma",
    ],
  },
  {
    key: "wevioo",
    logo: "",
    url: "https://www.wevioo.com",
    startDate: "2023-08",
    endDate: "2023-12",
    current: false,
    responsibilityKeys: [
      "wevioo.r0", "wevioo.r1", "wevioo.r2", "wevioo.r3",
    ],
    technologies: [
      "ASP.NET Core", "C#", "FastAPI", "REST APIs",
      "PostgreSQL", "GitHub Actions", "Docker", "Agile",
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
