// The kind hub at /browser-agents. Content: src/content/hubs/pages/browser-agents.json, written by the page pipeline (family "hubs").
import type { Metadata } from 'next';
import { hubOf } from '@/content/hubs';
import { HubView } from '@/site/hubs/hub';
import { pageMeta } from '@/site/hubs/meta';

const hub = hubOf('browser-agents');
export const metadata: Metadata = pageMeta({ path: '/browser-agents', title: hub.title, description: hub.description, ogTitle: hub.h1 });

export default function Page() {
  return <HubView h={hub} />;
}
