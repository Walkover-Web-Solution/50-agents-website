import { NextRequest, NextResponse } from 'next/server';
import OLD from './content/integrations/old-map.json';
import LIVE_PAIRS from './content/integrations/live-pairs.json';
import { canon } from './content/integrations/slugs';
import { HOME_AGENT_LINK } from './lib/home-agent-link';

// 1. The home page is rewritten here to public/landing/index.html with Link and Vary: Accept. next.config also rewrites /
//    for local dev, but on Cloudflare that static rewrite drops headers from next.config and middleware next().
// 2. Old app pages: /ai-agents/<slug> and /services/<slug> whose app is in viaSocket's catalog go to /integrations/<slug>
//    in one 308 (Jii, 19 Nov: "Yes, redirect them", S21; "Yes, all of them", S22), matched case-insensitively.
// 3. The old site is removed (Jii, 19 Nov, S25, D257; gtm/seo/handoff/launch-cleanup.md section 1):
//    old pages with a new home get a 301. Pages with no new twin used to answer 410; from 20 Nov they 301 too
//    (Jii: "can we not avoid the 410? put a redirect to some home page instead?", S37, T58): the old product pages to /,
//    old app pages not in the catalog to /integrations. One hop each, no chains.
//    /ai-agents itself is the new AI agents hub and is not touched here.
// 4. Pair pages (Search S26): only the indexable pairs exist, in one canonical order (live-pairs.json, a few KB, so no
//    catalog in this bundle). The reversed order, or a mixed-case or duplicate slug, 308s to the canonical page.
//    An app page asked with a mixed-case or duplicate slug 308s to the canonical slug (slugs.ts canon) the same way.
// 5. A Cloudflare preview (*.pages.dev) answers X-Robots-Tag: noindex, nofollow on every page (deploy plan step 3);
//    production is unchanged. Cloudflare's _headers file doesn't apply to the worker's responses, so it is set here.
const MAP = OLD as Record<string, string>;
const APP = 'https://50agents-app.embarko.app';
const PAIRS = new Set<string>(LIVE_PAIRS.pairs);
const OLD_PRODUCTS = new Set(['/ai-note-taker', '/work-management', '/ai-agents/50agents']);

function wantsHomeHtml(request: NextRequest) {
  return request.nextUrl.pathname === '/' && !/text\/(x-)?markdown/.test(request.headers.get('accept') ?? '');
}

function homeHtml(request: NextRequest) {
  const response = NextResponse.rewrite(new URL('/landing/index.html', request.url));
  response.headers.set('Link', HOME_AGENT_LINK);
  response.headers.append('Vary', 'Accept');
  return response;
}

export function middleware(request: NextRequest) {
  const preview = (request.headers.get('host') ?? '').split(':')[0].toLowerCase().endsWith('.pages.dev');
  let response = wantsHomeHtml(request) ? homeHtml(request) : route(request);
  if (preview) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

function route(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  if (pathname === '/') {
    const response = NextResponse.next();
    response.headers.append('Vary', 'Accept');
    return response;
  }
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const lower = path.toLowerCase();
  const url = request.nextUrl.clone();
  if (OLD_PRODUCTS.has(lower)) { url.pathname = '/'; url.search = ''; return NextResponse.redirect(url, 301); }
  if (lower === '/templates' || lower.startsWith('/templates/')) { url.pathname = '/use-cases'; return NextResponse.redirect(url, 301); }
  if (lower === '/login') return NextResponse.redirect(`${APP}/login${search}`, 301);
  if (lower === '/org' || lower.startsWith('/org/')) return NextResponse.redirect(`${APP}/`, 301);

  const m = pathname.match(/^\/(ai-agents|services)\/([^/]+)\/?$/);
  if (m) {
    const slug = decodeURIComponent(m[2]).toLowerCase();
    const to = MAP[slug];
    if (to) { url.pathname = `/integrations/${to}`; return NextResponse.redirect(url, 308); }
    url.pathname = '/integrations'; url.search = ''; return NextResponse.redirect(url, 301);
  }
  if (/^\/services(\/|$)/.test(pathname)) { url.pathname = '/integrations'; url.search = ''; return NextResponse.redirect(url, 301); }

  const app = path.match(/^\/integrations\/([^/]+)$/);
  if (app) {
    let x: string;
    try { x = decodeURIComponent(app[1]); } catch { return NextResponse.next(); }
    if (canon(x) !== x) { url.pathname = `/integrations/${canon(x)}`; return NextResponse.redirect(url, 308); }
  }

  const pair = path.match(/^\/integrations\/([^/]+)\/([^/]+)$/);
  if (pair) {
    let x: string, y: string;
    try { x = decodeURIComponent(pair[1]); y = decodeURIComponent(pair[2]); } catch { return NextResponse.next(); }
    const a = canon(x), b = canon(y);
    const to = PAIRS.has(`${a}/${b}`) ? `${a}/${b}` : PAIRS.has(`${b}/${a}`) ? `${b}/${a}` : null;
    if (to && `/integrations/${to}` !== path) { url.pathname = `/integrations/${to}`; return NextResponse.redirect(url, 308); }
  }
  return NextResponse.next();
}

// Every page path (the preview's noindex needs them all); not Next's static files, PostHog's /ingest proxy, or any path
// with a file extension (images, fonts, robots.txt, sitemaps, llms.txt).
export const config = {
  matcher: ['/((?!_next/|ingest|.*\\.[a-zA-Z0-9]+$).*)'],
};
