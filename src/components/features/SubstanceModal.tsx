import React from 'react';
import { Substance } from '@/types/substance';
import { EvidenceBadge } from '../ui/EvidenceBadge';
import { SubstanceSchema } from '../seo/SubstanceSchema';
import { X, ExternalLink, ShieldCheck, AlertCircle, BookOpen, Layers, Activity } from 'lucide-react';

interface Props {
  substance: Substance | null;
  onClose: () => void;
  onAddToStack: (s: Substance) => void;
  isInStack: boolean;
}

export const SubstanceModal: React.FC<Props> = ({
  substance,
  onClose,
  onAddToStack,
  isInStack,
}) => {
  if (!substance) return null;

  return (
    <>
      <SubstanceSchema substance={substance} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-lowest/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-biotech border border-surface-bright bg-surface p-6 shadow-2xl space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera */}
          <div className="flex justify-between items-start border-b border-surface-bright pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                  {substance.category}
                </span>
                <EvidenceBadge level={substance.evidence} />
              </div>
              <h2 className="text-xl font-bold text-text-primary">{substance.name}</h2>
              {substance.chemicalFormula && (
                <div className="flex items-center gap-3 mt-1 text-xs font-mono text-text-muted">
                  <span>Fórmula: {substance.chemicalFormula}</span>
                  {substance.casNumber && <span>CAS: {substance.casNumber}</span>}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-surface-bright text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mecanismo de acción */}
          <div>
            <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>Mecanismo Farmacológico & Bioquímica</span>
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed bg-surface-low p-4 rounded border border-surface-bright/50">
              {substance.mechanismOfAction}
            </p>
          </div>

          {/* Receptores y regiones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-surface-low border border-surface-bright/50">
              <h4 className="text-xs font-mono text-text-muted uppercase mb-2">
                Dianas Moleculares / Receptores
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {substance.targetReceptors.map((r) => (
                  <span
                    key={r}
                    className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono text-secondary border border-secondary/30"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded bg-surface-low border border-surface-bright/50">
              <h4 className="text-xs font-mono text-text-muted uppercase mb-2">
                Regiones Cerebrales Moduladas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {substance.brainRegions.map((region) => (
                  <span
                    key={region}
                    className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono text-primary border border-primary/30"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Posología & Telemetría */}
          <div className="p-4 rounded bg-surface-lowest border border-surface-bright space-y-2">
            <h4 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
              Protocolo de Dosificación & Biodisponibilidad
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-text-muted block text-[10px]">DOSIS ESTÁNDAR:</span>
                <span className="text-text-primary">{substance.dosage.standard}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[10px]">MOMENTO DE TOMA:</span>
                <span className="text-text-primary">{substance.dosage.timing}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[10px]">VIDA MEDIA:</span>
                <span className="text-text-primary">{substance.halfLife}</span>
              </div>
              {substance.dosage.notes && (
                <div className="sm:col-span-2 text-[11px] text-text-secondary italic">
                  Nota clínica: {substance.dosage.notes}
                </div>
              )}
            </div>
          </div>

          {/* Ensayos clínicos */}
          <div>
            <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-evidence-gradeA" />
              <span>Evidencia Científica & Ensayos Clínicos</span>
            </h3>
            <div className="space-y-2">
              {substance.studies.map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded bg-surface-low border border-surface-bright text-xs space-y-1"
                >
                  <div className="font-bold text-text-primary flex justify-between">
                    <span>{st.title}</span>
                    <span className="font-mono text-text-muted">{st.year}</span>
                  </div>
                  <div className="text-[11px] font-mono text-primary">{st.source}</div>
                  <p className="text-text-secondary leading-relaxed pt-1">{st.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones del pie */}
          <div className="flex justify-between items-center pt-4 border-t border-surface-bright">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-biotech text-xs font-mono text-text-secondary hover:text-text-primary border border-surface-bright hover:bg-surface-low transition-all"
            >
              Cerrar Monografía
            </button>
            <button
              onClick={() => onAddToStack(substance)}
              disabled={isInStack}
              className={`px-4 py-2 rounded-biotech text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isInStack
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isInStack ? 'Compuesto en Stack' : '+ Añadir a Stack Builder'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
