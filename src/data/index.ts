// Data exports
export { skills, getSkillsByCategory, getFeaturedSkills, skillCategoryConfig } from "./skills";
export { experiences, getCurrentExperiences, getPastExperiences, getTotalExperienceYears } from "./experience";
export { education, certifications, getCurrentEducation, getCertificationsByIssuer } from "./education";
export { projects, getFeaturedProjects, getProjectBySlug, getProjectsByCategory, getAllProjectSlugs } from "./projects";
export { profile, socialLinksData, getFormattedName } from "./profile";

// Re-export types for convenience
export type { Certification } from "./education";
