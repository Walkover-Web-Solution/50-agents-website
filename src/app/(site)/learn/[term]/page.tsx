// A glossary page at /learn/<term> (pages-brief B6). Content: src/content/learn/.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TERMS, termOf } from '@/content/learn';
import { TermPage, h1Of } from '@/site/learn/term';
import { pageMeta } from '@/site/hubs/meta';
import '@/site/css/learn.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return TERMS.map(t => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const t = termOf((await params).term);
  if (!t) return {};
  return pageMeta({ path: `/learn/${t.slug}`, title: t.title, description: t.description, ogTitle: h1Of(t) });
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const t = termOf((await params).term);
  if (!t) notFound();
  return <TermPage t={t} />;
}
