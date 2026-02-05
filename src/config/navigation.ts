// Navigation and site configuration

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
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

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

export const mainNav = navItems;

export const footerNav = {
  main: navItems,
  social: socialLinks,
} as const;
