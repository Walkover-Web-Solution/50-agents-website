import { NextRequest, NextResponse } from 'next/server';
import OLD from './content/integrations/old-map.json';

// 1. The home page advertises Vary: Accept (markdown negotiation is handled by next.config rewrites).
// 2. Old app pages: /ai-agents/<slug> and /services/<slug> whose app is in viaSocket's catalog go to /integrations/<slug>
//    in one 308 (Jii, 19 Nov: "Yes, redirect them", S21; "Yes, all of them", S22), matched case-insensitively.
//    Old pages for apps not in the catalog stay as they are (noindex); /services/<slug> for those goes to /ai-agents/<slug>.
const MAP = OLD as Record<string, string>;
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    const response = NextResponse.next();
    response.headers.append('Vary', 'Accept');
    return response;
  }
  const m = pathname.match(/^\/(ai-agents|services)\/([^/]+)\/?$/);
  if (m) {
    const slug = decodeURIComponent(m[2]).toLowerCase();
    const to = MAP[slug];
    const url = request.nextUrl.clone();
    if (to) { url.pathname = `/integrations/${to}`; return NextResponse.redirect(url, 308); }
    if (m[1] === 'services') { url.pathname = `/ai-agents/${m[2]}`; return NextResponse.redirect(url, 308); }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/ai-agents/:slug', '/services/:path*'],
};
