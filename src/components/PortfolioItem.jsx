'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

/**
 * Composant PortfolioItem
 * Props : title, category, image, stack, description, link
 */
export function PortfolioItem({ 
  title, 
  category, 
  image, 
  stack = [], 
  description, 
  link,
  slug 
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-lg bg-surface border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-body-sm text-foreground line-clamp-3">
            {description}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-ui-sm font-medium text-accent">
            {category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-heading-md font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        {/* Stack */}
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {stack.map((tech, index) => (
              <span
                key={index}
                className="text-ui-sm text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {/* Link */}
        {(link || slug) && (
          <Link
            href={slug ? `/portfolio/${slug}` : link}
            className="inline-flex items-center gap-2 text-ui font-medium text-accent hover:text-accent-secondary transition-colors"
          >
            Voir le projet
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export default PortfolioItem;