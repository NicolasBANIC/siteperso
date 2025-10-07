'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Composant Card refactorisé selon nouvelles spécifications BANDEV
 * Glassmorphisme subtil, couleurs harmonisées, lisibilité optimale
 * Variantes : service, project, price, testimonial
 */
const Card = memo(function Card({
  variant = 'service',
  title,
  description,
  icon,
  image,
  actions,
  tags,
  className = '',
  children,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  // Styles de base selon spécifications
  const baseStyles = `
    glass-card p-card
    transition-medium motion-reduce:transition-none
    hover-lift motion-reduce:hover:transform-none
  `;

  // Variants harmonisés avec nouveaux tokens
  const variantStyles = {
    service: 'hover:border-brand-emerald/20 hover:bg-card-glass-hover',
    project: 'overflow-hidden hover:border-brand-emerald/20',
    price: 'relative hover:border-brand-emerald/20 hover:shadow-emerald',
    testimonial: 'border-brand-emerald/10 bg-card-glass/80',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Animations harmonisées avec transitions
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

  // Hover effects maîtrisés selon spécifications
  const hoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: variant === 'service' ? { y: -4 } : {}, // Réduit pour subtilité
      };

  return (
    <motion.div
      className={combinedClassName}
      viewport={{ once: true }}
      {...animationProps}
      {...hoverProps}
      {...props}
    >
      {/* Image pour project variant */}
      {variant === 'project' && image && (
        <div className="relative h-48 w-full mb-6 -mt-8 -mx-8 overflow-hidden">
          <Image
            src={image}
            alt={title || 'Project image'}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Icon pour service variant - Harmonisé avec couleur de marque */}
      {variant === 'service' && icon && (
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-emerald/8 text-brand-emerald text-2xl shadow-soft border border-brand-emerald/20">
          {icon}
        </div>
      )}

      {/* Title - COULEUR EXACTE DU LOGO BANDEV selon spécifications */}
      {title && (
        <h3 className="card-title mb-4 text-heading-lg font-heading font-bold text-brand-emerald transition-fast">{title}</h3>
      )}

      {/* Description - Lisibilité optimale sur fond foncé */}
      {description && <p className="text-body text-anthracite-100 mb-6 leading-relaxed">{description}</p>}

      {/* Tags - Harmonisés avec couleur de marque */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-brand-emerald/8 px-3 py-1 text-small font-medium text-brand-emerald border border-brand-emerald/20 transition-fast hover:bg-brand-emerald/12"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Children (custom content) */}
      {children}

      {/* Actions */}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </motion.div>
  );
});

export { Card };
export default Card;
