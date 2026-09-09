(function () {
  'use strict';

  var services = {
    'family-law': {
      title: 'Family Law',
      icon: '<i class="fa-solid fa-scale-balanced"></i>',
      tagline: 'Compassionate guidance for your family\'s most personal matters — from divorce and custody to maintenance and settlements.',
      heading: 'Compassionate guidance for your family\'s most personal matters',
      p1: 'Family law matters are rarely simple — they involve the people you love. Our vetted family-law advocates bring both expertise and empathy, guiding you through divorce, custody and maintenance with clear communication at every stage.',
      p2: 'We help you understand exactly what to expect, what documents you\'ll need and what each step means, so you can make decisions with confidence rather than confusion.',
      includes: [
        { icon: 'fa-solid fa-scale-balanced', label: 'Divorce & separation' },
        { icon: 'fa-solid fa-baby',           label: 'Child custody & visitation' },
        { icon: 'fa-solid fa-sack-dollar',     label: 'Maintenance & alimony' },
        { icon: 'fa-solid fa-handshake',        label: 'Mediation & settlements' }
      ],
      process: [
        '<b>Case assessment</b> — a confidential review of your situation and goals.',
        '<b>Document preparation</b> — gathering and drafting the required forms.',
        '<b>Filing & response</b> — lodging the petition and responding to any notice.',
        '<b>Negotiation or hearings</b> — settlement first, court if necessary.',
        '<b>Final order</b> — decree, agreement and post-order support.'
      ],
      init: '<b>Free first consultation:</b> your first case-review consultation with a matched advocate is complimentary through JustiAid.',
      fees: [
        ['Consultation', 'Free'],
        ['Mutual-consent divorce', 'from $300'],
        ['Contested divorce', 'from $800'],
        ['Custody matter', 'from $500']
      ],
      notes: [
        '<i class="fa-solid fa-clock me-2"></i>6–18 months typical timeline',
        '<i class="fa-solid fa-file-shield me-2"></i>All documents confidential',
        '<i class="fa-solid fa-person-dress-burst me-2"></i>Mediation options available'
      ],
      advocateArea: 'family',
      related: [
        { label: 'Property Law',  slug: 'property-law',  icon: 'fa-solid fa-building-columns' },
        { label: 'Criminal Defense', slug: 'criminal-defense', icon: 'fa-solid fa-shield-halved' },
        { label: 'Corporate Law', slug: 'corporate-law', icon: 'fa-solid fa-briefcase' }
      ]
    },
    'property-law': {
      title: 'Property Law',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      tagline: 'Title verification, sale agreements, encroachments and registration — made clear and dispute-free.',
      heading: 'Clear, defect-free property transactions and disputes',
      p1: 'Property transactions involve significant money and legal risk. Our property specialists ensure titles are clean, agreements are enforceable and registration is smooth.',
      p2: 'From your first title search through to final registration, we help you spot risks early and handle any disputes that arise.',
      includes: [
        { icon: 'fa-solid fa-file-signature',   label: 'Title verification & due diligence' },
        { icon: 'fa-solid fa-house-chimney',     label: 'Sale & purchase agreements' },
        { icon: 'fa-solid fa-triangle-exclamation', label: 'Encroachment & boundary disputes' },
        { icon: 'fa-solid fa-stamp',             label: 'Registration & stamp duty' }
      ],
      process: [
        '<b>Title search</b> — a full review of the property\'s ownership history.',
        '<b>Document review</b> — sale agreement, encumbrance certificate and approvals.',
        '<b>Agreement drafting</b> — a protective, enforceable sale or lease agreement.',
        '<b>Registration</b> — guiding you through stamp duty and sub-registrar processes.',
        '<b>Dispute resolution</b> — mediation or court if disputes arise.'
      ],
      init: '<b>Free first consultation:</b> your first case-review consultation with a matched advocate is complimentary through JustiAid.',
      fees: [
        ['Consultation', 'Free'],
        ['Title search report', 'from $150'],
        ['Sale agreement', 'from $350'],
        ['Boundary dispute', 'from $700']
      ],
      notes: [
        '<i class="fa-solid fa-clock me-2"></i>2–8 weeks typical timeline',
        '<i class="fa-solid fa-file-shield me-2"></i>All documents confidential',
        '<i class="fa-solid fa-house-chimney me-2"></i>Residential & commercial'
      ],
      advocateArea: 'property',
      related: [
        { label: 'Family Law',      slug: 'family-law',      icon: 'fa-solid fa-scale-balanced' },
        { label: 'Criminal Defense', slug: 'criminal-defense', icon: 'fa-solid fa-shield-halved' },
        { label: 'Corporate Law',   slug: 'corporate-law',   icon: 'fa-solid fa-briefcase' }
      ]
    },
    'criminal-defense': {
      title: 'Criminal Defense',
      icon: '<i class="fa-solid fa-shield-halved"></i>',
      tagline: 'Bail, trial representation, FIR quashing and honest guidance when it matters most.',
      heading: 'Strong, honest representation when it matters most',
      p1: 'Facing a criminal charge is stressful and confusing. Our vetted criminal-defense advocates bring experience, clarity and calm — so you understand every step of the process.',
      p2: 'We handle bail applications, trial representation, FIR quashing and appeals — always prioritising your best legal outcome.',
      includes: [
        { icon: 'fa-solid fa-handcuffs',       label: 'Bail applications' },
        { icon: 'fa-solid fa-gavel',           label: 'Trial representation' },
        { icon: 'fa-solid fa-file-circle-xmark', label: 'FIR / charge quashing' },
        { icon: 'fa-solid fa-arrow-up-right-dots', label: 'Appeals & revisions' }
      ],
      process: [
        '<b>Case assessment</b> — review of the charge, FIR and evidence.',
        '<b>Bail application</b> — preparing and presenting your bail plea.',
        '<b>Charge sheet</b> — reviewing the chargesheet and identifying weaknesses.',
        '<b>Trial</b> — cross-examination, arguments and witness presentation.',
        '<b>Verdict & appeal</b> — post-verdict strategy and appeal if needed.'
      ],
      init: '<b>Urgent?</b> Bail matters often have strict timelines — call us immediately for fast response.',
      fees: [
        ['Consultation', 'Free'],
        ['Bail application', 'from $400'],
        ['Trial representation', 'from $1,500'],
        ['FIR quashing', 'from $600']
      ],
      notes: [
        '<i class="fa-solid fa-clock me-2"></i>Bail hearings within 24–48 hours',
        '<i class="fa-solid fa-file-shield me-2"></i>All communications privileged',
        '<i class="fa-solid fa-shield-halved me-2"></i>24/7 urgent matter support'
      ],
      advocateArea: 'criminal',
      related: [
        { label: 'Family Law',     slug: 'family-law',     icon: 'fa-solid fa-scale-balanced' },
        { label: 'Property Law',   slug: 'property-law',   icon: 'fa-solid fa-building-columns' },
        { label: 'Consumer Rights', slug: 'consumer-rights', icon: 'fa-solid fa-box-open' }
      ]
    },
    'corporate-law': {
      title: 'Corporate Law',
      icon: '<i class="fa-solid fa-briefcase"></i>',
      tagline: 'Incorporation, contracts, compliance and dispute resolution built for growing businesses.',
      heading: 'Legal infrastructure that helps your business grow',
      p1: 'Whether you\'re setting up a company or navigating a complex contract, our corporate-law specialists keep your business legally protected and running smoothly.',
      p2: 'We handle formation, shareholder agreements, regulatory compliance and commercial disputes — practical legal support that scales with your business.',
      includes: [
        { icon: 'fa-solid fa-building',          label: 'Company incorporation' },
        { icon: 'fa-solid fa-file-contract',      label: 'Contracts & agreements' },
        { icon: 'fa-solid fa-clipboard-check',    label: 'Regulatory compliance' },
        { icon: 'fa-solid fa-handshake-slash',    label: 'Commercial disputes' }
      ],
      process: [
        '<b>Needs review</b> — understanding your business model and legal exposure.',
        '<b>Formation / structuring</b> — setting up the right legal entity.',
        '<b>Contract drafting</b> — agreements that protect your interests.',
        '<b>Compliance</b> — ensuring ongoing regulatory obligations are met.',
        '<b>Dispute handling</b> — negotiation, arbitration or court as required.'
      ],
      init: '<b>Free first consultation:</b> your first case-review consultation with a matched advocate is complimentary through JustiAid.',
      fees: [
        ['Consultation', 'Free'],
        ['Incorporation package', 'from $500'],
        ['Contract review', 'from $200'],
        ['Compliance audit', 'from $400']
      ],
      notes: [
        '<i class="fa-solid fa-clock me-2"></i>Incorporation within 7–14 days',
        '<i class="fa-solid fa-file-shield me-2"></i>All documents confidential',
        '<i class="fa-solid fa-briefcase me-2"></i>Startups to established firms'
      ],
      advocateArea: 'corporate',
      related: [
        { label: 'Property Law',   slug: 'property-law',   icon: 'fa-solid fa-building-columns' },
        { label: 'Family Law',     slug: 'family-law',     icon: 'fa-solid fa-scale-balanced' },
        { label: 'Consumer Rights', slug: 'consumer-rights', icon: 'fa-solid fa-box-open' }
      ]
    },
    'consumer-rights': {
      title: 'Consumer Rights',
      icon: '<i class="fa-solid fa-box-open"></i>',
      tagline: 'Defective products, deficient services and unfair trade practices — draft your complaint with us.',
      heading: 'Stand up for what you paid for',
      p1: 'When a product fails or a service falls short, you have legal rights. Our consumer-rights specialists help you file effective complaints and recover what you\'re owed.',
      p2: 'We guide you through consumer complaint drafting, forum filing and dispute resolution — making the process straightforward and effective.',
      includes: [
        { icon: 'fa-solid fa-box-open',            label: 'Defective product complaints' },
        { icon: 'fa-solid fa-file-invoice',        label: 'Deficient services claims' },
        { icon: 'fa-solid fa-scale-unbalanced',    label: 'Consumer forum filing' },
        { icon: 'fa-solid fa-money-bill-wave',     label: 'Refund & compensation recovery' }
      ],
      process: [
        '<b>Complaint review</b> — assessing your evidence and legal position.',
        '<b>Notice to seller</b> — drafting a formal demand or complaint letter.',
        '<b>Consumer forum filing</b> — preparing and lodging the complaint.',
        '<b>Mediation</b> — attempting resolution before a hearing.',
        '<b>Hearing & order</b> — representing you at the consumer forum.'
      ],
      init: '<b>Free first consultation:</b> your first case-review consultation with a matched advocate is complimentary through JustiAid.',
      fees: [
        ['Consultation', 'Free'],
        ['Complaint drafting', 'from $100'],
        ['Consumer forum filing', 'from $300'],
        ['Hearing representation', 'from $500']
      ],
      notes: [
        '<i class="fa-solid fa-clock me-2"></i>3–9 months typical timeline',
        '<i class="fa-solid fa-receipt me-2"></i>Keep receipts as evidence',
        '<i class="fa-solid fa-money-bill-wave me-2"></i>No win, no fee options'
      ],
      advocateArea: 'corporate',
      related: [
        { label: 'Corporate Law',  slug: 'corporate-law',  icon: 'fa-solid fa-briefcase' },
        { label: 'Family Law',     slug: 'family-law',     icon: 'fa-solid fa-scale-balanced' },
        { label: 'Property Law',   slug: 'property-law',   icon: 'fa-solid fa-building-columns' }
      ]
    }
  };

  function render() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('service') || 'family-law';
    var s = services[slug] || services['family-law'];

    document.title = s.title + ' — Service Details | JustiAid';

    var $ = function (sel) { return document.querySelector(sel); };

    $('[data-sd-title]').textContent = s.title;
    $('[data-sd-tagline]').textContent = s.tagline;
    $('[data-sd-crumb]').textContent = s.title;
    $('[data-sd-heading]').textContent = s.heading;
    $('[data-sd-p1]').textContent = s.p1;
    $('[data-sd-p2]').textContent = s.p2;
    $('[data-sd-icon]').innerHTML = s.icon;
    $('[data-sd-init]').innerHTML = s.init;

    var incEl = $('[data-sd-includes]');
    incEl.innerHTML = s.includes.map(function (item) {
      return '<div class="col-sm-6"><div class="neu-flat p-3 h-100"><i class="' + item.icon + ' me-2" style="color:var(--accent)"></i>' + item.label + '</div></div>';
    }).join('');

    var procEl = $('[data-sd-process]');
    procEl.innerHTML = s.process.map(function (item) { return '<li class="mb-2">' + item + '</li>'; }).join('');

    var feeEl = $('[data-sd-fees]');
    feeEl.innerHTML = s.fees.map(function (f) {
      return '<li class="d-flex justify-content-between py-1 border-bottom" style="border-color:var(--bg-soft)!important"><span>' + f[0] + '</span><b>' + f[1] + '</b></li>';
    }).join('');

    var noteEl = $('[data-sd-notes]');
    noteEl.innerHTML = s.notes.map(function (n) { return '<li class="mb-1">' + n + '</li>'; }).join('');

    var advBtn = $('[data-sd-advocate]');
    advBtn.href = 'advocate-directory.html?area=' + s.advocateArea;

    var relEl = $('[data-sd-related]');
    relEl.innerHTML = s.related.map(function (r) {
      return '<li class="mb-2"><a href="service-details.html?service=' + r.slug + '"><i class="' + r.icon + ' me-2"></i>' + r.label + ' <i class="fa-solid fa-arrow-right"></i></a></li>';
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
