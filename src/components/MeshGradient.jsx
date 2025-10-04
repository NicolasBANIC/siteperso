"use client";

import { useEffect, useRef } from 'react';

export default function MeshGradient({ 
  colors = ['#0047AB', '#006D77', '#00FF41'],
  className = "" 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

      // Create multiple gradient layers
      for (let i = 0; i < 3; i++) {
        const x1 = width * (0.5 + 0.3 * Math.sin(time * 0.001 + i));
        const y1 = height * (0.5 + 0.3 * Math.cos(time * 0.001 + i));
        const x2 = width * (0.5 + 0.3 * Math.sin(time * 0.001 + i + Math.PI));
        const y2 = height * (0.5 + 0.3 * Math.cos(time * 0.001 + i + Math.PI));

        const gradient = ctx.createRadialGradient(
          x1, y1, 0,
          x1, y1, width * 0.8
        );

        const color = rgbColors[i % rgbColors.length];
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGradient();
      time += 16;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}