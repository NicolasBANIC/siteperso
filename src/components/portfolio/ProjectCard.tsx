'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  shortDescription: string;
  index: number;
}

export default function ProjectCard({
  slug,
  title,
  category,
  coverImage,
  shortDescription,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:scale-[1.02] hover:border-[var(--color-border-hover)] hover:[box-shadow:var(--shadow-lg)] motion-reduce:transform-none"
    >
      <Link href={`/portfolio/${slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage}
            alt={`Aperçu du projet ${title} - ${shortDescription}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Badge catégorie */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* CTA hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-sm)]">
              <span>Voir le projet</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">{shortDescription}</p>
        </div>
      </Link>
    </motion.article>
  );
}
