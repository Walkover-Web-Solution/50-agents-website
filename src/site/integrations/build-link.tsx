import { buildLoginUrl } from '@/lib/build-login-url';

export type Campaign = string;

// Server-rendered Captain link; public/site/attribution.js merges arrival UTMs on click.
export function BuildLink({ page, place, campaign, ask, className = 'btn', children = 'Build this with Captain' }: {
  page: string; place: string; campaign: Campaign; ask?: string; className?: string; children?: React.ReactNode;
}) {
  return (
    <a
      href={buildLoginUrl(page, place, campaign, ask)}
      className={className}
      data-cta={`${page}:${place}`}
      data-50a-cta=""
      rel="nofollow"
    >
      {children}
    </a>
  );
}