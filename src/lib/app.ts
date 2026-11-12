// The new 50agents app (open sign-up, 12 Nov 2026). Sign-up and sign-in share one page.
export const APP_LOGIN = 'https://50agents-app.embarko.app/login';

// The same UTMs as the home page (landing/site/site.js): campaign = the visitor's version, content = the button.
// utm_* the visitor arrived with win; the home page keeps them for the visit in sessionStorage '50a-utm'.
export function signupUrl(button: string): string {
  const u = new URL(APP_LOGIN);
  let arrived: Record<string, string> = {};
  let version = 'unknown';
  try {
    version = document.documentElement.dataset.v || localStorage.getItem('50a-variant') || 'unknown';
    new URLSearchParams(location.search).forEach((v, k) => { if (k.startsWith('utm_')) arrived[k] = v; });
    if (Object.keys(arrived).length) sessionStorage.setItem('50a-utm', JSON.stringify(arrived));
    else arrived = JSON.parse(sessionStorage.getItem('50a-utm') || '{}');
  } catch {}
  const p = { utm_source: '50agents.com', utm_medium: 'website', utm_campaign: version, utm_content: button, ...arrived };
  Object.entries(p).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.href;
}
