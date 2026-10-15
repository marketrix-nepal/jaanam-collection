/**
 * Jaanam Collection - Master Catalog Data
 * Curated for Haute Wardrobe Essentials
 */

export const OCCASIONS = {
  EXECUTIVE: {
    id: 'executive',
    label: '9-to-5 Executive',
    tagline: 'Architectural Tailoring & Decisive Presence',
    description: 'Crisp poplin shirts, double-breasted blazers, structured gabardine trousers, and Italian leather carry designed for effortless authority in boardroom and atelier.',
    heroBadge: 'AUTUMN / WINTER 2026',
    heroTitle: 'Architectural Decisiveness',
    heroSubtitle: 'The 9-to-5 Executive Curation',
    heroImage: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=2000&q=85',
    ctaText: 'Explore Executive Wardrobe'
  },
  EVERYDAY: {
    id: 'everyday',
    label: 'Everyday Ease',
    tagline: 'Elevated Loungewear & Fluid Silhouettes',
    description: 'Heavyweight organic cottons, Japanese raw denim, flowing silk-blend palazzos, and versatile carry for an uncompromising daily uniform.',
    heroBadge: 'DAILY ESSENTIALS',
    heroTitle: 'Unstudied Grace & Daily Comfort',
    heroSubtitle: 'The Everyday Ease Curation',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=85',
    ctaText: 'Discover Daily Essentials'
  },
  FESTIVE: {
    id: 'festive',
    label: 'Festive & Ceremonial',
    tagline: 'Artisanal Zari, Velvet & Heirloom Textiles',
    description: 'Pure raw silk anarkalis, handwoven Chanderi suit sets, mukaish organza dupattas, and midnight velvet gowns steeped in heirloom South Asian craftsmanship.',
    heroBadge: 'HEIRLOOM ATELIER',
    heroTitle: 'Nocturne of Gold & Pure Silk',
    heroSubtitle: 'The Festive & Ceremonial Curation',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    ctaText: 'View Festive Treasures'
  },
  WINTER: {
    id: 'winter',
    label: 'Winter Warmth',
    tagline: 'Pure Mongolian Cashmere & Sculpted Wool',
    description: 'Double-faced camel wool overcoats, cable-knit merino mocknecks, shearling-trimmed trench jackets, and hand-spun pashmina stoles designed for cold-weather elegance.',
    heroBadge: 'COLD WEATHER EDIT',
    heroTitle: 'The Pure Cashmere Shield',
    heroSubtitle: 'The Winter Warmth Curation',
    heroImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=85',
    ctaText: 'Experience Winter Essentials'
  }
};

export const CATEGORIES = [
  {
    id: 'ethnic-festive',
    name: 'Ethnic & Festive Wear',
    subcategories: ['Kurta Sets', 'Gowns', 'Unstitched Suit Materials'],
    description: 'Heirloom raw silks, Chanderi weaves, and hand-embroidered festive silhouettes.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'formal-office',
    name: 'Formal & Office Wear',
    subcategories: ['Tailored Shirts', 'Formal Trousers', 'Blazers', 'One-Piece Dresses', 'Formal Suits'],
    description: 'Precision-cut gabardine, crisp poplin, and structured suiting for modern executives.',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'casual-daily',
    name: 'Casual & Daily Wear',
    subcategories: ['T-Shirts', 'Jeans', 'Leggings', 'Trousers', 'Palazzo Pants', 'Shorts'],
    description: 'Heavyweight organic cotton, raw denim, and fluid drape essentials for everyday life.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'winter-wear',
    name: 'Winter Wear',
    subcategories: ['Jackets', 'Sweaters & Knitwear', 'Hoodies', 'Cardigans', 'Overcoats', 'Shawls & Stoles'],
    description: 'Double-faced wool, brushed Mongolian cashmere, and artisan pashmina wraps.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'bags',
    name: 'Bags',
    subcategories: ['Handbags', 'Tote Bags', 'Everyday Carry'],
    description: 'Sculptural Italian nappa leather, structured architectural canvas, and saddle finishes.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85'
  }
];

