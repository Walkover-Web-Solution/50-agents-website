'use client';
import { useState } from 'react';
import { CREW_FACES } from './crewFaces';

// The 50agents wordmark, as on the landing: Schibsted Grotesk 800, the 0 is a crew member picked at random (D69, D93).
export default function Logo({ size = 26, byline = true }: { size?: number; byline?: boolean }) {
  const [id] = useState(() => { const ids = Object.keys(CREW_FACES); return ids[Math.floor(Math.random() * ids.length)]; });
  return (
    <span className="inline-flex flex-col items-start leading-none" aria-label="50agents, from viaSocket">
      <span className="inline-flex items-center whitespace-nowrap" style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontWeight: 800, letterSpacing: '-.045em', fontSize: size, color: 'var(--ink)' }}>
        5<span className="inline-block [&>svg]:h-full [&>svg]:w-auto" style={{ height: size * 0.92, margin: '0 .03em 0 .01em' }} dangerouslySetInnerHTML={{ __html: CREW_FACES[id] }} />agents
      </span>
      {byline && <span style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontWeight: 500, fontSize: Math.max(12, size * .36), opacity: .62, marginTop: '.32em', color: 'var(--ink)' }}>from viaSocket</span>}
    </span>
  );
}
