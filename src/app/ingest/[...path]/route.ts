// First-party proxy for PostHog (https://posthog.com/docs/advanced/proxy): ad blockers drop requests to
// *.posthog.com, so public/ph.js talks to /ingest on our own domain and this edge route forwards it.
// An edge route handler, not a next.config rewrite: external rewrites are unreliable on Cloudflare next-on-pages.
export const runtime = 'edge';

const API = 'https://us.i.posthog.com';
const ASSETS = 'https://us-assets.i.posthog.com';
// hop-by-hop and identity headers never go upstream
const DROP_REQ = ['host', 'cookie', 'connection', 'content-length', 'accept-encoding', 'cf-connecting-ip', 'x-forwarded-host', 'x-forwarded-proto', 'x-real-ip'];
// fetch already decoded the body, so the upstream encoding and length no longer apply
const DROP_RES = ['content-encoding', 'content-length', 'transfer-encoding', 'set-cookie'];

async function proxy(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = new URL(req.url);
  const rest = url.pathname.replace(/^\/ingest/, ''); // exact path, trailing slash kept (PostHog's endpoints end in /)
  const base = path[0] === 'static' ? ASSETS : API;
  const target = `${base}${rest}${url.search}`;

  const headers = new Headers(req.headers);
  DROP_REQ.forEach((h) => headers.delete(h));
  const ip = req.headers.get('cf-connecting-ip');
  if (ip) headers.set('x-forwarded-for', ip); // PostHog uses it for geo; cookieless mode hashes it, never stores it

  const upstream = await fetch(target, {
    method: req.method,
    headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.arrayBuffer(),
    redirect: 'manual',
  });

  const out = new Headers(upstream.headers);
  DROP_RES.forEach((h) => out.delete(h));
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out });
}

export const GET = proxy;
export const POST = proxy;
export const OPTIONS = proxy;
export const HEAD = proxy;
