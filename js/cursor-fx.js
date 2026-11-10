/* ==========================================================================
   SCI-FI GLOWING CURSOR & SPARK BURST ENGINE
   Smooth trailing targeting reticle + click spark physics for desktop
   ========================================================================== */

(function () {
  // Only enable on desktop pointer devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // Create cursor DOM elements
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursorRing);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Spring physics loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    const scale = isHovered ? 1.6 : 1;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover detection for interactive elements
  const interactiveSelector = 'a, button, input, textarea, .glass-card, .bento-item, .project-card, .quick-chip, .filter-btn, .holo-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      isHovered = true;
      cursorRing.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      isHovered = false;
      cursorRing.classList.remove('cursor-hover');
    }
  });

  // Particle Spark Burst on Click
  window.addEventListener('click', (e) => {
    createSparkBurst(e.clientX, e.clientY);
  });

  function createSparkBurst(x, y) {
    const sparkCount = 8;
    const colors = ['#00f5a0', '#00d9f5', '#8b5cf6', '#ffffff'];

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      document.body.appendChild(spark);

      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const distance = 25 + Math.random() * 35;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 8px ${color}`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;

      spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 450,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }).onfinish = () => spark.remove();
    }
  }
})();
