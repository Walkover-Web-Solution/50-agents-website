import { applyHomeAgentLinkHeaders } from '@/lib/home-link-header';
import { NextRequest, NextResponse } from 'next/server';

// Markdown negotiation for / and unmatched paths is handled by next.config rewrites
// (index.md / missing.md). Cloudflare does not apply next.config headers() on the static
// home rewrite; set agent Link headers here so they reach production responses.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.append('Vary', 'Accept');
  applyHomeAgentLinkHeaders(response.headers);
  return response;
}

export const config = {
  matcher: '/',
};