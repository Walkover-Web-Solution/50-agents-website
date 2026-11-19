'use client';
import { useEffect, useRef, useState } from 'react';

// How it works, as a stepper that moves with the scroll: the steps on the left, the active step's picture on the right.
// The block (its heading included) docks centred on screen; each step takes about 30% of a screen of scrolling. Clicking a step jumps to it.
// Phones (and reduced motion) get every step stacked with its own picture, no pinning.
export function ScrollStepper({ steps, pictures, head }: { steps: { title: string; body: string }[]; pictures: React.ReactNode[]; head?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // progress runs while the pinned block sits still: from when it docks until the section scrolls past it
    const tick = () => {
      const pin = el.firstElementChild as HTMLElement;
      const top = parseFloat(getComputedStyle(pin).top) || 0;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - pin.offsetHeight);
      const p = Math.min(0.999, Math.max(0, (top - r.top) / span));
      setOn(Math.floor(p * steps.length));
    };
    tick();
    addEventListener('scroll', tick, { passive: true });
    addEventListener('resize', tick);
    return () => { removeEventListener('scroll', tick); removeEventListener('resize', tick); };
  }, [steps.length]);
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const pin = el.firstElementChild as HTMLElement;
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const span = el.offsetHeight - pin.offsetHeight;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - top + span * ((i + 0.5) / steps.length), behavior: 'smooth' });
  };
  return (
    <div ref={ref} className="stp" style={{ ['--n' as string]: steps.length }}>
      <div className="stp-pin">
        {head && <div className="stp-head">{head}</div>}
        <ol className="stp-list">
          {steps.map((s, i) => (
            <li key={s.title} className={i === on ? 'on' : i < on ? 'past' : ''}>
              <button type="button" onClick={() => jump(i)} aria-current={i === on ? 'step' : undefined}>
                <span className="stp-n">{i + 1}</span>
                <span className="stp-t">{s.title}</span>
              </button>
              <p>{s.body}</p>
              <div className="stp-pic-m">{pictures[i]}</div>
            </li>
          ))}
        </ol>
        <div className="stp-pics" aria-hidden="true">
          {pictures.map((p, i) => <div key={i} className={i === on ? 'stp-pic on' : 'stp-pic'}>{p}</div>)}
        </div>
      </div>
    </div>
  );
}
