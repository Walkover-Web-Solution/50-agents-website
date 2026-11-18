import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const NLWEB_VERSION = '0.55';
const SITE = 'https://50agents.com';

const STATIC_PAGES: Array<{
  name: string;
  url: string;
  description: string;
  keywords: string[];
}> = [
  {
    name: '50agents home',
    url: `${SITE}/`,
    description:
      'Tell it how you work. 50agents builds apps, AI agents and automations on your tools or from scratch, across 2,300+ apps.',
    keywords: ['what is 50agents', 'product', 'overview', 'captain', 'viasocket'],
  },
  {
    name: 'AI agents catalog',
    url: `${SITE}/ai-agents`,
    description: 'Browse public AI agent templates by connected app and category.',
    keywords: ['agents', 'templates', 'integrations', 'catalog', 'browse'],
  },
  {
    name: 'Agent templates',
    url: `${SITE}/templates`,
    description: 'Ready-made agent templates you can start from.',
    keywords: ['templates', 'starter', 'examples'],
  },
  {
    name: 'Pricing',
    url: `${SITE}/pricing`,
    description: 'Plans and credits; every workspace starts with free credits.',
    keywords: ['pricing', 'cost', 'credits', 'free'],
  },
  {
    name: 'Work management',
    url: `${SITE}/work-management`,
    description: 'How 50agents helps teams run work across tools.',
    keywords: ['work management', 'team', 'workflow'],
  },
  {
    name: 'AI note taker',
    url: `${SITE}/ai-note-taker`,
    description: 'AI meeting recorder that captures decisions and follow-ups.',
    keywords: ['meeting', 'notes', 'recorder', 'note taker'],
  },
  {
    name: 'Get started',
    url: `${SITE}/join`,
    description: 'Create a free workspace and hand your crew its first job.',
    keywords: ['sign up', 'join', 'start', 'login', 'free'],
  },
  {
    name: 'MCP for agents',
    url: `${SITE}/mcp`,
    description: 'Streamable HTTP MCP exposing list_agent_templates for public templates.',
    keywords: ['mcp', 'model context protocol', 'api', 'developers'],
  },
  {
    name: 'Agent guide (llms.txt)',
    url: `${SITE}/llms.txt`,
    description: 'Short plain-text guide for LLMs and agents.',
    keywords: ['llms', 'documentation', 'agents'],
  },
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

async function searchPlugins(origin: string, query: string) {
  const url = new URL('/api/plugins/search', origin);
  url.searchParams.set('q', query);
  const res = await fetch(url.toString());
  if (!res.ok) return [];
  const payload = (await res.json()) as {
    success?: boolean;
    data?: Array<{ name: string; description: string; appslugname: string }>;
  };
  if (!payload.success || !payload.data?.length) return [];
  return payload.data.slice(0, 8).map((row, i) =>
    toSchemaResult({
      name: `${row.name} AI agent`,
      url: `${SITE}/ai-agents/${row.appslugname}`,
      description: row.description || `AI agent template for ${row.name}.`,
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
  const origin = new URL(request.url).origin;

  if (!text) {
    const results = STATIC_PAGES.slice(0, 5).map((p) => toSchemaResult(p));
    return nlwebAnswer(results);
  }

  const pluginHits = await searchPlugins(origin, text);
  const pageHits = STATIC_PAGES.map((p) => ({ page: p, score: scorePage(text, p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  .slice(0, 5)
    .map((x) => toSchemaResult({ ...x.page, score: x.score / 10 }));

  const merged = [...pageHits, ...pluginHits];
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
        description: 'Natural-language queries over public 50agents marketing content and template search.',
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