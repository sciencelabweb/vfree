/* =========================================================
   block.js — Free Version Lock Script (v3.0 - Visible but Locked)
   ========================================================= */
(function () {
    'use strict';

    console.log("🔒 Block.js v3.0 loaded. Checking page lock status...");

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

    console.log("🔒 Page is locked. Making simulator visible but non-interactive...");

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

        /* 2. Disabled State for Controls (Visible but can't click) */
        .free-locked {
            opacity: 0.5 !important;
            pointer-events: none !important; /* Blocks ALL clicks/touches on canvas and inputs */
            cursor: not-allowed !important;
            filter: grayscale(0.3) !important;
        }

        /* 3. Subtle Watermark Badge (Does NOT hide the simulator) */
        .premium-watermark {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid var(--teal-light, #BDDED6);
            color: var(--teal-dark, #177D81);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            z-index: 10;
            pointer-events: none; /* Lets users see the simulator behind it */
        }

        @media (max-width: 600px) {
            .premium-banner { padding: 10px 14px; top: 64px; }
            .premium-banner-text h3 { font-size: .9rem; }
            .premium-banner-text p { font-size: .75rem; }
            .premium-banner-btn { padding: 8px 14px; font-size: .8rem; }
            .premium-banner-icon { font-size: 1.5rem; }
            .premium-watermark { top: 10px; right: 10px; font-size: 0.75rem; padding: 6px 12px; }
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
                        <h3>🔒 Premium Practical (Preview Mode)</h3>
                        <p>Upgrade to Premium to unlock interactive controls and perform this experiment.</p>
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

    /* ---------- 4. LOCK SIMULATOR (Visible but Non-Interactive) ---------- */
    function lockSimulator() {
        // 1. Disable all interactive controls inside the main content area
        const controls = document.querySelectorAll(
            '.content-body input, .content-body select, .content-body button, .content-body canvas'
        );
        
        let lockedCount = 0;
        controls.forEach(el => {
            // PROTECT: Do not lock sidebar menu, header, or translate buttons
            if (el.closest('.sidebar') || el.closest('.top-header') || el.closest('.footer')) return;
            
            el.disabled = true;
            el.classList.add('free-locked');
            el.setAttribute('title', '🔒 Premium feature — upgrade to unlock');
            lockedCount++;
        });
        console.log(`🔒 Disabled ${lockedCount} interactive elements (simulator remains visible).`);

        // 2. Add a subtle "Read-Only" watermark badge to the simulator card
        const target = document.querySelector('.canvas-card') || 
                       document.querySelector('.controls-grid') || 
                       document.querySelector('.content-body .container');

        if (target) {
            // Ensure parent has relative positioning for the absolute badge
            if (getComputedStyle(target).position === 'static') {
                target.style.position = 'relative';
            }
            
            const badge = document.createElement('div');
            badge.className = 'premium-watermark';
            badge.innerHTML = `<i class="fas fa-lock"></i> Premium Simulator (Read-Only)`;
            target.appendChild(badge);
            console.log("✅ Subtle watermark badge applied.");
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
