import { NextRequest } from 'next/server';
import {
  handleMcpGet,
  handleMcpOptions,
  handleMcpPost,
} from '@/lib/mcp-http';

export const runtime = 'edge';

export const OPTIONS = handleMcpOptions;
export const GET = handleMcpGet;
export async function POST(request: NextRequest) {
  return handleMcpPost(request);
}