#!/usr/bin/env node

/**
 * Fix all image paths - converts .jpg to .svg
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing image paths...\n');

const srcDir = path.join(__dirname, 'src');
let filesFixed = 0;
let pathsFixed = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && !file.startsWith('.')) {
        walkDir(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let originalContent = content;
      
      // Fix jpg to svg
      content = content.replace(/\/images\/([^"'\s]+)\.jpg/g, '/images/$1.svg');
      
      // Fix placeholder.jpg
      content = content.replace(/\/images\/placeholder\.jpg/g, '/images/product-sample-1.svg');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        filesFixed++;
        const changes = (originalContent.match(/\.jpg/g) || []).length;
        pathsFixed += changes;
        console.log(`  ✓ ${path.relative(srcDir, fullPath)} (${changes} fixes)`);
      }
    }
  });
}

try {
  walkDir(srcDir);
  console.log(`\n✅ Fixed ${filesFixed} files (${pathsFixed} path changes)\n`);
} catch (err) {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
}
