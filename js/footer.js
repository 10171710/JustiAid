/* ==========================================================================
   JUSTICAID — Reusable Footer Module
   Include via <div id="footer"></div> and <script src="js/footer.js"></script>
   ========================================================================== */

(function () {
  'use strict';

  var brandIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 2v20M3 6h18M3 6c0 2 1.6 3.6 4 4M21 6c0 2-1.6 3.6-4 4M6 9c-.5 3 .8 5.5 3 6m6-6c.5 3-.8 5.5-3 6m-3 5h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="12" cy="6" r="1.2" fill="currentColor"/>' +
    '</svg>';

  var html =
    '<footer class="main-footer bg-soft" aria-label="Site footer">' +
    '  <div class="container">' +
    '    <div class="footer-top">' +
    '      <div class="footer-brand footer-col">' +
    '        <a class="brand" href="index.html" aria-label="JustiAid - Home">' +
    '          <span class="brand-logo">' + brandIcon + '</span>' +
    '          <span><span class="brand-name">JustiAid</span><span class="brand-tag">Legal Help</span></span>' +
    '        </a>' +
    '        <p>Personalised legal assistance and honest, vetted advocate referrals. We help you understand your rights, find the right expert and move forward with confidence.</p>' +
    '        <div class="d-flex gap-2">' +
    '          <a class="soc" href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook" data-native-app data-app-url="fb://page/justiaid"><i class="fa-brands fa-facebook-f"></i></a>' +
    '          <a class="soc" href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram" data-native-app data-app-url="instagram://user?username=justiaid"><i class="fa-brands fa-instagram"></i></a>' +
    '          <a class="soc" href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" data-native-app data-app-url="x://timeline, twitter://user?screen_name=justiaid"><i class="fa-brands fa-twitter"></i></a>' +
    '          <a class="soc" href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube" data-native-app data-app-url="vnd.youtube://www.youtube.com/user/justiaid, youtube://www.youtube.com/user/justiaid"><i class="fa-brands fa-youtube"></i></a>' +
    '        </div>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <h3 class="footer-head">Quick Links</h3>' +
    '        <ul class="footer-links">' +
    '          <li><a href="index.html"><i class="fa-solid fa-angle-right"></i> Home Page 1</a></li>' +
    '          <li><a href="home-2.html"><i class="fa-solid fa-angle-right"></i> Home Page 2</a></li>' +
    '          <li><a href="about.html"><i class="fa-solid fa-angle-right"></i> About Us</a></li>' +
    '          <li><a href="advocate-directory.html"><i class="fa-solid fa-angle-right"></i> Advocate Directory</a></li>' +
    '          <li><a href="blog.html"><i class="fa-solid fa-angle-right"></i> Blog</a></li>' +
    '          <li><a href="contact.html"><i class="fa-solid fa-angle-right"></i> Contact</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <h3 class="footer-head">Practice Areas</h3>' +
    '        <ul class="footer-links">' +
    '          <li><a href="service-details.html?service=family-law"><i class="fa-solid fa-angle-right"></i> Family Law</a></li>' +
    '          <li><a href="service-details.html?service=property-law"><i class="fa-solid fa-angle-right"></i> Property Law</a></li>' +
    '          <li><a href="service-details.html?service=criminal-defense"><i class="fa-solid fa-angle-right"></i> Criminal Defense</a></li>' +
    '          <li><a href="service-details.html?service=corporate-law"><i class="fa-solid fa-angle-right"></i> Corporate Law</a></li>' +
    '          <li><a href="pricing.html"><i class="fa-solid fa-angle-right"></i> Consultation Pricing</a></li>' +
    '          <li><a href="contact.html#enquiry"><i class="fa-solid fa-angle-right"></i> Case Enquiry</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="footer-col footer-news">' +
    '        <h3 class="footer-head">Legal Updates</h3>' +
    '        <p class="text-muted small mb-3">Subscribe for plain-language legal news, rights guides and firm updates — no spam, just clarity.</p>' +
    '        <form class="news-form" data-newsletter aria-label="Newsletter subscription">' +
    '          <input class="field" type="email" placeholder="Your email address" aria-label="Email address" required>' +
    '          <button class="btn btn-accent btn-sm" type="submit"><i class="fa-solid fa-paper-plane"></i></button>' +
    '        </form>' +
    '        <p class="news-ok text-muted small mt-2" style="display:none">Subscribed! We will keep you informed.</p>' +
    '        <div class="mt-4">' +
    '          <p class="mb-1 small fw-bold text-muted"><a href="tel:+15550142233" class="contact-link"><i class="fa-solid fa-phone me-2"></i>+1 (555) 014-2233</a></p>' +
    '          <p class="mb-1 small fw-bold text-muted"><a href="mailto:help@justiaid.com" class="contact-link"><i class="fa-solid fa-envelope me-2"></i>help@justiaid.com</a></p>' +
    '          <p class="mb-0 small fw-bold text-muted"><i class="fa-solid fa-location-dot me-2"></i>12 Justice Row, District Court Rd, Austin</p>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-bottom">' +
    '      <p>© <span data-year>2026</span> JustiAid. All rights reserved.</p>' +
    '      <ul class="footer-links d-inline-flex gap-4 flex-row" style="display:inline-flex">' +
    '        <li><a href="#" data-legal="privacy">Privacy Policy</a></li>' +
    '        <li><a href="#" data-legal="terms">Terms of Service</a></li>' +
    '        <li><a href="#" data-legal="cookies">Cookies</a></li>' +
    '      </ul>' +
    '    </div>' +
    '  </div>' +
    '</footer>';

  var legalModalHtml =
    '<div class="modal fade" id="legalModal" tabindex="-1" role="dialog" aria-labelledby="legalModalTitle" aria-hidden="true">' +
    '  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">' +
    '    <div class="modal-content">' +
    '      <div class="modal-header">' +
    '        <h5 class="modal-title" id="legalModalTitle">Privacy Policy</h5>' +
    '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '      </div>' +
    '      <div class="modal-body">' +
    '        <section data-legal-doc="privacy">' +
    '          <h4 class="h5 mb-2">Privacy Policy</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">JustiAid respects your privacy and is committed to protecting the personal and case information you share with us.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Information we collect</h5>' +
    '          <p class="mb-3">We collect the details you submit through our enquiry forms — name, contact details and a summary of your legal matter. This is used only to respond and refer you appropriately.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Confidentiality</h5>' +
    '          <p class="mb-3">All information about your matter is kept strictly confidential and is only shared with a matched advocate where you consent.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Your rights</h5>' +
    '          <p class="mb-0">You may request access to, correction of, or deletion of your personal information at any time by contacting us at <a href="mailto:help@justiaid.com" class="contact-link">help@justiaid.com</a>.</p>' +
    '        </section>' +
    '        <section data-legal-doc="terms" hidden>' +
    '          <h4 class="h5 mb-2">Terms of Service</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">JustiAid is a legal information and advocate referral service. We do not replace the advice of a licensed attorney.</p>' +
    '          <h5 class="h6 fw-bold mb-1">No attorney–client relationship</h5>' +
    '          <p class="mb-3">Submitting an enquiry through this website does not create an attorney–client relationship. That relationship is formed only when you engage an advocate directly.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Referrals</h5>' +
    '          <p class="mb-3">Advocates listed in our directory are vetted independently. you are responsible for verifying credentials and fees before engaging any advocate.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Limitation of liability</h5>' +
    '          <p class="mb-0">We are not liable for outcomes of cases handled by referred advocates. Legal guidance on our blog and resources is general information only.</p>' +
    '        </section>' +
    '        <section data-legal-doc="cookies" hidden>' +
    '          <h4 class="h5 mb-2">Cookie Policy</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">Cookies help us remember your preferences (theme, language direction) and understand how the site is used.</p>' +
    '          <ul class="list-unstyled text-muted small mb-3">' +
    '            <li class="mb-2"><i class="fa-solid fa-scale-balanced me-2" style="color:var(--accent)"></i><b class="text">Essential cookies</b> - keep the site working, such as remembering your theme preference and session state.</li>' +
    '            <li class="mb-2"><i class="fa-solid fa-scale-balanced me-2" style="color:var(--accent)"></i><b class="text">Analytics cookies</b> - help us understand how visitors use the site so we can improve it.</li>' +
    '            <li class="mb-0"><i class="fa-solid fa-scale-balanced me-2" style="color:var(--accent)"></i><b class="text">Preference cookies</b> - remember choices such as your preferred language or layout.</li>' +
    '          </ul>' +
    '          <p class="mb-0">You can block or delete cookies through your browser settings.</p>' +
    '        </section>' +
    '      </div>' +
    '      <div class="modal-footer">' +
    '        <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">Close</button>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>';

  function mount() {
    var host = document.getElementById('footer');
    if (!host) return;
    host.innerHTML = html;

    var modalWrap = document.createElement('div');
    modalWrap.innerHTML = legalModalHtml;
    document.body.appendChild(modalWrap.firstElementChild);

    var legalTitles = { privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Policy' };
    document.addEventListener('click', function (e) {
      var link = e.target && e.target.closest ? e.target.closest('a[data-legal]') : null;
      if (!link) return;
      e.preventDefault();
      var key = link.getAttribute('data-legal');
      if (!legalTitles[key]) key = 'privacy';
      var modal = document.getElementById('legalModal');
      if (!modal || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;
      var titleEl = modal.querySelector('#legalModalTitle');
      if (titleEl) titleEl.textContent = legalTitles[key];
      modal.querySelectorAll('[data-legal-doc]').forEach(function (sec) {
        sec.hidden = sec.getAttribute('data-legal-doc') !== key;
      });
      bootstrap.Modal.getOrCreateInstance(modal).show();
    });

    var year = host.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    var form = host.querySelector('[data-newsletter]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var ok = host.querySelector('.news-ok');
        if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('invalid');
          return;
        }
        input.classList.remove('invalid');
        if (window.sb) {
          sb.from('newsletter').insert({ email: input.value.trim() }).then(function (res) {
            if (res && res.error && res.error.code !== '23505') {
              input.classList.add('invalid');
              return;
            }
            form.style.display = 'none';
            if (ok) ok.style.display = 'block';
          }).catch(function () {
            form.style.display = 'none';
            if (ok) ok.style.display = 'block';
          });
        } else {
          form.style.display = 'none';
          if (ok) ok.style.display = 'block';
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