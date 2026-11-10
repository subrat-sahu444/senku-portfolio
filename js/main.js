/* ==========================================================================
   MAIN APPLICATION LOGIC & UI ORCHESTRATION
   Navigation, filtering, modal state, form feedback & interactive animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Toggle in Navbar
  const soundToggleNav = document.getElementById('soundToggleNav');
  if (soundToggleNav && window.soundEngine) {
    const updateSoundUI = () => {
      if (window.soundEngine.enabled) {
        soundToggleNav.classList.add('active');
        soundToggleNav.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        soundToggleNav.title = "Audio FX: Enabled";
      } else {
        soundToggleNav.classList.remove('active');
        soundToggleNav.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        soundToggleNav.title = "Audio FX: Muted";
      }
    };
    updateSoundUI();

    soundToggleNav.addEventListener('click', () => {
      window.soundEngine.toggle();
      updateSoundUI();
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '75px';
        navLinks.style.left = '1.5rem';
        navLinks.style.right = '1.5rem';
        navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        navLinks.style.borderRadius = '20px';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8)';
      }
    });

    // Close on mobile link click
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // 3. Smooth Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // 5. Contact Form Simulation & Toast Notification
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.innerText = message;
    toast.classList.add('show');
    if (window.soundEngine) window.soundEngine.playActivate();

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const msgInput = document.getElementById('formMessage');

      if (!nameInput.value || !emailInput.value || !msgInput.value) {
        showToast("⚠️ Please provide all transmission coordinates.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Transmitted!';
        showToast(`⚡ Transmission received from ${nameInput.value}! Senku has queued your dispatch.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // 6. Metric Numbers Counter Animation
  const metrics = document.querySelectorAll('.metric-value');
  let metricsTriggered = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(start) + suffix;
      }
    }, 25);
  }

  function checkMetrics() {
    if (metricsTriggered) return;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        metrics.forEach((m) => countUp(m));
        metricsTriggered = true;
      }
    }
  }

  window.addEventListener('scroll', checkMetrics, { passive: true });
  checkMetrics();

  // 7. Click Sound FX on interactive buttons
  document.querySelectorAll('.btn-glass-primary, .btn-glass-secondary, .social-pill, .tech-chip').forEach((el) => {
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
});
