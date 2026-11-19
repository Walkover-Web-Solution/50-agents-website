'use client';
import { useEffect, useRef, useState } from 'react';

// The hero's short film: the page's ask types itself into Captain's box, then Captain's plan appears under it.
// It plays once, when in view, in about three seconds; with reduced motion it shows the end. The plan card is rendered
// on the server and passed in, so the text is in the HTML for crawlers.
export function PromptFilm({ ask, button, children }: { ask: string; button: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [stage, setStage] = useState<'idle' | 'typing' | 'plan'>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(ask); setStage('plan'); return; }
    let live = true;
    const run = async () => {
      setStage('typing');
      const step = Math.max(14, Math.min(34, 1600 / ask.length));
      for (let i = 1; i <= ask.length && live; i++) { setTyped(ask.slice(0, i)); await new Promise(r => setTimeout(r, step)); }
      await new Promise(r => setTimeout(r, 450));
      if (live) setStage('plan');
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { live = false; io.disconnect(); };
  }, [ask]);
  return (
    <div ref={ref} className={`film is-${stage}`}>
      <div className="film-box">
        <span className="film-cap" aria-hidden="true">Captain</span>
        <p className="film-text"><span className="sr">{ask}</span><span aria-hidden="true">{typed}</span><i className="caret" aria-hidden="true" /></p>
        {button}
      </div>
      <div className="film-plan">{children}</div>
    </div>
  );
}
