'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Composant Section réutilisable
 * Props : id, title, subtitle, background, children
 */
export default function Section({
  children,
  className = '',
  id = '',
  title,
  subtitle,
  background = 'default', // 'default', 'surface', 'gradient'
}) {
  const prefersReducedMotion = useReducedMotion();

  const bgClasses = {
    default: 'bg-background',
    surface: 'bg-surface',
    gradient: 'bg-gradient-to-br from-background via-surface to-background',
  };

  const animationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        whileInView: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section id={id} className={`py-section ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-gutter">
        {/* Title & Subtitle */}
        {(title || subtitle) && (
          <motion.div
            className="mb-16 text-center space-y-4"
            viewport={{ once: true }}
            {...animationProps}
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold card-title-emerald">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </motion.div>
        )}

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
