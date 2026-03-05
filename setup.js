#!/usr/bin/env node

/**
 * Complete Fix & Generate Fake Images for ATLAS_EO
 * Generates placeholder images and fixes all issues
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting ATLAS_EO Setup...\n');

// Color palette
const COLORS = {
  navy: '#0B1F3A',
  gold: '#C6A85B',
  offWhite: '#F4F1EA',
  charcoal: '#111111',
  gray: '#CCCCCC',
};

// Define all images needed
const IMAGES = [
  // Hero images
  { name: 'placeholder-hero.jpg', w: 1920, h: 1080, text: 'ATLAS_EO LUXURY FASHION' },
  
  // Collection images
  { name: 'collection-women.jpg', w: 600, h: 400, text: "WOMEN'S COLLECTION" },
  { name: 'collection-men.jpg', w: 600, h: 400, text: "MEN'S COLLECTION" },
  { name: 'collection-accessories.jpg', w: 600, h: 400, text: 'ACCESSORIES' },
  
  // Product images
  { name: 'product-sample-1.jpg', w: 500, h: 600, text: 'ELEGANT DESIGN' },
  { name: 'product-sample-2.jpg', w: 500, h: 600, text: 'PREMIUM QUALITY' },
  { name: 'product-sample-3.jpg', w: 500, h: 600, text: 'LUXURY CRAFTED' },
  { name: 'product-sample-4.jpg', w: 500, h: 600, text: 'EXCLUSIVE' },
  
  // Drop images
  { name: 'drop-exclusive.jpg', w: 1200, h: 600, text: 'EXCLUSIVE LIMITED DROP' },
  { name: 'drop-seasonal.jpg', w: 1200, h: 600, text: 'SEASONAL COLLECTION' },
  
  // Additional product lifestyle images
  { name: 'product-lifestyle-1.jpg', w: 800, h: 800, text: 'LIFESTYLE' },
  { name: 'product-lifestyle-2.jpg', w: 800, h: 800, text: 'EDITORIAL' },
];

/**
 * Create professional SVG placeholder
 */
function createSVG(width, height, text) {
  const fontSize = Math.max(20, Math.min(width, height) / 12);
  const lines = text.split(' ');
  
  let textElements = '';
  lines.forEach((line, idx) => {
    const y = height / 2 + (idx - lines.length / 2 + 0.5) * fontSize * 1.8;
    textElements += `
    <text 
      x="${width / 2}" 
      y="${y}" 
      font-size="${fontSize}" 
      font-family="'Georgia', serif" 
      fill="${COLORS.gold}" 
      text-anchor="middle" 
      font-weight="100" 
      letter-spacing="3"
      dominant-baseline="middle"
    >${line}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.navy};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.charcoal};stop-opacity:1" />
    </linearGradient>
    <pattern id="dots" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="40" cy="40" r="1" fill="${COLORS.gold}" opacity="0.1"/>
    </pattern>
  </defs>
  
  <!-- Background gradient -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Pattern overlay -->
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  
  <!-- Subtle textures -->
  <rect width="${width}" height="${height}" fill="${COLORS.offWhite}" opacity="0.02"/>
  
  <!-- Accent bars -->
  <rect x="0" y="0" width="${width}" height="3" fill="${COLORS.gold}" opacity="0.5"/>
  <rect x="0" y="${height - 3}" width="${width}" height="3" fill="${COLORS.gold}" opacity="0.5"/>
  
  <!-- Text -->
  ${textElements}
  
  <!-- Watermark -->
  <text 
    x="${width - 15}" 
    y="${height - 10}" 
    font-size="10" 
    font-family="sans-serif" 
    fill="${COLORS.gold}" 
    text-anchor="end" 
    opacity="0.4"
  >Atlas_EO</text>
</svg>`;
}

/**
 * Generate all images
 */
function generateImages() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // Create directory
  try {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log(`✓ Created directory: public/images`);
    }
  } catch (err) {
    console.error(`✗ Failed to create directory: ${err.message}`);
    return false;
  }

  // Generate each image
  let successCount = 0;
  IMAGES.forEach((img) => {
    try {
      const svgContent = createSVG(img.w, img.h, img.text);
      const svgPath = path.join(imagesDir, img.name.replace('.jpg', '.svg'));
      fs.writeFileSync(svgPath, svgContent, 'utf-8');
      successCount++;
      console.log(`  ✓ ${img.name} (${img.w}×${img.h})`);
    } catch (err) {
      console.error(`  ✗ ${img.name}: ${err.message}`);
    }
  });

  console.log(`\n✓ Generated ${successCount}/${IMAGES.length} placeholder images\n`);
  return successCount > 0;
}

/**
 * Verify dependencies
 */
function verifyDependencies() {
  console.log('📦 Verifying dependencies...\n');
  try {
    require('next');
    console.log('  ✓ Next.js');
    require('react');
    console.log('  ✓ React');
    require('tailwindcss');
    console.log('  ✓ Tailwind CSS');
    require('clsx');
    console.log('  ✓ clsx');
    require('tailwind-merge');
    console.log('  ✓ tailwind-merge');
    require('zustand');
    console.log('  ✓ Zustand');
    console.log('\n✓ All dependencies installed\n');
    return true;
  } catch (err) {
    console.error(`✗ Missing dependency: ${err.message}\n`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('='.repeat(50));
  console.log('  ATLAS_EO - Complete Setup v1.0');
  console.log('='.repeat(50) + '\n');

  // Step 1: Verify dependencies
  if (!verifyDependencies()) {
    console.error('⚠️  Some dependencies are missing!');
    console.log('Run: npm install\n');
  }

  // Step 2: Generate images
  console.log('🎨 Generating placeholder images...\n');
  const imagesGenerated = generateImages();

  if (imagesGenerated) {
    console.log('='.repeat(50));
    console.log('✅ Setup Complete!\n');
    console.log('Next steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Open: http://localhost:3000');
    console.log('\nYour ATLAS_EO app is ready! 🚀\n');
    console.log('='.repeat(50));
  } else {
    console.error('❌ Failed to generate images');
    process.exit(1);
  }
}

// Run
main();
