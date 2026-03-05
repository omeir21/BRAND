#!/usr/bin/env node

/**
 * Generate Placeholder Images for ATLAS_EO Project
 * Creates SVG placeholder images for all missing image files
 * Usage: node scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// Color palette matching ATLAS_EO design
const COLORS = {
  navy: '#0B1F3A',
  gold: '#C6A85B',
  offWhite: '#F4F1EA',
  charcoal: '#111111',
};

// Image file definitions needed for the project
const IMAGE_FILES = [
  {
    name: 'placeholder-hero.jpg',
    width: 1920,
    height: 1080,
    text: 'ATLAS_EO\nHERO',
  },
  {
    name: 'collection-women.jpg',
    width: 600,
    height: 400,
    text: 'Women\nCollection',
  },
  {
    name: 'collection-men.jpg',
    width: 600,
    height: 400,
    text: 'Men\nCollection',
  },
  {
    name: 'collection-accessories.jpg',
    width: 600,
    height: 400,
    text: 'Accessories',
  },
  {
    name: 'product-sample-1.jpg',
    width: 500,
    height: 600,
    text: 'Product 1',
  },
  {
    name: 'product-sample-2.jpg',
    width: 500,
    height: 600,
    text: 'Product 2',
  },
  {
    name: 'product-sample-3.jpg',
    width: 500,
    height: 600,
    text: 'Product 3',
  },
  {
    name: 'drop-exclusive.jpg',
    width: 1200,
    height: 600,
    text: 'Exclusive\nDrop',
  },
];

/**
 * Create SVG placeholder image
 */
function createSVGPlaceholder(width, height, text) {
  const lines = text.split('\n');
  const fontSize = Math.max(24, width / 15);
  const y = height / 2 + (fontSize / 2);
  const lineHeight = fontSize * 1.3;

  let textElements = '';
  lines.forEach((line, idx) => {
    const yPos = y - (lines.length - 1) * lineHeight / 2 + idx * lineHeight;
    textElements += `
    <text 
      x="${width / 2}" 
      y="${yPos}" 
      font-size="${fontSize}" 
      font-family="Georgia, serif" 
      fill="${COLORS.gold}" 
      text-anchor="middle" 
      font-weight="100" 
      letter-spacing="2"
    >${line}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.navy};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.charcoal};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <rect width="${width}" height="${height}" fill="${COLORS.offWhite}" opacity="0.05"/>
  ${textElements}
  <text x="${width - 20}" y="${height - 10}" font-size="12" fill="${COLORS.gold}" text-anchor="end" opacity="0.6">
    Placeholder • Atlas_EO
  </text>
</svg>`;
}

/**
 * Generate all placeholder images
 */
function generatePlaceholders() {
  const imagesDir = path.join(__dirname, '../public/images');

  // Create directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`✓ Created directory: ${imagesDir}`);
  }

  // Generate each image
  IMAGE_FILES.forEach((image) => {
    const svgContent = createSVGPlaceholder(
      image.width,
      image.height,
      image.text
    );

    // Convert SVG to PNG using base64 (SVG stored as .svg file, which browsers display)
    const filePath = path.join(imagesDir, image.name.replace('.jpg', '.svg'));

    try {
      fs.writeFileSync(filePath, svgContent, 'utf-8');
      console.log(`✓ Generated: ${image.name} (${image.width}x${image.height})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${image.name}: ${error.message}`);
    }
  });

  console.log(`\n✅ All placeholder images generated in: ${imagesDir}\n`);
}

// Run the generator
generatePlaceholders();
