/**
 * Jaanam Collection - Tactile Minimalist Toast Notification
 * Non-intrusive, micro-animations, architectural hairline borders
 */

import { ICONS } from './icons.js';

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'jc-toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
}

export function showToast({ title, message = '', type = 'info', duration = 3200 }) {
  ensureToastContainer();

  const toast = document.createElement('div');
  toast.className = `jc-toast jc-toast-${type}`;

  const iconSvg = type === 'success' 
    ? ICONS.check('jc-toast-icon') 
    : type === 'bag' 
    ? ICONS.bag('jc-toast-icon') 
    : ICONS.sparkle('jc-toast-icon');

  toast.innerHTML = `
    <div class="jc-toast-accent"></div>
    <div class="jc-toast-body">
      <div class="jc-toast-header">
        ${iconSvg}
        <span class="jc-toast-title">${title}</span>
      </div>
      ${message ? `<p class="jc-toast-desc">${message}</p>` : ''}
    </div>
    <button class="jc-toast-close" aria-label="Dismiss notification">
      ${ICONS.close('jc-toast-close-icon')}
    </button>
  `;

  const closeBtn = toast.querySelector('.jc-toast-close');
  const dismiss = () => {
    toast.classList.add('jc-toast-leaving');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 200);
  };

  closeBtn.addEventListener('click', dismiss);

  toastContainer.appendChild(toast);

  // Auto dismiss
  setTimeout(dismiss, duration);
}
