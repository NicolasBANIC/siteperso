/**
 * Script d'optimisation des images
 * Compresse les JPG/PNG et génère des versions WebP/AVIF
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const QUALITY = {
  jpeg: 85,
  webp: 85,
  avif: 80,
  png: 90,
};

const MAX_WIDTH = 2560; // Largeur maximale pour les images

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);

  // Ignorer les SVG et fichiers déjà optimisés
  if (ext === '.svg' || fileName.includes('.optimized')) {
    return;
  }

  console.log(`📸 Optimisation de ${path.basename(filePath)}...`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Vérifier si l'image est vide
    if (metadata.size === 0) {
      console.log(`⚠️  Image vide ignorée: ${path.basename(filePath)}`);
      return;
    }

    // Redimensionner si trop grande
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Optimiser selon le format
    if (ext === '.jpg' || ext === '.jpeg') {
      // Optimiser JPEG
      await image
        .jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true })
        .toFile(path.join(dirName, `${fileName}.optimized.jpg`));

      // Générer WebP
      await sharp(filePath)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: QUALITY.webp })
        .toFile(path.join(dirName, `${fileName}.webp`));

      // Générer AVIF (meilleure compression)
      await sharp(filePath)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
        .avif({ quality: QUALITY.avif })
        .toFile(path.join(dirName, `${fileName}.avif`));

      console.log(`✅ ${path.basename(filePath)} optimisé (JPG + WebP + AVIF)`);
    } else if (ext === '.png') {
      // Optimiser PNG
      await image
        .png({ quality: QUALITY.png, compressionLevel: 9, progressive: true })
        .toFile(path.join(dirName, `${fileName}.optimized.png`));

      // Générer WebP
      await sharp(filePath)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: QUALITY.webp, lossless: false })
        .toFile(path.join(dirName, `${fileName}.webp`));

      console.log(`✅ ${path.basename(filePath)} optimisé (PNG + WebP)`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${path.basename(filePath)}:`, error.message);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await optimizeImage(filePath);
      }
    }
  }
}

async function main() {
  console.log('🚀 Démarrage de l\'optimisation des images...\n');
  console.log(`📁 Répertoire: ${IMAGES_DIR}\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Le répertoire des images n\'existe pas!');
    process.exit(1);
  }

  await processDirectory(IMAGES_DIR);

  console.log('\n✨ Optimisation terminée!');
  console.log('\n📊 Prochaines étapes:');
  console.log('1. Vérifiez les images optimisées dans public/images/');
  console.log('2. Remplacez les originaux par les versions .optimized si satisfait');
  console.log('3. Utilisez les versions WebP/AVIF dans vos composants Next.js Image');
  console.log('4. Exécutez "npm run optimize:svg" pour optimiser les SVG');
}

main().catch(console.error);