// App names, icons and category members from the catalog snapshot (src/content/integrations/catalog/index.json).
import index from '@/content/integrations/catalog/index.json';

type App = { s: string; n: string; i?: string; c: string[]; t: number; a: number; r: number };
const APPS = (index as { apps: App[] }).apps;
const BY = new Map(APPS.map(a => [a.s, a]));

export const appName = (slug: string) => BY.get(slug)?.n ?? slug;
export const appIcon = (slug: string) => BY.get(slug)?.i;
/** The best-connected apps of a category (most recipes first), for the apps wall. */
export function appsIn(category: string, n = 28, skip: string[] = []) {
  return APPS.filter(a => a.c.includes(category) && a.i && !skip.includes(a.s)).sort((x, y) => y.r - x.r).slice(0, n);
}
