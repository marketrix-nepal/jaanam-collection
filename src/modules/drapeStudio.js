/**
 * Jaanam Collection - Feature: "The Atelier Runway & Drape Studio"
 * Interactive Day-to-Night Ambient Lighting Simulator,
 * Drag-Responsive Split-Drape Comparison Slider, and Tactile Fabric Testing Lab.
 */

import { store } from './state.js';
import { ICONS } from './icons.js';
import { showToast } from './toast.js';

export const FABRIC_SWATCHES = [
  {
    id: 'raw-silk',
    name: 'Mulberry Raw Silk',
    origin: 'Varanasi Weaving Guilds',
    weight: '280 GSM',
    drapeScore: '9.8 / 10 Fluidity',
    texture: 'Crisp slub weave with subtle natural sheen and architectural body',
    colorHex: '#E6DCB8',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    silhouetteImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'cashmere',
    name: 'Changthangi Cashmere',
    origin: 'Ladakh High-Altitude Pastoralists',
    weight: '14.2 Microns',
    drapeScore: '9.9 / 10 Softness',
    texture: 'Cloud-like thermal micro-loft with feathered brushed finish',
    colorHex: '#C5B49D',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    silhouetteImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'wool-gabardine',
    name: 'Double-Faced Gabardine',
    origin: 'Yorkshire Worsted Mills',
    weight: '380 GSM',
    drapeScore: '9.5 / 10 Structure',
    texture: 'Steep twill angle with sharp recovery memory and razor crease retention',
    colorHex: '#2B2B2B',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    silhouetteImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'chanderi-cotton',
    name: 'Hand-Spun Chanderi',
    origin: 'Madhya Pradesh Handlooms',
    weight: '120/2 Count',
    drapeScore: '9.6 / 10 Breathability',
    texture: 'Gossamer transparency infused with gold zari borders and cool hand-feel',
    colorHex: '#F2EBD9',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    silhouetteImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
  }
];

export const LIGHTING_MODES = [
  {
    id: 'golden-hour',
    name: 'Golden Hour 3200K',
    kicker: 'Warm Atelier Sunset',
    filter: 'sepia(0.2) contrast(1.05) brightness(1.02) saturate(1.15)',
    glow: 'rgba(212, 163, 89, 0.28)',
    desc: 'Simulates the warm amber glow of late afternoon atelier fitting rooms.'
  },
  {
    id: 'daylight',
    name: 'Atelier Daylight 5500K',
    kicker: 'Natural High-Fashion Studio',
    filter: 'contrast(1.04) brightness(1.0) saturate(1.0)',
    glow: 'rgba(255, 255, 255, 0.15)',
    desc: 'Pure, true-to-life color reproduction matching natural north-facing studio light.'
  },
  {
    id: 'evening-gala',
    name: 'Evening Gala 2800K',
    kicker: 'Midnight Spotlight Drama',
    filter: 'contrast(1.18) brightness(0.92) saturate(1.08)',
    glow: 'rgba(184, 151, 90, 0.45)',
    desc: 'Dramatic high-contrast illumination revealing the structural drape and metallic zari sheen.'
  }
];

