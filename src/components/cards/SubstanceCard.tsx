import React from 'react';
import { Substance } from '@/types/substance';
import { EvidenceBadge } from '../ui/EvidenceBadge';
import { ShieldAlert, Zap, Plus, ArrowUpRight, Activity } from 'lucide-react';

interface Props {
  substance: Substance;
  onSelect?: (substance: Substance) => void;
  onAddToStack?: (substance: Substance) => void;
  isInStack?: boolean;
}

export const SubstanceCard: React.FC<Props> = ({
  substance,
  onSelect,
  onAddToStack,
  isInStack = false,
}) => {
  return (
    <article className="group relative rounded-biotech border border-surface-bright bg-surface-low p-5 hover:border-primary/50 hover:shadow-cyan-glow transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Encabezado de la tarjeta */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider block mb-1">
              {substance.category}
            </span>
            <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
              {substance.name}
            </h3>
            {substance.chemicalFormula && (
              <span className="text-[11px] font-mono text-text-muted block mt-0.5">
                Formula: {substance.chemicalFormula}
              </span>
            )}
          </div>
          <EvidenceBadge level={substance.evidence} />
        </div>

        {/* Resumen del mecanismo */}
        <p className="text-xs text-text-secondary line-clamp-3 mb-4 leading-relaxed">
          {substance.mechanismOfAction}
        </p>

        {/* Receptores diana */}
        <div className="flex flex-wrap gap-1 mb-4">
          {substance.targetReceptors.map((receptor) => (
            <span
              key={receptor}
              className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-secondary border border-secondary/20"
            >
              {receptor}
            </span>
          ))}
        </div>

        {/* Telemetría farmacológica */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-2.5 px-3 rounded bg-surface-container/60 border border-surface-bright/40 mb-4 text-text-muted">
          <div>
            <span className="text-text-muted block text-[10px]">DOSIS ESTÁNDAR</span>
            <span className="text-text-primary font-medium">{substance.dosage.standard}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[10px]">VIDA MEDIA</span>
            <span className="text-text-primary font-medium">{substance.halfLife}</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-bright/40">
        <button
          onClick={() => onSelect?.(substance)}
          className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-primary transition-colors focus:outline-none"
        >
          <span>Monografía</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onAddToStack?.(substance)}
          disabled={isInStack}
          className={`px-3 py-1.5 rounded-biotech text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
            isInStack
              ? 'bg-primary/20 text-primary border border-primary/40 cursor-default'
              : 'bg-surface-container hover:bg-primary hover:text-surface-lowest text-text-primary border border-surface-bright hover:border-primary'
          }`}
        >
          {isInStack ? (
            <>
              <Activity className="w-3 h-3 text-primary" />
              <span>En Stack</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              <span>Añadir a Stack</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
