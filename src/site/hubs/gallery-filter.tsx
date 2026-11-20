import type { ReactNode } from 'react';

/** Team filter and load-more for hub gallery; logic in public/site/gallery.js. Every card stays in the server HTML. */
export function GalleryFilter({ teams, total, label, children }: {
  teams: { slug: string; label: string; count: number }[];
  total: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <div data-gal data-rows="4">
      <div className="gal-chips" role="group" aria-label={`Filter ${label} by team`}>
        <button type="button" data-gal-team="all" aria-pressed="true">All</button>
        {teams.map(t => (
          <button key={t.slug} type="button" data-gal-team={t.slug} aria-pressed="false">{t.label}</button>
        ))}
      </div>
      <p className="sr" aria-live="polite">All {total}</p>
      <noscript><style>{'.gal-grid>*{display:flex!important}.gal-more{display:none!important}'}</style></noscript>
      <div className="gal-grid" data-gal-grid data-cut="css">{children}</div>
      <div className="gal-more" data-gal-more hidden><button type="button" className="btn ghost">Load more</button></div>
    </div>
  );
}