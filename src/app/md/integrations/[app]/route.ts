// The markdown twin of an upgraded app page (Search S52), served at /integrations/<app>.md by a rewrite in next.config.ts.
// Same facts as the HTML, for AI agents and answer engines. Asks are draft links an agent can hand to a person.
import { MARKDOWN_HEADERS } from '@/lib/agent-markdown';
import { APP_LOGIN } from '@/lib/app';
import { BASE } from '@/site/integrations/parts';
import { v4Markdown } from '@/site/integrations/v4';
import { loadV4, v4Slugs } from '@/site/integrations/v4-data';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return v4Slugs().map(app => ({ app }));
}

const draft = (slug: string) => (ask: string) => {
  const u = new URL(APP_LOGIN);
  Object.entries({ utm_source: '50agents.com', utm_medium: 'website', utm_campaign: 'seo-integration-md', utm_content: `${slug}__md`, draft: ask.slice(0, 499) })
    .forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
};

export async function GET(_req: Request, { params }: { params: Promise<{ app: string }> }) {
  const { app } = await params;
  const v = loadV4(app);
  if (!v) return new Response('Not found\n', { status: 404 });
  return new Response(v4Markdown(v, BASE, draft(app)), { status: 200, headers: { ...MARKDOWN_HEADERS, 'X-Robots-Tag': 'noindex, follow' } });
}
