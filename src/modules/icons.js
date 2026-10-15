/**
 * Jaanam Collection - Hairline Architectural SVG Icons
 * Crisp 1.25px stroke, no rounded bubble aesthetics
 */

export const ICONS = {
  bag: (className = 'icon') => `
    <svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  `,
  search: (className = 'icon') => `
    <svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `,
  heart: (className = 'icon', filled = false) => `
    <svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  `,
  close: (className = 'icon') => `
    <svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,
  arrowRight: (className = 'icon') => `
    <svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  `,
  arrowLeft: (className = 'icon') => `
    <svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  `,
  chevronDown: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,
  plus: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  `,
  minus: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  `,
  check: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  `,
  shield: (className = 'icon') => `
    <svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  `,
  truck: (className = 'icon') => `
    <svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  `,
  rotate: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  `,
  sparkle: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5l-2.8 2.8m-7.4 7.4l-2.8 2.8m0-13l2.8 2.8m7.4 7.4l2.8 2.8"/>
    </svg>
  `,
  whatsapp: (className = 'icon') => `
    <svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  `,
  menu: (className = 'icon') => `
    <svg class="${className}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  `,
  ruler: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M2 2l20 20M5 5l2-2M8 8l3-3M11 11l2-2M14 14l3-3M17 17l2-2"/>
    </svg>
  `,
  filter: (className = 'icon') => `
    <svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  `
};
