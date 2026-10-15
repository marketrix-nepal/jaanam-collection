/**
 * Jaanam Collection - Slide-Over Flyout Cart Drawer
 * Smooth slide-out, free shipping meter, quantity stepper, and express checkout trigger
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { openCheckoutModal } from './checkoutModal.js';

let drawerEl = null;
let backdropEl = null;

export function initCartDrawer() {
  createCartElements();
  attachEvents();

  store.subscribe('cart:change', () => {
    updateCartUI();
  });

  store.subscribe('cart:item-added', () => {
    openCartDrawer();
  });

  store.subscribe('cart:bundle-added', () => {
    openCartDrawer();
  });
}

function createCartElements() {
  // Backdrop
  backdropEl = document.createElement('div');
  backdropEl.className = 'jc-overlay-backdrop';
  backdropEl.id = 'cart-backdrop';
  document.body.appendChild(backdropEl);

  // Drawer
  drawerEl = document.createElement('aside');
  drawerEl.className = 'jc-drawer';
  drawerEl.id = 'cart-drawer';
  drawerEl.setAttribute('aria-label', 'Shopping Bag');
  drawerEl.setAttribute('role', 'dialog');
  document.body.appendChild(drawerEl);

  updateCartUI();
}

export function openCartDrawer() {
  if (drawerEl && backdropEl) {
    drawerEl.classList.add('is-open');
    backdropEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  if (drawerEl && backdropEl) {
    drawerEl.classList.remove('is-open');
    backdropEl.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
}

function updateCartUI() {
  if (!drawerEl) return;

  const totals = store.getCartTotals();
  const curr = store.getCurrentCurrency();

  const formattedSubtotal = store.formatPrice(totals.subtotalUSD);
  const formattedDiscount = store.formatPrice(totals.discountUSD);
  const formattedShipping = totals.shippingFeeUSD === 0 ? 'Complimentary' : store.formatPrice(totals.shippingFeeUSD);
  const formattedGrandTotal = store.formatPrice(totals.grandTotalUSD);
  const formattedRemaining = store.formatPrice(totals.freeShippingRemainingUSD);

  drawerEl.innerHTML = `
    <!-- Header -->
    <div class="jc-drawer-header">
      <h3 class="jc-drawer-title">
        Shopping Bag
        <span class="jc-drawer-count">(${totals.totalItems} ${totals.totalItems === 1 ? 'Piece' : 'Pieces'})</span>
      </h3>
      <button type="button" class="jc-drawer-close" id="cart-drawer-close-btn" aria-label="Close Bag">
        ${ICONS.close()}
      </button>
    </div>

    <!-- Free Shipping Progress Meter -->
    <div class="jc-shipping-meter">
      <div class="jc-shipping-meter-text">
        <span>
          ${totals.isFreeShipping && totals.subtotalUSD > 0
            ? '✓ Unlocked: Complimentary Atelier Delivery' 
            : `Add ${formattedRemaining} for Complimentary Delivery`}
        </span>
        <span>${Math.round(totals.freeShippingProgress)}%</span>
      </div>
      <div class="jc-shipping-meter-bar">
        <div class="jc-shipping-meter-fill" style="width: ${totals.freeShippingProgress}%;"></div>
      </div>
    </div>

    <!-- Items Body -->
    <div class="jc-drawer-body">
      ${totals.items.length === 0 ? `
        <div class="jc-cart-empty">
          <h4>Your Bag is Empty</h4>
          <p style="margin-bottom: 1.5rem;">Explore our curated wardrobe essentials or build an interactive capsule look.</p>
          <button type="button" class="btn-luxury-outline" id="cart-explore-btn">
            Explore Collection
          </button>
        </div>
      ` : totals.items.map((item, idx) => `
        <div class="jc-cart-item">
          <div class="jc-cart-item-img">
            <img src="${item.product.images[0]}" alt="${item.product.name}" width="160" height="213" />
          </div>
          <div class="jc-cart-item-details">
            <h4 class="jc-cart-item-title">${item.product.name}</h4>
            <span class="jc-cart-item-meta">Size: ${item.size} • Color: ${item.color}</span>
            <div class="jc-cart-item-stepper">
              <button type="button" class="jc-stepper-btn" data-step-minus="${idx}" aria-label="Decrease quantity">
                ${ICONS.minus('icon-micro')}
              </button>
              <span class="jc-stepper-val">${item.quantity}</span>
              <button type="button" class="jc-stepper-btn" data-step-plus="${idx}" aria-label="Increase quantity">
                ${ICONS.plus('icon-micro')}
              </button>
            </div>
          </div>
          <div class="jc-cart-item-end">
            <span class="jc-cart-item-price">${store.formatPrice(item.product.price * item.quantity)}</span>
            <button type="button" class="jc-cart-item-remove" data-remove-item="${idx}">
              Remove
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Footer -->
    ${totals.items.length > 0 ? `
      <div class="jc-drawer-footer">
        <!-- Promo Code Input -->
        ${totals.promoCode ? `
          <div class="jc-applied-promo">
            <span>Privilege Applied: <strong>${totals.promoCode.code}</strong> (-${totals.promoCode.discountPercent}%)</span>
            <button type="button" id="cart-remove-promo" style="font-size: 10px; text-decoration: underline;">Remove</button>
          </div>
        ` : `
          <div class="jc-promo-box">
            <input type="text" class="jc-promo-input" id="cart-promo-input" placeholder="INVITATION CODE (E.G. JAANAM10)" />
            <button type="button" class="jc-promo-btn" id="cart-apply-promo-btn">Apply</button>
          </div>
        `}

        <div class="jc-cart-summary-line">
          <span>Subtotal</span>
          <span>${formattedSubtotal}</span>
        </div>
        ${totals.discountUSD > 0 ? `
          <div class="jc-cart-summary-line" style="color: var(--color-accent-brass);">
            <span>Privilege Discount</span>
            <span>-${formattedDiscount}</span>
          </div>
        ` : ''}
        <div class="jc-cart-summary-line">
          <span>Estimated Courier</span>
          <span>${formattedShipping}</span>
        </div>
        <div class="jc-cart-summary-total">
          <span>Estimated Total</span>
          <span>${formattedGrandTotal}</span>
        </div>

        <button type="button" class="btn-luxury btn-luxury-brass jc-btn-checkout" id="cart-checkout-btn">
          ${ICONS.whatsapp('icon-micro')} WhatsApp & COD Checkout — ${formattedGrandTotal}
        </button>
        <div style="display: flex; justify-content: center; gap: 1rem; font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.14em;">
          <span>• WhatsApp Concierge</span>
          <span>• Doorstep COD Nepal</span>
          <span>• Courier Dispatch</span>
        </div>
      </div>
    ` : ''}
  `;
}

function attachEvents() {
  // Backdrop click closes drawer
  backdropEl.addEventListener('click', closeCartDrawer);

  // Drawer event delegations
  drawerEl.addEventListener('click', (e) => {
    // Close button
    if (e.target.closest('#cart-drawer-close-btn')) {
      closeCartDrawer();
      return;
    }

    // Explore button when empty
    if (e.target.closest('#cart-explore-btn')) {
      closeCartDrawer();
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Quantity Plus
    const plusBtn = e.target.closest('[data-step-plus]');
    if (plusBtn) {
      const idx = parseInt(plusBtn.dataset.stepPlus, 10);
      const item = store.cart[idx];
      if (item) store.updateQuantity(idx, item.quantity + 1);
      return;
    }

    // Quantity Minus
    const minusBtn = e.target.closest('[data-step-minus]');
    if (minusBtn) {
      const idx = parseInt(minusBtn.dataset.stepMinus, 10);
      const item = store.cart[idx];
      if (item) store.updateQuantity(idx, item.quantity - 1);
      return;
    }

    // Remove Item
    const removeBtn = e.target.closest('[data-remove-item]');
    if (removeBtn) {
      const idx = parseInt(removeBtn.dataset.removeItem, 10);
      store.removeFromCart(idx);
      return;
    }

    // Apply Promo Code
    if (e.target.closest('#cart-apply-promo-btn')) {
      const input = drawerEl.querySelector('#cart-promo-input');
      if (input && input.value) {
        const res = store.applyPromoCode(input.value);
        if (!res.success) {
          alert(res.message);
        }
      }
      return;
    }

    // Remove Promo Code
    if (e.target.closest('#cart-remove-promo')) {
      store.removePromoCode();
      return;
    }

    // Proceed to Checkout
    if (e.target.closest('#cart-checkout-btn')) {
      closeCartDrawer();
      openCheckoutModal();
      return;
    }
  });
}
