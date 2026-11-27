(function () {
  document.querySelectorAll('[data-gal]').forEach(function (root) {
    var rows = parseInt(root.getAttribute('data-rows') || '4', 10);
    var chips = root.querySelectorAll('[data-gal-team]');
    var grid = root.querySelector('[data-gal-grid]');
    var more = root.querySelector('[data-gal-more]');
    var show = 'all';
    var rowCount = rows;
    var cols = 0;
    function readCols() {
      if (!grid) return 1;
      cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    }
    function visibleCards() {
      if (!grid) return [];
      return Array.prototype.filter.call(grid.children, function (el) {
        return show === 'all' || el.getAttribute('data-team') === show;
      });
    }
    function paint() {
      if (!grid) return;
      readCols();
      var limit = rowCount * cols;
      var mine = visibleCards();
      Array.prototype.forEach.call(grid.children, function (el) {
        el.removeAttribute('data-over');
      });
      mine.forEach(function (el, n) {
        if (n >= limit) el.setAttribute('data-over', '');
      });
      var left = Math.max(0, mine.length - limit);
      if (more) more.hidden = left <= 0;
    }
    chips.forEach(function (btn) {
      btn.addEventListener('click', function () {
        show = btn.getAttribute('data-gal-team') || 'all';
        chips.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        rowCount = rows;
        paint();
      });
    });
    if (more) {
      more.querySelector('button')?.addEventListener('click', function () {
        rowCount += rows;
        paint();
      });
    }
    if (typeof ResizeObserver !== 'undefined' && grid) {
      new ResizeObserver(paint).observe(grid);
    }
    paint();
  });
})();