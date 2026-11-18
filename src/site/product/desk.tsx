// An app's desk as the 50agents app draws it (features/apps: the rail, Overview numbers, a board grouped by a choice,
// a table view, the crew and a Needs you card), from the app's recipes (features/apps/recipes.ts), with example data.
// The same frame and CSS-only tabs as the invoices desk; every label comes from the recipe.
import { Face } from '../parts';
import type { DeskView } from '../types';
import { Need } from './need';

const PILL = { warn: 'pill pill-reminded', ok: 'pill pill-paid', info: 'pill uc-pill-info' };

export function Desk({ d }: { d: DeskView }) {
  const [o, c, l] = d.views;
  return (
    <div className="pv" role="img" aria-label={`The ${d.name} in the 50agents app: ${o}, ${c} and ${l}. Example data.`}>
      <div className="pv-bar"><i /><i /><i /><span>50agents · {d.name}</span><em>Example data</em></div>
      <div className="pv-app">
        <input type="radio" name="pv" id="pv-o" defaultChecked aria-label={o} />
        <input type="radio" name="pv" id="pv-c" aria-label={c} />
        <input type="radio" name="pv" id="pv-l" aria-label={l} />
        <aside className="pv-rail">
          <label htmlFor="pv-o">{o}</label>
          <label htmlFor="pv-c">{c}</label>
          <label htmlFor="pv-l">{l}</label>
          {d.rest.slice(0, 1).map(r => <span key={r}>{r}</span>)}
          <hr />
          {d.rest.slice(1).map(r => {
            const [name, n] = r.split(' · ');
            return <span key={r}>{name}{n && <em>{n}</em>}</span>;
          })}
        </aside>
        <div className="pv-main">
          <div className="pv-head">
            <span className="pv-logo">{d.faces.map(f => <Face key={f} id={f} size={22} />)}</span>
            <div><b>{d.name}</b><span><i className="ok" />{d.count}</span></div>
            <span className="pv-acts"><span className="pv-b o sm">Change it</span><span className="pv-b sm">{d.add}</span></span>
          </div>
          <div className="pv-pills" aria-hidden="true">
            <label htmlFor="pv-o">{o}</label><label htmlFor="pv-c">{c}</label><label htmlFor="pv-l">{l}</label>
          </div>

          <section className="pv-view pv-o">
            <div className={`pv-nums n${d.numbers.length}`}>
              {d.numbers.map(x => <div key={x.label}><span>{x.label}</span><b className={x.warn ? 'warn' : undefined}>{x.value}</b></div>)}
            </div>
            <p className="pv-sub">{d.asks} <span className="pv-wait"><i />{d.waiting}</span></p>
            <Need n={d.need} />
            {d.crew.map(m => (
              <div key={m.name} className="pv-crew" style={{ background: m.tint }}>
                <Face id={m.face} size={30} />
                <div><b>{m.name}</b> <span className="mute">{m.face === 'scout' || m.face === 'pilot' ? 'browser agent' : 'AI agent'}</span><p>{m.line}</p></div>
              </div>
            ))}
          </section>

          <section className="pv-view pv-c">
            <div className={`pv-board n${d.board.length}`}>
              {d.board.map(col => (
                <div key={col.name} className="pv-col" style={{ background: col.tone }}>
                  <p><i style={{ background: col.dot }} /><b>{col.name}</b> {col.count}{col.total && <span>{col.total}</span>}</p>
                  {col.cards.map(x => (
                    <div key={x.b} className="pv-card"><b>{x.b}</b>{x.lines.map((t, i) => <span key={i} className={i === x.lines.length - 1 ? 'mute' : undefined}>{t}</span>)}</div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="pv-view pv-l">
            <div className="pv-search"><span>{d.table.search}</span><em>{d.table.shown}</em></div>
            <table className="pv-table">
              <thead><tr>{d.table.cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {d.table.rows.map(r => (
                  <tr key={r.cells[0]}>
                    {r.cells.map((t, i) => <td key={i}>{i === 0 ? <b>{t}</b> : t}{i === r.cells.length - 1 && r.flag && <span className="late">{r.flag}</span>}</td>)}
                    <td><span className={PILL[r.pillTone ?? 'info']}>{r.pill}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
