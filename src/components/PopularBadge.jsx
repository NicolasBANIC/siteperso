'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Composant PopularBadge
 * Badge "Populaire" pour les cartes de tarification
 */
export default function PopularBadge() {
  return (
    <motion.div
      className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-matrix)] px-4 py-1.5 text-caption font-semibold text-white shadow-lg"
      initial={{ scale: 0, rotate: -12 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 
      }}
    >
      <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      <span>Populaire</span>
    </motion.div>
  );
}