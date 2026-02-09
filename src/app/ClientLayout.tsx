'use client';

import { store } from '@/store/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MuiThemeWrapper } from '@/components/MuiThemeProvider';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <MuiThemeWrapper>
          <Box component="main" className="flex h-screen w-full">{children}</Box>
        </MuiThemeWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default ClientLayout;
