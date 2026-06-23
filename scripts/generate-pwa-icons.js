import * as JimpModule from 'jimp';
import path from 'path';
import fs from 'fs';

const Jimp = JimpModule.default || JimpModule.Jimp || JimpModule;

const sourceFile = path.resolve('public/favicon.png');
const outputDir = path.resolve('public/icons');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generate() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Loading source image: ${sourceFile}`);
  const image = await Jimp.read(sourceFile);

  for (const size of sizes) {
    const filename = `icon-${size}x${size}.png`;
    const outputPath = path.join(outputDir, filename);
    
    let cloned = image.clone();
    try {
      // Try Jimp v1.x options object signature
      cloned = cloned.resize({ w: size, h: size });
    } catch (e) {
      // Fall back to Jimp v0.x positional parameters
      cloned = cloned.resize(size, size);
    }
    
    if (typeof cloned.writeAsync === 'function') {
      await cloned.writeAsync(outputPath);
    } else if (typeof cloned.write === 'function') {
      // For Promise-based Jimp v1.x or Callback-based Jimp v0.x
      const p = cloned.write(outputPath);
      if (p instanceof Promise) {
        await p;
      }
    }
    console.log(`Generated: ${filename}`);
  }
  
  console.log('All icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
