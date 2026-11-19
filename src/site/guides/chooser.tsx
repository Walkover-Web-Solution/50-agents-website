// "Which one do I need" (D254, guides v4): a short tree of questions answered with native radios. The branch for the
// chosen option shows by CSS (:has, guides.css), so it works by keyboard (arrow keys pick) and without JavaScript, and
// every question and answer is in the server HTML. An answer can name its kind in a small tinted label (no faces, D258).
import { KINDS, MaybeLink } from '../parts';
import { rich } from './rich';
import type { Choice, ChoiceAnswer } from './types';

const isChoice = (x: Choice | ChoiceAnswer): x is Choice => 'q' in x;

function Answer({ a, label }: { a: ChoiceAnswer; label: (href: string) => string }) {
  return (
    <div className="gch-a" style={a.kind ? { ['--k' as string]: KINDS[a.kind].tint } : undefined}>
      <div>
        {a.kind && <span className="gch-a-k">{KINDS[a.kind].label}</span>}
        <p className="gch-a-t">{rich(a.answer)}</p>
        <p className="gch-a-w">{rich(a.why)}</p>
        {a.href && <p className="gch-a-l"><MaybeLink href={a.href}>{label(a.href)}</MaybeLink></p>}
      </div>
    </div>
  );
}

function Node({ c, name, label }: { c: Choice; name: string; label: (href: string) => string }) {
  return (
    <fieldset className="gch-q">
      <legend>{c.q}</legend>
      <div className="gch-opts">
        {c.options.map((o, i) => (
          <label key={o.label}><input type="radio" name={name} value={String(i)} /><span>{o.label}</span></label>
        ))}
      </div>
      <div className="gch-next">
        {c.options.map((o, i) => (
          <div key={o.label} className="gch-b">{isChoice(o.then) ? <Node c={o.then} name={`${name}-${i}`} label={label} /> : <Answer a={o.then} label={label} />}</div>
        ))}
      </div>
    </fieldset>
  );
}

export function Chooser({ root, id, label }: { root: Choice; id: string; label: (href: string) => string }) {
  return <div className="gch"><Node c={root} name={id} label={label} /></div>;
}
