import { NextRequest, NextResponse } from 'next/server';

const MCP_URL = 'https://50agents.com/mcp';
const PROTOCOL_VERSION = '2025-11-25';
const LEGACY_PROTOCOL_VERSION = '2024-11-05';

const TOOLS = [
  {
    name: 'list_agent_templates',
    description:
      'List public AI agent templates published on 50agents. Returns paginated name, description, and category for each template. Use when discovering or browsing templates; not for mutating workspace data.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
          default: 20,
          description:
            'Maximum number of templates to return in one page (1–100). Example: 20.',
        },
        page: {
          type: 'integer',
          minimum: 1,
          default: 1,
          description:
            '1-based page index when paginating results. Example: 1 for the first page.',
        },
        category: {
          type: 'string',
          description:
            'Optional category slug to filter templates (e.g. "sales"). Omit to list all categories.',
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
] as const;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

function acceptsStreamableHttp(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  const lowered = acceptHeader.toLowerCase();
  return (
    lowered.includes('application/json') && lowered.includes('text/event-stream')
  );
}

function jsonRpc(
  id: string | number | null | undefined,
  result: unknown,
  status = 200
) {
  return NextResponse.json(
    { jsonrpc: '2.0', id: id ?? null, result },
    { status, headers: corsHeaders() }
  );
}

function jsonRpcError(
  id: string | number | null | undefined,
  code: number,
  message: string,
  status = 200
) {
  return NextResponse.json(
    { jsonrpc: '2.0', id: id ?? null, error: { code, message } },
    { status, headers: corsHeaders() }
  );
}

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
  };
}

function negotiatedProtocol(clientVersion: unknown): string {
  if (typeof clientVersion === 'string' && clientVersion.startsWith('2025')) {
    return PROTOCOL_VERSION;
  }
  return LEGACY_PROTOCOL_VERSION;
}

export function handleMcpOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export function handleMcpGet() {
  return NextResponse.json(
    {
      name: '50agents',
      description: 'MCP server for browsing public 50agents agent templates.',
      transport: 'streamable-http',
      url: MCP_URL,
      tools: TOOLS.map((t) => t.name),
    },
    { headers: corsHeaders() }
  );
}

export async function handleMcpPost(request: NextRequest) {
  if (!acceptsStreamableHttp(request.headers.get('accept'))) {
    return new NextResponse('Not Acceptable', {
      status: 406,
      headers: corsHeaders(),
    });
  }

  let body: JsonRpcRequest;
  try {
    body = await request.json();
  } catch {
    return jsonRpcError(null, -32700, 'Parse error', 400);
  }

  const { id, method, params } = body;

  switch (method) {
    case 'initialize':
      return jsonRpc(id, {
        protocolVersion: negotiatedProtocol(
          (params as { protocolVersion?: string } | undefined)?.protocolVersion
        ),
        capabilities: { tools: {} },
        serverInfo: { name: '50agents', version: '0.1.0' },
      });

    case 'tools/list':
      return jsonRpc(id, { tools: TOOLS });

    case 'tools/call': {
      const name = params?.name;
      if (name !== 'list_agent_templates') {
        return jsonRpcError(id, -32601, `Unknown tool: ${String(name)}`);
      }
      const args = (params?.arguments ?? {}) as {
        limit?: number;
        page?: number;
        category?: string;
      };
      const limit = Math.min(100, Math.max(1, args.limit ?? 20));
      const page = Math.max(1, args.page ?? 1);
      const category = args.category ?? '';
      const origin = new URL(request.url).origin;
      const pluginsUrl = new URL('/api/plugins', origin);
      pluginsUrl.searchParams.set('limit', String(limit));
      pluginsUrl.searchParams.set('page', String(page));
      if (category) pluginsUrl.searchParams.set('category', category);

      try {
        const res = await fetch(pluginsUrl.toString());
        const payload = await res.json();
        return jsonRpc(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify(payload, null, 2),
            },
          ],
        });
      } catch (e) {
        return jsonRpcError(id, -32603, `Template fetch failed: ${String(e)}`);
      }
    }

    case 'ping':
      return jsonRpc(id, {});

    default:
      return jsonRpcError(id, -32601, `Method not found: ${String(method)}`);
  }
}