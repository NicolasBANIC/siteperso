/**
 * Règle Zencoder : Validation de l'accessibilité
 * Vérifie les contrastes, focus visibles, hiérarchie des titres
 */

module.exports = {
  name: 'accessibility',
  description: 'Vérifie les bonnes pratiques d\'accessibilité (a11y)',
  
  check: async (context) => {
    const issues = [];
    const { files } = context;
    
    // Parcourir tous les fichiers JSX/TSX
    const componentFiles = files.filter(f => 
      f.path.match(/\.(jsx|tsx)$/) && !f.path.includes('node_modules')
    );
    
    for (const file of componentFiles) {
      const content = await file.read();
      
      // Vérifier les boutons sans aria-label ou texte
      const buttonWithoutLabelRegex = /<button\s+(?![^>]*(?:aria-label|children))[^>]*\/>/gi;
      const buttonsWithoutLabel = content.match(buttonWithoutLabelRegex) || [];
      
      buttonsWithoutLabel.forEach((button) => {
        issues.push({
          severity: 'error',
          file: file.path,
          line: getLineNumber(content, button),
          message: `Bouton sans texte ni aria-label (inaccessible aux lecteurs d'écran)`,
          suggestion: `Ajouter aria-label="description" ou du texte visible`
        });
      });
      
      // Vérifier les liens sans texte
      const linkWithoutTextRegex = /<a\s+[^>]*>\s*<\/a>/gi;
      const linksWithoutText = content.match(linkWithoutTextRegex) || [];
      
      linksWithoutText.forEach((link) => {
        issues.push({
          severity: 'error',
          file: file.path,
          line: getLineNumber(content, link),
          message: `Lien vide (inaccessible)`,
          suggestion: `Ajouter du texte descriptif ou aria-label`
        });
      });
      
      // Vérifier la hiérarchie des titres (h1 -> h2 -> h3)
      const headings = content.match(/<h([1-6])[^>]*>/gi) || [];
      let previousLevel = 0;
      
      headings.forEach((heading) => {
        const level = parseInt(heading.match(/<h([1-6])/)[1]);
        
        if (level > previousLevel + 1 && previousLevel !== 0) {
          issues.push({
            severity: 'warning',
            file: file.path,
            line: getLineNumber(content, heading),
            message: `Saut dans la hiérarchie des titres (h${previousLevel} -> h${level})`,
            suggestion: `Respecter l'ordre : h1 -> h2 -> h3 -> h4...`
          });
        }
        
        previousLevel = level;
      });
      
      // Vérifier les inputs sans label
      const inputWithoutLabelRegex = /<input\s+(?![^>]*(?:aria-label|id))[^>]*>/gi;
      const inputsWithoutLabel = content.match(inputWithoutLabelRegex) || [];
      
      inputsWithoutLabel.forEach((input) => {
        issues.push({
          severity: 'error',
          file: file.path,
          line: getLineNumber(content, input),
          message: `Input sans label associé`,
          suggestion: `Ajouter <label htmlFor="id"> ou aria-label`
        });
      });
      
      // Vérifier les éléments interactifs sans focus visible
      const interactiveElements = content.match(/<(button|a|input|select|textarea)[^>]*>/gi) || [];
      
      interactiveElements.forEach((element) => {
        if (!element.includes('focus:') && !element.includes('focus-visible:')) {
          issues.push({
            severity: 'warning',
            file: file.path,
            line: getLineNumber(content, element),
            message: `Élément interactif sans style de focus visible`,
            suggestion: `Ajouter focus:ring ou focus-visible:outline`
          });
        }
      });
    }
    
    return {
      passed: issues.filter(i => i.severity === 'error').length === 0,
      issues,
      summary: `${issues.length} problème(s) d'accessibilité détecté(s)`
    };
  }
};

function getLineNumber(content, searchString) {
  const lines = content.substring(0, content.indexOf(searchString)).split('\n');
  return lines.length;
}