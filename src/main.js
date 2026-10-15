/**
 * Jaanam Collection - Master Application Orchestrator
 */

import './styles/index.css';

import { Navigation } from './modules/navigation.js';
import { renderHeroSection } from './modules/hero.js';
import { OccasionGateway } from './modules/occasionGateway.js';
import { Catalog } from './modules/catalog.js';
import { DrapeStudio } from './modules/drapeStudio.js';
import { AccentsTeaser } from './modules/accentsTeaser.js';
import { initInteractivePhysics } from './modules/interactivePhysics.js';
import { renderAtelierValues, renderFooter } from './modules/footer.js';
import { initCartDrawer } from './modules/cartDrawer.js';
import { initWishlistDrawer } from './modules/wishlistDrawer.js';
import { initSearchOverlay } from './modules/searchOverlay.js';
import { initWhatsAppFloatingButton } from './modules/whatsappFloat.js';
import { openPdpModal, closePdpModal } from './modules/productDetail.js';
import { PRODUCTS } from './data/products.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Drawers & Global Overlays
  initCartDrawer();
  initWishlistDrawer();
  initSearchOverlay();
  initWhatsAppFloatingButton();

  // 2. Initialize Navigation & Ticker
  new Navigation('header-root', 'ticker-root');

  // 3. Render Hero Section
  renderHeroSection('hero-root');

  // 4. Initialize Feature 2: Occasion-Based Styling Gateway
  new OccasionGateway('occasion-bar-root', 'occasion-manifesto-root', 'hero-root');

  // 5. Initialize Curated Product Catalog
  new Catalog('catalog-section');

  // 6. Initialize Feature: The Atelier Runway & Drape Studio (Split Fabric Physics & Lighting)
  new DrapeStudio('drape-studio-section');

  // 7. Initialize Feature: Curated Accents Pre-Launch Drop Engine
  new AccentsTeaser('accents-section');

  // 8. Initialize Global 3D Interactive Physics & Motion
  initInteractivePhysics();

  // 8. Render Atelier Values & Footer
  renderAtelierValues('atelier-values-root');
  renderFooter('footer-root');

  // 9. Deep Linking & Hash Routing for PDP Modal
  handleDeepLink();
  window.addEventListener('hashchange', handleDeepLink);
});

function handleDeepLink() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#product-')) {
    const pid = hash.replace('#product-', '');
    const product = PRODUCTS.find(p => p.id === pid);
    if (product) {
      openPdpModal(product);
    }
  } else if (!hash.includes('product-')) {
    closePdpModal();
  }
}
