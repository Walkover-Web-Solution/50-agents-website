// A browser agent's page as the 50agents app draws it (features/browser/agent-kind.tsx on Agents' page): while it works,
// its browser at the top of Overview (ink chrome, Live, the page's title, its sites as bookmarks saying how each went,
// what it is reading, pages so far and the time); its work item (what it wrote, then "Pages it visited"); its runs and
// setup. Example sites and prices, labelled.
import type { BrowserView } from '../types';
import { AgentFrame, Facts, RunRows } from './agent';

const Fav = ({ site }: { site: string }) => <i className="uc-fav" aria-hidden="true">{site.slice(0, 1).toUpperCase()}</i>;

export function BrowserPage({ a }: { a: BrowserView }) {
  const l = a.live;
  return (
    <AgentFrame name={a.name} face={a.face} status={a.status} tone={a.status === 'Working now' ? 'info' : 'ok'} word="browser agent"
      label={`${a.name}, a browser agent in the 50agents app: its browser while it reads competitors' pricing pages, the report it leaves and its setup. Example data.`}
      rail={{ o: 'Overview', c: 'Work', l: 'Setup', rest: [], order: ['o', 'Chat', 'c', 'l', 'Memory'] }}>
      <section className="pv-view pv-o">
        <div className="uc-win uc-first" aria-label="Its browser">
          <div className="uc-win-top"><span className="uc-live"><i />Live</span><span className="uc-win-t">{l.title}</span><span className="uc-win-x">Open full size</span></div>
          <div className="uc-marks">{l.marks.map(m => <span key={m.site} className={`uc-mark uc-m-${m.tone}`}><Fav site={m.site} />{m.site}<em>{m.word}</em></span>)}</div>
          <div className="uc-page">
            <p className="uc-page-url">{l.page.site}/pricing</p>
            <p className="uc-page-h">{l.page.heading}</p>
            <div className="uc-plans">{l.page.plans.map(p => <div key={p.name}><b>{p.name}</b><span>{p.price}</span>{p.note && <em>{p.note}</em>}</div>)}</div>
          </div>
          <div className="uc-win-foot"><span><i className="uc-spin" />{l.step}</span><span className="uc-dim">{l.pages} pages · {l.took}</span></div>
        </div>
        <p className="pv-sub">Recent runs</p>
        <RunRows runs={a.runs.slice(0, 4)} />
      </section>
      <section className="pv-view pv-c">
        <div className="uc-work uc-first">
          <h4>{a.report.title}</h4>
          <p className="mute">{a.report.when}</p>
          <div className="uc-res">
            <p className="uc-res-h">What changed</p>
            <table className="uc-diff">
              <thead><tr><th>Site</th><th>Plan</th><th>Was</th><th>Now</th></tr></thead>
              <tbody>{a.report.changed.map(c => <tr key={c.site + c.plan}><td>{c.site}</td><td>{c.plan}</td><td className="uc-was">{c.was}</td><td><b>{c.now}</b></td></tr>)}</tbody>
            </table>
            <p className="uc-same">{a.report.same.join(' ')}</p>
          </div>
          <div className="uc-res">
            <p className="uc-res-h">Pages it visited</p>
            <ul className="uc-pages">{a.report.pages.map(p => <li key={p}><Fav site={p} />{p}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="pv-view pv-l">
        <p className="pv-sub uc-first">How it works</p>
        <div className="uc-instr">{a.instructions.map((p, i) => <p key={i}>{p}</p>)}</div>
        <p className="pv-sub">The facts</p>
        <Facts rows={[['Runs', a.facts.runs], ['Its sites', a.facts.sites.join(', ')], ['Does alone', a.facts.alone], ['Asks you first', a.facts.asks]]} />
      </section>
    </AgentFrame>
  );
}
