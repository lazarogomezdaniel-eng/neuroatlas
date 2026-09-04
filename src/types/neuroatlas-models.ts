/**
 * MODELO DE DATOS CANÓNICO DE NEUROATLAS
 * Adaptado para TypeScript, validación estricta y motores de búsqueda
 */

export type NivelEvidencia = 'fuerte' | 'mixta' | 'debil';
export type NivelRiesgo = 'bajo' | 'medio' | 'alto';
export type GravedadInteraccion = 'alta' | 'media' | 'baja';
export type TipoConcepto = 'anatomia' | 'neurotransmisor' | 'concepto' | 'mecanismo' | 'sustancia';

export interface Beneficio {
  nombre: string;
  evidencia: NivelEvidencia;
}

export interface Dosis {
  tipica: string;
  formas: string[];
  timing: string;
}

export interface Farmacocinetica {
  biodisponibilidad: string;
  vida_media: string;
  tmax: string;
  cruza_bhe: boolean;
}

export interface Interaccion {
  sustancia: string;
  gravedad: GravedadInteraccion;
  descripcion: string;
}

export interface EstadoLegal {
  europa: string;
  espana: string;
  eeuu: string;
}

export interface EstudioCientifico {
  titulo: string;
  anio: number;
  tipo: string;
  resultado: string;
  enlace?: string;
}

// 1. MODELO: Sustancia
export interface Sustancia {
  slug: string;                           // ej: "bacopa-monnieri"
  nombre: string;                         // ej: "Bacopa Monnieri"
  nombre_cientifico: string;              // ej: "Bacopa monnieri (L.) Wettst."
  categoria: string;                      // id o slug de la categoría
  mecanismo: string;                      // texto explicativo
  neurotransmisores: string[];            // ["acetilcolina", "serotonina"]
  regiones_cerebrales: string[];          // ["hipocampo", "corteza prefrontal"]
  beneficios: Beneficio[];
  dosis: Dosis;
  farmacocinetica: Farmacocinetica;
  sinergias: string[];                    // slugs de sustancias compatibles
  interacciones: Interaccion[];
  efectos_secundarios: string[];
  contraindicaciones: string[];
  estado_legal: EstadoLegal;
  nivel_evidencia: NivelEvidencia;
  nivel_riesgo: NivelRiesgo;
  uso_tradicional: string;
  estudios: EstudioCientifico[];
  sustancias_relacionadas: string[];      // slugs
}

// 2. MODELO: Concepto
export interface Concepto {
  slug: string;
  titulo: string;
  modulo: string;                         // ej: "Módulo I"
  seccion: string;                        // ej: "1.1"
  tipo: TipoConcepto;                     // "anatomia" | "neurotransmisor" | "concepto" | "mecanismo"
  definicion: string;
  explicacion: string;
  relevancia_nootropica: string;
  neurotransmisores_asociados: string[];
  regiones_asociadas: string[];
}

// 3. MODELO: Categoría
export interface Categoria {
  slug: string;
  nombre: string;
  color: string;                          // Código Hex (#22d3ee, #8b5cf6, etc.)
  descripcion: string;
  icono: string;                          // Identificador de icono Lucide
}
