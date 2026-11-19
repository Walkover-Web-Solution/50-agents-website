'use client';
import { useEffect } from 'react';

// Reading progress for a guide (guides v5): marks the contents link of the section being read (aria-current) and sets
// --read (0 to 1, how far through the article) on the contents and on a thin bar at the top of a phone's screen. The
// contents and the article are server HTML; without JavaScript they still work as plain links.
export function ReadProgress() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.gd5-toc');
    const bar = document.querySelector<HTMLElement>('.gd5-bar');
    const art = document.querySelector<HTMLElement>('.gd5-col');
    if (!art) return;
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.gd5-toc a[href^="#"]'));
    const secs = links.map(a => document.getElementById(a.hash.slice(1))).filter((x): x is HTMLElement => !!x);
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = art.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.35 - r.top) / Math.max(1, r.height - vh * 0.5)));
      nav?.style.setProperty('--read', p.toFixed(3));
      bar?.style.setProperty('--read', p.toFixed(3));
      let cur = -1;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.35) cur = i; });
      links.forEach((a, i) => (i === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="gd5-bar" aria-hidden="true"><i /></div>;
}
