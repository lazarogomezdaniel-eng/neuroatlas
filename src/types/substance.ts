export type EvidenceLevel =
  | 'Grade A (Meta-análisis)'
  | 'Grade B (RCT)'
  | 'Grade C (Observacional)'
  | 'Grade D (In Vitro/Animal)';

export type RiskLevel = 'Seguro' | 'Moderado' | 'Alto Riesgo' | 'Contraindicado';

export interface StudyReference {
  title: string;
  source: string;
  year: number;
  url?: string;
  summary: string;
}

export interface DosageInfo {
  standard: string;
  timing: string;
  notes?: string;
}

export interface Substance {
  id: string;
  name: string;
  chemicalFormula?: string;
  casNumber?: string;
  category: string;
  moduleId: number;
  targetReceptors: string[];
  mechanismOfAction: string;
  evidence: EvidenceLevel;
  riskLevel: RiskLevel;
  halfLife: string;
  dosage: DosageInfo;
  synergies: string[];
  contraindications: string[];
  cognitiveGoals: string[];
  brainRegions: string[];
  studies: StudyReference[];
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  evidenceLevels: EvidenceLevel[];
  cognitiveGoals: string[];
}
