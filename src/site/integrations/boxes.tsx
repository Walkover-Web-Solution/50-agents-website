'use client';
import { useEffect, useRef, useState } from 'react';

// The integration family's list boxes (D254, D260). Every item is in the server HTML (crawlers read them all); these only
// hide what is not on screen yet. None of them scrolls inside itself (D260): they grow in place with "Load more" or page.

const match = (el: HTMLElement, term: string) => !term || (el.dataset.q ?? '').includes(term);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

/** A list box (D260): tabs (one panel each), a search, and "Load more" that reveals more rows in place, so the box grows
 *  with the page. It never scrolls inside itself and never holds the wheel. Children are the panels, rendered on the
 *  server: `<ul data-panel={key}>` of `<li data-q="...">`, the first panel shown, items after the first `per` hidden.
 *  The search filters every item; its matches show `per` at a time too. */
export function ListBox({ tabs, search, per, empty = 'Nothing here matches', children }: {
  tabs: { key: string; label: React.ReactNode; name?: string }[]; search?: string; per: number; empty?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(tabs[0]?.key ?? '');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState<Record<string, number>>({});
  const [left, setLeft] = useState(0);
  const [hits, setHits] = useState<Record<string, number>>({});
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const counts: Record<string, number> = {};
    let rest = 0;
    root.querySelectorAll<HTMLElement>('[data-panel]').forEach(panel => {
      const key = panel.dataset.panel!;
      const on = key === tab;
      panel.hidden = !on;
      const items = [...panel.querySelectorAll<HTMLElement>(':scope > li')];
      const n = shown[key] ?? per;
      const hit = items.filter(li => match(li, term));
      counts[key] = hit.length;
      if (!on) return;
      const vis = new Set(hit.slice(0, n));
      items.forEach(li => { li.hidden = !vis.has(li); });
      rest = Math.max(0, hit.length - n);
    });
    setHits(counts);
    setLeft(rest);
  }, [tab, term, shown, per]);

  const pick = (key: string) => setTab(key);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    pick(next.key);
    ref.current?.querySelector<HTMLElement>(`[data-tab="${next.key}"]`)?.focus();
  };
  const none = term && (hits[tab] ?? 0) === 0;
  const elsewhere = none ? tabs.filter(t => t.key !== tab && (hits[t.key] ?? 0) > 0).sort((x, y) => (hits[y.key] ?? 0) - (hits[x.key] ?? 0))[0] : undefined;

  return (
    <div ref={ref} className="ig4-lb">
      {(tabs.length > 1 || search) && (
        <div className="ig4-lb-bar">
          {tabs.length > 1 ? (
            <div className="ig4-tabs" role="tablist">
              {tabs.map((t, i) => (
                <button key={t.key} type="button" role="tab" data-tab={t.key} aria-label={t.name} aria-selected={t.key === tab} tabIndex={t.key === tab ? 0 : -1} onClick={() => pick(t.key)} onKeyDown={e => onKey(e, i)}>
                  {t.label}{term ? <span className="ig4-tab-n">{hits[t.key] ?? 0}</span> : null}
                </button>
              ))}
            </div>
          ) : <span />}
          {search && (
            <label className="ig4-find">
              <SearchIcon />
              <input type="search" value={q} onChange={e => { setQ(e.target.value); setShown({}); }} placeholder={search} aria-label={search} />
            </label>
          )}
        </div>
      )}
      <div className="ig4-box">
        {children}
        {none && (
          <p className="ig4-none" role="status">
            {empty} &ldquo;{q.trim()}&rdquo;.{elsewhere && <> <button type="button" onClick={() => pick(elsewhere.key)}>See it in {elsewhere.name ?? (typeof elsewhere.label === 'string' ? elsewhere.label : 'the other tab')}</button></>}
          </p>
        )}
        {left > 0 && <div className="ig4-more"><button type="button" className="btn sm ghost" onClick={() => setShown(s => ({ ...s, [tab]: (s[tab] ?? per) + per }))}>Load more</button></div>}
      </div>
    </div>
  );
}

/** The page numbers to show (D260): the first, the last, the current one and its neighbours, with gaps as null. */
export function pageRange(cur: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  const keep = new Set([0, total - 1, cur - 1, cur, cur + 1]);
  if (cur <= 3) [1, 2, 3, 4].forEach(i => keep.add(i));
  if (cur >= total - 4) [total - 5, total - 4, total - 3, total - 2].forEach(i => keep.add(i));
  const xs = [...keep].filter(i => i >= 0 && i < total).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  xs.forEach((x, i) => { if (i && x - xs[i - 1] > 1) out.push(null); out.push(x); });
  return out;
}

