// TODO: SEO - Robots.txt optimisé selon prompt Zencoder
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://siteperso-wsu8.vercel.app/sitemap.xml',
  };
}
