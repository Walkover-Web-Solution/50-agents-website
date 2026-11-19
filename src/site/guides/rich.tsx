// The guides' small text markup: [label](https://...) opens a source in a new tab, [label](/path) is an internal link
// (text until that page exists, via MaybeLink), **bold** is bold. Nothing else, so content files stay plain.
import { Fragment } from 'react';
import { MaybeLink } from '../parts';

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function rich(text: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    if (m[3]) out.push(<b key={i++}>{m[3]}</b>);
    else if (m[2].startsWith('/')) out.push(<MaybeLink key={i++} href={m[2]}>{m[1]}</MaybeLink>);
    else out.push(<a key={i++} href={m[2]} target="_blank" rel="noopener">{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return out;
}

/** The plain words of a marked-up string (for JSON-LD and metadata). */
export const plain = (text: string) => text.replace(TOKEN, (_, a, __, b) => a ?? b);
