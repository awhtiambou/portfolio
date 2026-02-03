// Navigation and site configuration

export const siteConfig = {
  name: 'Portfolio',
  description: 'Personal portfolio showcasing my work and experience',
  url: 'https://portfolio.dev',
  ogImage: '/og-image.png',
  author: {
    name: 'Your Name',
    email: 'hello@portfolio.dev',
    twitter: '@yourhandle',
    github: 'yourgithub',
    linkedin: 'yourlinkedin',
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
  external?: boolean;
};

export const mainNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Experience', href: '/experience' },
  { title: 'Education', href: '/education' },
  { title: 'Projects', href: '/projects' },
  { title: 'Contact', href: '/contact' },
];

export const socialLinks: NavItem[] = [
  { title: 'GitHub', href: 'https://github.com/yourgithub', external: true },
  { title: 'LinkedIn', href: 'https://linkedin.com/in/yourlinkedin', external: true },
  { title: 'Twitter', href: 'https://twitter.com/yourhandle', external: true },
];

export const footerNav = {
  main: mainNav,
  social: socialLinks,
} as const;
