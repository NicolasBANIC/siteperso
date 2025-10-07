'use client';

import { memo } from 'react';

function GlassmorphismCard({
  children,
  className = '',
  variant = 'default', // "default", "accent", "gradient"
  hover = true,
}) {
  const variants = {
    default: 'bg-[var(--color-surface)] border-[var(--color-border)]',
    accent: 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30',
    gradient:
      'bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-secondary)]/10 border-[var(--color-border)]',
    gold: 'bg-gradient-to-br from-[var(--color-gold)]/5 to-[var(--color-gold-light)]/10 border-[var(--color-gold)]/30',
  };

  const hoverEffect = hover
    ? 'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] hover:-translate-y-2 motion-reduce:hover:translate-y-0'
    : '';

  const hoverShadow = hover ? 'hover:[box-shadow:var(--shadow-md)]' : '';

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl
        transition-all duration-300
        ${variants[variant]}
        ${hoverEffect}
        shadow-[var(--shadow-sm)]
        ${hoverShadow}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[var(--color-accent-matrix)]/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default memo(GlassmorphismCard);
