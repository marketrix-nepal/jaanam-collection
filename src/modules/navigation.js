/**
 * Jaanam Collection - Global Header, Navigation & Mega-Menu
 * Production-Ready Mobile Responsive Layout & Seamless Drawer
 */

import { CATEGORIES } from '../data/products.js';
import { store } from './state.js';
import { ICONS } from './icons.js';
import { openCartDrawer } from './cartDrawer.js';
import { openWishlistDrawer } from './wishlistDrawer.js';
import { openSearchOverlay } from './searchOverlay.js';

export class Navigation {
  constructor(headerContainerId, tickerContainerId) {
    this.headerContainer = document.getElementById(headerContainerId);
    this.tickerContainer = document.getElementById(tickerContainerId);

    if (this.headerContainer) {
      this.init();
    }
  }

  init() {
    this.renderTicker();
    this.renderHeader();
    this.attachEvents();
    this.initScrollListener();

    // Subscribe to state changes
    store.subscribe('cart:change', () => this.updateBagCount());
    store.subscribe('wishlist:change', () => this.updateWishlistCount());
    store.subscribe('currency:change', () => this.updateCurrencySelect());
  }

  renderTicker() {
    if (!this.tickerContainer) return;
    this.tickerContainer.innerHTML = `
      <div class="jc-ticker">
        <div class="jc-ticker-content jc-ticker-desktop">
          <div class="jc-ticker-item">
            <span>Complimentary Courier on Orders Over $250</span>
          </div>
          <span class="jc-ticker-dot"></span>
          <div class="jc-ticker-item">
            <span>Private Atelier Consultation in London & Mumbai</span>
          </div>
          <span class="jc-ticker-dot"></span>
          <div class="jc-ticker-item">
            <span>Code <strong>JAANAM10</strong> for 10% First Acquisition Privilege</span>
          </div>
        </div>
        <div class="jc-ticker-content jc-ticker-mobile">
          <span>Complimentary Global Courier Over $250 • Code <strong>JAANAM10</strong></span>
        </div>
      </div>
    `;
  }

