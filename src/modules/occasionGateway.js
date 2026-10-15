/**
 * Jaanam Collection - Feature 2: "Occasion-Based Styling" Gateway
 * Instant Lifestyle Curation & Zero-Reload Transition Engine
 */

import { OCCASIONS, PRODUCTS } from '../data/products.js';
import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

export class OccasionGateway {
  constructor(barContainerId, manifestoContainerId, heroContainerId) {
    this.barContainer = document.getElementById(barContainerId);
    this.manifestoContainer = document.getElementById(manifestoContainerId);
    this.heroContainer = document.getElementById(heroContainerId);

    if (this.barContainer) {
      this.init();
    }
  }

  init() {
    this.renderBar();
    this.renderManifesto();
    this.updateHero(store.activeOccasion);
    this.attachEvents();

    store.subscribe('occasion:change', (occasionKey) => {
      this.onOccasionChanged(occasionKey);
    });
  }

  renderBar() {
    if (!this.barContainer) return;

    const activeOcc = store.activeOccasion;
    const modes = Object.values(OCCASIONS);

    this.barContainer.innerHTML = `
      <div class="jc-container">
        <div class="jc-occasion-wrapper">
          <div class="jc-occasion-label">
            <span class="meta-label meta-label-brass">${ICONS.sparkle('icon-micro')} Curated Occasions:</span>
          </div>
          <div class="jc-occasion-modes" role="tablist" aria-label="Occasion styling modes">
            ${modes.map(mode => {
              const count = PRODUCTS.filter(p => p.occasions && p.occasions.includes(mode.id)).length;
              const isActive = mode.id === activeOcc;
              return `
                <button type="button" 
                  role="tab"
                  class="jc-occasion-tab ${isActive ? 'is-active' : ''}" 
                  data-occasion-id="${mode.id}"
                  aria-selected="${isActive}">
                  <span class="jc-occasion-tab-name">${mode.label}</span>
                  <span class="jc-occasion-count">(${count})</span>
                </button>
              `;
            }).join('')}
            <button type="button" 
              role="tab"
              class="jc-occasion-tab ${!activeOcc ? 'is-active' : ''}" 
              data-occasion-id=""
              aria-selected="${!activeOcc}">
              <span class="jc-occasion-tab-name">All Creations</span>
              <span class="jc-occasion-count">(${PRODUCTS.length})</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderManifesto() {
    if (!this.manifestoContainer) return;

    const currentKey = store.activeOccasion;
    if (!currentKey) {
      this.manifestoContainer.style.display = 'none';
      return;
    }

    const currentMode = Object.values(OCCASIONS).find(m => m.id === currentKey);
    if (!currentMode) {
      this.manifestoContainer.style.display = 'none';
      return;
    }

    this.manifestoContainer.style.display = 'block';
    this.manifestoContainer.innerHTML = `
      <div class="jc-container">
        <div class="jc-manifesto-inner">
          <p class="jc-manifesto-text">
            "${currentMode.description}"
          </p>
          <div class="jc-manifesto-cta">
            <button type="button" class="btn-luxury-outline" id="occasion-view-catalog-btn">
              Explore Curation ${ICONS.arrowRight()}
            </button>
          </div>
        </div>
      </div>
    `;

    const ctaBtn = this.manifestoContainer.querySelector('#occasion-view-catalog-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const catalogEl = document.getElementById('catalog-section');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  updateHero(occasionKey) {
    if (!this.heroContainer) return;

    const mode = occasionKey 
      ? Object.values(OCCASIONS).find(m => m.id === occasionKey) 
      : OCCASIONS.EXECUTIVE;

    const heroImg = this.heroContainer.querySelector('.jc-hero-bg img');
    const heroBadge = this.heroContainer.querySelector('.jc-hero-badge span, .jc-hero-kicker span');
    const heroTitle = this.heroContainer.querySelector('.jc-hero-title');
    const heroSubtitle = this.heroContainer.querySelector('.jc-hero-subtitle');
    const heroCta = this.heroContainer.querySelector('.jc-hero-btn-primary');

    if (heroImg && mode) {
      heroImg.style.opacity = '0.3';
      heroImg.style.transform = 'scale(1.03)';
      setTimeout(() => {
        heroImg.src = mode.heroImage;
        heroImg.onload = () => {
          heroImg.style.opacity = '1';
          heroImg.style.transform = 'scale(1)';
        };
      }, 150);
    }

    if (heroBadge && mode) heroBadge.textContent = mode.heroBadge;
    if (heroTitle && mode) heroTitle.textContent = mode.heroTitle;
    if (heroSubtitle && mode) heroSubtitle.textContent = mode.tagline;
    if (heroCta && mode) heroCta.textContent = mode.ctaText;
  }

  attachEvents() {
    if (!this.barContainer) return;

    this.barContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-occasion-id]');
      if (pill) {
        const occId = pill.dataset.occasionId || null;
        store.setOccasion(occId);
        
        const modeName = occId 
          ? Object.values(OCCASIONS).find(m => m.id === occId)?.label 
          : 'Full Atelier';

        showToast({
          title: 'Curated Occasion Active',
          message: `Switched catalog curation to ${modeName}.`,
          type: 'info'
        });
      }
    });
  }

  onOccasionChanged(occasionKey) {
    this.renderBar();
    this.renderManifesto();
    this.updateHero(occasionKey);
  }
}
