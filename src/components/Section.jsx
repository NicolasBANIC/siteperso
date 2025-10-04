'use client';

import { motion } from 'framer-motion';

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
  background = 'default' // 'default', 'surface', 'gradient'
}) {
  const bgClasses = {
    default: 'bg-background',
    surface: 'bg-surface',
    gradient: 'bg-gradient-to-br from-background via-surface to-background'
  };

  return (
    <section 
      id={id}
      className={`section ${bgClasses[background]} ${className}`}
    >
      <div className="section-content">
        {/* Title & Subtitle */}
        {(title || subtitle) && (
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {title && (
              <h2 className="section-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="section-subtitle">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {/* Content */}
        {children}
      </div>
    </section>
  );
}