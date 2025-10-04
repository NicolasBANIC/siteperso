import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  className?: string;
}

/**
 * CTAButton - Bouton Call-to-Action réutilisable avec effet shimmer
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
  if (variant === "secondary") {
    return (
      <Link 
        href={href}
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-ui font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20 motion-reduce:transform-none ${className}`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-accent-matrix)] to-white opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
        <span className="relative">{children}</span>
        {showIcon && <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <Link 
      href={href}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-ui font-semibold text-[#0047AB] shadow-2xl transition-all hover:scale-105 hover:shadow-white/30 motion-reduce:transform-none ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      {showIcon && <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />}
    </Link>
  );
}