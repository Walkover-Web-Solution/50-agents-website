'use client';
import { useSyncExternalStore } from 'react';

// The category filter over the /guides grid (guides v5). Every card is server-rendered and stays in the HTML; a button
// only sets data-show on the grid and CSS hides the other categories' cards. The choice is kept in the address
// (#apps), so a filtered view can be shared. Buttons, so it works by keyboard.
export function GroupFilter({ groups, total, children }: { groups: { slug: string; label: string; count: number }[]; total: number; children: React.ReactNode }) {
  const hash = useSyncExternalStore(onHash, () => decodeURIComponent(location.hash.slice(1)), () => '');
  const show = groups.some(g => g.slug === hash) ? hash : 'all';
  const pick = (s: string) => {
    try { history.replaceState(null, '', s === 'all' ? location.pathname : `#${s}`); } catch { /* no history */ }
    window.dispatchEvent(new Event('hashchange'));
  };
  return (
    <>
      <div className="gx-chips" role="group" aria-label="Filter guides by category">
        {[{ slug: 'all', label: 'All guides' }, ...groups].map(g => (
          <button key={g.slug} type="button" aria-pressed={show === g.slug} onClick={() => pick(g.slug)}>{g.label}</button>
        ))}
      </div>
      <p className="sr" aria-live="polite">{show === 'all' ? `All ${total} guides` : `${groups.find(g => g.slug === show)?.count} guides in ${groups.find(g => g.slug === show)?.label}`}</p>
      <div className="gx-grid" data-show={show}>{children}</div>
    </>
  );
}

const onHash = (cb: () => void) => { window.addEventListener('hashchange', cb); return () => window.removeEventListener('hashchange', cb); };
