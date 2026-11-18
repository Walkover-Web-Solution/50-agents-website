// The integration family's data: viaSocket's catalog snapshot (scripts/snapshot-catalog.mjs), read at build time only.
// Pages import nothing heavy: the index (every app, a few fields each) and one app's file per page.
import fs from 'node:fs';
import path from 'node:path';

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

let _index: { read: string; apps: IndexApp[]; by: Map<string, IndexApp> } | null = null;
export function catalog() {
  if (!_index) {
    const d = json<{ read: string; apps: IndexApp[] }>('index.json');
    _index = { ...d, by: new Map(d.apps.map(a => [a.s, a])) };
  }
  return _index;
}

let _pairs: { list: Pair[]; by: Map<string, Pair> } | null = null;
export function pairs() {
  if (!_pairs) {
    const d = json<{ pairs: Pair[] }>('pairs.json');
    _pairs = { list: d.pairs, by: new Map(d.pairs.map(p => [`${p.a}|${p.b}`, p])) };
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

const appCache = new Map<string, AppFile>();
export function loadApp(slug: string): AppFile | null {
  if (appCache.has(slug)) return appCache.get(slug)!;
  if (!catalog().by.has(slug)) return null;
  const a = json<AppFile>(`apps/${slug}.json`);
  appCache.set(slug, a);
  return a;
}

// B8 thresholds.
export const appIndexable = (a: { t: number; a: number; r: number }) => a.t + a.a >= 5 && a.r >= 1;
export const pairIndexable = (p: Pair) => p.n >= 3;

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
  if (!d || /^(added|conditionally|update .* sample response|fixed|changed)\b/i.test(d) || /sample response/i.test(d)) return '';
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

let _rank: Map<string, number> | null = null;
const rankMap = () => (_rank ??= new Map(catalog().apps.map((a, i) => [a.s, i])));

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
