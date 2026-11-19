'use client';
import { useState } from 'react';
import { Face, KINDS } from '../parts';
import type { Kind } from '../types';

// The kind chips over /use-cases (D254): All, AI agent, Automation, App, Browser agent. The cards are server-rendered
// children and all stay in the HTML; a chip only sets data-show on the grid, and CSS hides the other kinds' cards.
const ORDER: Kind[] = ['ai', 'auto', 'app', 'browser'];

export function KindFilter({ kinds, children }: { kinds: Kind[]; children: React.ReactNode }) {
  const [show, setShow] = useState<Kind | 'all'>('all');
  const chips: (Kind | 'all')[] = ['all', ...ORDER.filter(k => kinds.includes(k))];
  return (
    <>
      <div className="ixf-chips" role="group" aria-label="Filter by kind">
        {chips.map(c => (
          <button key={c} type="button" aria-pressed={show === c} className={show === c ? 'on' : undefined} onClick={() => setShow(c)}>
            {c !== 'all' && <Face id={KINDS[c].face} size={20} />}
            {c === 'all' ? 'All' : KINDS[c].label}
          </button>
        ))}
      </div>
      <div className="cards3 ixf-grid" data-show={show}>{children}</div>
    </>
  );
}
