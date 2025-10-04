// TODO: SEO - Sitemap optimisé selon prompt Zencoder (toutes les pages principales)
export default function sitemap() {
  const baseUrl = 'https://siteperso-wsu8.vercel.app';
  
  const routes = [
    '',
    '/services',
    '/processus',
    '/portfolio',
    '/tarifs',
    '/temoignages',
    '/apropos',
    '/contact',
    '/devis',
    '/mentions-legales',
    '/politique-confidentialite',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}