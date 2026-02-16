// Theme configuration constants
// Following the 60-30-10 color rule

export const colors = {
  light: {
    primary: '#f3f4f6',      // 60% - Main background
    secondary: '#F8F8F8',    // 30% - Cards, sections
    accent: '#222222',       // 10% - Text, CTAs
  },
  dark: {
    primary: '#222222',      // 60% - Main background
    secondary: '#2D2D2D',    // 30% - Cards, sections
    accent: '#FFFFFF',       // 10% - Text, CTAs
  },
  accents: {
    yellow: '#F5A623',       // Warm, creative - golden amber
    pink: '#FF6B8A',         // Friendly, approachable - vibrant coral
    blue: '#4ECDC4',         // Tech, innovation - rich teal
    mint: '#2ECC71',         // Fresh, growth - vibrant green
  },
  backgrounds: {
    noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
    light: {
      mesh: `
        radial-gradient(at 0% 0%, rgba(245, 166, 35, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(255, 107, 138, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(78, 205, 196, 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(46, 204, 113, 0.15) 0px, transparent 50%)
      `,
    },
    dark: {
      mesh: `
        radial-gradient(at 0% 0%, rgba(245, 166, 35, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(255, 107, 138, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(78, 205, 196, 0.1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(46, 204, 113, 0.1) 0px, transparent 50%)
      `,
    },
  }
} as const;

export const typography = {
  fonts: {
    heading: 'var(--font-besley)',
    body: 'var(--font-work-sans)',
    accent: 'var(--font-inter)',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
} as const;

// Breakpoints synced with MUI and Tailwind
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const spacing = {
  section: {
    sm: '3rem',     // 48px
    md: '4rem',     // 64px
    lg: '6rem',     // 96px
  },
  container: {
    padding: '1rem',
    maxWidth: '1280px',
  },
} as const;

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type ThemeMode = 'light' | 'dark';
export type AccentColor = keyof typeof colors.accents;
