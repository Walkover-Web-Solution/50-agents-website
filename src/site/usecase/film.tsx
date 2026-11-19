'use client';
import { useEffect, useRef, useState } from 'react';
import { APP_LOGIN } from '@/lib/app';
import { Face } from '../parts';

// The hero's short film (D253, D254, D260): Captain, the yellow blob, beside its chat box, and an ask typing itself in.
// One ask (`ask` + `button`): types once. Several (`asks` + `link`): types each, holds, clears, and moves on; the Build
// button always opens Captain with the ask on screen. Reduced motion shows the first ask. Every ask is in the HTML.
type Link = { page: string; place: string; campaign: string };
function href(l: Link, ask: string) {
  const u = new URL(APP_LOGIN);
  Object.entries({ utm_source: '50agents.com', utm_medium: 'website', utm_campaign: l.campaign, utm_content: `${l.page}__${l.place}`, draft: ask.slice(0, 499) }).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
}

export function PromptFilm({ ask, asks, button, link }: { ask: string; asks?: string[]; button?: React.ReactNode; link?: Link; children?: React.ReactNode }) {
  const list = asks && asks.length > 1 ? asks : [ask];
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [i, setI] = useState(0);
  const [stage, setStage] = useState<'idle' | 'typing' | 'done'>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(list[0]); setStage('done'); return; }
    let live = true;
    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
    const run = async () => {
      for (let n = 0; live; n = (n + 1) % list.length) {
        const a = list[n];
        setI(n); setStage('typing');
        const step = Math.max(14, Math.min(34, 1600 / a.length));
        for (let k = 1; k <= a.length && live; k++) { setTyped(a.slice(0, k)); await wait(step); }
        setStage('done');
        if (list.length === 1) return;
        await wait(2600);
        for (let k = a.length; k >= 0 && live; k -= 3) { setTyped(a.slice(0, k)); await wait(10); }
        await wait(250);
      }
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { live = false; io.disconnect(); };
  }, [list.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  const btn = list.length > 1 && link
    ? <a className="btn" href={href(link, list[i])} data-cta={`${link.page}:${link.place}`} rel="nofollow">Build it</a>
    : button;
  return (
    <div ref={ref} className={`film is-${stage}`}>
      <span className="film-captain" aria-hidden="true"><Face id="lead" size={44} /></span>
      <div className="film-box">
        <p className="film-text"><span className="sr">{list.join(' · ')}</span><span aria-hidden="true">{typed}</span><i className="caret" aria-hidden="true" /></p>
        {btn}
      </div>
    </div>
  );
}
