import {
  mcpServerCardGet,
  mcpServerCardHead,
  mcpServerCardOptions,
} from '@/lib/mcp-server-card-http';

export const runtime = 'edge';

export const OPTIONS = mcpServerCardOptions;
export const GET = mcpServerCardGet;
export const HEAD = mcpServerCardHead;