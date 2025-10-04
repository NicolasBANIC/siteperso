import { Star } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialCard({ 
  name, 
  role, 
  company, 
  content, 
  rating = 5,
  avatar = '/images/avatar-placeholder.jpg'
}) {
  return (
    <div className="card group">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={`Photo de ${name}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {role} {company && `• ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
}