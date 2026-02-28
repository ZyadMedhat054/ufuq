/* ===============================================================
   UFUQ — Enhanced Script with Animations & Interactions
   =============================================================== */

/* ===================== PAGE LOADER ===================== */
(function () {
    // Inject loader HTML
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-logo">UFUQ</div>
        <div class="loader-bar" style="width:0"></div>
    `;
    document.body.prepend(loader);

    // Inject scroll progress bar
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.prepend(progress);

    // Inject background orbs
    ['orb-1','orb-2','orb-3'].forEach(cls => {
        const orb = document.createElement('div');
        orb.className = `orb ${cls}`;
        document.body.appendChild(orb);
    });

    // Animate loader bar
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
    if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.onclick = () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.textContent = isLight ? '🌙' : '☀️';
        themeToggle.style.animation = 'none';
        themeToggle.offsetHeight; // reflow
        themeToggle.style.animation = '';
    };
}

/* ===================== MOBILE MENU ===================== */
if (menuBtn) {
    menuBtn.onclick = () => {
        nav.classList.toggle('active');
        menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    };
    // Close menu on link click
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

    // Inject particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    hero.appendChild(particleContainer);

    // Inject scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-mouse"></div>
        <span>Scroll</span>
    `;
    hero.appendChild(scrollIndicator);

    // Wrap highlight text
    const h1 = hero.querySelector('h1');
    if (h1) {
        h1.innerHTML = h1.innerHTML
            .replace('Smart Digital Marketing', '<span class="highlight">Smart Digital Marketing</span>');
    }

    // Create particles
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
    // Add reveal classes to elements
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

    // Observe
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

/* ===================== SERVICES GRID IN START YOUR JOURNEY ===================== */
// Note: .services-grid inside forms uses checkbox labels, not .service-card
// Brief selection
let selectedBrief = '';

document.querySelectorAll('.select-brief-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.brief-card').forEach(card => {
            card.style.borderColor = '';
        });
        const card = btn.closest('.brief-card');
        if (card) {
            card.style.borderColor = '#4fd1c5';
            card.style.boxShadow = '0 0 30px rgba(79,209,197,0.35)';
            selectedBrief = card.getAttribute('data-brief');
        }
    });
});

/* ===================== SEND TO WHATSAPP (Registration) ===================== */
function sendToWhatsApp() {
    const fullName      = (document.getElementById('fullName')?.value      || '').trim();
    const contactNumber = (document.getElementById('contactNumber')?.value  || '').trim();
    const whatsappNumber= (document.getElementById('whatsappNumber')?.value || '').trim();
    const businessName  = (document.getElementById('businessName')?.value   || '').trim();
    const industryType  = (document.getElementById('industryType')?.value   || '').trim();
    const socialLink    = (document.getElementById('socialLink')?.value     || '').trim();
    const platform      = (document.getElementById('platform')?.value       || '');
    const otherDetails  = (document.getElementById('otherDetails')?.value   || '').trim();

    const services = [];
    document.querySelectorAll('.services-column input:checked').forEach(el => {
        services.push(el.parentElement.innerText.trim());
    });

    const packageVal = document.getElementById('packageSelect')?.value || 'Not selected';
    const briefText  = selectedBrief || 'No brief selected';

    const message =
`========================
    Client Registration
========================

Name           : ${fullName}
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

Brief Request:
${briefText}

Additional Details:
${otherDetails || 'None'}

========================`;

    window.open('https://wa.me/201016273403?text=' + encodeURIComponent(message), '_blank');
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
        window.open('https://wa.me/201016273403?text=' + encodeURIComponent(text), '_blank');
    }, 500);
}

/* ===================== STAGGER ANIMATION INIT ===================== */
// Ensure cards visible in viewport on load
window.addEventListener('load', () => {
    // Trigger visible state for already-visible elements
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
