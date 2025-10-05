'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * StatItem - Composant de statistique avec compteur animé
 * 
 * @param {React.ReactNode} icon - Icône à afficher
 * @param {number} count - Valeur numérique à afficher
 * @param {string} label - Label de la statistique
 * @param {string} suffix - Suffixe (ex: "+", "%", "h")
 * @param {string} description - Description optionnelle
 */
const StatItem = memo(function StatItem({ icon, count, label, suffix = '', description }) {
  const prefersReducedMotion = useReducedMotion();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const [displayCount, setDisplayCount] = useState(0);
  
  const spring = useSpring(0, {
    stiffness: 80,
    damping: 15,
  });
  
  useEffect(() => {
    if (inView) {
      if (prefersReducedMotion) {
        // Affichage instantané si motion réduite
        setDisplayCount(count);
      } else {
        // Animation du compteur
        spring.set(count);
      }
    }
  }, [inView, count, spring, prefersReducedMotion]);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const unsubscribe = spring.onChange((latest) => {
      setDisplayCount(Math.floor(latest));
    });
    
    return () => unsubscribe();
  }, [spring, prefersReducedMotion]);

  const animationProps = prefersReducedMotion ? {
    initial: { opacity: 1 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' }
  };
  
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-6"
      {...animationProps}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent motion-safe:transition-transform motion-safe:hover:scale-110 motion-reduce:hover:scale-100">
          {icon}
        </div>
      )}
      
      {/* Count */}
      <div className="mb-2">
        <span className="text-display font-bold text-foreground font-heading">
          {displayCount}{suffix}
        </span>
      </div>
      
      {/* Label */}
      <div className="text-heading-sm font-semibold text-foreground mb-1 font-heading">
        {label}
      </div>
      
      {/* Description */}
      {description && (
        <div className="text-body-sm text-muted">
          {description}
        </div>
      )}
    </motion.div>
  );
});

export { StatItem };
export default StatItem;