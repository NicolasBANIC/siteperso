/**
 * Projects data for portfolio
 * TODO: Move to CMS or database for dynamic content
 */

export const projects = [
  {
    slug: 'ecommerce-fashion',
    title: 'E-commerce Mode Premium',
    summary: 'Plateforme e-commerce Next.js avec paiements Stripe et gestion de stock temps réel',
    cover: '/images/portfolio/ecommerce-fashion.jpg',
    og: '/og/portfolio-ecommerce-fashion.png',
    stack: ['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    context:
      'Une marque de mode française souhaitait moderniser sa boutique en ligne pour améliorer les conversions et offrir une expérience utilisateur premium sur tous les devices.',
    role: 'Développement full-stack de la plateforme e-commerce complète : architecture Next.js 15 avec App Router, intégration Stripe pour paiements sécurisés, système de gestion de stock avec alertes automatiques, dashboard admin avec analytics en temps réel.',
    results: [
      'Temps de chargement réduit de 65% (LCP < 2s)',
      'Taux de conversion augmenté de 42%',
      'Score Lighthouse Performance : 98/100',
      'Zéro downtime depuis le lancement (99.9% uptime)',
      'Traitement de 500+ commandes/mois sans incident',
    ],
    metrics: {
      performance: 98,
      accessibility: 96,
      seo: 100,
      bestPractices: 100,
    },
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Stripe API',
      'PostgreSQL',
      'Tailwind CSS',
      'Vercel',
    ],
    link: 'https://example.com', // TODO: Replace with real URL
    github: null, // Private project
    year: 2024,
  },
  {
    slug: 'saas-dashboard',
    title: 'Dashboard SaaS Analytics',
    summary:
      'Application web métier avec visualisation de données en temps réel et exports automatisés',
    cover: '/images/portfolio/saas-dashboard.jpg',
    og: '/og/portfolio-saas-dashboard.png',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    context:
      "Une startup SaaS avait besoin d'un dashboard analytics performant pour permettre à leurs clients de visualiser leurs métriques business en temps réel avec des exports automatisés.",
    role: 'Architecture microservices avec API REST documentée (Swagger), authentification JWT sécurisée, base de données PostgreSQL optimisée avec indexation avancée, système de cache Redis pour performances, CI/CD avec Docker et GitHub Actions.',
    results: [
      'Temps de réponse API < 100ms (p95)',
      'Support de 10,000+ utilisateurs simultanés',
      'Réduction des coûts serveur de 35% via optimisations',
      'Score Lighthouse Performance : 95/100',
      'Taux de satisfaction utilisateur : 4.8/5',
    ],
    metrics: {
      performance: 95,
      accessibility: 98,
      seo: 92,
      bestPractices: 100,
    },
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    link: 'https://example.com', // TODO: Replace with real URL
    github: null, // Private project
    year: 2024,
  },
  {
    slug: 'portfolio-architecte',
    title: "Portfolio Architecte d'Intérieur",
    summary: 'Site vitrine premium avec galerie photos optimisée et animations élégantes',
    cover: '/images/portfolio/portfolio-architecte.jpg',
    og: '/og/portfolio-architecte.png',
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    context:
      "Une architecte d'intérieur cherchait un site vitrine moderne pour présenter ses réalisations avec une galerie photo haute qualité et des animations sobres.",
    role: 'Développement Next.js avec optimisation images avancée (WebP/AVIF, lazy loading intelligent), animations Framer Motion respectant prefers-reduced-motion, SEO technique complet avec structured data, formulaire de contact avec validation.',
    results: [
      'Score Lighthouse Performance : 100/100',
      'LCP < 1.5s sur toutes les pages',
      'Trafic organique +180% en 3 mois',
      'Taux de rebond réduit de 45%',
      '15+ demandes de devis/mois via le site',
    ],
    metrics: {
      performance: 100,
      accessibility: 100,
      seo: 100,
      bestPractices: 100,
    },
    technologies: ['Next.js 15', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    link: 'https://example.com', // TODO: Replace with real URL
    github: null, // Private project
    year: 2024,
  },
];

/**
 * Get project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object>} Project data
 */
export async function getProjectBySlug(slug) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }
  return project;
}

/**
 * Get all projects
 * @returns {Promise<Array>} All projects
 */
export async function getAllProjects() {
  return projects;
}

/**
 * Get projects by stack/technology
 * @param {string} stack - Technology name
 * @returns {Promise<Array>} Filtered projects
 */
export async function getProjectsByStack(stack) {
  return projects.filter((p) => p.stack.includes(stack));
}
