(function () {
  document.querySelectorAll('[data-catpick]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      location.href = sel.value;
    });
  });
  document.querySelectorAll('[data-ig4-dir]').forEach(function (root) {
    var per = parseInt(root.getAttribute('data-per') || '48', 10);
    var search = root.querySelector('[data-ig4-search]');
    var none = root.querySelector('[data-ig4-none]');
    var pager = root.querySelector('[data-ig4-pager]');
    var prev = root.querySelector('[data-ig4-prev]');
    var next = root.querySelector('[data-ig4-next]');
    var page = 0;
  function tiles() {
      return Array.prototype.slice.call(root.querySelectorAll('[data-app]'));
    }
    function match(el, term) {
      return !term || (el.getAttribute('data-q') || '').indexOf(term) !== -1;
    }
    function draw() {
      var term = (search && search.value || '').trim().toLowerCase();
      var all = tiles();
      var hits = all.filter(function (t) {
        return match(t, term);
      });
      var pages = Math.max(1, Math.ceil(hits.length / per));
      if (page >= pages) page = pages - 1;
      var onSet = new Set(hits.slice(page * per, page * per + per));
      all.forEach(function (t) {
        t.hidden = onSet.has(t) ? false : true;
      });
      if (none) {
        none.hidden = hits.length !== 0;
        if (!none.hidden && search && search.value.trim()) none.textContent = 'No app here matches "' + search.value.trim() + '". Try another name, or tell Captain the job and it says which apps it needs.';
      }
      if (pager) pager.hidden = pages <= 1;
      if (prev) prev.disabled = page <= 0;
      if (next) next.disabled = page >= pages - 1;
    }
    if (search) search.addEventListener('input', function () {
      page = 0;
      draw();
    });
    if (prev) prev.addEventListener('click', function () {
      page--;
      draw();
      var top = root.closest('.ig4-dir');
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
    });
    if (next) next.addEventListener('click', function () {
      page++;
      draw();
      var top = root.closest('.ig4-dir');
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
    });
    draw();
  });
})();