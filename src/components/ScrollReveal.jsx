"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" // "up", "down", "left", "right", "fade"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Vérifier si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Augmenté de 0.1 à 0.15 pour déclencher plus tard
        rootMargin: "0px 0px -80px 0px", // Augmenté pour déclencher plus tard
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransformClass = () => {
    // Réduit la distance de translation pour des animations plus subtiles
    if (direction === "up") return "translate-y-4";
    if (direction === "down") return "-translate-y-4";
    if (direction === "left") return "translate-x-4";
    if (direction === "right") return "-translate-x-4";
    return "";
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:translate-x-0 ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}