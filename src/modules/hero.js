/**
 * Jaanam Collection - Hero Editorial Section
 */

import { OCCASIONS } from '../data/products.js';
import { ICONS } from './icons.js';

export function renderHeroSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const defaultOccasion = OCCASIONS.EXECUTIVE;

  container.innerHTML = `
    <section class="jc-hero" id="hero-section">
      <div class="jc-hero-bg">
        <img src="${defaultOccasion.heroImage}" alt="Jaanam Collection Editorial Hero" loading="eager" width="1920" height="1080" />
      </div>
      <div class="jc-hero-overlay"></div>

      <div class="jc-container" style="width: 100%;">
        <div class="jc-hero-content">
          <div class="jc-hero-badge">
            ${ICONS.sparkle('icon-micro')}
            <span>${defaultOccasion.heroBadge}</span>
          </div>
          <h1 class="jc-hero-title">${defaultOccasion.heroTitle}</h1>
          <p class="jc-hero-subtitle">${defaultOccasion.tagline}</p>
          <div class="jc-hero-actions">
            <a href="#catalog-section" class="btn-luxury jc-hero-btn-primary">
              ${defaultOccasion.ctaText}
            </a>
            <a href="#drape-studio-section" class="btn-luxury jc-hero-btn-secondary">
              Atelier Runway Studio ${ICONS.arrowRight()}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
