"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Star } from "lucide-react";

/**
 * Badge "Populaire" animé pour les cartes de tarifs
 * Animation spring avec rotation, respecte prefers-reduced-motion
 */
export default function PopularBadge({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute -right-3 -top-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accentSecondary to-accent px-4 py-2 text-ui-sm font-semibold text-white shadow-lg ${className}`}
      initial={prefersReducedMotion ? {} : { scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: -12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }
      }
    >
      <Star className="h-4 w-4 fill-current" aria-hidden="true" />
      <span>Populaire</span>
    </motion.div>
  );
}