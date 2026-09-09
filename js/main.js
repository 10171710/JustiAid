/* ==========================================================================
   GROOMHUB — Main Scripts
   Preloader, navbar scroll, reveal, counters, back-to-top, tabs, pricing
   toggle, before/after slider, filters, booking, forms, countdown.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Theme init (fallback; also set inline in <head>) ---------- */
  (function initTheme() {
    var root = document.documentElement;
    if (!root.getAttribute('data-theme')) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (e) {}
      var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      root.setAttribute('data-theme', theme);
    }
    if (!root.getAttribute('dir')) {
      var dir = null;
      try { dir = localStorage.getItem('dir'); } catch (e) {}
      if (dir === 'rtl' || dir === 'ltr') root.setAttribute('dir', dir);
    }
  })();

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Preloader ---------- */
  function preloader() {
    var el = $('#preloader');
    if (!el) return;
    /* Hide quickly on DOM ready; don't wait for slow CDN fonts/images to finish. */
    setTimeout(function () { el.classList.add('hidden'); }, 100);
  }

  /* ---------- Navbar scroll state ---------- */
  function navbarScroll() {
    var nav = $('.main-navbar');
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Theme toggle (all .theme-toggle buttons) ---------- */
  function themeToggle() {
    $$('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var root = document.documentElement;
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
      });
    });
  }

  /* ---------- LTR / RTL toggle (all [data-rtl-toggle] buttons) ---------- */
  function rtlToggle() {
    var root = document.documentElement;
    function sync() {
      var isRtl = root.getAttribute('dir') === 'rtl';
      $$('[data-rtl-toggle]').forEach(function (btn) {
        var label = btn.querySelector('[data-rtl-label]');
        if (label) label.textContent = isRtl ? 'LTR' : 'RTL';
        btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
      });
    }
    $$('[data-rtl-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isRtl = root.getAttribute('dir') === 'rtl';
        root.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
        try { localStorage.setItem('dir', isRtl ? 'ltr' : 'rtl'); } catch (e) {}
        sync();
      });
    });
    sync();
  }

  /* ---------- Scroll reveal ---------- */
  function reveals() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function counters() {
    $$('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      if (!('IntersectionObserver' in window)) { el.textContent = target + suffix; return; }
      var io = new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------- Back to top ---------- */
  function backTop() {
    var btn = $('#backTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Tabs (data-tab-toggle) ---------- */
  function tabs() {
    $$('[data-tab-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('[data-tab-group]');
        var target = document.getElementById(btn.getAttribute('data-tab-toggle'));
        if (!group || !target) return;
        $$('[data-tab-toggle]', group).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        $$('[data-tab-panel]', group).forEach(function (p) { p.classList.add('d-none'); });
        target.classList.remove('d-none');
      });
    });
  }

  /* ---------- Pricing monthly/yearly toggle ---------- */
  function priceToggle() {
    var sw = $('#priceSwitch');
    if (!sw) return;
    sw.addEventListener('click', function () {
      var yearly = sw.classList.toggle('on');
      $$('[data-price]').forEach(function (el) {
        var y = parseFloat(el.getAttribute('data-price-year'));
        var m = parseFloat(el.getAttribute('data-price'));
        el.textContent = (yearly ? y : m);
      });
      $$('[data-billing]').forEach(function (el) {
        el.textContent = yearly ? '/year' : '/month';
      });
    });
  }

  /* ---------- Before / After slider ---------- */
  function baSliders() {
    $$('.ba-wrap[data-ba]').forEach(function (wrap) {
      var pos = wrap.getAttribute('data-ba-pos');
      wrap.style.setProperty('--ba-pos', pos || '50%');
      var handle = wrap.querySelector('.ba-handle');
      var after = wrap.querySelector('.ba-after');
      if (!handle || !after) return;
      function update(clientX) {
        var r = wrap.getBoundingClientRect();
        var pct = ((clientX - r.left) / r.width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        wrap.style.setProperty('--ba-pos', pct + '%');
      }
      function down(e) {
        e.preventDefault();
        var move = function (ev) {
          update(ev.type === 'touchmove' ? ev.touches[0].clientX : ev.clientX);
        };
        var up = function () {
          window.removeEventListener('mousemove', move);
          window.removeEventListener('mouseup', up);
          window.removeEventListener('touchmove', move);
          window.removeEventListener('touchend', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('touchend', up);
      }
      handle.addEventListener('mousedown', down);
      handle.addEventListener('touchstart', down, { passive: false });
      wrap.addEventListener('click', function (e) {
        if (e.target !== handle) update(e.clientX);
      });
    });
  }

  /* ---------- Filter buttons + search + pagination (blog) ----------
     Category filter, live search and page numbers all just toggle which
     of the existing <article> cards are visible — nothing ever navigates
     away from the page. Pagination is only meaningful while browsing the
     full unfiltered list; the moment a category or search query narrows
     the results, paging is disabled and every match is shown at once. */
  function blogListing() {
    var items = $$('[data-filter-item]');
    if (!items.length) return;

    items.forEach(function (it) { it.dataset.filterMatch = 'true'; });

    var activeFilter = 'all';
    var searchActive = false;

    function syncVisibility(it) {
      var show = it.dataset.filterMatch !== 'false' && it.dataset.pageMatch !== 'false';
      it.classList.toggle('d-none', !show);
    }

    /* -- pagination (defined first so it's ready before any filter runs) -- */
    var pager = $('[data-blog-pagination]');
    var perPage = 6;
    var currentPage = 1;

    function visibleForPaging() {
      return items.filter(function (it) { return it.dataset.filterMatch !== 'false'; });
    }

    function paginate(reset) {
      if (reset) currentPage = 1;
      var pool = visibleForPaging();
      var pageable = !!pager && activeFilter === 'all' && !searchActive;
      var totalPages = pageable ? Math.max(1, Math.ceil(pool.length / perPage)) : 1;
      if (currentPage > totalPages) currentPage = totalPages;

      items.forEach(function (it) { it.dataset.pageMatch = 'true'; });
      if (pageable) {
        pool.forEach(function (it, idx) {
          var page = Math.floor(idx / perPage) + 1;
          it.dataset.pageMatch = (page === currentPage) ? 'true' : 'false';
        });
      }
      items.forEach(syncVisibility);
      renderPager(totalPages, pageable);
    }

    function renderPager(totalPages, pageable) {
      if (!pager) return;
      $$('[data-page]', pager).forEach(function (el) {
        var p = parseInt(el.getAttribute('data-page'), 10);
        var li = el.closest('.page-item');
        li.classList.toggle('d-none', p > totalPages);
        li.classList.toggle('active', pageable && p === currentPage);
      });
      var prev = $('[data-page-dir="prev"]', pager);
      var next = $('[data-page-dir="next"]', pager);
      if (prev) prev.closest('.page-item').classList.toggle('disabled', !pageable || currentPage <= 1);
      if (next) next.closest('.page-item').classList.toggle('disabled', !pageable || currentPage >= totalPages);
    }

    if (pager) {
      pager.addEventListener('click', function (e) {
        var link = e.target.closest('.page-link');
        if (!link || !pager.contains(link)) return;
        e.preventDefault();
        if (link.closest('.page-item').classList.contains('disabled')) return;
        var dir = link.getAttribute('data-page-dir');
        if (dir === 'prev') currentPage -= 1;
        else if (dir === 'next') currentPage += 1;
        else currentPage = parseInt(link.getAttribute('data-page'), 10) || 1;
        paginate(false);
        var section = pager.closest('section');
        if (section && typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    /* -- category filter -- */
    $$('[data-filter-group]').forEach(function (group) {
      var btns = $$('[data-filter]', group);
      function apply(f) {
        activeFilter = f;
        btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === f); });
        items.forEach(function (it) {
          var match = f === 'all' || it.getAttribute('data-filter-item') === f;
          it.dataset.filterMatch = match ? 'true' : 'false';
          if (match) { it.classList.remove('reveal'); void it.offsetWidth; it.classList.add('reveal', 'in'); }
        });
        paginate(true);
      }
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () { apply(btn.getAttribute('data-filter')); });
      });
      var cat = new URLSearchParams(location.search).get('cat');
      if (cat) {
        var matchBtn = btns.filter(function (b) { return b.getAttribute('data-filter') === cat; })[0];
        if (matchBtn) apply(cat);
      }
    });

    /* -- live search -- */
    var searchInput = $('#blogSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim().toLowerCase();
        searchActive = q.length > 0;
        items.forEach(function (it) {
          var match = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
          it.dataset.filterMatch = match ? 'true' : 'false';
        });
        paginate(true);
      });
    }

    /* -- initial render (no-op if a ?cat= filter above already rendered) -- */
    paginate(true);
  }

  /* ---------- Coming soon countdown ---------- */
  function countdown() {
    var wrap = $('#countdown');
    if (!wrap) return;
    var target = new Date();
    target.setDate(target.getDate() + 28);
    target.setHours(0, 0, 0, 0);
    var boxes = {
      d: $('#cd-days'), h: $('#cd-hours'), m: $('#cd-mins'), s: $('#cd-secs')
    };
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = Math.max(0, target - new Date());
      if (boxes.d) boxes.d.textContent = pad(Math.floor(diff / 86400000));
      if (boxes.h) boxes.h.textContent = pad(Math.floor(diff / 3600000) % 24);
      if (boxes.m) boxes.m.textContent = pad(Math.floor(diff / 60000) % 60);
      if (boxes.s) boxes.s.textContent = pad(Math.floor(diff / 1000) % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Booking form ---------- */
  function booking() {
    var form = $('#bookingForm');
    if (!form) return;
    var done = $('#bookingDone');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      $$('[required]', form).forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle('invalid', bad);
        if (bad) valid = false;
      });
      if (!valid) return;
      if (!window.sb) { alert('Still loading, please try again in a moment.'); return; }

      var nameInput = form.querySelector('[name="name"], #bk-name');
      var emailInput = form.querySelector('[name="email"], #bk-email, [type="email"]');
      var phoneInput = form.querySelector('[name="phone"], #bk-phone');
      var petInput = form.querySelector('[name="pet_name"], #petName, #bk-pet');
      var petTypeInput = form.querySelector('[name="pet_type"], #bk-type');
      var serviceInput = form.querySelector('[name="service"], #bk-service');
      var dateInput = form.querySelector('[name="date"], #bk-date');
      var timeInput = form.querySelector('[name="time"], #bk-time');
      var notesInput = form.querySelector('[name="notes"], #bk-notes');

      var payload = {
        name:      nameInput    ? nameInput.value.trim()    : '',
        email:     emailInput   ? emailInput.value.trim()   : '',
        phone:     phoneInput   ? phoneInput.value.trim()   : '',
        pet_name:  petInput     ? petInput.value.trim()     : '',
        pet_type:  petTypeInput ? petTypeInput.value.trim() : '',
        service:   serviceInput ? serviceInput.value.trim() : '',
        date:      dateInput ? dateInput.value : '',
        time:      timeInput ? timeInput.value.trim() : '',
        notes:     notesInput ? notesInput.value.trim() : ''
      };

      sb.auth.getSession().then(function (res) {
        if (res.data.session && res.data.session.user) {
          payload.user_id = res.data.session.user.id;
        }
        return sb.from('bookings').insert(payload);
      }).then(function (res) {
        if (res && res.error) { alert('Booking failed: ' + res.error.message); return; }
        form.classList.add('d-none');
        if (done) done.classList.remove('d-none');
      }).catch(function (err) {
        alert('Booking failed: ' + (err.message || 'Unknown error'));
      });
    });
    $$('[required]', form).forEach(function (f) {
      f.addEventListener('input', function () { f.classList.remove('invalid'); });
    });
  }

  /* ---------- Generic contact form ---------- */
  function forms() {
    $$('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        var phoneOk = true;
        $$('[required]', form).forEach(function (f) {
          var bad = (f.type === 'checkbox' || f.type === 'radio')
            ? !f.checked
            : !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
          if (!bad && f.type === 'tel') {
            var digits = f.value.replace(/\D/g, '');
            bad = digits.length !== 10;
            phoneOk = phoneOk && !bad;
          }
          f.classList.toggle('invalid', bad);
          if (bad) valid = false;
        });
        if (!valid) {
          var msg = $('#formMsg');
          if (msg) {
            msg.className = 'alert alert-danger';
            msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-2"></i>Please fill all required fields' +
              (phoneOk ? '.' : ' and enter a valid 10-digit phone number.');
            msg.classList.remove('d-none');
          }
          return;
        }
        var msg = $('#formMsg');
        if (msg) msg.classList.add('d-none');

        /* Contact form → Supabase messages table */
        if (window.sb && document.body.getAttribute('data-page') === 'contact') {
          var nameInput  = form.querySelector('#ct-name, [name="name"]');
          var emailInput = form.querySelector('#ct-email, [name="email"]');
          var subjInput  = form.querySelector('#ct-subject, [name="subject"]');
          var msgInput   = form.querySelector('#ct-message, [name="message"], textarea');
          sb.from('messages').insert({
            name:    nameInput  ? nameInput.value.trim()  : '',
            email:   emailInput ? emailInput.value.trim() : '',
            subject: subjInput  ? subjInput.value.trim()  : '',
            body:    msgInput   ? msgInput.value.trim()   : ''
}).then(function (res) {
            var msg = $('#formMsg');
            if (msg) msg.classList.add('d-none');
            var ok = $('#formDone');
            if (ok) ok.classList.remove('d-none');
            form.reset();
          }).catch(function (err) {
            alert('Failed to send message: ' + err.message);
          });
          return;
        }

        var ok = $('#formDone');
        if (ok) ok.classList.remove('d-none');
        form.reset();
      });
      $$('[required]', form).forEach(function (f) {
        f.addEventListener('input', function () { f.classList.remove('invalid'); });
      });
      $$('input[type="checkbox"]', form).forEach(function (c) {
        c.addEventListener('change', function () { c.classList.remove('invalid'); });
      });
    });

    /* Newsletter forms outside the footer module */
    $$('form[data-newsletter]').forEach(function (form) {
      if (form.closest('#footer')) return;
      var ok = form.parentElement.querySelector('.news-ok');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input || !input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          if (input) input.classList.add('invalid');
          return;
        }
        if (input) input.classList.remove('invalid');
        if (input) input.value = '';
        if (ok) ok.style.display = 'block';
      });
    });

    var pass = $('#registerPassword');
    var conf = $('#registerConfirm');
    if (pass && conf) {
      conf.addEventListener('input', function () {
        var bad = conf.value && conf.value !== pass.value;
        conf.classList.toggle('invalid', bad);
      });
    }

    var pwToggle = $('#pwToggle');
    var pwField = $('#passwordField');
    if (pwToggle && pwField) {
      pwToggle.addEventListener('click', function () {
        var show = pwField.type === 'password';
        pwField.type = show ? 'text' : 'password';
        pwToggle.innerHTML = show
          ? '<i class="fa-solid fa-eye-slash"></i>'
          : '<i class="fa-solid fa-eye"></i>';
      });
    }
  }

  /* ---------- Admin sidebar ---------- */
  function adminSidebar() {
    var open = $('#sideOpen');
    var close = $('#sideClose');
    var backdrop = $('.admin-backdrop');
    function setOpen(o) { document.body.classList.toggle('admin-open', o); }
    if (open) open.addEventListener('click', function () { setOpen(true); });
    if (close) close.addEventListener('click', function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });
  }

  /* ---------- Social links: native app first, web fallback ---------- */
  /* Delegated on document so icons injected later (e.g. the footer via
     footer.js, team cards, coming-soon) always get native-app handling
     regardless of when they enter the DOM. */
  function nativeAppLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[data-native-app]') : null;
      if (!a) return;

      var appUrls = (a.getAttribute('data-app-url') || '').split(',').map(function (s) { return s.trim(); })
        .filter(Boolean);
      if (!appUrls.length) return;
      e.preventDefault();

      var webUrl = a.href;
      var appOpened = false;

      /* If the tab loses focus, the native app likely opened — remember that. */
      var onBlur = function () { appOpened = true; };
      window.addEventListener('blur', onBlur);

      /* Try the native app scheme(s) one after another. On desktop an unknown
         scheme fails silently, so quickly step through each candidate. */
      for (var i = 0; i < appUrls.length; i++) {
        try { window.location.href = appUrls[i]; } catch (err) {}
      }

      /* If no app opened within the window, fall back to the website.
         Same-tab navigation is used (not window.open) so it is never
         blocked as a popup and the link reliably does something. */
      setTimeout(function () {
        window.removeEventListener('blur', onBlur);
        if (!appOpened && !a.hasAttribute('data-app-only')) window.location.href = webUrl;
      }, 800);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    adminSidebar();
    themeToggle();
    rtlToggle();
    preloader();
    navbarScroll();
    reveals();
    counters();
    backTop();
    tabs();
    priceToggle();
    baSliders();
    blogListing();
    countdown();
    booking();
    forms();
    nativeAppLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
