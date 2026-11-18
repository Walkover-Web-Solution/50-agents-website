/* PostHog for 50agents.com (gtm/seo/handoff/posthog-install.md, part A).
   Cookieless and anonymous: no cookies, no person profiles, no session replay, nothing personal captured.
   Loaded after the page has rendered so it never slows the first paint. Runs on 50agents.com only (?ph_test=1 forces it). */
(function () {
  if (location.hostname !== '50agents.com' && !/[?&]ph_test=1\b/.test(location.search)) return;

  function where() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var seg = path.split('/').filter(Boolean);
    if (path === '/') return { page_family: 'home', page_slug: 'home' };
    if (seg[0] === 'help' && seg[1] === 'privacy-policy') return { page_family: 'legal', page_slug: 'privacy-policy' };
    return { page_family: 'other', page_slug: seg.join('/') };
  }
  function props() {
    var p = where();
    if (p.page_family === 'home' && window.VARIANT) p.lv = window.VARIANT;
    return p;
  }
  function stripDraft(href) {
    try { var u = new URL(href, location.href); u.searchParams.delete('draft'); return u.href; } catch (e) { return href; }
  }
  // one cta_click per button press; sendBeacon so it survives the navigation the click starts
  window.__cta = function (el) {
    var cta = el.getAttribute('data-cta');
    if (!cta || !window.posthog || !window.posthog.capture) return;
    window.posthog.capture('cta_click', { cta: cta, placement: cta.split(':')[1] || '', href: stripDraft(el.href || '') }, { transport: 'sendBeacon' });
  };
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-cta]') : null;
    if (el) window.__cta(el);
  }, true);

  function start() {
    // PostHog's standard loader stub (queues calls until array.js arrives)
    !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split('.'); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement('script')).type = 'text/javascript', p.crossOrigin = 'anonymous', p.async = !0, p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js', (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = 'posthog', u.people = u.people || [], u.toString = function (t) { var e = 'posthog'; return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e }, u.people.toString = function () { return u.toString(1) + '.people (stub)' }, o = 'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags on onFeatureFlags onSessionId identify setPersonProperties group resetGroups reset get_distinct_id get_session_id alias set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug'.split(' '), n = 0; n < o.length; n++) g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);
    window.posthog.init('phc_zFhe5VRXZ9BpQufbPoVvi4W2EzawVF9fMbFH9vZrohEr', {
      api_host: 'https://us.i.posthog.com',
      cookieless_mode: 'always',
      person_profiles: 'never',
      disable_session_recording: true,
      autocapture: true,
      capture_pageview: 'history_change',
      // every event carries the page it happened on, also after in-app navigation on the Next pages
      before_send: function (ev) { if (ev && ev.properties) { var p = props(); for (var k in p) ev.properties[k] = p[k]; } return ev; }
    });
    window.posthog.register(props());
  }
  function later() { (window.requestIdleCallback || function (f) { setTimeout(f, 1) })(start, { timeout: 2000 }); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
