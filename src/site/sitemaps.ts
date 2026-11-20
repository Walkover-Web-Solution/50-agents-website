// The sitemap index and one sitemap per family (pages-brief D2): only indexable pages, each with the date its content
// last changed (the content file's date, or the catalog snapshot's), never today's date stamped on everything.
import { PAGES as USE_CASES } from '@/content/use-cases/pages';
import { PATHS as HUBS } from '@/content/hubs/paths';
import { PATHS as COMPARE } from '@/content/compare/paths';
import { PATHS as GUIDES } from '@/content/guides/paths';
import { PATHS as LEARN } from '@/content/learn/paths';
import { PATHS as FOR } from '@/content/for/paths';
import { PATHS as PAGES } from '@/content/pages/paths';
import index from '@/content/integrations/catalog/index.json';
import { CATEGORIES } from '@/content/integrations/categories';
import { appTier, catalog, pairTier, pairs } from '@/site/integrations/data';
import { CONTACT_EMAIL, SUPPORT_OPEN } from '@/content/pages/support';

const BASE = 'https://50agents.com';
const HOME_UPDATED = '2026-11-18'; // the landing's last change: update with each landing deploy
const WRITTEN = '2026-11-19'; // the written families' first version; per-page dates replace this as pages are revised
type Entry = { path: string; date: string };

// Pages set to noindex until a fact is confirmed: /contact until its email is, /support until no channel is a placeholder.
const noindex = new Set([...(CONTACT_EMAIL ? [] : ['/contact']), ...(SUPPORT_OPEN.length ? ['/support'] : [])]);

// Each family has its own static route, src/app/sitemaps/<name>.xml/route.ts: add one with a new family.
export const FAMILIES: Record<string, () => Entry[]> = {
  main: () => [{ path: '/', date: HOME_UPDATED }, ...PAGES.filter(p => !noindex.has(p)).map(path => ({ path, date: WRITTEN }))],
  'use-cases': () => USE_CASES.map(u => ({ path: `/use-cases/${u.slug}`, date: u.updated })),
  hubs: () => HUBS.map(path => ({ path, date: WRITTEN })),
  compare: () => COMPARE.map(path => ({ path, date: WRITTEN })),
  guides: () => GUIDES.map(path => ({ path, date: WRITTEN })),
  categories: () => [{ path: '/integrations', date: index.read }, ...CATEGORIES.map(c => ({ path: `/integrations/category/${c.slug}`, date: index.read }))],
  // Integrations and pairs by tier (Search review 01, S20): the core and a test cohort, each in its own sitemap.
  integrations: () => catalog().apps.filter(a => appTier(a.s) === 'core').map(a => ({ path: `/integrations/${a.s}`, date: index.read })),
  'integrations-test': () => catalog().apps.filter(a => appTier(a.s) === 'test').map(a => ({ path: `/integrations/${a.s}`, date: index.read })),
  // The rest of the app pages (fixes-02 item 4, S38): their own cohort, so Search can watch them apart.
  'integrations-rest': () => catalog().apps.filter(a => appTier(a.s) === 'rest').map(a => ({ path: `/integrations/${a.s}`, date: index.read })),
  pairs: () => pairs().list.filter(p => pairTier(p) === 'core').map(p => ({ path: `/integrations/${p.a}/${p.b}`, date: index.read })),
  'pairs-test': () => pairs().list.filter(p => pairTier(p) === 'test').map(p => ({ path: `/integrations/${p.a}/${p.b}`, date: index.read })),
  // App × App tier 2 (Search's pairs-tier-2 brief): its own cohort.
  'pairs-2': () => pairs().list.filter(p => pairTier(p) === 'pairs2').map(p => ({ path: `/integrations/${p.a}/${p.b}`, date: index.read })),
};

const xml = (body: string) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, { headers: { 'content-type': 'application/xml; charset=utf-8' } });

export function sitemapIndex() {
  const items = Object.entries(FAMILIES).map(([name, f]) => {
    const latest = f().reduce((m, e) => (e.date > m ? e.date : m), '');
    return `<sitemap><loc>${BASE}/sitemaps/${name}.xml</loc>${latest ? `<lastmod>${latest}</lastmod>` : ''}</sitemap>`;
  });
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items.join('')}</sitemapindex>`);
}

export function familySitemap(name: string) {
  const f = FAMILIES[name];
  if (!f) return new Response('Not found', { status: 404 });
  const urls = f().map(e => `<url><loc>${BASE}${e.path === '/' ? '/' : e.path}</loc><lastmod>${e.date}</lastmod></url>`);
  return xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
}
