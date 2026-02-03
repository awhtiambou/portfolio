// Common types used across the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  startDate: string;
  endDate?: string;
  category: ProjectCategory;
}

export type ProjectCategory = 'web' | 'mobile' | 'design' | 'other';

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
  location: string;
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  achievements?: string[];
  startDate: string;
  endDate?: string;
  location: string;
  logo?: string;
}

export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'soft-skills' | 'other';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// Utility types
export type WithClassName<T = object> = T & { className?: string };
export type WithChildren<T = object> = T & { children?: React.ReactNode };
