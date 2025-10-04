"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ParallaxSection - Section avec effet parallax sur le fond
 * 
 * @param {React.ReactNode} children - Contenu de la section
 * @param {string} backgroundImage - URL de l'image de fond
 * @param {number} speed - Vitesse du parallax (0.1 = lent, 0.5 = rapide)
 * @param {string} className - Classes CSS additionnelles
 * @param {string} overlayColor - Couleur de l'overlay (ex: "rgba(0,0,0,0.5)")
 */
export default function ParallaxSection({ 
  children, 
  backgroundImage,
  speed = 0.5,
  className = "",
  overlayColor = "rgba(0, 0, 0, 0.4)"
}) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculer l'offset seulement si la section est visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        const elementTop = rect.top + scrollPosition;
        const scrolled = scrollPosition - elementTop + windowHeight;
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
    <section 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background avec parallax */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 -z-10"
          style={{
            transform: `translateY(${offset * 0.5}px)`,
            transition: "transform 0.1s ease-out",
            willChange: "transform"
          }}
        >
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              transform: "scale(1.2)", // Surcharge pour éviter les bords vides
            }}
          />
          {/* Overlay */}
          {overlayColor && (
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: overlayColor }}
            />
          )}
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}