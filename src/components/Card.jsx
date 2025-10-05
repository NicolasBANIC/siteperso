'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Composant Card réutilisable
 * Variantes : service, project, price, testimonial
 * Props : title, description, icon/image, actions, tags
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
  
  const baseStyles = 'rounded-lg bg-surface border border-border p-8 shadow-[var(--shadow-sm)] transition-all duration-300 motion-reduce:transition-none';
  
  const variantStyles = {
    service: 'hover:[box-shadow:var(--shadow-md)] hover:border-borderHover',
    project: 'overflow-hidden hover:[box-shadow:var(--shadow-md)] hover:border-borderHover',
    price: 'relative hover:[box-shadow:var(--shadow-lg)] hover:border-borderHover',
    testimonial: 'bg-surface/50 backdrop-blur-sm shadow-[var(--shadow-sm)]',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  const animationProps = prefersReducedMotion ? {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
  } : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };
  
  const hoverProps = prefersReducedMotion ? {} : {
    whileHover: variant === 'service' ? { y: -8 } : variant === 'price' ? { scale: 1.02 } : {}
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
      
      {/* Icon pour service variant */}
      {variant === 'service' && icon && (
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent text-2xl">
          {icon}
        </div>
      )}
      
      {/* Title */}
      {title && (
        <h3 className="mb-4 text-heading-md font-heading font-semibold text-foreground">
          {title}
        </h3>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-base text-muted mb-6 leading-relaxed">
          {description}
        </p>
      )}
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-accentSecondary/10 px-3 py-1 text-sm font-medium text-accentSecondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Children (custom content) */}
      {children}
      
      {/* Actions */}
      {actions && (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions}
        </div>
      )}
    </motion.div>
  );
});

export { Card };
export default Card;