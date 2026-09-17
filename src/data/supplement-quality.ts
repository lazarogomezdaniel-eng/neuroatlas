import qualityDbRaw from './supplement-quality-database.json';

export interface QualitySeal {
  sello: string;
  fabricante: string;
  que_verifica: string;
  por_que_importa: string;
}

export interface ChemicalForm {
  forma: string;
  formula?: string;
  biodisponibilidad?: string;
  biodisponibilidad_relativa?: string;
  absorcion?: string;
  tecnologia?: string;
  caracteristicas?: string;
  estandarizacion?: string;
  withanolidos?: string;
  bacósidos?: string;
  porcentaje_colina?: string;
  cruza_bhe?: string;
  origen?: string;
  parte_planta?: string;
  uso?: string;
  efectos_gi?: string;
  evidencia?: string;
  veredicto: 'recomendada' | 'aceptable' | 'evitar' | 'sin_evidencia' | 'uso_medico' | 'solo_prescripcion' | string;
  nota?: string;
}

export interface ProductPresentation {
  presentacion: string;
  biodisponibilidad?: string;
  farmacocinetica?: string;
  ventaja?: string;
  desventaja?: string;
  para_quien?: string;
  uso?: string;
  veredicto?: string;
}

export interface ProductSynergy {
  con: string;
  mecanismo: string;
  ratio: string;
  evidencia: string;
  nota?: string;
  precaucion?: string;
}

export interface QualityMetric {
  parametro: string;
  limite_aceptable: string;
  que_indica: string;
}

export interface ProductCaution {
  condicion: string;
  precaucion: string;
}

export interface ProductSideEffect {
  efecto: string;
  frecuencia: string;
  mitigacion: string;
}

export interface ProductDoseRange {
  rango: string;
  uso: string;
  veredicto: string;
  nota?: string;
}

export interface ProductSpecificStrain {
  cepa: string;
  uso: string;
  evidencia: string;
  veredicto: string;
}

export interface ProductTiming {
  momento: string;
  razon: string;
  veredicto: string;
}

export interface ProductQualityInfo {
  sellos_calidad?: QualitySeal[];
  formas_quimicas?: ChemicalForm[];
  presentaciones?: ProductPresentation[];
  formas_presentacion?: ProductPresentation[];
  sinergias?: ProductSynergy[];
  variantes_a_evitar?: { forma: string; motivo: string }[];
  variantes_k2?: { forma: string; vida_media: string; origen: string; veredicto: string; nota: string }[];
  metricas_calidad?: QualityMetric[];
  precauciones?: ProductCaution[];
  antagonistas?: { sustancia: string; efecto: string; solucion: string }[];
  efectos_secundarios?: ProductSideEffect[];
  cepas_especificas?: ProductSpecificStrain[];
  dosis?: ProductDoseRange[];
  dosis_seguras?: ProductDoseRange[];
  dosis_fisiologicas?: ProductDoseRange[];
  timing?: ProductTiming[];
  nota_importante?: string;
  nota_mthfr?: string;
  nota_cfu?: string;
  nota_estatinas?: string;
  nota_estabilidad?: string;
  precaucion_critica?: string;
}

export interface SupplementQualityDatabase {
  version: string;
  descripcion: string;
  productos: Record<string, ProductQualityInfo>;
}

export const qualityDatabase = qualityDbRaw as unknown as SupplementQualityDatabase;

