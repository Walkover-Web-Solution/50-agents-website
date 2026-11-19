'use client';
import { usePathname } from 'next/navigation';
import { APP_LOGIN } from '@/lib/app';

// The header's Get started (D207, D257): the page's UTMs in the server HTML, from its path (campaign seo-<family>,
// content <page>__header). A visitor's own arrival UTMs win, swapped in on click, as on every other button.
const FAMILY: Record<string, string> = { 'use-cases': 'seo-use-case', integrations: 'seo-integration', compare: 'seo-compare', guides: 'seo-guide', 'ai-agents': 'seo-hub', automations: 'seo-hub', 'browser-agents': 'seo-hub', apps: 'seo-hub' };
function url(path: string, arrived: Record<string, string> = {}) {
  const parts = path.split('/').filter(Boolean);
  const u = new URL(APP_LOGIN);
  const p = { utm_source: '50agents.com', utm_medium: 'website', utm_campaign: FAMILY[parts[0]] ?? 'seo-page', ...arrived, utm_content: `${parts.at(-1) ?? 'home'}__header` };
  Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
}
export function HeaderCta() {
  const path = usePathname() ?? '/';
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    let arrived: Record<string, string> = {};
    try {
      new URLSearchParams(location.search).forEach((v, k) => { if (k.startsWith('utm_')) arrived[k] = v; });
      if (Object.keys(arrived).length) sessionStorage.setItem('50a-utm', JSON.stringify(arrived));
      else arrived = JSON.parse(sessionStorage.getItem('50a-utm') || '{}');
    } catch {}
    e.currentTarget.href = url(path, arrived);
  };
  return <a href={url(path)} onClick={onClick} className="btn sm" data-cta="site:header" rel="nofollow">Get started</a>;
}
