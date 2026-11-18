// The pieces of a comparison page (pages-brief B4, Part C): plain, sourced, easy to trust.
// Every fact shown here comes from src/content/compare/facts.ts with its link and the date it was read.
import { CHECKED, ROWS, TOOLS, type Cell, type Fact, type Mark, type RowKey, type ToolId } from '@/content/compare/facts';
import type { AltEntry } from '@/content/compare/types';

const host = (url: string) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
};

// A source line: the page the fact was read on, and when. 50agents' own facts come from the app.
export function Src({ url, read = CHECKED, ours = false }: { url: string; read?: string; ours?: boolean }) {
  if (ours) return <span className="cmp-src">From the 50agents app, {read}</span>;
  return <a className="cmp-src" href={url} target="_blank" rel="noopener">{host(url)}, read {read}</a>;
}

export function FactLine({ label, fact, ours = false }: { label: string; fact?: Fact; ours?: boolean }) {
  if (!fact) return null;
  return (
    <div className="cmp-fact">
      <dt>{label}</dt>
      <dd>{fact.fact}{!ours && <> <Src url={fact.url} read={fact.read} /></>}</dd>
    </div>
  );
}

const MARK_LABEL: Record<Mark, string> = { yes: 'Yes', no: 'No', partly: 'Partly' };
export function MarkIcon({ v }: { v: Mark }) {
  const path = v === 'yes' ? <path d="M20 6 9 17l-5-5" /> : v === 'no' ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M5 12h14" />;
  return (
    <span className={`mk mk-${v}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>
      {MARK_LABEL[v]}
    </span>
  );
}

function CellView({ cell }: { cell: Cell }) {
  return (
    <>
      {cell.v !== 'text' && <MarkIcon v={cell.v} />}
      <span className={cell.v === 'text' ? 'cell-t' : 'cell-n'}>{cell.note}</span>
    </>
  );
}

// The versus table. Only rows where the other tool has a checked cell are shown; each row links its source.
export function VsTable({ tool, rows }: { tool: ToolId; rows: RowKey[] }) {
  const us = TOOLS.fifty;
  const them = TOOLS[tool];
  const shown = rows.filter(r => them.cells[r] && us.cells[r]);
  return (
    <div className="vs-wrap">
      <table className="vs">
        <caption>50agents and {them.name}, checked on {CHECKED}</caption>
        <thead>
          <tr><th scope="col">What you get</th><th scope="col">50agents</th><th scope="col">{them.name}</th><th scope="col">Source</th></tr>
        </thead>
        <tbody>
          {shown.map(r => {
            const a = us.cells[r]!;
            const b = them.cells[r]!;
            return (
              <tr key={r}>
                <th scope="row">{ROWS[r]}</th>
                <td data-who="50agents"><CellView cell={a} /></td>
                <td data-who={them.name}><CellView cell={b} /></td>
                <td className="vs-src"><a href={b.url} target="_blank" rel="noopener">{host(b.url)}</a><span>read {b.read}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="cmp-note">The {them.name} column links the page each fact was read on. The 50agents column is from the live 50agents app on {CHECKED}. Rows we could not check on {them.name}&rsquo;s own pages are left out.</p>
    </div>
  );
}

// One alternative: who it suits, its price and apps (linked and dated), one honest limitation, and where it beats 50agents.
export function AltCard({ e, n }: { e: AltEntry; n: number }) {
  const t = TOOLS[e.tool];
  const ours = e.tool === 'fifty';
  return (
    <article className={`alt${ours ? ' alt-us' : ''}`} id={`alt-${t.id}`}>
      <header>
        <span className="alt-n">{n}</span>
        <h3>{t.name}</h3>
        {ours && <span className="alt-tag">Our product</span>}
      </header>
      <p className="alt-what">{t.what.fact}</p>
      <dl className="cmp-facts">
        <div className="cmp-fact"><dt>Who it suits</dt><dd>{e.suits}</dd></div>
        <FactLine label="Free" fact={t.free} ours={ours} />
        <FactLine label="Pricing" fact={t.price} ours={ours} />
        <FactLine label="Apps" fact={t.apps} ours={ours} />
        <div className="cmp-fact lim"><dt>One honest limitation</dt><dd>{e.limit} {e.limitUrl && !e.limitUrl.includes('50agents.com') && <Src url={e.limitUrl} />}</dd></div>
        {!ours && t.better.length > 0 && (
          <div className="cmp-fact win"><dt>Better than 50agents at</dt><dd>{t.better.map(b => <span key={b.fact} className="win-i">{b.fact} <Src url={b.url} read={b.read} /></span>)}</dd></div>
        )}
      </dl>
      {ours && <p className="alt-ours"><Src url={t.site} ours /></p>}
    </article>
  );
}

// Every source used on the page, once each, with the date read.
export function Sources({ tools }: { tools: ToolId[] }) {
  const seen = new Map<string, string>();
  for (const id of tools) {
    if (id === 'fifty') continue;
    const t = TOOLS[id];
    const facts: (Fact | undefined)[] = [t.what, t.free, t.price, t.apps, t.status, t.move, ...t.limits, ...t.better];
    for (const f of facts) if (f && !seen.has(f.url)) seen.set(f.url, t.name);
    for (const c of Object.values(t.cells)) if (c && !seen.has(c.url)) seen.set(c.url, t.name);
  }
  return (
    <ul className="cmp-sources">
      {[...seen].map(([url, name]) => (
        <li key={url}><b>{name}</b> <a href={url} target="_blank" rel="noopener">{url.replace(/^https?:\/\//, '')}</a></li>
      ))}
    </ul>
  );
}

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="toc" aria-label="On this page">
      <p>On this page</p>
      <ol>{items.map(i => <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>)}</ol>
    </nav>
  );
}
