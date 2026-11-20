'use client';
import { useEffect, useRef, useState } from 'react';

// The pair picker (round B, B7; Jii's review: "add a search ... we want this section quite up the page ... dont show too
// much"). The tiles are server-rendered children (every link is in the HTML); this wrapper shows the first SHOW, filters
// all of them as you type, and opens the rest on "See all".
const SHOW = 8;
export function PairPicker({ app, total, children }: { app: string; total: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  const [hits, setHits] = useState(total);
  useEffect(() => {
    const items = [...(ref.current?.querySelectorAll<HTMLLIElement>('li[data-q]') ?? [])];
    const term = q.trim().toLowerCase();
    let n = 0;
    items.forEach(li => {
      const match = !term || (li.dataset.q ?? '').includes(term);
      li.hidden = !match || (!term && !all && n >= SHOW);
      if (match) n++;
    });
    setHits(n);
  }, [q, all]);
  return (
    <div ref={ref} className="ig3-pp">
      <label className="ig4-find ig3-pp-find">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" /><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span className="sr">Search apps to pair with {app}</span>
        <input type="search" placeholder={`Search apps to pair with ${app}`} value={q} onChange={e => setQ(e.target.value)} />
      </label>
      {children}
      {q.trim() && hits === 0 && <p className="ig3-pp-none" role="status">No pair page for that app yet. Tell Captain the job and it uses any of the 2,300+ apps.</p>}
      {!q.trim() && total > SHOW && (
        <div className="ig3-pp-more"><button type="button" className="btn sm ghost" onClick={() => setAll(a => !a)}>{all ? 'Show fewer' : `See all ${total}`}</button></div>
      )}
    </div>
  );
}
