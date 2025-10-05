"use client";

import { useEffect, useRef, useState } from 'react';

export default function ParticlesBackground({ interactive = false }) { // Désactivé par défaut pour performance
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];

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

    // Debounce resize pour performance
    let resizeTimeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Réinitialiser les particules après resize
      }, 150);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse interaction
    const handleMouseMove = (e) => {
      if (!interactive) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseSpeedX = Math.random() * 0.5 - 0.25;
        this.baseSpeedY = Math.random() * 0.5 - 0.25;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.baseSize = this.size;
      }

      update() {
        // Mouse interaction
        if (interactive && mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.speedX = this.baseSpeedX - Math.cos(angle) * force * 2;
            this.speedY = this.baseSpeedY - Math.sin(angle) * force * 2;
            this.size = this.baseSize * (1 + force * 0.5);
          } else {
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.size = this.baseSize;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        // Gradient for particles
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(0, 71, 171, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(0, 109, 119, ${this.opacity * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Réduit de 60% le nombre de particules pour performance
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      // Optimisation: limiter les connexions pour réduire O(n²)
      const maxConnections = 3; // Limite de connexions par particule
      
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Réduit la distance de connexion de 120 à 100
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.12;
            
            // Simplifié: pas de gradient pour économiser CPU
            ctx.strokeStyle = `rgba(0, 71, 171, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            
            connections++;
          }
        }
      }

      // Connect to mouse (seulement si interactive activé)
      if (interactive && mouseRef.current.x !== null) {
        particles.forEach(particle => {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { // Réduit de 150 à 120
            const opacity = (1 - distance / 120) * 0.25;
            ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        });
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return; // Pause si non visible
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      aria-hidden="true"
    />
  );
}