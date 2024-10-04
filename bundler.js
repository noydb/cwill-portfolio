const { existsSync, mkdirSync, readFile, writeFile, readFileSync } = require('fs');
const { join, dirname } = require('path');

function minifyHTML(html) {
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Remove whitespace between tags
  html = html.replace(/>\s+</g, '><');

  // Remove leading and trailing whitespace from each line
  html = html.replace(/^\s+|\s+$/gm, '');

  // Remove multiple spaces
  html = html.replace(/\s{2,}/g, ' ');

  return html;
}

function inlineCSS(html, basePath) {
  const cssRegex = /<link\s+[^>]*href=["']([^"']+\.css)["'][^>]*>/g;

  return html.replace(cssRegex, (match, cssPath) => {
    const fullPath = join(basePath, cssPath);
    try {
      const cssContent = readFileSync(fullPath, 'utf8');
      return `<style>${cssContent}</style>`;
    } catch (err) {
      console.error(`Error reading CSS file ${fullPath}:`, err);
      return match; // If there's an error, leave the original <link> tag
    }
  });
}

const inputPath = join(__dirname, 'index.html');
const outputDir = join(__dirname, 'dist');
const outputPath = join(outputDir, 'index.html');

// Ensure the dist directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Inline CSS
  let processedHTML = inlineCSS(data, dirname(inputPath));

  // Minify HTML
  processedHTML = minifyHTML(processedHTML);

  // Write the processed HTML to dist/index.html
  writeFile(outputPath, processedHTML, (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('The processed HTML has been saved to dist/index.html');
  });
});










//
// const inputPath = join(__dirname, 'index.html');
// const outputDir = join(__dirname, 'dist');
// const outputPath = join(outputDir, 'index.html');
//
// if (!existsSync(outputDir)) {
//   mkdirSync(outputDir, { recursive: true });
// }
//
// readFile(inputPath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return;
//   }
//
//   const minifiedHTML = minifyHTML(data);
//
//   // Write the minified HTML to dist/index.html
//   writeFile(outputPath, minifiedHTML, (err) => {
//     if (err) {
//       console.error('Error writing the file:', err);
//       return;
//     }
//     console.log('The minified HTML has been saved to dist/index.html');
//   });
// });
