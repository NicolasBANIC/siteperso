'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './Button';

/**
 * Composant Card réutilisable
 * Variantes : service, project, price, testimonial
 * Props : title, description, icon/image, actions, tags
 */
export function Card({ 
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
  const baseStyles = 'rounded-lg bg-surface border border-border p-8 transition-all duration-300';
  
  const variantStyles = {
    service: 'hover:shadow-card-hover hover:-translate-y-1',
    project: 'overflow-hidden hover:shadow-card-hover',
    price: 'relative hover:shadow-elevation hover:scale-105',
    testimonial: 'bg-surface/50 backdrop-blur-sm',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <motion.div
      className={combinedClassName}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    >
      {/* Image pour project variant */}
      {variant === 'project' && image && (
        <div className="relative h-48 w-full mb-6 -mt-8 -mx-8 overflow-hidden">
          <Image
            src={image}
            alt={title || 'Project image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      {/* Icon pour service variant */}
      {variant === 'service' && icon && (
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
      )}
      
      {/* Title */}
      {title && (
        <h3 className="text-heading-md font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-body text-muted mb-6 leading-relaxed">
          {description}
        </p>
      )}
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-ui-sm font-medium text-accent"
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
}

export default Card;