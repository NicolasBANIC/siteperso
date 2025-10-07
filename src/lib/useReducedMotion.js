'use client';

import { useEffect, useState } from 'react';

/**
 * Hook pour détecter la préférence de motion réduite de l'utilisateur
 * Respecte prefers-reduced-motion pour l'accessibilité
 * @returns {boolean} true si l'utilisateur préfère une motion réduite
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
