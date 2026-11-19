import { MARKDOWN_HEADERS } from '@/lib/agent-markdown';
import { pricingMarkdown } from '@/lib/pricing-markdown';

export const dynamic = 'force-static';

export function GET() {
  return new Response(pricingMarkdown(), {
    status: 200,
    headers: MARKDOWN_HEADERS,
  });
}