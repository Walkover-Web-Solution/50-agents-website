'use client';
import { useState } from 'react';

// The team filter over the hub gallery (D259). Every card is in the server HTML; a button only sets data-show on the
// grid and CSS hides the other teams' cards. Buttons, so it works by keyboard; without JavaScript every card shows.
export function GalleryFilter({ teams, total, label, children }: { teams: { slug: string; label: string; count: number }[]; total: number; label: string; children: React.ReactNode }) {
  const [show, setShow] = useState('all');
  const picked = teams.find(t => t.slug === show);
  return (
    <>
      <div className="gal-chips" role="group" aria-label={`Filter ${label} by team`}>
        {[{ slug: 'all', label: 'All' }, ...teams].map(t => (
          <button key={t.slug} type="button" aria-pressed={show === t.slug} onClick={() => setShow(t.slug)}>{t.label}</button>
        ))}
      </div>
      <p className="sr" aria-live="polite">{picked ? `${picked.count} for ${picked.label}` : `All ${total}`}</p>
      <div className="gal-grid" data-show={show}>{children}</div>
    </>
  );
}
