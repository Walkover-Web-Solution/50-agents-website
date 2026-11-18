// The kind hub at /apps (pages-brief B2). Content: src/content/hubs/apps.ts.
import type { Metadata } from 'next';
import { hubOf } from '@/content/hubs';
import { HubPage } from '@/site/hubs/hub';
import { pageMeta } from '@/site/hubs/meta';
import '@/site/css/hubs.css';

const hub = hubOf('/apps');
export const metadata: Metadata = pageMeta({ path: hub.path, title: hub.title, description: hub.description, ogTitle: hub.h1 });

export default function Page() {
  return <HubPage hub={hub} />;
}
