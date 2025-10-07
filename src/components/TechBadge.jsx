'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

const TechBadge = memo(function TechBadge({ name, logo, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.1, rotate: [0, -5, 5, 0] },
        whileTap: { scale: 0.95 },
      };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        {...animationProps}
        className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all hover:border-accent hover:shadow-card motion-reduce:transition-none"
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent to-accentSecondary opacity-0 blur-xl transition-opacity group-hover:opacity-20 motion-reduce:opacity-0"
          aria-hidden="true"
        />

        <Image
          src={logo}
          alt={`Logo ${name}`}
          width={48}
          height={48}
          className="relative z-10 h-12 w-12 object-contain transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && description && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2"
          >
            <div className="rounded-xl border border-border bg-surface p-4 shadow-xl backdrop-blur-sm">
              <div className="mb-2 text-base font-heading font-semibold text-foreground">
                {name}
              </div>
              <p className="text-sm leading-relaxed text-muted">{description}</p>
              {/* Arrow */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="h-3 w-3 rotate-45 border-l border-t border-border bg-surface" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default TechBadge;
