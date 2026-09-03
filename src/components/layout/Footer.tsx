import React from 'react';
import { ShieldCheck, ExternalLink, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface-bright bg-surface px-6 py-4 text-xs font-mono text-text-muted flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>© 2026 NeuroAtlas Scientific Bio-Index — Todos los derechos reservados</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-evidence-gradeA" />
          <span>Validación cruzada contra PubMed, Cochrane & ClinicalTrials.gov</span>
        </span>
        <span className="text-surface-bright">|</span>
        <span className="text-[11px] text-text-muted">
          v1.0.0 (Scientific Biotech Minimalism)
        </span>
      </div>
    </footer>
  );
};
