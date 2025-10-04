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
                ? 'fill-[var(--color-accent-matrix)] text-[var(--color-accent-matrix)]' 
                : 'text-[var(--color-muted)]/30'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-body text-[var(--color-foreground)] mb-6 italic leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={`Photo de profil de ${name}, ${role} chez ${company}`}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-ui font-semibold text-[var(--color-foreground)]">
            {name}
          </p>
          <p className="text-body-sm text-[var(--color-muted)]">
            {role} {company && `• ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
}