/* ==========================================================================
   3D PERSPECTIVE TILT & SPECULAR SHEEN ENGINE
   Interactive physics-based tilt for glassmorphic cards
   ========================================================================== */

(function () {
  // Only activate 3D cursor tilt on devices with a mouse/pointer (desktops, laptops)
  const isPointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerDevice) return;

  const cards = document.querySelectorAll('.tilt-card, .glass-card, .holo-card, .bento-item, .project-card');

  cards.forEach((card) => {
    let bounds;

    function rotateToMouse(e) {
      bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      // Tilt intensity
      const maxTilt = 12;
      const tiltX = (center.y / (bounds.height / 2)) * -maxTilt;
      const tiltY = (center.x / (bounds.width / 2)) * maxTilt;

      card.style.transform = `
        perspective(1000px)
        rotateX(${tiltX.toFixed(2)}deg)
        rotateY(${tiltY.toFixed(2)}deg)
        scale3d(1.02, 1.02, 1.02)
      `;

      // Set specular radial gradient coordinates
      const posX = ((leftX / bounds.width) * 100).toFixed(2);
      const posY = ((topY / bounds.height) * 100).toFixed(2);
      card.style.setProperty('--mouse-x', `${posX}%`);
      card.style.setProperty('--mouse-y', `${posY}%`);
    }

    function removeListener() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.removeEventListener('mousemove', rotateToMouse);
    }

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out';
      card.addEventListener('mousemove', rotateToMouse);
      if (window.soundEngine) {
        window.soundEngine.playHover();
      }
    });

    card.addEventListener('mouseleave', removeListener);
  });
})();
