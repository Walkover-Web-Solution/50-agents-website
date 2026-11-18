'use client';
import { APP_LOGIN } from '@/lib/app';

export type Campaign = string; // seo-<family>: seo-use-case, seo-integration, seo-pair, seo-guide …

function url(page: string, place: string, campaign: Campaign, ask?: string, arrived: Record<string, string> = {}) {
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

// "Build this with Captain" with the page's ask (pages-brief D5). The server HTML carries the page's own UTMs and `draft`;
// on click, the visitor's arrival utm_source, medium and campaign (this URL, else sessionStorage '50a-utm') win,
// and utm_content always stays this page and button.
export function BuildLink({ page, place, campaign, ask, className = 'btn', children = 'Build this with Captain' }: {
  page: string; place: string; campaign: Campaign; ask?: string; className?: string; children?: React.ReactNode;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    let arrived: Record<string, string> = {};
    try {
      new URLSearchParams(location.search).forEach((v, k) => { if (k.startsWith('utm_')) arrived[k] = v; });
      if (Object.keys(arrived).length) sessionStorage.setItem('50a-utm', JSON.stringify(arrived));
      else arrived = JSON.parse(sessionStorage.getItem('50a-utm') || '{}');
    } catch {}
    e.currentTarget.href = url(page, place, campaign, ask, arrived);
  };
  return <a href={url(page, place, campaign, ask)} onClick={onClick} className={className} data-cta={`${page}:${place}`} rel="nofollow">{children}</a>;
}
