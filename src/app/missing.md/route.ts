import { MARKDOWN_HEADERS, NOT_FOUND_MARKDOWN } from '@/lib/agent-markdown';

// edge, not static: a static file would be served with 200 on Cloudflare; this must stay a real 404
export const runtime = 'edge';

export function GET() {
  return new Response(NOT_FOUND_MARKDOWN, {
    status: 404,
    headers: MARKDOWN_HEADERS,
  });
}