/**
 * Jaanam Collection - Feature 1: "The Capsule Wardrobe" Builder
 * Interactive Split-Canvas Mix & Match Dressing Tool
 */

import { PRODUCTS } from '../data/products.js';
import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

export class CapsuleBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Filter products into layer pools
    this.topLayers = PRODUCTS.filter(p => p.capsuleType === 'top' || p.capsuleType === 'outerwear');
    this.bottomLayers = PRODUCTS.filter(p => p.capsuleType === 'bottom' || p.capsuleType === 'bag');

    this.topIndex = 0;
    this.bottomIndex = 0;

    this.selectedTopSize = 'M';
    this.selectedTopColor = null;

    this.selectedBottomSize = 'M';
    this.selectedBottomColor = null;

    this.init();
  }

  init() {
    this.syncCurrentSelections();
    this.render();
    this.attachEvents();

    // Subscribe to currency change to recalculate HUD
    store.subscribe('currency:change', () => this.updateHUD());
  }

  syncCurrentSelections() {
    const top = this.topLayers[this.topIndex];
    if (top) {
      this.selectedTopSize = top.sizes && top.sizes[0] ? top.sizes[0].size : 'M';
      this.selectedTopColor = top.colors && top.colors[0] ? top.colors[0].name : 'Default';
    }

    const bottom = this.bottomLayers[this.bottomIndex];
    if (bottom) {
      this.selectedBottomSize = bottom.sizes && bottom.sizes[0] ? bottom.sizes[0].size : 'M';
      this.selectedBottomColor = bottom.colors && bottom.colors[0] ? bottom.colors[0].name : 'Default';
    }
  }

  render() {
    const top = this.topLayers[this.topIndex];
    const bottom = this.bottomLayers[this.bottomIndex];

    this.container.innerHTML = `
      <div class="jc-container">
        <div class="jc-capsule-intro">
          <span class="meta-label meta-label-brass">Signature Interactive Atelier</span>
          <h2>The Capsule Wardrobe Builder</h2>
          <p>Pair architectural tops and outer layers with sculpted bottoms and artisanal carry. Curate your complete signature look with live synchronized pricing.</p>
        </div>

        <div class="jc-capsule-canvas-wrapper">
          <div class="jc-capsule-split-grid">
            <!-- LEFT CANVAS: Top & Outerwear Layer -->
            <div class="jc-capsule-panel" id="capsule-top-panel">
              <div class="jc-capsule-panel-header">
                <span class="jc-capsule-layer-badge">Layer 01 — Top & Outerwear</span>
                <div class="jc-capsule-category-switch">
                  <button type="button" class="jc-capsule-cat-tab is-active" data-filter-top="all">All Tops</button>
                  <button type="button" class="jc-capsule-cat-tab" data-filter-top="shirts">Tailoring</button>
                  <button type="button" class="jc-capsule-cat-tab" data-filter-top="outerwear">Coats</button>
                </div>
              </div>

              <div class="jc-capsule-visual-stage">
                <button type="button" class="jc-capsule-arrow jc-capsule-arrow-prev" id="capsule-prev-top" aria-label="Previous Top Piece">
                  ${ICONS.arrowLeft()}
                </button>
                <img src="${top.images[0]}" alt="${top.name}" class="jc-capsule-img" id="capsule-img-top" width="600" height="800" />
                <button type="button" class="jc-capsule-arrow jc-capsule-arrow-next" id="capsule-next-top" aria-label="Next Top Piece">
                  ${ICONS.arrowRight()}
                </button>
                <div class="jc-capsule-index-indicator" id="capsule-ind-top">
                  ${this.topIndex + 1} / ${this.topLayers.length}
                </div>
              </div>

              <div class="jc-capsule-specs">
                <div class="jc-capsule-title-row">
                  <h3 class="jc-capsule-item-title" id="capsule-title-top">${top.name}</h3>
                  <span class="jc-capsule-item-price" id="capsule-price-top">${store.formatPrice(top.price)}</span>
                </div>
                <p class="jc-capsule-item-fabric" id="capsule-fabric-top">${top.details.fabric}</p>

                <div class="jc-capsule-swatch-row">
                  <div class="jc-capsule-swatches" id="capsule-swatches-top">
                    ${top.colors.map(c => `
                      <button type="button" class="jc-capsule-color-chip ${c.name === this.selectedTopColor ? 'is-selected' : ''}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name}" 
                        data-top-color="${c.name}">
                      </button>
                    `).join('')}
                  </div>
                  <div class="jc-capsule-sizes" id="capsule-sizes-top">
                    ${top.sizes.slice(0, 4).map(s => `
                      <button type="button" class="jc-capsule-size-chip ${s.size === this.selectedTopSize ? 'is-selected' : ''}" 
                        data-top-size="${s.size}">
                        ${s.size}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT CANVAS: Bottom & Carry Layer -->
            <div class="jc-capsule-panel" id="capsule-bottom-panel">
              <div class="jc-capsule-panel-header">
                <span class="jc-capsule-layer-badge">Layer 02 — Bottom & Carry</span>
                <div class="jc-capsule-category-switch">
                  <button type="button" class="jc-capsule-cat-tab is-active" data-filter-bottom="all">All Bottoms</button>
                  <button type="button" class="jc-capsule-cat-tab" data-filter-bottom="trousers">Trousers</button>
                  <button type="button" class="jc-capsule-cat-tab" data-filter-bottom="bags">Carry</button>
                </div>
              </div>

              <div class="jc-capsule-visual-stage">
                <button type="button" class="jc-capsule-arrow jc-capsule-arrow-prev" id="capsule-prev-bottom" aria-label="Previous Bottom Piece">
                  ${ICONS.arrowLeft()}
                </button>
                <img src="${bottom.images[0]}" alt="${bottom.name}" class="jc-capsule-img" id="capsule-img-bottom" width="600" height="800" />
                <button type="button" class="jc-capsule-arrow jc-capsule-arrow-next" id="capsule-next-bottom" aria-label="Next Bottom Piece">
                  ${ICONS.arrowRight()}
                </button>
                <div class="jc-capsule-index-indicator" id="capsule-ind-bottom">
                  ${this.bottomIndex + 1} / ${this.bottomLayers.length}
                </div>
              </div>

              <div class="jc-capsule-specs">
                <div class="jc-capsule-title-row">
                  <h3 class="jc-capsule-item-title" id="capsule-title-bottom">${bottom.name}</h3>
                  <span class="jc-capsule-item-price" id="capsule-price-bottom">${store.formatPrice(bottom.price)}</span>
                </div>
                <p class="jc-capsule-item-fabric" id="capsule-fabric-bottom">${bottom.details.fabric}</p>

                <div class="jc-capsule-swatch-row">
                  <div class="jc-capsule-swatches" id="capsule-swatches-bottom">
                    ${bottom.colors.map(c => `
                      <button type="button" class="jc-capsule-color-chip ${c.name === this.selectedBottomColor ? 'is-selected' : ''}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name}" 
                        data-bottom-color="${c.name}">
                      </button>
                    `).join('')}
                  </div>
                  <div class="jc-capsule-sizes" id="capsule-sizes-bottom">
                    ${bottom.sizes.slice(0, 4).map(s => `
                      <button type="button" class="jc-capsule-size-chip ${s.size === this.selectedBottomSize ? 'is-selected' : ''}" 
                        data-bottom-size="${s.size}">
                        ${s.size}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SYNCHRONIZED CAPSULE HUD (Price & Single Action) -->
          <div class="jc-capsule-hud">
            <div class="jc-capsule-hud-note">
              <span class="jc-capsule-synergy-badge">
                ${ICONS.sparkle('icon-micro')} Curated Pairing
              </span>
              <p class="jc-capsule-hud-text" id="capsule-synergy-text">
                Harmonious tonal architecture with organic hand-finished texture.
              </p>
            </div>

            <div class="jc-capsule-hud-actions">
              <button type="button" class="jc-btn-shuffle" id="capsule-btn-shuffle" title="Randomize Look">
                ${ICONS.rotate()} Shuffle Look
              </button>
              <div class="jc-capsule-total-group">
                <span class="jc-capsule-total-label">Combined Curation Total</span>
                <div class="jc-capsule-total-price" id="capsule-total-price">
                  ${store.formatPrice(top.price + bottom.price)}
                </div>
              </div>
              <button type="button" class="btn-luxury btn-luxury-brass" id="capsule-add-bundle">
                ${ICONS.bag()} Add Complete Look to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Navigation for Top Piece
    const prevTop = this.container.querySelector('#capsule-prev-top');
    const nextTop = this.container.querySelector('#capsule-next-top');
    if (prevTop && nextTop) {
      prevTop.addEventListener('click', () => this.navigateTop(-1));
      nextTop.addEventListener('click', () => this.navigateTop(1));
    }

    // Navigation for Bottom Piece
    const prevBottom = this.container.querySelector('#capsule-prev-bottom');
    const nextBottom = this.container.querySelector('#capsule-next-bottom');
    if (prevBottom && nextBottom) {
      prevBottom.addEventListener('click', () => this.navigateBottom(-1));
      nextBottom.addEventListener('click', () => this.navigateBottom(1));
    }

    // Shuffle Look
    const shuffleBtn = this.container.querySelector('#capsule-btn-shuffle');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => this.shuffleLook());
    }

    // Add Bundle to Bag
    const addBundleBtn = this.container.querySelector('#capsule-add-bundle');
    if (addBundleBtn) {
      addBundleBtn.addEventListener('click', () => this.addBundleToBag());
    }

    // Swatches and Sizes delegates
    this.container.addEventListener('click', (e) => {
      const topColorBtn = e.target.closest('[data-top-color]');
      if (topColorBtn) {
        this.selectedTopColor = topColorBtn.dataset.topColor;
        this.container.querySelectorAll('[data-top-color]').forEach(b => b.classList.remove('is-selected'));
        topColorBtn.classList.add('is-selected');
      }

      const topSizeBtn = e.target.closest('[data-top-size]');
      if (topSizeBtn) {
        this.selectedTopSize = topSizeBtn.dataset.topSize;
        this.container.querySelectorAll('[data-top-size]').forEach(b => b.classList.remove('is-selected'));
        topSizeBtn.classList.add('is-selected');
      }

      const bottomColorBtn = e.target.closest('[data-bottom-color]');
      if (bottomColorBtn) {
        this.selectedBottomColor = bottomColorBtn.dataset.bottomColor;
        this.container.querySelectorAll('[data-bottom-color]').forEach(b => b.classList.remove('is-selected'));
        bottomColorBtn.classList.add('is-selected');
      }

      const bottomSizeBtn = e.target.closest('[data-bottom-size]');
      if (bottomSizeBtn) {
        this.selectedBottomSize = bottomSizeBtn.dataset.bottomSize;
        this.container.querySelectorAll('[data-bottom-size]').forEach(b => b.classList.remove('is-selected'));
        bottomSizeBtn.classList.add('is-selected');
      }
    });
  }

  navigateTop(delta) {
    const total = this.topLayers.length;
    this.topIndex = (this.topIndex + delta + total) % total;
    this.syncCurrentSelections();
    this.updateTopView();
    this.updateHUD();
  }

  navigateBottom(delta) {
    const total = this.bottomLayers.length;
    this.bottomIndex = (this.bottomIndex + delta + total) % total;
    this.syncCurrentSelections();
    this.updateBottomView();
    this.updateHUD();
  }

  shuffleLook() {
    this.topIndex = Math.floor(Math.random() * this.topLayers.length);
    this.bottomIndex = Math.floor(Math.random() * this.bottomLayers.length);
    this.syncCurrentSelections();
    this.updateTopView();
    this.updateBottomView();
    this.updateHUD();

    showToast({
      title: 'Curated Pair Shuffled',
      message: 'New architectural silhouette generated for your capsule.',
      type: 'info'
    });
  }

  updateTopView() {
    const top = this.topLayers[this.topIndex];
    if (!top) return;

    const img = this.container.querySelector('#capsule-img-top');
    const title = this.container.querySelector('#capsule-title-top');
    const price = this.container.querySelector('#capsule-price-top');
    const fabric = this.container.querySelector('#capsule-fabric-top');
    const ind = this.container.querySelector('#capsule-ind-top');
    const swatches = this.container.querySelector('#capsule-swatches-top');
    const sizes = this.container.querySelector('#capsule-sizes-top');

    if (img) {
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = top.images[0];
        img.alt = top.name;
        img.style.opacity = '1';
      }, 150);
    }
    if (title) title.textContent = top.name;
    if (price) price.textContent = store.formatPrice(top.price);
    if (fabric) fabric.textContent = top.details.fabric;
    if (ind) ind.textContent = `${this.topIndex + 1} / ${this.topLayers.length}`;

    if (swatches) {
      swatches.innerHTML = top.colors.map(c => `
        <button type="button" class="jc-capsule-color-chip ${c.name === this.selectedTopColor ? 'is-selected' : ''}" 
          style="background-color: ${c.hex};" 
          title="${c.name}" 
          data-top-color="${c.name}">
        </button>
      `).join('');
    }

    if (sizes) {
      sizes.innerHTML = top.sizes.slice(0, 4).map(s => `
        <button type="button" class="jc-capsule-size-chip ${s.size === this.selectedTopSize ? 'is-selected' : ''}" 
          data-top-size="${s.size}">
          ${s.size}
        </button>
      `).join('');
    }
  }

  updateBottomView() {
    const bottom = this.bottomLayers[this.bottomIndex];
    if (!bottom) return;

    const img = this.container.querySelector('#capsule-img-bottom');
    const title = this.container.querySelector('#capsule-title-bottom');
    const price = this.container.querySelector('#capsule-price-bottom');
    const fabric = this.container.querySelector('#capsule-fabric-bottom');
    const ind = this.container.querySelector('#capsule-ind-bottom');
    const swatches = this.container.querySelector('#capsule-swatches-bottom');
    const sizes = this.container.querySelector('#capsule-sizes-bottom');

    if (img) {
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = bottom.images[0];
        img.alt = bottom.name;
        img.style.opacity = '1';
      }, 150);
    }
    if (title) title.textContent = bottom.name;
    if (price) price.textContent = store.formatPrice(bottom.price);
    if (fabric) fabric.textContent = bottom.details.fabric;
    if (ind) ind.textContent = `${this.bottomIndex + 1} / ${this.bottomLayers.length}`;

    if (swatches) {
      swatches.innerHTML = bottom.colors.map(c => `
        <button type="button" class="jc-capsule-color-chip ${c.name === this.selectedBottomColor ? 'is-selected' : ''}" 
          style="background-color: ${c.hex};" 
          title="${c.name}" 
          data-bottom-color="${c.name}">
        </button>
      `).join('');
    }

    if (sizes) {
      sizes.innerHTML = bottom.sizes.slice(0, 4).map(s => `
        <button type="button" class="jc-capsule-size-chip ${s.size === this.selectedBottomSize ? 'is-selected' : ''}" 
          data-bottom-size="${s.size}">
          ${s.size}
        </button>
      `).join('');
    }
  }

  updateHUD() {
    const top = this.topLayers[this.topIndex];
    const bottom = this.bottomLayers[this.bottomIndex];
    if (!top || !bottom) return;

    const totalEl = this.container.querySelector('#capsule-total-price');
    if (totalEl) {
      totalEl.textContent = store.formatPrice(top.price + bottom.price);
    }

    const priceTop = this.container.querySelector('#capsule-price-top');
    if (priceTop) priceTop.textContent = store.formatPrice(top.price);

    const priceBottom = this.container.querySelector('#capsule-price-bottom');
    if (priceBottom) priceBottom.textContent = store.formatPrice(bottom.price);

    // Dynamic Editorial Styling Synergy
    const synergyText = this.container.querySelector('#capsule-synergy-text');
    if (synergyText) {
      const synergies = [
        "Architectural monochrome discipline with subtle artisanal texture.",
        "Refined contrast between crisp structured tailoring and fluid drape.",
        "Warm understated palette tailored for effortless day-to-evening transition.",
        "Precision silhouette engineered for timeless tactile comfort."
      ];
      const noteIdx = (this.topIndex + this.bottomIndex) % synergies.length;
      synergyText.textContent = synergies[noteIdx];
    }
  }

  addBundleToBag() {
    const top = this.topLayers[this.topIndex];
    const bottom = this.bottomLayers[this.bottomIndex];
    if (!top || !bottom) return;

    store.addBundleToCart([
      { product: top, size: this.selectedTopSize, color: this.selectedTopColor },
      { product: bottom, size: this.selectedBottomSize, color: this.selectedBottomColor }
    ]);

    showToast({
      title: 'Complete Capsule Look Added',
      message: `${top.name} and ${bottom.name} placed in your bag.`,
      type: 'bag'
    });
  }
}
