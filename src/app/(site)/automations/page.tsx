// The kind hub at /automations. Content: src/content/hubs/pages/automations.json, written by the page pipeline (family "hubs").
import type { Metadata } from 'next';
import { hubOf } from '@/content/hubs';
import { HubView } from '@/site/hubs/hub';
import { pageMeta } from '@/site/hubs/meta';

const hub = hubOf('automations');
export const metadata: Metadata = pageMeta({ path: '/automations', title: hub.title, description: hub.description, ogTitle: hub.h1 });

export default function Page() {
  return <HubView h={hub} />;
}
