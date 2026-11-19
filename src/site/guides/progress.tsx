'use client';
import { useEffect, useState } from 'react';

// Steps the reader ticks off (D254, guides v4). The ticks are native checkboxes in the server HTML, so they work by
// keyboard and without JavaScript; this adds the count in the contents and beside the steps, and remembers the ticks in
// this browser. `restore` is set on one instance only, so the saved ticks are put back once.
const KEY = (slug: string) => `50agents:guide:${slug}`;
const boxes = () => Array.from(document.querySelectorAll<HTMLInputElement>('.gd4-steps .gd4-tick-in'));

export function Progress({ slug, total, restore = false }: { slug: string; total: number; restore?: boolean }) {
  const [done, setDone] = useState<number | null>(null);
  useEffect(() => {
    const count = () => setDone(boxes().filter(b => b.checked).length);
    const onChange = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.classList?.contains('gd4-tick-in')) return;
      count();
      if (restore) {
        try { localStorage.setItem(KEY(slug), JSON.stringify(boxes().map(b => b.checked))); } catch { /* storage off */ }
      }
    };
    document.addEventListener('change', onChange);
    if (restore) {
      try {
        const saved = JSON.parse(localStorage.getItem(KEY(slug)) ?? '[]') as boolean[];
        boxes().forEach((b, i) => { if (saved[i] && !b.checked) { b.checked = true; b.dispatchEvent(new Event('change', { bubbles: true })); } });
      } catch { /* storage off */ }
    }
    count();
    return () => document.removeEventListener('change', onChange);
  }, [slug, restore]);
  const n = done ?? 0;
  return (
    <div className="gd4-prog" aria-live="polite">
      <span className="gd4-prog-bar" aria-hidden="true"><i style={{ width: `${(n / total) * 100}%` }} /></span>
      <span className="gd4-prog-t">{done === null ? `${total} steps` : n === total ? 'All steps done' : `${n} of ${total} steps done`}</span>
    </div>
  );
}
