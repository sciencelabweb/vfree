/* =========================================================
   block.js — Free Version Lock Script (v4.0 - Stylish Banner)
   ========================================================= */
(function () {
    'use strict';

    console.log("🔒 Block.js v4.0 loaded. Checking page lock status...");

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
        /* =============================================
           PREMIUM BANNER - STYLISH GOLD THEME
           ============================================= */
        .premium-banner {
            position: sticky;
            top: 80px;
            z-index: 85;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%);
            border-bottom: 3px solid transparent;
            background-clip: padding-box;
            padding: 16px 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 
                        inset 0 1px 0 rgba(255, 215, 0, 0.1);
            overflow: hidden;
            animation: bannerSlideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-banner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: 
                radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(217, 142, 24, 0.15) 0%, transparent 50%);
            pointer-events: none;
        }
        .premium-banner::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -100%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 215, 0, 0.08) 50%,
                transparent 100%
            );
            animation: shimmer 4s infinite;
            pointer-events: none;
        }
        @keyframes bannerSlideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .premium-banner-content {
            position: relative;
            display: flex;
            align-items: center;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
        }

        /* Crown Icon with Glow */
        .premium-banner-icon {
            position: relative;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FFD700 0%, #D98E18 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 
                0 0 20px rgba(255, 215, 0, 0.5),
                0 0 40px rgba(217, 142, 24, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3);
            animation: crownPulse 2.5s ease-in-out infinite;
        }
        .premium-banner-icon i {
            font-size: 1.6rem;
            color: #1a1a1a;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }
        .premium-banner-icon::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FFD700, #D98E18);
            opacity: 0.4;
            filter: blur(8px);
            z-index: -1;
        }
        @keyframes crownPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(217, 142, 24, 0.3); }
            50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(255, 215, 0, 0.7), 0 0 60px rgba(217, 142, 24, 0.5); }
        }

        /* Text Section */
        .premium-banner-text {
            flex: 1;
            min-width: 200px;
            text-align: left;
        }
        .premium-banner-text h3 {
            font-size: 1.15rem;
            font-weight: 800;
            margin: 0 0 4px 0;
            background: linear-gradient(135deg, #FFD700 0%, #FFE55C 50%, #D98E18 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.3px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .premium-banner-text h3 .fa-lock {
            font-size: 0.9rem;
            -webkit-text-fill-color: #FFD700;
        }
        .premium-banner-text p {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.75);
            margin: 0;
            font-weight: 500;
            line-height: 1.4;
        }
        .premium-banner-text .stars {
            color: #FFD700;
            font-size: 0.75rem;
            margin-top: 4px;
            letter-spacing: 2px;
        }

        /* CTA Button with Shine */
        .premium-banner-btn {
            position: relative;
            background: linear-gradient(135deg, #FFD700 0%, #D98E18 100%);
            color: #1a1a1a;
            padding: 12px 26px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 800;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 
                0 4px 20px rgba(255, 215, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.2) inset;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
            flex-shrink: 0;
            letter-spacing: 0.3px;
        }
        .premium-banner-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.5),
                transparent
            );
            transition: left 0.6s ease;
        }
        .premium-banner-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 
                0 8px 30px rgba(255, 215, 0, 0.6),
                0 0 0 1px rgba(255, 255, 255, 0.3) inset;
            background: linear-gradient(135deg, #FFE55C 0%, #FFD700 100%);
        }
        .premium-banner-btn:hover::before {
            left: 100%;
        }
        .premium-banner-btn i {
            font-size: 1rem;
        }

        /* =============================================
           WATERMARK BADGE (Unchanged)
           ============================================= */
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
            pointer-events: none;
        }

        /* =============================================
           DISABLED STATE (Unchanged)
           ============================================= */
        .free-locked {
            opacity: 0.5 !important;
            pointer-events: none !important;
            cursor: not-allowed !important;
            filter: grayscale(0.3) !important;
        }

        /* =============================================
           MOBILE RESPONSIVE
           ============================================= */
        @media (max-width: 768px) {
            .premium-banner {
                padding: 14px 16px;
                top: 64px;
            }
            .premium-banner-content {
                flex-direction: column;
                gap: 14px;
                text-align: center;
            }
            .premium-banner-icon {
                width: 48px;
                height: 48px;
            }
            .premium-banner-icon i {
                font-size: 1.3rem;
            }
            .premium-banner-text {
                text-align: center;
                min-width: auto;
            }
            .premium-banner-text h3 {
                font-size: 1rem;
                justify-content: center;
            }
            .premium-banner-text p {
                font-size: 0.82rem;
            }
            .premium-banner-text .stars {
                justify-content: center;
                display: flex;
            }
            .premium-banner-btn {
                width: 100%;
                max-width: 280px;
                padding: 11px 20px;
                font-size: 0.88rem;
                justify-content: center;
            }
            .premium-watermark {
                top: 10px;
                right: 10px;
                font-size: 0.75rem;
                padding: 6px 12px;
            }
        }

        @media (max-width: 400px) {
            .premium-banner {
                padding: 12px 10px;
            }
            .premium-banner-text h3 {
                font-size: 0.92rem;
            }
            .premium-banner-text p {
                font-size: 0.78rem;
            }
            .premium-banner-btn {
                font-size: 0.82rem;
                padding: 10px 18px;
            }
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
                    <div class="premium-banner-icon">
                        <i class="fa fa-crown"></i>
                    </div>
                    <div class="premium-banner-text">
                        <h3>
                            <i class="fa fa-lock"></i>
                            Premium Practical Locked
                        </h3>
                        <p>Upgrade to unlock this simulator and all interactive features.</p>
                        <div class="stars">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                    </div>
                    <a href="premium.html" class="premium-banner-btn">
                        <i class="fa fa-unlock-alt"></i>
                        Get Premium
                        <i class="fa fa-arrow-right"></i>
                    </a>
                </div>
            `;
            header.parentNode.insertBefore(banner, header.nextSibling);
            console.log("✅ Premium banner injected.");
        }
    }

    /* ---------- 4. LOCK SIMULATOR (Visible but Non-Interactive) ---------- */
    function lockSimulator() {
        const controls = document.querySelectorAll(
            '.content-body input, .content-body select, .content-body button, .content-body canvas'
        );
        
        let lockedCount = 0;
        controls.forEach(el => {
            if (el.closest('.sidebar') || el.closest('.top-header') || el.closest('.footer')) return;
            
            el.disabled = true;
            el.classList.add('free-locked');
            el.setAttribute('title', '🔒 Premium feature — upgrade to unlock');
            lockedCount++;
        });
        console.log(`🔒 Disabled ${lockedCount} interactive elements (simulator remains visible).`);

        const target = document.querySelector('.canvas-card') || 
                       document.querySelector('.controls-grid') || 
                       document.querySelector('.content-body .container');

        if (target) {
            if (getComputedStyle(target).position === 'static') {
                target.style.position = 'relative';
            }
            
            const badge = document.createElement('div');
            badge.className = 'premium-watermark';
            badge.innerHTML = `<i class="fa fa-lock"></i> Premium Simulator (Read-Only)`;
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
