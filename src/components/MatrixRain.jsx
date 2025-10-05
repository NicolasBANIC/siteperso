"use client";

import { useEffect, useRef, useState } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationInterval;
    
    // Intersection Observer pour pause automatique
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Set canvas size avec debounce
    let resizeTimeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - réduit pour performance
    const chars = '01アイウエオカキクケコサシスセソ';
    const fontSize = 16; // Augmenté pour moins de colonnes
    const columns = Math.floor(canvas.width / fontSize) * 0.5; // 50% moins de colonnes
    const drops = Array(Math.floor(columns)).fill(1);

    // Animation optimisée
    const draw = () => {
      if (!isVisible) return; // Pause si non visible

      // Fade effect - Utiliser anthracite au lieu de blanc pour éviter le voile gris
      ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41'; // Matrix green intense (#00FF41 = vert Matrix authentique)
      ctx.font = `bold ${fontSize}px monospace`;

      // Dessiner seulement une partie des drops pour économiser CPU
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize * 2; // Espacement doublé
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Réduit de 30 FPS à 20 FPS (50ms au lieu de 33ms)
    if (isVisible) {
      animationInterval = setInterval(draw, 50);
    }

    return () => {
      clearInterval(animationInterval);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-[0.08]"
      aria-hidden="true"
    />
  );
}