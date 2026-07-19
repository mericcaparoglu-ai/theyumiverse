import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theyumiverse.com';
  const locales = ['tr', 'en'];
  const routes = [
    '',
    '/about',
    '/classes',
    '/schedule',
    '/trainers',
    '/pricing',
    '/blog',
    '/faq',
    '/contact',
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return entries;
}
