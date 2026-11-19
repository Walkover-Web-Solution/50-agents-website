// One picture per step kind, drawn once and filled from the page's data: the ask, the plan, connecting the apps,
// the runs, and what waits for you. Small, calm, in the app's look; labelled as examples where they show example data.
import { AppLogo, Face, KINDS } from '../parts';
import { PlanCard } from './plan-card';
import { appIcon, appName } from './apps-data';
import type { StepKey, UseCasePage } from './types';

function Ask({ u }: { u: UseCasePage }) {
  return (
    <div className="pic pic-ask">
      <div className="pic-chat-h"><Face id="lead" size={22} /><b>Captain</b></div>
      <p className="pic-me">{u.ask}</p>
      <p className="pic-cap"><Face id="lead" size={18} />I&rsquo;ll set that up. A couple of quick questions first.</p>
    </div>
  );
}

function Connect({ u }: { u: UseCasePage }) {
  const apps = u.build.apps.length ? u.build.apps : [];
  return (
    <div className="pic pic-connect">
      {apps.length === 0 && <p className="pic-empty">No app to connect: it works on websites, in its own browser.</p>}
      {apps.map((a, i) => (
        <div key={a} className="pic-row">
          <span className="pic-logo"><AppLogo app={a} icon={appIcon(a)} size={26} /></span>
          <b>{appName(a)}</b>
          {i === 0 ? <span className="pic-ok">Connected</span> : <span className="pic-btn">Connect</span>}
        </div>
      ))}
    </div>
  );
}

function Runs({ u }: { u: UseCasePage }) {
  const k = KINDS[u.kind];
  return (
    <div className="pic pic-runs">
      <div className="pic-chat-h"><span className="plan-face sm" style={{ background: k.tint }}><Face id={k.face} size={18} /></span><b>{u.build.name}</b><span className="pic-live"><i />Live</span></div>
      <ul>{u.run.map(r => <li key={r.when + r.did}><span>{r.when}</span><b>{r.did}</b></li>)}</ul>
      <p className="pic-ex">Example runs</p>
    </div>
  );
}

function Approve({ u }: { u: UseCasePage }) {
  const a = u.approval!;
  return (
    <div className="pic pic-need">
      <div className="pic-need-h"><Face id={KINDS[u.kind].face} size={22} /><span>{u.build.name} asks you</span><em><i />Needs you</em></div>
      <b className="pic-need-t">{a.title}</b>
      {a.to && <p className="pic-to">To {a.to}</p>}
      <div className="pic-body">{a.lines.map(l => <p key={l}>{l}</p>)}</div>
      <div className="pic-acts"><span className="pic-btn ink">{a.button}</span><span className="pic-btn">Change</span><span className="pic-btn">Decline</span></div>
    </div>
  );
}

function Result({ u }: { u: UseCasePage }) {
  const r = u.result!;
  return (
    <div className="pic pic-result">
      <b className="pic-need-t">{r.title}</b>
      <ul>{r.lines.map(l => <li key={l}>{l}</li>)}</ul>
      <p className="pic-ex">Example</p>
    </div>
  );
}

export function stepPicture(key: StepKey, u: UseCasePage) {
  switch (key) {
    case 'ask': return <Ask u={u} />;
    case 'plan': return <div className="pic pic-plan"><PlanCard u={u} /></div>;
    case 'connect': return <Connect u={u} />;
    case 'run': return <Runs u={u} />;
    case 'approve': return u.approval ? <Approve u={u} /> : <Runs u={u} />;
    case 'result': return u.result ? <Result u={u} /> : <Runs u={u} />;
  }
}
