import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://neuroatlas.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Soporte específico para rastreadores de IA y motores generativos
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'Cohere-ai',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
