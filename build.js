const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const destDir = path.join(__dirname, 'public');

// Create the public directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Function to copy files
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
}

// Copy HTML, JS, and CSS files
fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
    copyFile(path.join(sourceDir, file), path.join(destDir, file));
  }
});

console.log('Build complete!');