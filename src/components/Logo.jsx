"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Logo BANDEV unifié - Cohérent avec le design system héros
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.variant - Variante du logo ('default', 'compact', 'icon')
 * @param {number} props.height - Hauteur personnalisée en pixels
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.withGlow - Active l'effet glow au hover
 * @returns {JSX.Element}
 */
export default function Logo({ 
  variant = 'default',
  height = 48,
  className = '',
  withGlow = true,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  // Calcul du ratio pour maintenir les proportions
  const width = variant === 'compact' ? height * 2.5 : height * 3.75;

  const logoVariants = {
    default: {
      scale: 1,
      filter: withGlow ? "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      filter: withGlow 
        ? "drop-shadow(0 2px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 12px rgba(0,122,94,0.4))" 
        : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
    },
  };

  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      variants={logoVariants}
      initial="default"
      whileHover="hover"
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: "easeOut",
      }}
      data-testid="unified-logo"
      {...props}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 180 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="BANDEV - Développeur Web Freelance"
      >
        <title>BANDEV</title>
        <defs>
          {/* Gradient émeraude unifié */}
          <linearGradient id={`emerald-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#007A5E', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#10b981', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#007A5E', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Filtre pour ombre textuelle */}
          <filter id={`text-shadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" floodOpacity="1"/>
          </filter>
        </defs>

        {/* BAN en blanc pur - cohérent avec les titres héros */}
        <text 
          x="0" 
          y="32" 
          fontFamily="'Inter', system-ui, sans-serif" 
          fontSize={variant === 'compact' ? "28" : "32"} 
          fontWeight="900" 
          fill="#FFFFFF" 
          filter={`url(#text-shadow-${variant})`}
          letterSpacing="-0.02em"
        >
          BAN
        </text>

        {/* DEV en émeraude - accent cohérent avec le design system */}
        <text 
          x={variant === 'compact' ? "65" : "78"} 
          y="32" 
          fontFamily="'Inter', system-ui, sans-serif" 
          fontSize={variant === 'compact' ? "28" : "32"} 
          fontWeight="900" 
          fill={`url(#emerald-gradient-${variant})`} 
          filter={`url(#text-shadow-${variant})`}
          letterSpacing="-0.02em"
        >
          DEV
        </text>

        {/* Accent line décoratif - rappel de l'identité émeraude */}
        {variant !== 'compact' && (
          <line 
            x1="0" 
            y1="40" 
            x2="164" 
            y2="40" 
            stroke="#007A5E" 
            strokeWidth="2" 
            opacity="0.4"
          />
        )}
      </svg>
    </motion.div>
  );
}

/**
 * Variantes spécialisées du logo pour différents contextes
 */
export const LogoCompact = (props) => (
  <Logo variant="compact" height={36} {...props} />
);

export const LogoHeader = (props) => (
  <Logo variant="default" height={48} withGlow={true} {...props} />
);

export const LogoFooter = (props) => (
  <Logo variant="default" height={40} withGlow={false} {...props} />
);