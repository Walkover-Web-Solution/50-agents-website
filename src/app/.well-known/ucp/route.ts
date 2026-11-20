import { NextResponse } from 'next/server';
import { ucpBusinessProfile } from '@/lib/ucp-profile';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(ucpBusinessProfile, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}