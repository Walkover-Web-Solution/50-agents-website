// The kind hub at /ai-agents. Content: src/content/hubs/pages/ai-agents.json, written by the page pipeline (family "hubs").
import type { Metadata } from 'next';
import { hubOf } from '@/content/hubs';
import { HubView } from '@/site/hubs/hub';
import { pageMeta } from '@/site/hubs/meta';

const hub = hubOf('ai-agents');
export const metadata: Metadata = pageMeta({ path: '/ai-agents', title: hub.title, description: hub.description, ogTitle: hub.h1 });

export default function Page() {
  return <HubView h={hub} />;
}
