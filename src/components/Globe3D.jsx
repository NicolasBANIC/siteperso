"use client";

import { useEffect, useRef, useState } from 'react';

export default function Globe3D({ className = "" }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let rotation = 0;

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

    const size = Math.min(400, window.innerWidth * 0.8);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    // Generate points on sphere - RÉDUIT de 800 à 400 points
    const points = [];
    const numPoints = 400;
    
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        originalZ: radius * Math.cos(phi)
      });
    }

    // Add connection lines (latitude/longitude) - RÉDUIT pour performance
    const lines = [];
    const numLatLines = 8; // Réduit de 12 à 8
    const numLonLines = 12; // Réduit de 18 à 12

    // Latitude lines
    for (let i = 0; i < numLatLines; i++) {
      const lat = (i / numLatLines) * Math.PI;
      const linePoints = [];
      for (let j = 0; j <= 30; j++) { // Réduit de 50 à 30 points par ligne
        const lon = (j / 30) * Math.PI * 2;
        linePoints.push({
          x: radius * Math.cos(lon) * Math.sin(lat),
          y: radius * Math.sin(lon) * Math.sin(lat),
          z: radius * Math.cos(lat)
        });
      }
      lines.push(linePoints);
    }

    // Longitude lines
    for (let i = 0; i < numLonLines; i++) {
      const lon = (i / numLonLines) * Math.PI * 2;
      const linePoints = [];
      for (let j = 0; j <= 30; j++) { // Réduit de 50 à 30 points par ligne
        const lat = (j / 30) * Math.PI;
        linePoints.push({
          x: radius * Math.cos(lon) * Math.sin(lat),
          y: radius * Math.sin(lon) * Math.sin(lat),
          z: radius * Math.cos(lat)
        });
      }
      lines.push(linePoints);
    }

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: point.x * cos - point.z * sin,
        y: point.y,
        z: point.x * sin + point.z * cos
      };
    };

    const project = (point) => {
      const scale = 200 / (200 + point.z);
      return {
        x: point.x * scale + centerX,
        y: point.y * scale + centerY,
        z: point.z,
        scale: scale
      };
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return; // Pause si non visible
      }

      ctx.clearRect(0, 0, size, size);

      // Draw lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 71, 171, 0.15)';
        ctx.lineWidth = 0.5;

        line.forEach((point, i) => {
          const rotated = rotateY(point, rotation);
          const projected = project(rotated);

          if (rotated.z > 0) {
            if (i === 0) {
              ctx.moveTo(projected.x, projected.y);
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          }
        });
        ctx.stroke();
      });

      // Draw points
      points.forEach(point => {
        const rotated = rotateY(point, rotation);
        const projected = project(rotated);

        if (rotated.z > 0) {
          const size = 1.5 * projected.scale;
          const opacity = (rotated.z / radius) * 0.6 + 0.2;

          ctx.beginPath();
          ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
          ctx.fill();
        }
      });

      // Draw glow effect
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2);
      gradient.addColorStop(0, 'rgba(0, 71, 171, 0)');
      gradient.addColorStop(1, 'rgba(0, 71, 171, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      rotation += 0.002; // Ralenti de 0.003 à 0.002
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="max-w-full"
        aria-label="Globe 3D interactif"
      />
    </div>
  );
}