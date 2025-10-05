"use client";

import { useEffect, useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '@/lib/useReducedMotion';

const AnimatedCounter = memo(function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', className = '' }) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    // Si l'utilisateur préfère réduire les animations, afficher directement la valeur finale
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const currentCount = Math.floor(end * easeOutExpo);
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
});

export default AnimatedCounter;