'use client';

import { memo } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * TestimonialCard - Carte de témoignage client avec animation
 * 
 * @param {string} name - Nom du client
 * @param {string} role - Poste du client
 * @param {string} company - Entreprise du client
 * @param {string} content - Contenu du témoignage
 * @param {number} rating - Note sur 5 (défaut: 5)
 * @param {string} avatar - URL de l'avatar (défaut: placeholder)
 */
function TestimonialCard({ 
  name, 
  role, 
  company, 
  content, 
  rating = 5,
  avatar = '/images/avatar-placeholder.jpg'
}) {
  const prefersReducedMotion = useReducedMotion();

  const cardAnimationProps = prefersReducedMotion ? {} : {
    whileHover: { y: -4 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  return (
    <motion.div 
      className="bg-surface border border-border rounded-lg p-6 shadow-card hover:shadow-matrix-lg hover:border-accent transition-all duration-300 motion-reduce:transition-none"
      {...cardAnimationProps}
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4" role="img" aria-label={`Note: ${rating} sur 5 étoiles`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating 
                ? 'fill-accentSecondary text-accentSecondary' 
                : 'text-muted/30'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-body text-foreground mb-6 italic leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-accent/20">
          <Image
            src={avatar}
            alt={`Photo de profil de ${name}, ${role} chez ${company}`}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-ui font-semibold text-foreground font-heading">
            {name}
          </p>
          <p className="text-body-sm text-muted">
            {role} {company && `• ${company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(TestimonialCard);