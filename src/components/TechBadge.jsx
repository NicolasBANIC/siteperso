"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechBadge({ name, logo, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm transition-all hover:border-[var(--color-accent)] hover:shadow-lg"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 blur-xl transition-opacity group-hover:opacity-20" aria-hidden="true" />
        
        <Image
          src={logo}
          alt={`Logo ${name}`}
          width={48}
          height={48}
          className="relative z-10 h-12 w-12 object-contain transition-transform group-hover:scale-110"
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && description && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2"
          >
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xl backdrop-blur-sm">
              <div className="mb-2 font-semibold text-[var(--color-foreground)]">
                {name}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {description}
              </p>
              {/* Arrow */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="h-3 w-3 rotate-45 border-l border-t border-[var(--color-border)] bg-[var(--color-surface)]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}