// The index page at /compare (pages-brief B9). Content: src/content/pages/indexes.ts.
import type { Metadata } from 'next';
import { indexOf } from '@/content/pages/indexes';
import { IndexView } from '@/site/pages/index-page';
import { pageMeta } from '@/site/hubs/meta';

const ix = indexOf('/compare');
export const metadata: Metadata = pageMeta({ path: ix.path, title: ix.title, description: ix.description, ogTitle: ix.h1 });

export default function Page() {
  return <IndexView ix={ix} />;
}
