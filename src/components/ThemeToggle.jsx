"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(storedTheme === "dark" || (!storedTheme && prefersDark));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      aria-label="Changer le mode d'affichage"
    >
      {isDark ? (
        <>
          <Moon className="h-4 w-4" aria-hidden />
          Mode sombre
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" aria-hidden />
          Mode clair
        </>
      )}
    </button>
  );
}