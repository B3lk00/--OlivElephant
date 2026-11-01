/* =====================================================
   OLIVELEPHANT — REALISTIC CRYSTAL SNOW
   Kristalne pahulje, rotacija, dubina i prirodan pad
===================================================== */

(() => {
  "use strict";

  if (window.__olivCrystalSnow) return;
  window.__olivCrystalSnow = true;

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
    zIndex: "999",
    opacity: "0",
    transition: "opacity 2s ease"
  });

  let ctx;
  let width;
  let height;
  let flakes = [];
  let animationId = null;
  let lastTime = 0;

  const random = (min, max) =>
    min + Math.random() * (max - min);

  /* -----------------------------------------
     CRTANJE PRAVE KRISTALNE PAHULJE
  ----------------------------------------- */

  function createSnowflakeSprite(size, variant) {
    const sprite = document.createElement("canvas");

    const padding = 8;
    const diameter = Math.ceil(size * 2 + padding * 2);

    sprite.width = diameter;
    sprite.height = diameter;

    const c = sprite.getContext("2d");

    c.translate(diameter / 2, diameter / 2);

    c.strokeStyle = "rgba(255,255,255,0.95)";
    c.fillStyle = "rgba(255,255,255,0.95)";

    c.lineWidth = Math.max(0.65, size * 0.065);
    c.lineCap = "round";
    c.lineJoin = "round";

    const arms = 6;

    for (let i = 0; i < arms; i++) {
      c.save();

      c.rotate((Math.PI * 2 / arms) * i);

      // Glavni krak
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -size);
      c.stroke();

      // Kristalne grane
      const branches = variant === 0 ? 2 : 3;

      for (let j = 1; j <= branches; j++) {
        const position =
          size * (0.28 + j * 0.17);

        const branchLength =
          size * (variant === 2 ? 0.24 : 0.19);

        c.beginPath();

        c.moveTo(0, -position);
        c.lineTo(-branchLength, -position - branchLength * 0.7);

        c.moveTo(0, -position);
        c.lineTo(branchLength, -position - branchLength * 0.7);

        c.stroke();
      }

      // Sitni završeci
      if (variant === 2) {
        c.beginPath();
        c.moveTo(-size * 0.12, -size * 0.85);
        c.lineTo(0, -size);

        c.lineTo(size * 0.12, -size * 0.85);
        c.stroke();
      }

      c.restore();
    }

    // Kristalni centar
    c.beginPath();

    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i;
      const x = Math.cos(angle) * size * 0.14;
      const y = Math.sin(angle) * size * 0.14;

      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }

    c.closePath();
    c.stroke();

    return sprite;
  }

  /* -----------------------------------------
     SPRITE BIBLIOTEKA
  ----------------------------------------- */

  const sprites = [];

  function generateSprites() {
    sprites.length = 0;

    const sizes = [5, 7, 9, 12, 15, 18];

    for (const size of sizes) {
      for (let variant = 0; variant < 3; variant++) {
        sprites.push({
          canvas: createSnowflakeSprite(size, variant),
          size
        });
      }
    }
  }

  /* -----------------------------------------
     PAHULJE
  ----------------------------------------- */

  function createFlake(initial = false) {
    const mobile = width < 768;

    const spriteIndex = Math.floor(
      Math.random() * sprites.length
    );

    const sprite = sprites[spriteIndex];

    const depth = random(0.45, 1);

    return {
      x: random(0, width),
      y: initial
        ? random(-height, height)
        : random(-80, -20),

      sprite,

      depth,

      speed: random(12, 30) * depth,

      sway: random(8, 25),

      swaySpeed: random(0.3, 0.9),

      phase: random(0, Math.PI * 2),

      rotation: random(0, Math.PI * 2),

      rotationSpeed: random(-0.35, 0.35),

      opacity: random(0.35, 0.8),

      scale: mobile
        ? random(0.55, 0.85)
        : random(0.65, 1.1)
    };
  }

  /* -----------------------------------------
     RESIZE
  ----------------------------------------- */

  function resize() {
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mobile = width < 768;

    const count = mobile ? 28 : 65;

    flakes = Array.from(
      { length: count },
      () => createFlake(true)
    );
  }

  /* -----------------------------------------
     ANIMACIJA
  ----------------------------------------- */

  function animate(time) {
    if (!lastTime) lastTime = time;

    const delta = Math.min(
      (time - lastTime) / 1000,
      0.05
    );

    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];

      f.y += f.speed * delta;

      f.phase += f.swaySpeed * delta;

      f.x += Math.sin(f.phase) * f.sway * delta;

      f.rotation += f.rotationSpeed * delta;

      if (f.y > height + 40) {
        flakes[i] = createFlake();
        continue;
      }

      if (f.x < -40) f.x = width + 40;
      if (f.x > width + 40) f.x = -40;

      const sprite = f.sprite.canvas;

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

  /* -----------------------------------------
     POKRETANJE
  ----------------------------------------- */

  function startSnow() {
    if (document.getElementById("oliv-snow-canvas")) {
      return;
    }

    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d", {
      alpha: true
    });

    if (!ctx) {
      canvas.remove();
      return;
    }

    generateSprites();
    resize();

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          cancelAnimationFrame(animationId);
          animationId = null;
        } else if (!animationId) {
          lastTime = 0;
          animationId = requestAnimationFrame(animate);
        }
      }
    );

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    animationId = requestAnimationFrame(animate);
  }

  /* -----------------------------------------
     ČEKANJE LOADING SCREENA
  ----------------------------------------- */

  function waitForIntro() {
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
        setTimeout(startSnow, 700);
      }
    }, 250);
  }

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
