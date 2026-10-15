/**
 * Jaanam Collection - Global Reactive State & Commerce Store
 */

import { PRODUCTS, OCCASIONS } from '../data/products.js';

const CURRENCIES = {
  NPR: { code: 'NPR', symbol: 'रू ', label: 'NPR (रू)', rate: 134.5, decimals: 0 },
  INR: { code: 'INR', symbol: '₹ ', label: 'INR (₹)', rate: 86.5, decimals: 0 },
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1.0, decimals: 0 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 0.92, decimals: 0 },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.79, decimals: 0 },
  AED: { code: 'AED', symbol: 'AED ', label: 'AED (AED)', rate: 3.67, decimals: 0 }
};

const FREE_SHIPPING_THRESHOLD_USD = 250;

class Store {
  constructor() {
    this.cart = this.loadFromStorage('jc_cart', []);
    this.wishlist = this.loadFromStorage('jc_wishlist', []);
    const saved = this.loadFromStorage('jc_currency', 'NPR');
    this.currency = (saved && saved !== 'EUR' && saved !== 'USD') ? saved : 'NPR';
    this.activeOccasion = 'executive'; // Default launch curation
    this.activeCategory = 'all';
    this.activeSubCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'curated';
    this.promoCode = this.loadFromStorage('jc_promo', null); // e.g. { code: 'JAANAM10', discountPercent: 10 }
    this.vipRsvp = this.loadFromStorage('jc_vip_rsvp', null);
    this.listeners = new Map();
  }

  loadFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn('Storage read failed', e);
      return defaultValue;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in listener for ${event}:`, err);
        }
      });
    }
  }

  // --- CURRENCY ---
  setCurrency(code) {
    if (CURRENCIES[code]) {
      this.currency = code;
      this.saveToStorage('jc_currency', code);
      this.emit('currency:change', this.currency);
      this.emit('cart:change', this.getCartTotals());
    }
  }

  getCurrencies() {
    return CURRENCIES;
  }

  getCurrentCurrency() {
    return CURRENCIES[this.currency] || CURRENCIES.USD;
  }

  formatPrice(usdAmount) {
    const curr = this.getCurrentCurrency();
    const converted = usdAmount * curr.rate;
    const formatted = Math.round(converted).toLocaleString('en-IN');
    return `${curr.symbol}${formatted}`;
  }

  // --- CART ---
  addToCart(product, size = 'M', color = null, quantity = 1) {
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const existingIndex = this.cart.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        product,
        size,
        color: selectedColor,
        quantity
      });
    }

    this.saveToStorage('jc_cart', this.cart);
    this.emit('cart:change', this.getCartTotals());
    this.emit('cart:item-added', { product, size, color: selectedColor, quantity });
  }

  addBundleToCart(productsWithSpecs) {
    productsWithSpecs.forEach(({ product, size, color }) => {
      this.addToCart(product, size, color, 1);
    });
    this.emit('cart:bundle-added', productsWithSpecs);
  }

  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    if (this.cart[index]) {
      this.cart[index].quantity = quantity;
      this.saveToStorage('jc_cart', this.cart);
      this.emit('cart:change', this.getCartTotals());
    }
  }

  removeFromCart(index) {
    if (this.cart[index]) {
      const removed = this.cart.splice(index, 1)[0];
      this.saveToStorage('jc_cart', this.cart);
      this.emit('cart:change', this.getCartTotals());
      this.emit('cart:item-removed', removed);
    }
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage('jc_cart', this.cart);
    this.emit('cart:change', this.getCartTotals());
  }

  applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'JAANAM10' || cleanCode === 'ATELIER10') {
      this.promoCode = { code: cleanCode, discountPercent: 10 };
      this.saveToStorage('jc_promo', this.promoCode);
      this.emit('cart:change', this.getCartTotals());
      return { success: true, message: 'VIP 10% privilege applied to your order.' };
    }
    if (cleanCode === 'WELCOME15') {
      this.promoCode = { code: cleanCode, discountPercent: 15 };
      this.saveToStorage('jc_promo', this.promoCode);
      this.emit('cart:change', this.getCartTotals());
      return { success: true, message: 'First Order 15% luxury courtesy applied.' };
    }
    return { success: false, message: 'Invitation code not recognized or expired.' };
  }

  removePromoCode() {
    this.promoCode = null;
    this.saveToStorage('jc_promo', null);
    this.emit('cart:change', this.getCartTotals());
  }

  getCartTotals() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalUSD = this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    let discountUSD = 0;
    if (this.promoCode && this.promoCode.discountPercent) {
      discountUSD = (subtotalUSD * this.promoCode.discountPercent) / 100;
    }

    const freeShippingRemainingUSD = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotalUSD);
    const freeShippingProgress = Math.min(100, (subtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100);
    const isFreeShipping = subtotalUSD >= FREE_SHIPPING_THRESHOLD_USD || subtotalUSD === 0;

    const shippingFeeUSD = subtotalUSD > 0 && !isFreeShipping ? 25 : 0;
    const grandTotalUSD = Math.max(0, subtotalUSD - discountUSD + shippingFeeUSD);

    return {
      items: this.cart,
      totalItems,
      subtotalUSD,
      discountUSD,
      promoCode: this.promoCode,
      isFreeShipping,
      shippingFeeUSD,
      freeShippingRemainingUSD,
      freeShippingProgress,
      grandTotalUSD
    };
  }

  // --- WISHLIST ---
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
      added = false;
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.saveToStorage('jc_wishlist', this.wishlist);
    this.emit('wishlist:change', { wishlist: this.wishlist, productId, added });
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistProducts() {
    return PRODUCTS.filter(p => this.wishlist.includes(p.id));
  }

  // --- OCCASIONS & CATEGORIES ---
  setOccasion(occasionKey) {
    this.activeOccasion = occasionKey;
    this.emit('occasion:change', occasionKey);
  }

  setCategory(categoryId, subCategory = 'all') {
    this.activeCategory = categoryId;
    this.activeSubCategory = subCategory;
    this.emit('category:change', { categoryId, subCategory });
  }

  setSearchQuery(query) {
    this.searchQuery = (query || '').trim();
    this.emit('search:change', this.searchQuery);
  }

  setSortBy(sortKey) {
    this.sortBy = sortKey;
    this.emit('sort:change', sortKey);
  }

  // --- VIP RSVP (PHASE 2) ---
  saveVipRsvp(data) {
    const rsvpRecord = {
      ...data,
      passNumber: `JC-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString()
    };
    this.vipRsvp = rsvpRecord;
    this.saveToStorage('jc_vip_rsvp', rsvpRecord);
    this.emit('rsvp:confirmed', rsvpRecord);
    return rsvpRecord;
  }

  getVipRsvp() {
    return this.vipRsvp;
  }

  // --- FILTERED PRODUCTS SELECTOR ---
  getFilteredProducts() {
    let list = [...PRODUCTS];

    // 1. Search Query Filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.details.fabric.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (this.activeCategory && this.activeCategory !== 'all') {
      list = list.filter(p => p.category === this.activeCategory);
      if (this.activeSubCategory && this.activeSubCategory !== 'all') {
        list = list.filter(p => p.subCategory.toLowerCase() === this.activeSubCategory.toLowerCase());
      }
    }

    // 3. Occasion Filter (if in Occasion Mode)
    if (this.activeOccasion) {
      list = list.filter(p => p.occasions && p.occasions.includes(this.activeOccasion));
    }

    // 4. Sort
    if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }
}

export const store = new Store();
