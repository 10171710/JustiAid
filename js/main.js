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
    var onScroll = function () {
      var nav = $('.main-navbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Theme toggle (all .theme-toggle buttons) ---------- */
  function themeToggle() {
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.theme-toggle') : null;
      if (!btn) return;
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
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
        btn.setAttribute('aria-label', isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
        btn.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      });
    }
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-rtl-toggle]') : null;
      if (!btn) return;
      var isRtl = root.getAttribute('dir') === 'rtl';
      root.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
      try { localStorage.setItem('dir', isRtl ? 'ltr' : 'rtl'); } catch (e) {}
      sync();
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
      var params = new URLSearchParams(location.search);
      var cat = params.get('cat') || params.get('area');
      var adv = params.get('advocate');
      if (!cat && adv && advocateProfiles[adv]) {
        cat = advocateProfiles[adv].area;
      }
      if (cat) {
        var matchBtn = btns.filter(function (b) { return b.getAttribute('data-filter') === cat; })[0];
        if (matchBtn) apply(cat);
      }
    });

    /* -- live search (sync desktop sidebar & mobile top search) -- */
    var searchInputs = $$('#blogSearch, #blogSearchMobile, [data-blog-search]');
    if (searchInputs.length) {
      searchInputs.forEach(function (input) {
        input.addEventListener('input', function () {
          var q = input.value.trim().toLowerCase();
          searchActive = q.length > 0;
          searchInputs.forEach(function (other) {
            if (other !== input) other.value = input.value;
          });
          items.forEach(function (it) {
            var match = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
            it.dataset.filterMatch = match ? 'true' : 'false';
          });
          paginate(true);
        });
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
      var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      var nameRegex = /^[a-zA-Z\s'.-]{3,}$/;

      $$('[required]', form).forEach(function (f) {
        var rawVal = f.value.trim();
        var bad = !rawVal;
        if (!bad && (f.type === 'email' || f.name === 'email')) {
          f.value = rawVal.toLowerCase();
          bad = !emailRegex.test(f.value);
        }
        if (!bad && (f.name === 'name' || f.id === 'bk-name' || (f.placeholder && f.placeholder.toLowerCase().indexOf('name') !== -1))) {
          var letterCount = (rawVal.match(/[a-zA-Z]/g) || []).length;
          bad = rawVal.length <= 2 || letterCount < 3 || !nameRegex.test(rawVal);
        }
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
        email:     emailInput   ? emailInput.value.trim().toLowerCase() : '',
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

  /* ---------- Generic contact and auth forms ---------- */
  function forms() {
    /* Strict email lowercasing and validation pattern */
    var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var nameRegex = /^[a-zA-Z\s'.-]{3,}$/;

    /* Live auto-lowercase on all email inputs across forms */
    $$('input[type="email"], [name="email"], #ct-email, #rg-email, #lg-email').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var lower = this.value.toLowerCase();
        if (this.value !== lower) {
          this.value = lower;
          if (start !== null && end !== null) {
            try { this.setSelectionRange(start, end); } catch (e) {}
          }
        }
      });
    });

    $$('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        var phoneOk = true;
        var nameOk = true;
        var emailOk = true;

        $$('[required]', form).forEach(function (f) {
          var bad = false;
          if (f.type === 'checkbox' || f.type === 'radio') {
            bad = !f.checked;
          } else {
            var rawVal = f.value.trim();
            if (!rawVal) {
              bad = true;
            } else if (f.type === 'email' || f.name === 'email' || (f.id && f.id.toLowerCase().indexOf('email') !== -1)) {
              f.value = rawVal.toLowerCase();
              bad = !emailRegex.test(f.value);
              if (bad) emailOk = false;
            } else if (
              f.id === 'ct-name' || f.name === 'name' || f.id === 'rg-fname' || f.id === 'rg-lname' ||
              f.name === 'first_name' || f.name === 'last_name' || f.name === 'fullName' ||
              (f.type === 'text' && f.placeholder && f.placeholder.toLowerCase().indexOf('name') !== -1)
            ) {
              var letterCount = (rawVal.match(/[a-zA-Z]/g) || []).length;
              bad = rawVal.length <= 2 || letterCount < 3 || !nameRegex.test(rawVal);
              if (bad) nameOk = false;
            } else if (f.type === 'tel') {
              var digits = rawVal.replace(/\D/g, '');
              bad = digits.length !== 10;
              if (bad) phoneOk = false;
            }
          }

          f.classList.toggle('invalid', bad);
          if (bad) valid = false;
        });

        if (!valid) {
          var msg = form.querySelector('#formMsg') || $('#formMsg') || form.querySelector('#authMsg') || $('#authMsg');
          if (msg) {
            msg.className = 'alert alert-danger';
            var errorText = 'Please fill all required fields correctly.';
            if (!nameOk) {
              errorText = 'Name must be more than 2 letters (at least 3 characters).';
            } else if (!emailOk) {
              errorText = 'Please enter a valid lowercase email address (e.g. you@example.com).';
            } else if (!phoneOk) {
              errorText = 'Please enter a valid 10-digit phone number.';
            }
            msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-2"></i>' + errorText;
            msg.classList.remove('d-none');
          }
          return;
        }

        var msg = form.querySelector('#formMsg') || $('#formMsg') || form.querySelector('#authMsg') || $('#authMsg');
        if (msg) msg.classList.add('d-none');

        /* Contact form → Supabase messages table */
        if (window.sb && document.body.getAttribute('data-page') === 'contact') {
          var nameInput  = form.querySelector('#ct-name, [name="name"]');
          var emailInput = form.querySelector('#ct-email, [name="email"]');
          var subjInput  = form.querySelector('#ct-subject, [name="subject"]');
          var msgInput   = form.querySelector('#ct-message, [name="message"], textarea');
          sb.from('messages').insert({
            name:    nameInput  ? nameInput.value.trim()  : '',
            email:   emailInput ? emailInput.value.trim().toLowerCase() : '',
            subject: subjInput  ? subjInput.value.trim()  : '',
            body:    msgInput   ? msgInput.value.trim()   : ''
          }).then(function (res) {
            var m = $('#formMsg');
            if (m) m.classList.add('d-none');
            var ok = $('#formDone');
            if (ok) ok.classList.remove('d-none');
            form.reset();
          }).catch(function (err) {
            alert('Failed to send message: ' + err.message);
          });
          return;
        }

        var ok = form.querySelector('#formDone') || $('#formDone');
        if (ok) ok.classList.remove('d-none');
        form.reset();
      });

      $$('[required]', form).forEach(function (f) {
        f.addEventListener('input', function () {
          f.classList.remove('invalid');
          var m = form.querySelector('#formMsg') || $('#formMsg') || form.querySelector('#authMsg') || $('#authMsg');
          if (m) m.classList.add('d-none');
        });
      });
      $$('input[type="checkbox"]', form).forEach(function (c) {
        c.addEventListener('change', function () {
          c.classList.remove('invalid');
          var m = form.querySelector('#formMsg') || $('#formMsg') || form.querySelector('#authMsg') || $('#authMsg');
          if (m) m.classList.add('d-none');
        });
      });
    });

    /* Pre-fill contact form practice area and advocate from URL params if present */
    var areaField = $('#ct-area');
    var msgField = $('#ct-message');
    var params = new URLSearchParams(location.search);
    var areaP = params.get('area');
    var advP = params.get('advocate');
    if (areaField && areaP) {
      var areaMap = {
        'family': 'Family Law',
        'property': 'Property Law',
        'criminal': 'Criminal Defense',
        'corporate': 'Corporate Law',
        'consumer': 'Consumer Rights',
        'other': 'Other / Not sure'
      };
      areaField.value = areaMap[areaP.toLowerCase()] || areaP;
    }
    if (msgField && advP && !msgField.value) {
      msgField.value = 'I would like to book a consultation with ' + advP + ' regarding my legal matter.\n\n';
    }

    /* Newsletter forms outside the footer module */
    $$('form[data-newsletter]').forEach(function (form) {
      var input = form.querySelector('input[type="email"], input.field');
      if (input) {
        input.addEventListener('input', function () {
          this.value = this.value.toLowerCase();
          this.classList.remove('invalid');
        });
      }
      if (form.closest('#footer')) return;
      var ok = form.parentElement.querySelector('.news-ok');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = input ? input.value.trim().toLowerCase() : '';
        if (!val || !emailRegex.test(val)) {
          if (input) input.classList.add('invalid');
          return;
        }
        if (input) {
          input.classList.remove('invalid');
          input.value = '';
        }
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

  /* ---------- Advocate Profile Data & Modal System ---------- */
  var advocateProfiles = {
    'ananya-rao': {
      name: 'Ananya Rao',
      img: 'assets/images/women.jpeg',
      area: 'family',
      areaLabel: 'Family Law',
      title: 'Senior Advocate · Family Law & Mediation',
      exp: '12 Years Active Practice',
      rating: '4.9',
      reviews: '214 reviews',
      bar: 'Bar Registration Verified · #TX-48912',
      bio: 'Ananya Rao is a senior family-law specialist advocating with empathy and strategic clarity. She specializes in divorce proceedings, child custody agreements, alimony settlements, and peaceful out-of-court domestic dispute mediation.',
      highlights: ['Divorce & Separation', 'Child Custody & Visitation', 'Alimony & Maintenance', 'Mediation & Out-of-Court Settlements', 'Domestic Agreements'],
      education: 'LL.M. in Family Jurisprudence (Texas Law) · Certified Family Mediator',
      languages: 'English, Hindi, Spanish',
      fee: 'From $49 / consultation · First case evaluation included'
    },
    'james-okafor': {
      name: 'James Okafor',
      img: 'assets/images/men1.jpg',
      area: 'criminal',
      areaLabel: 'Criminal Defense',
      title: 'Senior Trial Advocate · Criminal Defense Litigator',
      exp: '16 Years Trial Experience',
      rating: '4.9',
      reviews: '261 reviews',
      bar: 'Bar Registration Verified · #TX-31084',
      bio: 'James Okafor brings over 16 years of aggressive trial litigation and courtroom defense experience. He specializes in urgent bail hearings, criminal trials, FIR & chargesheet quashing petitions, and complex white-collar defense.',
      highlights: ['Bail & Urgent Hearings', 'Trial Defense & Court Advocacy', 'FIR & Chargesheet Quashing', 'White-Collar & Economic Offenses', 'Appeals & Revisions'],
      education: 'J.D., Criminal Trial Practice · National Criminal Defense Lawyers Fellow',
      languages: 'English, French, Yoruba',
      fee: 'From $59 / consultation · 24/7 Urgent Bail Support'
    },
    'fatima-haddad': {
      name: 'Fatima Haddad',
      img: 'assets/images/women2.webp',
      area: 'property',
      areaLabel: 'Property Law',
      title: 'Principal Property Counsel · Real Estate & Title Verification',
      exp: '15 Years Experience',
      rating: '4.9',
      reviews: '190 reviews',
      bar: 'Bar Registration Verified · #TX-55291',
      bio: 'Fatima Haddad is a distinguished property law expert advising individuals, property investors, and commercial developers. Her practice covers exhaustive 30-year title due diligence, sale & lease agreements, boundary encroachment disputes, and sub-registrar registration.',
      highlights: ['Title Due Diligence & Search Reports', 'Sale, Purchase & Lease Agreements', 'Encroachment & Boundary Disputes', 'Stamp Duty & Registration', 'Builder-Buyer Disputes'],
      education: 'LL.B. (Hons) in Real Property & Land Laws · State Bar Real Estate Section',
      languages: 'English, Arabic',
      fee: 'From $49 / consultation · Title due diligence quotes on request'
    },
    'kevin-brooks': {
      name: 'Kevin Brooks',
      img: 'assets/images/men.jpg',
      area: 'family',
      areaLabel: 'Family Law',
      title: 'Associate Advocate · Custody & Settlements',
      exp: '9 Years Experience',
      rating: '4.8',
      reviews: '158 reviews',
      bar: 'Bar Registration Verified · #TX-62189',
      bio: 'Kevin Brooks concentrates on mutual-consent divorce, parenting plans, custody negotiations, and maintenance modifications, prioritizing practical, cost-effective solutions for clients.',
      highlights: ['Custody & Co-Parenting Plans', 'Mutual Consent Divorce', 'Maintenance Modifications', 'Settlement Negotiations'],
      education: 'J.D., Domestic Relations & Family Law',
      languages: 'English',
      fee: 'From $49 / consultation'
    },
    'hannah-park': {
      name: 'Hannah Park',
      img: 'assets/images/men4.avif',
      area: 'property',
      areaLabel: 'Property Law',
      title: 'Property & Tenancy Advocate',
      exp: '8 Years Experience',
      rating: '4.7',
      reviews: '121 reviews',
      bar: 'Bar Registration Verified · #TX-74301',
      bio: 'Hannah Park advises landlords and tenants on lease agreements, security deposit disputes, eviction proceedings, and commercial tenancy compliance.',
      highlights: ['Tenancy & Lease Agreements', 'Deposit Recovery', 'Eviction Law Compliance', 'Commercial Leases'],
      education: 'LL.B. in Property & Real Estate Law',
      languages: 'English, Korean',
      fee: 'From $45 / consultation'
    },
    'grace-liu': {
      name: 'Grace Liu',
      img: 'assets/images/women3.jpg',
      area: 'criminal',
      areaLabel: 'Criminal Defense',
      title: 'Appellate & Defense Advocate',
      exp: '10 Years Experience',
      rating: '4.8',
      reviews: '143 reviews',
      bar: 'Bar Registration Verified · #TX-50914',
      bio: 'Grace Liu represents individuals in criminal appeals, high court revisions, FIR quash petitions, and cyber offenses with precise procedural expertise.',
      highlights: ['FIR & Charge Quashing', 'Appeals & Revisions', 'Cyber & Economic Crimes', 'Arrest Stay Orders'],
      education: 'LL.M. in Criminal & Constitutional Procedure',
      languages: 'English, Mandarin',
      fee: 'From $55 / consultation'
    },
    'diego-ramos': {
      name: 'Diego Ramos',
      img: 'assets/images/men2.jpeg',
      area: 'corporate',
      areaLabel: 'Corporate Law',
      title: 'Lead Corporate Counsel · Business & Compliance',
      exp: '13 Years Experience',
      rating: '4.9',
      reviews: '176 reviews',
      bar: 'Bar Registration Verified · #TX-39820',
      bio: 'Diego Ramos guides startups, founders, and enterprises through incorporation, shareholder agreements, regulatory audits, and commercial contract negotiations.',
      highlights: ['Company Incorporation & Structuring', 'Commercial Contracts & MSAs', 'Regulatory Compliance Audits', 'Commercial Dispute Resolution'],
      education: 'J.D. / M.B.A. in Corporate Jurisprudence',
      languages: 'English, Spanish, Portuguese',
      fee: 'From $60 / consultation'
    },
    'laura-kim': {
      name: 'Laura Kim',
      img: 'assets/images/women4.png',
      area: 'corporate',
      areaLabel: 'Corporate Law',
      title: 'IP & Corporate Attorney',
      exp: '11 Years Experience',
      rating: '4.8',
      reviews: '132 reviews',
      bar: 'Bar Registration Verified · #TX-44119',
      bio: 'Laura Kim handles trademark filings, intellectual property licensing, vendor agreements, and employment compliance for technology and retail companies.',
      highlights: ['Trademark & Copyright Registration', 'IP Licensing & Assignment', 'NDAs & Employment Agreements', 'Business Structuring'],
      education: 'LL.M. in Intellectual Property & Tech Law',
      languages: 'English, Korean',
      fee: 'From $50 / consultation'
    },
    'daniel-castro': {
      name: 'Daniel Castro',
      img: 'assets/images/men3.jpg',
      area: 'family',
      areaLabel: 'Family Law',
      title: 'Senior Advocate · Adoption & Guardianship',
      exp: '14 Years Experience',
      rating: '4.9',
      reviews: '167 reviews',
      bar: 'Bar Registration Verified · #TX-29088',
      bio: 'Daniel Castro has over 14 years of legal practice dedicated to domestic and international adoption, guardianship petitions, and child welfare representation.',
      highlights: ['Legal Adoption Proceedings', 'Guardianship & Custody Petitions', 'Surrogacy Legal Clearance', 'Child Welfare & Protection'],
      education: 'J.D. in Family & Child Advocacy Law',
      languages: 'English, Spanish',
      fee: 'From $50 / consultation'
    }
  };

  function openAdvocateModal(slug) {
    var data = advocateProfiles[slug];
    if (!data) return;

    var modal = document.getElementById('advocateProfileModal');
    if (!modal) {
      var wrap = document.createElement('div');
      wrap.innerHTML =
        '<div class="modal fade" id="advocateProfileModal" tabindex="-1" aria-labelledby="advModalName" aria-hidden="true">' +
        '  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">' +
        '    <div class="modal-content" style="border-radius:var(--radius);background:var(--bg);box-shadow:var(--shadow-3);border:none">' +
        '      <div class="modal-header border-0 pb-2 position-relative" style="background:var(--bg-soft);padding:24px 28px">' +
        '        <div class="d-flex flex-column flex-sm-row align-items-center gap-3 w-100 text-center text-sm-start">' +
        '          <img data-adv-img src="" alt="" style="width:84px;height:84px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--accent);box-shadow:var(--shadow-1)">' +
        '          <div class="flex-grow-1">' +
        '            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">' +
        '              <h4 class="h5 mb-0 fw-bold" id="advModalName" data-adv-name></h4>' +
        '              <span class="badge" style="background:rgba(var(--teal-rgb),.15);color:var(--teal);border:1px solid rgba(var(--teal-rgb),.3);font-size:0.75rem;padding:4px 8px"><i class="fa-solid fa-circle-check me-1"></i>Verified Advocate</span>' +
        '            </div>' +
        '            <p class="small text-muted mb-1" data-adv-title></p>' +
        '            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2 small">' +
        '              <span class="text-warning">★★★★★</span>' +
        '              <span class="text-muted" data-adv-rating></span>' +
        '              <span class="text-muted">·</span>' +
        '              <span class="badge badge-soft" data-adv-exp></span>' +
        '            </div>' +
        '          </div>' +
        '        </div>' +
        '        <button type="button" class="btn-close position-absolute" style="top:20px;inset-inline-end:20px" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '      </div>' +
        '      <div class="modal-body p-4">' +
        '        <div class="mb-4">' +
        '          <h5 class="h6 fw-bold mb-2" style="color:var(--heading)"><i class="fa-solid fa-user-tie me-2" style="color:var(--accent)"></i>About Advocate</h5>' +
        '          <p class="text-muted mb-0" data-adv-bio style="line-height:1.6"></p>' +
        '        </div>' +
        '        <div class="mb-4">' +
        '          <h5 class="h6 fw-bold mb-2" style="color:var(--heading)"><i class="fa-solid fa-scale-balanced me-2" style="color:var(--accent)"></i>Practice Specialisations</h5>' +
        '          <div class="d-flex flex-wrap gap-2" data-adv-highlights></div>' +
        '        </div>' +
        '        <div class="row g-3 mb-2">' +
        '          <div class="col-sm-6">' +
        '            <div class="neu-flat p-3 h-100">' +
        '              <h6 class="small fw-bold mb-1" style="color:var(--heading)"><i class="fa-solid fa-graduation-cap me-2" style="color:var(--accent)"></i>Education & Credentials</h6>' +
        '              <p class="small text-muted mb-1" data-adv-edu></p>' +
        '              <div class="small fw-bold" style="color:var(--teal)" data-adv-bar></div>' +
        '            </div>' +
        '          </div>' +
        '          <div class="col-sm-6">' +
        '            <div class="neu-flat p-3 h-100">' +
        '              <h6 class="small fw-bold mb-1" style="color:var(--heading)"><i class="fa-solid fa-language me-2" style="color:var(--accent)"></i>Languages & Fees</h6>' +
        '              <p class="small text-muted mb-1"><span class="fw-bold">Languages:</span> <span data-adv-lang></span></p>' +
        '              <p class="small text-muted mb-0"><span class="fw-bold">Fee:</span> <span data-adv-fee></span></p>' +
        '            </div>' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '      <div class="modal-footer border-0 pt-0 px-4 pb-4 d-flex justify-content-between">' +
        '        <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal">Close</button>' +
        '        <a class="btn btn-accent btn-sm" data-adv-book href="#"><i class="fa-solid fa-calendar-check me-1"></i> Book Consultation</a>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
      document.body.appendChild(wrap.firstElementChild);
      modal = document.getElementById('advocateProfileModal');
    }

    modal.querySelector('[data-adv-img]').src = data.img;
    modal.querySelector('[data-adv-img]').alt = data.name;
    modal.querySelector('[data-adv-name]').textContent = data.name;
    modal.querySelector('[data-adv-title]').textContent = data.title;
    modal.querySelector('[data-adv-rating]').textContent = data.rating + ' · ' + data.reviews;
    modal.querySelector('[data-adv-exp]').textContent = data.exp;
    modal.querySelector('[data-adv-bio]').textContent = data.bio;
    modal.querySelector('[data-adv-edu]').textContent = data.education;
    modal.querySelector('[data-adv-bar]').textContent = data.bar;
    modal.querySelector('[data-adv-lang]').textContent = data.languages;
    modal.querySelector('[data-adv-fee]').textContent = data.fee;

    var hlBox = modal.querySelector('[data-adv-highlights]');
    hlBox.innerHTML = data.highlights.map(function (hl) {
      return '<span class="badge" style="background:var(--accent-soft);color:var(--heading);border:1px solid rgba(var(--accent-rgb),.2);padding:6px 12px;font-size:0.82rem;font-weight:600">' +
        '<i class="fa-solid fa-check text-success me-1"></i>' + hl + '</span>';
    }).join('');

    var bookBtn = modal.querySelector('[data-adv-book]');
    bookBtn.href = 'contact.html?advocate=' + encodeURIComponent(data.name) + '&area=' + data.area + '#enquiry';

    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  function advocateModalInit() {
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-advocate]') : null;
      if (!btn) return;
      var slug = btn.getAttribute('data-advocate');
      if (slug && advocateProfiles[slug]) {
        e.preventDefault();
        openAdvocateModal(slug);
      }
    });

    var advParam = new URLSearchParams(location.search).get('advocate');
    if (advParam && advocateProfiles[advParam]) {
      setTimeout(function () {
        openAdvocateModal(advParam);
      }, 300);
    }
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
    advocateModalInit();
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

