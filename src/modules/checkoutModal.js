/**
 * Jaanam Collection - WhatsApp & COD Luxury Express Checkout
 * Seamless WhatsApp 1-Click Concierge & Doorstep Cash on Delivery
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';
import { openWhatsAppWithOrder, buildOrderWhatsAppMessage } from './whatsappFloat.js';

let checkoutDialog = null;
let selectedPaymentMethod = 'whatsapp'; // 'whatsapp', 'cod'
let lastPlacedOrderData = null;

export function openCheckoutModal() {
  const totals = store.getCartTotals();
  if (totals.totalItems === 0) {
    showToast({
      title: 'Bag is Empty',
      message: 'Please add pieces to your bag prior to checkout.',
      type: 'info'
    });
    return;
  }

  if (!checkoutDialog) {
    checkoutDialog = document.createElement('dialog');
    checkoutDialog.id = 'jc-checkout-dialog';
    checkoutDialog.className = 'jc-pdp-modal';
    checkoutDialog.style.maxWidth = '680px';
    checkoutDialog.style.padding = '0';
    document.body.appendChild(checkoutDialog);
  }

  renderCheckoutForm();
  checkoutDialog.showModal();
}

export function closeCheckoutModal() {
  if (checkoutDialog && checkoutDialog.open) {
    checkoutDialog.close();
  }
}

function renderCheckoutForm() {
  const totals = store.getCartTotals();
  const formattedGrandTotal = store.formatPrice(totals.grandTotalUSD);
  const currentCurr = store.getCurrentCurrency();

  checkoutDialog.innerHTML = `
    <div class="jc-checkout-modal-content">
      <button type="button" class="jc-pdp-close-btn" id="checkout-close-btn" aria-label="Close Checkout">
        ${ICONS.close()}
      </button>

      <div class="jc-rsvp-header" style="margin-bottom: 1.5rem;">
        <span class="meta-label meta-label-brass">Atelier Direct Checkout</span>
        <h3 style="font-size: 1.8rem; margin-top: 0.25rem;">WhatsApp & COD Dispatch</h3>
        <p>Instant concierge checkout tailored for seamless ordering in Nepal & globally.</p>
      </div>

      <div id="checkout-form-container">
        <form id="jc-checkout-form" class="jc-rsvp-form">
          <div class="jc-form-row">
            <div class="jc-form-group">
              <label class="jc-form-label" for="co-name">Full Client Name *</label>
              <input type="text" id="co-name" required placeholder="Aarav Sharma" />
            </div>
            <div class="jc-form-group">
              <label class="jc-form-label" for="co-phone">WhatsApp / Phone Number *</label>
              <input type="tel" id="co-phone" required placeholder="+977 9801234567" />
            </div>
          </div>

          <div class="jc-form-group">
            <label class="jc-form-label" for="co-email">Email Address (Optional)</label>
            <input type="email" id="co-email" placeholder="aarav.s@domain.com" />
          </div>

          <div class="jc-form-group">
            <label class="jc-form-label" for="co-address">Delivery Destination (Street & Area) *</label>
            <input type="text" id="co-address" required placeholder="Jhamsikhel, Ward 3" />
          </div>

          <div class="jc-form-row">
            <div class="jc-form-group">
              <label class="jc-form-label" for="co-city">City / Region *</label>
              <input type="text" id="co-city" required placeholder="Lalitpur / Kathmandu" />
            </div>
            <div class="jc-form-group">
              <label class="jc-form-label" for="co-notes">Delivery Notes / Landmark</label>
              <input type="text" id="co-notes" placeholder="Near British School" />
            </div>
          </div>

          <!-- Payment Selection Tabs: WhatsApp Concierge & COD -->
          <div class="jc-form-group">
            <label class="jc-form-label">Preferred Checkout Mode</label>
            <div class="jc-payment-tabs" style="grid-template-columns: 1fr 1fr;">
              <button type="button" class="jc-payment-tab ${selectedPaymentMethod === 'whatsapp' ? 'is-active' : ''}" data-pay-method="whatsapp">
                ${ICONS.whatsapp('icon-micro')} WhatsApp 1-Click Checkout
              </button>
              <button type="button" class="jc-payment-tab ${selectedPaymentMethod === 'cod' ? 'is-active' : ''}" data-pay-method="cod">
                ${ICONS.shield('icon-micro')} Cash on Delivery (COD)
              </button>
            </div>
          </div>

          <!-- Dynamic Method Details -->
          <div id="checkout-payment-details" style="padding: 1rem; background-color: var(--color-bg-elevated); border: 1px solid var(--color-border-hairline); font-size: 12px;">
            ${getPaymentDetailSnippet(selectedPaymentMethod)}
          </div>

          <!-- Order Summary Line -->
          <div style="padding: 1rem 0; border-top: 1px solid var(--color-border-hairline); display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div>
              <span class="meta-label">Total Payable (${totals.totalItems} pieces in ${currentCurr.code})</span>
              <div style="font-size: 1.45rem; font-weight: 600; color: var(--color-text-primary);">${formattedGrandTotal}</div>
            </div>
            <button type="submit" class="btn-luxury btn-luxury-brass" id="co-submit-btn" style="padding: 1rem 2rem;">
              ${selectedPaymentMethod === 'whatsapp' ? `${ICONS.whatsapp()} Order via WhatsApp` : `Place COD Order`}
            </button>
          </div>
        </form>
      </div>

      <div id="checkout-receipt-container" style="display: none;">
        <!-- Injected upon successful order -->
      </div>
    </div>
  `;

  // Attach listeners
  const closeBtn = checkoutDialog.querySelector('#checkout-close-btn');
  closeBtn.addEventListener('click', closeCheckoutModal);

  checkoutDialog.addEventListener('click', (e) => {
    if (e.target === checkoutDialog) closeCheckoutModal();
  });

  // Method tab click
  checkoutDialog.querySelectorAll('.jc-payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      selectedPaymentMethod = tab.dataset.payMethod;
      checkoutDialog.querySelectorAll('.jc-payment-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      
      const detailsBox = checkoutDialog.querySelector('#checkout-payment-details');
      if (detailsBox) detailsBox.innerHTML = getPaymentDetailSnippet(selectedPaymentMethod);

      const submitBtn = checkoutDialog.querySelector('#co-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = selectedPaymentMethod === 'whatsapp' 
          ? `${ICONS.whatsapp()} Order via WhatsApp` 
          : `Place COD Order — ${formattedGrandTotal}`;
      }
    });
  });

  // Form submit
  const form = checkoutDialog.querySelector('#jc-checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleOrderSubmit();
  });
}

function getPaymentDetailSnippet(method) {
  if (method === 'whatsapp') {
    return `
      <p style="color: var(--color-text-secondary); line-height: 1.5;">
        <strong>⚜️ WhatsApp 1-Click Concierge Checkout:</strong> Your complete cart, selected sizes, and delivery destination will be formatted into an official atelier dispatch message and launched directly into WhatsApp. Our concierge will confirm delivery schedule and payment preference immediately.
      </p>
    `;
  }
  return `
    <p style="color: var(--color-text-secondary); line-height: 1.5;">
      <strong>✓ Doorstep Cash on Delivery (COD):</strong> Pay in cash or via mobile banking (eSewa / Fonepay / Khalti) directly upon arrival. Complimentary doorstep delivery within Kathmandu Valley and major cities across Nepal.
    </p>
  `;
}

function handleOrderSubmit() {
  const name = checkoutDialog.querySelector('#co-name').value.trim();
  const phone = checkoutDialog.querySelector('#co-phone').value.trim();
  const email = checkoutDialog.querySelector('#co-email').value.trim();
  const address = checkoutDialog.querySelector('#co-address').value.trim();
  const city = checkoutDialog.querySelector('#co-city').value.trim();
  const notes = checkoutDialog.querySelector('#co-notes')?.value.trim() || '';

  const totals = store.getCartTotals();
  const currentCurrency = store.getCurrentCurrency();
  const orderRef = `JC-ORD-${Math.floor(10000 + Math.random() * 90000)}`;

  const orderData = {
    orderRef,
    client: { name, phone, email, address, city, notes },
    items: [...totals.items],
    totals,
    currency: currentCurrency,
    paymentMethod: selectedPaymentMethod
  };
  lastPlacedOrderData = orderData;

  // Build WhatsApp URL
  const waUrl = `https://wa.me/9779801234567?text=${encodeURIComponent(buildOrderWhatsAppMessage(orderData))}`;

  // Automatically trigger WhatsApp in new tab/app
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  const formWrap = checkoutDialog.querySelector('#checkout-form-container');
  const receiptWrap = checkoutDialog.querySelector('#checkout-receipt-container');

  formWrap.style.display = 'none';
  receiptWrap.style.display = 'block';

  const formattedTotal = store.formatPrice(totals.grandTotalUSD);

  receiptWrap.innerHTML = `
    <div class="jc-receipt-screen">
      <div style="width: 54px; height: 54px; margin: 0 auto 1rem; border-radius: 50%; background-color: var(--color-accent-brass-light); border: 1px solid var(--color-accent-brass); display: flex; align-items: center; justify-content: center; color: var(--color-accent-brass);">
        ${ICONS.whatsapp('icon-lg')}
      </div>
      <span class="meta-label meta-label-brass">Dispatch Transmitted</span>
      <h3 style="font-size: 2rem; margin-top: 0.5rem;">Dhanyabad, ${name}!</h3>
      <p style="font-size: 13px; color: var(--color-text-secondary); max-width: 460px; margin: 0.5rem auto 1rem;">
        Your bespoke order has been compiled and forwarded to our WhatsApp Atelier Concierge.
      </p>

      <div class="jc-receipt-ref-badge">
        REFERENCE: ${orderRef}
      </div>

      <div style="text-align: left; background-color: var(--color-bg-surface); border: 1px solid var(--color-border-hairline); padding: 1.25rem; margin: 1.5rem 0; font-size: 12px; line-height: 1.6;">
        <div><strong>Client:</strong> ${name} (${phone})</div>
        <div><strong>Destination:</strong> ${address}, ${city}</div>
        <div><strong>Order Total:</strong> ${formattedTotal} (${currentCurrency.code})</div>
        <div><strong>Mode:</strong> ${selectedPaymentMethod === 'whatsapp' ? 'WhatsApp Direct Concierge' : 'Cash on Delivery (COD)'}</div>
        <div><strong>Courier:</strong> White-Glove Dispatch across Nepal & Overseas</div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-luxury btn-luxury-brass" id="receipt-wa-reopen" style="padding: 0.85rem 1.5rem;">
          ${ICONS.whatsapp()} Open in WhatsApp
        </a>
        <button type="button" class="btn-luxury-outline" id="receipt-continue-btn" style="padding: 0.85rem 1.5rem;">
          Continue Browsing
        </button>
      </div>
    </div>
  `;

  // Clear cart
  store.clearCart();

  showToast({
    title: 'Order Transmitted via WhatsApp',
    message: `Reference ${orderRef} sent to Jaanam Atelier.`,
    type: 'success'
  });

  const continueBtn = receiptWrap.querySelector('#receipt-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', closeCheckoutModal);
  }
}
