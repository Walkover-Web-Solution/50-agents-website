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

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  if (prefersMarkdown(request.headers.get('accept'))) {
    return new NextResponse(HOME_MARKDOWN, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  }

  const response = NextResponse.next();
  response.headers.append('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: '/',
};