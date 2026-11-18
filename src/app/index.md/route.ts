import { HOME_MARKDOWN, MARKDOWN_HEADERS } from '@/lib/agent-markdown';

export const dynamic = 'force-static';

export function GET() {
  return new Response(HOME_MARKDOWN, {
    status: 200,
    headers: MARKDOWN_HEADERS,
  });
}