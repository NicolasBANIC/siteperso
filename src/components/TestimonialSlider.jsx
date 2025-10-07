'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Gérante, Atelier Bois Créatif',
    avatar: '/images/testimonial-avatar1.jpg',
    content:
      'Nicolas a transformé notre présence en ligne. Notre site vitrine reflète parfaitement notre savoir-faire artisanal. Les demandes de devis ont augmenté de 60% en 3 mois !',
    rating: 5,
    project: 'Site vitrine premium',
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Fondateur, GTravaux',
    avatar: '/images/testimonial-avatar2.jpg',
    content:
      "Un développeur à l'écoute et très professionnel. Notre plateforme de mise en relation fonctionne parfaitement. Le code est propre, documenté et évolutif. Je recommande vivement !",
    rating: 5,
    project: 'Application web sur mesure',
  },
  {
    id: 3,
    name: 'Léa Rousseau',
    role: 'Créatrice, Douceurs de Léa',
    avatar: '/images/testimonial-avatar3.jpg',
    content:
      "Grâce à Nicolas, je vends mes créations en ligne avec une boutique magnifique et facile à gérer. Le système de paiement est sécurisé et mes clients adorent l'expérience d'achat.",
    rating: 5,
    project: 'E-commerce sur mesure',
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative">
      {/* Fixed height container to prevent layout shift */}
      <div className="relative overflow-hidden" style={{ minHeight: '450px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 280, damping: 35 },
              opacity: { duration: 0.3, ease: 'easeInOut' },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="card relative bg-surface/50 backdrop-blur-sm"
            style={{ willChange: 'transform, opacity' }}
          >
            <Quote className="absolute top-8 right-8 h-16 w-16 text-accent/10" aria-hidden="true" />

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 h-24 w-24">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-50 blur"></div>
                <Image
                  src={testimonials[current].avatar}
                  alt={`Photo de ${testimonials[current].name}`}
                  width={96}
                  height={96}
                  className="relative h-24 w-24 rounded-full object-cover ring-4 ring-surface"
                  priority={current === 0}
                  loading={current === 0 ? 'eager' : 'lazy'}
                />
              </div>

              <div className="mb-4 flex gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-accent"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mb-6 text-lg leading-relaxed text-foreground min-h-[120px] flex items-center justify-center">
                "{testimonials[current].content}"
              </blockquote>

              <div>
                <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                <p className="text-sm text-muted">{testimonials[current].role}</p>
                <p className="mt-2 text-xs font-medium text-accent">
                  {testimonials[current].project}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => paginate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-accent hover:text-accent hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                index === current ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent/50'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-accent hover:text-accent hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
