import { APP_LOGIN } from '@/lib/app';

/** Captain sign-up URL with page UTMs and optional draft (server-rendered in HTML). */
export function buildLoginUrl(
  page: string,
  place: string,
  campaign: string,
  ask?: string,
  arrived: Record<string, string> = {}
): string {
  const u = new URL(APP_LOGIN);
  const p: Record<string, string> = {
    utm_source: arrived.utm_source || '50agents.com',
    utm_medium: arrived.utm_medium || 'website',
    utm_campaign: arrived.utm_campaign || campaign,
    utm_content: `${page}__${place}`,
  };
  if (ask) p.draft = ask.slice(0, 499);
  Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
}

const FAMILY: Record<string, string> = {
  'use-cases': 'seo-use-case',
  integrations: 'seo-integration',
  compare: 'seo-compare',
  guides: 'seo-guide',
  'ai-agents': 'seo-hub',
  automations: 'seo-hub',
  'browser-agents': 'seo-hub',
  apps: 'seo-hub',
};

export function headerLoginUrl(pathname: string, arrived: Record<string, string> = {}): string {
  const parts = pathname.split('/').filter(Boolean);
  const u = new URL(APP_LOGIN);
  const p = {
    utm_source: '50agents.com',
    utm_medium: 'website',
    utm_campaign: FAMILY[parts[0]] ?? 'seo-page',
    ...arrived,
    utm_content: `${parts.at(-1) ?? 'home'}__header`,
  };
  Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
}