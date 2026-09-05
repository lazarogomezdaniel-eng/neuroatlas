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
import litioOrotatoJson from './concepts/litio-orotato.json';
import hierroFerritinaJson from './concepts/hierro-ferritina.json';
import selenioJson from './concepts/selenio.json';
import yodoJson from './concepts/yodo.json';
import electrolitosSodioPotasioJson from './concepts/electrolitos-sodio-potasio.json';

// 2.5 Lípidos Estructurales & Ácidos Grasos
import omega3EpaDhaJson from './concepts/omega-3-epa-dha.json';
import fosfolipidosJson from './concepts/fosfolipidos.json';
import colesterolCerebralJson from './concepts/colesterol-cerebral.json';
import mctC8C10Json from './concepts/mct-c8-c10.json';

// 2.6 Aminoácidos y Péptidos Bioenergéticos
import creatinaJson from './concepts/creatina.json';
import colinaAlphaGpcCdpJson from './concepts/colina-alpha-gpc-cdp.json';
import lTirosinaJson from './concepts/l-tirosina.json';
import lTriptofano5HtpJson from './concepts/l-triptofano-5-htp.json';
import lTeaninaJson from './concepts/l-teanina.json';
import taurinaJson from './concepts/taurina.json';
import nacNAcetilCisteinaJson from './concepts/nac-n-acetil-cisteina.json';
import alcarJson from './concepts/alcar.json';
import agmatinaJson from './concepts/agmatina.json';
import uridinaJson from './concepts/uridina.json';

// 2.7 Red Antioxidante & Neuroprotección Mitocondrial
import introduccionAntioxidantesJson from './concepts/introduccion-antioxidantes.json';
import glutationJson from './concepts/glutation.json';
import astaxantinaJson from './concepts/astaxantina.json';
import curcuminaLongvidaJson from './concepts/curcumina-longvida.json';

// --- MÓDULO III: FARMACOLOGÍA SINTÉTICA Y FARMACÉUTICA ---
// 3.1 Familia de los Racetams
import introRacetamsJson from './concepts/introduccion-racetams.json';
import piracetamJson from './concepts/piracetam.json';
import aniracetamJson from './concepts/aniracetam.json';
import oxiracetamJson from './concepts/oxiracetam.json';
import pramiracetamJson from './concepts/pramiracetam.json';
import phenylpiracetamJson from './concepts/phenylpiracetam.json';
import coluracetamJson from './concepts/coluracetam.json';
import fasoracetamJson from './concepts/fasoracetam.json';

// 3.2 Eugeroicos (Promotores de la Vigilia)
import modafiniloArmodafiniloJson from './concepts/modafinilo-armodafinilo.json';
import adrafinilJson from './concepts/adrafinil.json';
import pitolisantSolriamfetolJson from './concepts/pitolisant-solriamfetol.json';

// 3.3 Ampakinas & Moduladores Glutamatérgicos
import sunifiramUnifiramJson from './concepts/sunifiram-unifiram.json';
import idra21Cx717Json from './concepts/idra-21-cx-717.json';

// 3.4 Péptidos Nootrópicos & Factores Neurotróficos
import semaxSelankJson from './concepts/semax-selank.json';
import noopeptJson from './concepts/noopept.json';
import cerebrolysinCortexinJson from './concepts/cerebrolysin-cortexin.json';
import dihexaP21Json from './concepts/dihexa-p21.json';
import epitalonJson from './concepts/epitalon.json';
import bpc157GhkCuJson from './concepts/bpc-157-ghk-cu.json';

// 3.5 Fármacos para Alzheimer & Demencia
import introduccionFarmacosAlzheimerJson from './concepts/introduccion-farmacos-alzheimer.json';
import donepeziloRivastigminaJson from './concepts/donepezilo-rivastigmina.json';
import galantaminaJson from './concepts/galantamina.json';
import memantinaJson from './concepts/memantina.json';

// 3.6 Estimulantes Dopaminérgicos & TDAH
import anfetaminasMetilfenidatoJson from './concepts/anfetaminas-metilfenidato.json';
import cafeinaNootropicaJson from './concepts/cafeina-nootropica.json';
import nicotinaAisladaJson from './concepts/nicotina-aislada.json';

// 3.7 Moduladores GABAérgicos & Ansiolíticos Sintéticos
import fenibutJson from './concepts/fenibut.json';
import picamilonAdaptolJson from './concepts/picamilon-adaptol.json';
import tianeptinaJson from './concepts/tianeptina.json';

// 3.8 Compuestos Neuroprotectores, Neurogénicos & Miscelánea
import nsi189Json from './concepts/nsi-189.json';
import isribJson from './concepts/isrib.json';
import azulMetilenoJson from './concepts/azul-metileno.json';
import rolipramVinpocetinaJson from './concepts/rolipram-vinpocetina.json';

