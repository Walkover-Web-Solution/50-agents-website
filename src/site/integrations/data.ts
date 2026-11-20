// The integration family's data: viaSocket's catalog snapshot (scripts/snapshot-catalog.mjs), read at build time only.
// Pages import nothing heavy: the index (every app, a few fields each) and one app's file per page.
import fs from 'node:fs';
import path from 'node:path';
import { canon, dropped, EXCLUDED } from '@/content/integrations/slugs';
import gate from '@/content/integrations/index-gate.json';
import cohort from '@/content/integrations/test-cohort.json';

export type IndexApp = { s: string; n: string; i: string; c: string[]; t: number; a: number; r: number; u?: 1 };
export type Event = { n: string; d: string; t: 'trigger' | 'action'; k: 'hook' | 'polling' };
export type Recipe = { ta: string; te: string; aa: string; ae: string };
export type AppFile = {
  slug: string; name: string; description: string; icon: string; domain: string; rank: number;
  labels: string[]; categories: string[]; eventsRead: boolean; events: Event[]; recipes: Recipe[];
};
export type Pair = { a: string; b: string; n: number };

const DIR = path.join(process.cwd(), 'src/content/integrations/catalog');
const json = <T,>(f: string): T => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));

let _index: { read: string; apps: IndexApp[]; by: Map<string, IndexApp>; raw: Map<string, string>; rank: Map<string, number> } | null = null;
/** The catalog with canonical slugs (lowercase, duplicates and the old 50agents plugin left out), in popularity order. */
export function catalog() {
  if (!_index) {
    const d = json<{ read: string; apps: IndexApp[] }>('index.json');
    const apps = d.apps.filter(a => !dropped(a.s)).map(a => ({ ...a, s: canon(a.s) }));
    _index = { read: d.read, apps, by: new Map(apps.map(a => [a.s, a])), raw: new Map(d.apps.filter(a => !dropped(a.s)).map(a => [canon(a.s), a.s])), rank: new Map(apps.map((a, i) => [a.s, i])) };
  }
  return _index;
}
/** Every raw slug that is not canonical (mixed case or a duplicate), with the canonical slug it redirects to. */
export function rawRedirects(): [string, string][] {
  const d = json<{ apps: IndexApp[] }>('index.json');
  return d.apps.filter(a => !EXCLUDED.has(a.s.toLowerCase()) && a.s !== canon(a.s) && catalog().by.has(canon(a.s))).map(a => [a.s, canon(a.s)]);
}

let _pairs: { list: Pair[]; by: Map<string, Pair>; raw: Pair[] } | null = null;
export function pairs() {
  if (!_pairs) {
    const d = json<{ pairs: Pair[] }>('pairs.json');
    const by = new Map<string, Pair>();
    for (const p of d.pairs) {
      if (EXCLUDED.has(p.a.toLowerCase()) || EXCLUDED.has(p.b.toLowerCase())) continue;
      const a = canon(p.a), b = canon(p.b);
      if (a === b || !catalog().by.has(a) || !catalog().by.has(b) || by.has(`${a}|${b}`) || by.has(`${b}|${a}`)) continue;
      by.set(`${a}|${b}`, { a, b, n: p.n });
    }
    _pairs = { list: [...by.values()], by, raw: d.pairs.filter(p => !EXCLUDED.has(p.a.toLowerCase()) && !EXCLUDED.has(p.b.toLowerCase())) };
  }
  return _pairs;
}
/** The pair as stored (canonical order), whichever order it is asked in. */
export function findPair(x: string, y: string): { pair: Pair; reversed: boolean } | null {
  const by = pairs().by;
  const p = by.get(`${x}|${y}`);
  if (p) return { pair: p, reversed: false };
  const q = by.get(`${y}|${x}`);
  return q ? { pair: q, reversed: true } : null;
}

// A recipe whose action only looks something up (find, search, get, list, query) does nothing with the result: left out.
const LOOKUP = /^(find|search|get|list|lookup|look up|retrieve|fetch|read|query|view|check|count|describe)\b/i;
export const doesSomething = (r: Recipe) => !LOOKUP.test(r.ae.replace(/_/g, ' ').trim());

const appCache = new Map<string, AppFile>();
/** One app's file, by canonical slug, with canonical slugs in its recipes and lookup-only recipes left out. */
export function loadApp(slug: string): AppFile | null {
  if (appCache.has(slug)) return appCache.get(slug)!;
  const raw = catalog().raw.get(slug);
  if (!raw) return null;
  const a = json<AppFile>(`apps/${raw}.json`);
  const seen = new Set<string>();
  const recipes = a.recipes
    .map(r => ({ ...r, ta: canon(r.ta), aa: canon(r.aa) }))
    .filter(r => catalog().by.has(r.ta) && catalog().by.has(r.aa) && doesSomething(r))
    .filter(r => { const k = `${r.ta}|${r.te}|${r.aa}|${r.ae}`; return !seen.has(k) && !!seen.add(k); });
  const app = { ...a, slug, recipes };
  appCache.set(slug, app);
  return app;
}

