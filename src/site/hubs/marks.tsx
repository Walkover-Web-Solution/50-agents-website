// The use case comparison table's drawn marks (D254), shared by this builder's tables (the hubs' "which kind", the
// glossary's "vs"): a cell starting Yes, No, Partly or Only gets a tick, a cross or a dash, and a leading Yes/No is dropped.
export function Mark({ v }: { v: string }) {
  const t = v.toLowerCase();
  const k = /^yes\b/.test(t) ? 'y' : /^no\b/.test(t) ? 'n' : /^(partly|only|if |some|depends)/.test(t) ? 'p' : '';
  if (!k) return null;
  return (
    <svg className={`mk ${k}`} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      {k === 'y' && <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {k === 'n' && <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
      {k === 'p' && <path d="M6 10h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

/** A cell's words without the leading Yes/No when the mark already says it ("No, its own chat" -> "Its own chat"). */
export const rest = (v: string) => {
  const m = v.match(/^(yes|no)\b[,.:]?\s*(.*)$/i);
  return m ? (m[2] ? m[2][0].toUpperCase() + m[2].slice(1) : m[1][0].toUpperCase() + m[1].slice(1).toLowerCase()) : v;
};

export function MarkCell({ v }: { v: string }) {
  return <span className="cell"><Mark v={v} /><span>{rest(v)}</span></span>;
}
