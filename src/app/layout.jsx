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

// TODO: SEO - Metadata optimisé selon prompt Zencoder (Lighthouse SEO ≥95)
export const metadata = {
  title: {
    default: 'BANDEV — Développeur Web Freelance',
    template: '%s | BANDEV'
  },
  description: 'Sites et apps Next.js performants (Lighthouse 95+), SEO, accessibilité AA, expériences premium.',
  keywords: ['BANDEV', 'développeur web', 'freelance', 'Lyon', 'création site web', 'e-commerce', 'application web', 'Next.js', 'React', 'développeur full-stack', 'site performant', 'web moderne'],
  authors: [{ name: 'Nicolas Banic', email: 'bcnicolaspro@gmail.com' }],
  creator: 'BANDEV - Nicolas Banic',
  metadataBase: new URL('https://siteperso-wsu8.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://siteperso-wsu8.vercel.app',
    siteName: 'BANDEV',
    title: 'BANDEV — Développeur Web Freelance',
    description: 'Next.js, React, Node.js. Performances, SEO, accessibilité.',
    locale: 'fr_FR',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'BANDEV - Développeur Web Freelance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@bandev',
    title: 'BANDEV — Développeur Web Freelance',
    description: 'Sites et apps Next.js performants (Lighthouse 95+)',
    images: ['/og/og-home.png'],
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
        {/* TODO: AA - Skip link pour accessibilité clavier (WCAG AA) */}
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-black focus:text-white focus:px-3 focus:py-2"
        >
          Aller au contenu
        </a>
        
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
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
