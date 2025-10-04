"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(storedTheme === "dark" || (!storedTheme && prefersDark));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Smooth transition animation
    document.documentElement.style.setProperty('transition', 'background-color 0.5s ease, color 0.5s ease');
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsDark((prev) => !prev);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-ui-sm font-medium text-[var(--color-foreground)] shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:border-[var(--color-accent)]"
      aria-label="Changer le mode d'affichage"
    >
      <div className="relative h-5 w-5">
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-500 ${
            isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          } ${isAnimating ? 'animate-spin' : ''}`}
          aria-hidden 
        />
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-500 ${
            isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          } ${isAnimating ? 'animate-spin' : ''}`}
          aria-hidden 
        />
      </div>
      <span className="hidden sm:inline">
        {isDark ? 'Mode sombre' : 'Mode clair'}
      </span>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
    </button>
  );
}