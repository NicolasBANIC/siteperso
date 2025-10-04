import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: {
    default: 'Nicolas Banic — Développeur Web Freelance | Sites & Applications sur mesure',
    template: '%s | Nicolas Banic'
  },
  description: 'Développeur web freelance à Lyon. Création de sites vitrines, e-commerce et applications web modernes, performants et accessibles pour artisans, TPE et PME.',
  keywords: ['développeur web', 'freelance', 'Lyon', 'création site web', 'e-commerce', 'application web', 'Next.js', 'React', 'développeur full-stack'],
  authors: [{ name: 'Nicolas Banic' }],
  creator: 'Nicolas Banic',
  metadataBase: new URL('https://nicolasbanic.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nicolas Banic — Développeur Web Freelance',
    description: 'Sites vitrines, e-commerce et applications web conçus avec une approche sur mesure pour artisans, TPE et PME.',
    url: 'https://nicolasbanic.dev',
    siteName: 'Nicolas Banic',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nicolas Banic - Développeur Web Freelance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicolas Banic — Développeur Web Freelance',
    description: 'Création de sites web et applications sur mesure',
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
    '@type': 'Person',
    name: 'Nicolas Banic',
    jobTitle: 'Développeur Web Freelance',
    description: 'Développeur web freelance spécialisé dans la création de sites vitrines, e-commerce et applications web sur mesure.',
    url: 'https://nicolasbanic.dev',
    image: 'https://nicolasbanic.dev/images/avatar.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lyon',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.linkedin.com/in/nicolasbanic',
      'https://github.com/nicolasbanic',
    ],
    knowsAbout: [
      'Développement Web',
      'Next.js',
      'React',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'TailwindCSS',
      'E-commerce',
      'SEO',
    ],
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Développement Web',
        description: 'Création de sites web et applications sur mesure',
      },
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} bg-[var(--color-background)] text-[var(--color-foreground)] antialiased transition-colors motion-reduce:transition-none`}
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
