import { defineCollection, z } from 'astro:content';

const conceptosCollection = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    titulo: z.string(),
    modulo: z.string(),
    seccion: z.string(),
    tipo: z.enum(['anatomia', 'neurotransmisor', 'concepto', 'mecanismo', 'sustancia']),
    definicion: z.string(),
    explicacion: z.string().optional(),
    relevancia_nootropica: z.string().optional(),
    neurotransmisores_asociados: z.array(z.string()).default([]),
    regiones_asociadas: z.array(z.string()).default([]),
    orden: z.number().optional(),
  }),
});

export const collections = {
  conceptos: conceptosCollection,
};
