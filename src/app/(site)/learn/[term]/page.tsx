// A glossary page at /learn/<term>. Content: src/content/learn/pages/<term>.json, written by the page pipeline (family "learn").
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TERMS, termOf } from '@/content/learn';
import { TermView } from '@/site/learn/term';
import { pageMeta } from '@/site/hubs/meta';

export const dynamicParams = false;
export function generateStaticParams() {
  return TERMS.map(t => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const t = termOf((await params).term);
  if (!t) return {};
  return pageMeta({ path: `/learn/${t.slug}`, title: t.title, description: t.description, ogTitle: t.h1 });
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const t = termOf((await params).term);
  if (!t) notFound();
  return <TermView t={t} />;
}
