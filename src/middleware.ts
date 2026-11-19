import { NextRequest, NextResponse } from 'next/server';
import OLD from './content/integrations/old-map.json';

// 1. The home page advertises Vary: Accept (markdown negotiation is handled by next.config rewrites).
// 2. Old app pages: /ai-agents/<slug> and /services/<slug> whose app is in viaSocket's catalog go to /integrations/<slug>
//    in one 308 (Jii, 19 Nov: "Yes, redirect them", S21; "Yes, all of them", S22), matched case-insensitively.
// 3. The old site is removed (Jii, 19 Nov, S25, D257; gtm/seo/handoff/launch-cleanup.md section 1):
//    the old product pages and old app pages not in the catalog answer 410 Gone; old pages with a new home get a 301.
//    /ai-agents itself is the new AI agents hub and is not touched here.
const MAP = OLD as Record<string, string>;
const APP = 'https://50agents-app.embarko.app';
const GONE = new Set(['/ai-note-taker', '/work-management', '/ai-agents/50agents']);

const GONE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>This page was removed | 50agents</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box;background:#fff;color:#111214;font-family:'Schibsted Grotesk',system-ui,sans-serif;text-align:center}h1{margin:0;font-size:clamp(32px,6vw,48px);font-weight:500;letter-spacing:-.02em}p{margin:16px 0 0;font-size:18px;line-height:1.5;color:#4F535B}nav{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:28px}a{color:#111214;font-weight:600}</style>
</head><body><main><h1>This page was removed</h1><p>It belonged to the old 50agents site.</p>
<nav><a href="/">Home</a><a href="/use-cases">Use cases</a><a href="/integrations">Integrations</a></nav></main></body></html>`;

function gone() {
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === '/') {
    const response = NextResponse.next();
    response.headers.append('Vary', 'Accept');
    return response;
  }
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const lower = path.toLowerCase();
  if (GONE.has(lower)) return gone();

  const url = request.nextUrl.clone();
  if (lower === '/templates' || lower.startsWith('/templates/')) { url.pathname = '/use-cases'; return NextResponse.redirect(url, 301); }
  if (lower === '/login') return NextResponse.redirect(`${APP}/login${search}`, 301);
  if (lower === '/org' || lower.startsWith('/org/')) return NextResponse.redirect(`${APP}/`, 301);

  const m = pathname.match(/^\/(ai-agents|services)\/([^/]+)\/?$/);
  if (m) {
    const slug = decodeURIComponent(m[2]).toLowerCase();
    const to = MAP[slug];
    if (to) { url.pathname = `/integrations/${to}`; return NextResponse.redirect(url, 308); }
    return gone();
  }
  if (/^\/services(\/|$)/.test(pathname)) return gone();
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/ai-note-taker/:path*',
    '/work-management/:path*',
    '/templates/:path*',
    '/login/:path*',
    '/org/:path*',
    '/ai-agents/:slug',
    '/services/:path*',
  ],
};
