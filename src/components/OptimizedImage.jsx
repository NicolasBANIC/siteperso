/**
 * Composant Image optimisé avec support WebP/AVIF automatique
 * Utilise Next.js Image avec lazy loading et placeholder blur
 */

import Image from 'next/image';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  objectFit = 'cover',
  ...props
}) {
  // Déterminer si c'est une image locale ou externe
  const isLocal = src.startsWith('/');

  // Configuration optimale pour Next.js Image
  const imageProps = {
    src,
    alt,
    quality,
    className: `${className} gpu-accelerated`,
    priority,
    ...props,
  };

  // Si fill est true, on utilise le mode fill
  if (fill) {
    imageProps.fill = true;
    imageProps.style = { objectFit };
  } else {
    imageProps.width = width;
    imageProps.height = height;
  }

  // Sizes par défaut optimisés pour responsive
  if (!sizes && !fill) {
    imageProps.sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  } else if (sizes) {
    imageProps.sizes = sizes;
  }

  // Placeholder blur pour images locales (améliore LCP)
  if (isLocal && !priority) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==';
  }

  // Loading lazy par défaut sauf si priority
  if (!priority) {
    imageProps.loading = 'lazy';
  }

  return <Image {...imageProps} />;
}

/**
 * Variante pour images hero (above the fold)
 */
export function HeroImage({ src, alt, className = '', ...props }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={true}
      quality={90}
      sizes="100vw"
      {...props}
    />
  );
}

/**
 * Variante pour thumbnails/cards
 */
export function ThumbnailImage({ src, alt, className = '', ...props }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      quality={80}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
      {...props}
    />
  );
}

/**
 * Variante pour avatars
 */
export function AvatarImage({ src, alt, size = 40, className = '', ...props }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      quality={85}
      sizes={`${size}px`}
      {...props}
    />
  );
}