/**
 * Jaanam Collection - Stylish WhatsApp Floating Concierge
 * High-Fashion Aesthetic, Architectural Radii, Optimized & Responsive
 */

import { ICONS } from './icons.js';

const ATELIER_WHATSAPP_NUMBER = '9779801234567'; // Nepal Atelier Concierge line

let floatContainer = null;
let isCardOpen = false;

export function initWhatsAppFloatingButton() {
  if (document.getElementById('jc-whatsapp-float')) return;

  floatContainer = document.createElement('aside');
  floatContainer.id = 'jc-whatsapp-float';
  floatContainer.className = 'jc-wa-float-root';
  floatContainer.setAttribute('aria-label', 'Atelier WhatsApp Concierge');

  floatContainer.innerHTML = `
    <!-- Floating Concierge Quick Popover Card -->
    <div class="jc-wa-popover" id="jc-wa-popover" role="dialog" aria-hidden="true" aria-label="WhatsApp Concierge Chat">
      <div class="jc-wa-popover-header">
        <div class="jc-wa-header-info">
          <div class="jc-wa-avatar">
            ${ICONS.whatsapp('jc-wa-avatar-icon')}
            <span class="jc-wa-online-dot"></span>
          </div>
          <div>
            <h4 class="jc-wa-title">Atelier Concierge</h4>
            <span class="jc-wa-status">Online • Mayfair & Kathmandu Guild</span>
          </div>
        </div>
        <button type="button" class="jc-wa-close-btn" id="jc-wa-close-popover" aria-label="Close Concierge Card">
          ${ICONS.close('icon-micro')}
        </button>
      </div>

      <div class="jc-wa-popover-body">
        <p class="jc-wa-intro-msg">
          Namaste & Welcome. Connect directly with our private styling advisors for real-time sizing advice, custom tailoring, or 1-click WhatsApp order placement.
        </p>

        <div class="jc-wa-starters">
          <span class="meta-label meta-label-brass" style="font-size: 9px;">Quick Inquiries:</span>
          <button type="button" class="jc-wa-starter-chip" data-wa-prompt="Namaste Jaanam Atelier, I would like sizing assistance for a curated silhouette.">
            👗 Sizing & Fit Guidance
          </button>
          <button type="button" class="jc-wa-starter-chip" data-wa-prompt="Namaste Jaanam Atelier, I would like to inquire about delivery timelines and COD options in Nepal.">
            🚚 Nepal Delivery & COD
          </button>
          <button type="button" class="jc-wa-starter-chip" data-wa-prompt="Namaste Jaanam Atelier, I would like to place a bespoke order directly via WhatsApp.">
            ⚜️ Direct WhatsApp Order
          </button>
        </div>
      </div>

      <div class="jc-wa-popover-footer">
        <a href="https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste Jaanam Atelier, I would like to inquire about your curated wardrobe collection.')}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="btn-luxury jc-wa-direct-btn" 
           id="jc-wa-main-link">
          ${ICONS.whatsapp()} Chat with Stylist
        </a>
      </div>
    </div>

    <!-- The Floating Button Trigger -->
    <button type="button" class="jc-wa-trigger-btn" id="jc-wa-trigger-btn" aria-label="Open WhatsApp Atelier Concierge" aria-expanded="false">
      <span class="jc-wa-pulse-ring"></span>
      <span class="jc-wa-trigger-icon">
        ${ICONS.whatsapp('jc-wa-btn-svg')}
      </span>
      <span class="jc-wa-trigger-label">WhatsApp Concierge</span>
    </button>
  `;

  document.body.appendChild(floatContainer);
  attachEvents();
}

function attachEvents() {
  const triggerBtn = floatContainer.querySelector('#jc-wa-trigger-btn');
  const popover = floatContainer.querySelector('#jc-wa-popover');
  const closeBtn = floatContainer.querySelector('#jc-wa-close-popover');

  const togglePopover = (open) => {
    isCardOpen = open !== undefined ? open : !isCardOpen;
    popover.classList.toggle('is-open', isCardOpen);
    popover.setAttribute('aria-hidden', String(!isCardOpen));
    triggerBtn.setAttribute('aria-expanded', String(isCardOpen));
  };

  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopover();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopover(false);
  });

  // Starter prompt clicks
  floatContainer.querySelectorAll('.jc-wa-starter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.waPrompt;
      const url = `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(prompt)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      togglePopover(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (isCardOpen && !floatContainer.contains(e.target)) {
      togglePopover(false);
    }
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCardOpen) {
      togglePopover(false);
    }
  });
}

export function openWhatsAppWithOrder(orderData) {
  const message = buildOrderWhatsAppMessage(orderData);
  const url = `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}

export function buildOrderWhatsAppMessage({ orderRef, client, items, totals, currency, paymentMethod }) {
  let lines = [];
  lines.push(`⚜️ *JAANAM COLLECTION — ATELIER ORDER DISPATCH* ⚜️`);
  lines.push(`*Reference:* ${orderRef}`);
  lines.push(`*Client Name:* ${client.name}`);
  lines.push(`*Phone:* ${client.phone}`);
  lines.push(`*Delivery Destination:* ${client.address}, ${client.city}`);
  if (client.email) lines.push(`*Email:* ${client.email}`);
  lines.push(``);
  lines.push(`🛍️ *SELECTED SILHOUETTES:*`);

  items.forEach((item, i) => {
    const itemTotal = item.product.price * item.quantity;
    const convertedItemTotal = Math.round(itemTotal * currency.rate).toLocaleString('en-IN');
    lines.push(`${i + 1}. *${item.product.name}*`);
    lines.push(`   • Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}`);
    lines.push(`   • Amount: ${currency.symbol}${convertedItemTotal}`);
  });

  lines.push(``);
  lines.push(`📊 *ORDER VALUATION:*`);
  const subtotalFormatted = Math.round(totals.subtotalUSD * currency.rate).toLocaleString('en-IN');
  lines.push(`• Subtotal: ${currency.symbol}${subtotalFormatted}`);

  if (totals.discountUSD > 0) {
    const discountFormatted = Math.round(totals.discountUSD * currency.rate).toLocaleString('en-IN');
    lines.push(`• Privilege Code (${totals.promoCode?.code}): -${currency.symbol}${discountFormatted}`);
  }

  const shippingFormatted = totals.shippingFeeUSD === 0 
    ? 'Complimentary' 
    : `${currency.symbol}${Math.round(totals.shippingFeeUSD * currency.rate).toLocaleString('en-IN')}`;
  lines.push(`• Express Courier: ${shippingFormatted}`);

  const grandTotalFormatted = Math.round(totals.grandTotalUSD * currency.rate).toLocaleString('en-IN');
  lines.push(`*TOTAL PAYABLE:* ${currency.symbol}${grandTotalFormatted}`);
  lines.push(`*Preferred Mode:* ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'WhatsApp Atelier Direct'}`);
  lines.push(``);
  lines.push(`Please confirm piece availability and provide delivery confirmation.`);

  return lines.join('\n');
}
