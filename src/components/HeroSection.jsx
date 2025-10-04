"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

// Map icon names to components
const iconMap = {
  clock: Clock,
  checkCircle: CheckCircle,
  alertCircle: AlertCircle,
  info: Info,
};

/**
 * HeroSection - Section héros moderne avec effet parallax
 * 
 * @param {string} title - Titre principal (peut contenir du HTML)
 * @param {string} subtitle - Sous-titre descriptif
 * @param {string} backgroundImage - URL de l'image de fond
 * @param {string|object} badge - Texte du badge (string) ou objet {icon: string, text: string, variant: string}
 * @param {React.ReactNode} children - Contenu additionnel (boutons, etc.)
 * @param {string} overlayOpacity - Opacité de l'overlay (0-100)
 * @param {string} height - Hauteur de la section (ex: "60vh", "500px")
 * @param {string} textAlign - Alignement du texte ("left", "center", "right")
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
}) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;

      // Effet parallax uniquement si la section est visible
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const parallaxOffset = scrollPosition * 0.5;
        setOffset(parallaxOffset);
      }
    };

    // Vérifier si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: height }}
    >
      {/* Image de fond avec parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
          willChange: "transform",
          zIndex: 0,
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: "scale(1.15)",
          }}
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity: overlayOpacity / 100, zIndex: 1 }}
      />

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
      <div className="container-page relative flex min-h-[inherit] items-center" style={{ zIndex: 10 }}>
        <div className={`w-full space-y-6 text-${textAlign}`}>
          {/* Badge */}
          {badge && (
            <ScrollReveal direction="up">
              <div className={`flex ${textAlign === "center" ? "justify-center" : textAlign === "right" ? "justify-end" : "justify-start"}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-ui-sm font-medium text-white backdrop-blur-sm">
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
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF41] opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF41]"></span>
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
              className="text-hero font-bold tracking-tighter leading-tight text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </ScrollReveal>

          {/* Sous-titre */}
          <ScrollReveal direction="up" delay={200}>
            <p className="text-body-lg leading-relaxed text-white/90 font-regular max-w-3xl mx-auto">
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

      {/* Effet de vague en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
    </section>
  );
}