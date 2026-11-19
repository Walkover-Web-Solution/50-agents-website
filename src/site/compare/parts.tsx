// The pieces of a comparison page, v3 (D253): the two tables, the two pick cards, and the one sources line.
// Every fact about another tool is drawn from src/content/compare/facts.ts; the page JSON only chooses and writes around it.
import { CHECKED_ISO, ROWS, TOOLS, type Cell, type Fact, type Mark, type ToolId } from '@/content/compare/facts';
import type { AltPage, VsPage } from './types';

export const checkedMonth = new Date(CHECKED_ISO + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// 50agents' own row shows no credits and no prices (page system): free to start, nothing more.
const OURS_FREE = 'Free to start';

const MARK_WORD: Record<Mark, string> = { yes: 'Yes', no: 'No', partly: 'Partly' };
function MarkIcon({ v }: { v: Mark }) {
  const d = v === 'yes' ? 'M5 12.5 10 17.5 19 7' : v === 'no' ? 'M7 7l10 10M17 7 7 17' : 'M6 12h12';
  return (
    <span className={`cmp3-mk ${v}`}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
    </span>
  );
}

function CellView({ cell, who }: { cell: Cell | { v: Mark | 'text'; note: string }; who: string }) {
  return (
    <td data-who={who}>
      {cell.v !== 'text' && <><MarkIcon v={cell.v} /><b className={`cmp3-w ${cell.v}`}>{MARK_WORD[cell.v]}.</b> </>}
      <span>{cell.note}</span>
    </td>
  );
}

// The versus table: the price first, then the page's rows, each a tick, a cross or "partly" with a short note.
export function VsTable({ p }: { p: VsPage }) {
  const us = TOOLS.fifty;
  const them = TOOLS[p.tool];
  const paid = them.cells.price?.note.replace(/^From /, 'from ');
  const rows = p.rows.filter(r => them.cells[r] && us.cells[r]);
  return (
    <div className="cmp3-tbl vs">
      <table>
        <caption className="sr">50agents and {them.name}, row by row</caption>
        <thead>
          <tr><th scope="col"><span className="sr">What you get</span></th><th scope="col" className="us">50agents</th><th scope="col">{them.name}</th></tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Price</th>
            <CellView who="50agents" cell={{ v: 'text', note: OURS_FREE }} />
            <td data-who={them.name}>
              {them.cells.free && <span className="cmp3-line">{them.cells.free.note}</span>}
              {paid && <span className="cmp3-line">Paid plans: {paid}</span>}
              {!them.cells.free && !paid && <span className="cmp3-line">See {them.name}&rsquo;s pricing page; we could not read it when we checked</span>}
            </td>
          </tr>
          {rows.map(r => (
            <tr key={r}>
              <th scope="row">{ROWS[r]}</th>
              <CellView who="50agents" cell={us.cells[r]!} />
              <CellView who={them.name} cell={them.cells[r]!} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The alternatives table: 50agents and 4 to 6 tools, each with who it suits, its price and one honest limitation.
export function AltTable({ p }: { p: AltPage }) {
  return (
    <div className="cmp3-tbl alt">
      <table>
        <caption className="sr">{p.h1}: who each suits, its price and one honest limitation</caption>
        <thead>
          <tr><th scope="col">Tool</th><th scope="col">Who it suits</th><th scope="col">Price</th><th scope="col">One honest limitation</th></tr>
        </thead>
        <tbody>
          {p.entries.map(e => (
            <tr key={e.tool} className={e.tool === 'fifty' ? 'us' : undefined}>
              <th scope="row">{TOOLS[e.tool].name}</th>
              <td data-who="Who it suits">{e.suits}</td>
              <td data-who="Price">{e.tool === 'fifty' ? OURS_FREE : e.price}</td>
              <td data-who="One honest limitation">{e.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// A short name for a source page, from its address: "pricing", "apps", "home", or the help article's first words.
function label(url: string) {
  try {
    const segs = new URL(url).pathname.split('/').filter(s => s && !/^([a-z]{2}(-[a-z]{2})?|hc|articles|docs|core-concepts|api-reference)$/i.test(s));
    if (!segs.length) return 'home';
    if (segs.some(s => /pricing|plans/.test(s))) return 'pricing';
    const last = decodeURIComponent(segs.at(-1)!).replace(/\.md$/, '').replace(/^\d+-/, '').replace(/^n8n-nodes-base\./, '').replace(/[-_]+/g, ' ').toLowerCase();
    return last.split(' ').slice(0, 3).join(' ');
  } catch { return url; }
}

// The facts each page shows, per tool, so the sources line links exactly the pages they were read on.
export function sourcesOf(p: AltPage | VsPage): { name: string; links: { href: string; label: string }[] }[] {
  const tools: ToolId[] = p.type === 'alternatives' ? [p.tool, ...p.entries.map(e => e.tool)] : [p.tool];
  const out: { name: string; links: { href: string; label: string }[] }[] = [];
  for (const id of [...new Set(tools)]) {
    if (id === 'fifty') continue;
    const t = TOOLS[id];
    const facts: (Fact | Cell | undefined)[] = [t.free, t.price, t.apps, ...t.better, t.move];
    if (p.type === 'alternatives') { const e = p.entries.find(x => x.tool === id); if (e) facts.push({ fact: '', url: e.limitUrl, read: '' }); }
    else facts.push(t.cells.free, t.cells.price, ...p.rows.map(r => t.cells[r]));
    const seen = new Map<string, string>();
    for (const f of facts) if (f && !seen.has(f.url)) seen.set(f.url, label(f.url));
    // two pages with the same short name get their host added
    const names = [...seen.values()];
    out.push({ name: t.name, links: [...seen].map(([href, l]) => ({ href, label: names.filter(n => n === l).length > 1 ? `${l} (${new URL(href).hostname.replace(/^www\./, '')})` : l })) });
  }
  return out;
}

export function SourcesLine({ p }: { p: AltPage | VsPage }) {
  const s = sourcesOf(p);
  return (
    <p className="cmp3-src">
      Prices checked {checkedMonth}, on each tool&rsquo;s own pages:{' '}
      {s.map((t, i) => (
        <span key={t.name}>
          {i > 0 && '; '}{t.name}{' '}
          {t.links.map((l, j) => <span key={l.href}>{j > 0 && ', '}<a href={l.href} target="_blank" rel="noopener">{l.label}</a></span>)}
        </span>
      ))}
      . 50agents from its live app.
    </p>
  );
}

// Who should pick which: two cards, 50agents on its tint, the other tool plain.
export function PickCards({ p }: { p: AltPage | VsPage }) {
  const them = TOOLS[p.tool].name;
  const gone = p.type === 'alternatives' && !!TOOLS[p.tool].status;
  return (
    <div className="cmp3-pick">
      <div className="us">
        <h3>Pick 50agents if</h3>
        <ul>{p.pick.us.map(s => <li key={s.slice(0, 40)}>{s}</li>)}</ul>
      </div>
      <div>
        <h3>{p.type === 'versus' ? `Pick ${them} if` : gone ? 'Pick another tool here if' : `Stay on ${them} if`}</h3>
        <ul>{p.pick.them.map(s => <li key={s.slice(0, 40)}>{s}</li>)}</ul>
      </div>
    </div>
  );
}
