// The paths of this family's pages that exist (read by src/site/routes.ts). The family's builder owns this file.
// Built from the catalog snapshot (scripts/snapshot-catalog.mjs): the A to Z, the 20 categories, every app and every pair.
import index from './catalog/index.json';
import pairs from './catalog/pairs.json';
import { CATEGORIES } from './categories';

export const PATHS: string[] = [
  '/integrations',
  ...CATEGORIES.map(c => `/integrations/category/${c.slug}`),
  ...index.apps.map(a => `/integrations/${a.s}`),
  ...pairs.pairs.map(p => `/integrations/${p.a}/${p.b}`),
];