export const PRODUCTS = [
  // 1. ETHNIC & FESTIVE WEAR
  {
    id: 'ef-01',
    name: 'Noor Raw Silk Anarkali Kurta Set',
    subtitle: '3-Piece Set with Hand-Dyed Organza Dupatta',
    category: 'ethnic-festive',
    subCategory: 'Kurta Sets',
    price: 385,
    originalPrice: 440,
    occasions: ['festive'],
    capsuleType: 'top',
    badge: 'Atelier Signature',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Ivory Mukaish', hex: '#F7F4EB', inStock: true },
      { name: 'Pale Amber', hex: '#D8B884', inStock: true },
      { name: 'Onyx Noir', hex: '#1C1B1A', inStock: false }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 1 }
    ],
    details: {
      fabric: '100% Handloom Mulberry Raw Silk with Gold Zari borders',
      origin: 'Varanasi Weaving Collective, Hand-Finished in Jaipur Atelier',
      care: 'Dry clean only. Store wrapped in pure unbleached muslin cloth.',
      fit: 'Fluid empire-waist flare with structured high-collared yoke.',
      codEligible: true
    }
  },
  {
    id: 'ef-02',
    name: 'Zari-Embroidered Velvet Gown',
    subtitle: 'Midnight Column Silhouette with Antique Tilla Work',
    category: 'ethnic-festive',
    subCategory: 'Gowns',
    price: 495,
    originalPrice: 560,
    occasions: ['festive'],
    capsuleType: 'top',
    badge: 'Limited Edition',
    rating: 5.0,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Midnight Obsidian', hex: '#161922', inStock: true },
      { name: 'Deep Emerald', hex: '#172E25', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 }
    ],
    details: {
      fabric: 'Plush Silk-Rayon Micro Velvet with metallic bullion embroidery',
      origin: 'Kashmiri Artisan Guild, Tailored in New Delhi Atelier',
      care: 'Professional velvet dry clean only. Steam from inside out.',
      fit: 'Tailored architectural bodice falling into an elongated fluted hem.',
      codEligible: true
    }
  },
  {
    id: 'ef-03',
    name: 'Handspun Chanderi Unstitched Suit Material',
    subtitle: 'Includes 2.5m Silk Yoke, 2.5m Trousers & Tissue Dupatta',
    category: 'ethnic-festive',
    subCategory: 'Unstitched Suit Materials',
    price: 240,
    originalPrice: 280,
    occasions: ['festive', 'everyday'],
    capsuleType: 'top',
    badge: 'Handloom Pure',
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Raw Sandstone', hex: '#E7DEC8', inStock: true },
      { name: 'Rosewater', hex: '#D6AFA9', inStock: true }
    ],
    sizes: [
      { size: 'Unstitched Fabric (5.5m Complete Set)', stock: 12 }
    ],
    details: {
      fabric: '70% Pure Silk, 30% Mercerized Cotton with gold zari bootis',
      origin: 'Chanderi, Madhya Pradesh',
      care: 'Gentle dry clean recommended. Iron on low silk setting.',
      fit: 'Customizable to any contemporary or traditional cut.',
      codEligible: true
    }
  },

  // 2. FORMAL & OFFICE WEAR
  {
    id: 'fo-01',
    name: 'Structured Crisp Poplin Shirt',
    subtitle: 'Architectural French Cuffs & Concealed Mother-of-Pearl Placket',
    category: 'formal-office',
    subCategory: 'Tailored Shirts',
    price: 195,
    originalPrice: 220,
    occasions: ['executive', 'everyday'],
    capsuleType: 'top',
    badge: 'Core Essential',
    rating: 4.9,
    reviewCount: 78,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Chalk White', hex: '#FFFFFF', inStock: true },
      { name: 'Pale Sandstone', hex: '#ECE7DF', inStock: true },
      { name: 'Ink Sky', hex: '#273444', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 3 }
    ],
    details: {
      fabric: '100% Giza Egyptian Long-Staple Cotton (120/2 two-ply yarn)',
      origin: 'Woven in Bergamo, Italy; Tailored in Porto',
      care: 'Machine wash delicate cold or dry clean. Press while slightly damp.',
      fit: 'Relaxed tailored silhouette with sharp pointed collar and curved hem.',
      codEligible: true
    }
  },
  {
    id: 'fo-02',
    name: 'Tailored Wool-Blend Double-Breasted Blazer',
    subtitle: 'Sharp Sculpted Shoulders & Horn Button Enclosure',
    category: 'formal-office',
    subCategory: 'Blazers',
    price: 460,
    originalPrice: 520,
    occasions: ['executive', 'winter'],
    capsuleType: 'outerwear',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 56,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Charcoal Obsidian', hex: '#202022', inStock: true },
      { name: 'Warm Oatmeal', hex: '#D8D0C5', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 2 }
    ],
    details: {
      fabric: '85% Virgin Wool, 15% Mulberry Silk with Cupro Jacquard lining',
      origin: 'Biella Wool Mills, Italy',
      care: 'Specialist dry clean only. Brush with natural bristle brush.',
      fit: 'Structured architectural shoulder with gently tapered waistline.',
      codEligible: true
    }
  },
  {
    id: 'fo-03',
    name: 'Pleated High-Waist Gabardine Trousers',
    subtitle: 'Double Deep Pleats & Full Architectural Wide Leg',
    category: 'formal-office',
    subCategory: 'Formal Trousers',
    price: 260,
    originalPrice: 295,
    occasions: ['executive', 'everyday'],
    capsuleType: 'bottom',
    badge: 'Tailored Icon',
    rating: 4.8,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Slate Charcoal', hex: '#373739', inStock: true },
      { name: 'Warm Taupe', hex: '#A3998E', inStock: true },
      { name: 'Ivory Cream', hex: '#F4EFE6', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 7 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 2 }
    ],
    details: {
      fabric: '100% Fine Merino Wool Tropical Gabardine',
      origin: 'Yorkshire Wool Guild, Finished in London',
      care: 'Dry clean only. Steam lightly to refresh pleats.',
      fit: 'High rise sits above natural waistline; relaxed sweeping wide leg.',
      codEligible: true
    }
  },
  {
    id: 'fo-04',
    name: 'Minimalist Column Midi Dress',
    subtitle: 'Boatneck Structured Wool Crepe with Discreet Side Slit',
    category: 'formal-office',
    subCategory: 'One-Piece Dresses',
    price: 320,
    originalPrice: 360,
    occasions: ['executive', 'festive'],
    capsuleType: 'top',
    badge: 'Atelier Signature',
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Obsidian Noir', hex: '#19191B', inStock: true },
      { name: 'Alabaster Chalk', hex: '#F6F3EC', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    details: {
      fabric: 'Heavy Silk-Wool Double Crepe',
      origin: 'Como, Italy',
      care: 'Dry clean only.',
      fit: 'Sculpted sheath silhouette with graceful clean movement.',
      codEligible: true
    }
  },
  {
    id: 'fo-05',
    name: 'Architectural 3-Piece Executive Trouser Suit',
    subtitle: 'Blazer, Waistcoat & Matching Pleated Trousers',
    category: 'formal-office',
    subCategory: 'Formal Suits',
    price: 740,
    originalPrice: 850,
    occasions: ['executive'],
    capsuleType: 'outerwear',
    badge: 'Executive Hero',
    rating: 5.0,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Espresso Melange', hex: '#2A2421', inStock: true },
      { name: 'Graphite Wool', hex: '#323438', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    details: {
      fabric: 'Super 130s Pure Virgin Worsted Wool',
      origin: 'Savile Row Trained Master Cutters',
      care: 'Specialist dry clean only.',
      fit: 'Sharp structured shoulders with tailored vest and drape trousers.',
      codEligible: false
    }
  },

  // 3. CASUAL & DAILY WEAR
  {
    id: 'cd-01',
    name: 'Heavyweight Organic Cotton Boxy Tee',
    subtitle: '280 GSM Ring-Spun Compact Cotton with Raw Edge Hem',
    category: 'casual-daily',
    subCategory: 'T-Shirts',
    price: 85,
    originalPrice: 95,
    occasions: ['everyday'],
    capsuleType: 'top',
    badge: 'Wardrobe Foundation',
    rating: 4.8,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Raw Chalk', hex: '#FBF9F5', inStock: true },
      { name: 'Washed Charcoal', hex: '#333230', inStock: true },
      { name: 'Oat Biscuit', hex: '#DDD4C3', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 24 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 7 }
    ],
    details: {
      fabric: '100% GOTS Certified Organic Combed Cotton (280 GSM)',
      origin: 'Braga, Portugal',
      care: 'Machine wash 30°C delicate. Air dry flat.',
      fit: 'Boxy drop-shoulder cut with thick bound ribbed collar.',
      codEligible: true
    }
  },
  {
    id: 'cd-02',
    name: 'Wide-Leg Raw Indigo Denim Jeans',
    subtitle: '14oz Kurabo Japanese Selvedge Denim with Antique Copper Rivets',
    category: 'casual-daily',
    subCategory: 'Jeans',
    price: 240,
    originalPrice: 275,
    occasions: ['everyday', 'executive'],
    capsuleType: 'bottom',
    badge: 'Artisanal Selvedge',
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Deep Indigo Selvedge', hex: '#1E2B3C', inStock: true },
      { name: 'Natural Ecru Selvedge', hex: '#EDE8DB', inStock: true }
    ],
    sizes: [
      { size: '25', stock: 4 },
      { size: '26', stock: 7 },
      { size: '27', stock: 12 },
      { size: '28', stock: 15 },
      { size: '29', stock: 9 },
      { size: '30', stock: 5 }
    ],
    details: {
      fabric: '100% Cotton 14oz Shuttle-Loomed Kurabo Selvedge Denim',
      origin: 'Kojima, Okayama, Japan',
      care: 'Wash cold inside out after 30+ wears to develop natural patina.',
      fit: 'High rise with a relaxed straight-to-wide leg profile.',
      codEligible: true
    }
  },
  {
    id: 'cd-03',
    name: 'Fluid Pleated Silk-Blend Palazzo Pants',
    subtitle: 'High-Rise Flat Waistband with Flowing Cascading Drape',
    category: 'casual-daily',
    subCategory: 'Palazzo Pants',
    price: 215,
    originalPrice: 250,
    occasions: ['everyday', 'festive'],
    capsuleType: 'bottom',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 43,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Alabaster', hex: '#F5EFE4', inStock: true },
      { name: 'Espresso Satin', hex: '#2C221D', inStock: true },
      { name: 'Pale Sage', hex: '#9E9F8E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 11 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 2 }
    ],
    details: {
      fabric: '65% Mulberry Silk, 35% Modal Georgette',
      origin: 'Lyon Silk Mills, France',
      care: 'Hand wash cold with silk detergent or dry clean.',
      fit: 'High waist with clean architectural front and sweeping wide hem.',
      codEligible: true
    }
  },
  {
    id: 'cd-04',
    name: 'Relaxed Linen Drawstring Trousers',
    subtitle: 'Stonewashed French Normandy Flax with Horn Aglets',
    category: 'casual-daily',
    subCategory: 'Trousers',
    price: 180,
    originalPrice: 205,
    occasions: ['everyday'],
    capsuleType: 'bottom',
    badge: 'Summer Essential',
    rating: 4.7,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#DED3BF', inStock: true },
      { name: 'Chalk White', hex: '#FAF7F0', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 }
    ],
    details: {
      fabric: '100% Normandy Certified Flax Linen (230 GSM)',
      origin: 'Normandy, France',
      care: 'Machine wash delicate at 30°C. Line dry.',
      fit: 'Easy mid-rise with internal drawstring and relaxed tapered hem.',
      codEligible: true
    }
  },
  {
    id: 'cd-05',
    name: 'Seamless Bamboo Ribbed Leggings',
    subtitle: 'Sculpting Compression with Butter-Soft Breathability',
    category: 'casual-daily',
    subCategory: 'Leggings',
    price: 95,
    originalPrice: 110,
    occasions: ['everyday'],
    capsuleType: 'bottom',
    badge: 'Core Loungewear',
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Onyx Noir', hex: '#1C1B1B', inStock: true },
      { name: 'Cashmere Heather', hex: '#8C867D', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 16 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 10 }
    ],
    details: {
      fabric: '85% Organic Bamboo Viscose, 15% Elastane Micro-Rib',
      origin: 'Sustainably spun in Milan',
      care: 'Cold gentle wash. Do not tumble dry.',
      fit: 'High rise ribbed waistband that holds without restricting.',
      codEligible: true
    }
  },
  {
    id: 'cd-06',
    name: 'Tailored Pleated Bermuda Shorts',
    subtitle: 'Architectural Mid-Thigh Silhouette in Italian Cotton Twill',
    category: 'casual-daily',
    subCategory: 'Shorts',
    price: 155,
    originalPrice: 180,
    occasions: ['everyday', 'executive'],
    capsuleType: 'bottom',
    badge: 'Resort Edit',
    rating: 4.8,
    reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Stone Khaki', hex: '#B8AE9C', inStock: true },
      { name: 'Black Obsidian', hex: '#1C1C1E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 5 }
    ],
    details: {
      fabric: '100% Compact Italian Cotton Twill',
      origin: 'Florence, Italy',
      care: 'Wash cold inside out. Warm iron.',
      fit: 'High waist with neat double knife pleats and structured hem.',
      codEligible: true
    }
  },

  // 4. WINTER WEAR
  {
    id: 'ww-01',
    name: 'Double-Faced Camel Wool Overcoat',
    subtitle: 'Hand-Stitched Unlined Double Cloth with Relaxed Raglan Sleeve',
    category: 'winter-wear',
    subCategory: 'Overcoats',
    price: 680,
    originalPrice: 790,
    occasions: ['winter', 'executive'],
    capsuleType: 'outerwear',
    badge: 'Atelier Masterpiece',
    rating: 5.0,
    reviewCount: 61,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#B88655', inStock: true },
      { name: 'Obsidian Noir', hex: '#1D1C1C', inStock: true },
      { name: 'Alabaster Oat', hex: '#DDD6C9', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 1 }
    ],
    details: {
      fabric: '90% Virgin Camel Wool, 10% Cashmere Double-Faced Cloth',
      origin: 'Lanificio di Pray, Biella, Italy',
      care: 'Specialist dry clean only. Store on wide cedar hanger.',
      fit: 'Relaxed calf-length silhouette with tie belt and storm flap.',
      codEligible: false
    }
  },
  {
    id: 'ww-02',
    name: 'Merino Wool Cable-Knit Mockneck Sweater',
    subtitle: '7-Gauge Chunky Honeycomb Cable in Heritage Donegal Yarn',
    category: 'winter-wear',
    subCategory: 'Sweaters & Knitwear',
    price: 240,
    originalPrice: 280,
    occasions: ['winter', 'everyday'],
    capsuleType: 'top',
    badge: 'Winter Essential',
    rating: 4.9,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Oatmeal Fleck', hex: '#DBD2C4', inStock: true },
      { name: 'Dark Moss', hex: '#3B4136', inStock: true },
      { name: 'Charcoal Fleck', hex: '#303032', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 3 }
    ],
    details: {
      fabric: '100% Extrafine Australian Merino Wool (Donegal Flecked)',
      origin: 'County Donegal, Ireland',
      care: 'Hand wash cold with wool wash. Lay flat to dry on towel.',
      fit: 'Slightly relaxed body with architectural ribbed mock collar.',
      codEligible: true
    }
  },
  {
    id: 'ww-03',
    name: 'Shearling-Trimmed Quilted Trench Jacket',
    subtitle: 'Water-Repellent Japanese Nylon with Spanish Merino Shearling Collar',
    category: 'winter-wear',
    subCategory: 'Jackets',
    price: 520,
    originalPrice: 610,
    occasions: ['winter', 'executive'],
    capsuleType: 'outerwear',
    badge: 'Technical Luxury',
    rating: 4.9,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#1E1E20', inStock: true },
      { name: 'Deep Olive', hex: '#32362E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    details: {
      fabric: 'High-density micro ripstop nylon with PrimaLoft Gold insulation',
      origin: 'Tokyo Fabric Mills, Handcrafted in Veneto',
      care: 'Specialist leather & shearling clean.',
      fit: 'Structured cropped boxy fit with adjustable waist cinch.',
      codEligible: true
    }
  },
  {
    id: 'ww-04',
    name: 'Ribbed Longline Cashmere Cardigan',
    subtitle: 'Open-Front Floor Duster with Deep Patch Pockets & Sash Belt',
    category: 'winter-wear',
    subCategory: 'Cardigans',
    price: 430,
    originalPrice: 490,
    occasions: ['winter', 'everyday'],
    capsuleType: 'outerwear',
    badge: 'Pure Cashmere',
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Heather Cashmere', hex: '#A89F95', inStock: true },
      { name: 'Raw Cream', hex: '#EDE7DC', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 4 }
    ],
    details: {
      fabric: '100% Grade-A Mongolian Cashmere (12-Gauge 2-ply)',
      origin: 'Ulaanbaatar, Mongolia',
      care: 'Hand wash cold or gentle dry clean.',
      fit: 'Enveloping midi length with self-tie belt.',
      codEligible: true
    }
  },
  {
    id: 'ww-05',
    name: 'Heavy Cashmere-Blend Minimalist Hoodie',
    subtitle: 'Seamless Double-Layer Hood without Drawstring Clutter',
    category: 'winter-wear',
    subCategory: 'Hoodies',
    price: 280,
    originalPrice: 320,
    occasions: ['winter', 'everyday'],
    capsuleType: 'top',
    badge: 'Elevated Daily',
    rating: 4.9,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Stone Grey', hex: '#87837D', inStock: true },
      { name: 'Raw Ivory', hex: '#F3EFE7', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 2 }
    ],
    details: {
      fabric: '70% Fine Merino Wool, 30% Mongolian Cashmere',
      origin: 'Knit in Umbria, Italy',
      care: 'Hand wash cold or dry clean.',
      fit: 'Clean architectural cut without kangaroo pouch for sleek draping.',
      codEligible: true
    }
  },
  {
    id: 'ww-06',
    name: 'Pashmina Hand-Embroidered Stole',
    subtitle: 'Subtle Tone-on-Tone Sozni Needlework along Pure Cashmere Borders',
    category: 'winter-wear',
    subCategory: 'Shawls & Stoles',
    price: 360,
    originalPrice: 420,
    occasions: ['winter', 'festive'],
    capsuleType: 'outerwear',
    badge: 'Heritage Artisan',
    rating: 5.0,
    reviewCount: 37,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Natural Cashmere Ecru', hex: '#EAE3D6', inStock: true },
      { name: 'Antique Gold', hex: '#CDB68D', inStock: true }
    ],
    sizes: [
      { size: '200cm x 100cm Wrap', stock: 9 }
    ],
    details: {
      fabric: '100% Changthangi Ladakh Pashmina Wool (13-14 Micron)',
      origin: 'Srinagar, Kashmir (GI Tag Certified)',
      care: 'Specialist pashmina dry clean only. Air out in shade.',
      fit: 'Featherlight warmth that folds easily into an evening clutch.',
      codEligible: true
    }
  },

  // 5. BAGS
  {
    id: 'bg-01',
    name: 'Sculptural Italian Nappa Leather Handbag',
    subtitle: 'Brushed Brass Turn-Lock Hardware & Hand-Edge Painted Finish',
    category: 'bags',
    subCategory: 'Handbags',
    price: 540,
    originalPrice: 620,
    occasions: ['executive', 'festive'],
    capsuleType: 'bag',
    badge: 'Artisanal Carry',
    rating: 5.0,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Saddle Caramel', hex: '#935F3A', inStock: true },
      { name: 'Obsidian Noir', hex: '#1A1A1A', inStock: true },
      { name: 'Oatmeal Cream', hex: '#DDD6C9', inStock: true }
    ],
    sizes: [
      { size: 'Classic (28cm x 20cm x 10cm)', stock: 6 }
    ],
    details: {
      fabric: 'Full-Grain Tuscan Nappa Calfskin with buttery suede lining',
      origin: 'Scandicci, Florence, Italy',
      care: 'Protect with leather cream. Avoid direct moisture or rainfall.',
      fit: 'Top handle with detachable shoulder strap.',
      codEligible: true
    }
  },
  {
    id: 'bg-02',
    name: 'Structured Architectural Canvas Tote',
    subtitle: '24oz Rugged Cotton Canvas with Bridle Leather Handles',
    category: 'bags',
    subCategory: 'Tote Bags',
    price: 280,
    originalPrice: 320,
    occasions: ['executive', 'everyday'],
    capsuleType: 'bag',
    badge: 'Workhorse Essential',
    rating: 4.8,
    reviewCount: 59,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Chalk Canvas & Cognac Leather', hex: '#EBE5D9', inStock: true },
      { name: 'Midnight Black Canvas', hex: '#212123', inStock: true }
    ],
    sizes: [
      { size: 'Medium (Holds 15" Laptop)', stock: 14 }
    ],
    details: {
      fabric: 'Heavyweight Water-Resistant 24oz Duck Canvas & English Bridle Leather',
      origin: 'Walsall, UK',
      care: 'Spot clean canvas with damp cloth. Condition leather annually.',
      fit: 'Structured standing base with brass protective feet.',
      codEligible: true
    }
  },
  {
    id: 'bg-03',
    name: 'Minimalist Crossbody Everyday Carry',
    subtitle: 'Streamlined Saddle Pouch with Magnetic Clasp & Card Slot',
    category: 'bags',
    subCategory: 'Everyday Carry',
    price: 210,
    originalPrice: 245,
    occasions: ['everyday', 'winter'],
    capsuleType: 'bag',
    badge: 'Daily Companion',
    rating: 4.9,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Chestnut', hex: '#6D4428', inStock: true },
      { name: 'Obsidian Black', hex: '#1C1B1B', inStock: true }
    ],
    sizes: [
      { size: 'Compact (21cm x 15cm x 6cm)', stock: 11 }
    ],
    details: {
      fabric: 'Vegetable-tanned smooth box calfskin',
      origin: 'Tuscany, Italy',
      care: 'Condition with beeswax balm.',
      fit: 'Adjustable slider strap designed for high-chest cross wear.',
      codEligible: true
    }
  }
];

