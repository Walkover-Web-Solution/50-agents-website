import { NextRequest, NextResponse } from 'next/server';

const HOME_MARKDOWN = `# 50agents: apps, AI agents and automations that do the work

Tell it how you work. 50agents builds apps, AI agents and automations on your tools or from scratch, and they do the work across 2,300+ apps. From viaSocket.

## Links

- [Get started](https://50agents.com/join)
- [AI agents catalog](https://50agents.com/ai-agents)
- [Templates](https://50agents.com/templates)
- [Pricing](https://50agents.com/pricing)
- [Work management](https://50agents.com/work-management)
- [AI note taker](https://50agents.com/ai-note-taker)
`;

const NOT_FOUND_MARKDOWN = `# Page not found

This page does not exist on 50agents.com. It may have moved, or it never existed.

## Links

- [Home](https://50agents.com/)
- [Agent guide (llms.txt)](https://50agents.com/llms.txt)
- [Docs / help center](https://50agents.com/help)
- [AI agents catalog](https://50agents.com/ai-agents)
- [MCP for AI agents](https://50agents.com/mcp)
`;

const APP_PAGES = new Set([
  '/ai-agents',
  '/ai-note-taker',
  '/login',
  '/org',
  '/pricing',
  '/templates',
  '/work-management',
]);

function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const candidates = acceptHeader.split(',').map(part => {
    const [mime, ...params] = part.trim().split(';');
    const qParam = params.find(p => p.trim().startsWith('q='));
    const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    return { mime: mime.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
  });

  const markdown = candidates.filter(
    c => c.mime === 'text/markdown' || c.mime === 'text/x-markdown'
  );
  if (markdown.length === 0) return false;

  const bestMarkdown = Math.max(...markdown.map(c => c.q));
  const htmlTypes = candidates.filter(c => c.mime === 'text/html' || c.mime === 'text/*' || c.mime === '*/*');
  const bestHtml = htmlTypes.length > 0 ? Math.max(...htmlTypes.map(c => c.q)) : 0;

  return bestMarkdown >= bestHtml;
}

function isHandledByApp(pathname: string): boolean {
  if (pathname === '/') return true;
  if (APP_PAGES.has(pathname)) return true;
  if (pathname.startsWith('/ai-agents/')) return true;
  if (pathname.startsWith('/api/')) return true;
  if (pathname.startsWith('/.well-known/')) return true;
  if (pathname === '/mcp' || pathname.startsWith('/mcp/')) return true;
  if (pathname.startsWith('/services/')) return true;
  if (pathname.startsWith('/landing/') || pathname.startsWith('/assets/') || pathname.startsWith('/_next/')) {
    return true;
  }
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname === '/sitemap-main.xml') {
    return true;
  }
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

function markdownResponse(body: string, status: number): NextResponse {
  return new NextResponse(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const wantsMarkdown = prefersMarkdown(request.headers.get('accept'));

  if (!wantsMarkdown) {
    if (pathname === '/') {
      const response = NextResponse.next();
      response.headers.append('Vary', 'Accept');
      return response;
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    return markdownResponse(HOME_MARKDOWN, 200);
  }

  if (!isHandledByApp(pathname)) {
    return markdownResponse(NOT_FOUND_MARKDOWN, 404);
  }

  const response = NextResponse.next();
  response.headers.append('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};