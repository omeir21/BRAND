#!/usr/bin/env node

/**
 * ATLAS_EO - Complete Image Generator
 * Generates all placeholder images needed for the website
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Generating all placeholder images...\n');

const COLORS = {
  navy: '#0B1F3A',
  gold: '#C6A85B',
  offWhite: '#F4F1EA',
  charcoal: '#111111',
};

// All images needed - organized by type
const IMAGES_NEEDED = [
  // Hero & Main
  { name: 'placeholder-hero.svg', w: 1920, h: 1080, text: 'ATLAS_EO LUXURY' },
  { name: 'hero.svg', w: 1920, h: 1080, text: 'HERO' },
  
  // Collections
  { name: 'collection-women.svg', w: 600, h: 400, text: "WOMEN'S" },
  { name: 'collection-men.svg', w: 600, h: 400, text: "MEN'S" },
  { name: 'collection-accessories.svg', w: 600, h: 400, text: 'ACCESSORIES' },
  { name: 'collection-footwear.svg', w: 600, h: 400, text: 'FOOTWEAR' },
  { name: 'collection-bags.svg', w: 600, h: 400, text: 'BAGS' },
  { name: 'collection-jewelry.svg', w: 600, h: 400, text: 'JEWELRY' },
  { name: 'collection-hero.svg', w: 1200, h: 600, text: 'COLLECTION' },
  
  // Products
  { name: 'product-1.svg', w: 500, h: 600, text: 'PRODUCT 1' },
  { name: 'product-1-alt.svg', w: 500, h: 600, text: 'PRODUCT 1 ALT' },
  { name: 'product-1-detail.svg', w: 500, h: 600, text: 'DETAIL' },
  { name: 'product-2.svg', w: 500, h: 600, text: 'PRODUCT 2' },
  { name: 'product-3.svg', w: 500, h: 600, text: 'PRODUCT 3' },
  { name: 'product-sample-1.svg', w: 500, h: 600, text: 'ELEGANT' },
  { name: 'product-sample-2.svg', w: 500, h: 600, text: 'PREMIUM' },
  { name: 'product-sample-3.svg', w: 500, h: 600, text: 'LUXURY' },
  { name: 'product-sample-4.svg', w: 500, h: 600, text: 'EXCLUSIVE' },
  
  // Lifestyle
  { name: 'story.svg', w: 800, h: 600, text: 'STORY' },
  { name: 'product-lifestyle-1.svg', w: 800, h: 800, text: 'LIFESTYLE' },
  { name: 'product-lifestyle-2.svg', w: 800, h: 800, text: 'EDITORIAL' },
  
  // Drops
  { name: 'drop-1.svg', w: 1200, h: 600, text: 'DROP 1' },
  { name: 'drop-2.svg', w: 1200, h: 600, text: 'DROP 2' },
  { name: 'drop-exclusive.svg', w: 1200, h: 600, text: 'EXCLUSIVE' },
  { name: 'drop-seasonal.svg', w: 1200, h: 600, text: 'SEASONAL' },
  { name: 'drop-hero.svg', w: 1200, h: 600, text: 'DROP HERO' },
  { name: 'drop-product-1.svg', w: 500, h: 600, text: 'DROP ITEM' },
  
  // Pattern/texture
  { name: 'pattern-dark.png', w: 100, h: 100, text: 'PATTERN' },
];

/**
 * Create SVG image
 */
function createSVG(width, height, text) {
  const fontSize = Math.max(16, Math.min(width, height) / 10);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.navy};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.charcoal};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg${Date.now()})"/>
  <rect width="${width}" height="${height}" fill="${COLORS.offWhite}" opacity="0.02"/>
  <rect x="0" y="0" width="${width}" height="2" fill="${COLORS.gold}" opacity="0.5"/>
  <text x="${width/2}" y="${height/2}" font-size="${fontSize}" font-family="Georgia, serif" fill="${COLORS.gold}" text-anchor="middle" font-weight="100" letter-spacing="2" dominant-baseline="middle">${text}</text>
  <text x="${width - 10}" y="${height - 5}" font-size="8" font-family="sans-serif" fill="${COLORS.gold}" text-anchor="end" opacity="0.3">Atlas</text>
</svg>`;
}

/**
 * Generate all images
 */
function generateAllImages() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // Create directory
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`✓ Created: public/images\n`);
  }

  let count = 0;
  let errors = 0;

  IMAGES_NEEDED.forEach((img) => {
    try {
      const content = createSVG(img.w, img.h, img.text);
      const filePath = path.join(imagesDir, img.name);
      fs.writeFileSync(filePath, content, 'utf-8');
      count++;
      console.log(`  ✓ ${img.name}`);
    } catch (err) {
      errors++;
      console.error(`  ✗ ${img.name}: ${err.message}`);
    }
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Generated ${count}/${IMAGES_NEEDED.length} images`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} failed`);
  }
  console.log(`${'='.repeat(50)}\n`);
  console.log('📍 All images are in: public/images/\n');
  console.log('Next steps:');
  console.log('  1. Restart the server (Ctrl+C, then npm run dev)');
  console.log('  2. Refresh browser (F5 or Ctrl+R)');
  console.log('  3. You should see placeholder images everywhere\n');
}

// Run
generateAllImages();
