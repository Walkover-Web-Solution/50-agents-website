// The kind hub at /apps. Content: src/content/hubs/pages/apps.json, written by the page pipeline (family "hubs").
import type { Metadata } from 'next';
import { hubOf } from '@/content/hubs';
import { HubView } from '@/site/hubs/hub';
import { pageMeta } from '@/site/hubs/meta';

const hub = hubOf('apps');
export const metadata: Metadata = pageMeta({ path: '/apps', title: hub.title, description: hub.description, ogTitle: hub.h1 });

export default function Page() {
  return <HubView h={hub} />;
}
