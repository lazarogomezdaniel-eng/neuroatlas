import { Sustancia, Concepto, Categoria } from '@/types/neuroatlas-models';
import categoriesJson from './categories/categories.json';
import bacopaJson from './substances/bacopa-monnieri.json';

// Conceptos de Neuroanatomía y Mecanismos (Módulo I)
import neuroanatomiaJson from './concepts/neuroanatomia-funcional.json';
import cortezaPrefrontalJson from './concepts/corteza-prefrontal.json';
import hipocampoJson from './concepts/hipocampo.json';
import amigdalaJson from './concepts/amigdala.json';
import gangliosBasalesJson from './concepts/ganglios-basales.json';
import locusCoeruleusJson from './concepts/locus-coeruleus.json';
import bheJson from './concepts/barrera-hematoencefalica.json';
import glinfaticoJson from './concepts/sistema-glinfatico.json';
import introNeuroquimicaJson from './concepts/introduccion-neuroquimica.json';
import dopaminaJson from './concepts/dopamina.json';
import acetilcolinaJson from './concepts/acetilcolina.json';
import noradrenalinaJson from './concepts/noradrenalina.json';
import serotoninaJson from './concepts/serotonina.json';
import gabaJson from './concepts/gaba.json';
import ltpJson from './concepts/plasticidad-sinaptica.json';

export const categorias: Categoria[] = categoriesJson as Categoria[];
export const sustancias: Sustancia[] = [bacopaJson as Sustancia];
export const conceptos: Concepto[] = [
  neuroanatomiaJson as Concepto,
  cortezaPrefrontalJson as Concepto,
  hipocampoJson as Concepto,
  amigdalaJson as Concepto,
  gangliosBasalesJson as Concepto,
  locusCoeruleusJson as Concepto,
  bheJson as Concepto,
  glinfaticoJson as Concepto,
  introNeuroquimicaJson as Concepto,
  dopaminaJson as Concepto,
  acetilcolinaJson as Concepto,
  noradrenalinaJson as Concepto,
  serotoninaJson as Concepto,
  gabaJson as Concepto,
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
