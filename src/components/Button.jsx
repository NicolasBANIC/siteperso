'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Composant Button réutilisable avec accessibilité WCAG AA
 * Props: variant ('primary' | 'secondary' | 'outline'), size ('sm' | 'md' | 'lg'), 
 *        href?, icon?, fullWidth?
 */
export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  href,
  icon,
  fullWidth = false,
  'aria-label': ariaLabel,
  ...props 
}) {
  const prefersReducedMotion = useReducedMotion();
  
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium outline-none transition-all duration-200 motion-reduce:transition-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-accent to-accentSecondary text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent shadow-card hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
    outline: 'bg-transparent border-2 border-border text-foreground hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-8 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  const animationProps = prefersReducedMotion ? {} : {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };
  
  const content = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  );
  
  // Next.js 15: Utiliser Link directement sans legacyBehavior
  if (href) {
    return (
      <Link 
        href={href}
        className={combinedClassName}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        <motion.span
          className="inline-flex items-center justify-center gap-2"
          {...animationProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }
  
  // Pour les boutons sans href
  return (
    <motion.button
      className={combinedClassName}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...animationProps}
      {...props}
    >
      {content}
    </motion.button>
  );
}

/**
 * Composant ButtonLink pour les liens stylisés comme des boutons
 */
export function ButtonLink({ 
  children, 
  href,
  className = '', 
  variant = 'primary', 
  size = 'md',
  'aria-label': ariaLabel,
  ...props 
}) {
  const prefersReducedMotion = useReducedMotion();
  
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium outline-none transition-all duration-200 motion-reduce:transition-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-accent to-accentSecondary text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent shadow-card hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-border hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
    ghost: 'bg-transparent hover:bg-surface focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-5 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  const animationProps = prefersReducedMotion ? {} : {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };
  
  return (
    <motion.a 
      href={href}
      className={combinedClassName}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.a>
  );
}