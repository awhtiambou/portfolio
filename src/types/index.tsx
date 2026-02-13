// Common types used across the portfolio

import { IconBaseProps } from "react-icons/lib";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  startDate: string;
  endDate?: string;
  status?: 'completed' | 'in-progress' | 'planned';
}

export type ProjectCategory = 'ml' | 'ai' | 'devops' | 'mlops' | 'web' | 'mobile' | 'design' | 'other';

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
  current?: boolean;
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
  current?: boolean;
  location: string;
  logo?: string;
  gpa?: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SkillCategory = 
  | 'ml'           // Machine Learning
  | 'ai'           // Artificial Intelligence
  | 'data'         // Data Science & Analytics
  | 'mlops'        // MLOps & Model Deployment
  | 'devops'       // DevOps & CI/CD
  | 'cloud'        // Cloud Platforms (AWS, GCP, Azure)
  | 'frontend'     // Frontend Development
  | 'backend'      // Backend Development
  | 'tools'        // Development Tools & Frameworks
  | 'databases'    // Databases & Data Storage
  | 'soft-skills'  // Communication, Leadership, etc.
  | 'other';

export interface MasteredTechnology {
  name: string;
  title: string;
  icon?: IconBaseProps;
  iconColor: string;
  logoImageUrl?: string;
  bgColor?: string
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
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