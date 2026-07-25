/**
 * Generates a maskable PWA icon from favicon2.png
 * - Adds a solid brand background (#FDF8F5 warm ivory)
 * - Centers the logo with proper safe-zone padding (10% on each side)
 * - Outputs icon-512x512-maskable.png to public/icons/
 */

import * as JimpModule from 'jimp';
import path from 'path';
import fs from 'fs';

const Jimp = JimpModule.default || JimpModule.Jimp || JimpModule;

const sourceFile = path.resolve('public/favicon2.png');
const outputDir = path.resolve('public/icons');
const sizes = [192, 512];

// Brand background color - warm ivory (#FDF8F5)
const BG_R = 253;
const BG_G = 248;
const BG_B = 245;
const BG_A = 255;

async function generateMaskable() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Loading source image: ${sourceFile}`);
  const logo = await Jimp.read(sourceFile);

  for (const size of sizes) {
    const filename = `icon-${size}x${size}-maskable.png`;
    const outputPath = path.join(outputDir, filename);

    // Create a solid background canvas using the correct Jimp v1 object constructor
    // Color as 32-bit RGBA hex: 0xRRGGBBAA
    const bgColor = (BG_R << 24 | BG_G << 16 | BG_B << 8 | BG_A) >>> 0;
    const bg = new Jimp({ width: size, height: size, color: bgColor });

    // Scale logo to fit within safe zone (80% of total size = 10% padding on each side)
    const safeSize = Math.floor(size * 0.8);
    let scaledLogo = logo.clone();

    try {
      scaledLogo = scaledLogo.resize({ w: safeSize, h: safeSize });
    } catch (e) {
      scaledLogo = scaledLogo.resize(safeSize, safeSize);
    }

    // Composite logo centered on background
    const offset = Math.floor((size - safeSize) / 2);

    try {
      bg.composite(scaledLogo, offset, offset);
    } catch (e) {
      bg = bg.composite(scaledLogo, offset, offset);
    }

    // Write output
    if (typeof bg.writeAsync === 'function') {
      await bg.writeAsync(outputPath);
    } else {
      const p = bg.write(outputPath);
      if (p instanceof Promise) await p;
    }

    console.log(`Generated: ${filename} (${size}x${size} with warm ivory background)`);
  }

  console.log('✅ All maskable icons generated!');
}

generateMaskable().catch(err => {
  console.error('Error generating maskable icons:', err);
  process.exit(1);
});
