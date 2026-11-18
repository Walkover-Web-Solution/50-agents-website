'use client';

import TalkToUs from '@/components/TalkToUs';
import { store } from '@/store/store';
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

  return (
    <Provider store={store}>
      <Box component="main" className="flex h-screen w-full">{children}</Box>
      {mounted ? <TalkToUs /> : null}
    </Provider>
  );
}

export default ClientLayout;
