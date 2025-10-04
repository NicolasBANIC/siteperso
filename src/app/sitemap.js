export default function sitemap() {
  const baseUrl = 'https://nicolasbanic.dev';
  
  const routes = [
    '',
    '/portfolio',
    '/services',
    '/tarifs',
    '/apropos',
    '/temoignages',
    '/devis',
    '/contact',
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