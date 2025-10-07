'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

function ProjectCard({ title, category, description, image, technologies = [], onClick }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      className="card-glassmorphism-alt group cursor-pointer overflow-hidden p-6 transition-all duration-300 hover:border-primary/20"
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-medium flex items-center gap-2 text-sm">
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
            Voir le projet
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-heading font-semibold card-title-emerald mb-2 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted mb-4 line-clamp-2 leading-relaxed">{description}</p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2 py-1 bg-secondary/10 text-secondary rounded-md"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs font-medium px-2 py-1 text-muted">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);
