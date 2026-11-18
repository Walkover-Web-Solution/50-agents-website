import { NextResponse } from 'next/server';
import { oauthProtectedResourceMetadata } from '@/lib/oauth-metadata';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(oauthProtectedResourceMetadata, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}