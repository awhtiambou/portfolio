
export const siteConfig = {
  name: 'Abdoul-Wahabou H. Tiambou',
  description: 'AI/ML Engineer & Full-Stack Developer',
  url: 'https://awhtiambou.com',
  ogImage: '/og-image.png',
  author: {
    name: 'Abdoul-Wahabou H. Tiambou',
    email: 'contact@awhtiambou.com',
    twitter: '@awhtiambou',
    github: 'awhtiambou',
    linkedin: 'awhtiambou',
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  translationKey?: string;
};

export type SectionLink = {
  label: string;
  href: string;
  description?: string;
  translationKey?: string;
};

export const headerNavItems: NavItem[] = [
  { label: 'Home', href: '/', translationKey: 'home' },
  { label: 'About', href: '/about', translationKey: 'about' },
  { label: 'Projects', href: '/projects', translationKey: 'projects' },
  { label: 'Blog', href: '/blog', translationKey: 'blog' },
];

export const drawerNavItems: NavItem[] = [
  { label: 'Home', href: '/', translationKey: 'home' },
  { label: 'About', href: '/about', translationKey: 'about' },
  { label: 'Projects', href: '/projects', translationKey: 'projects' },
  { label: 'Contact', href: '/contact', translationKey: 'contact' },
  { label: 'Blog', href: '/blog', translationKey: 'blog' },
];

export const aboutSectionLinks: SectionLink[] = [
  { label: 'Experience', href: '/about#experience', description: 'My professional journey', translationKey: 'experience' },
  { label: 'Skills', href: '/about#skills', description: 'Technologies I work with', translationKey: 'skills' },
  { label: 'Education', href: '/about#education', description: 'Academic background', translationKey: 'education' },
];

export const newsletterLink: SectionLink = {
  label: 'Newsletter',
  href: '/contact#newsletter',
  description: 'Subscribe to updates',
  translationKey: 'newsletter',
};

export type SocialLinkNav = {
  name: string;
  url: string;
  icon: string;
};

export const socialLinks: SocialLinkNav[] = [
  { name: 'GitHub', url: 'https://github.com/awhtiambou', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/awhtiambou', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/awhtiambou', icon: 'twitter' },
];

export const navItems = headerNavItems;
export const mainNav = headerNavItems;

export const footerNav = {
  main: drawerNavItems,
  social: socialLinks,
} as const;
