'use client';
import { useEffect, useRef, useState } from 'react';

// The integration family's two list boxes (D254). Every item is in the server HTML (crawlers read them all); these only
// hide what is not on screen yet, so the page never grows when someone keeps pressing "Load more" or "Next".

const match = (el: HTMLElement, term: string) => !term || (el.dataset.q ?? '').includes(term);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

/** A fixed-height box that scrolls inside itself: tabs (one panel each), a search, and "Load more" at the end of the list.
 *  Children are the panels, rendered on the server: `<ul data-panel={key}>` of `<li data-q="...">`, the first panel shown,
 *  items after the first `per` hidden. */
export function ListBox({ tabs, search, per, fixed, empty = 'Nothing here matches', children }: {
  tabs: { key: string; label: React.ReactNode }[]; search?: string; per: number; fixed: boolean; empty?: string; children: React.ReactNode;
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
  const elsewhere = none ? tabs.find(t => t.key !== tab && (hits[t.key] ?? 0) > 0) : undefined;

  return (
    <div ref={ref} className="ig4-lb">
      {(tabs.length > 1 || search) && (
        <div className="ig4-lb-bar">
          {tabs.length > 1 ? (
            <div className="ig4-tabs" role="tablist">
              {tabs.map((t, i) => (
                <button key={t.key} type="button" role="tab" data-tab={t.key} aria-selected={t.key === tab} tabIndex={t.key === tab ? 0 : -1} onClick={() => pick(t.key)} onKeyDown={e => onKey(e, i)}>
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
      <div ref={boxRef} className={fixed ? 'ig4-box fixed' : 'ig4-box'}>
        {children}
        {none && (
          <p className="ig4-none" role="status">
            {empty} &ldquo;{q.trim()}&rdquo;.{elsewhere && <> <button type="button" onClick={() => pick(elsewhere.key)}>See it in {typeof elsewhere.label === 'string' ? elsewhere.label : 'the other tab'}</button></>}
          </p>
        )}
        {left > 0 && <div className="ig4-more"><button type="button" className="btn sm ghost" onClick={() => setShown(s => ({ ...s, [tab]: (s[tab] ?? per) + per }))}>Load more</button></div>}
      </div>
    </div>
  );
}

/** The directory's main column: its heading and one search over every app, the server-rendered grid (children:
 *  `[data-app]` tiles, the first `per` shown), and numbered pages under it. A page change brings the panel's top back. */
export function Directory({ per, total, label, head, children }: { per: number; total: number; label: string; head: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.max(1, Math.ceil(total / per)));
  const [none, setNone] = useState(false);
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tiles = [...root.querySelectorAll<HTMLElement>('[data-app]')];
    const hits = tiles.filter(t => match(t, term));
    const n = Math.max(1, Math.ceil(hits.length / per));
    const p = Math.min(page, n - 1);
    const on = new Set(hits.slice(p * per, p * per + per));
    tiles.forEach(t => { t.hidden = !on.has(t); });
    setPages(n);
    setNone(hits.length === 0);
    if (p !== page) setPage(p);
  }, [term, page, per]);

  const go = (p: number) => {
    setPage(p);
    const top = (ref.current?.closest('.ig4-dir') ?? ref.current) as HTMLElement | null;
    if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const nums: (number | '…')[] = [];
  for (let i = 0; i < pages; i++) {
    if (i === 0 || i === pages - 1 || Math.abs(i - page) <= 1) nums.push(i);
    else if (nums[nums.length - 1] !== '…') nums.push('…');
  }

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
      {none && <p className="ig4-none" role="status">No app here matches &ldquo;{q.trim()}&rdquo;. Try another name, or tell Captain the job and it says which apps it needs.</p>}
      {pages > 1 && (
        <nav className="ig4-pages" aria-label="Pages">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 0}>Previous</button>
          <span className="ig4-nums">
            {nums.map((n, i) => n === '…' ? <span key={'g' + i} className="ig4-gap">…</span> : <button key={n} type="button" aria-current={n === page ? 'page' : undefined} onClick={() => go(n)}>{n + 1}</button>)}
          </span>
          <button type="button" onClick={() => go(page + 1)} disabled={page >= pages - 1}>Next</button>
        </nav>
      )}
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
