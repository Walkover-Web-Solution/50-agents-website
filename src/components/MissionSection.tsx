'use client';

import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { Lightbulb, Target, Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" className="h2" sx={{ mb: 2 }}>
            Mission
          </Typography>
          <Typography variant="h5" className="sub__h2 max-w-3xl" sx={{ mx: 'auto' }}>
            To redefine teamwork by creating autonomous AI agents that take on the tasks AI does best—so humans can do
            what only humans can.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Vision Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main',
                },
              }}
              className="bg-base"
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Target size={28} color="#3b82f6" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                    className="text-black"
                  >
                    Our Vision
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.7,
                    }}
                    className="text-gray-dark"
                  >
                    AI teammates that understand context, learn from your team, and handle routine tasks seamlessly.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Impact Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderColor: 'success.main',
                },
              }}
              className="bg-base"
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'rgba(34, 197, 94, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Users size={28} color="#22c55e" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                    className="text-black"
                  >
                    Human Impact
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.7,
                    }}
                    className="text-gray-dark"
                  >
                    Freeing humans to focus on creativity, strategy, and meaningful relationships that drive innovation.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Future Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderColor: 'warning.main',
                },
              }}
              className="bg-base"
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'rgba(251, 146, 60, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lightbulb size={28} color="#fb923c" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                    className="text-black"
                  >
                    The Future
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.7,
                    }}
                    className="text-gray-dark"
                  >
                    Starting with meetings, expanding to comprehensive AI collaboration across all business processes.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionSection;
