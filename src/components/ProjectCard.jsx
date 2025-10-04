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
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-medium flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
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

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}