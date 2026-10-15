/**
 * Jaanam Collection - Wishlist Slide-Over Drawer
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

let drawerEl = null;
let backdropEl = null;

export function initWishlistDrawer() {
  createWishlistElements();
  attachEvents();

  store.subscribe('wishlist:change', () => {
    updateWishlistUI();
  });
}

function createWishlistElements() {
  backdropEl = document.createElement('div');
  backdropEl.className = 'jc-overlay-backdrop';
  backdropEl.id = 'wishlist-backdrop';
  document.body.appendChild(backdropEl);

  drawerEl = document.createElement('aside');
  drawerEl.className = 'jc-drawer';
  drawerEl.id = 'wishlist-drawer';
  drawerEl.setAttribute('aria-label', 'Saved Pieces Wishlist');
  drawerEl.setAttribute('role', 'dialog');
  document.body.appendChild(drawerEl);

  updateWishlistUI();
}

export function openWishlistDrawer() {
  if (drawerEl && backdropEl) {
    drawerEl.classList.add('is-open');
    backdropEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
}

export function closeWishlistDrawer() {
  if (drawerEl && backdropEl) {
    drawerEl.classList.remove('is-open');
    backdropEl.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
}

function updateWishlistUI() {
  if (!drawerEl) return;

  const products = store.getWishlistProducts();

  drawerEl.innerHTML = `
    <div class="jc-drawer-header">
      <h3 class="jc-drawer-title">
        Saved Pieces
        <span class="jc-drawer-count">(${products.length})</span>
      </h3>
      <button type="button" class="jc-drawer-close" id="wishlist-drawer-close-btn" aria-label="Close Wishlist">
        ${ICONS.close()}
      </button>
    </div>

    <div class="jc-drawer-body">
      ${products.length === 0 ? `
        <div class="jc-cart-empty">
          <h4>No Saved Pieces</h4>
          <p style="margin-bottom: 1.5rem;">Save your favorite wardrobe essentials to revisit or add to your bag later.</p>
          <button type="button" class="btn-luxury-outline" id="wishlist-explore-btn">
            Explore Collection
          </button>
        </div>
      ` : products.map(product => `
        <div class="jc-cart-item">
          <div class="jc-cart-item-img">
            <img src="${product.images[0]}" alt="${product.name}" width="160" height="213" />
          </div>
          <div class="jc-cart-item-details">
            <h4 class="jc-cart-item-title">${product.name}</h4>
            <span class="jc-cart-item-meta">${product.subCategory}</span>
            <div style="margin-top: 0.5rem;">
              <button type="button" class="btn-luxury" style="padding: 0.4rem 0.8rem; font-size: 10px;" data-wishlist-add-bag="${product.id}">
                ${ICONS.bag('icon-micro')} Move to Bag
              </button>
            </div>
          </div>
          <div class="jc-cart-item-end">
            <span class="jc-cart-item-price">${store.formatPrice(product.price)}</span>
            <button type="button" class="jc-cart-item-remove" data-wishlist-remove="${product.id}">
              Remove
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function attachEvents() {
  backdropEl.addEventListener('click', closeWishlistDrawer);

  drawerEl.addEventListener('click', (e) => {
    if (e.target.closest('#wishlist-drawer-close-btn')) {
      closeWishlistDrawer();
      return;
    }

    if (e.target.closest('#wishlist-explore-btn')) {
      closeWishlistDrawer();
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Move to bag
    const moveBtn = e.target.closest('[data-wishlist-add-bag]');
    if (moveBtn) {
      const pid = moveBtn.dataset.wishlistAddBag;
      const product = store.getWishlistProducts().find(p => p.id === pid);
      if (product) {
        store.addToCart(product, 'M', product.colors[0]?.name || 'Default', 1);
        store.toggleWishlist(pid);
        showToast({
          title: 'Moved to Bag',
          message: `${product.name} added to your bag.`,
          type: 'bag'
        });
      }
      return;
    }

    // Remove from wishlist
    const removeBtn = e.target.closest('[data-wishlist-remove]');
    if (removeBtn) {
      const pid = removeBtn.dataset.wishlistRemove;
      store.toggleWishlist(pid);
      return;
    }
  });
}
