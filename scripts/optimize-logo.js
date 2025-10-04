const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '..', 'public', 'brand', 'logo-source.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'brand');

async function optimizeLogo() {
  console.log('🎨 Optimisation du logo BANDEV...\n');

  try {
    // Vérifier que le fichier source existe
    if (!fs.existsSync(SOURCE)) {
      console.error('❌ Fichier source introuvable:', SOURCE);
      process.exit(1);
    }

    // Obtenir les métadonnées de l'image source
    const metadata = await sharp(SOURCE).metadata();
    console.log(`📐 Image source: ${metadata.width}x${metadata.height}px, ${(metadata.size / 1024).toFixed(2)} KB`);

    // Calculer les dimensions pour hauteur 28px et 56px (2x) en préservant le ratio
    const ratio = metadata.width / metadata.height;
    const height1x = 28;
    const height2x = 56;
    const width1x = Math.round(height1x * ratio);
    const width2x = Math.round(height2x * ratio);

    console.log(`\n🔧 Génération des versions optimisées...`);

    // Version 1x PNG (28px hauteur)
    await sharp(SOURCE)
      .resize(width1x, height1x, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(path.join(OUTPUT_DIR, 'logo.png'));
    
    const size1x = fs.statSync(path.join(OUTPUT_DIR, 'logo.png')).size;
    console.log(`✅ logo.png (1x): ${width1x}x${height1x}px, ${(size1x / 1024).toFixed(2)} KB`);

    // Version 2x PNG (56px hauteur)
    await sharp(SOURCE)
      .resize(width2x, height2x, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(path.join(OUTPUT_DIR, 'logo@2x.png'));
    
    const size2x = fs.statSync(path.join(OUTPUT_DIR, 'logo@2x.png')).size;
    console.log(`✅ logo@2x.png (2x): ${width2x}x${height2x}px, ${(size2x / 1024).toFixed(2)} KB`);

    // Version WebP 1x
    await sharp(SOURCE)
      .resize(width1x, height1x, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 95, alphaQuality: 100 })
      .toFile(path.join(OUTPUT_DIR, 'logo.webp'));
    
    const sizeWebp = fs.statSync(path.join(OUTPUT_DIR, 'logo.webp')).size;
    console.log(`✅ logo.webp (1x): ${width1x}x${height1x}px, ${(sizeWebp / 1024).toFixed(2)} KB`);

    // Version AVIF 1x
    await sharp(SOURCE)
      .resize(width1x, height1x, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .avif({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, 'logo.avif'));
    
    const sizeAvif = fs.statSync(path.join(OUTPUT_DIR, 'logo.avif')).size;
    console.log(`✅ logo.avif (1x): ${width1x}x${height1x}px, ${(sizeAvif / 1024).toFixed(2)} KB`);

    console.log('\n✨ Optimisation terminée avec succès !');
    console.log(`📁 Fichiers générés dans: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
    process.exit(1);
  }
}

optimizeLogo();