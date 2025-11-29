'use client';

import { RocketLaunch } from '@mui/icons-material';

interface UseTemplateButtonProps {
  serviceName: string;
}

export default function UseTemplateButton({ serviceName }: UseTemplateButtonProps) {
  const handleUseTemplate = () => {
    // Navigate to template installation or agent creation
    window.location.href = '/org';
  };

  return (
    <button
      // onClick={handleUseTemplate}
      className="btn btn-primary"
      data-tally-open="3NKeZl"
      data-tally-overlay="1"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
    >
      <RocketLaunch className="mr-2 text-lg" />
      Use Agent
    </button>
  );
}
