export interface SectionItem {
  id: string;
  number: string;
  title: string;
  href: string;
  conceptCount?: number;
}

export interface ModuleItem {
  id: string;
  number: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  href: string;
  status: 'completed' | 'in_progress' | 'pending';
  statusLabel: string;
  progressPercent: number;
  conceptCount: number;
  sectionsCount: number;
  readTime: string;
  sections: SectionItem[];
}

export interface EffectItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  color: string;
  href: string;
  substanceCount: number;
}

export const CURRICULUM_MODULES: ModuleItem[] = [
  {
    id: 'modulo-1',
    number: 1,
    romanNumeral: 'I',
    title: 'Fundamentos Biológicos',
    subtitle: 'Neuroanatomía, neuroquímica, neurofisiología y genética',
    icon: '🧠',
    color: '#22D3EE',
    href: '/modulos/modulo-1',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 38,
    sectionsCount: 6,
    readTime: '4-6 h',
    sections: [
      { id: '1-1', number: '1.1', title: 'Neuroanatomía Funcional', href: '/modulos/modulo-1#1-1-neuroanatomia', conceptCount: 9 },
      { id: '1-2', number: '1.2', title: 'Neuroquímica', href: '/modulos/modulo-1#1-2-neuroquimica', conceptCount: 8 },
      { id: '1-3', number: '1.3', title: 'Neurofisiología', href: '/modulos/modulo-1#1-3-neurofisiologia', conceptCount: 6 },
      { id: '1-4', number: '1.4', title: 'Neurogenética y Epigenética', href: '/modulos/modulo-1#1-4-farmacogenomica', conceptCount: 5 },
      { id: '1-5', number: '1.5', title: 'Neuroendocrinología', href: '/modulos/modulo-1#1-5-neuroendocrinologia', conceptCount: 5 },
      { id: '1-6', number: '1.6', title: 'Neuroinmunología', href: '/modulos/modulo-1#1-6-neuroinmunologia', conceptCount: 5 }
    ]
  },
  {
    id: 'modulo-2',
    number: 2,
    romanNumeral: 'II',
    title: 'Nutrición Cerebral',
    subtitle: 'Complejo B, magnesio, minerales, lípidos y antioxidantes',
    icon: '🧪',
    color: '#10B981',
    href: '/modulos/modulo-2',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 42,
    sectionsCount: 7,
    readTime: '3-4 h',
    sections: [
      { id: '2-1', number: '2.1', title: 'Complejo B y Metilación', href: '/modulos/modulo-2#2-1-vitaminas-b', conceptCount: 9 },
      { id: '2-2', number: '2.2', title: 'Otras Vitaminas', href: '/modulos/modulo-2#2-2-minerales', conceptCount: 6 },
      { id: '2-3', number: '2.3', title: 'Espectro del Magnesio', href: '/modulos/modulo-2#2-3-magnesio', conceptCount: 6 },
      { id: '2-4', number: '2.4', title: 'Minerales y Electrolitos', href: '/modulos/modulo-2#2-4-lipidos', conceptCount: 4 },
      { id: '2-5', number: '2.5', title: 'Lípidos y Ácidos Grasos', href: '/modulos/modulo-2#2-5-aminoacidos', conceptCount: 8 },
      { id: '2-6', number: '2.6', title: 'Aminoácidos y Precursores', href: '/modulos/modulo-2#2-6-antioxidantes', conceptCount: 4 },
      { id: '2-7', number: '2.7', title: 'Antioxidantes Cerebrales', href: '/modulos/modulo-2#2-7-hidratacion', conceptCount: 5 }
    ]
  },
  {
    id: 'modulo-3',
    number: 3,
    romanNumeral: 'III',
    title: 'Farmacología Sintética',
    subtitle: 'Racetams, eugeroicos, péptidos y estimulantes sintéticos',
    icon: '💊',
    color: '#3B82F6',
    href: '/modulos/modulo-3',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 33,
    sectionsCount: 8,
    readTime: '4-5 h',
    sections: [
      { id: '3-1', number: '3.1', title: 'Racetams', href: '/modulos/modulo-3#3-1-racetams', conceptCount: 8 },
      { id: '3-2', number: '3.2', title: 'Eugeroicos', href: '/modulos/modulo-3#3-2-eugeroicos', conceptCount: 3 },
      { id: '3-3', number: '3.3', title: 'Ampakinas', href: '/modulos/modulo-3#3-3-ampakinas', conceptCount: 2 },
      { id: '3-4', number: '3.4', title: 'Péptidos Nootrópicos', href: '/modulos/modulo-3#3-4-peptidos', conceptCount: 6 },
      { id: '3-5', number: '3.5', title: 'Fármacos para Alzheimer', href: '/modulos/modulo-3#3-5-alzheimer', conceptCount: 4 },
      { id: '3-6', number: '3.6', title: 'Estimulantes Clásicos', href: '/modulos/modulo-3#3-6-estimulantes', conceptCount: 3 },
      { id: '3-7', number: '3.7', title: 'Ansiolíticos Sintéticos', href: '/modulos/modulo-3#3-7-gabaergicos', conceptCount: 3 },
      { id: '3-8', number: '3.8', title: 'Research Chemicals', href: '/modulos/modulo-3#3-8-neuroprotectores', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-4',
    number: 4,
    romanNumeral: 'IV',
    title: 'Farmacopea Natural',
    subtitle: 'Adaptógenos, hongos, hierbas nootrópicas y plantas energéticas',
    icon: '🌿',
    color: '#84CC16',
    href: '/modulos/modulo-4',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 27,
    sectionsCount: 6,
    readTime: '5-6 h',
    sections: [
      { id: '4-1', number: '4.1', title: 'Adaptógenos', href: '/modulos/modulo-4#4-1-adaptogenos', conceptCount: 6 },
      { id: '4-2', number: '4.2', title: 'Hongos Funcionales', href: '/modulos/modulo-4#4-2-micoterapia', conceptCount: 5 },
      { id: '4-3', number: '4.3', title: 'Hierbas Nootrópicas', href: '/modulos/modulo-4#4-3-fitonootropicos', conceptCount: 6 },
      { id: '4-4', number: '4.4', title: 'Hierbas Sedantes/Ansiolíticas', href: '/modulos/modulo-4#4-4-fitotranquilizantes', conceptCount: 4 },
      { id: '4-5', number: '4.5', title: 'Hierbas Antidepresivas', href: '/modulos/modulo-4#4-5-antidepresivos', conceptCount: 3 },
      { id: '4-6', number: '4.6', title: 'Plantas Energéticas', href: '/modulos/modulo-4#4-6-estimulantes-naturales', conceptCount: 3 }
    ]
  },
  {
    id: 'modulo-5',
    number: 5,
    romanNumeral: 'V',
    title: 'Psicodelia y Plasticidad',
    subtitle: 'Psicodélicos clásicos, disociativos, entactógenos y microdosis',
    icon: '🍄',
    color: '#8B5CF6',
    href: '/modulos/modulo-5',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 20,
    sectionsCount: 6,
    readTime: '5-6 h',
    sections: [
      { id: '5-1', number: '5.1', title: 'Psicodélicos Clásicos', href: '/modulos/modulo-5#5-1-psicodelicos-clasicos', conceptCount: 6 },
      { id: '5-2', number: '5.2', title: 'Disociativos', href: '/modulos/modulo-5#5-2-disociativos', conceptCount: 2 },
      { id: '5-3', number: '5.3', title: 'Entactógenos', href: '/modulos/modulo-5#5-3-entactogenos', conceptCount: 2 },
      { id: '5-4', number: '5.4', title: 'Psicodélicos Atípicos', href: '/modulos/modulo-5#5-4-atipicos', conceptCount: 3 },
      { id: '5-5', number: '5.5', title: 'Microdosis', href: '/modulos/modulo-5#5-5-microdosis', conceptCount: 3 },
      { id: '5-6', number: '5.6', title: 'Neuroplasticidad Psicodélica', href: '/modulos/modulo-5#5-6-neuroplasticidad', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-6',
    number: 6,
    romanNumeral: 'VI',
    title: 'Bioenergética y Anti-Aging',
    subtitle: 'Función mitocondrial, NAD+, senolíticos y fotobiomodulación',
    icon: '⚡',
    color: '#F59E0B',
    href: '/modulos/modulo-6',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 16,
    sectionsCount: 4,
    readTime: '3-4 h',
    sections: [
      { id: '6-1', number: '6.1', title: 'Función Mitocondrial & ATP', href: '/modulos/modulo-6#6-1-mitocondria', conceptCount: 4 },
      { id: '6-2', number: '6.2', title: 'Vías NAD+, Sirtuinas & AMPK', href: '/modulos/modulo-6#6-2-longevidad', conceptCount: 4 },
      { id: '6-3', number: '6.3', title: 'Senolíticos & Autofagia', href: '/modulos/modulo-6#6-3-autofagia', conceptCount: 4 },
      { id: '6-4', number: '6.4', title: 'Fotobiomodulación Cerebral', href: '/modulos/modulo-6#6-4-fotobiomodulacion', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-7',
    number: 7,
    romanNumeral: 'VII',
    title: 'El Eje Intestino-Cerebro',
    subtitle: 'Cómo tu microbioma dicta tu estado de ánimo, cognición y salud mental',
    icon: '🦠',
    color: '#10B981',
    href: '/modulos/modulo-7',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 15,
    sectionsCount: 4,
    readTime: '4-5 h',
    sections: [
      { id: '7-1', number: '7.1', title: 'Introducción al Eje & Señalización Neural', href: '/modulos/modulo-7#7-1-introduccion', conceptCount: 4 },
      { id: '7-2', number: '7.2', title: 'Psicobióticos: Probióticos para el Cerebro', href: '/modulos/modulo-7#7-2-psicobioticos', conceptCount: 3 },
      { id: '7-3', number: '7.3', title: 'Prebióticos, Postbióticos & SCFAs', href: '/modulos/modulo-7#7-3-scfas', conceptCount: 4 },
      { id: '7-4', number: '7.4', title: 'Disbiosis, Intestino Permeable & FMT', href: '/modulos/modulo-7#7-4-disbiosis', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-8',
    number: 8,
    romanNumeral: 'VIII',
    title: 'Hormesis y Nootrópicos Ambientales',
    subtitle: 'Lo que no te mata te hace más fuerte: la ciencia del estrés beneficioso',
    icon: '🔥',
    color: '#DC2626',
    href: '/modulos/modulo-8',
    status: 'completed',
    statusLabel: '✅ Completado',
    progressPercent: 100,
    conceptCount: 14,
    sectionsCount: 7,
    readTime: '4-5 h',
    sections: [
      { id: '8-1', number: '8.1', title: 'Fundamentos de la Hormesis', href: '/modulos/modulo-8#8-1-fundamentos', conceptCount: 2 },
      { id: '8-2', number: '8.2', title: 'Exposición al Frío', href: '/modulos/modulo-8#8-2-frio', conceptCount: 2 },
      { id: '8-3', number: '8.3', title: 'Exposición al Calor', href: '/modulos/modulo-8#8-3-calor', conceptCount: 2 },
      { id: '8-4', number: '8.4', title: 'Ayuno y Restricción Calórica', href: '/modulos/modulo-8#8-4-ayuno', conceptCount: 2 },
      { id: '8-5', number: '8.5', title: 'Fotobiomodulación', href: '/modulos/modulo-8#8-5-fotobiomodulacion', conceptCount: 2 },
      { id: '8-6', number: '8.6', title: 'Hipoxia y Respiración', href: '/modulos/modulo-8#8-6-hipoxia-respiracion', conceptCount: 3 },
      { id: '8-7', number: '8.7', title: 'Otros Estresores Horméticos', href: '/modulos/modulo-8#8-7-otros-estresores', conceptCount: 1 }
    ]
  },
  {
    id: 'modulo-9',
    number: 9,
    romanNumeral: 'IX',
    title: 'Cronobiología y Sueño',
    subtitle: 'Fases REM, drenaje glinfático y sincronización circadiana',
    icon: '🌙',
    color: '#6366F1',
    href: '/modulos/modulo-9',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 16,
    sectionsCount: 4,
    readTime: '3-4 h',
    sections: [
      { id: '9-1', number: '9.1', title: 'Fases del Sueño & Sistema Glinfático', href: '/modulos/modulo-9#9-1-fases-sueno', conceptCount: 4 },
      { id: '9-2', number: '9.2', title: 'Ritmos Circadianos & Melatonina', href: '/modulos/modulo-9#9-2-circadiano', conceptCount: 4 },
      { id: '9-3', number: '9.3', title: 'Suplementación para el Sueño', href: '/modulos/modulo-9#9-3-suplementacion-sueno', conceptCount: 4 },
      { id: '9-4', number: '9.4', title: 'Higiene del Sueño & Bio-Tracking', href: '/modulos/modulo-9#9-4-higiene-sueno', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-10',
    number: 10,
    romanNumeral: 'X',
    title: 'El Arte del Stacking',
    subtitle: 'Principios de formulación, prevención de tolerancia y ciclado',
    icon: '⚗️',
    color: '#EC4899',
    href: '/modulos/modulo-10',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 18,
    sectionsCount: 4,
    readTime: '4-5 h',
    sections: [
      { id: '10-1', number: '10.1', title: 'Principios de Formulación & Sinergias', href: '/modulos/modulo-10#10-1-principios-stacking', conceptCount: 5 },
      { id: '10-2', number: '10.2', title: 'Tolerancia, Ciclado & Descanso', href: '/modulos/modulo-10#10-2-tolerancia-ciclado', conceptCount: 4 },
      { id: '10-3', number: '10.3', title: 'Efectos Secundarios & Rescate', href: '/modulos/modulo-10#10-3-efectos-secundarios', conceptCount: 4 },
      { id: '10-4', number: '10.4', title: 'Protocolos por Objetivo', href: '/modulos/modulo-10#10-4-protocolos-objetivos', conceptCount: 5 }
    ]
  },
  {
    id: 'modulo-11',
    number: 11,
    romanNumeral: 'XI',
    title: 'Aplicaciones Específicas',
    subtitle: 'Deep work, rendimiento académico, oratoria y burnout',
    icon: '🎯',
    color: '#F97316',
    href: '/modulos/modulo-11',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 16,
    sectionsCount: 4,
    readTime: '3-4 h',
    sections: [
      { id: '11-1', number: '11.1', title: 'Rendimiento Académico & Memoria', href: '/modulos/modulo-11#11-1-academico', conceptCount: 4 },
      { id: '11-2', number: '11.2', title: 'Flow State & Deep Work', href: '/modulos/modulo-11#11-2-flow-state', conceptCount: 4 },
      { id: '11-3', number: '11.3', title: 'Ansiedad Social & Oratoria', href: '/modulos/modulo-11#11-3-ansiedad-social', conceptCount: 4 },
      { id: '11-4', number: '11.4', title: 'Fatiga Crónica & Burnout', href: '/modulos/modulo-11#11-4-burnout', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-12',
    number: 12,
    romanNumeral: 'XII',
    title: 'Marcas y Calidad',
    subtitle: 'Auditoría analítica HPLC, espectrometría y patentes',
    icon: '🏆',
    color: '#EAB308',
    href: '/modulos/modulo-12',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 12,
    sectionsCount: 3,
    readTime: '2-3 h',
    sections: [
      { id: '12-1', number: '12.1', title: 'Análisis HPLC & Espectrometría', href: '/modulos/modulo-12#12-1-analisis-hplc', conceptCount: 4 },
      { id: '12-2', number: '12.2', title: 'Certificados CoA & Pureza', href: '/modulos/modulo-12#12-2-certificados-coa', conceptCount: 4 },
      { id: '12-3', number: '12.3', title: 'Auditoría de Proveedores & Patentes', href: '/modulos/modulo-12#12-3-auditoria-proveedores', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-13',
    number: 13,
    romanNumeral: 'XIII',
    title: 'Neuroética y Legalidad',
    subtitle: 'Regulación internacional, interfaces BCI y neurofarmacología',
    icon: '⚖️',
    color: '#A855F7',
    href: '/modulos/modulo-13',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 12,
    sectionsCount: 3,
    readTime: '2-3 h',
    sections: [
      { id: '13-1', number: '13.1', title: 'Estatus Regulatorio Global', href: '/modulos/modulo-13#13-1-regulacion-global', conceptCount: 4 },
      { id: '13-2', number: '13.2', title: 'Bioética de la Mejora Cognitiva', href: '/modulos/modulo-13#13-2-bioetica', conceptCount: 4 },
      { id: '13-3', number: '13.3', title: 'Interfaces BCI & Futuro Neurofarmacológico', href: '/modulos/modulo-13#13-3-bci-neurotech', conceptCount: 4 }
    ]
  },
  {
    id: 'modulo-14',
    number: 14,
    romanNumeral: 'XIV',
    title: 'Recursos y Herramientas',
    subtitle: 'Calculadoras farmacocinéticas, matrices y bibliografía abierta',
    icon: '🛠️',
    color: '#64748B',
    href: '/modulos/modulo-14',
    status: 'pending',
    statusLabel: '⏳ Pendiente',
    progressPercent: 0,
    conceptCount: 10,
    sectionsCount: 3,
    readTime: '2 h',
    sections: [
      { id: '14-1', number: '14.1', title: 'Calculadora de Semivida & Eliminación', href: '/modulos/modulo-14#14-1-calculadora-semivida', conceptCount: 3 },
      { id: '14-2', number: '14.2', title: 'Matriz de Interacciones & Contraindicaciones', href: '/modulos/modulo-14#14-2-matriz-interacciones', conceptCount: 4 },
      { id: '14-3', number: '14.3', title: 'Directorio de Estudios & Glosario Fórmulas', href: '/modulos/modulo-14#14-3-directorio-estudios', conceptCount: 3 }
    ]
  }
];

export const COGNITIVE_EFFECTS: EffectItem[] = [
  {
    id: 'memoria-aprendizaje',
    slug: 'memoria-aprendizaje',
    title: 'Memoria y Aprendizaje',
    shortDesc: 'Consolidación LTP, acetilcolina y plasticidad sináptica',
    icon: '🧠',
    color: '#22D3EE',
    href: '/efectos/memoria-aprendizaje',
    substanceCount: 28
  },
  {
    id: 'foco-concentracion',
    slug: 'foco-concentracion',
    title: 'Foco y Concentración',
    shortDesc: 'Atención ejecutiva, dopamina y modulación prefrontal',
    icon: '🎯',
    color: '#3B82F6',
    href: '/efectos/foco-concentracion',
    substanceCount: 24
  },
  {
    id: 'energia-motivacion',
    slug: 'energia-motivacion',
    title: 'Energía y Motivación',
    shortDesc: 'Producción de ATP mitocondrial, dopamina mesolímbica y vigilia',
    icon: '⚡',
    color: '#F59E0B',
    href: '/efectos/energia-motivacion',
    substanceCount: 19
  },
  {
    id: 'calma-ansiedad',
    slug: 'calma-ansiedad',
    title: 'Calma y Ansiedad',
    shortDesc: 'Tono GABAérgico, modulación del eje HPA y ondas alfa',
    icon: '🧘',
    color: '#10B981',
    href: '/efectos/calma-ansiedad',
    substanceCount: 22
  },
  {
    id: 'sueno',
    slug: 'sueno',
    title: 'Sueño',
    shortDesc: 'Arquitectura REM, ondas delta y drenaje glinfático',
    icon: '🌙',
    color: '#6366F1',
    href: '/efectos/sueno',
    substanceCount: 16
  },
  {
    id: 'creatividad',
    slug: 'creatividad',
    title: 'Creatividad',
    shortDesc: 'Pensamiento divergente, conectividad global y plasticidad',
    icon: '🎨',
    color: '#EC4899',
    href: '/efectos/creatividad',
    substanceCount: 15
  },
  {
    id: 'neuroproteccion-antiaging',
    slug: 'neuroproteccion-antiaging',
    title: 'Neuroprotección / Anti-aging',
    shortDesc: 'Autofagia, neutralización de ROS y mantenimiento de BHE',
    icon: '🛡️',
    color: '#14B8A6',
    href: '/efectos/neuroproteccion-antiaging',
    substanceCount: 31
  },
  {
    id: 'estado-de-animo',
    slug: 'estado-de-animo',
    title: 'Estado de Ánimo',
    shortDesc: 'Serotonina, BDNF y estabilidad afectiva',
    icon: '☀️',
    color: '#EAB308',
    href: '/efectos/estado-de-animo',
    substanceCount: 18
  }
];
