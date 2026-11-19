// The most connected apps in the whole catalog (most recipes first), for a hub's apps wall. Same snapshot as appsIn().
import index from '@/content/integrations/catalog/index.json';

type App = { s: string; n: string; i?: string; c: string[]; t: number; a: number; r: number };
const APPS = (index as { apps: App[] }).apps;

export function topApps(n = 30, skip: string[] = []) {
  return APPS.filter(a => a.i && !skip.includes(a.s)).sort((x, y) => y.r - x.r).slice(0, n);
}
