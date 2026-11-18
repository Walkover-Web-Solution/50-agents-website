// An AI agent's page as the 50agents app draws it (features/agents/client.tsx AgentPage): the header with its status
// line, Run now and Pause; the rail (Overview, Chat, Work, Setup, Memory); Overview's Waits on you, Latest work and
// Recent runs; Work's filters; Setup's How it works and The facts. Example data, labelled. CSS-only tabs, as the desk.
import { Face } from '../parts';
import { AppChip, AppIcon } from './app-icon';
import type { AgentView, ResultBlock, RunStatus } from '../types';
import { Need } from './need';

const TONE: Record<RunStatus, string> = { Done: 'ok', 'Waits on you': 'warn', 'Did not work': 'bad', 'Working now': 'info' };
export const RunWord = ({ s }: { s: RunStatus }) => <span className={`uc-run uc-${TONE[s]}`}>{s}</span>;

export function Result({ r }: { r: ResultBlock }) {
  if (r.type === 'email')
    return (
      <div className="uc-res">
        <p className="uc-res-h"><AppIcon app="gmail" /> Email</p>
        <dl className="pv-mail"><div><dt>To</dt><dd>{r.to}</dd></div><div><dt>Subject</dt><dd>{r.subject}</dd></div></dl>
        <div className="pv-body">{r.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      </div>
    );
  if (r.type === 'slack')
    return (
      <div className="uc-res">
        <p className="uc-res-h"><AppIcon app="slack" /> Slack · {r.channel}</p>
        <div className="uc-slack">{r.lines.map((l, i) => <p key={i}>{l.b && <b>{l.b} </b>}{l.t}</p>)}</div>
      </div>
    );
  return (
    <div className="uc-res">
      <p className="uc-res-h">{r.title}</p>
      <ul className="uc-list">{r.items.map(x => <li key={x.b}><div><b>{x.b}</b><span>{x.t}</span></div>{x.tag && <em>{x.tag}</em>}</li>)}</ul>
    </div>
  );
}

export function RunRows({ runs }: { runs: { title: string; when: string; status: RunStatus }[] }) {
  return (
    <div className="uc-rows">
      {runs.map(r => (
        <div key={r.title + r.when} className="uc-row"><span><b>{r.title}</b><span>{r.when}</span></span><RunWord s={r.status} /></div>
      ))}
    </div>
  );
}

export function Facts({ rows }: { rows: [string, React.ReactNode][] }) {
  return <dl className="uc-facts">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}

export function AgentFrame({ name, face, status, tone, label, rail, children, word }: { name: string; face: string; status: string; tone: 'ok' | 'warn' | 'info'; label: string; rail: { o: string; c: string; l: string; rest: string[]; order: string[] }; word: string; children: React.ReactNode }) {
  const item = (k: string) => k === 'o' ? <label key={k} htmlFor="pv-o">{rail.o}</label> : k === 'c' ? <label key={k} htmlFor="pv-c">{rail.c}</label> : k === 'l' ? <label key={k} htmlFor="pv-l">{rail.l}</label> : <span key={k}>{k}</span>;
  return (
    <div className="pv" role="img" aria-label={label}>
      <div className="pv-bar"><i /><i /><i /><span>50agents · Agents · {name}</span><em>Example data</em></div>
      <div className="pv-app">
        <input type="radio" name="pv" id="pv-o" defaultChecked aria-label={rail.o} />
        <input type="radio" name="pv" id="pv-c" aria-label={rail.c} />
        <input type="radio" name="pv" id="pv-l" aria-label={rail.l} />
        <aside className="pv-rail">{rail.order.map(item)}</aside>
        <div className="pv-main">
          <div className="pv-head">
            <span className="pv-logo"><Face id={face} size={34} /></span>
            <div><b>{name}</b><span className={tone === 'ok' ? undefined : `uc-st-${tone}`}><i className={tone === 'ok' ? 'ok' : `uc-dot-${tone}`} />{status}</span><span className="uc-word">{word}</span></div>
            <span className="pv-acts"><span className="pv-b sm">Run now</span><span className="pv-b o sm">Pause</span></span>
          </div>
          <div className="pv-pills" aria-hidden="true">
            <label htmlFor="pv-o">{rail.o}</label><label htmlFor="pv-c">{rail.c}</label><label htmlFor="pv-l">{rail.l}</label>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AgentPage({ a }: { a: AgentView }) {
  const waits = a.runs.filter(r => r.status === 'Waits on you').length, failed = a.runs.filter(r => r.status === 'Did not work').length;
  return (
    <AgentFrame name={a.name} face={a.face} status={a.status} tone={a.tone} word="AI agent"
      label={`${a.name}, an AI agent in the 50agents app: what waits on you, its latest work, its runs and its setup. Example data.`}
      rail={{ o: 'Overview', c: 'Work', l: 'Setup', rest: [], order: ['o', 'Chat', 'c', 'l', 'Memory'] }}>
      <section className="pv-view pv-o">
        {a.waits && <><p className="pv-sub uc-first">{(a.waiting ?? 1) === 1 ? 'Waits on you' : `${a.waiting} wait on you`} <span className="pv-wait"><i />{a.waiting ?? 1}</span></p><Need n={a.waits} /></>}
        <p className={a.waits ? 'pv-sub' : 'pv-sub uc-first'}>Latest work</p>
        <div className="uc-work">
          <h4>{a.latest.title}</h4>
          <p className="mute">{a.latest.when} · {a.latest.summary}</p>
          <Result r={a.latest.result} />
        </div>
        <p className="pv-sub">Recent runs</p>
        <RunRows runs={a.runs.slice(0, 4)} />
      </section>
      <section className="pv-view pv-c">
        <div className="uc-chips"><span className="on">All {a.runs.length}</span><span>Waits on you {waits}</span><span>Did not work {failed}</span></div>
        <RunRows runs={a.runs} />
      </section>
      <section className="pv-view pv-l">
        <p className="pv-sub uc-first">How it works</p>
        <div className="uc-instr">{a.instructions.map((p, i) => <p key={i}>{p}</p>)}</div>
        <p className="pv-sub">The facts</p>
        <Facts rows={[
          ['Runs', a.facts.runs],
          ['Its apps', <span key="a" className="uc-apps">{a.facts.apps.map(x => <AppChip key={x} app={x} />)}</span>],
          ['Does alone', a.facts.alone],
          ['Asks you first', a.facts.asks],
        ]} />
      </section>
    </AgentFrame>
  );
}
