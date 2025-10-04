import FormulaireDevis from "@/components/FormulaireDevis";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import { CheckCircle, Clock, Shield, Zap } from "lucide-react";

const avantages = [
  {
    icon: Clock,
    title: "Réponse rapide",
    description: "Retour sous 24h ouvrées avec un premier devis détaillé"
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Devis gratuit et sans obligation d'achat"
  },
  {
    icon: Zap,
    title: "Sur mesure",
    description: "Solution adaptée à vos besoins et votre budget"
  },
  {
    icon: CheckCircle,
    title: "Transparent",
    description: "Tarifs clairs, pas de frais cachés"
  }
];

export const metadata = {
  title: "Demande de devis gratuit — Nicolas Banic | Développeur Web Freelance",
  description: "Demandez un devis gratuit et personnalisé pour la création ou la refonte de votre site web, e-commerce ou application métier. Réponse sous 24h.",
  openGraph: {
    title: "Demande de devis — Nicolas Banic",
    description: "Devis gratuit pour votre projet web. Réponse sous 24h ouvrées.",
  },
};

export default function DevisPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Votre projet mérite une attention sur mesure"
        subtitle="Renseignez quelques informations : je reviens vers vous sous 24 heures ouvrées avec un premier retour détaillé et un devis personnalisé."
        badge={{
          icon: "checkCircle",
          text: "Devis gratuit et sans engagement",
          variant: "success"
        }}
        backgroundImage="/images/tarifs-hero.png"
      />

      {/* Avantages Section */}
      <Section>
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {avantages.map((avantage, index) => {
                const Icon = avantage.icon;
                return (
                  <div 
                    key={index}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {avantage.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {avantage.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Formulaire Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="card">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Parlez-moi de votre projet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Plus vous serez précis, plus mon devis sera adapté à vos besoins.
                  </p>
                </div>
                <FormulaireDevis />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Processus Section */}
      <Section background="dark">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Comment ça se passe ensuite ?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Un processus simple et transparent pour démarrer votre projet sereinement.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Analyse de votre demande",
                description: "J'étudie votre projet en détail et je prépare une proposition adaptée à vos besoins et votre budget."
              },
              {
                step: "02",
                title: "Devis personnalisé",
                description: "Vous recevez un devis détaillé sous 24h avec les fonctionnalités, le planning et les tarifs."
              },
              {
                step: "03",
                title: "Échange et validation",
                description: "Nous discutons ensemble pour affiner le projet. Une fois validé, je démarre le développement."
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}