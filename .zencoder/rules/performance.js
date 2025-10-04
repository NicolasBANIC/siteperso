/**
 * Règle Zencoder : Validation des performances
 * Vérifie les imports dynamiques, code splitting, scripts optimisés
 */

module.exports = {
  name: 'performance',
  description: 'Vérifie les optimisations de performance',
  
  check: async (context) => {
    const issues = [];
    const { files } = context;
    
    // Parcourir tous les fichiers JSX/TSX
    const componentFiles = files.filter(f => 
      f.path.match(/\.(jsx|tsx)$/) && !f.path.includes('node_modules')
    );
    
    for (const file of componentFiles) {
      const content = await file.read();
      
      // Vérifier les scripts sans strategy
      const scriptWithoutStrategyRegex = /<Script\s+(?![^>]*strategy)[^>]*>/gi;
      const scriptsWithoutStrategy = content.match(scriptWithoutStrategyRegex) || [];
      
      scriptsWithoutStrategy.forEach((script) => {
        issues.push({
          severity: 'warning',
          file: file.path,
          line: getLineNumber(content, script),
          message: `<Script> sans strategy (peut bloquer le rendu)`,
          suggestion: `Ajouter strategy="afterInteractive" ou "lazyOnload"`
        });
      });
      
      // Vérifier les gros composants sans dynamic import
      const componentSize = content.length;
      const hasDynamicImport = content.includes('dynamic(');
      
      if (componentSize > 10000 && !hasDynamicImport && !file.path.includes('layout')) {
        issues.push({
          severity: 'info',
          file: file.path,
          message: `Composant volumineux (${Math.round(componentSize/1000)}KB) - envisager dynamic import`,
          suggestion: `import dynamic from 'next/dynamic'; const Component = dynamic(() => import('./Component'))`
        });
      }
      
      // Vérifier les animations sans motion-reduce
      const hasAnimations = content.match(/animate-|transition-|duration-/gi);
      const hasMotionReduce = content.includes('motion-reduce:');
      
      if (hasAnimations && !hasMotionReduce) {
        issues.push({
          severity: 'warning',
          file: file.path,
          message: `Animations sans respect de prefers-reduced-motion`,
          suggestion: `Ajouter motion-reduce:transition-none ou vérifier @media (prefers-reduced-motion)`
        });
      }
      
      // Vérifier les fetch sans cache
      const fetchRegex = /fetch\([^)]*\)/gi;
      const fetches = content.match(fetchRegex) || [];
      
      fetches.forEach((fetchCall) => {
        if (!fetchCall.includes('cache:') && !fetchCall.includes('next:')) {
          issues.push({
            severity: 'info',
            file: file.path,
            line: getLineNumber(content, fetchCall),
            message: `fetch() sans stratégie de cache explicite`,
            suggestion: `Ajouter { cache: 'force-cache' } ou { next: { revalidate: 3600 } }`
          });
        }
      });
      
      // Vérifier les useState/useEffect côté serveur
      if (file.path.includes('/app/') && !content.includes('"use client"')) {
        const hasClientHooks = content.match(/useState|useEffect|useRef|useContext/gi);
        
        if (hasClientHooks) {
          issues.push({
            severity: 'error',
            file: file.path,
            message: `Hooks React client dans Server Component`,
            suggestion: `Ajouter "use client" en haut du fichier ou déplacer la logique`
          });
        }
      }
    }
    
    return {
      passed: issues.filter(i => i.severity === 'error').length === 0,
      issues,
      summary: `${issues.length} problème(s) de performance détecté(s)`
    };
  }
};

function getLineNumber(content, searchString) {
  const lines = content.substring(0, content.indexOf(searchString)).split('\n');
  return lines.length;
}