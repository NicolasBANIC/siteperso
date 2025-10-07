'use client';

import { useEffect, useState } from 'react';

/**
 * Hook useIsReady - Lazy loading des effets visuels lourds
 *
 * Utilise IntersectionObserver pour détecter quand un élément entre dans le viewport
 * et active les effets visuels uniquement à ce moment-là.
 *
 * @param {React.RefObject} ref - Référence à l'élément à observer
 * @param {Object} options - Options pour IntersectionObserver
 * @returns {boolean} isReady - true quand l'élément est visible
 *
 * @example
 * const ref = useRef(null);
 * const isReady = useIsReady(ref);
 *
 * return (
 *   <div ref={ref} className={isReady ? 'with-heavy-effects' : ''}>
 *     Content
 *   </div>
 * );
 */
export function useIsReady(ref, options = {}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Options par défaut : déclencher quand 10% de l'élément est visible
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isReady) {
          setIsReady(true);
          // Une fois activé, on peut arrêter d'observer
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, isReady, options]);

  return isReady;
}

/**
 * Hook useIsReadyMultiple - Version pour plusieurs éléments
 *
 * @param {Array<React.RefObject>} refs - Tableau de références
 * @returns {Array<boolean>} - Tableau de statuts isReady
 */
export function useIsReadyMultiple(refs) {
  const [readyStates, setReadyStates] = useState(refs.map(() => false));

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      const element = ref.current;
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setReadyStates((prev) => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
              });
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs && obs.element) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [refs]);

  return readyStates;
}
