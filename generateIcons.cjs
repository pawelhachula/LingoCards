const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateIcon(size) {
    const svgPath = path.resolve(__dirname, 'public/icon.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Launch puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to the requested size
    await page.setViewport({ width: size, height: size });
    
    // Set HTML content to just the SVG, making sure it fills the screen
    await page.setContent(`
        <style>
            body { margin: 0; padding: 0; background: transparent; }
            svg { width: ${size}px; height: ${size}px; }
        </style>
        ${svgContent}
    `);
    
    // Take screenshot with transparent background
    const outputPath = path.resolve(__dirname, `public/pwa-${size}x${size}.png`);
    await page.screenshot({ path: outputPath, omitBackground: true });
    
    console.log(`Generated ${size}x${size} icon at ${outputPath}`);
    
    await browser.close();
}

async function run() {
    await generateIcon(192);
    await generateIcon(512);
    // Also create apple touch icon (180x180)
    await generateIcon(180);
    // Move it
    fs.renameSync(
        path.resolve(__dirname, 'public/pwa-180x180.png'),
        path.resolve(__dirname, 'public/apple-touch-icon.png')
    );
    console.log("Done generating icons.");
}

run().catch(console.error);
