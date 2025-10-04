"use client";

import { useEffect, useRef, useState } from 'react';

export default function MeshGradient({ 
  colors = ['#0047AB', '#006D77'],
  className = "" 
}) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let time = 0;

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

    // Debounce resize
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

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgbColors = colors.map(hexToRgb);

    const drawGradient = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Réduit de 3 à 2 couches pour performance
      for (let i = 0; i < 2; i++) {
        const x1 = width * (0.5 + 0.3 * Math.sin(time * 0.0008 + i)); // Ralenti
        const y1 = height * (0.5 + 0.3 * Math.cos(time * 0.0008 + i));

        const gradient = ctx.createRadialGradient(
          x1, y1, 0,
          x1, y1, width * 0.8
        );

        const color = rgbColors[i % rgbColors.length];
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return; // Pause si non visible
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGradient();
      time += 20; // Ralenti de 16 à 20
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, [colors, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}