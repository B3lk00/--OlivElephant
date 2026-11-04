
/* ==================================================
   OLIVELEPHANT — WINTER SNOW V4
   Kristalne pahulje + brze pokretanje
   Snijeg preko cijelog ekrana i navigacije
================================================== */

(() => {
  "use strict";

  if (window.__olivSnowV4) return;
  window.__olivSnowV4 = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.id = "oliv-snow-canvas";
  canvas.setAttribute("aria-hidden", "true");

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "2147483640",
    opacity: "0",
    transition: "opacity 0.4s ease"
  });

  let ctx;
  let width = 0;
  let height = 0;
  let flakes = [];
  let sprites = [];
  let animationId = null;
  let lastTime = 0;

  const random = (min, max) =>
    min + Math.random() * (max - min);

  // Kristalna pahulja sa sest krakova
  function createSnowflake(size, variant) {
    const sprite = document.createElement("canvas");
    const padding = 5;
    const diameter = Math.ceil(size * 2 + padding * 2);

    sprite.width = diameter;
    sprite.height = diameter;

    const c = sprite.getContext("2d");
    if (!c) return sprite;

    c.translate(diameter / 2, diameter / 2);

    c.strokeStyle = "rgba(255,255,255,0.98)";
    c.lineWidth = Math.max(0.6, size * 0.09);
    c.lineCap = "round";
    c.lineJoin = "round";

    for (let i = 0; i < 6; i++) {
      c.save();
      c.rotate((Math.PI / 3) * i);

      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -size);
      c.stroke();

      const branches = variant === 0 ? 2 : 3;

      for (let j = 1; j <= branches; j++) {
        const position = size * (0.24 + j * 0.18);
        const length = size * (variant === 2 ? 0.24 : 0.18);

        c.beginPath();
        c.moveTo(0, -position);
        c.lineTo(-length, -position - length * 0.7);

        c.moveTo(0, -position);
        c.lineTo(length, -position - length * 0.7);
        c.stroke();
      }

      c.restore();
    }

    c.beginPath();

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = Math.cos(angle) * size * 0.16;
      const y = Math.sin(angle) * size * 0.16;

      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }

    c.closePath();
    c.stroke();

    return sprite;
  }

  // Razliciti oblici i velicine pahulja
  function generateSprites() {
    sprites = [];

    const sizes = [3.5, 4.5, 5.5, 6.5, 8, 10, 12];

    for (const size of sizes) {
      for (let variant = 0; variant < 3; variant++) {
        sprites.push(createSnowflake(size, variant));
      }
    }
  }

  // Kreiranje jedne pahulje
  function createFlake(initial = false) {
    const mobile = width < 768;

    const sprite = sprites[
      Math.floor(Math.random() * sprites.length)
    ];

    const depth = random(0.55, 1);

    return {
      x: random(0, width),
      y: initial ? random(0, height) : random(-60, -10),

      sprite,
      depth,

      speed: random(16, 43) * depth,
      sway: random(5, 16),
      swaySpeed: random(0.35, 1.1),
      phase: random(0, Math.PI * 2),

      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-0.4, 0.4),

      opacity: random(0.38, 0.85),
      scale: mobile ? random(0.55, 0.85) : random(0.7, 1)
    };
  }

  // Velicina ekrana i broj pahulja
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mobile = width < 768;

    const count = Math.min(
      mobile ? 65 : 145,
      Math.max(
        mobile ? 35 : 75,
        Math.floor(width * height / (mobile ? 5200 : 8000))
      )
    );

    flakes = Array.from(
      { length: count },
      () => createFlake(true)
    );
  }

  // Animacija padanja snijega
  function animate(time) {
    if (!lastTime) lastTime = time;

    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];

      f.y += f.speed * delta;
      f.phase += f.swaySpeed * delta;
      f.x += Math.sin(f.phase) * f.sway * delta;
      f.rotation += f.rotationSpeed * delta;

      if (f.y > height + 35) {
        flakes[i] = createFlake();
        continue;
      }

      if (f.x < -35) f.x = width + 35;
      if (f.x > width + 35) f.x = -35;

      const sprite = f.sprite;

      const drawWidth = sprite.width * f.scale;
      const drawHeight = sprite.height * f.scale;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.globalAlpha = f.opacity;

      ctx.drawImage(
        sprite,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      ctx.restore();
    }

    animationId = requestAnimationFrame(animate);
  }

  // Pokretanje snijega
  function startSnow() {
    if (document.getElementById("oliv-snow-canvas")) return;

    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      canvas.remove();
      return;
    }

    generateSprites();
    resize();

    window.addEventListener("resize", resize, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else if (!animationId) {
        lastTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    });

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    animationId = requestAnimationFrame(animate);
  }

  // Prvi dolazak ceka intro, ostali odmah pokrecu snijeg
  function waitForIntro() {
    const key = "olivSnowVisited";

    try {
      if (sessionStorage.getItem(key) === "1") {
        startSnow();
        return;
      }
    } catch (e) {
      // Ako sessionStorage nije dostupan, nastavi normalno
    }

    const selectors = [
      "#intro",
      "#intro-overlay",
      "#loading-screen",
      "#loader",
      ".intro-overlay",
      ".loading-screen",
      ".preloader"
    ];

    const started = Date.now();

    const timer = setInterval(() => {
      const visible = selectors.some(selector => {
        const element = document.querySelector(selector);
        if (!element) return false;

        const style = getComputedStyle(element);

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number(style.opacity) > 0.05 &&
          element.getBoundingClientRect().width > 0
        );
      });

      if (!visible || Date.now() - started > 12000) {
        clearInterval(timer);

        try {
          sessionStorage.setItem(key, "1");
        } catch (e) {}

        startSnow();
      }
    }, 150);
  }

  // OVO JE DIO KOJI JE NEDOSTAJAO
  // Automatski poziva funkciju za pokretanje snijega
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      waitForIntro,
      { once: true }
    );
  } else {
    waitForIntro();
  }

})();
