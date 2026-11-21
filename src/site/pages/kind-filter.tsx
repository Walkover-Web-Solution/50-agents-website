import { KINDS, KindFace } from '../parts';
import type { Kind } from '../types';

const ORDER: Kind[] = ['ai', 'auto', 'app', 'browser'];

// Kind chips over /use-cases: radios + CSS (:has) so every card stays in the server HTML (Axien read.page-structure).
export function KindFilter({ kinds, children }: { kinds: Kind[]; children: React.ReactNode }) {
  const chips: (Kind | 'all')[] = ['all', ...ORDER.filter(k => kinds.includes(k))];
  const name = 'ixf-kind';
  return (
    <div className="ixf-wrap">
      <div className="ixf-chips" role="radiogroup" aria-label="Filter by kind">
        {chips.map((c, i) => (
          <label key={c}>
            <input type="radio" name={name} value={c} defaultChecked={i === 0} className="ixf-radio" />
            <span className="ixf-chip">
              {c !== 'all' && <KindFace kind={c} size={20} />}
              {c === 'all' ? 'All' : KINDS[c].label}
            </span>
          </label>
        ))}
      </div>
      <div className="cards3 ixf-grid">{children}</div>
    </div>
  );
}