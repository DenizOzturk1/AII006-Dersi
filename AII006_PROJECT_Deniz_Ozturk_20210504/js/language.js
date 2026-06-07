/* ================================================
   MY SILLAGE — Language Toggle System
   TR / EN — data-tr / data-en attribute based
   ================================================ */

(function () {
  'use strict';

  /* ── Mevcut dili al (localStorage veya tarayıcı varsayılanı) ── */
  let currentLang = localStorage.getItem('sillage_lang') || 'tr';

  /* ── Sayfa yüklenince uygula ── */
  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(currentLang);
    updateToggleUI(currentLang);
  });

  /* ── Global fonksiyon: navbar butonuna onclick="toggleLanguage()" bağlı ── */
  window.toggleLanguage = function () {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('sillage_lang', currentLang);
    applyLanguage(currentLang);
    updateToggleUI(currentLang);
    /* Dispatch custom event for other scripts to listen */
    window.dispatchEvent(new Event('languageChanged'));
  };

  /* ── Global fonksiyon: mevcut dili döndür ── */
  window.getCurrentLanguage = function () {
    return currentLang;
  };

  /* ── Tüm data-tr / data-en elementlerini çevir ── */
  function applyLanguage(lang) {
    /* HTML lang attribute güncelle */
    document.documentElement.setAttribute('lang', lang);

    /* Title çevir */
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const tr = titleEl.getAttribute('data-tr');
      const en = titleEl.getAttribute('data-en');
      if (tr && en) titleEl.textContent = lang === 'tr' ? tr : en;
    }

    /* data-tr / data-en taşıyan tüm elementler */
    document.querySelectorAll('[data-tr][data-en]').forEach(function (el) {
      /* title elementini atla (yukarıda halledildi) */
      if (el.tagName === 'TITLE') return;

      const tr = el.getAttribute('data-tr');
      const en = el.getAttribute('data-en');
      const val = lang === 'tr' ? tr : en;

      /* input / select / textarea → value veya placeholder */
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        const trPh = el.getAttribute('data-tr-placeholder');
        const enPh = el.getAttribute('data-en-placeholder');
        if (trPh && enPh) el.placeholder = lang === 'tr' ? trPh : enPh;
        return;
      }

      /* button, option, select → değer ve innerHTML */
      if (el.tagName === 'OPTION') {
        el.textContent = val;
        return;
      }

      /* innerHTML içeren elementler (span, em gibi iç tag varsa) */
      if (val && (val.includes('<') || val.includes('&'))) {
        el.innerHTML = val;
      } else if (val) {
        el.textContent = val;
      }
    });

    /* Placeholder çevirileri (data-tr-placeholder / data-en-placeholder) */
    document.querySelectorAll('[data-tr-placeholder][data-en-placeholder]').forEach(function (el) {
      el.placeholder = lang === 'tr'
        ? el.getAttribute('data-tr-placeholder')
        : el.getAttribute('data-en-placeholder');
    });

    /* select option'larını ayrıca güncelle */
    document.querySelectorAll('select option[data-tr][data-en]').forEach(function (opt) {
      opt.textContent = lang === 'tr'
        ? opt.getAttribute('data-tr')
        : opt.getAttribute('data-en');
    });
  }

  /* ── Toggle UI: hangi buton aktif ── */
  function updateToggleUI(lang) {
    const trBtn = document.querySelector('.lang-btn-tr');
    const enBtn = document.querySelector('.lang-btn-en');
    if (!trBtn || !enBtn) return;
    if (lang === 'tr') {
      trBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      enBtn.classList.add('active');
      trBtn.classList.remove('active');
    }
  }

})();
