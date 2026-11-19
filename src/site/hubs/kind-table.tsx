// "Which kind do I need": the comparison on all four hubs, drawn like the use case comparison (uc3-cmp, D254): short
// cells with drawn marks, the current kind's column raised on its tint. Each example links to its use case page.
import { KIND_EXAMPLES, KIND_ORDER, KIND_ROWS } from '@/content/hubs/kinds';
import { PAGES } from '@/content/use-cases/pages';
import { Face, KINDS, MaybeLink } from '../parts';
import type { Kind } from '../types';
import { MarkCell } from './marks';

export function KindTable({ current }: { current?: Kind }) {
  const us = (k: Kind) => (k === current ? 'us' : undefined);
  return (
    <div className="uc3-cmp hub-kt">
      <table>
        <thead>
          <tr>
            <th scope="col"><span className="sr">What matters</span></th>
            {KIND_ORDER.map(kind => {
              const k = KINDS[kind];
              return (
                <th key={kind} scope="col" className={us(kind)}>
                  <span className="uc3-us"><Face id={k.face} size={20} />{kind === current ? k.label : <MaybeLink href={k.hub}>{k.label}</MaybeLink>}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {KIND_ROWS.map(r => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {KIND_ORDER.map(kind => <td key={kind} className={us(kind)}><MarkCell v={r.cells[kind]} /></td>)}
            </tr>
          ))}
          <tr>
            <th scope="row">For example</th>
            {KIND_ORDER.map(kind => {
              const uc = PAGES.find(p => p.slug === KIND_EXAMPLES[kind]);
              return <td key={kind} className={us(kind)}>{uc ? <a href={`/use-cases/${uc.slug}`}>{uc.h1}</a> : null}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
