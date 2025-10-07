"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import OptimizedImage from "./OptimizedImage";
import { Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Map icon names to components
const iconMap = {
  clock: Clock,
  checkCircle: CheckCircle,
  alertCircle: AlertCircle,
  info: Info,
};

interface BadgeObject {
  icon?: keyof typeof iconMap;
  text: string;
  variant?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  badge?: string | BadgeObject | null;
  children?: React.ReactNode;
  overlayOpacity?: string;
  height?: string;
  textAlign?: "left" | "center" | "right";
}

/**
 * HeroSection - Section héros moderne avec effet parallax
 * 
 * @param title - Titre principal (peut contenir du HTML)
 * @param subtitle - Sous-titre descriptif
 * @param backgroundImage - URL de l'image de fond
 * @param badge - Texte du badge (string) ou objet {icon: string, text: string, variant: string}
 * @param children - Contenu additionnel (boutons, etc.)
 * @param overlayOpacity - Opacité de l'overlay (0-100)
 * @param height - Hauteur de la section (ex: "60vh", "500px")
 * @param textAlign - Alignement du texte ("left", "center", "right")
 */
export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  badge = null,
  children = null,
  overlayOpacity = "60",
  height = "60vh",
  textAlign = "center",
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Framer Motion parallax avec useScroll et useTransform
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  
  // Désactiver le parallax sur mobile et si prefers-reduced-motion
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shouldParallax = !prefersReducedMotion && !isMobile;

  return (
    <section
      ref={sectionRef}
      className="hero hero-section relative overflow-hidden bg-background"
      style={{ minHeight: height }}
    >
      {/* Image de fond avec parallax Framer Motion */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldParallax ? y : 0,
          zIndex: 0,
        }}
      >
        <OptimizedImage
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            transform: "scale(1.15)",
          }}
        />
      </motion.div>

      {/* Removed overlay - using enhanced text shadows for readability */}

      {/* Effet de grille subtile */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          zIndex: 2,
        }}
      />

      {/* Contenu */}
      <div className="container-page relative flex min-h-[inherit] items-center" style={{ zIndex: 20 }}>
        <div className={`w-full space-y-6 text-${textAlign}`}>
          {/* Badge */}
          {badge && (
            <ScrollReveal direction="up">
              <div className={`flex ${textAlign === "center" ? "justify-center" : textAlign === "right" ? "justify-end" : "justify-start"}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-caption font-medium text-white backdrop-blur-sm">
                  {typeof badge === "object" && badge.icon ? (
                    <>
                      {/* Render icon from iconMap */}
                      {(() => {
                        const IconComponent = iconMap[badge.icon];
                        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
                      })()}
                      <span>{badge.text}</span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary-300)] opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary-300)]"></span>
                      </span>
                      <span>{typeof badge === "string" ? badge : badge.text}</span>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Titre */}
          <ScrollReveal direction="up" delay={100}>
            <h1
              className="hero-title text-hero font-heading font-bold tracking-tighter leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </ScrollReveal>

          {/* Sous-titre */}
          <ScrollReveal direction="up" delay={200}>
            <p className="subtitle text-body-lg leading-relaxed font-regular max-w-3xl mx-auto">
              {subtitle}
            </p>
          </ScrollReveal>

          {/* Contenu additionnel (boutons, etc.) */}
          {children && (
            <ScrollReveal direction="up" delay={300}>
              <div className={`flex flex-wrap items-center gap-4 pt-4 ${textAlign === "center" ? "justify-center" : textAlign === "right" ? "justify-end" : "justify-start"}`}>
                {children}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Removed gradient effect that creates visual breaks between sections */}
    </section>
  );
}
