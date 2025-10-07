'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
  className?: string;
}

/**
 * CTAButton - Bouton Call-to-Action réutilisable avec effet shimmer et animations
 * Respecte prefers-reduced-motion
 *
 * @param href - URL de destination
 * @param children - Texte du bouton
 * @param variant - Style du bouton ("primary" | "secondary")
 * @param showIcon - Afficher l'icône flèche
 * @param className - Classes CSS additionnelles
 */
export default function CTAButton({
  href,
  children,
  variant = 'primary',
  showIcon = true,
  className = '',
}: CTAButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  if (variant === 'secondary') {
    return (
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Link
          href={href}
          className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-[var(--color-primary-500)]/30 bg-[var(--color-primary-500)]/10 px-8 py-4 text-ui font-semibold text-[var(--color-primary-500)] backdrop-blur-sm transition-all duration-300 ease-out hover:border-[var(--color-primary-500)] hover:bg-gradient-to-br hover:from-[var(--color-primary-500)]/20 hover:to-[var(--color-secondary-500)]/20 hover:shadow-lg hover:shadow-[var(--color-primary-500)]/30 focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
          style={{ '--tw-ring-color': 'var(--color-primary-500)' } as React.CSSProperties}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
          <span className="relative">{children}</span>
          {showIcon && (
            <ArrowRight
              className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              aria-hidden="true"
            />
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] px-8 py-4 text-ui font-semibold text-white shadow-md transition-all duration-300 ease-out hover:from-[var(--color-secondary-500)] hover:to-[var(--color-primary-500)] hover:shadow-lg hover:shadow-[var(--color-primary-500)]/30 focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        style={{ '--tw-ring-color': 'var(--color-primary-500)' } as React.CSSProperties}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{children}</span>
        {showIcon && (
          <ArrowRight
            className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            aria-hidden="true"
          />
        )}
      </Link>
    </motion.div>
  );
}
