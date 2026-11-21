(function () {
  var bar = document.querySelector('[data-sticky-bar]');
  if (!bar) return;
  var hero = document.querySelector('.film-box .btn, .hero-cta');
  if (!hero || !('IntersectionObserver' in window)) {
    bar.classList.add('on');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    var e = entries[0];
    bar.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0);
  });
  io.observe(hero);
})();