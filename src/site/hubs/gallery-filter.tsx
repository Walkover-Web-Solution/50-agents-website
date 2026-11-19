'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// The team filter and "Load more" over the hub gallery (D259, D260). Every card is in the server HTML. A filter button
// sets data-show on the grid and CSS hides the other teams' cards. Four rows show at first (CSS nth-child per breakpoint
// until hydration, then this script marks the cards past the limit with data-over); "Load more" adds four rows and moves
// focus to the first new card. Without JavaScript every card shows and the button is hidden (<noscript> style).
const ROWS = 4;
const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function GalleryFilter({ teams, total, label, children }: { teams: { slug: string; label: string; count: number }[]; total: number; label: string; children: React.ReactNode }) {
  const [show, setShow] = useState('all');
  const [rows, setRows] = useState(ROWS);
  const [cols, setCols] = useState(0);
  const [left, setLeft] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const focusFrom = useRef<number | null>(null);
  const picked = teams.find(t => t.slug === show);

  // the number of columns the grid has at this width
  useIso(() => {
    const g = grid.current;
    if (!g) return;
    const read = () => setCols(getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length || 1);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(g);
    return () => ro.disconnect();
  }, []);

  // mark the cards past the limit among the ones this filter shows
  useIso(() => {
    const g = grid.current;
    if (!g || !cols) return;
    const limit = rows * cols;
    const mine = Array.from(g.children).filter(el => show === 'all' || (el as HTMLElement).dataset.team === show) as HTMLElement[];
    Array.from(g.children).forEach(el => (el as HTMLElement).removeAttribute('data-over'));
    mine.forEach((el, n) => { if (n >= limit) el.setAttribute('data-over', ''); });
    setLeft(Math.max(0, mine.length - limit));
    if (focusFrom.current !== null) {
      mine[focusFrom.current]?.querySelector<HTMLElement>('a')?.focus();
      focusFrom.current = null;
    }
  }, [rows, cols, show]);

  const pick = (slug: string) => { setShow(slug); setRows(ROWS); };
  const more = () => { focusFrom.current = rows * cols; setRows(r => r + ROWS); };

  return (
    <>
      <div className="gal-chips" role="group" aria-label={`Filter ${label} by team`}>
        {[{ slug: 'all', label: 'All' }, ...teams].map(t => (
          <button key={t.slug} type="button" aria-pressed={show === t.slug} onClick={() => pick(t.slug)}>{t.label}</button>
        ))}
      </div>
      <p className="sr" aria-live="polite">{picked ? `${picked.count} for ${picked.label}` : `All ${total}`}</p>
      <noscript><style>{'.gal-grid>*{display:flex!important}.gal-more{display:none!important}'}</style></noscript>
      <div ref={grid} className="gal-grid" data-show={show} data-cut={left === null ? 'css' : 'js'}>{children}</div>
      {(left === null || left > 0) && (
        <div className="gal-more"><button type="button" className="btn ghost" onClick={more}>Load more</button></div>
      )}
    </>
  );
}