// Mapeo flexible de slugs (conceptos, sustancias y módulos) a la clave canónica del producto
const SLUG_TO_PRODUCT_MAP: Record<string, string> = {
  // Creatina
  'creatina': 'creatina',
  'creatine': 'creatina',
  'creatina-monohidrato': 'creatina',

  // Vitamina D3
  'vitamina_d3': 'vitamina_d3',
  'vitamina-d3': 'vitamina_d3',
  'vitamina-d3-k2': 'vitamina_d3',
  'colecalciferol': 'vitamina_d3',

  // Omega-3
  'omega_3': 'omega_3',
  'omega-3': 'omega_3',
  'omega-3-epa-dha': 'omega_3',
  'omega-3-dha-epa': 'omega_3',
  'dha': 'omega_3',
  'epa': 'omega_3',

  // Magnesio
  'magnesio': 'magnesio',
  'magnesium': 'magnesio',
  'introduccion-magnesio': 'magnesio',
  'magnesio-l-treonato': 'magnesio',
  'magnesio-glicinato': 'magnesio',
  'magnesio-malato': 'magnesio',
  'magnesio-taurato': 'magnesio',
  'otros-tipos-magnesio': 'magnesio',

  // Cafeína
  'cafeina': 'cafeina',
  'cafeina-nootropica': 'cafeina',
  'cyp1a2-y-metabolismo-cafeina': 'cafeina',
  'cafe-te': 'cafeina',

  // Melatonina
  'melatonina': 'melatonina',
  'melatonina-y-ritmos-circadianos': 'melatonina',

  // Curcumina
  'curcumina': 'curcumina',
  'curcuma-boswellia': 'curcumina',
  'curcumina-longvida': 'curcumina',

  // Ashwagandha
  'ashwagandha': 'ashwagandha',
  'ksm-66': 'ashwagandha',
  'sensoril': 'ashwagandha',
  'withania-somnifera': 'ashwagandha',

  // Bacopa Monnieri
  'bacopa': 'bacopa_monnieri',
  'bacopa_monnieri': 'bacopa_monnieri',
  'bacopa-monnieri': 'bacopa_monnieri',

  // Citicolina / Colina
  'citicolina': 'citicolina',
  'citicoline': 'citicolina',
  'colina-alpha-gpc-cdp': 'citicolina',
  'alpha-gpc': 'citicolina',
  'cdp-colina': 'citicolina',

  // L-Teanina
  'l_teanina': 'l_teanina',
  'l-teanina': 'l_teanina',
  'teanina': 'l_teanina',

  // Rhodiola Rosea
  'rhodiola': 'rhodiola_rosea',
  'rhodiola_rosea': 'rhodiola_rosea',
  'rhodiola-rosea': 'rhodiola_rosea',

  // Melena de León
  'melena_de_leon': 'melena_de_leon',
  'melena-de-leon': 'melena_de_leon',
  'hericium-erinaceus': 'melena_de_leon',
  'lions-mane': 'melena_de_leon',

  // Zinc
  'zinc': 'zinc',
  'zinc-cobre': 'zinc',

  // Vitamina B12
  'vitamina_b12': 'vitamina_b12',
  'vitamina-b12': 'vitamina_b12',
  'b12': 'vitamina_b12',
  'cobalamina': 'vitamina_b12',

  // Folato (B9)
  'folato': 'folato',
  'vitamina-b9-folato': 'folato',
  'vitamina-b9': 'folato',
  'acido-folico': 'folato',
  'mthfr-c677t-a1298c': 'folato',

  // Hierro
  'hierro': 'hierro',
  'hierro-ferritina': 'hierro',

  // Probióticos
  'probioticos': 'probioticos',
  'psicobioticos': 'probioticos',
  'cepas-psicobioticas': 'probioticos',
  'microbioma': 'probioticos',

  // Coenzima Q10
  'coenzima_q10': 'coenzima_q10',
  'coenzima-q10': 'coenzima_q10',
  'coq10': 'coenzima_q10',
  'ubiquinol': 'coenzima_q10',

  // NMN / NR
  'nmn_nr': 'nmn_nr',
  'nmn-nr': 'nmn_nr',
  'nmn': 'nmn_nr',
  'nr': 'nmn_nr',

  // Ginkgo Biloba
  'ginkgo': 'ginkgo_biloba',
  'ginkgo_biloba': 'ginkgo_biloba',
  'ginkgo-biloba': 'ginkgo_biloba',
  'egb761': 'ginkgo_biloba',
  'egb-761': 'ginkgo_biloba',

  // NAC (N-Acetil Cisteína)
  'nac': 'nac',
  'n-acetil-cisteina': 'nac',
  'nac-n-acetil-cisteina': 'nac',
  'n-acetylcysteine': 'nac',

  // ALCAR (Acetil-L-Carnitina)
  'alcar': 'alcar',
  'acetil-l-carnitina': 'alcar',
  'acetyl-l-carnitine': 'alcar',
  'carnitina': 'alcar',

  // L-Tirosina
  'tirosina': 'tirosina',
  'l-tirosina': 'tirosina',
  'l_tirosina': 'tirosina',
  'tyrosine': 'tirosina',

  // Fosfatidilserina / Fosfolípidos
  'fosfatidilserina': 'fosfatidilserina',
  'fosfolipidos': 'fosfatidilserina',
  'phosphatidylserine': 'fosfatidilserina',
};

/**
 * Busca datos de calidad, patentes y sinergias por slug o id.
 */
export function getSupplementQualityData(slugOrId: string): ProductQualityInfo | null {
  if (!slugOrId) return null;
  const normalized = slugOrId.toLowerCase().trim();
  
  // 1. Comprobación directa
  if (qualityDatabase.productos[normalized]) {
    return qualityDatabase.productos[normalized];
  }

  // 2. Mapeo de alias
  const mappedKey = SLUG_TO_PRODUCT_MAP[normalized];
  if (mappedKey && qualityDatabase.productos[mappedKey]) {
    return qualityDatabase.productos[mappedKey];
  }

  // 3. Comprobación de coincidencia parcial
  for (const [alias, productKey] of Object.entries(SLUG_TO_PRODUCT_MAP)) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return qualityDatabase.productos[productKey];
    }
  }

  return null;
}
