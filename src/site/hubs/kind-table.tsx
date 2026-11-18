// "Which kind do I need": the same table on all four hubs, the current kind highlighted in its tint.
import { KIND_ROWS, KIND_RULE } from '@/content/hubs/kinds';
import { Face, KINDS, MaybeLink } from '../parts';
import type { Kind } from '../types';

export function KindTable({ current }: { current?: Kind }) {
  return (
    <div className="kt" role="table" aria-label="Which kind do I need">
      <div className="kt-row kt-h" role="row">
        <span role="columnheader">Kind</span>
        <span role="columnheader">Pick it when</span>
        <span role="columnheader">Starts on</span>
        <span role="columnheader">AI on each run</span>
        <span role="columnheader">Say it like this</span>
      </div>
      {KIND_ROWS.map(r => {
        const k = KINDS[r.kind];
        const on = r.kind === current;
        return (
          <div key={r.kind} role="row" className={`kt-row${on ? ' on' : ''}`} style={{ ['--k' as string]: k.tint }}>
            <span role="cell" className="kt-k">
              <Face id={k.face} size={28} />
              {on ? <b>{k.label}</b> : <MaybeLink href={k.hub}>{k.label}</MaybeLink>}
              {on && <em>You are here</em>}
            </span>
            <span role="cell"><i className="kt-l">Pick it when</i>{r.pick}</span>
            <span role="cell"><i className="kt-l">Starts on</i>{r.starts}</span>
            <span role="cell"><i className="kt-l">AI on each run</i>{r.ai}</span>
            <span role="cell" className="kt-ask"><i className="kt-l">Say it like this</i>&ldquo;{r.example}&rdquo;</span>
          </div>
        );
      })}
      <p className="kt-rule">{KIND_RULE}</p>
    </div>
  );
}
