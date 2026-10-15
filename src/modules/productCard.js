/**
 * Jaanam Collection - Product Card Component
 * High-Fashion Editorial Card with 3:4 Portrait Ratio & Hover Crossfade
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { openPdpModal } from './productDetail.js';

export function renderProductCard(product) {
  const isWishlisted = store.isInWishlist(product.id);
  const formattedPrice = store.formatPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? store.formatPrice(product.originalPrice) : null;
  const primaryImg = product.images[0];
  const secondaryImg = product.images[1] || product.images[0];

  const card = document.createElement('article');
  card.className = 'jc-product-card';
  card.dataset.productId = product.id;

  card.innerHTML = `
    <div class="jc-card-media" role="button" tabindex="0" aria-label="View details for ${product.name}">
      ${product.badge ? `<span class="jc-card-badge">${product.badge}</span>` : ''}
      <button class="jc-card-wishlist ${isWishlisted ? 'is-active' : ''}" aria-label="Add to Wishlist" data-product-id="${product.id}">
        ${ICONS.heart('jc-wishlist-icon', isWishlisted)}
      </button>
      <img src="${primaryImg}" alt="${product.name}" class="jc-img-primary" loading="lazy" width="600" height="800" />
      <img src="${secondaryImg}" alt="${product.name} alternate view" class="jc-img-secondary" loading="lazy" width="600" height="800" />
      <div class="jc-card-quick-add">
        <button type="button" class="jc-btn-quick-add" data-quick-add="${product.id}">
          Quick View / Select Size
        </button>
      </div>
    </div>
    <div class="jc-card-body flex flex-col h-full justify-between">
      <div class="jc-card-info-top">
        <span class="jc-card-category">${product.subCategory}</span>
        <h3 class="jc-card-title" role="button" tabindex="0">${product.name}</h3>
        <p class="jc-card-subtitle">${product.subtitle}</p>
      </div>
      <div class="jc-card-footer">
        <div class="jc-card-price-group">
          <span class="jc-card-price">${formattedPrice}</span>
          ${formattedOriginalPrice ? `<span class="jc-card-original-price">${formattedOriginalPrice}</span>` : ''}
        </div>
        ${product.colors && product.colors.length > 0 ? `
          <div class="jc-card-swatches" title="${product.colors.map(c => c.name).join(', ')}">
            ${product.colors.slice(0, 3).map(c => `
              <span class="jc-card-swatch-dot" style="background-color: ${c.hex};"></span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach event listeners
  const mediaEl = card.querySelector('.jc-card-media');
  const titleEl = card.querySelector('.jc-card-title');
  const openPdp = () => openPdpModal(product);

  mediaEl.addEventListener('click', (e) => {
    // If clicked on wishlist or quick-add, don't trigger PDP
    if (e.target.closest('.jc-card-wishlist') || e.target.closest('.jc-card-quick-add')) return;
    openPdp();
  });
  titleEl.addEventListener('click', openPdp);

  // Wishlist button
  const wishlistBtn = card.querySelector('.jc-card-wishlist');
  wishlistBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isNowInWishlist = store.toggleWishlist(product.id);
    wishlistBtn.classList.toggle('is-active', isNowInWishlist);
    wishlistBtn.innerHTML = ICONS.heart('jc-wishlist-icon', isNowInWishlist);
  });

  // Quick Action button (Quick View / Select Size)
  const quickAddBtn = card.querySelector('.jc-btn-quick-add');
  quickAddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openPdp();
  });

  return card;
}
