// Captain's side of the build, as the chat shows it (agents/parts.tsx PlanCard): the ask, one of its questions when the
// recipe asks one, and the plan card with Build it. Every use case's hero draws its own plan from its content file.
import { Face } from '../parts';
import type { CaptainPlan } from '../types';

export function CaptainBuild({ ask, q, plan }: { ask: string; q?: { q: string; choices: string[]; picked: string }; plan: CaptainPlan }) {
  return (
    <div className="cb" aria-label={`Captain building from "${ask}"`}>
      <div className="cb-hd"><Face id="lead" size={24} /><b>Captain</b><span className="mute">· {plan.mode}</span></div>
      <div className="cb-chat">
        <p className="cb-me">{ask}</p>
        {q && (
          <div className="cb-q">
            <p>{q.q}</p>
            <div>{q.choices.map(c => <span key={c} className={c === q.picked ? 'on' : ''}>{c}</span>)}</div>
          </div>
        )}
        <div className="cb-plan">
          <div className="cb-plan-h"><span className="pv-logo">{plan.faces.map(f => <Face key={f} id={f} size={20} />)}</span><div><b>{plan.name}</b><span>{plan.line}</span></div></div>
          <ul>
            {plan.rows.map(r => (
              <li key={r.label}><b>{r.label}</b><span>{r.face && <Face id={r.face} size={16} />}{r.face ? ` ${r.value}` : r.value}</span></li>
            ))}
          </ul>
          <div className="cb-acts"><span className="pv-b sm">Build it</span><span className="pv-b o sm">Change something</span></div>
        </div>
      </div>
    </div>
  );
}
