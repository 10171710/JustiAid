/* ==========================================================================
   JUSTICAID — Reusable Navbar Module
   Include via <div id="navbar"></div> and <script src="js/navbar.js"></script>
   Menu: Home (dropdown: Home 1, Home 2) · About · Services · Blog · Contact
   ========================================================================== */

(function () {
  'use strict';

  var brandIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 2v20M3 6h18M3 6c0 2 1.6 3.6 4 4M21 6c0 2-1.6 3.6-4 4M6 9c-.5 3 .8 5.5 3 6m6-6c.5 3-.8 5.5-3 6m-3 5h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="12" cy="6" r="1.2" fill="currentColor"/>' +
    '</svg>';

  var brand =
    '<a class="brand" href="index.html" aria-label="JustiAid - Home">' +
    '  <span class="brand-logo">' + brandIcon + '</span>' +
    '  <span><span class="brand-name">JustiAid</span><span class="brand-tag">Legal Help</span></span>' +
    '</a>';

  var toggles =
    '<button class="theme-toggle" type="button" aria-label="Toggle dark mode">' +
    '  <span class="icon-sun"><i class="fa-solid fa-sun"></i></span>' +
    '  <span class="icon-moon"><i class="fa-solid fa-moon"></i></span>' +
    '</button>' +
    '<button class="rtl-toggle" type="button" data-rtl-toggle aria-label="Toggle text direction" title="Toggle RTL/LTR">' +
    '  <i class="fa-solid fa-right-left" aria-hidden="true"></i>' +
    '</button>';

  var isAuth = document.body.getAttribute('data-page') === 'login' ||
               document.body.getAttribute('data-page') === 'register';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem('ja_session'));
      return s && s.email ? s : null;
    } catch (e) {
      return null;
    }
  }

  var session = isAuth ? null : getSession();
  var authBtns = session
    ? '<span class="nav-user"><i class="fa-solid fa-circle-user"></i> Hi, ' + esc(session.fname) + '</span>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-auth-logout><i class="fa-solid fa-right-from-bracket"></i> Sign out</button>'
    : '<a class="btn btn-accent btn-sm" href="contact.html#enquiry"><i class="fa-solid fa-scale-balanced"></i> Free Case Review</a>';

  var html = isAuth
    ? '<div class="auth-topbar" aria-label="Page controls">' + toggles + '</div>'
    : '<nav class="main-navbar" aria-label="Main navigation">' +
      '  <div class="container">' +
      '    <div class="navbar-wrap">' +
      brand +
      '      <div class="nav-actions nav-actions-bar">' + toggles + '</div>' +
      '      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu">' +
      '        <svg class="ico-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>' +
      '        <svg class="ico-close" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>' +
      '      </button>' +
      '      <div class="nav-collapse" id="siteMenu">' +
      '        <ul class="nav-menu">' +
      '          <li class="has-dropdown">' +
      '            <a href="index.html">Home <i class="caret fa-solid fa-chevron-down"></i></a>' +
      '            <ul class="dropdown">' +
      '              <li><a href="index.html"><span>Home Page 1<small class="d-sub">General legal services landing</small></span></a></li>' +
      '              <li><a href="home-2.html"><span>Home Page 2<small class="d-sub">Advocate referral niche</small></span></a></li>' +
      '            </ul>' +
      '          </li>' +
      '          <li><a href="about.html">About Us</a></li>' +
      '          <li><a href="services.html">Services</a></li>' +
      '          <li><a href="advocate-directory.html">Advocates</a></li>' +
      '          <li><a href="blog.html">Blog</a></li>' +
      '          <li><a href="contact.html">Contact</a></li>' +
      '        </ul>' +
      '        <div class="nav-actions">' +
      toggles +
      '          ' + authBtns +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</nav>' +
      '<div class="nav-backdrop"></div>';

  function mount() {
    var host = document.getElementById('navbar');
    if (!host) return;
    host.innerHTML = html;

    var toggle = host.querySelector('.nav-toggle');
    var backdrop = host.querySelector('.nav-backdrop');

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    if (toggle && backdrop) {
      toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('nav-open'));
      });
      backdrop.addEventListener('click', function () { setOpen(false); });
    }

    host.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });

    host.querySelectorAll('a').forEach(function (a) {
      if (a.href) {
        var current = window.location.pathname.replace(/\/+$/, '');
        var target = a.pathname.replace(/\/+$/, '');
        if (current === target && target !== '') {
          a.classList.add('active');
        } else if (current.indexOf('service-details') !== -1 && target.indexOf('services.html') !== -1) {
          a.classList.add('active');
        } else if (current.indexOf('blog-details') !== -1 && target.indexOf('blog.html') !== -1) {
          a.classList.add('active');
        }
      }
    });

    var logoutBtn = host.querySelector('[data-auth-logout]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        if (window.sb) {
          sb.auth.signOut().then(function () {
            try { localStorage.removeItem('ja_session'); } catch (e) {}
            window.location.reload();
          });
        } else {
          try { localStorage.removeItem('ja_session'); } catch (e) {}
          window.location.reload();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();