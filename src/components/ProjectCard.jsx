import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ 
  title, 
  category, 
  description, 
  image, 
  technologies = [],
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className="card group cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-foreground)]/80 via-[var(--color-foreground)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-medium flex items-center gap-2 text-ui">
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
            Voir le projet
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="badge">
            {category}
          </span>
        </div>

        <h3 className="text-heading-md font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-accent)] dark:group-hover:text-[var(--color-accent-matrix)] transition-colors">
          {title}
        </h3>

        <p className="text-body-sm text-[var(--color-muted)] mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="text-caption font-medium px-2 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] dark:bg-[var(--color-accent-matrix)]/10 dark:text-[var(--color-accent-matrix)] rounded"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-caption font-medium px-2 py-1 text-[var(--color-muted)]">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}