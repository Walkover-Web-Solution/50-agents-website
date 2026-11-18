import { NextRequest, NextResponse } from 'next/server';

// Markdown negotiation for / and unmatched paths is handled by next.config rewrites
// (index.md / missing.md). Keep middleware scoped to / so HTML home can advertise Vary: Accept.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.append('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: '/',
};