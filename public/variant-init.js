(function () {
  var F = {
      orbit:
        'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap',
      stage:
        'https://fonts.googleapis.com/css2?family=Public+Sans:wght@500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap',
      strip:
        'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
    },
    k = '50a-variant',
    v = null,
    q = new URLSearchParams(location.search).get('v');
  try {
    v = localStorage.getItem(k);
  } catch (e) {}
  if (!F[v]) {
    v = ['orbit', 'stage', 'strip'][Math.floor(Math.random() * 3)];
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }
  if (F[q]) v = q;
  document.documentElement.setAttribute('data-v', v);
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = F[v];
  document.head.appendChild(l);
  if (v !== 'orbit') {
    var m = document.createElement('link');
    m.rel = 'stylesheet';
    m.href = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;800&display=swap';
    document.head.appendChild(m);
  }
})();