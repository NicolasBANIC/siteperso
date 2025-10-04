"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ParallaxImage - Image avec effet parallax au scroll
 * 
 * @param {string} src - Source de l'image
 * @param {string} alt - Texte alternatif
 * @param {number} width - Largeur de l'image
 * @param {number} height - Hauteur de l'image
 * @param {number} speed - Vitesse du parallax (0.1 = lent, 0.5 = rapide)
 * @param {string} className - Classes CSS additionnelles
 */
export default function ParallaxImage({ 
  src, 
  alt, 
  width, 
  height, 
  speed = 0.3,
  className = "",
  priority = false
}) {
  const imageRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const elementTop = rect.top + scrollPosition;
      const windowHeight = window.innerHeight;

      // Calculer l'offset seulement si l'élément est visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = scrollPosition + windowHeight - elementTop;
        const parallaxOffset = scrolled * speed;
        setOffset(parallaxOffset);
      }
    };

    // Vérifier si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      handleScroll(); // Initial calculation
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [speed]);

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto"
      }}
    >
      <div
        style={{
          transform: `translateY(${-offset * 0.5}px)`,
          transition: "transform 0.1s ease-out",
          willChange: "transform"
        }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-full w-full object-cover"
          style={{
            transform: "scale(1.2)", // Légère surcharge pour éviter les bords vides
          }}
        />
      </div>
    </div>
  );
}