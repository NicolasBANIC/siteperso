/**
 * Règle Zencoder : Validation des images optimisées
 * Vérifie que toutes les images ont des dimensions explicites et des attributs alt
 */

module.exports = {
  name: 'image-optimization',
  description: 'Vérifie l\'optimisation des images (dimensions, alt, lazy loading)',
  
  check: async (context) => {
    const issues = [];
    const { files } = context;
    
    // Parcourir tous les fichiers JSX/TSX
    const componentFiles = files.filter(f => 
      f.path.match(/\.(jsx|tsx)$/) && !f.path.includes('node_modules')
    );
    
    for (const file of componentFiles) {
      const content = await file.read();
      
      // Vérifier les balises <img> natives (à éviter)
      const nativeImgRegex = /<img\s+[^>]*>/gi;
      const nativeImgs = content.match(nativeImgRegex) || [];
      
      nativeImgs.forEach((img, index) => {
        issues.push({
          severity: 'warning',
          file: file.path,
          line: getLineNumber(content, img),
          message: `Utiliser <Image> de next/image au lieu de <img> pour l'optimisation automatique`,
          suggestion: `Remplacer par : import Image from 'next/image'`
        });
      });
      
      // Vérifier les <Image> sans width/height ni fill
      const imageWithoutDimensionsRegex = /<Image\s+(?![^>]*(?:width|height|fill))[^>]*>/gi;
      const imagesWithoutDimensions = content.match(imageWithoutDimensionsRegex) || [];
      
      imagesWithoutDimensions.forEach((img) => {
        if (!img.includes('fill')) {
          issues.push({
            severity: 'error',
            file: file.path,
            line: getLineNumber(content, img),
            message: `<Image> doit avoir width/height ou fill pour éviter CLS`,
            suggestion: `Ajouter width={} height={} ou fill`
          });
        }
      });
      
      // Vérifier les images sans alt
      const imageWithoutAltRegex = /<Image\s+(?![^>]*alt=)[^>]*>/gi;
      const imagesWithoutAlt = content.match(imageWithoutAltRegex) || [];
      
      imagesWithoutAlt.forEach((img) => {
        issues.push({
          severity: 'error',
          file: file.path,
          line: getLineNumber(content, img),
          message: `<Image> doit avoir un attribut alt pour l'accessibilité`,
          suggestion: `Ajouter alt="description de l'image"`
        });
      });
      
      // Vérifier les images LCP sans priority
      const heroSectionRegex = /HeroSection|hero-|Hero/i;
      if (heroSectionRegex.test(file.path)) {
        const imageWithoutPriorityRegex = /<Image\s+(?![^>]*priority)[^>]*>/gi;
        const imagesWithoutPriority = content.match(imageWithoutPriorityRegex) || [];
        
        imagesWithoutPriority.forEach((img) => {
          issues.push({
            severity: 'warning',
            file: file.path,
            line: getLineNumber(content, img),
            message: `Image dans Hero Section devrait avoir priority pour optimiser LCP`,
            suggestion: `Ajouter priority`
          });
        });
      }
    }
    
    return {
      passed: issues.filter(i => i.severity === 'error').length === 0,
      issues,
      summary: `${issues.length} problème(s) d'optimisation d'images détecté(s)`
    };
  }
};

function getLineNumber(content, searchString) {
  const lines = content.substring(0, content.indexOf(searchString)).split('\n');
  return lines.length;
}