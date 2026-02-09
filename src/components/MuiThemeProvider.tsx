'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { generateCustomTheme } from '@/app/utils/MuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';

export function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  
  const muiTheme = useMemo(() => {
    return generateCustomTheme(resolvedTheme);
  }, [resolvedTheme]);

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
