import { NextResponse } from 'next/server';
import {
  MCP_SERVER_CARD,
  MCP_SERVER_CARD_MEDIA_TYPE,
} from '@/lib/mcp-server-card';

export const runtime = 'edge';

const CARD_HEADERS: HeadersInit = {
  'Content-Type': MCP_SERVER_CARD_MEDIA_TYPE,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, If-None-Match',
  'Access-Control-Expose-Headers': 'ETag',
  'Cache-Control': 'public, max-age=3600',
  ETag: '"v0.1.0"',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CARD_HEADERS });
}

export function GET() {
  return NextResponse.json(MCP_SERVER_CARD, { headers: CARD_HEADERS });
}

export function HEAD() {
  return new NextResponse(null, { status: 200, headers: CARD_HEADERS });
}