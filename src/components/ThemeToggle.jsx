"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeToggle - Bouton de bascule entre modes clair/sombre/système
 * 
 * Utilise next-themes pour une gestion robuste du thème avec persistance.
 * Affiche une animation fluide lors du changement de thème.
 * Respecte prefers-reduced-motion pour l'accessibilité.
 * 
 * Position : Fixed bottom-right avec z-index élevé
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // Évite le flash de contenu non stylé (FOUC)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    
    // Cycle : light → dark → system → light
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Ne rien afficher côté serveur pour éviter l'hydratation mismatch
  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 h-[52px] w-[52px] rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl" />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const isSystem = theme === 'system';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-ui-sm font-medium text-[var(--color-foreground)] shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none motion-reduce:hover:transform-none"
      aria-label={`Mode actuel : ${isSystem ? 'système' : isDark ? 'sombre' : 'clair'}. Cliquer pour changer.`}
      title={`Changer le thème (actuel : ${isSystem ? 'système' : isDark ? 'sombre' : 'clair'})`}
    >
      <div className="relative h-5 w-5">
        {/* Icône Soleil (mode clair) */}
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-500 motion-reduce:transition-none ${
            !isDark && !isSystem
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          } ${isAnimating ? 'animate-spin motion-reduce:animate-none' : ''}`}
          aria-hidden="true"
        />
        
        {/* Icône Lune (mode sombre) */}
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-500 motion-reduce:transition-none ${
            isDark && !isSystem
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          } ${isAnimating ? 'animate-spin motion-reduce:animate-none' : ''}`}
          aria-hidden="true"
        />
        
        {/* Icône Moniteur (mode système) */}
        <Monitor 
          className={`absolute inset-0 h-5 w-5 text-[var(--color-accent)] transition-all duration-500 motion-reduce:transition-none ${
            isSystem
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          } ${isAnimating ? 'animate-pulse motion-reduce:animate-none' : ''}`}
          aria-hidden="true"
        />
      </div>
      
      {/* Label textuel (masqué sur mobile) */}
      <span className="hidden sm:inline">
        {isSystem ? 'Système' : isDark ? 'Sombre' : 'Clair'}
      </span>
      
      {/* Effet de glow au survol */}
      <div 
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 motion-reduce:opacity-0" 
        aria-hidden="true"
      />
    </button>
  );
}