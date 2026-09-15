/* =========================================================
   block.js — Free Version Lock Script (v3.0 - Visible but Locked)
   ========================================================= */
(function () {
    'use strict';

    console.log("🔒 Block.js loaded. Checking page lock status...");

    /* ---------- 1. ROBUST URL MATCHING ---------- */
    const pathname = window.location.pathname;
    const lockedIdentifiers = ['10', '11', '18', '12', '2', '3', '4', '5', '6', '7', '8', '13', '14', '15', '16'];
    
    const isLocked = lockedIdentifiers.some(id => 
        pathname.endsWith(id) || 
        pathname.endsWith(id + '.html') || 
        pathname.includes('/' + id + '.')
    );

    if (!isLocked) {
        console.log("✅ Page is free. No lock applied.");
        return; 
    }

    console.log("🔒 Page is locked. Applying visible restrictions...");

    /* ---------- 2. INJECT CSS STYLES ---------- */
    function injectStyles() {
        if (document.getElementById('block-js-styles')) return;
        
        const css = `
        /* 1. Premium Banner (Below Header) */
        .premium-banner {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-bottom: 2px solid #f59e0b;
            padding: 14px 24px;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 12px rgba(245,158,11,.15);
            position: sticky; top: 80px; z-index: 85;
            animation: slideDown .5s ease;
        }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .premium-banner-content {
            display: flex; align-items: center; gap: 16px;
            max-width: 1200px; width: 100%; flex-wrap: wrap; justify-content: center;
        }
        .premium-banner-icon { font-size: 2rem; color: #d97706; }
        .premium-banner-text h3 { font-size: 1.05rem; color: #92400e; margin: 0; font-weight: 800; }
        .premium-banner-text p { font-size: .88rem; color: #78350f; margin: 3px 0 0; }
        .premium-banner-btn {
            background: #d97706; color: #fff; padding: 10px 22px; border-radius: 30px;
            text-decoration: none; font-weight: 700; display: inline-flex; align-items: center;
            gap: 8px; transition: all .3s; box-shadow: 0 4px 14px rgba(217,141,24,.3); font-size: .9rem;
        }
        .premium-banner-btn:hover { background: #b45309; transform: translateY(-2px); }

        /* 2. Disabled Controls (Visible but unclickable) */
        .free-locked {
            opacity: 0.65 !important;        /* Clearly visible, just slightly faded */
            pointer-events: none !important; /* Cannot be clicked or typed in */
            cursor: not-allowed !important;
            filter: grayscale(0.2) !important;
        }

        /* 3. Subtle Lock Overlay (Does NOT hide the simulator) */
        .lock-overlay-visible {
            position: absolute;
            inset: 0;
            background: rgba(255, 255, 255, 0.15); /* Very transparent - simulator is fully visible behind it */
            backdrop-filter: blur(2px);            /* Only a tiny hint of blur for depth */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            border-radius: 20px;
            pointer-events: auto; /* Blocks clicks from reaching the simulator */
            animation: fadeIn .4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .lock-overlay-content {
            pointer-events: auto; /* Allow clicking the button inside */
            background: rgba(255, 255, 255, 0.95);
            padding: 32px 40px;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(23, 125, 129, 0.15);
            text-align: center;
            border: 2px solid var(--teal-light, #BDDED6);
            max-width: 400px;
            width: 90%;
        }
        .lock-overlay-content i {
            font-size: 3.5rem;
            color: var(--teal-dark, #177D81);
            margin-bottom: 16px;
            display: block;
        }
        .lock-overlay-content h3 {
            color: var(--primary, #0f2728);
            margin: 0 0 8px;
            font-size: 1.3rem;
            font-weight: 800;
        }
        .lock-overlay-content p {
            color: var(--text-muted, #4e6c6d);
            margin: 0 0 24px;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        .lock-overlay-content .btn {
            background: var(--teal-dark, #177D81);
            color: #fff;
            padding: 12px 28px;
            border-radius: 14px;
            text-decoration: none;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px rgba(23, 125, 129, 0.3);
            font-size: 1rem;
        }
        .lock-overlay-content .btn:hover {
            background: var(--teal-dark-hover, #126367);
            transform: translateY(-2px);
        }

        @media (max-width: 600px) {
            .premium-banner { padding: 10px 14px; top: 64px; }
            .premium-banner-text h3 { font-size: .9rem; }
            .premium-banner-text p { font-size: .75rem; }
            .premium-banner-btn { padding: 8px 14px; font-size: .8rem; }
            .lock-overlay-content { padding: 24px 20px; }
            .lock-overlay-content i { font-size: 2.5rem; }
            .lock-overlay-content h3 { font-size: 1.1rem; }
        }
        `;
        const styleEl = document.createElement('style');
        styleEl.id = 'block-js-styles';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    /* ---------- 3. INJECT PREMIUM BANNER ---------- */
    function injectBanner() {
        const header = document.querySelector('.top-header');
        if (header) {
            const banner = document.createElement('div');
            banner.className = 'premium-banner';
            banner.innerHTML = `
                <div class="premium-banner-content">
                    <div class="premium-banner-icon"><i class="fas fa-crown"></i></div>
                    <div class="premium-banner-text">
                        <h3>🔒 Premium Practical</h3>
                        <p>Upgrade to unlock interactive measurements and calculations.</p>
                    </div>
                    <a href="premium.html" class="premium-banner-btn">
                        <i class="fas fa-unlock"></i> Get Premium
                    </a>
                </div>
            `;
            header.parentNode.insertBefore(banner, header.nextSibling);
            console.log("✅ Premium banner injected.");
        }
    }

    /* ---------- 4. LOCK SIMULATOR CONTROLS (VISIBLE BUT DISABLED) ---------- */
    function lockSimulator() {
        // 1. Disable all interactive controls (inputs, selects, buttons, canvas)
        const controls = document.querySelectorAll(
            '.content-body input, .content-body select, .content-body button, .content-body canvas'
        );
        
        let lockedCount = 0;
        controls.forEach(el => {
            // Protect sidebar and header from being disabled
            if (el.closest('.sidebar') || el.closest('.top-header')) return;
            
            el.disabled = true;
            el.classList.add('free-locked');
            el.setAttribute('title', '🔒 Premium feature — upgrade to unlock');
            lockedCount++;
        });
        console.log(`🔒 Disabled ${lockedCount} interactive elements (kept visible).`);

        // 2. Add a subtle, transparent lock overlay to the main content area
        const target = document.querySelector('.content-body');
        if (target) {
            // Ensure parent has relative positioning for absolute overlay
            if (getComputedStyle(target).position === 'static') {
                target.style.position = 'relative';
            }
            
            const overlay = document.createElement('div');
            overlay.className = 'lock-overlay-visible';
            overlay.innerHTML = `
                <div class="lock-overlay-content">
                    <i class="fas fa-lock"></i>
                    <h3>Premium Access Required</h3>
                    <p>The simulator is visible, but interactions are locked.<br>Upgrade to Premium to perform measurements.</p>
                    <a href="premium.html" class="btn">
                        <i class="fas fa-crown"></i> Get Premium
                    </a>
                </div>
            `;
            target.appendChild(overlay);
            console.log("✅ Subtle lock overlay applied.");
        }
    }

    /* ---------- 5. INITIALIZE ---------- */
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
