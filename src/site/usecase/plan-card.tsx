// Captain's plan for a use case, as the app shows it before you tap Build it: what it makes, when it runs, what it uses,
// what asks you first. Drawn from the page's `build`, so every use case gets one without design work.
import { AppLogo, Face, KINDS } from '../parts';
import type { UseCasePage } from './types';
import { appIcon, appName } from './apps-data';

export function PlanCard({ u, compact = false }: { u: UseCasePage; compact?: boolean }) {
  const k = KINDS[u.kind];
  return (
    <div className={compact ? 'plan compact' : 'plan'}>
      <div className="plan-h">
        <span className="plan-face" style={{ background: k.tint }}><Face id={k.face} size={26} /></span>
        <div><b>{u.build.name}</b><span>{k.label} · {u.build.line}</span></div>
      </div>
      <dl>
        <div><dt>Runs</dt><dd>{u.build.when}</dd></div>
        {!compact && <div><dt>Does</dt><dd>{u.build.does.join(' · ')}</dd></div>}
        {u.build.apps.length > 0 && (
          <div><dt>Uses</dt><dd className="plan-apps">{u.build.apps.map(a => <span key={a}><AppLogo app={a} icon={appIcon(a)} size={16} />{appName(a)}</span>)}</dd></div>
        )}
        <div><dt>Asks first</dt><dd>{u.build.asksFirst}</dd></div>
      </dl>
    </div>
  );
}
