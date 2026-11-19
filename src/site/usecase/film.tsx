'use client';
import { useEffect, useRef, useState } from 'react';
import { Face } from '../parts';

// The hero's short film (D253, D254): Captain, the yellow blob, beside its chat box, and the page's ask typing itself
// in. It plays once, when in view, in about two seconds; with reduced motion it shows the end. No plan card under it.
// `children` is accepted for older callers and not drawn.
export function PromptFilm({ ask, button }: { ask: string; button: React.ReactNode; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [stage, setStage] = useState<'idle' | 'typing' | 'done'>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(ask); setStage('done'); return; }
    let live = true;
    const run = async () => {
      setStage('typing');
      const step = Math.max(14, Math.min(34, 1600 / ask.length));
      for (let i = 1; i <= ask.length && live; i++) { setTyped(ask.slice(0, i)); await new Promise(r => setTimeout(r, step)); }
      if (live) setStage('done');
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { live = false; io.disconnect(); };
  }, [ask]);
  return (
    <div ref={ref} className={`film is-${stage}`}>
      <span className="film-captain" aria-hidden="true"><Face id="lead" size={44} /></span>
      <div className="film-box">
        <p className="film-text"><span className="sr">{ask}</span><span aria-hidden="true">{typed}</span><i className="caret" aria-hidden="true" /></p>
        {button}
      </div>
    </div>
  );
}
