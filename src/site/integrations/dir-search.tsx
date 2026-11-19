'use client';
import { useEffect, useRef, useState } from 'react';

// The A to Z's search: the full list is already in the HTML; this only hides what doesn't match (pages-brief B8).
export function DirSearch({ label = 'Search apps' }: { label?: string }) {
  const [q, setQ] = useState('');
  const [none, setNone] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const term = q.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll<HTMLElement>('[data-app]').forEach(el => {
      const hit = !term || (el.dataset.app ?? '').includes(term);
      el.hidden = !hit;
      if (hit) shown++;
    });
    document.querySelectorAll<HTMLElement>('[data-letter]').forEach(sec => {
      sec.hidden = !sec.querySelector('[data-app]:not([hidden])');
    });
    document.querySelectorAll<HTMLElement>('[data-hide-on-search]').forEach(sec => { sec.hidden = !!term; });
    setNone(shown === 0);
  }, [q]);
  return (
    <>
      <label className="ig3-search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input ref={ref} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={label} aria-label={label} />
      </label>
      {none && <p className="ig3-empty" role="status">No app here matches &ldquo;{q}&rdquo;. Try another name, or describe the job to Captain and it will say which apps it needs.</p>}
    </>
  );
}
