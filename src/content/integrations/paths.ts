// The paths of this family's pages that exist (read by src/site/routes.ts). The family's builder owns this file.
// Built from the catalog snapshot (scripts/snapshot-catalog.mjs): the A to Z, the 20 categories, every app and every pair,
// with canonical slugs (slugs.ts: lowercase, one page per app, the old 50agents plugin left out).
import index from './catalog/index.json';
import pairs from './catalog/pairs.json';
import { CATEGORIES } from './categories';
import { canon, dropped, EXCLUDED } from './slugs';

const out = (s: string) => EXCLUDED.has(s.toLowerCase());
const pairPaths = new Set<string>();
for (const p of pairs.pairs) {
  if (out(p.a) || out(p.b)) continue;
  const a = canon(p.a), b = canon(p.b);
  if (a !== b && !pairPaths.has(`/integrations/${b}/${a}`)) pairPaths.add(`/integrations/${a}/${b}`);
}

export const PATHS: string[] = [
  '/integrations',
  ...CATEGORIES.map(c => `/integrations/category/${c.slug}`),
  ...index.apps.filter(a => !dropped(a.s)).map(a => `/integrations/${canon(a.s)}`),
  ...pairPaths,
];