  renderHeader() {
    const currencies = store.getCurrencies();
    const currentCurr = store.currency;
    const totals = store.getCartTotals();
    const wishlistCount = store.wishlist.length;

    this.headerContainer.innerHTML = `
      <header class="jc-header" id="main-header">
        <div class="jc-container">
          <div class="jc-header-inner">
            <!-- LEFT: Mobile Menu Button & Desktop Nav Links -->
            <div class="jc-header-left">
              <button type="button" class="jc-mobile-menu-btn" id="mobile-nav-toggle" aria-label="Open Navigation Menu">
                ${ICONS.menu()}
              </button>

              <nav class="jc-nav-desktop" aria-label="Primary Navigation">
                <ul class="jc-nav-links">
                  <li class="jc-nav-item">
                    <a href="#catalog-section" class="jc-nav-link" id="nav-collections-link">
                      Collections ${ICONS.chevronDown('icon-micro')}
                    </a>

                    <!-- Dynamic Mega Menu Panel with Visual Editorial Cards -->
                    <div class="jc-mega-menu" id="nav-mega-menu" role="region" aria-label="Collections Directory">
                      <div class="jc-container">
                        <div class="jc-mega-grid">
                          ${CATEGORIES.map(cat => `
                            <div class="jc-mega-col">
                              <a href="#catalog-section" class="jc-mega-card" data-nav-category="${cat.id}">
                                <img src="${cat.image}" alt="${cat.name}" loading="lazy" width="240" height="320" />
                              </a>
                              <a href="#catalog-section" class="jc-mega-title" data-nav-category="${cat.id}">
                                ${cat.name}
                              </a>
                              <ul class="jc-mega-sublist">
                                ${cat.subcategories.map(sub => `
                                  <li>
                                    <a href="#catalog-section" class="jc-mega-sublink" data-nav-category="${cat.id}" data-nav-sub="${sub}">
                                      ${sub}
                                    </a>
                                  </li>
                                `).join('')}
                              </ul>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="jc-nav-item">
                    <a href="#drape-studio-section" class="jc-nav-link">
                      Runway Studio
                    </a>
                  </li>

                  <li class="jc-nav-item">
                    <a href="#accents-section" class="jc-nav-link">
                      Accents
                    </a>
                  </li>

                  <li class="jc-nav-item">
                    <a href="#atelier-section" class="jc-nav-link">
                      Atelier
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- CENTER: Refined Editorial Serif Logo -->
            <a href="#" class="jc-header-logo" aria-label="Jaanam Collection Home">
              <span class="jc-logo-title">JAANAM</span>
              <span class="jc-logo-subtitle">ATELIER</span>
            </a>

            <!-- RIGHT: Actions (Currency on Desktop, Search, Wishlist, Bag) -->
            <div class="jc-header-actions">
              <!-- Desktop Currency Switcher -->
              <div class="jc-currency-desktop-wrap">
                <select class="jc-currency-select" id="currency-switcher" aria-label="Select Currency">
                  ${Object.values(currencies).map(c => `
                    <option value="${c.code}" ${c.code === currentCurr ? 'selected' : ''}>
                      ${c.label || `${c.code} (${c.symbol.trim()})`}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Search Button -->
              <button type="button" class="jc-action-btn" id="header-search-btn" aria-label="Search Silhouettes">
                ${ICONS.search()}
              </button>

              <!-- Wishlist Button -->
              <button type="button" class="jc-action-btn" id="header-wishlist-btn" aria-label="View Saved Pieces">
                ${ICONS.heart()}
                <span class="jc-badge-count" id="header-wishlist-badge" style="${wishlistCount > 0 ? '' : 'display: none;'}">
                  ${wishlistCount}
                </span>
              </button>

              <!-- Bag Drawer Trigger -->
              <button type="button" class="jc-action-btn" id="header-bag-btn" aria-label="Open Shopping Bag">
                ${ICONS.bag()}
                <span class="jc-badge-count" id="header-bag-badge" style="${totals.totalItems > 0 ? '' : 'display: none;'}">
                  ${totals.totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer Backdrop Scrim -->
      <div class="jc-mobile-backdrop" id="mobile-nav-backdrop"></div>

      <!-- Mobile Navigation Drawer -->
      <div class="jc-mobile-drawer" id="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
        <div class="jc-mobile-drawer-header">
          <div>
            <span class="jc-logo-title" style="font-size: 1.15rem; letter-spacing: 0.16em;">JAANAM</span>
            <span class="meta-label meta-label-brass" style="display: block; font-size: 9px; margin-top: 2px;">Private Atelier</span>
          </div>
          <button type="button" class="jc-drawer-close" id="mobile-nav-close" aria-label="Close Mobile Nav">
            ${ICONS.close()}
          </button>
        </div>

        <ul class="jc-mobile-nav-list">
          <li>
            <a href="#catalog-section" class="jc-mobile-nav-link" data-mobile-scroll="catalog">
              <span>All Collections</span>
              ${ICONS.arrowRight('icon-micro')}
            </a>
            <ul class="jc-mobile-sublist">
              ${CATEGORIES.map(c => `
                <li>
                  <a href="#catalog-section" class="jc-mobile-sublink" data-nav-category="${c.id}">
                    ${c.name}
                  </a>
                </li>
              `).join('')}
            </ul>
          </li>
          <li>
            <a href="#drape-studio-section" class="jc-mobile-nav-link" data-mobile-scroll="drape">
              <span>Runway Studio</span>
              ${ICONS.arrowRight('icon-micro')}
            </a>
          </li>
          <li>
            <a href="#accents-section" class="jc-mobile-nav-link" data-mobile-scroll="accents">
              <span>Curated Accents</span>
              ${ICONS.arrowRight('icon-micro')}
            </a>
          </li>
          <li>
            <a href="#atelier-section" class="jc-mobile-nav-link" data-mobile-scroll="atelier">
              <span>The Atelier Craft</span>
              ${ICONS.arrowRight('icon-micro')}
            </a>
          </li>
        </ul>

        <!-- Mobile Drawer Footer with Currency Switcher -->
        <div class="jc-mobile-drawer-footer">
          <label class="meta-label" for="mobile-currency-select" style="margin-bottom: 0.5rem; display: block;">Select Currency</label>
          <select class="jc-currency-select jc-currency-select-mobile" id="mobile-currency-select" aria-label="Select Currency">
            ${Object.values(currencies).map(c => `
              <option value="${c.code}" ${c.code === currentCurr ? 'selected' : ''}>
                ${c.label || `${c.code} (${c.symbol.trim()})`}
              </option>
            `).join('')}
          </select>
          <div style="margin-top: 1.5rem; font-size: 11px; color: var(--color-text-muted); text-align: center;">
            London • Mumbai • Dubai
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Desktop Currency Switcher
    const currSelect = this.headerContainer.querySelector('#currency-switcher');
    if (currSelect) {
      currSelect.addEventListener('change', (e) => {
        store.setCurrency(e.target.value);
      });
    }

    // Mobile Currency Switcher
    const mobCurrSelect = this.headerContainer.querySelector('#mobile-currency-select');
    if (mobCurrSelect) {
      mobCurrSelect.addEventListener('change', (e) => {
        store.setCurrency(e.target.value);
      });
    }

    // Header Action Triggers
    const searchBtn = this.headerContainer.querySelector('#header-search-btn');
    if (searchBtn) searchBtn.addEventListener('click', openSearchOverlay);

    const wishlistBtn = this.headerContainer.querySelector('#header-wishlist-btn');
    if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlistDrawer);

    const bagBtn = this.headerContainer.querySelector('#header-bag-btn');
    if (bagBtn) bagBtn.addEventListener('click', openCartDrawer);

    // Mobile nav toggle and backdrop
    const mobToggle = this.headerContainer.querySelector('#mobile-nav-toggle');
    const mobClose = this.headerContainer.querySelector('#mobile-nav-close');
    const mobDrawer = this.headerContainer.querySelector('#mobile-nav-drawer');
    const mobBackdrop = this.headerContainer.querySelector('#mobile-nav-backdrop');

    const openMobNav = () => {
      if (mobDrawer) mobDrawer.classList.add('is-open');
      if (mobBackdrop) mobBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeMobNav = () => {
      if (mobDrawer) mobDrawer.classList.remove('is-open');
      if (mobBackdrop) mobBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (mobToggle) mobToggle.addEventListener('click', openMobNav);
    if (mobClose) mobClose.addEventListener('click', closeMobNav);
    if (mobBackdrop) mobBackdrop.addEventListener('click', closeMobNav);

    // Close mobile drawer when any link is clicked
    this.headerContainer.querySelectorAll('.jc-mobile-nav-link, .jc-mobile-sublink').forEach(link => {
      link.addEventListener('click', (e) => {
        closeMobNav();
        const cat = link.dataset.navCategory;
        if (cat) {
          store.setCategory(cat);
          store.setOccasion(null);
        }
      });
    });

    // Category click handler inside desktop mega menu
    const mega = this.headerContainer.querySelector('#nav-mega-menu');
    if (mega) {
      mega.addEventListener('click', (e) => {
        const link = e.target.closest('[data-nav-category]');
        if (link) {
          const cat = link.dataset.navCategory;
          store.setCategory(cat);
          store.setOccasion(null);
        }
      });
    }
  }

  updateBagCount() {
    const totals = store.getCartTotals();
    const badge = this.headerContainer.querySelector('#header-bag-badge');
    if (badge) {
      badge.textContent = totals.totalItems;
      badge.style.display = totals.totalItems > 0 ? 'flex' : 'none';
      badge.classList.add('jc-badge-bounce');
      setTimeout(() => badge.classList.remove('jc-badge-bounce'), 300);
    }
  }

  updateWishlistCount() {
    const count = store.wishlist.length;
    const badge = this.headerContainer.querySelector('#header-wishlist-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.add('jc-badge-bounce');
      setTimeout(() => badge.classList.remove('jc-badge-bounce'), 300);
    }
  }

  updateCurrencySelect() {
    const select = this.headerContainer.querySelector('#currency-switcher');
    if (select) select.value = store.currency;
    const mobSelect = this.headerContainer.querySelector('#mobile-currency-select');
    if (mobSelect) mobSelect.value = store.currency;
  }

  initScrollListener() {
    const header = this.headerContainer.querySelector('#main-header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }
}
