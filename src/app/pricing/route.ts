import { agentPageResponse } from '@/lib/agent-page-response';
import { html } from '@/lib/agent-page-html/pricing';

export const dynamic = 'force-static';

export function GET() {
  return agentPageResponse(html);
}