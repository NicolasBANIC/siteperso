'use client';

import { useEffect, useState } from 'react';

/**
 * Hook pour détecter si l'utilisateur a scrollé au-delà d'un certain offset
 * @param {number} offset - Nombre de pixels avant de considérer la page comme scrollée (défaut: 0)
 * @returns {boolean} - true si window.scrollY > offset
 */
export function useScrolled(offset = 0) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > offset);
    };

    // Vérifier l'état initial
    onScroll();

    // Écouter les événements de scroll avec passive pour les performances
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [offset]);

  return scrolled;
}
