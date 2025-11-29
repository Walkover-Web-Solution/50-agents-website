import { Box, LinearProgress, Typography } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box
      className="w-full h-full flex justify-center items-center flex-col gap-2 absolute top-0 left-0 "
      sx={{ bgcolor: 'background.paper' }}
    >
      <Typography variant="h6" className="text-white">
        Your time is precious; let us manage the rest.
      </Typography>
      <Box className="w-full max-w-md">
        <LinearProgress />
      </Box>
    </Box>
  );
}
