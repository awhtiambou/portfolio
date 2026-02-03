'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';
import { ReactNode, useMemo, useEffect, useState } from 'react';
import { colors, breakpoints, typography } from '@/config/theme';

interface MUIProviderProps {
  children: ReactNode;
}

export function MUIProvider({ children }: MUIProviderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const muiTheme = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    const themeColors = isDark ? colors.dark : colors.light;

    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: themeColors.accent,
        },
        secondary: {
          main: colors.accents.blue,
        },
        background: {
          default: themeColors.primary,
          paper: themeColors.secondary,
        },
        text: {
          primary: themeColors.accent,
          secondary: isDark ? '#A0A0A0' : '#666666',
        },
      },
      breakpoints: {
        values: {
          xs: breakpoints.xs,
          sm: breakpoints.sm,
          md: breakpoints.md,
          lg: breakpoints.lg,
          xl: breakpoints.xl,
        },
      },
      typography: {
        fontFamily: typography.fonts.body,
        h1: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.bold },
        h2: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.bold },
        h3: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.semibold },
        h4: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.semibold },
        h5: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.semibold },
        h6: { fontFamily: typography.fonts.heading, fontWeight: typography.weights.medium },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: typography.weights.medium,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    });
  }, [resolvedTheme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
