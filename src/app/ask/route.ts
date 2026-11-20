import { NextRequest, NextResponse } from 'next/server';
import CATALOG from '@/content/integrations/catalog/index.json';

export const runtime = 'edge';

const NLWEB_VERSION = '0.55';
const SITE = 'https://50agents.com';

const STATIC_PAGES: Array<{
  name: string;
  url: string;
  description: string;
  keywords: string[];
}> = [
  { name: '50agents home', url: `${SITE}/`, description: 'You tell Captain what you need in plain words, and it builds apps, AI agents, automations and browser agents across 2,300+ apps through viaSocket.', keywords: ['what is 50agents', 'product', 'overview', 'captain', 'viasocket'] },
  { name: 'Use cases', url: `${SITE}/use-cases`, description: 'Ready-made jobs Captain builds, each with the steps it takes and the apps it uses.', keywords: ['use cases', 'templates', 'examples', 'ready-made', 'jobs'] },
  { name: 'AI agents', url: `${SITE}/ai-agents`, description: 'AI agents that decide what to do on each run, with instructions, connected apps, a schedule and their own chat.', keywords: ['ai agent', 'agents', 'assistant'] },
  { name: 'Automations', url: `${SITE}/automations`, description: 'The same steps on an app event or a schedule; AI can be a step.', keywords: ['automation', 'workflow', 'zapier', 'trigger'] },
  { name: 'Browser agents', url: `${SITE}/browser-agents`, description: 'Browser agents that work websites with no app to connect, on a schedule, and leave a report.', keywords: ['browser agent', 'website', 'scrape', 'no api'] },
  { name: 'Apps', url: `${SITE}/apps`, description: 'Your own lists and screens, with a crew of AI agents working in the records.', keywords: ['app', 'agentic app', 'internal tool', 'crm', 'tracker'] },
  { name: 'Integrations', url: `${SITE}/integrations`, description: 'Every app 50agents works with, A to Z, with its triggers, actions and templates.', keywords: ['integrations', 'apps', 'connect', 'catalog'] },
  { name: 'Guides', url: `${SITE}/guides`, description: 'How-to guides for building with 50agents.', keywords: ['guide', 'how to', 'tutorial'] },
  { name: 'Pricing', url: `${SITE}/pricing`, description: 'Free to start with 2,000 credits a month; paid plans and top-ups.', keywords: ['pricing', 'cost', 'credits', 'free', 'plans'] },
  { name: 'Support', url: `${SITE}/support`, description: 'How to reach the team.', keywords: ['support', 'help', 'contact'] },
  { name: 'Get started', url: `https://50agents-app.embarko.app/login`, description: 'Create a free workspace and tell Captain the first job.', keywords: ['sign up', 'join', 'start', 'login', 'free'] },
  { name: 'Agent guide (llms.txt)', url: `${SITE}/llms.txt`, description: 'Short plain-text guide for AI agents.', keywords: ['llms', 'documentation', 'agents'] },
];

type AskBody = {
  query?: { text?: string; site?: string };
  prefer?: { mode?: string; response_format?: string };
  meta?: { version?: string };
};

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  };
}

function nlwebAnswer(
  results: Array<Record<string, unknown>>,
  status = 200
): NextResponse {
  return NextResponse.json(
    {
      _meta: {
        response_type: 'answer',
        version: NLWEB_VERSION,
      },
      results,
    },
    { status, headers: corsHeaders() }
  );
}

function toSchemaResult(item: {
  name: string;
  url: string;
  description: string;
  score?: number;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: item.name,
    url: item.url,
    description: item.description,
    site: SITE,
    score: item.score ?? 1,
  };
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 1);
}

function scorePage(query: string, page: (typeof STATIC_PAGES)[0]): number {
  const q = query.toLowerCase();
  const tokens = tokenize(query);
  let score = 0;
  if (q.includes('50agents') || q.includes('50 agents')) score += 2;
  if (q.includes('tool') || q.includes('app') || q.includes('integration')) {
    if (page.keywords.some((k) => k.includes('integration') || k.includes('tools'))) {
      score += 3;
    }
  }
  for (const token of tokens) {
    if (page.name.toLowerCase().includes(token)) score += 2;
    if (page.description.toLowerCase().includes(token)) score += 1;
    if (page.keywords.some((k) => k.includes(token))) score += 2;
  }
  if (
    /what is|who makes|overview/.test(q) &&
    page.url === `${SITE}/`
  ) {
    score += 5;
  }
  if (/2300|2,300|viasocket|which tool/.test(q) && page.url === `${SITE}/`) {
    score += 5;
  }
  if (/price|cost|credit|free/.test(q) && page.url === `${SITE}/pricing`) {
    score += 5;
  }
  return score;
}

// The apps: names from the site's catalog snapshot, each linking to its integration page (fixes-02 5.3: the old
// /api/plugins search is retired).
function searchApps(query: string) {
  const q = query.toLowerCase();
  const words = tokenize(query);
  const hits = (CATALOG.apps as Array<{ s: string; n: string; t: number; a: number }>)
    .map(a => { const n = a.n.toLowerCase(); const score = q.includes(n) ? 3 : words.some(w => w.length > 2 && n.split(/\s+/).includes(w)) ? 2 : 0; return { a, score }; })
    .filter(x => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 8);
  return hits.map(({ a }, i) =>
    toSchemaResult({
      name: `${a.n} in 50agents`,
      url: `${SITE}/integrations/${a.s}`,
      description: `${a.n} with 50agents: ${a.t} triggers and ${a.a} actions from viaSocket's catalog, and what Captain can build on it.`,
      score: 0.9 - i * 0.05,
    })
  );
}

function parseQueryText(body: AskBody | null, request: NextRequest): string {
  const fromBody = body?.query?.text?.trim();
  if (fromBody) return fromBody;
  const q = request.nextUrl.searchParams.get('q')?.trim();
  return q ?? '';
}

async function runAsk(request: NextRequest, body: AskBody | null) {
  const text = parseQueryText(body, request);

  if (!text) {
    const results = STATIC_PAGES.slice(0, 5).map((p) => toSchemaResult(p));
    return nlwebAnswer(results);
  }

  const appHits = searchApps(text);
  const pageHits = STATIC_PAGES.map((p) => ({ page: p, score: scorePage(text, p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  .slice(0, 5)
    .map((x) => toSchemaResult({ ...x.page, score: x.score / 10 }));

  const merged = [...pageHits, ...appHits];
  const results =
    merged.length > 0
      ? merged
      : [
          toSchemaResult({
            name: '50agents — apps, AI agents and automations',
            url: `${SITE}/`,
            description:
              'No exact match; 50agents builds automations and agents across 2,300+ apps. Try asking about a specific app or visit /ai-agents.',
            score: 0.5,
          }),
        ];

  return nlwebAnswer(results);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (!text) {
    return NextResponse.json(
      {
        name: '50agents NLWeb ask',
        description: 'Natural-language queries over the public 50agents pages and the apps it works with.',
        url: `${SITE}/ask`,
        methods: ['GET', 'POST'],
        spec: 'https://nlweb.ai/docs/specification',
        _meta: { response_type: 'answer', version: NLWEB_VERSION },
        message: 'POST JSON {"query":{"text":"your question"}} or GET ?q=',
      },
      { headers: corsHeaders() }
    );
  }
  return runAsk(request, null);
}

export async function POST(request: NextRequest) {
  let body: AskBody | null = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  return runAsk(request, body);
}