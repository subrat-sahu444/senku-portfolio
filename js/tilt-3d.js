/* ==========================================================================
   3D PERSPECTIVE TILT & SPECULAR SHEEN ENGINE (SMOOTH SPRING LERP)
   Ultra-buttery physics-based tilt for glassmorphic cards with RAF damping
   ========================================================================== */

(function () {
  // Only activate 3D tilt on devices with a mouse/pointer
  const isPointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerDevice) return;

  const cards = document.querySelectorAll('.tilt-card, .glass-card, .holo-card, .bento-item, .project-card');

  cards.forEach((card) => {
    let bounds;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let targetScale = 1;
    let currentScale = 1;
    let isHovering = false;
    let rafId = null;

    function updatePhysics() {
      // Smooth exponential damping (lerp factor 0.12)
      const lerpFactor = 0.12;
      currentTiltX += (targetTiltX - currentTiltX) * lerpFactor;
      currentTiltY += (targetTiltY - currentTiltY) * lerpFactor;
      currentScale += (targetScale - currentScale) * lerpFactor;

      card.style.transform = `
        perspective(1000px)
        rotateX(${currentTiltX.toFixed(3)}deg)
        rotateY(${currentTiltY.toFixed(3)}deg)
        scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, ${currentScale.toFixed(3)})
        translateZ(0)
      `;

      // Continue animating while hovering or until returned to resting state
      const isResting = 
        Math.abs(targetTiltX - currentTiltX) < 0.01 &&
        Math.abs(targetTiltY - currentTiltY) < 0.01 &&
        Math.abs(targetScale - currentScale) < 0.001;

      if (isHovering || !isResting) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
        rafId = null;
      }
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.left;
      const topY = mouseY - bounds.top;

      const centerX = leftX - bounds.width / 2;
      const centerY = topY - bounds.height / 2;

      // Max tilt angle (smoother subtle tilt: 8deg)
      const maxTilt = 8.5;
      targetTiltX = (centerY / (bounds.height / 2)) * -maxTilt;
      targetTiltY = (centerX / (bounds.width / 2)) * maxTilt;
      targetScale = 1.018;

      // Update specular sheen position smoothly
      const posX = ((leftX / bounds.width) * 100).toFixed(2);
      const posY = ((topY / bounds.height) * 100).toFixed(2);
      card.style.setProperty('--mouse-x', `${posX}%`);
      card.style.setProperty('--mouse-y', `${posY}%`);

      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    }

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      isHovering = true;
      card.style.willChange = 'transform';
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
      if (window.soundEngine) {
        window.soundEngine.playHover();
      }
    }

    function onMouseLeave() {
      isHovering = false;
      targetTiltX = 0;
      targetTiltY = 0;
      targetScale = 1;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
})();
