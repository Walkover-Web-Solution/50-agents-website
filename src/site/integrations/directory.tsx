import type { ReactNode } from 'react';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

const Arrow = ({ left }: { left?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{left ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}</svg>
);

/** Category jump on a phone; full nav is in the aside. */
export function CatPick({ cats, current }: { cats: { href: string; name: string }[]; current: string }) {
  return (
    <label className="ig4-catpick">
      <span className="sr">Category</span>
      <select defaultValue={current} className="ig4-catpick-sel" data-catpick>
        {cats.map(c => <option key={c.href} value={c.href}>{c.name}</option>)}
      </select>
    </label>
  );
}

/** App directory column: search and paging run in public/site/integrations-dir.js; every app stays in the HTML. */
export function Directory({ per, total, label, head, children }: { per: number; total: number; label: string; head: ReactNode; children: ReactNode }) {
  return (
    <div className="ig4-dir-main" data-ig4-dir data-per={per} data-total={total}>
      <div className="ig4-dir-bar">
        {head}
        <label className="ig4-find">
          <SearchIcon />
          <input type="search" placeholder={label} aria-label={label} data-ig4-search />
        </label>
      </div>
      {children}
      <p className="ig4-none" role="status" hidden data-ig4-none>No app here matches. Try another name, or tell Captain the job and it says which apps it needs.</p>
      <nav className="ig4-pager" aria-label="Pages" hidden={total <= per} data-ig4-pager>
        <button type="button" className="ig4-pg-step" data-ig4-prev disabled><Arrow left /><span>Previous</span></button>
        <button type="button" className="ig4-pg-step" data-ig4-next><span>Next</span><Arrow /></button>
      </nav>
    </div>
  );
}