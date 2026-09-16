(function () {
'use strict';
console.log("🔒 Block.js v3.0 loaded. Checking page lock status...");

/* ---------- 1. ROBUST URL MATCHING ---------- */
const pathname = window.location.pathname;
const lockedIdentifiers = ['10', '11', '18', '12', '2', '3', '4', '5', '6', '7', '8', '13', '14', '15', '16', '10s', '11s', '18s', '12s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '13s', '14s', '15s', '16s'];
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
    /* 1. Enhanced Premium Banner (Professional White Theme) */
    .premium-banner {
        background: #ffffff;
        border-bottom: 2px solid #e2e8f0;
        padding: 16px 24px;
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        position: sticky; 
        top: 80px; 
        z-index: 85;
        animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideDown { 
        from { transform: translateY(-100%); opacity: 0; } 
        to { transform: translateY(0); opacity: 1; } 
    }
    
    .premium-banner-content {
        display: flex; 
        align-items: center; 
        gap: 20px;
        max-width: 1200px; 
        width: 100%; 
        flex-wrap: wrap; 
        justify-content: center;
    }
    
    /* Smaller Diamond GIF */
    .premium-banner-img {
        width: 40px;
        height: 40px;
        object-fit: contain;
        flex-shrink: 0;
        animation: pulse-glow 2.5s ease-in-out infinite;
    }
    @keyframes pulse-glow {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(217, 119, 6, 0.3)); }
        50% { transform: scale(1.05); filter: drop-shadow(0 0 6px rgba(217, 119, 6, 0.5)); }
    }
    
    .premium-banner-text {
        flex: 1;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    /* Limited Time Offer Tag */
    .limited-offer-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #fef2f2;
        color: #dc2626;
        font-size: 0.7rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: fit-content;
        border: 1px solid #fecaca;
    }
    
    .premium-banner-text h3 {
        font-size: 1.1rem; 
        color: #0f172a; 
        margin: 0; 
        font-weight: 800;
        letter-spacing: -0.3px;
    }
    
    .premium-banner-text p {
        font-size: 0.9rem; 
        color: #64748b; 
        margin: 0;
        font-weight: 500;
        line-height: 1.4;
    }
    
    .premium-banner-btn {
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        color: #fff; 
        padding: 12px 24px; 
        border-radius: 10px;
        text-decoration: none; 
        font-weight: 700; 
        display: inline-flex; 
        align-items: center;
        gap: 8px; 
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
        font-size: 0.95rem;
        border: none;
        flex-shrink: 0;
    }
    .premium-banner-btn:hover {
        background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4);
    }
    
    /* 2. Disabled State for Controls */
    .free-locked {
        opacity: 0.5 !important;
        pointer-events: none !important;
        cursor: not-allowed !important;
        filter: grayscale(0.3) !important;
    }
    
    /* 3. Gold Watermark Badge */
    .premium-watermark {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255, 255, 255, 0.98);
        border: 2px solid #D4AF37;
        color: #D4AF37;
        padding: 10px 18px;
        border-radius: 25px;
        font-size: 0.85rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25), 0 2px 8px rgba(0, 0, 0, 0.08);
        z-index: 10;
        pointer-events: none;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    /* Mobile Responsive Banner */
    @media (max-width: 768px) {
        .premium-banner {
            padding: 16px;
            top: 64px;
        }
        .premium-banner-content {
            flex-direction: column;
            text-align: center;
            gap: 12px;
        }
        .premium-banner-text {
            align-items: center;
            min-width: 100%;
        }
        .limited-offer-tag {
            margin: 0 auto;
        }
        .premium-banner-btn {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
        }
        .premium-watermark {
            top: 12px;
            right: 12px;
            font-size: 0.75rem;
            padding: 8px 14px;
        }
    }
    
    @media (max-width: 480px) {
        .premium-banner {
            padding: 14px 12px;
        }
        .premium-banner-img {
            width: 36px;
            height: 36px;
        }
        .premium-banner-text h3 {
            font-size: 1rem;
        }
        .premium-banner-text p {
            font-size: 0.85rem;
        }
        .premium-banner-btn {
            padding: 12px 18px;
            font-size: 0.9rem;
        }
        .premium-watermark {
            top: 10px;
            right: 10px;
            font-size: 0.7rem;
            padding: 6px 12px;
            gap: 6px;
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
                <img src="https://i.postimg.cc/mrWGRYD4/diamond-(1).gif" alt="Premium" class="premium-banner-img">
                <div class="premium-banner-text">
                    <div class="limited-offer-tag">
                        <i class="fas fa-bolt"></i> Limited Time Offer
                    </div>
                    <h3>Premium Practical (Preview Mode)</h3>
                    <p>Upgrade to unlock interactive controls and master this experiment.</p>
                </div>
                <a href="premium.html" class="premium-banner-btn">
                    <i class="fas fa-crown"></i>
                    <span>Get Premium</span>
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
    console.log(\`🔒 Disabled \${lockedCount} interactive elements (simulator remains visible).\`);
    
    const target = document.querySelector('.canvas-card') || 
                   document.querySelector('.controls-grid') || 
                   document.querySelector('.content-body .container');
    if (target) {
        if (getComputedStyle(target).position === 'static') {
            target.style.position = 'relative';
        }
        const badge = document.createElement('div');
        badge.className = 'premium-watermark';
        badge.innerHTML = \`<i class="fas fa-lock"></i> Premium Simulator (Read-Only)\`;
        target.appendChild(badge);
        console.log("✅ Gold watermark badge applied.");
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
