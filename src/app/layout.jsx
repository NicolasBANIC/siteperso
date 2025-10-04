import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'BANDEV — Développeur Web Freelance | Transformez vos idées en expériences digitales exceptionnelles',
    template: '%s | BANDEV'
  },
  description: 'BANDEV : Votre partenaire digital pour des sites web ultra-performants. Création de sites vitrines, e-commerce et applications web modernes avec Next.js, React et les dernières technologies. Performance, design et innovation au service de votre réussite.',
  keywords: ['BANDEV', 'développeur web', 'freelance', 'Lyon', 'création site web', 'e-commerce', 'application web', 'Next.js', 'React', 'développeur full-stack', 'site performant', 'web moderne'],
  authors: [{ name: 'Nicolas Banic', email: 'bcnicolaspro@gmail.com' }],
  creator: 'BANDEV - Nicolas Banic',
  metadataBase: new URL('https://bandev.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BANDEV — Développeur Web Freelance | Expériences digitales exceptionnelles',
    description: 'Transformez vos idées en sites web ultra-performants. Design moderne, technologies de pointe et expertise technique pour propulser votre présence en ligne.',
    url: 'https://bandev.fr',
    siteName: 'BANDEV',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BANDEV - Développeur Web Freelance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BANDEV — Développeur Web Freelance',
    description: 'Transformez vos idées en expériences digitales exceptionnelles',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  // JSON-LD pour le SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'BANDEV',
    alternateName: 'Nicolas Banic - Développeur Web Freelance',
    description: 'BANDEV : Création de sites web modernes, performants et sur mesure. Spécialiste Next.js, React et applications web haute performance.',
    url: 'https://bandev.fr',
    logo: 'https://bandev.fr/brand/logo.png',
    image: 'https://bandev.fr/images/og-image.jpg',
    email: 'bcnicolaspro@gmail.com',
    telephone: '+33-XXX-XXX-XXX',
    founder: {
      '@type': 'Person',
      name: 'Nicolas Banic',
      jobTitle: 'Développeur Web Full-Stack Freelance',
      email: 'bcnicolaspro@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lyon',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    sameAs: [
      'https://www.linkedin.com/in/nicolasbanic',
      'https://github.com/NicolasBANIC',
    ],
    knowsAbout: [
      'Développement Web',
      'Next.js 15',
      'React 19',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'TailwindCSS',
      'E-commerce',
      'SEO',
      'Performance Web',
      'Applications Web',
    ],
    priceRange: '€€',
    serviceType: 'Développement Web',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de Développement Web',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Site Vitrine Premium',
            description: 'Création de sites vitrines modernes et performants avec Next.js',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Sur Mesure',
            description: 'Boutiques en ligne complètes avec gestion avancée',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Application Web Métier',
            description: 'Applications web sur mesure pour vos besoins spécifiques',
          },
        },
      ],
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Meta tags essentiels */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* JSON-LD pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${inter.className} bg-[var(--color-background)] text-[var(--color-foreground)] antialiased transition-colors motion-reduce:transition-none`}
      >
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ThemeToggle />
        <BackToTop />
      </body>
    </html>
  );
}
