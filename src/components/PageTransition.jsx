"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition - Transition fluide entre les pages
 * Ajoute un effet de fade lors du changement de route
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Déclencher la transition
    setIsTransitioning(true);

    // Réinitialiser après l'animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      // Scroll to top lors du changement de page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}