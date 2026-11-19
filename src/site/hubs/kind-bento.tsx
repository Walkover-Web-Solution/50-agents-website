// The four kinds as a bento (D255, round 3), replacing the "which kind" table: the homepage's kind cards, smaller. On a
// hub its own kind leads (full width, text beside its picture); the other three sit under it and link to their hubs.
// The kind tints live only inside these cards. Each picture is a small drawing of what that kind does, in the server HTML.
import { KIND_CARDS, KIND_ORDER } from '@/content/hubs/kinds';
import { AppLogo, Face, KINDS, LIVE, KindFace } from '../parts';
import type { Kind } from '../types';

function Picture({ kind }: { kind: Kind }) {
  if (kind === 'ai')
    return (
      <div className="kb-chat">
        <div className="kb-chat-h"><Face id="writer" size={26} /><span><b>Writer</b><small>AI agent</small></span></div>
        <div className="kb-msg out">Follow up on deals quiet for 5 days</div>
        <div className="kb-msg in">3 follow-ups drafted. Send them?</div>
        <div className="kb-ask"><span>Approve and send</span><span>Change</span></div>
      </div>
    );
  if (kind === 'auto')
    return (
      <div className="kb-flow">
        <div className="kb-flow-h"><b>New payment</b><span className="kb-on" aria-label="On"><i /></span></div>
        <div className="kb-node"><AppLogo app="stripe" size={18} /><span><small>When</small>A payment comes in</span></div>
        <div className="kb-node"><AppLogo app="googlesheets" size={18} /><span><small>Then</small>Add it as a row</span></div>
      </div>
    );
  if (kind === 'browser')
    return (
      <div className="kb-web">
        <div className="kb-web-bar"><span className="kb-lights"><i /><i /><i /></span><span className="kb-url">rival.example/pricing</span></div>
        <div className="kb-web-page">
          <span className="kb-line w60" /><span className="kb-line w40" />
          <div className="kb-report"><Face id="scout" size={20} /><span>Pro plan went from $49 to $59</span></div>
        </div>
      </div>
    );
  return (
    <div className="kb-board">
      <div className="kb-board-h"><b>Invoices</b><Face id="chaser" size={20} /></div>
      <div className="kb-cols">
        <div><small>Due</small><span>Lumen<em>$1,200</em></span><span>Harbor<em>$640</em></span></div>
        <div><small>Late</small><span className="late">Brightside<em>$2,050</em></span></div>
        <div><small>Paid</small><span>Fieldnote<em>$900</em></span></div>
      </div>
    </div>
  );
}

function Card({ kind, lead }: { kind: Kind; lead: boolean }) {
  const k = KINDS[kind];
  const c = KIND_CARDS[kind];
  const inner = (
    <>
      <div className="kb-text">
        <span className="kb-kind"><KindFace kind={kind} size={20} />{k.label}</span>
        <h3>{c.title}</h3>
        <p>{c.body}</p>
      </div>
      <div className="kb-pic" aria-hidden="true"><Picture kind={kind} /></div>
    </>
  );
  const cls = `kb-card${lead ? ' lead' : ''}`;
  const style = { ['--kc' as string]: k.tint };
  // The card of the page you are on is not a link to itself.
  return lead || !LIVE.has(k.hub)
    ? <div className={cls} style={style} aria-current={lead ? 'page' : undefined}>{inner}</div>
    : <a className={cls} style={style} href={k.hub}>{inner}</a>;
}

export function KindBento({ current }: { current: Kind }) {
  const order = [current, ...KIND_ORDER.filter(k => k !== current)];
  return <div className="kb">{order.map(k => <Card key={k} kind={k} lead={k === current} />)}</div>;
}
