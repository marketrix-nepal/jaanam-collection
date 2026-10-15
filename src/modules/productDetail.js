/**
 * Jaanam Collection - Product Detail Page (PDP) & Modal
 * Stacked Two-Column Image Gallery, Size/Color Swatches, Luxury Accordions
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

let activeProduct = null;
let selectedSize = 'M';
let selectedColor = null;

export function openPdpModal(product) {
  activeProduct = product;
  selectedSize = product.sizes && product.sizes[0] ? product.sizes[0].size : 'M';
  selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'Default';

  let dialog = document.getElementById('jc-pdp-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'jc-pdp-dialog';
    dialog.className = 'jc-pdp-modal';
    document.body.appendChild(dialog);
  }

  renderPdpContent(dialog, product);

  // Open modal using native HTML5 Dialog API
  dialog.showModal();

  // Update hash for deep linking
  window.location.hash = `product-${product.id}`;
}

export function closePdpModal() {
  const dialog = document.getElementById('jc-pdp-dialog');
  if (dialog && dialog.open) {
    dialog.close();
    if (window.location.hash.startsWith('#product-')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }
}

function renderPdpContent(dialog, product) {
  const isWishlisted = store.isInWishlist(product.id);
  const formattedPrice = store.formatPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? store.formatPrice(product.originalPrice) : null;

  dialog.innerHTML = `
    <button class="jc-pdp-close-btn" aria-label="Close Product View">
      ${ICONS.close()}
    </button>
    <div class="jc-pdp-grid">
      <!-- LEFT: Stacked Two-Column High-Fashion Image Gallery -->
      <div class="jc-pdp-gallery">
        ${product.images.map((imgUrl, idx) => `
          <div class="jc-pdp-image-wrap">
            <img src="${imgUrl}" alt="${product.name} view ${idx + 1}" loading="eager" width="800" height="1066" />
          </div>
        `).join('')}
      </div>

      <!-- RIGHT: Architectural Buy Box -->
      <div class="jc-pdp-buybox">
        <div class="jc-pdp-header">
          <div class="jc-pdp-meta-row">
            <span class="meta-label meta-label-brass">${product.subCategory}</span>
            ${product.badge ? `<span class="meta-label">${product.badge}</span>` : ''}
          </div>
          <h2 class="jc-pdp-title">${product.name}</h2>
          <p class="jc-pdp-subtitle">${product.subtitle}</p>
          <div class="jc-pdp-price-row">
            <span class="jc-pdp-price">${formattedPrice}</span>
            ${formattedOriginalPrice ? `<span class="jc-pdp-original-price">${formattedOriginalPrice}</span>` : ''}
            ${product.details.codEligible ? `
              <span class="jc-pdp-cod-badge">
                ${ICONS.shield('icon-micro')} COD Available
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Color Swatches -->
        ${product.colors && product.colors.length > 0 ? `
          <div class="jc-pdp-colors-section">
            <div class="jc-pdp-section-label">
              <span class="meta-label">Color: <strong id="pdp-selected-color-name" style="color: var(--color-text-primary);">${selectedColor}</strong></span>
            </div>
            <div class="jc-pdp-color-picker">
              ${product.colors.map(c => `
                <button type="button" class="jc-pdp-color-option ${c.name === selectedColor ? 'is-selected' : ''}" data-color-name="${c.name}">
                  <span class="jc-pdp-color-swatch-circle" style="background-color: ${c.hex};"></span>
                  <span>${c.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Size Selection & Stock Alert -->
        <div class="jc-pdp-sizes-section">
          <div class="jc-pdp-section-label">
            <span class="meta-label">Select Size</span>
            <button type="button" class="meta-label meta-label-brass" id="pdp-size-guide-trigger" style="text-decoration: underline;">
              Size Guide
            </button>
          </div>
          <div class="jc-pdp-size-picker">
            ${product.sizes.map(s => {
              const isOutOfStock = s.stock === 0;
              const isSelected = s.size === selectedSize;
              return `
                <button type="button" 
                  class="jc-pdp-size-btn ${isSelected ? 'is-selected' : ''} ${isOutOfStock ? 'is-disabled' : ''}" 
                  data-size="${s.size}" 
                  data-stock="${s.stock}"
                  ${isOutOfStock ? 'disabled' : ''}>
                  ${s.size}
                </button>
              `;
            }).join('')}
          </div>
          <div id="pdp-stock-indicator" class="jc-pdp-stock-alert">
            ${getStockText(product.sizes.find(s => s.size === selectedSize)?.stock)}
          </div>
        </div>

        <!-- Add To Bag & Wishlist Actions -->
        <div class="jc-pdp-actions">
          <button type="button" class="btn-luxury jc-pdp-btn-add" id="pdp-add-to-bag">
            ${ICONS.bag()} Add to Bag — ${formattedPrice}
          </button>
          <button type="button" class="jc-pdp-btn-wishlist ${isWishlisted ? 'is-active' : ''}" id="pdp-toggle-wishlist" aria-label="Toggle Wishlist">
            ${ICONS.heart('icon', isWishlisted)}
          </button>
        </div>

        <!-- Collapsible Luxury Accordions -->
        <div class="jc-pdp-accordions">
          <!-- Accordion 1: Fabric & Artistry -->
          <div class="jc-accordion-item is-open">
            <button type="button" class="jc-accordion-trigger">
              <span>Fabric & Artistry</span>
              ${ICONS.chevronDown('jc-accordion-icon')}
            </button>
            <div class="jc-accordion-content">
              <p><strong>Fabric:</strong> ${product.details.fabric}</p>
              <p style="margin-top: 0.5rem;"><strong>Origin:</strong> ${product.details.origin}</p>
              <p style="margin-top: 0.5rem;"><strong>Care:</strong> ${product.details.care}</p>
              <p style="margin-top: 0.5rem;"><strong>Silhouette & Fit:</strong> ${product.details.fit}</p>
            </div>
          </div>

          <!-- Accordion 2: Size & Measurements Guide -->
          <div class="jc-accordion-item" id="pdp-accordion-size-guide">
            <button type="button" class="jc-accordion-trigger">
              <span>Size & Measurement Guide</span>
              ${ICONS.chevronDown('jc-accordion-icon')}
            </button>
            <div class="jc-accordion-content">
              <p>All garments are tailored to an architectural standard fit. If between sizes, we recommend sizing up for effortless drape.</p>
              <table class="jc-measurement-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust (in)</th>
                    <th>Waist (in)</th>
                    <th>Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>32 - 33</td><td>25 - 26</td><td>35 - 36</td></tr>
                  <tr><td>S</td><td>34 - 35</td><td>27 - 28</td><td>37 - 38</td></tr>
                  <tr><td>M</td><td>36 - 37</td><td>29 - 30</td><td>39 - 40</td></tr>
                  <tr><td>L</td><td>38 - 40</td><td>31 - 33</td><td>41 - 43</td></tr>
                  <tr><td>XL</td><td>41 - 43</td><td>34 - 36</td><td>44 - 46</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Accordion 3: Delivery & Returns -->
          <div class="jc-accordion-item">
            <button type="button" class="jc-accordion-trigger">
              <span>Complimentary Delivery & Returns</span>
              ${ICONS.chevronDown('jc-accordion-icon')}
            </button>
            <div class="jc-accordion-content">
              <p>• Complimentary express carbon-neutral delivery on all orders over $250.</p>
              <p style="margin-top: 0.4rem;">• Dispatch within 24 hours from our London / Mumbai atelier hubs.</p>
              <p style="margin-top: 0.4rem;">• 14-day hassle-free doorstep return or exchange service with prepaid label.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close button & backdrop click
  const closeBtn = dialog.querySelector('.jc-pdp-close-btn');
  closeBtn.addEventListener('click', closePdpModal);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closePdpModal();
  });

  // Color Swatch Selection
  dialog.querySelectorAll('.jc-pdp-color-option').forEach(btn => {
    btn.addEventListener('click', () => {
      dialog.querySelectorAll('.jc-pdp-color-option').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedColor = btn.dataset.colorName;
      const label = dialog.querySelector('#pdp-selected-color-name');
      if (label) label.textContent = selectedColor;
    });
  });

  // Size Selection
  dialog.querySelectorAll('.jc-pdp-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dialog.querySelectorAll('.jc-pdp-size-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = btn.dataset.size;
      const stock = parseInt(btn.dataset.stock, 10);
      const indicator = dialog.querySelector('#pdp-stock-indicator');
      if (indicator) indicator.textContent = getStockText(stock);
    });
  });

  // Accordion Toggles
  dialog.querySelectorAll('.jc-accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.jc-accordion-item');
      parent.classList.toggle('is-open');
    });
  });

  // Size Guide trigger in header opens size accordion
  const sizeGuideTrigger = dialog.querySelector('#pdp-size-guide-trigger');
  if (sizeGuideTrigger) {
    sizeGuideTrigger.addEventListener('click', () => {
      const sizeAcc = dialog.querySelector('#pdp-accordion-size-guide');
      if (sizeAcc) {
        sizeAcc.classList.add('is-open');
        sizeAcc.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Wishlist toggle
  const wishlistBtn = dialog.querySelector('#pdp-toggle-wishlist');
  wishlistBtn.addEventListener('click', () => {
    const isNow = store.toggleWishlist(product.id);
    wishlistBtn.classList.toggle('is-active', isNow);
    wishlistBtn.innerHTML = ICONS.heart('icon', isNow);
  });

  // Add to Bag action
  const addToBagBtn = dialog.querySelector('#pdp-add-to-bag');
  addToBagBtn.addEventListener('click', () => {
    store.addToCart(product, selectedSize, selectedColor, 1);
    showToast({
      title: 'Added to Bag',
      message: `${product.name} (Size ${selectedSize}, ${selectedColor}) has been placed in your bag.`,
      type: 'bag'
    });
    closePdpModal();
  });
}

function getStockText(stock) {
  if (stock === undefined || stock === null) return '';
  if (stock === 0) return 'Currently out of stock';
  if (stock <= 3) return `Only ${stock} pieces remaining in atelier`;
  return `In stock — Ships in 24 hours`;
}