const Arrow = ({ left }: { left?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{left ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}</svg>
);

/** The directory's main column (D260): its heading and one search over every app, the server-rendered grid (children:
 *  `[data-app]` tiles, the first `per` shown), and numbered pages at the bottom of the same box: previous, a compact range
 *  of page numbers, next. Every tile stays in the HTML; the other pages are only hidden. The search covers every app and
 *  its matches are paged the same way. */
export function Directory({ per, total, label, head, children }: { per: number; total: number; label: string; head: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(total);
  const term = q.trim().toLowerCase();
  const pages = Math.max(1, Math.ceil(count / per));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tiles = [...root.querySelectorAll<HTMLElement>('[data-app]')];
    const hits = tiles.filter(t => match(t, term));
    const on = new Set(hits.slice(page * per, page * per + per));
    tiles.forEach(t => { t.hidden = !on.has(t); });
    setCount(hits.length);
  }, [term, page, per]);

  const go = (n: number) => {
    setPage(n);
    const top = ref.current?.closest('.ig4-dir')?.getBoundingClientRect().top ?? 0;
    if (top < 0) ref.current?.closest('.ig4-dir')?.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={ref} className="ig4-dir-main">
      <div className="ig4-dir-bar">
        {head}
        <label className="ig4-find">
          <SearchIcon />
          <input type="search" value={q} onChange={e => { setQ(e.target.value); setPage(0); }} placeholder={label} aria-label={label} />
        </label>
      </div>
      {children}
      {count === 0 && <p className="ig4-none" role="status">No app here matches &ldquo;{q.trim()}&rdquo;. Try another name, or tell Captain the job and it says which apps it needs.</p>}
      {pages > 1 && (
        <nav className="ig4-pager" aria-label="Pages">
          <button type="button" className="ig4-pg-step" onClick={() => go(page - 1)} disabled={page === 0}><Arrow left /><span>Previous</span></button>
          <ol>
            {pageRange(page, pages).map((n, i) => n === null
              ? <li key={`gap${i}`} className="ig4-pg-gap" aria-hidden="true">&hellip;</li>
              : <li key={n}><button type="button" onClick={() => go(n)} aria-current={n === page ? 'page' : undefined} aria-label={`Page ${n + 1}`}>{n + 1}</button></li>)}
          </ol>
          <button type="button" className="ig4-pg-step" onClick={() => go(page + 1)} disabled={page >= pages - 1}><span>Next</span><Arrow /></button>
        </nav>
      )}
    </div>
  );
}

/** Triggers and actions (D260): two equal columns, triggers left and actions right, each with its own head and count,
 *  showing its first `per` and then its own "Load more" that reveals more in place. Nothing scrolls inside itself. One
 *  search over both columns (its matches are shown `per` at a time too). A pair adds an app switcher above the columns.
 *  Children are rendered on the server: `[data-board]` panels (one per app, the first shown) of `[data-col]` columns,
 *  each with a `[data-n]` count, a `ul` of `li[data-q]` (after the first `per` hidden), a `[data-none]` line and a
 *  `[data-more]` button. Every item stays in the HTML. */
export function EventBoard({ apps, search, per, children }: { apps?: { key: string; name: string; label: React.ReactNode }[]; search: string; per: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState(apps?.[0]?.key ?? '');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState<Record<string, number>>({});
  const [hits, setHits] = useState<Record<string, number>>({});
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const perApp: Record<string, number> = {};
    root.querySelectorAll<HTMLElement>('[data-board]').forEach(panel => {
      const key = panel.dataset.board!;
      if (apps) panel.hidden = key !== app;
      let total = 0;
      panel.querySelectorAll<HTMLElement>('[data-col]').forEach(col => {
        const id = `${key}:${col.dataset.col}`;
        const items = [...col.querySelectorAll<HTMLElement>('li[data-q]')];
        const hit = items.filter(li => match(li, term));
        const n = shown[id] ?? per;
        const vis = new Set(hit.slice(0, n));
        items.forEach(li => { li.hidden = !vis.has(li); });
        total += hit.length;
        const c = col.querySelector<HTMLElement>('[data-n]');
        if (c) c.textContent = term ? `${hit.length} of ${items.length}` : String(items.length);
        const empty = col.querySelector<HTMLElement>('[data-none]');
        if (empty) empty.hidden = hit.length > 0;
        const more = col.querySelector<HTMLElement>('[data-more]');
        if (more) more.hidden = hit.length <= n;
      });
      perApp[key] = total;
    });
    setHits(perApp);
  }, [app, term, apps, shown, per]);

  const onClick = (e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('[data-more] button');
    if (!btn) return;
    const col = btn.closest<HTMLElement>('[data-col]'), board = btn.closest<HTMLElement>('[data-board]');
    if (!col || !board) return;
    const id = `${board.dataset.board}:${col.dataset.col}`;
    setShown(s => ({ ...s, [id]: (s[id] ?? per) + per }));
  };

  return (
    <div ref={ref} className="ig5-ev" onClick={onClick}>
      <div className="ig5-bar">
        {apps && apps.length > 1 ? (
          <div className="ig5-switch" role="group" aria-label="App">
            {apps.map(a => (
              <button key={a.key} type="button" aria-pressed={a.key === app} aria-label={a.name} onClick={() => setApp(a.key)}>
                {a.label}{term ? <span className="ig5-n">{hits[a.key] ?? 0}</span> : null}
              </button>
            ))}
          </div>
        ) : null}
        <label className="ig4-find">
          <SearchIcon />
          <input type="search" value={q} onChange={e => { setQ(e.target.value); setShown({}); }} placeholder={search} aria-label={search} />
        </label>
      </div>
      {children}
    </div>
  );
}

/** On a phone the category list becomes one select that opens the category's page. */
export function CatPick({ cats, current }: { cats: { href: string; name: string }[]; current: string }) {
  return (
    <label className="ig4-catpick">
      <span className="sr">Category</span>
      <select value={current} onChange={e => { location.href = e.target.value; }}>
        {cats.map(c => <option key={c.href} value={c.href}>{c.name}</option>)}
      </select>
    </label>
  );
}
