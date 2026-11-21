/* Hero ask typing; the server HTML already shows the first ask. */
(function () {
  document.querySelectorAll('[data-film]').forEach(function (el) {
    var raw = el.getAttribute('data-asks');
    if (!raw) return;
    var list;
    try {
      list = JSON.parse(raw);
    } catch (e) {
      return;
    }
    if (!list.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var live = el.querySelector('.film-live');
    var caret = live && live.querySelector('.caret');
    var link = el.querySelector('a[data-film-ask]');
    function setTyped(text) {
      if (!live || !caret) return;
      while (live.firstChild !== caret) live.removeChild(live.firstChild);
      live.insertBefore(document.createTextNode(text), caret);
    }
    function hrefFor(ask) {
      if (!link) return;
      try {
        var u = new URL(link.href);
        u.searchParams.set('draft', ask.slice(0, 499));
        link.href = u.href;
      } catch (e) {}
    }
    function wait(ms) {
      return new Promise(function (r) {
        setTimeout(r, ms);
      });
    }
    function setStage(stage) {
      el.className = ('film ' + stage).trim();
    }
    function run() {
      var n = 0;
      (function loop() {
        var a = list[n];
        setStage('film is-typing');
        var step = Math.max(14, Math.min(34, 1600 / a.length));
        var k = 1;
        function type() {
          if (k <= a.length) {
            setTyped(a.slice(0, k));
            k++;
            setTimeout(type, step);
          } else {
            setStage('film is-done');
            hrefFor(a);
            if (list.length === 1) return;
            setTimeout(function () {
              var j = a.length;
              function back() {
                if (j >= 0) {
                  setTyped(a.slice(0, j));
                  j -= 3;
                  setTimeout(back, 10);
                } else {
                  setTimeout(function () {
                    n = (n + 1) % list.length;
                    loop();
                  }, 250);
                }
              }
              back();
            }, 2600);
          }
        }
        type();
      })();
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      }, { threshold: 0.4 });
      io.observe(el);
    }
  });
})();