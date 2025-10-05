"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";

/**
 * Carousel de témoignages avec animations Framer Motion
 * Respecte prefers-reduced-motion
 */
export default function TestimonialCarousel({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

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
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card p-8 md:p-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={prefersReducedMotion ? {} : slideVariants}
            initial={prefersReducedMotion ? {} : "enter"}
            animate="center"
            exit={prefersReducedMotion ? {} : "exit"}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={prefersReducedMotion ? false : "x"}
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
            className="flex flex-col items-center text-center"
          >
            {/* Quote Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
              <Quote className="h-8 w-8 text-[var(--color-accent)]" aria-hidden="true" />
            </div>

            {/* Stars Rating */}
            {currentTestimonial.rating && (
              <div className="mb-4 flex gap-1" aria-label={`Note: ${currentTestimonial.rating} sur 5`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating
                        ? "fill-accentSecondary text-accentSecondary"
                        : "text-[var(--color-muted)]"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            {/* Testimonial Text */}
            <blockquote className="mb-8 text-body-lg leading-relaxed text-[var(--color-foreground)] max-w-2xl">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {currentTestimonial.avatar && (
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--color-accent)]">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="font-heading text-heading-sm font-semibold text-[var(--color-foreground)]">
                  {currentTestimonial.name}
                </p>
                <p className="text-body-sm text-[var(--color-muted)]">
                  {currentTestimonial.role}
                  {currentTestimonial.company && ` • ${currentTestimonial.company}`}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {testimonials.length > 1 && (
          <>
            <motion.button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-md transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              onClick={() => paginate(-1)}
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </motion.button>

            <motion.button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-md transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              onClick={() => paginate(1)}
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Navigation des témoignages">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[var(--color-accent)]"
                  : "w-2 bg-[var(--color-muted)] hover:bg-[var(--color-accent)]/50"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Aller au témoignage ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}