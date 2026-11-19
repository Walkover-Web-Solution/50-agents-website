// The index page at /guides (pages-brief B9; guides v5, D255 round 3). Content: src/content/pages/indexes.ts.
import type { Metadata } from 'next';
import { indexOf } from '@/content/pages/indexes';
import { GuidesIndex } from '@/site/guides/index-view';
import { pageMeta } from '@/site/hubs/meta';

const ix = indexOf('/guides');
export const metadata: Metadata = pageMeta({ path: ix.path, title: ix.title, description: ix.description, ogTitle: ix.h1 });

export default function Page() {
  return <GuidesIndex ix={ix} />;
}
