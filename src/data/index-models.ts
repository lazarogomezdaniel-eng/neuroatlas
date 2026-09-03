import { Sustancia, Concepto, Categoria } from '@/types/neuroatlas-models';
import categoriesJson from './categories/categories.json';
import bacopaJson from './substances/bacopa-monnieri.json';
import ltpJson from './concepts/plasticidad-sinaptica.json';
import neuroanatomiaJson from './concepts/neuroanatomia-funcional.json';

export const categorias: Categoria[] = categoriesJson as Categoria[];
export const sustancias: Sustancia[] = [bacopaJson as Sustancia];
export const conceptos: Concepto[] = [
  neuroanatomiaJson as Concepto,
  ltpJson as Concepto,
];

export const getSustanciaBySlug = (slug: string): Sustancia | undefined => {
  return sustancias.find((s) => s.slug === slug);
};

export const getConceptoBySlug = (slug: string): Concepto | undefined => {
  return conceptos.find((c) => c.slug === slug);
};

export const getCategoriaBySlug = (slug: string): Categoria | undefined => {
  return categorias.find((cat) => cat.slug === slug);
};
