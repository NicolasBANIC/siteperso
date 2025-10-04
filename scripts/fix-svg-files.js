/**
 * Script pour identifier les fichiers SVG corrompus (PNG mal nommés)
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

function checkSVGFile(filePath) {
  const fileName = path.basename(filePath);
  
  try {
    const buffer = fs.readFileSync(filePath);
    
    // Vérifier si c'est un PNG (commence par PNG signature)
    const isPNG = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
    
    // Vérifier si c'est un vrai SVG (commence par < ou <?xml)
    const isSVG = buffer[0] === 0x3C; // '<'
    
    if (isPNG) {
      console.log(`⚠️  ${fileName} est un PNG mal nommé`);
      const newName = fileName.replace('.svg', '.png');
      const newPath = path.join(path.dirname(filePath), newName);
      fs.renameSync(filePath, newPath);
      console.log(`✅ Renommé en ${newName}`);
      return false;
    } else if (!isSVG) {
      console.log(`❌ ${fileName} n'est ni un SVG ni un PNG reconnu`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la vérification de ${fileName}:`, error.message);
    return false;
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  let validSVGs = 0;
  let invalidSVGs = 0;

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const result = processDirectory(filePath);
      validSVGs += result.valid;
      invalidSVGs += result.invalid;
    } else if (stat.isFile() && path.extname(file).toLowerCase() === '.svg') {
      if (checkSVGFile(filePath)) {
        validSVGs++;
      } else {
        invalidSVGs++;
      }
    }
  }

  return { valid: validSVGs, invalid: invalidSVGs };
}

function main() {
  console.log('🔍 Vérification des fichiers SVG...\n');
  console.log(`📁 Répertoire: ${IMAGES_DIR}\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Le répertoire des images n\'existe pas!');
    process.exit(1);
  }

  const result = processDirectory(IMAGES_DIR);

  console.log('\n✨ Vérification terminée!');
  console.log(`✅ SVG valides: ${result.valid}`);
  console.log(`⚠️  Fichiers corrigés: ${result.invalid}`);
  console.log('\n📊 Vous pouvez maintenant exécuter: npm run optimize:svg');
}

main().catch(console.error);