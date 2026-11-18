// A Needs you card, as the app draws one for a send that reaches someone outside (needs/card.tsx): who asks, from where,
// what it would send, and the answers. Example data, labelled on the frame around it.
import { Face } from '../parts';
import type { NeedCard } from '../types';

export function Need({ n }: { n: NeedCard }) {
  return (
    <article className="pv-need" aria-label="Waiting for your OK in Needs you">
      <header>
        <Face id={n.face} size={26} />
        <div>
          <b>{n.by}</b> <span className="mute">· {n.where} · {n.ago}</span>
          <p className="pv-need-t">{n.title}</p>
        </div>
      </header>
      <dl className="pv-mail">
        {n.rows.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}
      </dl>
      <div className="pv-body">{n.body.map((p, i) => <p key={i}>{p.split('\n').map((l, j) => <span key={j}>{j ? <br /> : null}{l}</span>)}</p>)}</div>
      <footer>{n.actions.map((a, i) => <span key={a} className={i ? 'pv-b o' : 'pv-b'}>{a}</span>)}</footer>
    </article>
  );
}
