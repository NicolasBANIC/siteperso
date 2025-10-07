'use client';

import { memo } from 'react';

function GlassmorphismCard({
  children,
  className = '',
  variant = 'default', // "default", "accent", "gradient", "brand"
  hover = true,
}) {
  // Variants harmonisés selon les nouvelles spécifications
  const variants = {
    default: 'bg-card-glass border-card-border',
    accent: 'bg-brand-emerald/8 border-brand-emerald/20',
    gradient: 'bg-card-gradient border-card-border',
    brand: 'bg-brand-gradient/10 border-brand-emerald/30',
  };

  // Effets hover maîtrisés selon spécifications
  const hoverEffect = hover
    ? 'hover:bg-card-glass-hover hover:border-card-border/40 hover:-translate-y-1 motion-reduce:hover:translate-y-0'
    : '';

  // Shadow harmonisée avec les nouveaux tokens
  const hoverShadow = hover ? 'hover:shadow-medium' : '';

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border
        backdrop-blur-[10px] -webkit-backdrop-blur-[10px]
        transition-medium
        ${variants[variant]}
        ${hoverEffect}
        shadow-soft
        ${hoverShadow}
        ${className}
      `}
    >
      {/* Shimmer effect avec couleur de marque */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-brand-emerald/8 to-transparent" />

      {/* Content avec espacement harmonisé */}
      <div className="relative z-10 p-card">{children}</div>
    </div>
  );
}

export default memo(GlassmorphismCard);
