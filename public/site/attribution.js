/* Merges arrival UTMs into Captain links on click; server HTML keeps default UTMs for crawlers. */
(function () {
  function loginUrl(base, arrived) {
    try {
      const u = new URL(base, location.origin);
      if (arrived.utm_source) u.searchParams.set('utm_source', arrived.utm_source);
      if (arrived.utm_medium) u.searchParams.set('utm_medium', arrived.utm_medium);
      if (arrived.utm_campaign) u.searchParams.set('utm_campaign', arrived.utm_campaign);
      return u.href;
    } catch {
      return base;
    }
  }
  function arrival() {
    var a = {};
    try {
      new URLSearchParams(location.search).forEach(function (v, k) {
        if (k.indexOf('utm_') === 0) a[k] = v;
      });
      if (Object.keys(a).length) sessionStorage.setItem('50a-utm', JSON.stringify(a));
      else a = JSON.parse(sessionStorage.getItem('50a-utm') || '{}');
    } catch (e) {}
    return a;
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var link = t.closest('a[data-50a-cta]');
    if (!link || !link.href) return;
    link.href = loginUrl(link.href, arrival());
  });
})();