/** Every recipe between two apps, the first app's recipes first. */
export function pairRecipes(a: string, b: string): Recipe[] {
  const A = loadApp(a), B = loadApp(b);
  const seen = new Set<string>();
  const all = [...(A?.recipes ?? []), ...(B?.recipes ?? [])].filter(r => (r.ta === a && r.aa === b) || (r.ta === b && r.aa === a))
    .filter(r => { const k = `${r.ta}|${r.te}|${r.aa}|${r.ae}`; return !seen.has(k) && !!seen.add(k); });
  return all.sort((r, s) => Number(s.ta === a) - Number(r.ta === a));
}

/** The page the pipeline wrote for an app (src/content/integrations/pages/<slug>.json), if there is one. */
const PAGES_DIR = path.join(process.cwd(), 'src/content/integrations/pages');
export function writtenPage<T>(slug: string): T | null {
  const f = path.join(PAGES_DIR, `${slug}.json`);
  return fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, 'utf8')) as T) : null;
}
/** The lines the pair pipeline wrote for a pair (src/content/integrations/pairs/<a>__<b>.json, canonical order), if there are any. */
const PAIRS_DIR = path.join(process.cwd(), 'src/content/integrations/pairs');
export function pairLines(a: string, b: string): import('./types').PairLines | null {
  const f = path.join(PAIRS_DIR, `${a}__${b}.json`);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
}
export const writtenSlugs = () => (fs.existsSync(PAGES_DIR) ? fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')) : []);

// The index rule (Search review 01, section 1: Search's call under S8, updated S20 by Jii). Every page renders; the tier
// sets robots and the sitemap. Slug hygiene and the lookup-only filter (above) apply to every tier.
// - core: an app in the catalog's top 200 by popularity (the order of plugins/all) with 5 or more triggers and actions
//   and at least 1 recipe; a pair with both apps in the top 100 and 3 or more recipes. Sitemaps integrations, pairs.
// - test: the apps whose old /ai-agents/<slug> pages Google already showed (test-cohort.json, from
//   gtm/seo/research/02-old-pages.md), unless in the core; 150 pairs with both apps in the top 200 and 2 or more
//   recipes, most recipes first, not in the core. Sitemaps integrations-test, pairs-test.
// - rest: every other app page with at least one trigger or action (Jii, 20 Nov, fixes-02 item 4, S38: "I also want the
//   remaining pages ... so that entire family gets on live"). Sitemap integrations-rest, its own cohort.
// - none: an app with no trigger and no action, a page that fails the uniqueness gate, and every pair outside core and
//   test: noindex, follow, in no sitemap.
// A page that fails the uniqueness gate (5-word shingle overlap of 0.5 or more with another indexed page of its family;
// scripts/pages/uniqueness-integrations.mjs writes the list) is none, and so is a pair with no lines of its own (S24: a pair
// whose lines could not be written honestly stays noindex), and the test cohort fills from the next in line.
export type Tier = 'core' | 'test' | 'rest' | 'pairs2' | 'none';
const GATE_FAILED = new Set<string>(gate.failed);
const gateFailed = (p: string) => GATE_FAILED.has(p);
let _appTiers: Map<string, Tier> | null = null;
function appTiers() {
  if (_appTiers) return _appTiers;
  const m = new Map<string, Tier>();
  const test = new Set<string>(cohort.apps);
  catalog().apps.forEach((a, rank) => {
    if (gateFailed(`/integrations/${a.s}`)) return;
    const app = loadApp(a.s);
    if (!app) return;
    if (rank < 200 && app.events.length >= 5 && app.recipes.length >= 1) m.set(a.s, 'core');
    else if (test.has(a.s)) m.set(a.s, 'test');
    else if (app.events.length >= 1) m.set(a.s, 'rest');
  });
  return (_appTiers = m);
}
export const appTier = (slug: string): Tier => appTiers().get(slug) ?? 'none';

let _pairTiers: Map<string, Tier> | null = null;
function pairTiers() {
  if (_pairTiers) return _pairTiers;
  const m = new Map<string, Tier>();
  const r = catalog().rank;
  const near = pairs().list.filter(p => (r.get(p.a) ?? 1e9) < 200 && (r.get(p.b) ?? 1e9) < 200 && !gateFailed(`/integrations/${p.a}/${p.b}`) && !!pairLines(p.a, p.b))
    .map(p => ({ p, n: pairRecipes(p.a, p.b).length }));
  for (const { p, n } of near) if ((r.get(p.a) ?? 1e9) < 100 && (r.get(p.b) ?? 1e9) < 100 && n >= 3) m.set(`${p.a}|${p.b}`, 'core');
  near.filter(x => x.n >= 2 && !m.has(`${x.p.a}|${x.p.b}`)).sort((x, y) => y.n - x.n).slice(0, 150).forEach(x => m.set(`${x.p.a}|${x.p.b}`, 'test'));
  // pairs2 (App × App tier 2, Search's pairs-tier-2 brief): both apps have an indexable page, 3 or more real templates
  // between them (lookup-only actions left out), their own written lines, and the uniqueness gate passed. Sitemap pairs-2.
  const LOOKUP = /^(find|search|get|list|lookup|look up|retrieve|fetch|read|query|view|check|count|describe)\b/i;
  for (const p of pairs().list) {
    const k = `${p.a}|${p.b}`;
    if (m.has(k) || appTier(p.a) === 'none' || appTier(p.b) === 'none' || gateFailed(`/integrations/${p.a}/${p.b}`) || !pairLines(p.a, p.b)) continue;
    if (pairRecipes(p.a, p.b).filter(r => !LOOKUP.test(r.ae.replace(/_/g, ' '))).length >= 3) m.set(k, 'pairs2');
  }
  return (_pairTiers = m);
}
export const pairTier = (p: { a: string; b: string }): Tier => pairTiers().get(`${p.a}|${p.b}`) ?? 'none';

export const appIndexable = (a: { s: string }) => appTier(a.s) !== 'none';
export const pairIndexable = (p: { a: string; b: string }) => pairTier(p) !== 'none';

export const readDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// ---- words built from the data, never invented ----

const KEEP = /[A-Z].*[A-Z]|\d|^[A-Z]{2,}$/; // words with inner capitals, digits or all caps (CRM, URL, BlockKit) keep their case
/** An event name in a sentence: "New Charge Is Created" -> "new charge is created"; app names keep their case. */
export function inSentence(name: string, keep: string[] = []): string {
  const keepWords = new Set(keep.flatMap(k => k.split(/\s+/)));
  return name
    .replace(/_/g, ' ')
    .split(/\s+/)
    .map(w => (KEEP.test(w) || keepWords.has(w) ? w : w.toLowerCase()))
    .join(' ');
}

/** A trigger as a clause after "when": "New Charge Is Created" -> "new charge is created"; "Delete Contact" -> "“delete contact” happens". */
export function triggerPhrase(name: string, app: string): string {
  let te = inSentence(name, [app, 'Google', 'Slack', 'HubSpot', 'Stripe', 'Shopify', 'Gmail']).replace(/^(when|whenever)\s+/i, '');
  te = te.replace(new RegExp(`\\s+in\\s+${escape(app)}$`, 'i'), '');
  if (/^(update|delete|merge|create|add|cancel|deactivate|mark|edit|remove|watch|get|retrieve|trigger|runs?)\b/.test(te)) te = `“${te}” happens`;
  return te;
}
export function actionPhrase(name: string, app: string): string {
  return inSentence(name, [app, 'Google', 'Slack', 'HubSpot', 'Stripe', 'Shopify', 'Gmail']).replace(new RegExp(`\\s+in\\s+${escape(app)}$`, 'i'), '');
}
/** "when <trigger> in <App>, <action> in <Other>" from a recipe's real names. */
export function recipeClause(r: Recipe, names: (s: string) => string): string {
  const tn = names(r.ta), an = names(r.aa);
  return `when ${triggerPhrase(r.te, tn)} in ${tn}, ${actionPhrase(r.ae, an)} in ${an}`;
}
/** The ask for one recipe (B8): "Set up an automation: when <trigger> in <App>, <action> in <Other>", under 500 characters. */
export function recipeAsk(r: Recipe, names: (s: string) => string): string {
  return `Set up an automation: ${recipeClause(r, names)}`.slice(0, 480);
}
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** A catalog description, shown only when it reads as a description (some are change notes, not descriptions). */
export function plainDesc(d: string): string {
  if (!d || /^(added|conditionally|update .* sample response|update .* logic|fixed|changed)\b/i.test(d) || /sample response/i.test(d)) return '';
  return d.charAt(0).toUpperCase() + d.slice(1);
}

const STOP = new Set(('a an the in on of to for by from with and or new create created update updated delete deleted get find search list lookup add remove send set when is are be any all your my it its run runs make retrieve fetch by id ids using one more multiple via into as at instant watch trigger triggers details detail information info complete edit edited cancel cancelled canceled mark marked paid ends end attached detached automatically occurs succeeds accepted posted arrives join joined leave or upsert batch permanently clear format rename copy move view open chat using ai').split(' '));
const sing = (w: string) => (w.endsWith('ies') ? w.slice(0, -3) + 'y' : w.endsWith('sses') ? w.slice(0, -2) : w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const plural = (w: string) => (w.endsWith('y') && !/[aeiou]y$/.test(w) ? w.slice(0, -1) + 'ies' : w.endsWith('s') || w.endsWith('x') || w.endsWith('ch') ? w + 'es' : w + 's');

/** Group an app's events by the thing they act on (contacts, deals, orders), from the words in their names. */
export function groupEvents(events: Event[]): { label: string; triggers: Event[]; actions: Event[] }[] {
  const words = (e: Event) => [...new Set(e.n.replace(/[_/]/g, ' ').replace(/'s\b/g, '').toLowerCase().match(/[a-z]+/g) ?? [])].map(sing).filter(w => w.length > 2 && !STOP.has(w));
  const freq = new Map<string, number>();
  events.forEach(e => words(e).forEach(w => freq.set(w, (freq.get(w) ?? 0) + 1)));
  const groups = new Map<string, { triggers: Event[]; actions: Event[] }>();
  for (const e of events) {
    const best = words(e).filter(w => (freq.get(w) ?? 0) >= 2).sort((x, y) => (freq.get(y)! - freq.get(x)!) || x.localeCompare(y))[0] ?? '';
    const g = groups.get(best) ?? groups.set(best, { triggers: [], actions: [] }).get(best)!;
    (e.t === 'trigger' ? g.triggers : g.actions).push(e);
  }
  const out = [...groups.entries()].filter(([k]) => k).map(([k, g]) => ({ label: cap(plural(k)), ...g }));
  out.sort((x, y) => y.triggers.length + y.actions.length - (x.triggers.length + x.actions.length) || x.label.localeCompare(y.label));
  const other = groups.get('');
  if (other) out.push({ label: out.length ? 'Everything else' : 'Triggers and actions', ...other });
  return out;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The partners an app has recipes with: those with 3 or more recipes first, each group by the partner's catalog rank. */
export function partnersOf(app: AppFile): { slug: string; n: number }[] {
  const m = new Map<string, number>();
  for (const r of app.recipes) {
    const o = r.ta === app.slug ? r.aa : r.ta;
    m.set(o, (m.get(o) ?? 0) + 1);
  }
  const rank = rankMap();
  return [...m.entries()].map(([slug, n]) => ({ slug, n })).sort((x, y) => Number(y.n >= 3) - Number(x.n >= 3) || (rank.get(x.slug) ?? 1e9) - (rank.get(y.slug) ?? 1e9));
}

const rankMap = () => catalog().rank;

/** Recipes ordered for show: better known partners first, spread so one partner or one trigger doesn't fill the top. */
export function topRecipes(app: AppFile): Recipe[] {
  const rank = rankMap();
  const other = (r: Recipe) => (r.ta === app.slug ? r.aa : r.ta);
  const sorted = [...app.recipes].sort((x, y) => (rank.get(other(x)) ?? 1e9) - (rank.get(other(y)) ?? 1e9));
  const out: Recipe[] = [], used = new Set<Recipe>();
  for (const cap of [1, 2]) {
    const perPartner = new Map<string, number>(), perEvent = new Map<string, number>();
    out.forEach(r => { perPartner.set(other(r), (perPartner.get(other(r)) ?? 0) + 1); const e = r.ta === app.slug ? r.te : r.ae; perEvent.set(e, (perEvent.get(e) ?? 0) + 1); });
    for (const r of sorted) {
      if (used.has(r) || out.length >= 12) continue;
      const e = r.ta === app.slug ? r.te : r.ae;
      if ((perPartner.get(other(r)) ?? 0) >= cap || (perEvent.get(e) ?? 0) >= cap + 1) continue;
      out.push(r); used.add(r);
      perPartner.set(other(r), (perPartner.get(other(r)) ?? 0) + 1); perEvent.set(e, (perEvent.get(e) ?? 0) + 1);
    }
  }
  return [...out, ...sorted.filter(r => !used.has(r))];
}

export const pairPath = (p: Pair) => `/integrations/${p.a}/${p.b}`;
export const nameOf = (s: string) => catalog().by.get(s)?.n ?? s;
export const iconOf = (s: string) => catalog().by.get(s)?.i ?? '';
