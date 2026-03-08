/* ===============================================================
   UFUQ — Enhanced Script with Animations & Interactions
   =============================================================== */

/* ===================== PAGE LOADER ===================== */
(function () {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-logo">UFUQ</div>
        <div class="loader-bar" style="width:0"></div>
    `;
    document.body.prepend(loader);

    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.prepend(progress);

    ['orb-1','orb-2','orb-3'].forEach(cls => {
        const orb = document.createElement('div');
        orb.className = `orb ${cls}`;
        document.body.appendChild(orb);
    });

    const bar = loader.querySelector('.loader-bar');
    let width = 0;
    const grow = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 100) { width = 100; clearInterval(grow); }
        bar.style.width = width + '%';
    }, 80);

    window.addEventListener('load', () => {
        clearInterval(grow);
        bar.style.width = '100%';
        setTimeout(() => loader.classList.add('hidden'), 400);
    });
})();

/* ===================== SCROLL PROGRESS ===================== */
window.addEventListener('scroll', () => {
    const el = document.getElementById('scroll-progress');
    if (!el) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = (scrollTop / docHeight * 100) + '%';
});

/* ===================== HEADER SCROLL EFFECT ===================== */
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });
}

/* ===================== THEME TOGGLE ===================== */
const themeToggle = document.getElementById('themeToggle');
const menuBtn     = document.getElementById('menuBtn');
const nav         = document.getElementById('nav');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
} else {
    document.body.classList.remove('light-mode');
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.onclick = () => {
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
        location.reload();
    };
}

/* ===================== MOBILE MENU ===================== */
if (menuBtn) {
    menuBtn.onclick = () => {
        nav.classList.toggle('active');
        menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    };
    document.querySelectorAll('#nav a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });
}

/* ===================== HERO PARTICLES ===================== */
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    hero.appendChild(particleContainer);

    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-mouse"></div>
        <span>Scroll</span>
    `;
    hero.appendChild(scrollIndicator);

    const h1 = hero.querySelector('h1');
    if (h1) {
        h1.innerHTML = h1.innerHTML
            .replace('Smart Digital Marketing', '<span class="highlight">Smart Digital Marketing</span>');
    }

    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'hero-particle';
        const size = Math.random() * 4 + 1;
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${Math.random() * 8 + 8}s;
            animation-delay: ${Math.random() * 8}s;
        `;
        particleContainer.appendChild(p);
    }
})();

/* ===================== SCROLL REVEAL ===================== */
(function () {
    const revealMap = [
        { selector: '.about-card',        cls: 'reveal',       delay: [0, 100, 200, 300] },
        { selector: '.service-card',      cls: 'reveal',       delay: [0, 100, 200, 300, 400, 500] },
        { selector: '.review-card',       cls: 'reveal',       delay: [0, 150, 300] },
        { selector: '.stat-box',          cls: 'reveal-scale', delay: [0, 100, 200] },
        { selector: '.portfolio-card',    cls: 'reveal',       delay: [0, 120, 240] },
        { selector: '.contact-info-card', cls: 'reveal-left',  delay: [0, 100, 200] },
        { selector: '.social-card',       cls: 'reveal-left',  delay: [300] },
        { selector: '.contact-form-card', cls: 'reveal-right', delay: [0] },
        { selector: '.form-card',         cls: 'reveal',       delay: [0, 100, 200, 300] },
        { selector: '.brief-card',        cls: 'reveal-scale', delay: [0, 150, 300] },
        { selector: '.about-title, .services-title, .portfolio-title, .reviews-title, .contact-title, .registration-title', cls: 'reveal', delay: [0] },
    ];

    revealMap.forEach(({ selector, cls, delay }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') &&
                !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
                el.classList.add(cls);
                el.style.transitionDelay = (delay[i % delay.length] || 0) + 'ms';
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
})();

/* ===================== ANIMATED COUNTER ===================== */
(function () {
    function animateCounter(el, target, suffix = '') {
        const duration = 2000;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = isDecimal
                ? (eased * target).toFixed(1)
                : Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target + suffix;
        }

        requestAnimationFrame(update);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const text = entry.target.textContent.trim();
                const match = text.match(/^([\d.]+)(.*)$/);
                if (match) {
                    const value = parseFloat(match[1]);
                    const suffix = match[2];
                    animateCounter(entry.target, value, suffix);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-box h2').forEach(el => {
        statObserver.observe(el);
    });
})();

/* ===================== RIPPLE EFFECT ON BUTTONS ===================== */
(function () {
    function addRipple(el) {
        const container = document.createElement('div');
        container.className = 'ripple-container';
        el.style.position = 'relative';
        el.appendChild(container);

        el.addEventListener('click', (e) => {
            const rect = el.getBoundingClientRect();
            const wave = document.createElement('div');
            wave.className = 'ripple-wave';
            wave.style.left = (e.clientX - rect.left) + 'px';
            wave.style.top  = (e.clientY - rect.top) + 'px';
            container.appendChild(wave);
            setTimeout(() => wave.remove(), 700);
        });
    }

    document.querySelectorAll('.btn, .submit-btn, .select-brief-btn, .social-btn').forEach(addRipple);
})();

/* ===================== MOUSE GLOW ON CARDS ===================== */
(function () {
    document.querySelectorAll('.about-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100) + '%';
            const y = ((e.clientY - rect.top) / rect.height * 100) + '%';
            card.style.setProperty('--mouse-x', x);
            card.style.setProperty('--mouse-y', y);
        });
    });
})();

/* ===================== BRIEF SELECTION ===================== */
var selectedBrief = '';

function selectBrief(briefType) {
    selectedBrief = briefType;

    document.querySelectorAll('.brief-card').forEach(function(card) {
        card.style.borderColor = '';
        card.style.boxShadow = '';
    });

    var selectedCard = document.querySelector('.brief-card[data-brief="' + briefType + '"]');
    if (selectedCard) {
        selectedCard.style.borderColor = '#4fd1c5';
        selectedCard.style.boxShadow = '0 0 30px rgba(79,209,197,0.35)';
    }

    var lang = localStorage.getItem('lang') || 'en';
    var briefLabels = {
        'Ads Brief':      { en: 'Ads Brief',      ar: 'موجز الإعلانات' },
        'Business Brief': { en: 'Business Brief', ar: 'الموجز التجاري' }
    };
    var label = (briefLabels[briefType] && briefLabels[briefType][lang]) || briefType;

    var adsForm = document.getElementById('adsBriefForm');
    var bizForm = document.getElementById('businessBriefForm');

    if (adsForm) {
        adsForm.classList.add('brief-detail-form-hidden');
        adsForm.classList.remove('brief-detail-form-visible');
    }
    if (bizForm) {
        bizForm.classList.add('brief-detail-form-hidden');
        bizForm.classList.remove('brief-detail-form-visible');
    }

    var targetForm = (briefType === 'Ads Brief') ? adsForm : bizForm;
    var badgeId    = (briefType === 'Ads Brief') ? 'adsBriefFormBadge' : 'bizBriefFormBadge';

    var badge = document.getElementById(badgeId);
    if (badge) badge.textContent = label;

    if (targetForm) {
        targetForm.classList.remove('brief-detail-form-hidden');
        targetForm.classList.add('brief-detail-form-visible');
        setTimeout(function() {
            targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }
}

/* ===================== COLOR PALETTE PICKER ===================== */

var selectedPaletteColors = [];

function togglePaletteColor(swatchEl) {
    var hex = swatchEl.getAttribute('data-hex').toUpperCase();

    if (swatchEl.classList.contains('selected')) {
        swatchEl.classList.remove('selected');
        selectedPaletteColors = selectedPaletteColors.filter(function(c) { return c !== hex; });
    } else {
        swatchEl.classList.add('selected');
        if (selectedPaletteColors.indexOf(hex) === -1) {
            selectedPaletteColors.push(hex);
        }
    }

    syncPaletteHiddenInput();
    renderSelectedChips();
}

function addCustomPaletteColor() {
    var input = document.getElementById('customColorInput');
    if (!input) return;
    var hex = input.value.toUpperCase();

    if (selectedPaletteColors.indexOf(hex) === -1) {
        selectedPaletteColors.push(hex);

        var existingSwatch = document.querySelector('.palette-swatch[data-hex="' + hex.toLowerCase() + '"], .palette-swatch[data-hex="' + hex + '"]');
        if (existingSwatch) {
            existingSwatch.classList.add('selected');
        }
    }

    syncPaletteHiddenInput();
    renderSelectedChips();
}

function removePaletteColor(hex) {
    hex = hex.toUpperCase();
    selectedPaletteColors = selectedPaletteColors.filter(function(c) { return c !== hex; });

    var swatch = document.querySelector('.palette-swatch[data-hex="' + hex.toLowerCase() + '"], .palette-swatch[data-hex="' + hex + '"]');
    if (swatch) swatch.classList.remove('selected');

    syncPaletteHiddenInput();
    renderSelectedChips();
}

function syncPaletteHiddenInput() {
    var hiddenInput = document.getElementById('bf-colors');
    if (hiddenInput) {
        hiddenInput.value = selectedPaletteColors.join(', ');
    }
}

function renderSelectedChips() {
    var container = document.getElementById('paletteSelectedChips');
    var noneMsg   = document.getElementById('paletteNoneMsg');
    if (!container) return;

    Array.from(container.children).forEach(function(child) {
        if (child.id !== 'paletteNoneMsg') child.remove();
    });

    if (selectedPaletteColors.length === 0) {
        if (noneMsg) noneMsg.style.display = 'inline';
        return;
    }

    if (noneMsg) noneMsg.style.display = 'none';

    selectedPaletteColors.forEach(function(hex) {
        var chip = document.createElement('div');
        chip.className = 'palette-chip';
        chip.innerHTML =
            '<span class="palette-chip-dot" style="background:' + hex + ';' +
                (isLightColor(hex) ? 'border:1px solid #ccc;' : '') +
            '"></span>' +
            '<span class="palette-chip-code">' + hex + '</span>' +
            '<button type="button" class="palette-chip-remove" onclick="removePaletteColor(\'' + hex + '\')" title="Remove">✕</button>';
        container.appendChild(chip);
    });
}

function isLightColor(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
    var r = parseInt(hex.substr(0,2),16);
    var g = parseInt(hex.substr(2,2),16);
    var b = parseInt(hex.substr(4,2),16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

/* =====================================================================
   FORM VALIDATION
   ===================================================================== */

function getFieldError(fieldId, value) {
    var isAr = (document.body.getAttribute('dir') === 'rtl' || localStorage.getItem('lang') === 'ar');

    var msgs = {
        fullName: {
            empty: isAr ? 'الاسم الكامل مطلوب' : 'Full name is required'
        },
        nationalId: {
            empty:   isAr ? 'الرقم القومي مطلوب' : 'National ID is required',
            digits:  isAr ? 'الرقم القومي يجب أن يكون 14 رقماً بالضبط' : 'National ID must be exactly 14 digits',
            letters: isAr ? 'الرقم القومي يجب أن يحتوي على أرقام فقط' : 'National ID must contain numbers only'
        },
        contactNumber: {
            empty:   isAr ? 'رقم الاتصال مطلوب' : 'Contact number is required',
            digits:  isAr ? 'رقم الاتصال يجب أن يكون 11 رقماً بالضبط' : 'Contact number must be exactly 11 digits',
            letters: isAr ? 'رقم الاتصال يجب أن يحتوي على أرقام فقط' : 'Contact number must contain numbers only'
        },
        whatsappNumber: {
            empty:   isAr ? 'رقم واتساب مطلوب' : 'WhatsApp number is required',
            digits:  isAr ? 'رقم واتساب يجب أن يكون 11 رقماً بالضبط' : 'WhatsApp number must be exactly 11 digits',
            letters: isAr ? 'رقم واتساب يجب أن يحتوي على أرقام فقط' : 'WhatsApp number must contain numbers only'
        },
        businessName: {
            empty: isAr ? 'اسم العلامة / الأعمال مطلوب' : 'Brand/Business name is required'
        },
        industryType: {
            empty: isAr ? 'نوع الصناعة مطلوب' : 'Industry type is required'
        },
        socialLink: {
            empty: isAr ? 'رابط صفحة التواصل مطلوب' : 'Social media link is required'
        }
    };

    var m = msgs[fieldId];
    if (!m) return null;

    if (!value) return m.empty;

    if (fieldId === 'nationalId' || fieldId === 'contactNumber' || fieldId === 'whatsappNumber') {
        var digitsOnly = value.replace(/\s/g, '');
        if (!/^\d+$/.test(digitsOnly)) return m.letters;
        var requiredLen = (fieldId === 'nationalId') ? 14 : 11;
        if (digitsOnly.length !== requiredLen) return m.digits;
    }

    return null;
}

function showFieldError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById('err-' + fieldId);

    if (input) {
        input.classList.add('input-error');
        input.style.animation = 'none';
        input.offsetHeight;
        input.style.animation = '';

        var clearFn = function() {
            clearFieldError(fieldId);
            input.removeEventListener('input', clearFn);
        };
        input.addEventListener('input', clearFn);
    }

    if (errEl) {
        errEl.textContent = message;
        errEl.classList.add('show');
    }
}

function clearFieldError(fieldId) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById('err-' + fieldId);

    if (input) input.classList.remove('input-error');
    if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('show');
    }
}

function validateRegistrationForm() {
    var fields = ['fullName', 'nationalId', 'contactNumber', 'whatsappNumber', 'businessName', 'industryType', 'socialLink'];

    var firstErrorEl = null;
    var hasError = false;

    fields.forEach(function(fieldId) {
        clearFieldError(fieldId);
    });

    fields.forEach(function(fieldId) {
        var input = document.getElementById(fieldId);
        if (!input) return;

        var value = input.value.trim();
        var errorMsg = getFieldError(fieldId, value);

        if (errorMsg) {
            showFieldError(fieldId, errorMsg);
            hasError = true;
            if (!firstErrorEl) {
                firstErrorEl = input;
            }
        }
    });

    if (firstErrorEl) {
        setTimeout(function() {
            var offset = 100;
            var top = firstErrorEl.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
            setTimeout(function() { firstErrorEl.focus(); }, 400);
        }, 50);
    }

    return !hasError;
}

/* ===================== BRIEF FIELD VALIDATION ===================== */

var ADS_BRIEF_FIELDS = ['ads-objective','ads-offer','ads-audience','ads-budget','ads-assets','ads-history'];

var BIZ_BRIEF_FIELDS = [
    'bf-specialty','bf-address',
    'bf-hours','bf-holidays','bf-delivery',
    'bf-logoStyle','bf-socialPresence','bf-prevAgency',
    'bf-objectives','bf-competitors','bf-channels','bf-audience',
    'bf-package','bf-payment','bf-duration'
];

function showBriefError(fieldId, message) {
    var el = document.getElementById(fieldId);
    var errSpan = document.getElementById('berr-' + fieldId);
    if (!el || !errSpan) return;
    el.classList.add('input-error');
    errSpan.textContent = message;
    errSpan.classList.add('show');
    var clearFn = function() {
        el.classList.remove('input-error');
        errSpan.textContent = '';
        errSpan.classList.remove('show');
        el.removeEventListener('input', clearFn);
        el.removeEventListener('change', clearFn);
    };
    el.addEventListener('input', clearFn);
    el.addEventListener('change', clearFn);
}

function clearBriefError(fieldId) {
    var el = document.getElementById(fieldId);
    var errSpan = document.getElementById('berr-' + fieldId);
    if (el) el.classList.remove('input-error');
    if (errSpan) { errSpan.textContent = ''; errSpan.classList.remove('show'); }
}

function getBriefFieldLabel(fieldId) {
    var isAr = (document.body.getAttribute('dir') === 'rtl' || localStorage.getItem('lang') === 'ar');
    var lang = isAr ? 'ar' : 'en';
    var labels = {
        en: {
            'ads-objective': 'Campaign Objective',
            'ads-offer':     'Offer & Product Details',
            'ads-audience':  'Target Audience',
            'ads-budget':    'Budget & Timeline',
            'ads-assets':    'Ad Assets & Access',
            'ads-history':   'Historical Campaign Data',
            'bf-specialty':  'Core Specialty',
            'bf-address':    'Physical Address / Location',
            'bf-hours':      'Official Working Hours',
            'bf-holidays':   'Holidays / Days Off',
            'bf-delivery':   'Delivery System & Policies',
            'bf-logoStyle':  'Preferred Logo Style',
            'bf-socialPresence': 'Current Social Media Presence',
            'bf-prevAgency': 'Previous Marketing Agency Experience',
            'bf-objectives': 'Primary Marketing Objectives',
            'bf-competitors':'Main Competitors',
            'bf-channels':   'Preferred Marketing Channels',
            'bf-audience':   'Target Audience / Buyer Persona',
            'bf-package':    'Selected Service Package',
            'bf-payment':    'Payment Method & Terms',
            'bf-duration':   'Contract Duration'
        },
        ar: {
            'ads-objective': 'هدف الحملة',
            'ads-offer':     'تفاصيل العرض والمنتج',
            'ads-audience':  'الجمهور المستهدف',
            'ads-budget':    'الميزانية والجدول الزمني',
            'ads-assets':    'مواد الإعلان والوصول',
            'ads-history':   'بيانات الحملات السابقة',
            'bf-specialty':  'التخصص الأساسي',
            'bf-address':    'العنوان / الموقع',
            'bf-hours':      'ساعات العمل الرسمية',
            'bf-holidays':   'أيام الإجازات',
            'bf-delivery':   'نظام التوصيل والسياسات',
            'bf-logoStyle':  'أسلوب الشعار المفضل',
            'bf-socialPresence': 'التواجد الحالي على وسائل التواصل',
            'bf-prevAgency': 'تجربة وكالة التسويق السابقة',
            'bf-objectives': 'الأهداف التسويقية الرئيسية',
            'bf-competitors':'المنافسون الرئيسيون',
            'bf-channels':   'قنوات التسويق المفضلة',
            'bf-audience':   'الجمهور المستهدف',
            'bf-package':    'الباقة المختارة',
            'bf-payment':    'طريقة الدفع والشروط',
            'bf-duration':   'مدة العقد'
        }
    };
    var map = labels[lang] || labels['en'];
    return map[fieldId] || fieldId;
}

function validateBriefForm() {
    if (!selectedBrief) return true;
    var isAr = (document.body.getAttribute('dir') === 'rtl' || localStorage.getItem('lang') === 'ar');
    var lang = isAr ? 'ar' : 'en';
    var fields = (selectedBrief === 'Ads Brief') ? ADS_BRIEF_FIELDS : BIZ_BRIEF_FIELDS;

    fields.forEach(function(id) { clearBriefError(id); });

    var firstErrorEl = null;
    var hasError = false;

    fields.forEach(function(fieldId) {
        var el = document.getElementById(fieldId);
        if (!el) return;
        var val = el.value.trim();
        if (!val) {
            var label = getBriefFieldLabel(fieldId);
            var msg = (lang === 'ar')
                ? (label + ' مطلوب')
                : (label + ' is required');
            showBriefError(fieldId, msg);
            hasError = true;
            if (!firstErrorEl) firstErrorEl = el;
        }
    });

    if (firstErrorEl) {
        setTimeout(function() {
            var top = firstErrorEl.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: top, behavior: 'smooth' });
            setTimeout(function() { firstErrorEl.focus(); }, 400);
        }, 50);
    }

    return !hasError;
}

/* ===================== SEND TO WHATSAPP (Registration) ===================== */
function sendToWhatsApp() {

    if (!validateRegistrationForm()) {
        return;
    }

    if (!validateBriefForm()) {
        return;
    }

    const fullName       = (document.getElementById('fullName')?.value       || '').trim();
    const nationalId     = (document.getElementById('nationalId')?.value      || '').trim();
    const contactNumber  = (document.getElementById('contactNumber')?.value   || '').trim();
    const whatsappNumber = (document.getElementById('whatsappNumber')?.value  || '').trim();
    const businessName   = (document.getElementById('businessName')?.value    || '').trim();
    const industryType   = (document.getElementById('industryType')?.value    || '').trim();
    const socialLink     = (document.getElementById('socialLink')?.value      || '').trim();
    const platform       = (document.getElementById('platform')?.value        || '');
    const otherDetails   = (document.getElementById('otherDetails')?.value    || '').trim();

    const services = [];
    document.querySelectorAll('.services-column input:checked').forEach(el => {
        services.push(el.parentElement.innerText.trim());
    });

    const packageVal = document.getElementById('packageSelect')?.value || 'Not selected';
    const briefText  = selectedBrief || 'No brief selected';

    function g(id) { return (document.getElementById(id)?.value || '').trim() || '—'; }

    var colorsValue = document.getElementById('bf-colors')?.value || '';
    var colorsDisplay = '—';
    if (selectedPaletteColors.length > 0) {
        colorsDisplay = selectedPaletteColors.join(', ');
    } else if (colorsValue) {
        colorsDisplay = colorsValue;
    }

    let briefFormSection = '';

    if (selectedBrief === 'Ads Brief') {
        briefFormSection =
`
   Ads Brief — Details

1. CAMPAIGN OBJECTIVE
${g('ads-objective')}

2. OFFER & PRODUCT DETAILS
${g('ads-offer')}

3. TARGET AUDIENCE
${g('ads-audience')}

4. BUDGET & TIMELINE
${g('ads-budget')}

5. AD ASSETS & ACCESS
${g('ads-assets')}

6. HISTORICAL CAMPAIGN DATA
${g('ads-history')}`;

    } else if (selectedBrief === 'Business Brief') {
        briefFormSection =
`
========================
   Business Brief — Details
========================

1. BUSINESS INFORMATION
   Core Specialty          : ${g('bf-specialty')}
   Physical Address        : ${g('bf-address')}
   Additional Details      : ${g('bf-bizDetails')}

2. CONTACT & OPERATIONS
   Working Hours           : ${g('bf-hours')}
   Holidays / Days Off     : ${g('bf-holidays')}
   Delivery System         : ${g('bf-delivery')}

3. BRANDING & CURRENT STATUS
   Logo Style              : ${g('bf-logoStyle')}
   Brand Colors (HEX)      : ${colorsDisplay}
   Social Media Presence   : ${g('bf-socialPresence')}
   Previous Agency         : ${g('bf-prevAgency')}
   Branding Notes          : ${g('bf-brandingNotes')}

4. MARKETING STRATEGY
   Objectives              : ${g('bf-objectives')}
   Competitors             : ${g('bf-competitors')}
   Preferred Channels      : ${g('bf-channels')}
   Target Audience         : ${g('bf-audience')}

5. CONTRACT & BILLING
   Package                 : ${g('bf-package')}
   Payment Method & Terms  : ${g('bf-payment')}
   Contract Duration       : ${g('bf-duration')}`;
    }

    const message =
`========================
    Client Registration
========================

Name           : ${fullName}
National ID    : ${nationalId}
Contact        : ${contactNumber}
WhatsApp       : ${whatsappNumber}

Business Name  : ${businessName}
Industry Type  : ${industryType}
Social Link    : ${socialLink}
Platform       : ${platform}
Package        : ${packageVal}

Selected Services:
${services.length ? services.map(s => '- ' + s).join('\n') : '- None selected'}
========================
Brief Request Registration
========================

Brief Selected : ${briefText}${briefFormSection}

Additional Details:
${otherDetails || 'None'}

========================`;

    window.open('https://wa.me/201037175720?text=' + encodeURIComponent(message), '_blank');
}

/* ===================== SEND CONTACT TO WHATSAPP ===================== */
function sendContactToWhatsApp() {
    const name    = (document.getElementById('contactName')?.value.trim()    || '');
    const email   = (document.getElementById('contactEmail')?.value.trim()   || '');
    const subject = (document.getElementById('contactSubject')?.value        || 'General Inquiry');
    const message = (document.getElementById('contactMessage')?.value.trim() || '');

    if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
    }

    const text = `========================\n    New Contact Message\n========================\n\nName    : ${name}\nEmail   : ${email}\nSubject : ${subject}\n\nMessage:\n${message}\n\n========================`;

    const successMsg = document.getElementById('successMsg');
    if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.style.animation = 'fadeInUp 0.4s ease both';
    }

    setTimeout(() => {
        window.open('https://wa.me/201037175720?text=' + encodeURIComponent(text), '_blank');
    }, 500);
}

/* ===================== STAGGER ANIMATION INIT ===================== */
window.addEventListener('load', () => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
            el.classList.add('visible');
        }
    });
});

/* ===================== FOOTER REVEAL ===================== */
(function() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { footer.classList.add('footer-visible'); obs.disconnect(); } });
    }, { threshold: 0.1 });
    obs.observe(footer);
})();

/* ===================== LANGUAGE TOGGLE (AR/EN) ===================== */
(function () {

    const translations = {
        en: {
            /* NAV */
            'nav-home':        'Home',
            'nav-about':       'About',
            'nav-services':    'Services',
            'nav-portfolio':   'Portfolio',
            'nav-reviews':     'Reviews',
            'nav-contact':     'Contact',

            /* INDEX */
            'hero-title':      'Empowering Brands Through<br>Smart Digital Marketing',
            'hero-subtitle':   'Your partner in growth, creativity, and digital visibility.',
            'hero-btn':        'Start Your Journey Today →',

            /* ABOUT */
            'about-page-title':   'About UFUQ',
            'about-card1-title':  'Who We Are',
            'about-card1-text':   'UFUQ is more than just a digital marketing service – it\'s a vision. Founded by a team of experts who believe in the power of strategy and the art of storytelling.',
            'about-card2-title':  'What We Do',
            'about-card2-text':   'We craft bold, effective digital marketing campaigns for businesses ready to grow — not just in numbers, but in real connection.',
            'about-card3-title':  'Why We Exist',
            'about-card3-text':   'In a noisy world, attention is currency. We help turn attention into meaningful action and long-term presence.',
            'about-card4-title':  'Our Values',
            'about-val1':         'Transparency: You see what we see.',
            'about-val2':         'Creativity: We invent.',
            'about-val3':         'Precision: Every detail counts.',
            'about-val4':         'Partnership: You\'re a collaborator.',

            /* SERVICES */
            'services-title':  'Our Services',
            'svc1-title':      'Social Media Management',
            'svc1-text':       'Full-suite social media management, focusing on proactive community building, prompt messaging, and strategic comment moderation to convert followers into loyal customers.',
            'svc2-title':      'Brand Visual Identity',
            'svc2-text':       'Crafting memorable brand identities, from innovative logo design to cohesive social media covers, ensuring a striking and consistent digital presence.',
            'svc3-title':      'Graphic Design',
            'svc3-text':       'Scroll-stopping, high-converting graphic designs tailored specifically to capture your target audience\'s attention and maximize engagement.',
            'svc4-title':      'Videography, Video Editing & Montage',
            'svc4-text':       'End-to-end video production, from professional videography to dynamic editing (Montage), creating compelling visual stories that drive conversions.',
            'svc5-title':      'Marketing Strategy & Planning',
            'svc5-text':       'A comprehensive content architecture encompassing strategic planning, creative storytelling, tailored content creation, and data-driven scheduling.',
            'svc6-title':      'Content Strategy & Creation',
            'svc6-text':       'Professional personal branding solutions for entrepreneurs and leaders.',
            'svc7-title':      'Media Buying & Paid Ads',
            'svc7-text':       'Precision-targeted paid advertising campaigns designed to optimize ad spend, acquire high-quality leads, and maximize your Return on Investment (ROI).',
            'svc8-title':      'Performance Analytics & Monthly Reports',
            'svc8-text':       'Deep-dive performance analytics and transparent monthly reporting to track KPIs, extract actionable insights, and scale what works.',
            'svc9-title':      'Competitors Analysis',
            'svc9-text':       'Professional personal branding solutions for entrepreneurs and leaders.',

            /* PORTFOLIO */
            'portfolio-title': 'Our Portfolio',
            'port1-title':     'Social Media Campaign',
            'port1-text':      'Complete social media strategy that increased engagement by 120%.',
            'port2-title':     'Brand Identity Design',
            'port2-text':      'Full brand identity including logo, colors, and marketing assets.',
            'port3-title':     'Ad Campaign Strategy',
            'port3-text':      'High-converting paid ads campaign with strong ROI results.',

            /* REVIEWS */
            'reviews-title':   'What Our Clients Say',
            'stat1-num':       '50+',
            'stat1-label':     'Happy Clients',
            'stat2-num':       '4.9',
            'stat2-label':     'Average Rating',
            'stat3-num':       '100+',
            'stat3-label':     'Completed Projects',
            'rev1-text':       '"UFUQ transformed our social media presence completely. Our engagement increased by 300% in just 3 months!"',
            'rev1-name':       'Ahmed Hassan',
            'rev1-role':       'Tech Startup',
            'rev2-text':       '"Professional service, creative content, and amazing results. Highly recommend for any business looking to grow online."',
            'rev2-name':       'Sarah Mohamed',
            'rev2-role':       'Fashion Brand',
            'rev3-text':       '"The ad campaigns created by UFUQ brought us 50+ new customers every week. ROI was incredible!"',
            'rev3-name':       'Omar Ali',
            'rev3-role':       'Restaurant Chain',

            /* CONTACT */
            'contact-title':        'Get In Touch',
            'contact-subtitle':     'Have a project in mind? We\'d love to hear from you. Send us a message and we\'ll respond within 24 hours.',
            'contact-wa-title':     'WhatsApp',
            'contact-email-title':  'Email',
            'contact-resp-title':   'Response Time',
            'contact-resp-val':     'Within 24 hours',
            'contact-social-title': 'Follow Us',
            'form-card-title':      'Send a Message',
            'form-card-desc':       'Fill out the form below and we\'ll get back to you as soon as possible.',
            'form-name-label':      'Full Name',
            'form-name-ph':         'Your full name',
            'form-email-label':     'Email',
            'form-email-ph':        'your@email.com',
            'form-subject-label':   'Subject',
            'form-subject-default': 'Select a subject',
            'form-message-label':   'Message',
            'form-message-ph':      'Tell us about your project, goals, or any questions you have...',
            'contact-submit-btn':   'Send via WhatsApp',

            /* REGISTRATION */
            'reg-title':        'Client Registration',
            'personal-info':    'Personal Information',
            'business-info':    'Business Information',
            'service-sel':      'Service Selection',
            'services-subtitle':'Services Needed',
            'package-sel':      'Package Selection',
            'other-req':        'Other Requirements',
            'brief-section-title': 'Select Your Brief',
            'brief-subtitle':   'Choose the type of brief you need — a form will appear for you to fill',
            'brief-ads-title':  'Ads Brief',
            'brief-ads-text':   'Performance marketing & paid advertising campaigns',
            'brief-biz-title':  'Business Brief',
            'brief-biz-text':   'Full business overview & marketing strategy details',
            'select-brief-btn': 'Select Brief',
            'brief-form-subtitle': 'Please fill in all sections below — this will be included in your submission',

            /* ADS BRIEF */
            'ads-sec1':         'Campaign Objective',
            'ads-sec2':         'Offer & Product Details',
            'ads-sec3':         'Target Audience',
            'ads-sec4':         'Budget & Timeline',
            'ads-sec5':         'Ad Assets & Access',
            'ads-sec6':         'Historical Campaign Data',
            'ads-ph-objective': 'What is the goal of this campaign? e.g. generate leads, increase sales, grow awareness...',
            'ads-ph-offer':     'What product or service are you advertising? Include pricing, offers, or any promotions...',
            'ads-ph-audience':  'Describe your ideal customer — age, gender, location, interests, behaviors...',
            'ads-ph-budget':    'What is your total or monthly budget? When should the campaign start and how long should it run?',
            'ads-ph-assets':    'Do you have images, videos, or copy ready? Do you have an existing ad account? Share any links or access details...',
            'ads-ph-history':   'Have you run ads before? What platforms, budget, and results? What worked and what didn\'t?',

            /* BUSINESS BRIEF */
            'brief-sec1':       'Business Information',
            'brief-f-brand':    'Brand / Company Name',
            'brief-f-industry': 'Business Industry / Type',
            'brief-f-specialty':'Core Specialty',
            'brief-f-address':  'Physical Address / Location',
            'brief-f-bizdet':   'Additional Business Details',
            'brief-sec2':       'Contact & Operations',
            'brief-f-phone':    'Contact Phone Numbers',
            'brief-f-wa':       'WhatsApp Number',
            'brief-f-hours':    'Official Working Hours',
            'brief-f-holidays': 'Holidays / Days Off',
            'brief-f-delivery': 'Delivery System & Policies',
            'brief-sec3':       'Branding & Current Status',
            'brief-f-logo':     'Preferred Logo Style',
            'brief-f-colors':   'Brand Colors / Visual Identity',
            'brief-f-social':   'Current Social Media Presence',
            'brief-f-agency':   'Previous Marketing Agency Experience',
            'brief-f-branding-notes': '📝 Additional Branding Notes',
            'brief-sec4':       'Marketing Strategy',
            'brief-f-obj':      'Primary Marketing Objectives',
            'brief-f-comp':     'Main Competitors',
            'brief-f-channels': 'Preferred Marketing Channels',
            'brief-f-audience': 'Target Audience / Buyer Persona',
            'brief-sec5':       'Contract & Billing',
            'brief-f-package':  'Selected Service Package',
            'brief-f-payment':  'Payment Method & Terms',
            'brief-f-duration': 'Contract Duration',
            'brief-ph-brand':    'e.g. UFUQ Agency',
            'brief-ph-industry': 'e.g. Fashion, F&B, Tech...',
            'brief-ph-specialty':'What do you specialize in?',
            'brief-ph-address':  'City, Country or full address',
            'brief-ph-bizdet':   'Any other relevant business info...',
            'brief-ph-phone':    '+20 1XX XXX XXXX',
            'brief-ph-wa':       '+20 1XX XXX XXXX',
            'brief-ph-hours':    'e.g. Sat–Thu, 9am–6pm',
            'brief-ph-holidays': 'e.g. Fridays, Public holidays',
            'brief-ph-delivery': 'Describe your delivery system or policies...',
            'brief-ph-logo':     'e.g. Minimalist, Bold, Vintage...',
            'brief-ph-social':   'Links or starting from scratch',
            'brief-ph-agency':   'Agency names or none',
            'brief-ph-branding-notes': 'Any extra notes about your brand colors, style preferences, or visual identity details...',
            'brief-ph-obj':      'e.g. Increase brand awareness, generate leads...',
            'brief-ph-comp':     'List your top competitors',
            'brief-ph-channels': 'e.g. Instagram, Google Ads, TikTok...',
            'brief-ph-audience': 'Age, gender, interests, location, behavior...',
            'brief-ph-payment':  'e.g. Monthly, Bank transfer, Cash...',
            'brief-ph-duration': 'e.g. 3 months, 6 months, Ongoing...',

            /* COLOR PALETTE */
            'palette-custom-label':   'Custom Color:',
            'palette-add-btn':        '+ Add',
            'palette-selected-label': 'Selected Colors:',
            'palette-none-msg':       'None selected',

            'submit-reg-btn':   'Submit Registration',
            'fn-ph':            'Full Name',
            'ni-ph':            'National ID',
            'cn-ph':            'Contact Number',
            'wn-ph':            'WhatsApp Number',
            'bn-ph':            'Brand/Business Name',
            'it-ph':            'Industry Type',
            'sl-ph':            'Social Media Page Link',
            'od-ph':            'Additional details...',
            'svc-chk1':         'Social Media Marketing',
            'svc-chk2':         'Content Creation',
            'svc-chk3':         'Strategic Planning & Analytics',
            'svc-chk4':         'Ad Campaign Creation',
            'svc-chk5':         'Brand Identity Design',
            'svc-chk6':         'Personal Branding',
            'pkg-select-ph':    'Select Package',
            'pkg-launch':       'Launch',
            'pkg-expansion':    'Expansion',
            'pkg-dominance':    'Dominance',
            'pkg-loyalty':      'Loyalty',

            /* FOOTER */
            'footer-brand-text':  'More than a digital marketing service — it\'s a vision. We craft bold, effective campaigns that turn attention into meaningful growth.',
            'footer-links-title': 'Quick Links',
            'footer-svc-title':   'Services',
            'footer-ct-title':    'Contact',
            'footer-response':    'Response within 24 hours',
            'footer-worldwide':   'Available Worldwide',
            'footer-copyright':   '© 2025 UFUQ. All rights reserved. Built with ❤️ and strategy.',
            'footer-privacy':     'Privacy Policy',
            'footer-terms':       'Terms of Service',
            'footer-touch':       'Get In Touch',
            'footer-svc-smm':     'Social Media Marketing',
            'footer-svc-acc':     'Ad Campaign Creation',
            'footer-svc-cc':      'Content Creation',
            'footer-svc-bid':     'Brand Identity Design',
            'footer-svc-sp':      'Strategic Planning',
            'footer-svc-pb':      'Personal Branding',
        },

        ar: {
            /* NAV */
            'nav-home':        'الرئيسية',
            'nav-about':       'من نحن',
            'nav-services':    'الخدمات',
            'nav-portfolio':   'أعمالنا',
            'nav-reviews':     'التقييمات',
            'nav-contact':     'تواصل معنا',

            /* INDEX */
            'hero-title':      'تمكين العلامات التجارية من خلال<br>التسويق الرقمي الذكي',
            'hero-subtitle':   'شريكك في النمو والإبداع والحضور الرقمي.',
            'hero-btn':        'ابدأ رحلتك اليوم ←',

            /* ABOUT */
            'about-page-title':   'عن أُفق',
            'about-card1-title':  'من نحن',
            'about-card1-text':   'أُفق أكثر من مجرد خدمة تسويق رقمي – إنها رؤية. أسسها فريق من الخبراء يؤمنون بقوة الاستراتيجية وفن السرد القصصي.',
            'about-card2-title':  'ماذا نقدم',
            'about-card2-text':   'نصنع حملات تسويق رقمي جريئة وفعّالة للشركات المستعدة للنمو – ليس فقط على مستوى الأرقام، بل في بناء تواصل حقيقي.',
            'about-card3-title':  'سبب وجودنا',
            'about-card3-text':   'في عالم مليء بالضجيج، الانتباه هو العملة الأهم. نحن نساعد في تحويل هذا الانتباه إلى أفعال ذات تأثير وحضور طويل الأمد.',
            'about-card4-title':  'قيمنا',
            'about-val1':         'الشفافية: أنت ترى ما نراه.',
            'about-val2':         'الإبداع: نبتكر.',
            'about-val3':         'الدقة: كل تفصيلة تصنع فارقاً.',
            'about-val4':         'الشراكة: أنت شريك في النجاح.',

            /* SERVICES */
            'services-title':  'خدماتنا',
            'svc1-title':      'إدارة حسابات السوشيال ميديا',
            'svc1-text':       'إدارة تفاعلية شاملة للحسابات، تشمل بناء مجتمع قوي حول علامتك التجارية، والرد السريع والاحترافي على الرسائل والتعليقات لتحويل المتابعين إلى عملاء.',
            'svc2-title':      'الهوية البصرية',
            'svc2-text':       'تصميم هوية بصرية تعلق في الأذهان، بدءاً من تصميم الشعار (Logo) المبتكر وحتى أغلفة المنصات (Covers) لضمان حضور رقمي متناسق وقوي.',
            'svc3-title':      'التصاميم الجرافيك',
            'svc3-text':       'تصميمات إبداعية (Scroll-stopping visuals) مصممة خصيصاً لجذب انتباه جمهورك المستهدف وزيادة معدلات التفاعل.',
            'svc4-title':      'تصوير وإنتاج وتحرير الفيديو',
            'svc4-text':       'إنتاج مرئي متكامل، من التصوير الاحترافي وحتى المونتاج الديناميكي، لصناعة فيديوهات تحكي قصة البراند وتزيد من نسبة التحويل (Conversion Rate).',
            'svc5-title':      'التخطيط والاستراتيجية التسويقية',
            'svc5-text':       'منظومة محتوى متكاملة تشمل: بناء الاستراتيجية، تخطيط المحتوى (Content Plan)، كتابة القصص الإعلانية (Storytelling)، والجدولة الذكية للنشر في أوقات الذروة.',
            'svc6-title':      'استراتيجية وصناعة المحتوى',
            'svc6-text':       'بناء خطط تسويقية مبنية على تحليل دقيق للسوق والمنافسين، لتحديد المسار الأسرع والأكثر فعالية لتحقيق أهدافك البيعية.',
            'svc7-title':      'الإعلانات الممولة (الميديا باينج)',
            'svc7-text':       'إطلاق وإدارة حملات إعلانية موجهة بدقة (Laser-targeted Ads) لضمان الوصول للجمهور الصح، وتقليل تكلفة العميل، مع تحقيق أعلى عائد على الاستثمار (ROI).',
            'svc8-title':      'تحليل الأداء والتقارير الشهرية',
            'svc8-text':       'تحليل مستمر للأرقام والنتائج (Insights Analysis)، وتقديم تقارير شهرية شفافة توضح الأداء وتحدد الخطوات الاستراتيجية القادمة.',
            'svc9-title':      'دراسة وتحليل المنافسين',
            'svc9-text':       'حلول احترافية للعلامة الشخصية لرواد الأعمال والقادة.',

            /* PORTFOLIO */
            'portfolio-title': 'أعمالنا',
            'port1-title':     'حملة تواصل اجتماعي',
            'port1-text':      'استراتيجية متكاملة أدت إلى زيادة التفاعل بنسبة 120%.',
            'port2-title':     'تصميم هوية تجارية',
            'port2-text':      'هوية تجارية كاملة تشمل الشعار والألوان والمواد التسويقية.',
            'port3-title':     'استراتيجية حملة إعلانية',
            'port3-text':      'حملة إعلانات مدفوعة عالية التحويل بنتائج عائد استثمار ممتازة.',

            /* REVIEWS */
            'reviews-title':   'ماذا يقول عملاؤنا',
            'stat1-num':       '+50',
            'stat1-label':     'عميل سعيد',
            'stat2-num':       '4.9',
            'stat2-label':     'متوسط التقييم',
            'stat3-num':       '+100',
            'stat3-label':     'مشروع مكتمل',
            'rev1-text':       '"أُفق غيّرت وجودنا على وسائل التواصل كلياً. زاد تفاعلنا بنسبة 300% في 3 أشهر فقط!"',
            'rev1-name':       'أحمد حسان',
            'rev1-role':       'شركة ناشئة تقنية',
            'rev2-text':       '"خدمة احترافية ومحتوى إبداعي ونتائج مذهلة. أنصح به بشدة لأي شركة تسعى للنمو."',
            'rev2-name':       'سارة محمد',
            'rev2-role':       'علامة أزياء',
            'rev3-text':       '"الحملات الإعلانية التي أنشأتها أُفق أحضرت لنا أكثر من 50 عميلاً جديداً أسبوعياً!"',
            'rev3-name':       'عمر علي',
            'rev3-role':       'سلسلة مطاعم',

            /* CONTACT */
            'contact-title':        'تواصل معنا',
            'contact-subtitle':     'هل لديك مشروع في ذهنك؟ نحب أن نسمع منك. أرسل لنا رسالة وسنرد خلال 24 ساعة.',
            'contact-wa-title':     'واتساب',
            'contact-email-title':  'البريد الإلكتروني',
            'contact-resp-title':   'وقت الاستجابة',
            'contact-resp-val':     'خلال 24 ساعة',
            'contact-social-title': 'تابعنا',
            'form-card-title':      'أرسل رسالة',
            'form-card-desc':       'أكمل النموذج أدناه وسنتواصل معك في أقرب وقت ممكن.',
            'form-name-label':      'الاسم الكامل',
            'form-name-ph':         'اسمك الكامل',
            'form-email-label':     'البريد الإلكتروني',
            'form-email-ph':        'بريدك@الإلكتروني',
            'form-subject-label':   'الموضوع',
            'form-subject-default': 'اختر موضوعاً',
            'form-message-label':   'الرسالة',
            'form-message-ph':      'أخبرنا عن مشروعك وأهدافك أو أي أسئلة لديك...',
            'contact-submit-btn':   'أرسل عبر واتساب',

            /* REGISTRATION */
            'reg-title':        'تسجيل العميل',
            'personal-info':    'المعلومات الشخصية',
            'business-info':    'معلومات الأعمال',
            'service-sel':      'اختيار الخدمة',
            'services-subtitle':'الخدمات المطلوبة',
            'package-sel':      'اختيار الباقة',
            'other-req':        'متطلبات أخرى',
            'brief-section-title': 'اختر موجزك',
            'brief-subtitle':   'اختر نوع الموجز الذي تحتاجه — ستظهر لك استمارة لتعبئتها',
            'brief-ads-title':  'موجز الإعلانات',
            'brief-ads-text':   'حملات الإعلانات المدفوعة والتسويق بالأداء',
            'brief-biz-title':  'الموجز التجاري',
            'brief-biz-text':   'نظرة شاملة على الأعمال وتفاصيل استراتيجية التسويق',
            'select-brief-btn': 'اختر الموجز',
            'brief-form-subtitle': 'يرجى تعبئة جميع الأقسام أدناه — ستُضمَّن في طلبك',

            /* ADS BRIEF */
            'ads-sec1':         'هدف الحملة',
            'ads-sec2':         'تفاصيل العرض والمنتج',
            'ads-sec3':         'الجمهور المستهدف',
            'ads-sec4':         'الميزانية والجدول الزمني',
            'ads-sec5':         'أصول الإعلان والوصول',
            'ads-sec6':         'بيانات الحملات السابقة',
            'ads-ph-objective': 'ما هو هدف الحملة؟ مثال: توليد عملاء محتملين، زيادة المبيعات، رفع الوعي بالعلامة...',
            'ads-ph-offer':     'ما المنتج أو الخدمة التي تعلن عنها؟ اذكر السعر والعروض والخصومات إن وُجدت...',
            'ads-ph-audience':  'صف عميلك المثالي — العمر، الجنس، الموقع، الاهتمامات، السلوكيات...',
            'ads-ph-budget':    'ما هي ميزانيتك الإجمالية أو الشهرية؟ متى تريد بدء الحملة وكم تستمر؟',
            'ads-ph-assets':    'هل لديك صور أو فيديوهات أو نصوص جاهزة؟ هل لديك حساب إعلاني؟ شارك أي روابط أو تفاصيل وصول...',
            'ads-ph-history':   'هل سبق لك تشغيل إعلانات؟ على أي منصات وبأي ميزانية وما النتائج؟ ما الذي نجح وما الذي لم ينجح؟',

            /* BUSINESS BRIEF */
            'brief-sec1':       'معلومات الأعمال',
            'brief-f-brand':    'اسم العلامة / الشركة',
            'brief-f-industry': 'قطاع / نوع الأعمال',
            'brief-f-specialty':'التخصص الأساسي',
            'brief-f-address':  'العنوان / الموقع الجغرافي',
            'brief-f-bizdet':   'تفاصيل إضافية عن الأعمال',
            'brief-sec2':       'التواصل والعمليات',
            'brief-f-phone':    'أرقام الهاتف',
            'brief-f-wa':       'رقم واتساب',
            'brief-f-hours':    'ساعات العمل الرسمية',
            'brief-f-holidays': 'أيام الإجازة / العطل',
            'brief-f-delivery': 'نظام التوصيل والسياسات',
            'brief-sec3':       'الهوية البصرية والوضع الحالي',
            'brief-f-logo':     'أسلوب الشعار المفضل',
            'brief-f-colors':   'ألوان العلامة / الهوية البصرية',
            'brief-f-social':   'الحضور الحالي على التواصل الاجتماعي',
            'brief-f-agency':   'تجربة مع وكالات تسويق سابقة',
            'brief-f-branding-notes': '📝 ملاحظات إضافية عن الهوية البصرية',
            'brief-sec4':       'استراتيجية التسويق',
            'brief-f-obj':      'الأهداف التسويقية الرئيسية',
            'brief-f-comp':     'المنافسون الرئيسيون',
            'brief-f-channels': 'قنوات التسويق المفضلة',
            'brief-f-audience': 'الجمهور المستهدف / الشخصية الشرائية',
            'brief-sec5':       'العقد والفوترة',
            'brief-f-package':  'الباقة المختارة',
            'brief-f-payment':  'طريقة وشروط الدفع',
            'brief-f-duration': 'مدة العقد',
            'brief-ph-brand':    'مثال: وكالة أُفق',
            'brief-ph-industry': 'مثال: أزياء، مطاعم، تقنية...',
            'brief-ph-specialty':'ما الذي تتخصص فيه؟',
            'brief-ph-address':  'المدينة، الدولة أو العنوان الكامل',
            'brief-ph-bizdet':   'أي معلومات أخرى ذات صلة...',
            'brief-ph-phone':    'أدخل رقم الهاتف',
            'brief-ph-wa':       'أدخل رقم واتساب',
            'brief-ph-hours':    'مثال: السبت–الخميس، 9ص–6م',
            'brief-ph-holidays': 'مثال: الجمعة، الأعياد الرسمية',
            'brief-ph-delivery': 'صف نظام التوصيل أو السياسات إن وُجدت...',
            'brief-ph-logo':     'مثال: بسيط، جريء، كلاسيكي...',
            'brief-ph-social':   'روابط الحسابات أو (نبدأ من الصفر)',
            'brief-ph-agency':   'أسماء الوكالات أو (لا يوجد)',
            'brief-ph-branding-notes': 'أي ملاحظات إضافية عن ألوان علامتك أو تفضيلاتك البصرية أو تفاصيل الهوية...',
            'brief-ph-obj':      'مثال: زيادة الوعي، توليد عملاء...',
            'brief-ph-comp':     'اذكر أبرز منافسيك',
            'brief-ph-channels': 'مثال: إنستغرام، إعلانات جوجل...',
            'brief-ph-audience': 'العمر، الجنس، الاهتمامات، الموقع...',
            'brief-ph-payment':  'مثال: شهري، تحويل بنكي، نقدي...',
            'brief-ph-duration': 'مثال: 3 أشهر، 6 أشهر، مفتوح...',

            /* COLOR PALETTE */
            'palette-custom-label':   'لون مخصص:',
            'palette-add-btn':        '+ إضافة',
            'palette-selected-label': 'الألوان المختارة:',
            'palette-none-msg':       'لم يتم الاختيار بعد',

            'submit-reg-btn':   'إرسال التسجيل',
            'fn-ph':            'الاسم الكامل',
            'ni-ph':            'الرقم القومي',
            'cn-ph':            'رقم الاتصال',
            'wn-ph':            'رقم واتساب',
            'bn-ph':            'اسم العلامة / الأعمال',
            'it-ph':            'نوع الصناعة',
            'sl-ph':            'رابط صفحة التواصل الاجتماعي',
            'od-ph':            'تفاصيل إضافية...',
            'svc-chk1':         'التسويق عبر التواصل الاجتماعي',
            'svc-chk2':         'إنشاء المحتوى',
            'svc-chk3':         'التخطيط الاستراتيجي والتحليلات',
            'svc-chk4':         'إنشاء الحملات الإعلانية',
            'svc-chk5':         'تصميم الهوية التجارية',
            'svc-chk6':         'العلامة الشخصية',
            'pkg-select-ph':    'اختر الباقة',
            'pkg-launch':       'الانطلاق',
            'pkg-expansion':    'التوسع',
            'pkg-dominance':    'الهيمنة',
            'pkg-loyalty':      'الولاء',

            /* FOOTER */
            'footer-brand-text':  'أكثر من مجرد خدمة تسويق رقمي — إنها رؤية. نصنع حملات جريئة وفعّالة تحوّل الانتباه إلى نمو حقيقي.',
            'footer-links-title': 'روابط سريعة',
            'footer-svc-title':   'الخدمات',
            'footer-ct-title':    'اتصل بنا',
            'footer-response':    'الرد خلال 24 ساعة',
            'footer-worldwide':   'متاح في جميع أنحاء العالم',
            'footer-copyright':   '© 2025 أُفق. جميع الحقوق محفوظة. صُنع بـ ❤️ واستراتيجية.',
            'footer-privacy':     'سياسة الخصوصية',
            'footer-terms':       'شروط الخدمة',
            'footer-touch':       'تواصل معنا',
            'footer-svc-smm':     'التسويق عبر التواصل الاجتماعي',
            'footer-svc-acc':     'إنشاء الحملات الإعلانية',
            'footer-svc-cc':      'إنشاء المحتوى',
            'footer-svc-bid':     'تصميم الهوية التجارية',
            'footer-svc-sp':      'التخطيط الاستراتيجي',
            'footer-svc-pb':      'العلامة الشخصية',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    function applyLanguage(lang) {
        const dict = translations[lang];
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        document.querySelectorAll('[data-i18n-opt]').forEach(el => {
            const key = el.getAttribute('data-i18n-opt');
            if (dict[key] !== undefined) el.options[0].text = dict[key];
        });

        document.querySelectorAll('[data-i18n-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-label');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        document.querySelectorAll('[data-i18n-bph]').forEach(el => {
            const key = el.getAttribute('data-i18n-bph');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        if (selectedBrief) {
            const briefLabels = {
                'Ads Brief':      { en: 'Ads Brief',      ar: 'موجز الإعلانات' },
                'Business Brief': { en: 'Business Brief', ar: 'الموجز التجاري' }
            };
            const badgeId = (selectedBrief === 'Ads Brief') ? 'adsBriefFormBadge' : 'bizBriefFormBadge';
            const badge = document.getElementById(badgeId);
            if (badge) badge.textContent = (briefLabels[selectedBrief] && briefLabels[selectedBrief][lang]) || selectedBrief;
        }

        const btn = document.getElementById('langToggle');
        if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'ع';

        currentLang = lang;
        localStorage.setItem('lang', lang);
    }

    window.addEventListener('DOMContentLoaded', () => {
        const navIcons = document.querySelector('.nav-icons');
        if (navIcons) {
            const langBtn = document.createElement('button');
            langBtn.id = 'langToggle';
            langBtn.textContent = currentLang === 'ar' ? 'EN' : 'ع';
            langBtn.setAttribute('title', 'Toggle Language');
            navIcons.insertBefore(langBtn, navIcons.firstChild);
            langBtn.addEventListener('click', () => {
                const newLang = currentLang === 'ar' ? 'en' : 'ar';
                localStorage.setItem('lang', newLang);
                location.reload();
            });
        }

        applyLanguage(currentLang);
    });
})();

/* =====================================================================
   LIGHTBOX — Scroll-to-Zoom (centered on cursor)
   Mouse wheel zooms in/out at the exact cursor position.
   Drag to pan when zoomed in. Double-click resets zoom.
   ===================================================================== */
(function () {

    /* ── Settings ── */
    var ZOOM_STEP    = 0.12;   // zoom amount per wheel tick (fraction)
    var ZOOM_MIN     = 1.0;    // minimum scale (never smaller than natural size)
    var ZOOM_MAX     = 6.0;    // maximum scale

    /* ── State ── */
    var scale        = 1;
    var originX      = 0;      // current CSS transform translateX
    var originY      = 0;      // current CSS transform translateY
    var isDragging   = false;
    var dragStartX   = 0;
    var dragStartY   = 0;
    var dragOriginX  = 0;
    var dragOriginY  = 0;
    var isOpen       = false;

    var lbImgEl      = null;
    var lbOverlay    = null;

    /* ── Hint element ── */
    var hint = document.createElement('div');
    hint.id  = 'lb-scroll-hint';
    hint.innerHTML = '🖱 Scroll to zoom · Drag to pan · Double-click to reset';
    document.body.appendChild(hint);

    /* ── Apply current transform to the image ── */
    function applyTransform() {
        if (!lbImgEl) return;
        lbImgEl.style.transform = 'translate(' + originX + 'px, ' + originY + 'px) scale(' + scale + ')';
        /* Update cursor to show grab state */
        lbImgEl.style.cursor = scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';
    }

    /* ── Reset zoom & pan ── */
    function resetZoom() {
        scale   = 1;
        originX = 0;
        originY = 0;
        applyTransform();
        if (hint) hint.style.opacity = '1';
    }

    /* ── Clamp pan so image can't be dragged completely off-screen ── */
    function clampPan() {
        if (!lbImgEl) return;
        var rect     = lbImgEl.getBoundingClientRect();
        var vw       = window.innerWidth;
        var vh       = window.innerHeight;
        var imgW     = rect.width;
        var imgH     = rect.height;

        /* Maximum allowed offset in each direction */
        var maxX = Math.max(0, (imgW - vw) / 2 + 40);
        var maxY = Math.max(0, (imgH - vh) / 2 + 40);

        originX = Math.max(-maxX, Math.min(maxX, originX));
        originY = Math.max(-maxY, Math.min(maxY, originY));
    }

    /* ── Wheel: zoom centered on cursor ── */
    function onWheel(e) {
        if (!isOpen || !lbImgEl) return;
        e.preventDefault();
        e.stopPropagation();

        /* Cursor position relative to viewport center (where the image is anchored) */
        var cursorX = e.clientX - window.innerWidth  / 2;
        var cursorY = e.clientY - window.innerHeight / 2;

        /* Direction: negative deltaY = zoom in */
        var direction = e.deltaY < 0 ? 1 : -1;
        var oldScale  = scale;
        var newScale  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, scale + direction * ZOOM_STEP * scale));

        /* Adjust pan so the point under the cursor stays fixed */
        var ratio = newScale / oldScale;
        originX   = cursorX + (originX - cursorX) * ratio;
        originY   = cursorY + (originY - cursorY) * ratio;

        scale = newScale;

        /* Reset pan when fully zoomed out */
        if (scale <= ZOOM_MIN) { originX = 0; originY = 0; }

        clampPan();
        applyTransform();

        /* Fade out hint after first zoom */
        if (hint) hint.style.opacity = '0';
    }

    /* ── Drag: pan when zoomed in ── */
    function onMouseDown(e) {
        if (!isOpen || scale <= 1) return;
        if (e.button !== 0) return;
        isDragging  = true;
        dragStartX  = e.clientX;
        dragStartY  = e.clientY;
        dragOriginX = originX;
        dragOriginY = originY;
        applyTransform();
        e.preventDefault();
    }

    function onMouseMove(e) {
        if (!isDragging || !isOpen) return;
        originX = dragOriginX + (e.clientX - dragStartX);
        originY = dragOriginY + (e.clientY - dragStartY);
        clampPan();
        applyTransform();
    }

    function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        applyTransform();
    }

    /* ── Double-click: reset zoom ── */
    function onDblClick(e) {
        if (!isOpen) return;
        e.preventDefault();
        resetZoom();
    }

    /* ── Open ── */
    function openLightbox(imgEl) {
        var lb   = document.getElementById('lightbox');
        lbImgEl  = document.getElementById('lightbox-img');
        lbOverlay = lb;
        if (!lb || !lbImgEl) return;

        lbImgEl.src = imgEl.src;
        isOpen      = true;
        resetZoom();

        lb.classList.add('open');
        document.body.style.overflow = 'hidden';

        /* Show hint */
        if (hint) { hint.style.display = 'block'; hint.style.opacity = '1'; }

        /* Attach events to the lightbox overlay (catches wheel anywhere inside) */
        lb.addEventListener('wheel',      onWheel,      { passive: false });
        lb.addEventListener('mousedown',  onMouseDown);
        lbImgEl.addEventListener('dblclick', onDblClick);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup',   onMouseUp);
    }

    /* ── Close ── */
    function closeLightbox() {
        var lb = document.getElementById('lightbox');
        if (!lb) return;
        lb.classList.remove('open');
        document.body.style.overflow = '';
        isOpen     = false;
        isDragging = false;

        if (hint) hint.style.display = 'none';

        lb.removeEventListener('wheel',      onWheel);
        lb.removeEventListener('mousedown',  onMouseDown);
        if (lbImgEl) lbImgEl.removeEventListener('dblclick', onDblClick);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup',   onMouseUp);

        resetZoom();
    }

    function closeLightboxOnBg(e) {
        /* Only close when clicking the dark backdrop, not the image or controls */
        if (e.target === document.getElementById('lightbox') && !isDragging) {
            closeLightbox();
        }
    }

    /* ── no-ops to satisfy existing HTML onclick attrs ── */
    function zoomIn()  {}
    function zoomOut() {}

    /* ── Keyboard shortcuts ── */
    document.addEventListener('keydown', function (e) {
        var lb = document.getElementById('lightbox');
        if (!lb || !lb.classList.contains('open')) return;
        if (e.key === 'Escape')   closeLightbox();
        if (e.key === '0')        resetZoom();
    });

    /* ── Click-outside-to-close ── */
    document.addEventListener('DOMContentLoaded', function () {
        var lb = document.getElementById('lightbox');
        if (lb) lb.addEventListener('click', closeLightboxOnBg);
    });

    /* ── Expose globals ── */
    window.openLightbox      = openLightbox;
    window.closeLightbox     = closeLightbox;
    window.closeLightboxOnBg = closeLightboxOnBg;
    window.zoomIn            = zoomIn;
    window.zoomOut           = zoomOut;

})();