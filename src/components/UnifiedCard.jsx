'use client';

import { memo } from 'react';
import { cn } from '@/lib/cn';

/**
 * Composant Card unifié selon spécifications BANDEV
 * - Fond #0D1D2C global
 * - Glassmorphisme léger (opacité < 0.12)
 * - Titres en couleur exacte du logo BANDEV (#10B981)
 * - Lisibilité exemplaire avec contrastes ≥ 4.5:1
 * - Hover cohérents avec transitions harmonisées
 */

const UnifiedCard = memo(function UnifiedCard({ 
  children, 
  className = '', 
  hover = true,
  emeraldTitle = true,
  as: Component = 'div',
  ...props 
}) {
  const baseClasses = [
    // Glassmorphisme subtil selon spécifications
    'backdrop-filter backdrop-blur-[10px]',
    'bg-white/8', // --surface-glass: rgba(255,255,255,0.08)
    'border border-white/18', // --stroke-glass: rgba(255,255,255,0.18)
    'rounded-[20px]', // --radius-2xl: 20px
    'shadow-[0_8px_24px_rgba(0,0,0,0.18)]', // --shadow-soft
    
    // Transitions harmonisées
    'transition-all duration-[240ms] ease-out',
    
    // Layout et padding harmonisés
    'p-6 md:p-8',
    
    // Assurer lisibilité sur fond #0D1D2C
    'text-[#E6E9E9]', // --anthracite-100 pour contraste optimal
  ];

  const hoverClasses = hover ? [
    'hover:transform hover:translate-y-[-2px]',
    'hover:bg-white/12', // --surface-glass-hover: rgba(255,255,255,0.12)
    'hover:border-white/28', // --stroke-glass-hover: rgba(255,255,255,0.28)
    'hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]', // --shadow-medium
  ] : [];

  const cardClasses = cn(
    ...baseClasses,
    ...hoverClasses,
    className
  );

  return (
    <Component 
      className={cardClasses}
      {...props}
    >
      {/* Wrapper pour appliquer les styles aux titres automatiquement */}
      <div className={cn(
        emeraldTitle && '[&_h1]:text-[#10B981] [&_h2]:text-[#10B981] [&_h3]:text-[#10B981]',
        '[&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold',
        '[&_h1]:tracking-[-0.02em] [&_h2]:tracking-normal [&_h3]:tracking-normal',
        '[&_p]:text-[#E6E9E9] [&_p]:leading-[1.6]', // Contraste et lisibilité optimale
        '[&_p]:max-w-[65ch] [&_p]:mx-auto', // Largeur de ligne optimale
      )}>
        {children}
      </div>
    </Component>
  );
});

export default UnifiedCard;