// The sitemap index and one sitemap per family (pages-brief D2): only indexable pages, each with the date its content
// last changed (the content file's date, or the catalog snapshot's), never today's date stamped on everything.
import { USE_CASES } from '@/content/use-cases';
import { PATHS as HUBS } from '@/content/hubs/paths';
import { PATHS as COMPARE } from '@/content/compare/paths';
import { PATHS as GUIDES } from '@/content/guides/paths';
import { PATHS as LEARN } from '@/content/learn/paths';
import { PATHS as FOR } from '@/content/for/paths';
import { PATHS as PAGES } from '@/content/pages/paths';
import index from '@/content/integrations/catalog/index.json';
import pairs from '@/content/integrations/catalog/pairs.json';
import { CATEGORIES } from '@/content/integrations/categories';
import { appIndexable, pairIndexable } from '@/site/integrations/data';

const BASE = 'https://50agents.com';
const HOME_UPDATED = '2026-11-18'; // the landing's last change: update with each landing deploy
const WRITTEN = '2026-11-19'; // the written families' first version; per-page dates replace this as pages are revised
type Entry = { path: string; date: string };

const noindex = new Set(['/contact']); // pages set to noindex until a fact is confirmed

export const FAMILIES: Record<string, () => Entry[]> = {
  main: () => [{ path: '/', date: HOME_UPDATED }, ...PAGES.filter(p => !noindex.has(p)).map(path => ({ path, date: WRITTEN }))],
  'use-cases': () => USE_CASES.map(u => ({ path: `/use-cases/${u.slug}`, date: u.updated })),
  hubs: () => HUBS.map(path => ({ path, date: WRITTEN })),
  compare: () => COMPARE.map(path => ({ path, date: WRITTEN })),
  guides: () => GUIDES.map(path => ({ path, date: WRITTEN })),
  learn: () => LEARN.map(path => ({ path, date: WRITTEN })),
  for: () => FOR.map(path => ({ path, date: WRITTEN })),
  categories: () => [{ path: '/integrations', date: index.read }, ...CATEGORIES.map(c => ({ path: `/integrations/category/${c.slug}`, date: index.read }))],
  integrations: () => index.apps.filter(a => appIndexable({ t: a.t, a: a.a, r: a.r })).map(a => ({ path: `/integrations/${a.s}`, date: index.read })),
  pairs: () => pairs.pairs.filter(p => pairIndexable(p as never)).map(p => ({ path: `/integrations/${p.a}/${p.b}`, date: pairs.read })),
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
