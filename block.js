(function () {
'use strict';
console.log("🔒 Block.js v3.0 loaded. Checking page lock status...");
 /* ---------- 1. ROBUST URL MATCHING ---------- */
 const pathname = window.location.pathname;
 const lockedIdentifiers = ['10', '11', '18',  '12', '2', '3', '4', '5', '6', '7', '8', '13', '14', '15', '16', '10s', '11s', '18s',  '12s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '13s', '14s', '15s', '16s'];
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
     /* 1. Professional Premium Banner */
     .premium-banner {
         background: #ffffff;
         border-bottom: 1px solid #e2e8f0;
         padding: 20px 24px;
         display: flex; 
         align-items: center; 
         justify-content: center;
         box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02);
         position: sticky; 
         top: 80px; 
         z-index: 85;
         animation: slideDown .6s cubic-bezier(0.16, 1, 0.3, 1);
         overflow: hidden;
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
         position: relative;
         z-index: 1;
     }
     .premium-banner-icon {
         background: #f8fafc;
         border: 1px solid #e2e8f0;
         width: 64px;
         height: 64px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 16px;
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
         flex-shrink: 0;
     }
     .diamond-img {
         width: 40px;
         height: 40px;
         object-fit: contain;
     }
     .offer-tag {
         background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
         color: #ffffff;
         font-size: 0.65rem;
         font-weight: 800;
         padding: 4px 10px;
         border-radius: 20px;
         text-transform: uppercase;
         letter-spacing: 0.5px;
         margin-bottom: 6px;
         display: inline-block;
         box-shadow: 0 2px 6px rgba(220, 38, 38, 0.25);
     }
     .premium-banner-text {
         flex: 1;
         min-width: 200px;
     }
     .premium-banner-text h3 {
         font-size: 1.1rem; 
         color: #0f172a; 
         margin: 0 0 4px 0; 
         font-weight: 800;
         display: flex;
         align-items: center;
         gap: 8px;
         letter-spacing: -0.3px;
     }
     .premium-banner-text p {
         font-size: .875rem; 
         color: #475569; 
         margin: 0;
         font-weight: 500;
         line-height: 1.5;
     }
     .premium-banner-btn {
         background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
         color: #fff; 
         padding: 12px 24px; 
         border-radius: 12px;
         text-decoration: none; 
         font-weight: 600; 
         display: inline-flex; 
         align-items: center;
         gap: 8px; 
         transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
         box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
         font-size: .9rem;
         border: none;
         flex-shrink: 0;
         position: relative;
         overflow: hidden;
     }
     .premium-banner-btn:hover {
         background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
         transform: translateY(-2px);
         box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
     }
     .premium-banner-btn i {
         font-size: 1rem;
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
         box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25),
                     0 2px 8px rgba(0, 0, 0, 0.08);
         z-index: 10;
         pointer-events: none;
         text-transform: uppercase;
         letter-spacing: 0.5px;
     }
     .premium-watermark i {
         color: #D4AF37;
         font-size: 1rem;
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
         .premium-banner-icon {
             width: 52px;
             height: 52px;
         }
         .diamond-img {
             width: 32px;
             height: 32px;
         }
         .premium-banner-text {
             text-align: center;
             min-width: 100%;
             order: 2;
         }
         .premium-banner-text h3 {
             font-size: 1rem;
             justify-content: center;
         }
         .premium-banner-text p {
             font-size: .8rem;
         }
         .premium-banner-btn {
             order: 3;
             width: 100%;
             justify-content: center;
             padding: 12px 20px;
             font-size: .85rem;
         }
         .premium-banner-icon {
             order: 1;
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
             padding: 12px 12px;
         }
         .premium-banner-icon {
             width: 48px;
             height: 48px;
         }
         .diamond-img {
             width: 28px;
             height: 28px;
         }
         .premium-banner-text h3 {
             font-size: .9rem;
         }
         .premium-banner-text p {
             font-size: .75rem;
         }
         .premium-banner-btn {
             padding: 11px 18px;
             font-size: .8rem;
         }
         .premium-watermark {
             top: 10px;
             right: 10px;
             font-size: 0.7rem;
             padding: 6px 12px;
             gap: 6px;
         }
         .premium-watermark i {
             font-size: 0.85rem;
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
                     <img src="https://i.postimg.cc/mrWGRYD4/diamond-(1).gif" alt="Premium" class="diamond-img">
                 </div>
                 <div class="premium-banner-text">
                     <span class="offer-tag">Limited Time Offer</span>
                     <h3>
                         Unlock Premium Practical
                     </h3>
                     <p>Upgrade to Premium to unlock interactive controls, HD video guides, and perform this experiment without restrictions.</p>
                 </div>
                 <a href="premium.html" class="premium-banner-btn">
                     <i class="fas fa-crown"></i>
                     <span>Get Premium Access</span>
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
         badge.innerHTML = `<i class="fas fa-lock"></i> Premium Simulator (Read-Only)`;
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
