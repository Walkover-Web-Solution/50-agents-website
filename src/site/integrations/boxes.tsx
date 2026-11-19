'use client';
import { useEffect, useRef, useState } from 'react';

// The integration family's two list boxes (D254). Every item is in the server HTML (crawlers read them all); these only
// hide what is not on screen yet.

const match = (el: HTMLElement, term: string) => !term || (el.dataset.q ?? '').includes(term);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

/** A box that fits its content up to a cap, then scrolls inside itself (D258: never a fixed empty height): tabs (one panel each), a search, and "Load more" at the end of the list.
 *  Children are the panels, rendered on the server: `<ul data-panel={key}>` of `<li data-q="...">`, the first panel shown,
 *  items after the first `per` hidden. */
export function ListBox({ tabs, search, per, fixed, empty = 'Nothing here matches', children }: {
  tabs: { key: string; label: React.ReactNode; name?: string }[]; search?: string; per: number; fixed: boolean; empty?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
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
      let c = 0;
      items.forEach((li, i) => {
        const hit = match(li, term);
        if (hit) c++;
        if (on) li.hidden = term ? !hit : i >= n;
      });
      counts[key] = c;
      if (on && !term) rest = Math.max(0, items.length - n);
    });
    setHits(counts);
    setLeft(rest);
  }, [tab, term, shown, per]);

  const pick = (key: string) => { setTab(key); if (boxRef.current) boxRef.current.scrollTop = 0; };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    pick(next.key);
    ref.current?.querySelector<HTMLElement>(`[data-tab="${next.key}"]`)?.focus();
  };
  const none = term && (hits[tab] ?? 0) === 0;
  // the other tab with the most matches (a pair has four tabs)
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
              <input type="search" value={q} onChange={e => { setQ(e.target.value); if (boxRef.current) boxRef.current.scrollTop = 0; }} placeholder={search} aria-label={search} />
            </label>
          )}
        </div>
      )}
      <div ref={boxRef} className={fixed ? 'ig4-box capped' : 'ig4-box'}>
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

/** The directory's main column: its heading and one search over every app, the server-rendered grid (children:
 *  `[data-app]` tiles, the first `per` shown), and "Load more" under it (D258: no page numbers). Every tile stays in the
 *  HTML; the rest are only hidden. The search filters the whole list. */
export function Directory({ per, label, head, children }: { per: number; label: string; head: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(per);
  const [left, setLeft] = useState(0);
  const [none, setNone] = useState(false);
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tiles = [...root.querySelectorAll<HTMLElement>('[data-app]')];
    const hits = tiles.filter(t => match(t, term));
    const on = new Set(hits.slice(0, shown));
    tiles.forEach(t => { t.hidden = !on.has(t); });
    setLeft(Math.max(0, hits.length - shown));
    setNone(hits.length === 0);
  }, [term, shown]);

  return (
    <div ref={ref} className="ig4-dir-main">
      <div className="ig4-dir-bar">
        {head}
        <label className="ig4-find">
          <SearchIcon />
          <input type="search" value={q} onChange={e => { setQ(e.target.value); setShown(per); }} placeholder={label} aria-label={label} />
        </label>
      </div>
      {children}
      {none && <p className="ig4-none" role="status">No app here matches &ldquo;{q.trim()}&rdquo;. Try another name, or tell Captain the job and it says which apps it needs.</p>}
      {left > 0 && <div className="ig4-more ig4-dir-more"><button type="button" className="btn sm ghost" onClick={() => setShown(n => n + per)}>Load more apps</button></div>}
    </div>
  );
}

/** Triggers and actions (D258): two columns side by side, each with its own head, count and scroll, and one search over
 *  both. A pair adds an app switcher above the columns. Children are rendered on the server: `[data-board]` panels (one
 *  per app, the first shown) of `[data-col]` columns, each with a `[data-n]` count, a `ul` of `li[data-q]` and a
 *  `[data-none]` line. Every item stays in the HTML. */
export function EventBoard({ apps, search, children }: { apps?: { key: string; name: string; label: React.ReactNode }[]; search: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState(apps?.[0]?.key ?? '');
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<Record<string, number>>({});
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const per: Record<string, number> = {};
    root.querySelectorAll<HTMLElement>('[data-board]').forEach(panel => {
      const key = panel.dataset.board!;
      if (apps) panel.hidden = key !== app;
      let total = 0;
      panel.querySelectorAll<HTMLElement>('[data-col]').forEach(col => {
        const items = [...col.querySelectorAll<HTMLElement>('li[data-q]')];
        let c = 0;
        items.forEach(li => { const hit = match(li, term); li.hidden = !hit; if (hit) c++; });
        total += c;
        const n = col.querySelector<HTMLElement>('[data-n]');
        if (n) n.textContent = term ? `${c} of ${items.length}` : String(items.length);
        const empty = col.querySelector<HTMLElement>('[data-none]');
        if (empty) empty.hidden = c > 0;
        const sc = col.querySelector<HTMLElement>('[data-scroll]');
        if (sc) sc.scrollTop = 0;
      });
      per[key] = total;
    });
    setHits(per);
  }, [app, term, apps]);

  return (
    <div ref={ref} className="ig5-ev">
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
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={search} aria-label={search} />
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
