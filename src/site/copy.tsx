'use client';
import { useState } from 'react';

// A copyable ask: the words to give Captain, and a Copy button.
export function CopyAsk({ text, small = false }: { text: string; small?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1600); } catch {}
  };
  return (
    <div className={small ? 'ask sm' : 'ask'}>
      <span>&ldquo;{text}&rdquo;</span>
      <button type="button" onClick={copy} aria-label={`Copy: ${text}`}>{done ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
