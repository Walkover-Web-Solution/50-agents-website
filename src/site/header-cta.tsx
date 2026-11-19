'use client';
import { useEffect, useState } from 'react';
import { APP_LOGIN } from '@/lib/app';

// The header's Get started: the page's UTMs from its path (campaign seo-<family>, content <page>__header);
// a visitor's own UTMs from their arrival win, as on every other button (D207).
const FAMILY: Record<string, string> = { 'use-cases': 'seo-use-case', integrations: 'seo-integration', compare: 'seo-compare', guides: 'seo-guide', learn: 'seo-learn', for: 'seo-role', 'ai-agents': 'seo-hub', automations: 'seo-hub', 'browser-agents': 'seo-hub', apps: 'seo-hub' };
export function HeaderCta() {
  const [href, setHref] = useState(APP_LOGIN);
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const page = parts.at(-1) ?? 'home';
    let arrived: Record<string, string> = {};
    try {
      new URLSearchParams(location.search).forEach((v, k) => { if (k.startsWith('utm_')) arrived[k] = v; });
      if (Object.keys(arrived).length) sessionStorage.setItem('50a-utm', JSON.stringify(arrived));
      else arrived = JSON.parse(sessionStorage.getItem('50a-utm') || '{}');
    } catch {}
    const u = new URL(APP_LOGIN);
    const p = { utm_source: '50agents.com', utm_medium: 'website', utm_campaign: FAMILY[parts[0]] ?? 'seo-page', ...arrived, utm_content: `${page}__header` };
    Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v));
    setHref(u.href);
  }, []);
  return <a href={href} className="btn sm" data-cta="site:header" rel="nofollow">Get started</a>;
}
