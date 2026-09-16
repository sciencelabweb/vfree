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
     /* 1. Enhanced Professional Premium Banner */
     .premium-banner {
         background: linear-gradient(135deg, rgba(15, 39, 40, 0.92) 0%, rgba(23, 125, 129, 0.88) 100%), 
                     url('https://i.postimg.cc/mrWGRYD4/diamond-(1).gif');
         background-size: cover;
         background-position: center;
         background-repeat: no-repeat;
         border-bottom: 2px solid #D4AF37;
         padding: 18px 24px;
         display: flex; 
         align-items: center; 
         justify-content: center;
         box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 
                     0 4px 12px rgba(23, 125, 129, 0.2);
         position: sticky; 
         top: 80px; 
         z-index: 85;
         animation: slideDown .6s cubic-bezier(0.16, 1, 0.3, 1);
         overflow: hidden;
     }
     .premium-banner::before {
         content: '';
         position: absolute;
         top: -50%;
         right: -10%;
         width: 200px;
         height: 200px;
         background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
         border-radius: 50%;
         animation: float 8s ease-in-out infinite;
     }
     @keyframes slideDown { 
         from { transform: translateY(-100%); opacity: 0; } 
         to { transform: translateY(0); opacity: 1; } 
     }
     @keyframes float {
         0%, 100% { transform: translate(0, 0) rotate(0deg); }
         50% { transform: translate(-20px, 20px) rotate(180deg); }
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
         font-size: 2.5rem;
         color: #D4AF37;
         background: rgba(255, 255, 255, 0.1);
         backdrop-filter: blur(4px);
         width: 64px;
         height: 64px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 50%;
         border: 1px solid rgba(212, 175, 55, 0.3);
         box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
         animation: pulse 2s ease-in-out infinite;
         flex-shrink: 0;
     }
     @keyframes pulse {
         0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(212, 175, 55, 0.2); }
         50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4); }
     }
     .premium-banner-text {
         flex: 1;
         min-width: 200px;
     }
     .premium-banner-text h3 {
         font-size: 1.15rem; 
         color: #ffffff; 
         margin: 0 0 4px 0; 
         font-weight: 800;
         display: flex;
         align-items: center;
         gap: 8px;
         letter-spacing: -0.3px;
         text-shadow: 0 2px 4px rgba(0,0,0,0.4);
     }
     .premium-banner-text h3 i {
         font-size: 1.1rem;
         color: #D4AF37;
     }
     .premium-banner-text p {
         font-size: .9rem; 
         color: #e2e8f0; 
         margin: 0;
         font-weight: 500;
         line-height: 1.4;
         text-shadow: 0 1px 2px rgba(0,0,0,0.4);
     }
     .premium-banner-btn {
         background: linear-gradient(135deg, #D98E18 0%, #f59e0b 100%);
         color: #0f2728; 
         padding: 14px 28px; 
         border-radius: 50px;
         text-decoration: none; 
         font-weight: 800; 
         display: inline-flex; 
         align-items: center;
         gap: 10px; 
         transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
         box-shadow: 0 6px 20px rgba(217, 142, 24, 0.4),
                     0 2px 8px rgba(0, 0, 0, 0.2);
         font-size: .95rem;
         border: 2px solid rgba(255, 255, 255, 0.2);
         flex-shrink: 0;
         position: relative;
         overflow: hidden;
     }
     .premium-banner-btn::before {
         content: '';
         position: absolute;
         top: 0;
         left: -100%;
         width: 100%;
         height: 100%;
         background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
         transition: left 0.5s;
     }
     .premium-banner-btn:hover::before {
         left: 100%;
     }
     .premium-banner-btn:hover {
         background: linear-gradient(135deg, #f59e0b 0%, #D98E18 100%);
         color: #ffffff;
         transform: translateY(-3px) scale(1.02);
         box-shadow: 0 8px 24px rgba(217, 142, 24, 0.5),
                     0 4px 12px rgba(0, 0, 0, 0.3);
     }
     .premium-banner-btn i {
         font-size: 1.1rem;
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
         background: rgba(15, 39, 40, 0.95);
         border: 2px solid #D4AF37;
         color: #D4AF37;
         padding: 10px 18px;
         border-radius: 25px;
         font-size: 0.85rem;
         font-weight: 800;
         display: flex;
         align-items: center;
         gap: 8px;
         box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25),
                     0 2px 8px rgba(212, 175, 55, 0.1);
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
             padding: 14px 16px;
             top: 64px;
             background-position: center;
         }
         .premium-banner-content {
             gap: 14px;
         }
         .premium-banner-icon {
             font-size: 2rem;
             width: 52px;
             height: 52px;
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
             font-size: 1.75rem;
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
                     <i class="fas fa-crown"></i>
                 </div>
                 <div class="premium-banner-text">
                     <h3>
                         <i class="fas fa-lock"></i>
                         Premium Practical (Preview Mode)
                     </h3>
                     <p>Upgrade to Premium to unlock interactive controls and perform this experiment.</p>
                 </div>
                 <a href="premium.html" class="premium-banner-btn">
                     <i class="fas fa-unlock-alt"></i>
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
