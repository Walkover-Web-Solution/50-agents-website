'use client';

import { Suspense, useEffect, useState } from 'react';
import LoadingScreen from '@/components/Loader';
import { useGetProxyUserQuery } from '@/store/apis/orgs';
import { useRouter } from 'next/navigation';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { storCurrentUrl } from '@/lib/utils';

const OrgSelectionPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('proxy_auth_token');
    if (!token) {
      storCurrentUrl();
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <OrgSelector />
    </Suspense>
  );
};

const OrgSelector = () => {
  const router = useRouter();
  const storedOrgId = typeof window !== 'undefined' ? localStorage.getItem('selectedOrgId') : null;

  useEffect(() => {
    if (storedOrgId) {
      router.push(`/org/${storedOrgId}`);
      return;
    }
  }, [storedOrgId, router]);

  const { data: userData, isLoading } = useGetProxyUserQuery(undefined, {
    skip: !!storedOrgId,
  });

  const orgs = userData?.c_companies || [];

  if (isLoading || !userData) return <LoadingScreen />;

  // Auto-select if there's only one org
  if (orgs.length === 1) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedOrgId', orgs[0].id.toString());
    }
    router.replace(`/org/${orgs[0].id}`);
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Dialog
        open={true}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary">
            Welcome to 50Agents
          </Typography>
          <Typography variant="h6" textAlign="center" mt={2} color="text.secondary">
            Select your organization to continue
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              p: 2,
              width: '100%',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {orgs.map((org: any) => (
              <Card
                key={org.id}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme => theme.shadows[4],
                  },
                }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('selectedOrgId', org.id.toString());
                  }
                  router.replace(`/org/${org.id}`);
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">{org.name}</Typography>
                  <ArrowForward sx={{ color: 'primary.main' }} />
                </Box>
              </Card>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrgSelectionPage;
