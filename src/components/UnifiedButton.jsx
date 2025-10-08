'use client';

import { memo } from 'react';
import { cn } from '@/lib/cn';

/**
 * Bouton unifié selon spécifications BANDEV
 * - Gradient émeraude→cyan selon spécifications
 * - Hover cohérents avec triade couleur
 * - Focus accessible avec outline émeraude
 * - Transitions harmonisées (160-240ms)
 * - Pills (border-radius: 9999px)
 */

const UnifiedButton = memo(function UnifiedButton({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const baseClasses = [
    // Font et poids harmonisés
    'font-inter font-semibold',
    'leading-normal',
    'tracking-wide',
    
    // Pills selon spécifications
    'rounded-full',
    'border-none',
    'cursor-pointer',
    
    // Transitions harmonisées
    'transition-all duration-[160ms] ease-out',
    
    // Focus accessible
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-[#10B981]', // --brand-emerald
    'focus-visible:ring-offset-2',
    
    // Disabled state
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
  ];

  // Variantes de couleurs
  const variants = {
    primary: [
      // Gradient émeraude→cyan exact selon spécifications
      'bg-gradient-to-r from-emerald-400 to-cyan-400',
      'text-slate-900', // Contraste optimal sur fond clair
      'shadow-[0_8px_24px_rgba(16,185,129,0.20)]', // --shadow-emerald
      
      // Hover states avec couleurs plus foncées
      'hover:from-emerald-600 hover:to-cyan-600',
      'hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]', // --shadow-medium
      'hover:transform hover:translate-y-[-1px] hover:scale-[1.02]',
      'motion-reduce:hover:transform-none',
    ],
    
    secondary: [
      // Glassmorphisme subtil
      'bg-white/8', // --surface-glass
      'border border-white/18', // --stroke-glass  
      'text-[#E6E9E9]', // --anthracite-100
      'shadow-[0_8px_24px_rgba(0,0,0,0.18)]', // --shadow-soft
      
      // Hover
      'hover:bg-white/12', // --surface-glass-hover
      'hover:border-white/28', // --stroke-glass-hover
      'hover:text-[#10B981]', // --brand-emerald
      'hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]',
      'hover:transform hover:translate-y-[-1px]',
      'motion-reduce:hover:transform-none',
    ],
    
    outline: [
      // Bordure émeraude
      'bg-transparent',
      'border border-[#10B981]', // --brand-emerald
      'text-[#10B981]',
      
      // Hover : remplissage émeraude
      'hover:bg-[#10B981]',
      'hover:text-slate-900',
      'hover:shadow-[0_8px_24px_rgba(16,185,129,0.20)]',
      'hover:transform hover:translate-y-[-1px]',
      'motion-reduce:hover:transform-none',
    ]
  };

  // Tailles harmonisées
  const sizes = {
    small: [
      'px-4 py-2',
      'text-sm', // --text-small: clamp(0.875rem, 1.5vw, 1rem)
    ],
    medium: [
      'px-6 py-3',
      'text-base', // --text-body: clamp(1rem, 2vw, 1.125rem)
    ],
    large: [
      'px-8 py-4',
      'text-lg',
    ]
  };

  const buttonClasses = cn(
    ...baseClasses,
    ...variants[variant],
    ...sizes[size],
    disabled && 'hover:transform-none hover:scale-100',
    className
  );

  return (
    <Component 
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
});

export default UnifiedButton;