'use client';
import { useEffect, useRef } from 'react';

// The phone's sticky button shows only once the hero's own button has scrolled away, so the first screen stays calm.
export function StickyBar({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = document.querySelector('.film-box .btn, .hero-cta');
    const bar = ref.current;
    if (!hero || !bar || !('IntersectionObserver' in window)) { bar?.classList.add('on'); return; }
    const io = new IntersectionObserver(([e]) => bar.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="sticky">{children}</div>;
}
