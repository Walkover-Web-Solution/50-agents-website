import { agentPageResponse } from '@/lib/agent-page-response';
import { html } from '@/lib/agent-page-html/ai-agents';

export const dynamic = 'force-static';

export function GET() {
  return agentPageResponse(html);
}