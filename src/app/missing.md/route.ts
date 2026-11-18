import { MARKDOWN_HEADERS, NOT_FOUND_MARKDOWN } from '@/lib/agent-markdown';

export const dynamic = 'force-static';

export function GET() {
  return new Response(NOT_FOUND_MARKDOWN, {
    status: 404,
    headers: MARKDOWN_HEADERS,
  });
}