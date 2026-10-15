/**
 * Jaanam Collection - Atelier Values & Global Luxury Footer
 */

import { ICONS } from './icons.js';
import { CATEGORIES } from '../data/products.js';
import { store } from './state.js';
import { showToast } from './toast.js';

export function renderAtelierValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <section class="jc-atelier-section" id="atelier-section">
      <div class="jc-container">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 3.5rem;">
          <span class="meta-label meta-label-brass">Foundational Directives</span>
          <h2>The Craftsmanship of Jaanam</h2>
          <p>We reject synthetic polyester blends, fast-fashion obsolescence, and generic mass patterns in favor of architectural purity and tactile longevity.</p>
        </div>

        <div class="jc-atelier-grid">
          <div class="jc-atelier-item">
            <span class="jc-atelier-number">01</span>
            <h3 class="jc-atelier-title">Pure Fiber Integrity</h3>
            <p class="jc-atelier-desc">
              From 120/2 double-ply Giza Egyptian cottons and Varanasi Mulberry raw silk to high-altitude Changthangi pashmina, every textile is sourced from certified heritage mills.
            </p>
          </div>

          <div class="jc-atelier-item">
            <span class="jc-atelier-number">02</span>
            <h3 class="jc-atelier-title">Architectural Silhouettes</h3>
            <p class="jc-atelier-desc">
              Precision double pleating, unlined double-faced wool construction, and hand-burnished bridle leather edges engineered to hold sculptural poise on any occasion.
            </p>
          </div>

          <div class="jc-atelier-item">
            <span class="jc-atelier-number">03</span>
            <h3 class="jc-atelier-title">Generational Artisans</h3>
            <p class="jc-atelier-desc">
              Hand-tilla embroidery by master Kashmiri guilds, brass casting by fourth-generation Jaipur metal smiths, and tailoring finished in Porto, London, and New Delhi.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFooter(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <footer class="jc-footer" role="contentinfo">
      <div class="jc-container">
        <div class="jc-footer-grid">
          <!-- Col 1: Brand & Atelier Presence -->
          <div class="jc-footer-brand">
            <span class="jc-footer-logo">JAANAM</span>
            <p class="jc-footer-tagline">
              Haute wardrobe atelier crafting essential silhouettes for the discerning patron. Balancing everyday comfort, executive discipline, and ceremonial luxury.
            </p>
            <div style="display: flex; gap: 1.5rem; margin-top: 0.5rem; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-accent-brass);">
              <span>London</span> • <span>Mumbai</span> • <span>Dubai</span>
            </div>
          </div>

          <!-- Col 2: Collections Directory -->
          <div>
            <h4 class="jc-footer-col-title">Collections</h4>
            <ul class="jc-footer-list">
              ${CATEGORIES.map(c => `
                <li>
                  <a href="#catalog-section" class="jc-footer-link" data-footer-cat="${c.id}">
                    ${c.name}
                  </a>
                </li>
              `).join('')}
              <li>
                <a href="#accents-section" class="jc-footer-link">
                  Phase 02 Accents Preview
                </a>
              </li>
            </ul>
          </div>

          <!-- Col 3: Client Care & Atelier Services -->
          <div>
            <h4 class="jc-footer-col-title">Client Services</h4>
            <ul class="jc-footer-list">
              <li><a href="#drape-studio-section" class="jc-footer-link">The Runway & Drape Studio</a></li>
              <li><a href="#" class="jc-footer-link" id="footer-consultation-link">Private Fitting Consultation</a></li>
              <li><a href="#" class="jc-footer-link" id="footer-shipping-link">Complimentary Shipping & Duties</a></li>
              <li><a href="#" class="jc-footer-link" id="footer-care-link">Garment Preservation Guide</a></li>
              <li><a href="#" class="jc-footer-link" id="footer-cod-link">Cash on Delivery Policy</a></li>
            </ul>
          </div>

          <!-- Col 4: Atelier Dispatch & VIP Journal -->
          <div>
            <h4 class="jc-footer-col-title">The Atelier Journal</h4>
            <p style="font-size: 12px; color: rgba(251, 249, 245, 0.7); line-height: 1.6;">
              Receive confidential lookbook invitations, private seasonal drops, and master tailoring notes.
            </p>
            <form id="footer-newsletter-form" class="jc-newsletter-form">
              <input type="email" class="jc-newsletter-input" id="footer-email-input" placeholder="Your email address" required aria-label="Email for Atelier Journal" />
              <button type="submit" class="btn-luxury btn-luxury-brass" style="padding: 0.75rem 1.25rem;">
                Join
              </button>
            </form>
            <div style="font-size: 10px; color: rgba(251, 249, 245, 0.45); margin-top: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;">
              Privilege code delivered instantly upon sign-up.
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="jc-footer-bottom">
          <div>
            © 2026 JAANAM COLLECTION ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div class="jc-footer-badges">
            <span>Complimentary Global Delivery</span>
            <span>•</span>
            <span>Carbon-Neutral Dispatch</span>
            <span>•</span>
            <span>Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Attach events
  container.addEventListener('click', (e) => {
    const catLink = e.target.closest('[data-footer-cat]');
    if (catLink) {
      const catId = catLink.dataset.footerCat;
      store.setCategory(catId);
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const newsletterForm = container.querySelector('#footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#footer-email-input');
      const email = input ? input.value.trim() : '';
      if (email) {
        showToast({
          title: 'Welcome to Jaanam Atelier',
          message: `Privilege code JAANAM10 assigned to ${email}.`,
          type: 'success'
        });
        if (input) input.value = '';
      }
    });
  }
}
