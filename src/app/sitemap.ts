import { MetadataRoute } from 'next';
import { sustancias, categorias, conceptos } from '@/data/index-models';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neuroatlas.org';
  const currentDate = new Date().toISOString();

  // 1. Rutas Estáticas Principales
  const mainStaticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/enciclopedia`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/categorias`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/conceptos`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/stacks`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/atlas-cerebral`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/evidencia`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/marcas`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // 2. Fichas de Sustancias (/enciclopedia/[slug])
  const substanceRoutes: MetadataRoute.Sitemap = sustancias.map((s) => ({
    url: `${baseUrl}/enciclopedia/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 3. Páginas de Categorías (/categorias/[slug])
  const categoryRoutes: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${baseUrl}/categorias/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Fichas de Conceptos de Neurociencia (/conceptos/[slug])
  const conceptRoutes: MetadataRoute.Sitemap = conceptos.map((c) => ({
    url: `${baseUrl}/conceptos/${c.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    ...mainStaticRoutes,
    ...substanceRoutes,
    ...categoryRoutes,
    ...conceptRoutes,
  ];
}
