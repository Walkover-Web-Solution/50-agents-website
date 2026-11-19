// "Which kind do I need": the comparison table on all four hubs, drawn like the use case comparison (uc3-cmp), with the
// current kind's column in its tint. Each example links to its use case page.
import { KIND_LABELS, KIND_ROWS } from '@/content/hubs/kinds';
import { PAGES } from '@/content/use-cases/pages';
import { Face, KINDS, MaybeLink } from '../parts';
import type { Kind } from '../types';

export function KindTable({ current }: { current?: Kind }) {
  return (
    <div className="uc3-cmp hub-kt">
      <table>
        <thead>
          <tr>
            <th scope="col"><span className="sr">What matters</span></th>
            {KIND_ROWS.map(r => {
              const k = KINDS[r.kind];
              const on = r.kind === current;
              return (
                <th key={r.kind} scope="col" className={on ? 'us' : undefined} style={{ ['--k' as string]: k.tint }}>
                  <span className="uc3-us"><Face id={k.face} size={22} />{on ? k.label : <MaybeLink href={k.hub}>{k.label}</MaybeLink>}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {KIND_LABELS.map(([key, label]) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              {KIND_ROWS.map(r => {
                const uc = key === 'example' ? PAGES.find(p => p.slug === r.example) : undefined;
                return (
                  <td key={r.kind} className={r.kind === current ? 'us' : undefined} style={{ ['--k' as string]: KINDS[r.kind].tint }}>
                    {key === 'example' ? (uc ? <a href={`/use-cases/${uc.slug}`}>{uc.h1}</a> : r.example) : r[key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
