"use client";

import { useEffect, useRef, useState } from 'react';

export default function OptimizedVideo({ 
  src, 
  className = "",
  opacity = "opacity-30",
  disableOnMobile = true 
}) {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détection mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer pour jouer seulement quand visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    };
  }, []);

  // Ne pas afficher la vidéo sur mobile si désactivé
  if (disableOnMobile && isMobile) {
    return (
      <div 
        className={`h-full w-full bg-gradient-to-br from-[var(--color-anthracite)]/20 via-[var(--color-accent)]/20 to-[var(--color-anthracite)]/20 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      className={`h-full w-full object-cover ${opacity} ${className}`}
      style={{ 
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    </video>
  );
}