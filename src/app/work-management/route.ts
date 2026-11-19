import { agentPageResponse } from '@/lib/agent-page-response';
import { html } from '@/lib/agent-page-html/work-management';

export const dynamic = 'force-static';

export function GET() {
  return agentPageResponse(html);
}