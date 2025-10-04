'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Composant StatItem avec compteur animé
 * Props : icon, count, label, suffix (optionnel)
 */
export function StatItem({ icon, count, label, suffix = '', description }) {
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
      spring.set(count);
    }
  }, [inView, count, spring]);
  
  useEffect(() => {
    const unsubscribe = spring.onChange((latest) => {
      setDisplayCount(Math.floor(latest));
    });
    
    return () => unsubscribe();
  }, [spring]);
  
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          {icon}
        </div>
      )}
      
      {/* Count */}
      <div className="mb-2">
        <span className="text-display font-bold text-foreground">
          {displayCount}{suffix}
        </span>
      </div>
      
      {/* Label */}
      <div className="text-heading-sm font-semibold text-foreground mb-1">
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
}

export default StatItem;