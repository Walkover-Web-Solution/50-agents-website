import { NextResponse } from 'next/server';
import { oauthAuthorizationServerMetadata } from '@/lib/oauth-metadata';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(oauthAuthorizationServerMetadata, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}