// --- MÓDULO IV: FARMACOPEA NATURAL, BOTÁNICA Y FÚNGICA ---
// 4.1 Adaptógenos: Reguladores del Eje HPA
import ashwagandhaJson from './concepts/ashwagandha.json';
import ginsengJson from './concepts/ginseng.json';
import schisandraJson from './concepts/schisandra.json';
import macaTongkatAliJson from './concepts/maca-tongkat-ali.json';

// 4.2 Hongos Funcionales: Micoterapia Clínica
import introduccionMicoterapiaJson from './concepts/introduccion-micoterapia.json';
import melenaDeLeonJson from './concepts/melena-de-leon.json';
import cordycepsJson from './concepts/cordyceps.json';
import reishiJson from './concepts/reishi.json';
import chagaTurkeyTailJson from './concepts/chaga-turkey-tail.json';

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
  litioOrotatoJson as Concepto,
  hierroFerritinaJson as Concepto,
  selenioJson as Concepto,
  yodoJson as Concepto,
  electrolitosSodioPotasioJson as Concepto,

  // 2.5 Lípidos Estructurales & Ácidos Grasos
  omega3EpaDhaJson as Concepto,
  fosfolipidosJson as Concepto,
  colesterolCerebralJson as Concepto,
  mctC8C10Json as Concepto,

  // 2.6 Aminoácidos y Péptidos Bioenergéticos
  creatinaJson as Concepto,
  colinaAlphaGpcCdpJson as Concepto,
  lTirosinaJson as Concepto,
  lTriptofano5HtpJson as Concepto,
  lTeaninaJson as Concepto,
  taurinaJson as Concepto,
  nacNAcetilCisteinaJson as Concepto,
  alcarJson as Concepto,
  agmatinaJson as Concepto,
  uridinaJson as Concepto,

  // 2.7 Red Antioxidante & Neuroprotección Mitocondrial
  introduccionAntioxidantesJson as Concepto,
  glutationJson as Concepto,
  astaxantinaJson as Concepto,
  curcuminaLongvidaJson as Concepto,

  // MÓDULO III
  // 3.1 Familia de los Racetams
  introRacetamsJson as Concepto,
  piracetamJson as Concepto,
  aniracetamJson as Concepto,
  oxiracetamJson as Concepto,
  pramiracetamJson as Concepto,
  phenylpiracetamJson as Concepto,
  coluracetamJson as Concepto,
  fasoracetamJson as Concepto,

  // 3.2 Eugeroicos (Promotores de la Vigilia)
  modafiniloArmodafiniloJson as Concepto,
  adrafinilJson as Concepto,
  pitolisantSolriamfetolJson as Concepto,

  // 3.3 Ampakinas & Moduladores Glutamatérgicos
  sunifiramUnifiramJson as Concepto,
  idra21Cx717Json as Concepto,

  // 3.4 Péptidos Nootrópicos & Factores Neurotróficos
  semaxSelankJson as Concepto,
  noopeptJson as Concepto,
  cerebrolysinCortexinJson as Concepto,
  dihexaP21Json as Concepto,
  epitalonJson as Concepto,
  bpc157GhkCuJson as Concepto,

  // 3.5 Fármacos para Alzheimer & Demencia
  introduccionFarmacosAlzheimerJson as Concepto,
  donepeziloRivastigminaJson as Concepto,
  galantaminaJson as Concepto,
  memantinaJson as Concepto,

  // 3.6 Estimulantes Dopaminérgicos & TDAH
  anfetaminasMetilfenidatoJson as Concepto,
  cafeinaNootropicaJson as Concepto,
  nicotinaAisladaJson as Concepto,

  // 3.7 Moduladores GABAérgicos & Ansiolíticos Sintéticos
  fenibutJson as Concepto,
  picamilonAdaptolJson as Concepto,
  tianeptinaJson as Concepto,

  // 3.8 Compuestos Neuroprotectores, Neurogénicos & Miscelánea
  nsi189Json as Concepto,
  isribJson as Concepto,
  azulMetilenoJson as Concepto,
  rolipramVinpocetinaJson as Concepto,

  // MÓDULO IV
  // 4.1 Adaptógenos
  ashwagandhaJson as Concepto,
  ginsengJson as Concepto,
  schisandraJson as Concepto,
  macaTongkatAliJson as Concepto,

  // 4.2 Hongos Funcionales
  introduccionMicoterapiaJson as Concepto,
  melenaDeLeonJson as Concepto,
  cordycepsJson as Concepto,
  reishiJson as Concepto,
  chagaTurkeyTailJson as Concepto,
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