// PHASE 2 PRE-LAUNCH DROP LOOKS & EDITORIAL STAGES
export const ACCENTS_LOOKS = [
  {
    id: 'jewelry',
    name: 'Fine Brass Atelier',
    kicker: 'Heirloom Metalsmithing',
    tagline: 'Asymmetric Curvature & Cast Brass Architecture',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85',
    activeHotspots: ['p2-01', 'p2-02']
  },
  {
    id: 'belts',
    name: 'Waist Architecture',
    kicker: 'Bridle Leather Craft',
    tagline: 'Vegetable-Tanned Saddle Leather with Sculpted Buckles',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=1600&q=85',
    activeHotspots: ['p2-03']
  },
  {
    id: 'eyewear',
    name: 'Bio-Acetate Eyewear',
    kicker: 'Cadore Optics',
    tagline: 'Mazzucchelli Bio-Acetate with Zeiss Category 3 Optics',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=85',
    activeHotspots: ['p2-04']
  },
  {
    id: 'carry',
    name: 'Artisanal Carry',
    kicker: 'Florence Leatherguild',
    tagline: 'Hand-Burnished Bridle Leather with Brass Tenon Locks',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=85',
    activeHotspots: ['p2-05']
  }
];

// PHASE 2 PRE-LAUNCH DROP ITEMS (ACCENTS, JEWELRY & LEATHER)
export const PHASE2_ACCENTS = [
  {
    id: 'p2-01',
    lookId: 'jewelry',
    name: 'Statement Hammered Brass Hoops',
    category: 'Fashion Jewelry',
    subCategory: 'Earrings',
    expectedDrop: 'Winter \'26 Release',
    estimatedPrice: 145,
    material: 'Hand-Hammered Recycled Solid Brass with 18k Gold Micro-Plating',
    description: 'Sculptural asymmetric curvature inspired by brutalist jewelry architecture. Weightless hollow-cast construction.',
    hotspot: { x: 42, y: 35 }, // Centered on ear in jewelry look
    artisanNote: 'Each pair hand-shaped by heirloom metal smiths in Jaipur.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2-02',
    lookId: 'jewelry',
    name: 'Sculptural Choker Collar Necklace',
    category: 'Fashion Jewelry',
    subCategory: 'Necklaces',
    expectedDrop: 'Winter \'26 Release',
    estimatedPrice: 220,
    material: 'Cast Solid Brass with Brushed Satin Finish & Invisible Hinge',
    description: 'An ergonomic anatomical collar contouring the collarbone. Clean minimalist statement for open collars and evening gowns.',
    hotspot: { x: 48, y: 58 }, // Centered on collarbone in jewelry look
    artisanNote: 'Engineered with a magnetic tension release hinge.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2-03',
    lookId: 'belts',
    name: 'Sculpted Brass Hardware Waist Belt',
    category: 'Style Accessories',
    subCategory: 'Statement Waist Belts',
    expectedDrop: 'Spring Preview',
    estimatedPrice: 190,
    material: 'Vegetable-Tanned Saddle Leather with Hand-Polished Brass Buckle',
    description: '45mm wide architectural waist cincher designed to elevate oversized blazers, cardigans, and loose kurta tunics.',
    hotspot: { x: 50, y: 58 }, // Centered precisely on waist in belts look
    artisanNote: 'Edge hand-burnished using traditional organic beeswax.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2-04',
    lookId: 'eyewear',
    name: 'Tortoiseshell Angular Geometric Sunglasses',
    category: 'Style Accessories',
    subCategory: 'Sunglasses',
    expectedDrop: 'Winter \'26 Release',
    estimatedPrice: 175,
    material: 'Mazzucchelli Italian Bio-Acetate with Carl Zeiss Green Lenses',
    description: 'Sharp bevelled hexagonal brow line with 100% UVA/UVB Category 3 optical clarity.',
    hotspot: { x: 49, y: 32 }, // Centered over bridge in eyewear look
    artisanNote: 'Hand-polished in Cadore, Italy across three tumbling stages.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2-05',
    lookId: 'carry',
    name: 'Artisan Bridle Saddle Leather Pouch',
    category: 'Style Accessories',
    subCategory: 'Artisanal Carry',
    expectedDrop: 'Winter \'26 Release',
    estimatedPrice: 285,
    material: 'Full-Grain Tuscan Bridle Leather with Hand-Forged Brass Tenon Lock',
    description: 'Minimalist compact carry with hand-painted beveled edges and an adjustable crossbody strap.',
    hotspot: { x: 46, y: 62 }, // Centered on bag in carry look
    artisanNote: 'Stitched with French linen thread using traditional saddle stitch.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
  }
];

export const EDITORIAL_JOURNAL = [
  {
    title: 'The Architecture of Drape',
    subtitle: 'From Loom to Atelier',
    date: 'Autumn Journal \'26',
    excerpt: 'Why we reject synthetic blends in favor of 120/2 Egyptian cotton, Mulberry raw silk, and high-altitude Changthangi pashmina.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Monochrome Sartorial Discipline',
    subtitle: 'The Executive Uniform',
    date: 'Style Notes',
    excerpt: 'Deconstructing the power of sharp shoulders, gabardine pleats, and tactile unlined double-faced wool.',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=800&q=80'
  }
];