export class DrapeStudio {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeFabricId = 'raw-silk';
    this.activeLightingId = 'golden-hour';
    this.sliderPosition = 50; // percentage
    this.isDragging = false;
    this.audioContext = null;
    this.isAudioPlaying = false;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    this.attachEvents();
    this.updateLighting();
  }

  getCurrentFabric() {
    return FABRIC_SWATCHES.find(f => f.id === this.activeFabricId) || FABRIC_SWATCHES[0];
  }

  getCurrentLighting() {
    return LIGHTING_MODES.find(l => l.id === this.activeLightingId) || LIGHTING_MODES[0];
  }

  render() {
    const fabric = this.getCurrentFabric();
    const lighting = this.getCurrentLighting();

    this.container.innerHTML = `
      <div class="jc-container">
        <!-- Section Header -->
        <div class="jc-drape-header">
          <div class="jc-drape-title-group">
            <span class="meta-label meta-label-brass">Interactive Textile Physics & Lighting</span>
            <h2>The Atelier Runway & Drape Studio</h2>
            <p>Drag the split-divider below to inspect the transformation from raw loom weave to sculpted haute silhouette. Toggle studio lighting environments to see real-time fabric behavior.</p>
          </div>

          <div class="jc-drape-header-controls">
            <!-- Ambient Audio Toggle -->
            <button type="button" class="jc-btn-audio-toggle ${this.isAudioPlaying ? 'is-active' : ''}" id="btn-atelier-audio" aria-label="Toggle Atelier Soundscape">
              <span class="jc-audio-bars">
                <span></span><span></span><span></span>
              </span>
              <span id="audio-btn-label">${this.isAudioPlaying ? 'Atelier Soundscape: Active' : 'Soundscape: Loom & Rain'}</span>
            </button>
          </div>
        </div>

        <!-- Studio Lighting Environment Selector -->
        <div class="jc-drape-lighting-bar">
          <span class="jc-lighting-label">Studio Illumination:</span>
          <div class="jc-lighting-pills" role="tablist">
            ${LIGHTING_MODES.map(mode => `
              <button type="button" 
                class="jc-lighting-pill ${mode.id === this.activeLightingId ? 'is-active' : ''}" 
                data-lighting-id="${mode.id}"
                role="tab"
                aria-selected="${mode.id === this.activeLightingId}">
                <span class="jc-lighting-dot" style="background-color: ${mode.id === 'evening-gala' ? '#C29B38' : mode.id === 'golden-hour' ? '#E5A93C' : '#FFFFFF'};"></span>
                <span>${mode.name}</span>
              </button>
            `).join('')}
          </div>
          <span class="jc-lighting-desc" id="jc-lighting-desc-text">${lighting.desc}</span>
        </div>

        <!-- Interactive Before/After Split Comparison Canvas -->
        <div class="jc-drape-stage-wrapper" id="jc-drape-stage-wrapper">
          <div class="jc-drape-canvas" id="jc-drape-canvas">
            
            <!-- LAYER 1: Finished Sculpted Silhouette (Underneath Base) -->
            <div class="jc-drape-layer jc-drape-after">
              <img 
                src="${fabric.silhouetteImage}" 
                alt="Finished Sculpted Silhouette in ${fabric.name}" 
                class="jc-drape-img" 
                id="jc-drape-after-img"
                loading="eager"
              />
              <div class="jc-drape-badge jc-drape-badge-right">
                <span class="meta-label">Bespoke Finished Drape</span>
                <strong>${fabric.name}</strong>
              </div>
            </div>

            <!-- LAYER 2: Raw Loom Weave (Clipped Over Top) -->
            <div class="jc-drape-layer jc-drape-before" id="jc-drape-before-layer" style="clip-path: inset(0 ${100 - this.sliderPosition}% 0 0);">
              <img 
                src="${fabric.image}" 
                alt="Raw Textile Loom Architecture of ${fabric.name}" 
                class="jc-drape-img" 
                id="jc-drape-before-img"
                loading="eager"
              />
              <div class="jc-drape-badge jc-drape-badge-left">
                <span class="meta-label meta-label-brass">Textile Architecture</span>
                <strong>Raw Loom Weave</strong>
              </div>
            </div>

            <!-- INTERACTIVE SLIDER DIVIDER -->
            <div class="jc-drape-slider-handle" id="jc-drape-slider-handle" style="left: ${this.sliderPosition}%;">
              <div class="jc-slider-line"></div>
              <div class="jc-slider-button" aria-label="Drag to compare before and after">
                <span>◀</span>
                <span class="jc-slider-icon-bar"></span>
                <span>▶</span>
              </div>
              <div class="jc-slider-percentage" id="jc-slider-percentage">${this.sliderPosition}%</div>
            </div>
          </div>
        </div>

        <!-- Tactile Fabric Swatch Lab -->
        <div class="jc-drape-fabric-lab">
          <div class="jc-fabric-swatches-row">
            <span class="meta-label meta-label-brass" style="margin-bottom: 0.5rem; display: block;">Select Atelier Textile:</span>
            <div class="jc-fabric-swatch-list">
              ${FABRIC_SWATCHES.map(swatch => `
                <button type="button" 
                  class="jc-fabric-swatch-btn ${swatch.id === this.activeFabricId ? 'is-active' : ''}" 
                  data-fabric-id="${swatch.id}"
                  aria-label="Select ${swatch.name}">
                  <span class="jc-fabric-color-chip" style="background-color: ${swatch.colorHex};"></span>
                  <div class="jc-fabric-btn-text">
                    <strong>${swatch.name}</strong>
                    <span>${swatch.weight}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Dynamic Live Weave & Drape Analysis Card -->
          <div class="jc-fabric-spec-card" id="jc-fabric-spec-card">
            <div class="jc-fabric-spec-col">
              <span class="meta-label">Provenance</span>
              <h4>${fabric.origin}</h4>
              <p>${fabric.texture}</p>
            </div>
            <div class="jc-fabric-spec-col">
              <span class="meta-label">Drape Fluidity Metric</span>
              <div class="jc-fluidity-meter">
                <div class="jc-fluidity-fill" style="width: 95%;"></div>
              </div>
              <span class="jc-fluidity-score">${fabric.drapeScore}</span>
            </div>
            <div class="jc-fabric-spec-col jc-spec-action-col">
              <button type="button" class="btn-luxury" id="btn-explore-fabric-catalog" data-filter-textile="${fabric.name}">
                Filter Collection with this Textile
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const canvas = this.container.querySelector('#jc-drape-canvas');
    const handle = this.container.querySelector('#jc-drape-slider-handle');
    const beforeLayer = this.container.querySelector('#jc-drape-before-layer');
    const percentLabel = this.container.querySelector('#jc-slider-percentage');

    if (canvas && handle && beforeLayer) {
      const updatePosition = (clientX) => {
        const rect = canvas.getBoundingClientRect();
        let offsetX = clientX - rect.left;
        let percentage = (offsetX / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        this.sliderPosition = Math.round(percentage);
        handle.style.left = `${percentage}%`;
        beforeLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        if (percentLabel) percentLabel.textContent = `${this.sliderPosition}%`;
      };

      // Mouse drag handlers
      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.isDragging = true;
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        updatePosition(e.clientX);
      });

      // Canvas click jumps handle
      canvas.addEventListener('click', (e) => {
        if (e.target.closest('.jc-drape-badge')) return;
        updatePosition(e.clientX);
      });

      // Touch handlers for mobile
      canvas.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          updatePosition(e.touches[0].clientX);
        }
      }, { passive: true });
    }

    // Fabric Swatch Switching
    this.container.addEventListener('click', (e) => {
      const swatchBtn = e.target.closest('[data-fabric-id]');
      if (swatchBtn) {
        const id = swatchBtn.dataset.fabricId;
        if (id && id !== this.activeFabricId) {
          this.activeFabricId = id;
          this.render();
          this.attachEvents();
          this.updateLighting();
        }
      }
    });

    // Lighting Mode Switching
    this.container.addEventListener('click', (e) => {
      const lightingBtn = e.target.closest('[data-lighting-id]');
      if (lightingBtn) {
        const id = lightingBtn.dataset.lightingId;
        if (id && id !== this.activeLightingId) {
          this.activeLightingId = id;
          this.container.querySelectorAll('.jc-lighting-pill').forEach(p => {
            p.classList.toggle('is-active', p.dataset.lightingId === id);
          });
          const currentLighting = this.getCurrentLighting();
          const descEl = this.container.querySelector('#jc-lighting-desc-text');
          if (descEl) descEl.textContent = currentLighting.desc;
          this.updateLighting();
        }
      }
    });

    // Soundscape Toggle
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#btn-atelier-audio')) {
        this.toggleAtelierAudio();
      }
    });

    // Filter collection with selected textile
    this.container.addEventListener('click', (e) => {
      const filterBtn = e.target.closest('#btn-explore-fabric-catalog');
      if (filterBtn) {
        const catalogSec = document.getElementById('catalog-section');
        if (catalogSec) {
          catalogSec.scrollIntoView({ behavior: 'smooth' });
          showToast(`Filtered by Textile: ${this.getCurrentFabric().name}`, 'brass');
        }
      }
    });
  }

  updateLighting() {
    const lighting = this.getCurrentLighting();
    const stage = this.container.querySelector('#jc-drape-stage-wrapper');
    const beforeImg = this.container.querySelector('#jc-drape-before-img');
    const afterImg = this.container.querySelector('#jc-drape-after-img');

    if (stage) {
      stage.style.boxShadow = `0 25px 65px ${lighting.glow}`;
    }
    if (beforeImg) {
      beforeImg.style.filter = lighting.filter;
    }
    if (afterImg) {
      afterImg.style.filter = lighting.filter;
    }
  }

  toggleAtelierAudio() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }

    if (!this.audioContext) {
      showToast('Audio API not supported in this environment.', 'info');
      return;
    }

    if (this.isAudioPlaying) {
      this.audioContext.suspend();
      this.isAudioPlaying = false;
      this.updateAudioUi(false);
      showToast('Soundscape Muted', 'default');
    } else {
      this.audioContext.resume();
      this.playSyntheticAtelierAtmosphere();
      this.isAudioPlaying = true;
      this.updateAudioUi(true);
      showToast('Atelier Soundscape Playing', 'brass');
    }
  }

  playSyntheticAtelierAtmosphere() {
    if (!this.audioContext) return;

    // Generate soft, low-pass pink noise atmosphere (gentle rain & loom resonance)
    const bufferSize = this.audioContext.sampleRate * 2;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.02; // Very gentle volume
    }

    const whiteNoise = this.audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter for warm soothing texture
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.audioContext.currentTime);

    // Master volume gain
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.35, this.audioContext.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    whiteNoise.start();
    this.activeSource = whiteNoise;
  }

  updateAudioUi(isPlaying) {
    const btn = this.container.querySelector('#btn-atelier-audio');
    const label = this.container.querySelector('#audio-btn-label');
    if (btn) btn.classList.toggle('is-active', isPlaying);
    if (label) label.textContent = isPlaying ? 'Atelier Soundscape: Active' : 'Soundscape: Loom & Rain';
  }
}
