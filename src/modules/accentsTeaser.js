/**
 * Jaanam Collection - Feature 3: "Curated Accents" Pre-Launch Drop Engine
 * Phase 2 Editorial Showcase with Anatomically Verified Multi-Look Hotspots,
 * 3D Responsive Physics, and VIP Early Access Guestlist Generator.
 */

import { ACCENTS_LOOKS, PHASE2_ACCENTS } from '../data/products.js';
import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

export class AccentsTeaser {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeLookId = 'jewelry';
    this.activeHotspotId = 'p2-01';

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    this.ensureRsvpDialog();
    this.attachEvents();
    this.initTiltEffect();

    // Re-render when currency changes to keep prices dynamic
    store.subscribe('currency:change', () => {
      this.updateDynamicPrices();
    });
  }

  getCurrentLook() {
    return ACCENTS_LOOKS.find(l => l.id === this.activeLookId) || ACCENTS_LOOKS[0];
  }

  getLookItems(lookId) {
    return PHASE2_ACCENTS.filter(item => item.lookId === lookId);
  }

  ensureRsvpDialog() {
    let dialog = document.getElementById('jc-rsvp-dialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'jc-rsvp-dialog';
      dialog.className = 'jc-pdp-modal';
      dialog.style.maxWidth = '540px';
      dialog.style.padding = '0';

      dialog.innerHTML = `
        <div class="jc-rsvp-modal-content">
          <button type="button" class="jc-pdp-close-btn" id="rsvp-modal-close" aria-label="Close RSVP Modal">
            ${ICONS.close()}
          </button>
          
          <div class="jc-rsvp-header">
            <span class="meta-label meta-label-brass">Private Atelier Guestlist</span>
            <h3>VIP Early Access Privilege</h3>
            <p>Be the first to acquire our limited-run brass jewelry, bio-acetate eyewear, and sculpted bridle leather belts before public release.</p>
          </div>

          <form id="jc-rsvp-form" class="jc-rsvp-form">
            <div class="jc-form-group">
              <label class="jc-form-label" for="rsvp-name">Full Patron Name *</label>
              <input type="text" id="rsvp-name" required placeholder="Lady Eleanor Vance" />
            </div>

            <div class="jc-form-row">
              <div class="jc-form-group">
                <label class="jc-form-label" for="rsvp-email">Email Address *</label>
                <input type="email" id="rsvp-email" required placeholder="eleanor@atelier.com" />
              </div>
              <div class="jc-form-group">
                <label class="jc-form-label" for="rsvp-whatsapp">WhatsApp (Optional)</label>
                <input type="tel" id="rsvp-whatsapp" placeholder="+44 7911 123456" />
              </div>
            </div>

            <div class="jc-form-group">
              <label class="jc-form-label">Drop Interests</label>
              <div class="jc-checkbox-group">
                <label class="jc-checkbox-label">
                  <input type="checkbox" name="interest" value="jewelry" checked /> Hand-Hammered Brass Jewelry
                </label>
                <label class="jc-checkbox-label">
                  <input type="checkbox" name="interest" value="belts" checked /> Sculpted Waist Belts
                </label>
                <label class="jc-checkbox-label">
                  <input type="checkbox" name="interest" value="sunglasses" checked /> Bio-Acetate Eyewear
                </label>
                <label class="jc-checkbox-label">
                  <input type="checkbox" name="interest" value="leather" checked /> Italian Small Leather Carry
                </label>
              </div>
            </div>

            <button type="submit" class="btn-luxury btn-luxury-brass" style="margin-top: 1rem; width: 100%;">
              Confirm VIP Priority RSVP
            </button>
          </form>

          <div id="jc-rsvp-confirmation" style="display: none; padding: 2.5rem; text-align: center;">
            <!-- Generated VIP Pass -->
          </div>
        </div>
      `;

      document.body.appendChild(dialog);

      const closeBtn = dialog.querySelector('#rsvp-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => dialog.close());
      }
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });

      const form = dialog.querySelector('#jc-rsvp-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleRsvpSubmit(dialog);
        });
      }
    }
  }

  render() {
    const existingVip = store.getVipRsvp();
    const currentLook = this.getCurrentLook();
    const currentItems = this.getLookItems(this.activeLookId);
    const activeItem = PHASE2_ACCENTS.find(i => i.id === this.activeHotspotId) || currentItems[0];

    this.container.innerHTML = `
      <div class="jc-container">
        <div class="jc-accents-header">
          <div class="jc-accents-title-group">
            <span class="meta-label meta-label-brass">Phase 02 Atelier Preview — Arriving Winter '26</span>
            <h2>The Curated Accents</h2>
            <p>Heirloom-cast brass jewelry, brutalist collar architecture, and sculpted Italian leather belts. Select an atelier category below to inspect artisan details directly on the lookbook model.</p>
          </div>
          <div id="accents-rsvp-status-wrap">
            ${existingVip ? `
              <div class="jc-vip-status-badge">
                <span class="jc-vip-dot"></span>
                <span><strong>VIP Priority Active:</strong> Pass #${existingVip.passNumber}</span>
              </div>
            ` : `
              <button type="button" class="btn-luxury btn-luxury-brass" id="accents-open-rsvp-btn">
                ${ICONS.sparkle()} Request VIP Early Access
              </button>
            `}
          </div>
        </div>

        <!-- Category Lookbook Segmented Navigation -->
        <div class="jc-accents-look-tabs" role="tablist" aria-label="Accents Categories">
          ${ACCENTS_LOOKS.map(look => `
            <button type="button"
              class="jc-accents-look-tab ${look.id === this.activeLookId ? 'is-active' : ''}"
              data-look-id="${look.id}"
              role="tab"
              aria-selected="${look.id === this.activeLookId}">
              <span class="jc-look-tab-kicker">${look.kicker}</span>
              <span class="jc-look-tab-name">${look.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Full-Bleed Lookbook Showcase Stage with Anatomically Accurate Hotspots -->
        <div class="jc-accents-showcase-wrapper" id="accents-showcase-wrapper">
          <div class="jc-accents-stage" id="accents-interactive-stage">
            <img 
              src="${currentLook.image}" 
              alt="${currentLook.name} Editorial Model" 
              class="jc-accents-model-img" 
              id="accents-model-photo"
              width="1600" 
              height="900" 
              loading="lazy" 
            />

            <!-- Subtle Cinematic Gradient Overlays -->
            <div class="jc-accents-stage-overlay"></div>

            <!-- Stage Kicker Overlay -->
            <div class="jc-accents-stage-badge">
              <span>${currentLook.tagline}</span>
            </div>

            <!-- Interactive Hotspot Pins for Active Look -->
            <div class="jc-hotspots-container" id="jc-hotspots-container">
              ${currentItems.map(item => `
                <button type="button" 
                  class="jc-hotspot-pin ${item.id === this.activeHotspotId ? 'is-active' : ''}" 
                  style="left: ${item.hotspot.x}%; top: ${item.hotspot.y}%;" 
                  data-hotspot-id="${item.id}"
                  aria-label="View details for ${item.name}">
                  <span class="jc-hotspot-beacon"></span>
                  <span class="jc-hotspot-ring"></span>
                  <span class="jc-hotspot-core"></span>
                  <span class="jc-hotspot-label">${item.subCategory}</span>
                </button>
              `).join('')}
            </div>

            <!-- Floating Interactive Preview Card -->
            <div class="jc-hotspot-card ${activeItem ? 'is-visible' : ''}" id="accents-preview-card" role="region" aria-label="Selected Piece Preview">
              ${activeItem ? this.renderCardContent(activeItem) : ''}
            </div>
          </div>
        </div>

        <!-- Interactive Synchronized Accent Pieces Carousel / Grid -->
        <div class="jc-accents-pieces-grid" id="accents-pieces-grid">
          ${currentItems.map(item => `
            <div class="jc-accent-piece-card ${item.id === this.activeHotspotId ? 'is-active' : ''}" data-piece-id="${item.id}">
              <div class="jc-accent-piece-thumb">
                <img src="${item.image}" alt="${item.name}" loading="lazy" />
              </div>
              <div class="jc-accent-piece-info">
                <span class="meta-label meta-label-brass">${item.subCategory}</span>
                <h4 class="jc-accent-piece-title">${item.name}</h4>
                <p class="jc-accent-piece-material">${item.material}</p>
                <div class="jc-accent-piece-bottom">
                  <span class="jc-accent-piece-price">${store.formatPrice(item.estimatedPrice)}</span>
                  <button type="button" class="jc-btn-inspect-pin" data-inspect-id="${item.id}">
                    Inspect on Model →
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.positionPreviewCard(activeItem);
  }

  renderCardContent(item) {
    return `
      <div class="jc-hotspot-card-header">
        <span class="jc-hotspot-drop-tag">${item.expectedDrop}</span>
        <button type="button" class="jc-hotspot-card-close" id="accents-card-close-btn" aria-label="Close Card">
          ${ICONS.close('icon-micro')}
        </button>
      </div>

      <div class="jc-hotspot-card-media">
        <img src="${item.image}" alt="${item.name}" class="jc-hotspot-thumb" />
        <div class="jc-hotspot-media-info">
          <span class="meta-label meta-label-brass">${item.subCategory}</span>
          <h4 class="jc-hotspot-piece-title">${item.name}</h4>
        </div>
      </div>

      <p class="jc-hotspot-material">${item.material}</p>
      
      <div class="jc-hotspot-artisan">
        <strong>Provenance:</strong> ${item.artisanNote}
      </div>

      <div class="jc-hotspot-card-footer">
        <div>
          <span class="jc-hotspot-price-label">Est. Price</span>
          <span class="jc-hotspot-est-price" data-accent-price="${item.estimatedPrice}">
            ${store.formatPrice(item.estimatedPrice)}
          </span>
        </div>
        <button type="button" class="btn-luxury btn-luxury-brass jc-btn-rsvp-quick" data-rsvp-item="${item.name}">
          Reserve Access
        </button>
      </div>
    `;
  }

  positionPreviewCard(item) {
    const cardElement = this.container.querySelector('#accents-preview-card');
    if (!cardElement || !item) return;

    const x = item.hotspot.x;

    // Reset styles
    cardElement.style.left = '';
    cardElement.style.right = '';
    cardElement.style.top = '';
    cardElement.style.bottom = '2rem';

    // Position card on the opposite side of the pin so the piece remains 100% visible
    if (x >= 50) {
      cardElement.style.left = '2rem';
      cardElement.style.right = 'auto';
    } else {
      cardElement.style.right = '2rem';
      cardElement.style.left = 'auto';
    }
  }

  attachEvents() {
    // 1. Look Tabs Switching
    this.container.addEventListener('click', (e) => {
      const tab = e.target.closest('.jc-accents-look-tab');
      if (tab) {
        const lookId = tab.dataset.lookId;
        if (lookId && lookId !== this.activeLookId) {
          this.switchLook(lookId);
        }
      }
    });

    // 2. Hotspot Pins Click
    this.container.addEventListener('click', (e) => {
      const pin = e.target.closest('[data-hotspot-id]');
      if (pin) {
        const id = pin.dataset.hotspotId;
        this.selectItem(id);
      }
    });

    // 3. Piece Card "Inspect on Model" Click
    this.container.addEventListener('click', (e) => {
      const inspectBtn = e.target.closest('[data-inspect-id]');
      const pieceCard = e.target.closest('.jc-accent-piece-card');
      if (inspectBtn) {
        this.selectItem(inspectBtn.dataset.inspectId);
      } else if (pieceCard) {
        this.selectItem(pieceCard.dataset.pieceId);
      }
    });

    // 4. Close Preview Card
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#accents-card-close-btn')) {
        const card = this.container.querySelector('#accents-preview-card');
        if (card) card.classList.remove('is-visible');
        this.container.querySelectorAll('.jc-hotspot-pin').forEach(p => p.classList.remove('is-active'));
        this.container.querySelectorAll('.jc-accent-piece-card').forEach(c => c.classList.remove('is-active'));
      }
    });

    // 5. Reserve Quick Button inside preview card
    this.container.addEventListener('click', (e) => {
      const rsvpBtn = e.target.closest('[data-rsvp-item]');
      if (rsvpBtn) {
        this.openRsvpModal(rsvpBtn.dataset.rsvpItem);
      }
    });

    // 6. Open RSVP VIP Modal
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#accents-open-rsvp-btn')) {
        this.openRsvpModal();
      }
    });
  }

  switchLook(lookId) {
    this.activeLookId = lookId;
    const items = this.getLookItems(lookId);
    this.activeHotspotId = items[0] ? items[0].id : null;

    // Smooth transition
    const stage = this.container.querySelector('#accents-interactive-stage');
    if (stage) {
      stage.classList.add('is-transitioning');
      setTimeout(() => {
        this.render();
        this.attachEvents();
        this.initTiltEffect();
      }, 150);
    } else {
      this.render();
      this.attachEvents();
      this.initTiltEffect();
    }
  }

  selectItem(itemId) {
    const item = PHASE2_ACCENTS.find(p => p.id === itemId);
    if (!item) return;

    // If item belongs to another look, switch look first
    if (item.lookId !== this.activeLookId) {
      this.activeLookId = item.lookId;
      this.activeHotspotId = item.id;
      this.render();
      this.attachEvents();
      this.initTiltEffect();
      return;
    }

    this.activeHotspotId = itemId;

    // Highlight pins
    this.container.querySelectorAll('.jc-hotspot-pin').forEach(p => {
      p.classList.toggle('is-active', p.dataset.hotspotId === itemId);
    });

    // Highlight piece cards
    this.container.querySelectorAll('.jc-accent-piece-card').forEach(c => {
      c.classList.toggle('is-active', c.dataset.pieceId === itemId);
    });

    // Update & show floating card
    const card = this.container.querySelector('#accents-preview-card');
    if (card) {
      card.innerHTML = this.renderCardContent(item);
      this.positionPreviewCard(item);
      card.classList.add('is-visible');
    }
  }

  updateDynamicPrices() {
    this.container.querySelectorAll('[data-accent-price]').forEach(el => {
      const price = parseFloat(el.dataset.accentPrice);
      if (!isNaN(price)) {
        el.textContent = store.formatPrice(price);
      }
    });
    this.container.querySelectorAll('.jc-accent-piece-card').forEach(card => {
      const id = card.dataset.pieceId;
      const item = PHASE2_ACCENTS.find(i => i.id === id);
      if (item) {
        const priceEl = card.querySelector('.jc-accent-piece-price');
        if (priceEl) priceEl.textContent = store.formatPrice(item.estimatedPrice);
      }
    });
  }

  initTiltEffect() {
    const stage = this.container.querySelector('#accents-interactive-stage');
    if (!stage || window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 4;

      stage.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1)`;
    };

    const handleMouseLeave = () => {
      stage.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);
  }

  openRsvpModal(preferredItem = null) {
    const dialog = document.getElementById('jc-rsvp-dialog');
    if (!dialog) return;

    const form = dialog.querySelector('#jc-rsvp-form');
    const confirmation = dialog.querySelector('#jc-rsvp-confirmation');

    if (form) form.style.display = 'block';
    if (confirmation) confirmation.style.display = 'none';

    if (preferredItem) {
      const subtitle = dialog.querySelector('.jc-rsvp-header p');
      if (subtitle) {
        subtitle.innerHTML = `You are reserving priority early access for: <strong>${preferredItem}</strong>. Limited allocation.`;
      }
    }

    dialog.showModal();
  }

  handleRsvpSubmit(dialog) {
    const name = dialog.querySelector('#rsvp-name')?.value || 'Valued Patron';
    const email = dialog.querySelector('#rsvp-email')?.value || '';
    const whatsapp = dialog.querySelector('#rsvp-whatsapp')?.value || '';

    const passNumber = 'JN-' + Math.floor(100000 + Math.random() * 900000);
    const vipData = { name, email, whatsapp, passNumber, timestamp: new Date().toISOString() };

    store.setVipRsvp(vipData);

    const form = dialog.querySelector('#jc-rsvp-form');
    const confirmation = dialog.querySelector('#jc-rsvp-confirmation');

    if (form) form.style.display = 'none';
    if (confirmation) {
      confirmation.style.display = 'block';
      confirmation.innerHTML = `
        <div class="jc-vip-pass-card">
          <div class="jc-vip-pass-header">
            <span class="meta-label meta-label-brass">Jaanam Private Atelier</span>
            <h4>VIP Early Access Pass</h4>
          </div>
          <div class="jc-vip-pass-body">
            <div class="jc-vip-pass-number">${passNumber}</div>
            <p class="jc-vip-pass-name">Registered to <strong>${name}</strong></p>
            <p class="jc-vip-pass-note">Invitation coordinates dispatched to <em>${email}</em>.</p>
          </div>
          <div class="jc-vip-pass-footer">
            <button type="button" class="btn-luxury btn-luxury-brass" id="rsvp-done-btn" style="width: 100%;">
              Access Priority Lookbook
            </button>
          </div>
        </div>
      `;

      confirmation.querySelector('#rsvp-done-btn')?.addEventListener('click', () => {
        dialog.close();
        this.render();
        this.attachEvents();
        showToast('VIP Early Access Confirmed. Pass #' + passNumber, 'brass');
      });
    }
  }
}
