// Theme configuration constants
// Following the 60-30-10 color rule

export const colors = {
  light: {
    primary: '#FFFFFF',      // 60% - Main background
    secondary: '#F8F8F8',    // 30% - Cards, sections
    accent: '#222222',       // 10% - Text, CTAs
  },
  dark: {
    primary: '#222222',      // 60% - Main background
    secondary: '#2D2D2D',    // 30% - Cards, sections
    accent: '#FFFFFF',       // 10% - Text, CTAs
  },
  accents: {
    yellow: '#FBE7C6',       // Warm, creative
    pink: '#FFAEBC',         // Friendly, approachable
    blue: '#A0E7E5',         // Tech, innovation
    mint: '#B4F8C8',         // Fresh, growth
  },
} as const;

export const typography = {
  fonts: {
    heading: 'var(--font-besley)',
    body: 'var(--font-montserrat)',
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
