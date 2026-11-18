'use client';

import { OpenInNew } from '@mui/icons-material';

interface WebsiteButtonProps {
  domain: string;
}

export default function WebsiteButton({ domain }: WebsiteButtonProps) {
  return (
    <button onClick={() => window.open(`https://${domain}`, '_blank')} className="btn btn-outline">
      <OpenInNew className="mr-2 text-lg" />
      Visit Website
    </button>
  );
}
