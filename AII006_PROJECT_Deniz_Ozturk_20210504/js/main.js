/* ================================================
   MY SILLAGE — Main JS
   Theme toggle · Hamburger · Scroll Reveal
   ================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── THEME TOGGLE ── */
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
      const icon = document.getElementById('themeIcon');
      if (icon) icon.textContent = '🌙';
    }

    /* ── SCROLL REVEAL ── */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add('visible');
          });
        },
        { threshold: 0.08 }
      );
      reveals.forEach(function (r) { observer.observe(r); });
    }

  });

  /* ── GLOBAL FUNCTIONS (onclick= bağlı) ── */

  window.toggleMenu = function () {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('open');
  };

  window.toggleTheme = function () {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('themeIcon');
    const isLight = document.body.classList.contains('light-mode');
    if (icon) icon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

})();
