/**
 * Jaanam Collection - Fullscreen Luxury Search Overlay
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { PRODUCTS } from '../data/products.js';
import { openPdpModal } from './productDetail.js';

let searchOverlayEl = null;

export function initSearchOverlay() {
  createSearchElements();
  attachEvents();
}

function createSearchElements() {
  searchOverlayEl = document.createElement('div');
  searchOverlayEl.className = 'jc-search-overlay';
  searchOverlayEl.id = 'search-overlay';
  searchOverlayEl.setAttribute('role', 'dialog');
  searchOverlayEl.setAttribute('aria-label', 'Search Collection');

  const popularTags = ['Raw Silk', 'Double-Breasted', 'Cashmere', 'Kurta Sets', 'Italian Leather', 'Selvedge Denim', 'Overcoats'];

  searchOverlayEl.innerHTML = `
    <div class="jc-search-top">
      <span class="meta-label meta-label-brass">Atelier Search</span>
      <button type="button" class="jc-action-btn" id="search-close-btn" aria-label="Close Search">
        ${ICONS.close()}
      </button>
    </div>

    <div class="jc-search-input-wrap">
      <input type="text" class="jc-search-input" id="search-main-input" placeholder="Search silhouettes, fabrics, occasions..." autocomplete="off" />
    </div>

    <div class="jc-search-tags">
      <span class="meta-label" style="margin-right: 0.5rem;">Editorial Tags:</span>
      ${popularTags.map(tag => `
        <button type="button" class="jc-search-tag-chip" data-search-tag="${tag}">${tag}</button>
      `).join('')}
    </div>

    <div class="jc-search-results-grid" id="search-results-grid">
      <!-- Live results injected here -->
    </div>
  `;

  document.body.appendChild(searchOverlayEl);
}

export function openSearchOverlay() {
  if (searchOverlayEl) {
    searchOverlayEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const input = searchOverlayEl.querySelector('#search-main-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
      renderSearchResults('');
    }
  }
}

export function closeSearchOverlay() {
  if (searchOverlayEl) {
    searchOverlayEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function renderSearchResults(query) {
  const grid = searchOverlayEl.querySelector('#search-results-grid');
  if (!grid) return;

  const q = query.trim().toLowerCase();
  const results = q ? PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.subCategory.toLowerCase().includes(q) ||
    p.details.fabric.toLowerCase().includes(q)
  ) : PRODUCTS.slice(0, 4); // show 4 curated pieces by default

  if (results.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 0;">
        <h4 style="font-family: var(--font-serif); font-size: 1.5rem;">No Silhouettes Matched "${query}"</h4>
        <p style="font-size: 13px; color: var(--color-text-secondary); margin-top: 0.5rem;">
          Try searching for "Cashmere", "Raw Silk", "Blazer", or "Italian Leather".
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = results.map(p => `
    <div class="jc-product-card" style="cursor: pointer;" data-search-pid="${p.id}">
      <div class="jc-card-media">
        <img src="${p.images[0]}" alt="${p.name}" width="300" height="400" />
      </div>
      <div class="jc-card-body" style="padding: 1rem;">
        <span class="jc-card-category">${p.subCategory}</span>
        <h4 class="jc-card-title" style="font-size: 1.1rem;">${p.name}</h4>
        <div style="margin-top: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          ${store.formatPrice(p.price)}
        </div>
      </div>
    </div>
  `).join('');
}

function attachEvents() {
  const closeBtn = searchOverlayEl.querySelector('#search-close-btn');
  closeBtn.addEventListener('click', closeSearchOverlay);

  const input = searchOverlayEl.querySelector('#search-main-input');
  input.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  // Tag clicks
  searchOverlayEl.addEventListener('click', (e) => {
    const tagBtn = e.target.closest('[data-search-tag]');
    if (tagBtn) {
      const tag = tagBtn.dataset.searchTag;
      input.value = tag;
      renderSearchResults(tag);
      return;
    }

    const card = e.target.closest('[data-search-pid]');
    if (card) {
      const pid = card.dataset.searchPid;
      const product = PRODUCTS.find(p => p.id === pid);
      if (product) {
        closeSearchOverlay();
        openPdpModal(product);
      }
      return;
    }
  });

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlayEl.classList.contains('is-open')) {
      closeSearchOverlay();
    }
  });
}
