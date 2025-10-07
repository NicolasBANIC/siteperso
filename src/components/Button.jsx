'use client';

import { memo, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIsReady } from '@/lib/useIsReady';

/**
 * Composant Button refactorisé selon nouvelles spécifications BANDEV
 * 
 * Respecte la nouvelle charte avec fond #5D726F et glassmorphisme subtil :
 * - Couleur de marque exacte du logo BANDEV (#10B981)
 * - Gamme anthracite pour contrastes
 * - Glassmorphisme maîtrisé (opacité < 0.12)
 * - Contraste WCAG AA garantie (≥ 4.5:1)
 * - Hover cohérents selon triade chromatique
 * - Focus accessible avec couleur de marque
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} props.variant - Style du bouton
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
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef(null);
  const isReady = useIsReady(buttonRef);

  // Styles de base selon spécifications
  const baseStyles = [
    'relative inline-flex items-center justify-center gap-2',
    'rounded-[var(--radius-2xl)] font-semibold outline-none',
    'transition-medium motion-reduce:transition-none',
    'cursor-pointer disabled:cursor-not-allowed',
    'focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-[var(--focus-offset)]',
    'focus-visible:[box-shadow:var(--focus-shadow)]',
  ].join(' ');

  // Variantes harmonisées selon spécifications
  const variantStyles = {
    // Primary : Couleur exacte du logo BANDEV + contraste optimal
    primary: [
      'bg-brand-gradient text-anthracite-50 border border-transparent',
      'shadow-emerald',
      !disabled && isReady && 'hover:bg-brand-emerald hover:shadow-medium hover:-translate-y-1',
      !disabled && isReady && 'hover:scale-[1.02] active:scale-[0.98]',
      disabled && 'opacity-50 cursor-not-allowed',
    ]
      .filter(Boolean)
      .join(' '),

    // Secondary : Glassmorphisme avec couleur de marque
    secondary: [
      'bg-card-glass border border-card-border text-anthracite-100',
      'backdrop-blur-[10px] -webkit-backdrop-blur-[10px]',
      !disabled && isReady && 'hover:bg-card-glass-hover hover:border-brand-emerald/30',
      !disabled && isReady && 'hover:text-brand-emerald hover:shadow-soft',
      disabled && 'opacity-50 cursor-not-allowed',
    ]
      .filter(Boolean)
      .join(' '),

    // Outline : Bordure couleur de marque
    outline: [
      'bg-transparent border-2 border-brand-emerald text-brand-emerald',
      !disabled && isReady && 'hover:bg-brand-emerald/8 hover:border-brand-emerald',
      !disabled && isReady && 'hover:shadow-emerald hover:-translate-y-0.5',
      disabled && 'opacity-50 cursor-not-allowed border-anthracite-400 text-anthracite-400',
    ]
      .filter(Boolean)
      .join(' '),

    // Ghost : Transparent avec hover subtil
    ghost: [
      'bg-transparent border border-transparent text-anthracite-200',
      !disabled && isReady && 'hover:bg-anthracite-800/20 hover:text-brand-emerald',
      !disabled && isReady && 'hover:border-brand-emerald/20',
      disabled && 'opacity-50 cursor-not-allowed text-anthracite-500',
    ]
      .filter(Boolean)
      .join(' '),
  };

  // Tailles harmonisées avec espacements
  const sizeStyles = {
    sm: 'h-9 px-4 text-small gap-1',
    md: 'h-11 px-6 text-body gap-2',
    lg: 'h-12 px-8 text-body-lg gap-2',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className
  ].join(' ');

  // Animations harmonisées selon spécifications
  const animationProps = prefersReducedMotion || disabled
    ? {}
    : {
        whileHover: { y: variant === 'primary' ? -2 : -1, scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { 
          duration: 0.16, // var(--transition-fast)
          ease: 'easeOut' 
        },
      };

  const content = (
    <>
      {/* Gradient overlay pour effet hover primary */}
      {variant === 'primary' && isReady && !disabled && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-2xl)] opacity-0 group-hover:opacity-100 transition-fast bg-gradient-to-br from-brand-emerald to-secondary-500"
          aria-hidden="true"
        />
      )}

      {/* Shimmer effect subtil pour variants non-primary */}
      {(variant === 'secondary' || variant === 'outline') && isReady && !disabled && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-2xl)] opacity-0 group-hover:opacity-100 transition-fast bg-gradient-to-r from-transparent via-brand-emerald/10 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Contenu principal */}
      <span className="relative inline-flex items-center justify-center gap-inherit">
        {children}
        {icon && <span className="ml-1 text-inherit">{icon}</span>}
      </span>
    </>
  );

  // Si href fourni, utiliser Next.js Link
  if (href && !disabled) {
    return (
      <Link
        ref={buttonRef}
        href={href}
        className={`${combinedClassName} group`}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        <motion.span
          className="inline-flex items-center justify-center gap-inherit w-full h-full"
          {...animationProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  // Bouton standard
  return (
    <motion.button
      ref={buttonRef}
      className={`${combinedClassName} group`}
      disabled={disabled}
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

/**
 * Composant CTAButton - Call-to-Action optimisé avec couleur de marque
 */
export const CTAButton = memo(function CTAButton({
  children,
  className = '',
  size = 'lg',
  ...props
}) {
  return (
    <Button
      variant="primary"
      size={size}
      className={`font-bold tracking-wide shadow-emerald hover:shadow-strong ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
});

export default Button;