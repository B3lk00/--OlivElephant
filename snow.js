/* OlivElephant — lagani zimski efekat snijega */
(() => {
  'use strict';
  if (window.__olivSnowStarted) return;
  window.__olivSnowStarted = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function startSnow() {
    if (document.getElementById('oliv-snow-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'oliv-snow-canvas';
    canvas.setAttribute('aria-hidden', 'true');

    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '999',
      opacity: '0',
      transition: 'opacity 2s ease',
      contain: 'strict'
    });

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      canvas.remove();
      return;
    }

    let w, h, flakes = [], raf, last = 0;

    const mobile = () => window.innerWidth < 768;
    const rand = (a, b) => a + Math.random() * (b - a);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        mobile() ? 45 : 105,
        Math.floor(w * h / (mobile() ? 8500 : 12500))
      );

      flakes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(.7, mobile() ? 2.4 : 3.1),
        speed: rand(12, 37),
        sway: rand(4, 18),
        phase: rand(0, Math.PI * 2),
        alpha: rand(.25, .72)
      }));
    }

    function frame(time) {
      if (!last) last = time;

      const dt = Math.min((time - last) / 1000, .05);
      last = time;

      ctx.clearRect(0, 0, w, h);

      for (const f of flakes) {
        f.y += f.speed * dt;
        f.phase += dt * .65;
        f.x += Math.sin(f.phase) * f.sway * dt;

        if (f.y > h + 5) {
          f.y = -5;
          f.x = rand(0, w);
        }

        if (f.x < -10) f.x = w + 5;
        if (f.x > w + 10) f.x = -5;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();

    window.addEventListener('resize', resize, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    });

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    raf = requestAnimationFrame(frame);
  }

  function waitForIntro() {
    const selectors = [
      '#intro',
      '#intro-overlay',
      '#loading-screen',
      '#loader',
      '.intro-overlay',
      '.loading-screen',
      '.preloader'
    ];

    const begin = Date.now();

    const timer = setInterval(() => {
      const visible = selectors.some(s => {
        const el = document.querySelector(s);
        if (!el) return false;

        const style = getComputedStyle(el);

        return style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          Number(style.opacity) > 0.05 &&
          el.getBoundingClientRect().width > 0;
      });

      if (!visible || Date.now() - begin > 12000) {
        clearInterval(timer);
        setTimeout(startSnow, 900);
      }
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForIntro, {
      once: true
    });
  } else {
    waitForIntro();
  }
})();
