"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider - Wrapper pour next-themes
 * 
 * Gère la persistance du thème (localStorage) et évite le flash de contenu non stylé (FOUC).
 * Supporte le mode système par défaut.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants
 */
export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="bandev-theme"
    >
      {children}
    </NextThemesProvider>
  );
}