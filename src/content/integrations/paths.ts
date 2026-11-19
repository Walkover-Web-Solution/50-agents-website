// The paths of this family's pages that exist (read by src/site/routes.ts). The family's builder owns this file.
// Built from the catalog snapshot (scripts/snapshot-catalog.mjs): the A to Z, the 20 categories and every app, with
// canonical slugs (slugs.ts: lowercase, one page per app, the old 50agents plugin left out); and only the pairs that exist,
// the indexable ones in their canonical order (live-pairs.json, Search S26). Every other pair is a 404, so never linked.
import index from './catalog/index.json';
import live from './live-pairs.json';
import { CATEGORIES } from './categories';
import { canon, dropped } from './slugs';

const pairPaths = live.pairs.map(k => `/integrations/${k}`);

export const PATHS: string[] = [
  '/integrations',
  ...CATEGORIES.map(c => `/integrations/category/${c.slug}`),
  ...index.apps.filter(a => !dropped(a.s)).map(a => `/integrations/${canon(a.s)}`),
  ...pairPaths,
];
