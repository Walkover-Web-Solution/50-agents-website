'use client';
import { useEffect, useRef } from 'react';

// The phone's sticky button, shown only once the hero (marked data-hero) has scrolled away. A variant of
// src/site/sticky.tsx for pages whose hero has no .hero-cta: guides (the short answer) and role pages (the film).
export function HeroSticky({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    const bar = ref.current;
    if (!hero || !bar || !('IntersectionObserver' in window)) { bar?.classList.add('on'); return; }
    const io = new IntersectionObserver(([e]) => bar.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="sticky">{children}</div>;
}
