/**
 * Jaanam Collection - Global Interactive Physics & Kinetic Motion Engine
 * 3D Perspective Tilt, Cursor Specular Shine, Magnetic Buttons,
 * and Scroll-Driven Staggered Reveals.
 */

export function initInteractivePhysics() {
  initCard3DTilt();
  initMagneticButtons();
  initScrollReveals();

  // Re-initialize when catalog or sections update
  const observer = new MutationObserver(() => {
    initCard3DTilt();
  });

  const catalog = document.getElementById('catalog-section');
  if (catalog) {
    observer.observe(catalog, { childList: true, subtree: true });
  }
}

/**
 * 3D Perspective Tilt with Dynamic Specular Reflection
 */
function initCard3DTilt() {
  if (window.innerWidth < 1024) return; // Optimize for mobile touch

  const cards = document.querySelectorAll('.jc-product-card, .jc-category-card, .jc-atelier-item');

  cards.forEach(card => {
    if (card.dataset.tiltInitialized === 'true') return;
    card.dataset.tiltInitialized = 'true';

    // Inject specular shine sheen
    let shine = card.querySelector('.jc-tilt-shine');
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'jc-tilt-shine';
      shine.style.position = 'absolute';
      shine.style.inset = '0';
      shine.style.pointerEvents = 'none';
      shine.style.zIndex = '3';
      shine.style.opacity = '0';
      shine.style.transition = 'opacity 0.25s ease';
      shine.style.borderRadius = 'inherit';
      card.appendChild(shine);
    }

    let isHovering = false;

    const onMouseMove = (e) => {
      if (!isHovering) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max 6 degrees tilt
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1)`;

      // Specular sheen tracking cursor
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`;
      shine.style.opacity = '1';
    };

    const onMouseEnter = () => {
      isHovering = true;
      card.style.transition = 'transform 0.1s ease-out, border-color 0.2s ease, box-shadow 0.2s ease';
    };

    const onMouseLeave = () => {
      isHovering = false;
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      shine.style.opacity = '0';
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/**
 * Magnetic Attraction Effect for High-Contrast CTA Buttons
 */
function initMagneticButtons() {
  if (window.innerWidth < 1024) return;

  const magneticTargets = document.querySelectorAll(
    '.btn-luxury, .jc-wa-trigger-btn, #accents-open-rsvp-btn, #btn-atelier-audio'
  );

  magneticTargets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle displacement
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate(0px, 0px)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 350);
    });
  });
}

/**
 * Scroll-Driven Staggered Intersection Observer
 */
function initScrollReveals() {
  const sections = document.querySelectorAll(
    '.jc-catalog-section, .jc-drape-studio-section, .jc-accents-section, .jc-atelier-section, .jc-occasion-bar'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach(s => {
    s.classList.add('jc-scroll-reveal');
    observer.observe(s);
  });
}
