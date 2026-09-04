import { Sustancia, Concepto, Categoria } from '@/types/neuroatlas-models';
import categoriesJson from './categories/categories.json';
import bacopaJson from './substances/bacopa-monnieri.json';

// --- MÓDULO I: FUNDAMENTOS BIOLÓGICOS ---
// 1.1 Neuroanatomía
import neuroanatomiaJson from './concepts/neuroanatomia-funcional.json';
import cortezaPrefrontalJson from './concepts/corteza-prefrontal.json';
import hipocampoJson from './concepts/hipocampo.json';
import amigdalaJson from './concepts/amigdala.json';
import gangliosBasalesJson from './concepts/ganglios-basales.json';
import locusCoeruleusJson from './concepts/locus-coeruleus.json';
import bheJson from './concepts/barrera-hematoencefalica.json';
import glinfaticoJson from './concepts/sistema-glinfatico.json';
import ltpJson from './concepts/plasticidad-sinaptica-ltp.json';

// 1.2 Neuroquímica
import introNeuroquimicaJson from './concepts/introduccion-neuroquimica.json';
import dopaminaJson from './concepts/dopamina.json';
import acetilcolinaJson from './concepts/acetilcolina.json';
import noradrenalinaJson from './concepts/noradrenalina.json';
import serotoninaJson from './concepts/serotonina.json';
import gabaJson from './concepts/gaba.json';
import glutamatoJson from './concepts/glutamato.json';
import otrosNeuromoduladoresJson from './concepts/otros-neuromoduladores.json';

// 1.3 Neurofisiología
import introNeurofisiologiaJson from './concepts/introduccion-neurofisiologia.json';
import sinapsisJson from './concepts/sinapsis-y-senalizacion.json';
import neuroplasticidadJson from './concepts/neuroplasticidad.json';
import neurogenesisJson from './concepts/neurogenesis-adulta.json';
import sinaptogenesisJson from './concepts/sinaptogenesis-y-mielinizacion.json';
import neuroinflamacionJson from './concepts/neuroinflamacion.json';
import estresOxidativoJson from './concepts/estres-oxidativo.json';

// 1.4 Neurogenética
import introGeneticaJson from './concepts/introduccion-genetica.json';
import comtJson from './concepts/comt-val158met.json';
import mthfrJson from './concepts/mthfr-c677t-a1298c.json';
import bdnfJson from './concepts/bdnf-val66met.json';
import apoeJson from './concepts/apolipoproteina-e-apoe.json';
import cyp1a2Json from './concepts/cyp1a2-y-metabolismo-cafeina.json';
import otrosGenesJson from './concepts/otros-genes-clave.json';
import epigeneticaJson from './concepts/epigenetica.json';
import farmacogenomicaPersonalizacionJson from './concepts/farmacogenomica-personalizacion.json';

// 1.5 Neuroendocrinología
import introNeuroendocrinologiaJson from './concepts/introduccion-neuroendocrinologia.json';
import ejeHpaJson from './concepts/eje-hpa-cortisol.json';
import hormonasTiroideasJson from './concepts/hormonas-tiroideas.json';
import hormonasSexualesJson from './concepts/hormonas-sexuales-y-cerebro.json';
import melatoninaJson from './concepts/melatonina-y-ritmos-circadianos.json';

// 1.6 Neuroinmunología
import introNeuroinmunologiaJson from './concepts/introduccion-neuroinmunologia.json';
import microgliaJson from './concepts/microglia-m1-m2.json';
import citocinasJson from './concepts/citocinas-y-neuroinflamacion.json';
import ejeIntestinoJson from './concepts/eje-intestino-cerebro-inmune.json';

// --- MÓDULO II: NUTRICIÓN CEREBRAL Y MICRONUTRIENTES ---
// 2.1 Complejo B y Metilación
import introVitaminasBJson from './concepts/introduccion-vitaminas-b-metilacion.json';
import vitaminaB1Json from './concepts/vitamina-b1-tiamina.json';
import vitaminaB2Json from './concepts/vitamina-b2-riboflavina.json';
import vitaminaB3Json from './concepts/vitamina-b3-niacina.json';
import vitaminaB5Json from './concepts/vitamina-b5-acido-pantotenico.json';
import vitaminaB6Json from './concepts/vitamina-b6-piridoxina.json';
import vitaminaB7Json from './concepts/vitamina-b7-biotina.json';
import vitaminaB9Json from './concepts/vitamina-b9-folato.json';
import vitaminaB12Json from './concepts/vitamina-b12.json';

// 2.2 Vitaminas Liposolubles & Antioxidantes
import vitaminaCJson from './concepts/vitamina-c.json';
import vitaminaD3K2Json from './concepts/vitamina-d3-k2.json';
import vitaminaETocoferolesJson from './concepts/vitamina-e-tocoferoles.json';

// 2.3 Espectro del Magnesio
import introMagnesioJson from './concepts/introduccion-magnesio.json';
import magnesioTreonatoJson from './concepts/magnesio-l-treonato.json';
import magnesioGlicinatoJson from './concepts/magnesio-glicinato.json';
import magnesioTauratoJson from './concepts/magnesio-taurato.json';
import magnesioMalatoJson from './concepts/magnesio-malato.json';
import otrosTiposMagnesioJson from './concepts/otros-tipos-magnesio.json';

// 2.4 Minerales Traza & Electrolitos
import zincJson from './concepts/zinc.json';

export const categorias: Categoria[] = categoriesJson as Categoria[];
export const sustancias: Sustancia[] = [bacopaJson as Sustancia];
export const conceptos: Concepto[] = [
  // MÓDULO I
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
  // 1.6
  introNeuroinmunologiaJson as Concepto,
  microgliaJson as Concepto,
  citocinasJson as Concepto,
  ejeIntestinoJson as Concepto,

  // MÓDULO II
  // 2.1 Complejo B y Metilación
  introVitaminasBJson as Concepto,
  vitaminaB1Json as Concepto,
  vitaminaB2Json as Concepto,
  vitaminaB3Json as Concepto,
  vitaminaB5Json as Concepto,
  vitaminaB6Json as Concepto,
  vitaminaB7Json as Concepto,
  vitaminaB9Json as Concepto,
  vitaminaB12Json as Concepto,

  // 2.2 Vitaminas Liposolubles & Antioxidantes
  vitaminaCJson as Concepto,
  vitaminaD3K2Json as Concepto,
  vitaminaETocoferolesJson as Concepto,

  // 2.3 Espectro del Magnesio
  introMagnesioJson as Concepto,
  magnesioTreonatoJson as Concepto,
  magnesioGlicinatoJson as Concepto,
  magnesioTauratoJson as Concepto,
  magnesioMalatoJson as Concepto,
  otrosTiposMagnesioJson as Concepto,

  // 2.4 Minerales Traza & Electrolitos
  zincJson as Concepto,
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
