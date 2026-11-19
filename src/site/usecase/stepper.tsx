'use client';
import { useEffect, useRef, useState } from 'react';

// How it works, as a stepper that moves with the scroll: the steps on the left, the active step's picture on the right.
// Each step takes about 40% of a screen of scrolling, so five steps pass in two screens. Clicking a step jumps to it.
// Phones (and reduced motion) get every step stacked with its own picture, no pinning.
export function ScrollStepper({ steps, pictures }: { steps: { title: string; body: string }[]; pictures: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight * 0.7;
      const p = Math.min(0.999, Math.max(0, (innerHeight * 0.18 - r.top) / Math.max(1, span)));
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
    const top = el.getBoundingClientRect().top + scrollY;
    const span = el.offsetHeight - innerHeight * 0.7;
    scrollTo({ top: top - innerHeight * 0.18 + span * ((i + 0.5) / steps.length), behavior: 'smooth' });
  };
  return (
    <div ref={ref} className="stp" style={{ ['--n' as string]: steps.length }}>
      <div className="stp-pin">
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
