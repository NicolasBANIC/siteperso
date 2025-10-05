'use client';

import { memo, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIsReady } from '@/lib/useIsReady';

/**
 * Composant Button - Charte Matrix (Anthracite, Blanc, Vert Matrix)
 * 
 * Respecte WCAG AA+ avec :
 * - Contraste ≥ 4.5:1
 * - États focus visibles (anneau vert Matrix)
 * - Support prefers-reduced-motion
 * - Lazy loading des effets lourds
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} props.variant - Style du bouton
 * @param {'sm' | 'md' | 'lg'} props.size - Taille du bouton
 * @param {string} props.href - Lien (optionnel, transforme en Link)
 * @param {React.ReactNode} props.icon - Icône (optionnel)
 * @param {boolean} props.fullWidth - Largeur 100%
 */
export const Button = memo(function Button({ 
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
  const buttonRef = useRef(null);
  const isReady = useIsReady(buttonRef);
  
  // Styles de base
  const baseStyles = [
    'relative inline-flex items-center justify-center gap-2',
    'rounded-[var(--radius-lg)] font-medium outline-none',
    'transition-all duration-fast',
    'focus:outline-none focus-visible:[box-shadow:var(--shadow-ring)] focus-visible:ring-0',
    'motion-reduce:transition-none',
  ].join(' ');
  
  // Variantes selon la charte Matrix
  const variantStyles = {
    // Primary : Fond anthracite + texte blanc → Hover : gradient vert Matrix + élévation
    primary: [
      'bg-[var(--color-anthracite)] text-white border border-transparent',
      'shadow-[var(--shadow-sm)]',
      isReady && 'hover:shadow-[var(--shadow-md)] hover:[box-shadow:var(--shadow-ring)]',
    ].filter(Boolean).join(' '),
    
    // Secondary : Transparent + bordure → Hover : gradient vert Matrix subtil
    secondary: [
      'bg-transparent border border-border text-foreground',
      isReady && 'hover:border-borderHover hover:text-accentMatrix',
      isReady && 'hover:bg-gradient-to-br hover:from-accent/10 hover:to-accentSecondary/15',
      isReady && 'hover:[box-shadow:var(--shadow-ring)]',
    ].filter(Boolean).join(' '),
    
    // Outline : Bordure neutre → Hover : bordure + gradient vert Matrix
    outline: [
      'bg-[var(--color-surface)] border border-border text-foreground',
      isReady && 'hover:border-borderHover hover:text-accentMatrix',
      isReady && 'hover:bg-[var(--color-surface-hover)]',
      isReady && 'hover:[box-shadow:var(--shadow-ring)]',
    ].filter(Boolean).join(' '),
  };
  
  const sizeStyles = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-8 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  // Animations Framer Motion (désactivées si prefers-reduced-motion)
  const animationProps = prefersReducedMotion ? {} : {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };
  
  const content = (
    <>
      {/* Gradient overlay pour effet hover (primary uniquement) */}
      {variant === 'primary' && isReady && (
        <span 
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-fast bg-gradient-to-br from-matrix2 to-matrix"
          aria-hidden="true"
        />
      )}
      
      {/* Contenu au-dessus du gradient */}
      <span className="relative inline-flex items-center justify-center gap-2">
        {children}
        {icon && <span className="ml-1">{icon}</span>}
      </span>
    </>
  );
  
  // Si href fourni, utiliser Next.js Link
  if (href) {
    return (
      <Link 
        ref={buttonRef}
        href={href}
        className={`${combinedClassName} group`}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        <motion.span
          className="inline-flex items-center justify-center gap-2 w-full h-full"
          {...animationProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }
  
  // Sinon, bouton standard
  return (
    <motion.button
      ref={buttonRef}
      className={`${combinedClassName} group`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...animationProps}
      {...props}
    >
      {content}
    </motion.button>
  );
});

/**
 * Composant ButtonLink - Version simplifiée pour liens stylisés
 */
export const ButtonLink = memo(function ButtonLink({ 
  children, 
  href,
  className = '', 
  variant = 'primary', 
  size = 'md',
  'aria-label': ariaLabel,
  ...props 
}) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Button>
  );
});

export default Button;