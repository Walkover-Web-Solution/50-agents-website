// A guide section's blocks, in order: paragraphs, lists, numbered steps, tables, a note, a copyable ask, a product view.
import type { Block } from '@/content/guides/types';
import { CopyAsk } from '../copy';
import { rich } from './rich';
import { ProductView } from './views';

export function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        if ('p' in b) return <p key={i}>{rich(b.p)}</p>;
        if ('ul' in b) return <ul key={i} className="gd-ul">{b.ul.map(x => <li key={x}>{rich(x)}</li>)}</ul>;
        if ('steps' in b)
          return (
            <ol key={i} className="gd-steps">
              {b.steps.map(s => <li key={s.title}><div><h3>{s.title}</h3><p>{rich(s.body)}</p></div></li>)}
            </ol>
          );
        if ('table' in b)
          return (
            <div key={i}>
              <div className="gd-tw">
                <table className="gd-table">
                  <thead><tr>{b.table.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{b.table.rows.map(r => <tr key={r.join('|')}>{r.map((c, j) => <td key={j}>{rich(c)}</td>)}</tr>)}</tbody>
                </table>
              </div>
              {b.table.caption && <p className="gd-cap">{rich(b.table.caption)}</p>}
            </div>
          );
        if ('note' in b) return <p key={i} className="gd-note">{rich(b.note)}</p>;
        if ('ask' in b) return <CopyAsk key={i} text={b.ask} />;
        return <ProductView key={i} view={b.view} caption={b.caption} />;
      })}
    </>
  );
}
