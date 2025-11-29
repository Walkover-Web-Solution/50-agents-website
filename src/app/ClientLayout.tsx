'use client';

import { store } from '@/store/store';
import { Box, ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { generateCustomTheme } from './utils/MuiTheme';

interface ClientLayoutProps {
  children: React.ReactNode;
  fontClass: string;
}

function ClientLayout({ children, fontClass }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  useEffect(() => {
    setMounted(true);
    // Get initial theme from server script or default to light
    const serverTheme = (typeof window !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null) as
      | 'light'
      | 'dark';
    setThemeMode(serverTheme || 'light');
  }, []);

  useEffect(() => {
    if (mounted && !document.documentElement.getAttribute('data-theme')) {
      const newTheme = prefersDarkMode ? 'dark' : 'light';
      setThemeMode(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, [mounted, prefersDarkMode]);

  if (!mounted) {
    return null;
  }

  const theme = generateCustomTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Box className="flex h-screen w-full">{children}</Box>
      </Provider>
    </ThemeProvider>
  );
}

export default ClientLayout;
