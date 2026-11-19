// The pieces of a comparison page, v4 (D254): the two tables in the use case table's pattern (short cells, drawn marks,
// 50agents raised on its tint), the strengths cards and the move-over stepper. No dates and no source lines on the page:
// every fact about another tool is drawn from src/content/compare/facts.ts, which keeps its URLs and read dates.
import { ROWS, TOOLS, type Cell, type Mark } from '@/content/compare/facts';
import { Face } from '@/site/parts';
import type { AltPage, Strength, VsPage } from './types';

// 50agents shows no credits and no prices (page system): free to start, nothing more.
const OURS_FREE = 'Free to start';

const MARK_WORD: Record<Mark, string> = { yes: 'Yes', no: 'No', partly: 'Partly' };
function MarkIcon({ v }: { v: Mark }) {
  const k = v === 'yes' ? 'y' : v === 'no' ? 'n' : 'p';
  return (
    <svg className={`mk ${k}`} width="20" height="20" viewBox="0 0 20 20" role="img" aria-label={MARK_WORD[v]}>
      <circle cx="10" cy="10" r="10" />
      {k === 'y' && <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {k === 'n' && <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
      {k === 'p' && <path d="M6 10h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

function CellView({ cell, us }: { cell?: Pick<Cell, 'v' | 's'>; us?: boolean }) {
  return (
    <td className={us ? 'us' : undefined}>
      <span className="cell">{cell && cell.v !== 'text' && <MarkIcon v={cell.v} />}<span>{cell?.s ?? 'Not listed'}</span></span>
    </td>
  );
}

// The versus table: free plan and paid plans first, then the page's rows, then "Better for", each a mark and 5 words.
export function VsTable({ p }: { p: VsPage }) {
  const us = TOOLS.fifty;
  const them = TOOLS[p.tool];
  const rows = p.rows.filter(r => them.cells[r] && us.cells[r]);
  const pricing = { v: 'text' as const, s: `See ${them.name}'s pricing page` };
  return (
    <div className="cmp4-tbl vs">
      <table>
        <caption className="sr">50agents and {them.name}, row by row</caption>
        <thead>
          <tr><th scope="col"><span className="sr">What you get</span></th><th scope="col" className="us"><span className="uc3-us"><Face id="lead" size={20} />50agents</span></th><th scope="col">{them.name}</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Free plan</th><CellView us cell={{ v: 'yes', s: OURS_FREE }} /><CellView cell={them.cells.free ?? pricing} /></tr>
          {(them.cells.free || them.cells.price) && <tr><th scope="row">Paid plans from</th><CellView us cell={us.cells.price} /><CellView cell={them.cells.price ?? pricing} /></tr>}
          {rows.map(r => (
            <tr key={r}><th scope="row">{ROWS[r]}</th><CellView us cell={us.cells[r]} /><CellView cell={them.cells[r]} /></tr>
          ))}
          <tr className="edge"><th scope="row">Better for</th><CellView us cell={{ v: 'text', s: p.edge.us }} /><CellView cell={{ v: 'text', s: p.edge.them }} /></tr>
        </tbody>
      </table>
    </div>
  );
}

// The alternatives table: 50agents raised first, then each tool, then where staying on the page's tool is the better call.
export function AltTable({ p }: { p: AltPage }) {
  const rows = [...p.entries.map(e => ({ ...e, name: TOOLS[e.tool].name, us: e.tool === 'fifty' })),
    ...(p.stay ? [{ ...p.stay, tool: p.tool, name: `Staying on ${TOOLS[p.tool].name}`, us: false }] : [])];
  return (
    <div className="cmp4-tbl alt">
      <table>
        <caption className="sr">{p.h1}: what each is best for, its starting price and one key difference</caption>
        <thead>
          <tr><th scope="col">Tool</th><th scope="col">Best for</th><th scope="col">Starting price</th><th scope="col">Key difference</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name} className={r.us ? 'us' : r.tool === p.tool ? 'stay' : undefined}>
              <th scope="row">{r.us ? <span className="uc3-us"><Face id="lead" size={20} />50agents</span> : r.name}</th>
              <td data-h="Best for">{r.best}</td>
              <td data-h="Starting price">{r.us ? OURS_FREE : r.price}</td>
              <td data-h="Key difference">{r.diff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Where 50agents is good: 3 or 4 cards, a crew blob, a short title and one line.
export function Strengths({ items }: { items: Strength[] }) {
  return (
    <ul className={`cmp4-str n${items.length}`}>
      {items.map(s => (
        <li key={s.title}>
          <Face id={s.face} size={44} />
          <h3>{s.title}</h3>
          <p>{s.line}</p>
        </li>
      ))}
    </ul>
  );
}

// How to move over: a horizontal stepper, numbered dots joined by a line; it stacks vertically on a phone.
export function MoveSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="cmp4-steps" style={{ ['--n' as string]: steps.length }}>
      {steps.map((m, i) => (
        <li key={m.title}>
          <span className="cmp4-dot" aria-hidden="true">{i + 1}</span>
          <div><h3>{m.title}</h3><p>{m.body}</p></div>
        </li>
      ))}
    </ol>
  );
}
