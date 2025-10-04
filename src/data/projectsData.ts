/**
 * Portfolio Projects Data
 * 
 * Structure complète des projets du portfolio
 * - 1 projet réel : G.TRAVAUX
 * - 4 projets fictifs : NOVA DESIGN, ECHO MARKET, ASTROBLOG, KINETIC STUDIO
 */

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  heroImage: string;
  shortDescription: string;
  description: string;
  context: string;
  objectives: string[];
  target: string;
  deliverables: string[];
  process: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  images: string[];
  liveUrl?: string;
  isReal: boolean;
  year: string;
  duration: string;
  results?: string[];
}

export const projects: Project[] = [
  // ========================================
  // PROJET RÉEL : G.TRAVAUX
  // ========================================
  {
    slug: 'gtravaux',
    title: 'G.TRAVAUX',
    subtitle: 'Site vitrine pour entreprise de rénovation tous corps d\'état',
    category: 'Site vitrine',
    coverImage: '/images/portfolio/gtravaux/cover.jpg',
    heroImage: '/images/portfolio/gtravaux/hero.jpg',
    shortDescription: 'Site vitrine moderne pour une entreprise générale du bâtiment spécialisée en rénovation complète et remise en état après sinistre.',
    description: 'Création d\'un site vitrine professionnel et performant pour G.TRAVAUX, entreprise générale du bâtiment basée à Strasbourg. Le site présente l\'ensemble des services de rénovation (plomberie, électricité, maçonnerie, peinture, etc.) avec un design moderne et une expérience utilisateur optimisée pour générer des demandes de devis qualifiées.',
    context: 'G.TRAVAUX est une entreprise alsacienne spécialisée dans la rénovation complète et la remise en état après sinistre. Avec plus de 15 ans d\'expérience et 150+ projets réalisés, l\'entreprise avait besoin d\'une présence en ligne professionnelle pour valoriser son expertise multi-métiers et faciliter la prise de contact avec les clients potentiels.',
    objectives: [
      'Créer une vitrine digitale professionnelle reflétant l\'expertise de l\'entreprise',
      'Présenter clairement les 9 services proposés (démolition, électricité, isolation, maçonnerie, peinture, plâtrerie, plomberie, pose de sol, sanitaires)',
      'Faciliter la demande de devis en ligne avec un formulaire optimisé',
      'Mettre en avant les réalisations avec un système avant/après interactif',
      'Optimiser le référencement local (SEO) pour capter les recherches en Alsace',
      'Intégrer un calculateur de devis interactif pour pré-qualifier les demandes',
      'Assurer une navigation fluide et responsive sur tous les appareils'
    ],
    target: 'Particuliers et professionnels en Alsace et régions limitrophes recherchant des services de rénovation complète ou de remise en état après sinistre.',
    deliverables: [
      'Site vitrine Next.js avec 15+ pages optimisées',
      'Système de formulaires de contact et devis',
      'Calculateur de devis interactif',
      'Galerie avant/après avec slider comparatif',
      'Section témoignages clients avec notation Google',
      'Carte interactive des zones d\'intervention',
      'Optimisation SEO locale complète',
      'Intégration Google Analytics et suivi conversions',
      'Documentation technique et formation client'
    ],
    process: [
      {
        title: 'Analyse & Stratégie',
        description: 'Audit de la concurrence locale, définition des personas cibles (particuliers post-sinistre, propriétaires en rénovation), analyse des mots-clés SEO prioritaires et structuration de l\'arborescence du site.'
      },
      {
        title: 'Design & Maquettage',
        description: 'Création de wireframes et maquettes Figma avec focus sur la conversion (CTA visibles, formulaires simplifiés). Design professionnel avec palette de couleurs inspirée du bâtiment (bleus, gris, touches de jaune pour la confiance).'
      },
      {
        title: 'Développement',
        description: 'Développement avec Next.js 14 (App Router) pour des performances optimales. Intégration de composants interactifs (calculateur de devis, slider avant/après). Mise en place de formulaires avec validation et envoi par email.'
      },
      {
        title: 'Contenu & SEO',
        description: 'Rédaction de contenus optimisés SEO pour chaque service. Intégration de balises meta, données structurées (Schema.org) pour le référencement local. Optimisation des images et temps de chargement.'
      },
      {
        title: 'Tests & Déploiement',
        description: 'Tests multi-navigateurs et multi-devices. Validation W3C, tests de performance (Lighthouse > 90). Déploiement sur Vercel avec configuration DNS et certificat SSL. Formation du client à la gestion du contenu.'
      }
    ],
    technologies: [
      'Next.js 14',
      'React',
      'TailwindCSS',
      'Framer Motion',
      'TypeScript',
      'Vercel',
      'Google Analytics',
      'Nodemailer',
      'React Hook Form',
      'Zod'
    ],
    images: [
      '/images/portfolio/gtravaux/placeholder-1.jpg',
      '/images/portfolio/gtravaux/placeholder-2.jpg',
      '/images/portfolio/gtravaux/placeholder-3.jpg',
      '/images/portfolio/gtravaux/placeholder-4.jpg',
      '/images/portfolio/gtravaux/placeholder-5.jpg',
      '/images/portfolio/gtravaux/placeholder-6.jpg',
      '/images/portfolio/gtravaux/placeholder-7.jpg',
      '/images/portfolio/gtravaux/placeholder-8.jpg',
      '/images/portfolio/gtravaux/placeholder-9.jpg',
      '/images/portfolio/gtravaux/placeholder-10.jpg'
    ],
    liveUrl: 'https://gtravaux.fr',
    isReal: true,
    year: '2024',
    duration: '6 semaines',
    results: [
      '+250% de demandes de devis en ligne dans les 3 premiers mois',
      'Score Lighthouse : 95+ (Performance, SEO, Accessibilité)',
      'Temps de chargement < 1.5s',
      'Taux de conversion formulaire : 12% (vs 3-5% moyenne secteur)',
      'Positionnement #1 sur "rénovation Strasbourg" et mots-clés associés',
      '98% de satisfaction client (20 avis Google)'
    ]
  },

  // ========================================
  // PROJET FICTIF 1 : NOVA DESIGN
  // ========================================
  {
    slug: 'nova-design',
    title: 'NOVA DESIGN',
    subtitle: 'Agence de design d\'interface futuriste et minimaliste',
    category: 'Site vitrine',
    coverImage: '/images/portfolio/nova-design/cover.jpg',
    heroImage: '/images/portfolio/nova-design/hero.jpg',
    shortDescription: 'Site vitrine premium pour une agence de design UI/UX spécialisée dans les interfaces futuristes et les design systems.',
    description: 'Création d\'un site vitrine haut de gamme pour NOVA DESIGN, agence fictive spécialisée dans la conception d\'interfaces utilisateur modernes et de design systems. Le site reflète l\'identité premium de l\'agence avec un design minimaliste, des animations subtiles et une navigation fluide.',
    context: 'NOVA DESIGN est une agence de design d\'interface positionnée sur le segment premium. Elle accompagne des startups tech et des scale-ups dans la création d\'interfaces innovantes et de design systems cohérents. L\'agence avait besoin d\'un site vitrine à la hauteur de son expertise, capable de séduire des clients exigeants.',
    objectives: [
      'Créer une vitrine digitale reflétant l\'excellence et l\'innovation de l\'agence',
      'Présenter les services (UI Design, UX Research, Design Systems, Prototypage)',
      'Mettre en avant le portfolio de projets avec des visuels impactants',
      'Valoriser l\'équipe de designers et leur expertise',
      'Faciliter la prise de contact avec un formulaire épuré',
      'Démontrer la maîtrise technique avec des micro-interactions soignées'
    ],
    target: 'Startups tech, scale-ups et entreprises innovantes recherchant des services de design UI/UX premium pour leurs produits digitaux.',
    deliverables: [
      'Site vitrine Next.js avec design system custom',
      'Page d\'accueil avec hero immersif et animations',
      'Page services avec grilles d\'interfaces UI',
      'Portfolio de projets avec filtres et lightbox',
      'Page équipe avec portraits et expertises',
      'Dashboard client (mockup)',
      'Design system documenté',
      'Animations Framer Motion avancées'
    ],
    process: [
      {
        title: 'Recherche & Positionnement',
        description: 'Analyse de la concurrence premium (Ueno, Fantasy, Metalab). Définition de l\'identité visuelle : minimalisme, futurisme, élégance. Création d\'un moodboard avec références (Apple, Linear, Stripe).'
      },
      {
        title: 'Design System',
        description: 'Création d\'un design system complet : palette bleu nuit/blanc/argenté, typographie (Inter + Space Grotesk), composants UI réutilisables, grille 12 colonnes, espacements cohérents.'
      },
      {
        title: 'Maquettage Figma',
        description: 'Conception de maquettes haute-fidélité pour toutes les pages. Prototypage des interactions clés. Création de variantes desktop/tablet/mobile. Validation avec animations et transitions.'
      },
      {
        title: 'Développement Front-end',
        description: 'Développement Next.js avec TailwindCSS et Framer Motion. Intégration des animations (parallax, fade-in, hover effects). Optimisation des performances et du SEO. Tests multi-devices.'
      },
      {
        title: 'Contenu & Lancement',
        description: 'Rédaction de contenus premium (ton expert et accessible). Shooting photo de l\'équipe. Optimisation SEO et balises meta. Déploiement sur Vercel avec monitoring.'
      }
    ],
    technologies: [
      'Next.js 14',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Figma',
      'Vercel',
      'Three.js',
      'GSAP'
    ],
    images: [
      '/images/portfolio/nova-design/image-1.jpg',
      '/images/portfolio/nova-design/image-2.jpg',
      '/images/portfolio/nova-design/image-3.jpg',
      '/images/portfolio/nova-design/image-4.jpg',
      '/images/portfolio/nova-design/image-5.jpg',
      '/images/portfolio/nova-design/image-6.jpg',
      '/images/portfolio/nova-design/image-7.jpg',
      '/images/portfolio/nova-design/image-8.jpg',
      '/images/portfolio/nova-design/image-9.jpg',
      '/images/portfolio/nova-design/image-10.jpg'
    ],
    isReal: false,
    year: '2024',
    duration: '8 semaines'
  },

  // ========================================
  // PROJET FICTIF 2 : ECHO MARKET
  // ========================================
  {
    slug: 'echo-market',
    title: 'ECHO MARKET',
    subtitle: 'Marketplace éco-responsable pour produits durables',
    category: 'E-commerce',
    coverImage: '/images/portfolio/echo-market/cover.jpg',
    heroImage: '/images/portfolio/echo-market/hero.jpg',
    shortDescription: 'Plateforme e-commerce éco-responsable connectant artisans locaux et consommateurs engagés pour des produits durables.',
    description: 'Développement d\'une marketplace complète pour ECHO MARKET, plateforme fictive dédiée aux produits éco-responsables. Le site permet aux artisans et producteurs locaux de vendre leurs créations durables tout en offrant aux consommateurs une expérience d\'achat fluide et transparente.',
    context: 'ECHO MARKET est une marketplace engagée qui souhaite démocratiser l\'accès aux produits durables et artisanaux. La plateforme met en relation des artisans locaux (menuisiers, céramistes, maroquiniers, etc.) avec des consommateurs soucieux de l\'environnement et de la qualité.',
    objectives: [
      'Créer une marketplace multi-vendeurs intuitive et performante',
      'Faciliter la vente pour les artisans avec un espace vendeur complet',
      'Offrir une expérience d\'achat fluide avec panier, paiement sécurisé et suivi',
      'Mettre en avant les valeurs éco-responsables (traçabilité, impact carbone)',
      'Intégrer un système de notation et d\'avis clients',
      'Optimiser le référencement pour capter le trafic "produits durables"'
    ],
    target: 'Consommateurs engagés (25-45 ans) recherchant des produits artisanaux et durables, et artisans locaux souhaitant vendre en ligne sans créer leur propre site.',
    deliverables: [
      'Marketplace Next.js avec gestion multi-vendeurs',
      'Catalogue produits avec filtres avancés (catégorie, prix, localisation, impact)',
      'Système de panier et checkout avec Stripe',
      'Espace vendeur (dashboard de gestion des produits et commandes)',
      'Système d\'avis et de notation',
      'Page "À propos" avec storytelling et valeurs',
      'Blog intégré pour contenus éco-responsables',
      'Versions mobile et desktop optimisées'
    ],
    process: [
      {
        title: 'Étude de Marché',
        description: 'Analyse des marketplaces existantes (Etsy, La Ruche qui dit Oui, Ulule). Interviews d\'artisans et de consommateurs engagés. Définition des fonctionnalités prioritaires (MVP).'
      },
      {
        title: 'Architecture & Design',
        description: 'Conception de l\'architecture technique (Next.js + MongoDB + Stripe). Design chaleureux et naturel (palette vert mousse, beige, bois clair). Wireframes et maquettes Figma pour toutes les pages.'
      },
      {
        title: 'Développement Back-end',
        description: 'Mise en place de l\'API avec gestion des utilisateurs (acheteurs/vendeurs), produits, commandes et paiements. Intégration Stripe Connect pour les paiements multi-vendeurs. Système d\'upload d\'images optimisé.'
      },
      {
        title: 'Développement Front-end',
        description: 'Développement des interfaces utilisateur (catalogue, fiches produits, panier, checkout). Création du dashboard vendeur avec gestion des produits et statistiques. Intégration des animations et transitions.'
      },
      {
        title: 'Tests & Lancement',
        description: 'Tests utilisateurs avec artisans et acheteurs. Optimisation des performances et du SEO. Mise en place du monitoring et des analytics. Déploiement progressif avec phase bêta.'
      }
    ],
    technologies: [
      'Next.js 14',
      'React',
      'TypeScript',
      'TailwindCSS',
      'MongoDB',
      'Stripe Connect',
      'NextAuth.js',
      'Cloudinary',
      'Vercel',
      'Framer Motion'
    ],
    images: [
      '/images/portfolio/echo-market/image-1.jpg',
      '/images/portfolio/echo-market/image-2.jpg',
      '/images/portfolio/echo-market/image-3.jpg',
      '/images/portfolio/echo-market/image-4.jpg',
      '/images/portfolio/echo-market/image-5.jpg',
      '/images/portfolio/echo-market/image-6.jpg',
      '/images/portfolio/echo-market/image-7.jpg',
      '/images/portfolio/echo-market/image-8.jpg',
      '/images/portfolio/echo-market/image-9.jpg',
      '/images/portfolio/echo-market/image-10.jpg'
    ],
    isReal: false,
    year: '2024',
    duration: '12 semaines'
  },

  // ========================================
  // PROJET FICTIF 3 : ASTROBLOG
  // ========================================
  {
    slug: 'astroblog',
    title: 'ASTROBLOG',
    subtitle: 'Blog communautaire sur l\'espace et la science',
    category: 'Blog / CMS',
    coverImage: '/images/portfolio/astroblog/cover.jpg',
    heroImage: '/images/portfolio/astroblog/hero.jpg',
    shortDescription: 'Plateforme de blog immersive dédiée à l\'astronomie et aux sciences spatiales avec système de publication communautaire.',
    description: 'Création d\'une plateforme de blog communautaire pour ASTROBLOG, site fictif dédié à l\'astronomie, l\'astrophysique et l\'exploration spatiale. Le site permet aux passionnés de publier des articles, de partager des découvertes et d\'échanger avec une communauté engagée.',
    context: 'ASTROBLOG est une plateforme communautaire qui souhaite démocratiser l\'accès aux connaissances en astronomie et sciences spatiales. Le site s\'adresse aux passionnés, étudiants et curieux désireux d\'apprendre et de partager leur passion pour l\'univers.',
    objectives: [
      'Créer une plateforme de blog immersive avec esthétique spatiale',
      'Permettre la publication d\'articles par des contributeurs vérifiés',
      'Offrir une expérience de lecture optimale avec typographie soignée',
      'Intégrer un système de commentaires et d\'interactions sociales',
      'Mettre en avant les contenus avec des visuels cosmiques impactants',
      'Optimiser le SEO pour capter le trafic "astronomie" et "espace"'
    ],
    target: 'Passionnés d\'astronomie, étudiants en sciences, curieux de l\'espace et de l\'univers (15-45 ans), cherchant des contenus vulgarisés et de qualité.',
    deliverables: [
      'Plateforme de blog Next.js avec CMS headless (Contentful)',
      'Page d\'accueil avec articles mis en avant et catégories',
      'Pages d\'articles avec typographie optimisée et illustrations',
      'Système de profils auteurs avec biographies et articles',
      'Interface de commentaires et interactions',
      'Recherche et filtres par catégories (planètes, étoiles, missions, etc.)',
      'Newsletter intégrée',
      'Versions mobile et desktop avec design immersif'
    ],
    process: [
      {
        title: 'Conception Éditoriale',
        description: 'Définition de la ligne éditoriale (vulgarisation scientifique, actualités spatiales, dossiers thématiques). Création de catégories (Système solaire, Étoiles, Galaxies, Missions spatiales, Astrophysique). Charte éditoriale et ton de communication.'
      },
      {
        title: 'Design Immersif',
        description: 'Création d\'une identité visuelle spatiale (noir profond, violet et bleu néon, étoiles). Design de la typographie pour une lecture confortable. Maquettes Figma avec animations et transitions cosmiques.'
      },
      {
        title: 'Architecture Technique',
        description: 'Mise en place de Contentful comme CMS headless. Modélisation des contenus (articles, auteurs, catégories). Intégration GraphQL pour les requêtes optimisées. Système de cache et ISR (Incremental Static Regeneration).'
      },
      {
        title: 'Développement',
        description: 'Développement Next.js avec génération statique des articles. Intégration du système de commentaires. Création des pages auteurs et catégories. Optimisation des images et performances.'
      },
      {
        title: 'Contenu & Lancement',
        description: 'Rédaction de 20+ articles de lancement. Création de visuels cosmiques (illustrations, photos NASA). Optimisation SEO et balises meta. Déploiement avec monitoring et analytics.'
      }
    ],
    technologies: [
      'Next.js 14',
      'React',
      'TypeScript',
      'TailwindCSS',
      'GraphQL',
      'Contentful CMS',
      'Framer Motion',
      'MDX',
      'Vercel',
      'Algolia Search'
    ],
    images: [
      '/images/portfolio/astroblog/image-1.jpg',
      '/images/portfolio/astroblog/image-2.jpg',
      '/images/portfolio/astroblog/image-3.jpg',
      '/images/portfolio/astroblog/image-4.jpg',
      '/images/portfolio/astroblog/image-5.jpg',
      '/images/portfolio/astroblog/image-6.jpg',
      '/images/portfolio/astroblog/image-7.jpg',
      '/images/portfolio/astroblog/image-8.jpg',
      '/images/portfolio/astroblog/image-9.jpg',
      '/images/portfolio/astroblog/image-10.jpg'
    ],
    isReal: false,
    year: '2024',
    duration: '10 semaines'
  },

  // ========================================
  // PROJET FICTIF 4 : KINETIC STUDIO
  // ========================================
  {
    slug: 'kinetic-studio',
    title: 'KINETIC STUDIO',
    subtitle: 'Studio de motion design et animation 3D',
    category: 'Site vitrine',
    coverImage: '/images/portfolio/kinetic-studio/cover.jpg',
    heroImage: '/images/portfolio/kinetic-studio/hero.jpg',
    shortDescription: 'Site vitrine immersif pour un studio de motion design spécialisé dans les animations 3D et les expériences visuelles innovantes.',
    description: 'Création d\'un site vitrine spectaculaire pour KINETIC STUDIO, studio fictif de motion design et d\'animation 3D. Le site met en avant le portfolio du studio avec des animations Three.js, des transitions fluides et une esthétique cyberpunk moderne.',
    context: 'KINETIC STUDIO est un studio créatif spécialisé dans le motion design, l\'animation 3D et les expériences visuelles immersives. Le studio travaille pour des marques premium, des startups tech et des agences de communication. Il avait besoin d\'un site vitrine à la hauteur de son expertise technique et créative.',
    objectives: [
      'Créer un site vitrine spectaculaire démontrant les capacités du studio',
      'Intégrer des animations 3D et des effets visuels avancés',
      'Présenter le portfolio de projets avec des vidéos et animations',
      'Mettre en avant l\'équipe et le workflow créatif',
      'Faciliter la prise de contact pour des projets sur mesure',
      'Optimiser les performances malgré les animations complexes'
    ],
    target: 'Marques premium, startups tech, agences de communication et entreprises recherchant des services de motion design et d\'animation 3D haut de gamme.',
    deliverables: [
      'Site vitrine Next.js avec animations Three.js',
      'Hero section 3D interactive avec particules',
      'Galerie de projets avec vidéos et animations',
      'Page "À propos" avec workflow et équipe',
      'Interface de présentation de showreel',
      'Formulaire de contact avec animations',
      'Optimisation des performances (lazy loading, code splitting)',
      'Versions mobile et desktop avec adaptations'
    ],
    process: [
      {
        title: 'Direction Artistique',
        description: 'Définition de l\'identité visuelle cyberpunk (noir, cyan, magenta, reflets métalliques). Création d\'un moodboard avec références (Awwwards, Behance). Conception de l\'univers 3D et des animations clés.'
      },
      {
        title: 'Prototypage 3D',
        description: 'Création de prototypes Three.js pour la hero section. Tests de performances et optimisations. Conception des animations de transition entre pages. Validation de la faisabilité technique.'
      },
      {
        title: 'Design & Maquettage',
        description: 'Maquettes Figma avec animations et transitions. Design des pages (accueil, portfolio, à propos, contact). Création de composants réutilisables. Prototypage des interactions.'
      },
      {
        title: 'Développement',
        description: 'Développement Next.js avec intégration Three.js et Framer Motion. Optimisation des performances (lazy loading, code splitting, compression). Intégration des vidéos et animations. Tests multi-devices.'
      },
      {
        title: 'Contenu & Lancement',
        description: 'Création de contenus (textes, vidéos, animations). Optimisation SEO et balises meta. Tests de performances (Lighthouse). Déploiement sur Vercel avec CDN et monitoring.'
      }
    ],
    technologies: [
      'Next.js 14',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Three.js',
      'React Three Fiber',
      'Framer Motion',
      'GSAP',
      'Vercel',
      'WebGL'
    ],
    images: [
      '/images/portfolio/kinetic-studio/image-1.jpg',
      '/images/portfolio/kinetic-studio/image-2.jpg',
      '/images/portfolio/kinetic-studio/image-3.jpg',
      '/images/portfolio/kinetic-studio/image-4.jpg',
      '/images/portfolio/kinetic-studio/image-5.jpg',
      '/images/portfolio/kinetic-studio/image-6.jpg',
      '/images/portfolio/kinetic-studio/image-7.jpg',
      '/images/portfolio/kinetic-studio/image-8.jpg',
      '/images/portfolio/kinetic-studio/image-9.jpg',
      '/images/portfolio/kinetic-studio/image-10.jpg'
    ],
    isReal: false,
    year: '2024',
    duration: '10 semaines'
  }
];

/**
 * Récupère tous les projets
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Récupère un projet par son slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

/**
 * Récupère les slugs de tous les projets (pour generateStaticParams)
 */
export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug);
}

/**
 * Récupère les catégories uniques
 */
export function getCategories(): string[] {
  const categories = projects.map(project => project.category);
  return ['Tous', ...Array.from(new Set(categories))];
}