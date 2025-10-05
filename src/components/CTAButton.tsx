"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
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
  variant = "primary",
  showIcon = true,
  className = "" 
}: CTAButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  if (variant === "secondary") {
    return (
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Link 
          href={href}
          className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-8 py-4 text-ui font-semibold text-[var(--color-accent-foreground)] backdrop-blur-sm transition-all hover:border-[var(--color-accent)] hover:bg-gradient-to-br hover:from-[var(--color-accent)]/20 hover:to-[var(--color-accent-secondary)]/20 hover:[box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${className}`}
}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
          <span className="relative">{children}</span>
          {showIcon && <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link 
        href={href}
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-anthracite)] to-[var(--color-accent)] px-8 py-4 text-ui font-semibold text-[var(--color-foreground)] [box-shadow:var(--shadow-sm)] transition-all hover:from-[var(--color-accent)] hover:to-[var(--color-accent-secondary)] hover:[box-shadow:var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${className}`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{children}</span>
        {showIcon && <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />}
      </Link>
    </motion.div>
  );
}