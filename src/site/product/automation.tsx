// An automation's page as the 50agents app draws it (features/automations: agent-kind.tsx, track.tsx): the rail
// (Overview, Chat, Runs, Steps, Setup; no Memory), Overview's today in numbers and How it works (one card per start and
// step with its app's catalog icon, today's count through each, the data each hands on), a run step by step, and Steps
// with each step's settings. Example data, labelled. CSS-only tabs, as the desk.
import type { AutomationView, TrackStation } from '../types';
import { AgentFrame, RunWord } from './agent';
import { AppIcon } from './app-icon';
import { Need } from './need';

const MARK: Record<string, string> = { ai: 'AI', if: 'If', set: '=' };
function Icon({ mark, app }: { mark: TrackStation['mark']; app?: string }) {
  if (mark === 'app' && app) return <span className="uc-ico"><AppIcon app={app} size={18} /></span>;
  return <span className={`uc-ico uc-ico-${mark}`} aria-label={mark === 'ai' ? 'AI step' : mark === 'if' ? 'Condition' : undefined}>{MARK[mark]}</span>;
}

function Track({ stations, settings }: { stations: TrackStation[]; settings?: boolean }) {
  return (
    <ol className="uc-track">
      {stations.map((s, i) => (
        <li key={s.key}>
          <div className="uc-st">
            <Icon mark={s.mark} app={s.app} />
            <div className="uc-st-b">
              <div className="uc-st-t"><p>{s.say}</p>{settings ? (s.asks && <em className="uc-warn">Asks you first</em>) : s.today !== undefined ? <b>{s.today}</b> : s.asks ? <em className="uc-warn">Asks you first</em> : null}</div>
              {settings && s.settings && <dl>{s.settings.map(v => <div key={v.label}><dt>{v.label}</dt><dd>{v.value}</dd></div>)}</dl>}
              {!settings && s.asks && s.today !== undefined && <span className="uc-warn uc-sm">Asks you first</span>}
            </div>
          </div>
          {i < stations.length - 1 && <div className="uc-line"><i />{s.passes && <span>{s.passes.map(p => <em key={p}>{p}</em>)}</span>}</div>}
        </li>
      ))}
    </ol>
  );
}

export function AutomationPage({ a }: { a: AutomationView }) {
  const run = a.runs[0];
  return (
    <AgentFrame name={a.name} face={a.face} status={a.status} tone={a.waits ? 'warn' : 'ok'} word="automation"
      label={`${a.name}, an automation in the 50agents app: today in numbers, how it works step by step, a run and its steps. Example data.`}
      rail={{ o: 'Overview', c: 'Runs', l: 'Steps', rest: [], order: ['o', 'Chat', 'c', 'l', 'Setup'] }}>
      <section className="pv-view pv-o">
        {a.waits && <><p className="pv-sub uc-first">Waits on you <span className="pv-wait"><i />1</span></p><Need n={a.waits} /></>}
        <div className={`uc-today${a.waits ? '' : ' uc-first'}`}>
          {([['Runs today', a.today.runs], ['Did something', a.today.did], ['Did not work', a.today.failed], ['Credits today', a.today.credits]] as const).map(([k, v]) => (
            <div key={k}><span>{k}</span><b className={k === 'Did not work' && v > 0 ? 'uc-bad' : undefined}>{v}</b></div>
          ))}
        </div>
        <div className="uc-howhd"><h4>How it works</h4><span>today, through each step · change it in its chat</span></div>
        <Track stations={a.stations} />
        {a.sheet && (
          <>
            <p className="pv-sub">In your Google Sheet</p>
            <div className="uc-sheet">
              <p className="uc-res-h"><AppIcon app="google-sheets" /> {a.sheet.name}</p>
              <div className="uc-sheet-s">
                <table>
                  <thead><tr><th />{a.sheet.cols.map((c, i) => <th key={c}>{String.fromCharCode(65 + i)}</th>)}</tr></thead>
                  <tbody>
                    <tr className="uc-sheet-h"><td>1</td>{a.sheet.cols.map(c => <td key={c}>{c}</td>)}</tr>
                    {a.sheet.rows.map((r, i) => <tr key={i} className={i === a.sheet!.rows.length - 1 ? 'uc-new' : undefined}><td>{i + 2}</td>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
      <section className="pv-view pv-c">
        <p className="pv-sub uc-first">{run.title} <span className="mute uc-norm">{run.when}</span> <RunWord s={run.status} /></p>
        <ol className="uc-runsteps" aria-label="Its steps in this run">
          {run.steps.map((s, i) => (
            <li key={i}>
              <Icon mark={s.mark} app={s.app} />
              <div>
                <div className="uc-st-t"><p>{i === 0 ? `Started: ${s.say}` : s.say}</p><span className={s.did === 'Done' ? 'uc-ok' : s.did === 'Waits on you' ? 'uc-warn' : 'mute'}>{s.did}{s.ms ? ` · ${(s.ms / 1000).toFixed(1)} s` : ''}</span></div>
                {s.got && <p className="uc-got">{s.got.map(v => <span key={v.label}><i>{v.label}:</i> {v.value}</span>)}</p>}
              </div>
            </li>
          ))}
        </ol>
        <p className="pv-sub">Earlier runs</p>
        <div className="uc-rows">
          {a.runs.slice(1).map(r => <div key={r.title + r.when} className="uc-row"><span><b>{r.title}</b><span>{r.when}</span></span><RunWord s={r.status} /></div>)}
        </div>
      </section>
      <section className="pv-view pv-l">
        <p className="uc-note uc-first">The same every time. To change a step, tell it in its chat; each change is tested and kept as a version you can undo.</p>
        <Track stations={a.stations} settings />
      </section>
    </AgentFrame>
  );
}
