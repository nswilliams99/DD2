const fs = require('fs');
const path = require('path');

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');

if (!fs.existsSync(indexPath)) {
  console.log('⚠️  dist/index.html not found, skipping CSS optimization');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Replace blocking CSS with non-blocking version
const cssRegex = /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/g;
const matches = html.match(cssRegex);

if (matches) {
  matches.forEach(match => {
    const hrefMatch = match.match(/href="([^"]+)"/);
    if (hrefMatch) {
      const cssUrl = hrefMatch[1];
      const nonBlockingCSS = `
    <!-- Preload CSS for fast loading -->
    <link rel="preload" href="${cssUrl}" as="style">
    <!-- Load CSS asynchronously to prevent render blocking -->
    <link rel="stylesheet" href="${cssUrl}" media="print" onload="this.media='all'; this.onload=null;">
    <!-- Fallback for no-JS -->
    <noscript><link rel="stylesheet" href="${cssUrl}"></noscript>`;
      
      html = html.replace(match, nonBlockingCSS);
    }
  });

  // Write the modified HTML back
  fs.writeFileSync(indexPath, html);
  console.log('✅ CSS optimized for non-blocking load');
  console.log(`   Processed ${matches.length} CSS file(s)`);
} else {
  console.log('ℹ️  No CSS files found to optimize');
}