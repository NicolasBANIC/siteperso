'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Preloader Component
 * Affiche un logo animé pendant le chargement initial de l'application
 */
export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Simuler un temps de chargement minimum pour l'animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          {/* Logo animé */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: prefersReducedMotion ? 1 : [0.9, 1.1, 1],
              opacity: 1 
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {/* Logo SVG ou texte */}
            <div className="flex flex-col items-center gap-4">
              <img
                src="/brand/logo.svg"
                alt="BANDEV"
                width="180"
                height="60"
                className="h-16 w-auto"
              />
              
              {/* Barre de progression */}
              <div className="w-48 h-1 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accentSecondary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0 : 1.5,
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Effet de grille Matrix en arrière-plan */}
          {!prefersReducedMotion && (
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(13, 153, 255, 0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(13, 153, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}