import FormulaireContact from "@/components/FormulaireContact";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import { Mail, Phone, MapPin, Linkedin, Github, Clock } from "lucide-react";
import Link from "next/link";

const coordonnees = [
  {
    icon: Mail,
    label: "Email",
    value: "bonjour@nicolasbanic.dev",
    href: "mailto:bonjour@nicolasbanic.dev"
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "06 12 34 56 78",
    href: "tel:+33612345678"
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Lyon, France",
    subtext: "Interventions partout en France"
  },
  {
    icon: Clock,
    label: "Disponibilité",
    value: "Lun - Ven : 9h - 18h",
    subtext: "Réponse sous 24h ouvrées"
  }
];

const reseaux = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicolasbanic",
    color: "hover:text-[var(--color-accent)]"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/nicolasbanic",
    color: "hover:text-[var(--color-accent)]"
  }
];

export const metadata = {
  title: "Contact — Nicolas Banic | Développeur Web Freelance à Lyon",
  description: "Contactez Nicolas Banic pour un projet web, une application métier ou un accompagnement digital. Réponse sous 24h ouvrées.",
  openGraph: {
    title: "Contact — Nicolas Banic",
    description: "Discutons de votre projet web. Réponse rapide garantie.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Entrons en contact"
        subtitle="Discutons de vos objectifs, de vos contraintes et de la meilleure façon de vous accompagner dans votre projet digital."
        badge={{
          icon: "clock",
          text: "Réponse sous 24h ouvrées",
          variant: "success"
        }}
        backgroundImage="/images/contact-hero.jpg"
      />

      {/* Contact Section */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Formulaire */}
            <ScrollReveal>
              <div className="card">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Envoyez-moi un message
                  </h2>
                  <p className="text-gray-600">
                    Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
                <FormulaireContact />
              </div>
            </ScrollReveal>

            {/* Coordonnées */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Coordonnées
                  </h2>
                  <div className="space-y-6">
                    {coordonnees.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 group">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[var(--color-anthracite)]/20 to-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:from-[var(--color-accent)] group-hover:to-[var(--color-accent-secondary)] group-hover:text-[var(--color-foreground)] group-hover:shadow-matrix">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              {item.label}
                            </p>
                            {item.href ? (
                              <a 
                                href={item.href}
                                className="font-medium text-gray-900 hover:text-[var(--color-accent)] transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="font-medium text-gray-900">
                                {item.value}
                              </p>
                            )}
                            {item.subtext && (
                              <p className="text-sm text-gray-500 mt-1">
                                {item.subtext}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Réseaux sociaux
                  </h2>
                  <div className="flex gap-4">
                    {reseaux.map((reseau, index) => {
                      const Icon = reseau.icon;
                      return (
                        <Link
                          key={index}
                          href={reseau.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--color-anthracite)]/20 to-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg transition-all hover:scale-110 hover:shadow-matrix hover:from-[var(--color-accent)] hover:to-[var(--color-accent-secondary)] hover:text-[var(--color-foreground)] ${reseau.color}`}
                          aria-label={reseau.label}
                        >
                          <Icon className="w-6 h-6" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="card bg-gradient-to-br from-[var(--color-anthracite)]/5 to-[var(--color-accent)]/5 border-[var(--color-accent)]/20 hover:shadow-matrix transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Vous préférez un devis détaillé ?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Remplissez le formulaire de demande de devis pour recevoir une proposition personnalisée sous 24h.
                  </p>
                  <Link href="/devis" className="btn-primary text-sm">
                    Demander un devis
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}