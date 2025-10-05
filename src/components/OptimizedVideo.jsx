"use client";

import { useEffect, useRef, useState } from 'react';

export default function OptimizedVideo({ 
  src, 
  className = "",
  opacity = "opacity-30",
  disableOnMobile = true,
  poster = null
}) {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Détection mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Détection prefers-reduced-motion
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkMobile();
    checkReducedMotion();
    
    window.addEventListener('resize', checkMobile);
    
    // Listen for changes to reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionMediaQuery.addEventListener('change', handleMotionChange);

    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Intersection Observer pour jouer seulement quand visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefersReducedMotion) {
            setShouldPlay(true);
            video.play().catch(() => {
              // Ignore les erreurs de lecture automatique
            });
          } else {
            setShouldPlay(false);
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [prefersReducedMotion]);

  // Fallback pour reduced motion - afficher poster ou gradient
  if (prefersReducedMotion) {
    return (
      <div 
        className={`h-full w-full ${className} ${opacity}`}
        style={{
          backgroundImage: poster 
            ? `url(${poster})` 
            : 'linear-gradient(135deg, rgba(26, 26, 26, 0.4), rgba(11, 138, 58, 0.2))',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        aria-hidden="true"
      />
    );
  }

  // Ne pas afficher la vidéo sur mobile si désactivé
  if (disableOnMobile && isMobile) {
    return (
      <div 
        className={`h-full w-full bg-gradient-to-br from-[var(--color-anthracite)]/20 via-[var(--color-accent)]/20 to-[var(--color-anthracite)]/20 ${className} ${opacity}`}
        aria-hidden="true"
      />
    );
  }

  // Extraire les sources WebM et MP4 
  const webmSrc = src.endsWith('.webm') ? src : src.replace(/\.mp4$/, '.webm');
  const mp4Src = src.endsWith('.mp4') ? src : src.replace(/\.webm$/, '.mp4');

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      autoPlay={false}
      preload="metadata"
      poster={poster}
      className={`h-full w-full object-cover ${opacity} ${className}`}
      style={{ 
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* WebM first for better performance */}
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
      {/* Fallback message */}
      <p className="sr-only">
        Votre navigateur ne supporte pas les vidéos HTML5.
      </p>
    </video>
  );
}