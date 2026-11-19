// The pieces of a comparison page, v5 (D255): the two tables in the use case table's pattern (short cells, drawn marks,
// 50agents first, under our wordmark, and only where it wins), the strengths cards and the move-over stepper. No dates and no source lines on the page:
// every fact about another tool is drawn from src/content/compare/facts.ts, which keeps its URLs and read dates.
import { isWin, ROWS, TOOLS, type Cell, type Mark } from '@/content/compare/facts';
import { Face } from '@/site/parts';
import type { AltPage, Strength, VsPage } from './types';

// 50agents shows no credits and no prices (page system): free to start, nothing more.
const OURS_FREE = 'Free to start';

// The 50agents wordmark, small, for the table headers (D255: our logo, not a kind face), as on the use case page.
export function Logo50() {
  return <span className="logo50"><span className="logo50-d" aria-hidden="true"><Face id="writer" size={17} /></span><span className="sr">50agents</span></span>;
}

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

// The versus table (D255): 50agents first under our wordmark; free plan and paid plans first, then only the page's rows
// where 50agents wins (isWin in facts.ts), each a mark and 5 words. No "Better for" row.
export function VsTable({ p }: { p: VsPage }) {
  const us = TOOLS.fifty;
  const them = TOOLS[p.tool];
  const rows = p.rows.filter(r => isWin(r, them.cells, us.cells));
  const pricing = { v: 'text' as const, s: `See ${them.name}'s pricing page` };
  return (
    <div className="cmp4-tbl vs">
      <table>
        <caption className="sr">Where 50agents wins against {them.name}, row by row</caption>
        <thead>
          <tr><th scope="col"><span className="sr">What you get</span></th><th scope="col" className="us"><span className="uc3-us"><Logo50 /></span></th><th scope="col">{them.name}</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Free plan</th><CellView us cell={{ v: 'yes', s: OURS_FREE }} /><CellView cell={them.cells.free ?? pricing} /></tr>
          {(them.cells.free || them.cells.price) && <tr><th scope="row">Paid plans from</th><CellView us cell={us.cells.price} /><CellView cell={them.cells.price ?? pricing} /></tr>}
          {rows.map(r => (
            <tr key={r}><th scope="row">{ROWS[r]}</th><CellView us cell={us.cells[r]} /><CellView cell={them.cells[r]} /></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The alternatives table (D255): 50agents first under our wordmark, then each tool's facts, neutrally. No "Staying on" row.
export function AltTable({ p }: { p: AltPage }) {
  const cols = p.entries.map(e => ({ ...e, name: TOOLS[e.tool].name, us: e.tool === 'fifty' }));
  const rows: { label: string; get: (c: (typeof cols)[number]) => string }[] = [
    { label: 'Best for', get: c => c.best },
    { label: 'Starting price', get: c => (c.us ? OURS_FREE : c.price) },
    { label: 'Key difference', get: c => c.diff },
  ];
  return (
    <div className="cmp4-tbl alt" role="region" aria-label={`${p.h1}, scrolls sideways on a phone`} tabIndex={0}>
      <table style={{ ['--n' as string]: cols.length }}>
        <caption className="sr">{p.h1}: what each is best for, its starting price and one key difference</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr">Platform</span></th>
            {cols.map(c => <th key={c.name} scope="col" className={c.us ? 'us' : undefined}>{c.us ? <Logo50 /> : c.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {cols.map(c => <td key={c.name} className={c.us ? 'us' : undefined}>{r.get(c)}</td>)}
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

// How to move over: a horizontal stepper of equal columns, numbered circles joined by a line from centre to centre,
// each title and line aligned under its circle's left edge; it stacks on a phone with the line running down.
export function MoveSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="cmp5-steps" style={{ ['--n' as string]: steps.length }}>
      {steps.map((m, i) => (
        <li key={m.title}>
          <span className="cmp5-dot" aria-hidden="true">{i + 1}</span>
          <h3>{m.title}</h3>
          <p>{m.body}</p>
        </li>
      ))}
    </ol>
  );
}
