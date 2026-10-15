/**
 * Jaanam Collection - Catalog Grid & Filter Engine
 */

import { CATEGORIES } from '../data/products.js';
import { store } from './state.js';
import { renderProductCard } from './productCard.js';
import { ICONS } from './icons.js';

export class Catalog {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.init();
  }

  init() {
    this.render();
    this.attachEvents();

    // Subscribe to state changes
    store.subscribe('category:change', () => this.updateGrid());
    store.subscribe('occasion:change', () => this.updateGrid());
    store.subscribe('currency:change', () => this.updateGrid());
    store.subscribe('sort:change', () => this.updateGrid());
    store.subscribe('search:change', () => this.updateGrid());
    store.subscribe('wishlist:change', () => this.updateWishlistButtons());
  }

  render() {
    this.container.innerHTML = `
      <div class="jc-container">
        <div class="jc-catalog-header">
          <div class="jc-catalog-intro">
            <div>
              <span class="meta-label meta-label-brass">Haute Wardrobe Catalog</span>
              <h2 id="catalog-heading">The Curated Collection</h2>
              <p style="margin-top: 0.25rem;">Hand-selected natural fabrics, architectural tailoring, and heirloom textiles.</p>
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="jc-category-filter-strip" role="tablist" aria-label="Product Categories">
            <button type="button" class="jc-cat-btn ${store.activeCategory === 'all' ? 'is-active' : ''}" data-cat-id="all">
              All Silhouettes
            </button>
            ${CATEGORIES.map(c => `
              <button type="button" class="jc-cat-btn ${store.activeCategory === c.id ? 'is-active' : ''}" data-cat-id="${c.id}">
                ${c.name}
              </button>
            `).join('')}
          </div>

          <!-- Filter & Sort Toolbar -->
          <div class="jc-filter-toolbar">
            <span class="jc-results-count" id="catalog-count-label">
              Loading collection...
            </span>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="meta-label" style="display: none;">Sort:</span>
              <select class="jc-sort-select" id="catalog-sort-select" aria-label="Sort Catalog">
                <option value="curated">Editorial Curation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Atelier Rating</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="jc-product-grid" id="catalog-product-grid" role="region" aria-label="Product Grid">
          <!-- Rendered via updateGrid() -->
        </div>
      </div>
    `;

    this.updateGrid();
  }

  updateGrid() {
    const grid = this.container.querySelector('#catalog-product-grid');
    const countLabel = this.container.querySelector('#catalog-count-label');
    const heading = this.container.querySelector('#catalog-heading');
    if (!grid) return;

    const products = store.getFilteredProducts();

    // Update Category Pills Active State
    this.container.querySelectorAll('.jc-cat-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.catId === store.activeCategory);
    });

    // Update Heading Text
    if (heading) {
      if (store.activeCategory !== 'all') {
        const cat = CATEGORIES.find(c => c.id === store.activeCategory);
        heading.textContent = cat ? cat.name : 'The Curated Collection';
      } else if (store.activeOccasion) {
        heading.textContent = `The ${store.activeOccasion.toUpperCase()} Edit`;
      } else {
        heading.textContent = 'The Curated Collection';
      }
    }

    // Update Count Label
    if (countLabel) {
      countLabel.textContent = `Showing ${products.length} bespoke ${products.length === 1 ? 'silhouette' : 'silhouettes'}`;
    }

    // Empty state
    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem;">No Silhouettes Found</h3>
          <p style="font-size: 13px; color: var(--color-text-secondary); margin: 0.5rem 0 1.5rem;">
            No items match the currently selected occasion and category filter.
          </p>
          <button type="button" class="btn-luxury-outline" id="catalog-reset-filters">
            Reset Filters
          </button>
        </div>
      `;

      const resetBtn = grid.querySelector('#catalog-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          store.setCategory('all');
          store.setOccasion(null);
        });
      }
      return;
    }

    grid.style.opacity = '0.4';
    grid.style.transform = 'translateY(4px)';
    grid.style.transition = 'opacity 0.12s ease, transform 0.12s ease';

    setTimeout(() => {
      grid.innerHTML = '';
      products.forEach((p, idx) => {
        const card = renderProductCard(p);
        card.style.animation = `jc-card-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(idx * 0.04, 0.35)}s both`;
        grid.appendChild(card);
      });
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, 70);
  }

  updateWishlistButtons() {
    const grid = this.container.querySelector('#catalog-product-grid');
    if (!grid) return;

    grid.querySelectorAll('.jc-card-wishlist').forEach(btn => {
      const pid = btn.dataset.productId;
      const isWishlisted = store.isInWishlist(pid);
      btn.classList.toggle('is-active', isWishlisted);
      btn.innerHTML = ICONS.heart('jc-wishlist-icon', isWishlisted);
    });
  }

  attachEvents() {
    // Category pill clicks
    this.container.addEventListener('click', (e) => {
      const catBtn = e.target.closest('[data-cat-id]');
      if (catBtn) {
        store.setCategory(catBtn.dataset.catId);
      }
    });

    // Sort select
    const sortSelect = this.container.querySelector('#catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        store.setSortBy(e.target.value);
      });
    }
  }
}
