
(function () {
    'use strict';

    /* ---------- CONFIGURATION ---------- */
    // Add any page filename that should be LOCKED in free version
    const LOCKED_PAGES = [
        '11.html', // Spherometer Lab
        '10.html', // Micrometer Gauge
        '18.html', // Vernier Caliper
        '12.html', // Travelling Microscope
        '2.html',  // Forces Simulator
        '3.html',  // Moments Simulator
        '4.html',  // Hare's Apparatus
        '5.html',  // U-Tube Density
        '6.html',  // Liquid Density
        '7.html',  // Simple Pendulum
        '8.html',  // Helical Spring
        '13.html', // Sonometer
        '14.html', // Resonance Tube
        '15.html', // Relative Humidity
        '16.html'  // Gas Law
    ];

    const currentPage = window.location.pathname.split('/').pop();
    const isLocked = LOCKED_PAGES.includes(currentPage);

    if (!isLocked) return; // Page is free — do nothing

    /* ---------- 1. INJECT CSS STYLES ---------- */
    function injectStyles() {
        const css = `
        /* Premium Banner */
        .premium-banner{
            background: linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);
            border-bottom:2px solid #f59e0b;
            padding:14px 24px;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 4px 12px rgba(245,158,11,.15);
            position:sticky;top:80px;z-index:85;
            animation:slideDown .5s ease;
        }
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .premium-banner-content{
            display:flex;align-items:center;gap:16px;
            max-width:1200px;width:100%;flex-wrap:wrap;justify-content:center;
        }
        .premium-banner-icon{font-size:2rem;color:#d97706;}
        .premium-banner-text h3{font-size:1.05rem;color:#92400e;margin:0;font-weight:800;}
        .premium-banner-text p{font-size:.88rem;color:#78350f;margin:3px 0 0;}
        .premium-banner-btn{
            background:#d97706;color:#fff;padding:10px 22px;border-radius:30px;
            text-decoration:none;font-weight:700;display:inline-flex;align-items:center;
            gap:8px;transition:all .3s;box-shadow:0 4px 14px rgba(217,141,24,.3);
            font-size:.9rem;
        }
        .premium-banner-btn:hover{background:#b45309;transform:translateY(-2px);}

        /* Lock overlay on simulator area */
        .lock-overlay{
            position:absolute;inset:0;
            background:rgba(255,255,255,.92);
            backdrop-filter:blur(8px);
            display:flex;align-items:center;justify-content:center;
            z-index:50;border-radius:20px;
            animation:fadeIn .4s ease;
        }
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .lock-overlay-content{text-align:center;padding:28px;}
        .lock-overlay-content i{font-size:3rem;color:#177D81;margin-bottom:14px;display:block;}
        .lock-overlay-content h3{color:#0f2728;margin:0 0 6px;font-size:1.2rem;}
        .lock-overlay-content p{color:#4e6c6d;margin:0 0 18px;font-size:.9rem;}
        .lock-overlay-content .btn{
            background:#177D81;color:#fff;padding:10px 24px;border-radius:12px;
            text-decoration:none;font-weight:700;display:inline-flex;align-items:center;
            gap:8px;transition:all .3s;box-shadow:0 4px 14px rgba(23,125,129,.3);
        }
        .lock-overlay-content .btn:hover{background:#126367;transform:translateY(-2px);}

        /* Disabled inputs */
        .free-locked{opacity:.55;pointer-events:none;filter:grayscale(.3);}

        @media (max-width:600px){
            .premium-banner{padding:10px 14px;top:64px;}
            .premium-banner-text h3{font-size:.9rem;}
            .premium-banner-text p{font-size:.75rem;}
            .premium-banner-btn{padding:8px 14px;font-size:.8rem;}
            .premium-banner-icon{font-size:1.5rem;}
        }
        `;
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    /* ---------- 2. INJECT PREMIUM BANNER ---------- */
    function injectBanner() {
        const header = document.querySelector('.top-header');
        if (!header) return;

        const banner = document.createElement('div');
        banner.className = 'premium-banner';
        banner.innerHTML = `
            <div class="premium-banner-content">
                <div class="premium-banner-icon"><i class="fas fa-crown"></i></div>
                <div class="premium-banner-text">
                    <h3>🔒 Premium Practical Locked</h3>
                    <p>Upgrade to Premium to unlock this simulator and all interactive features.</p>
                </div>
                <a href="premium.html" class="premium-banner-btn">
                    <i class="fas fa-unlock"></i> Get Premium
                </a>
            </div>
        `;
        header.parentNode.insertBefore(banner, header.nextSibling);
    }

    /* ---------- 3. LOCK SIMULATOR CONTROLS ---------- */
    function lockSimulator() {
        // Disable all interactive controls (but NOT sidebar menu)
        const controls = document.querySelectorAll(
            '.content-body input, .content-body select, .content-body button.btn, .content-body canvas'
        );
        controls.forEach(el => {
            el.disabled = true;
            el.classList.add('free-locked');
            el.setAttribute('title', '🔒 Premium feature — upgrade to unlock');
        });

        // Add lock overlay on the main simulator card
        const target = document.querySelector('.canvas-card') ||
                       document.querySelector('.controls-grid') ||
                       document.querySelector('.content-body .container');

        if (target) {
            target.style.position = 'relative';
            const overlay = document.createElement('div');
            overlay.className = 'lock-overlay';
            overlay.innerHTML = `
                <div class="lock-overlay-content">
                    <i class="fas fa-lock"></i>
                    <h3>Premium Access Required</h3>
                    <p>Unlock this practical to perform measurements and calculations.</p>
                    <a href="premium.html" class="btn">
                        <i class="fas fa-crown"></i> Get Premium
                    </a>
                </div>
            `;
            target.appendChild(overlay);
        }
    }

    /* ---------- 4. INITIALIZE ---------- */
    function init() {
        injectStyles();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                injectBanner();
                lockSimulator();
            });
        } else {
            injectBanner();
            lockSimulator();
        }
    }

    init();
})();
