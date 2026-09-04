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
import ltpJson from './concepts/plasticidad-sinaptica-ltp.json';

// Sección 1.2 Neuroquímica
import introNeuroquimicaJson from './concepts/introduccion-neuroquimica.json';
import dopaminaJson from './concepts/dopamina.json';
import acetilcolinaJson from './concepts/acetilcolina.json';
import noradrenalinaJson from './concepts/noradrenalina.json';
import serotoninaJson from './concepts/serotonina.json';
import gabaJson from './concepts/gaba.json';
import glutamatoJson from './concepts/glutamato.json';
import otrosNeuromoduladoresJson from './concepts/otros-neuromoduladores.json';

// Sección 1.3 Neurofisiología
import introNeurofisiologiaJson from './concepts/introduccion-neurofisiologia.json';
import sinapsisJson from './concepts/sinapsis-y-senalizacion.json';
import neuroplasticidadJson from './concepts/neuroplasticidad.json';
import neurogenesisJson from './concepts/neurogenesis-adulta.json';
import sinaptogenesisJson from './concepts/sinaptogenesis-y-mielinizacion.json';
import neuroinflamacionJson from './concepts/neuroinflamacion.json';
import estresOxidativoJson from './concepts/estres-oxidativo.json';

// Sección 1.4 Neurogenética
import introGeneticaJson from './concepts/introduccion-genetica.json';
import comtJson from './concepts/comt-val158met.json';
import mthfrJson from './concepts/mthfr-c677t-a1298c.json';
import bdnfJson from './concepts/bdnf-val66met.json';
import apoeJson from './concepts/apolipoproteina-e-apoe.json';
import cyp1a2Json from './concepts/cyp1a2-y-metabolismo-cafeina.json';
import otrosGenesJson from './concepts/otros-genes-clave.json';
import epigeneticaJson from './concepts/epigenetica.json';
import farmacogenomicaPersonalizacionJson from './concepts/farmacogenomica-personalizacion.json';

// Sección 1.5 Neuroendocrinología
import introNeuroendocrinologiaJson from './concepts/introduccion-neuroendocrinologia.json';
import ejeHpaJson from './concepts/eje-hpa-cortisol.json';
import hormonasTiroideasJson from './concepts/hormonas-tiroideas.json';
import hormonasSexualesJson from './concepts/hormonas-sexuales-y-cerebro.json';
import melatoninaJson from './concepts/melatonina-y-ritmos-circadianos.json';

export const categorias: Categoria[] = categoriesJson as Categoria[];
export const sustancias: Sustancia[] = [bacopaJson as Sustancia];
export const conceptos: Concepto[] = [
  // 1.1
  neuroanatomiaJson as Concepto,
  cortezaPrefrontalJson as Concepto,
  hipocampoJson as Concepto,
  amigdalaJson as Concepto,
  gangliosBasalesJson as Concepto,
  locusCoeruleusJson as Concepto,
  bheJson as Concepto,
  glinfaticoJson as Concepto,
  ltpJson as Concepto,
  // 1.2
  introNeuroquimicaJson as Concepto,
  dopaminaJson as Concepto,
  acetilcolinaJson as Concepto,
  noradrenalinaJson as Concepto,
  serotoninaJson as Concepto,
  gabaJson as Concepto,
  glutamatoJson as Concepto,
  otrosNeuromoduladoresJson as Concepto,
  // 1.3
  introNeurofisiologiaJson as Concepto,
  sinapsisJson as Concepto,
  neuroplasticidadJson as Concepto,
  neurogenesisJson as Concepto,
  sinaptogenesisJson as Concepto,
  neuroinflamacionJson as Concepto,
  estresOxidativoJson as Concepto,
  // 1.4
  introGeneticaJson as Concepto,
  comtJson as Concepto,
  mthfrJson as Concepto,
  bdnfJson as Concepto,
  apoeJson as Concepto,
  cyp1a2Json as Concepto,
  otrosGenesJson as Concepto,
  epigeneticaJson as Concepto,
  farmacogenomicaPersonalizacionJson as Concepto,
  // 1.5
  introNeuroendocrinologiaJson as Concepto,
  ejeHpaJson as Concepto,
  hormonasTiroideasJson as Concepto,
  hormonasSexualesJson as Concepto,
  melatoninaJson as Concepto,
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
