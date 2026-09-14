import React from 'react';
import { Substance } from '@/types/substance';
import { EvidenceBadge } from '../ui/EvidenceBadge';
import { ShieldAlert, Zap, Plus, ArrowUpRight, Check, Trash2, Atom, Clock, Pill } from 'lucide-react';

interface Props {
  substance: Substance;
  onSelect?: (substance: Substance) => void;
  onAddToStack?: (substance: Substance) => void;
  onRemoveFromStack?: (id: string) => void;
  isInStack?: boolean;
}

export const SubstanceCard: React.FC<Props> = ({
  substance,
  onSelect,
  onAddToStack,
  onRemoveFromStack,
  isInStack = false,
}) => {
  const handleStackToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInStack) {
      onRemoveFromStack?.(substance.id);
    } else {
      onAddToStack?.(substance);
    }
  };

  return (
    <article 
      onClick={() => onSelect?.(substance)}
      className="group relative rounded-2xl border border-white/[0.08] bg-surface/85 backdrop-blur-md p-5 hover:border-primary/50 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(34,211,238,0.2)] transition-all duration-200 ease-out hover:-translate-y-1 flex flex-col justify-between cursor-pointer specular-top"
    >
      <div>
        {/* Encabezado de la tarjeta */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mb-1">
              {substance.category}
            </span>
            <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug tracking-tight truncate">
              {substance.name}
            </h3>
            {substance.chemicalFormula && (
              <span className="text-[10px] font-mono text-text-muted flex items-center gap-1 mt-0.5">
                <Atom className="w-3 h-3 text-primary/60 shrink-0" />
                <span className="truncate">{substance.chemicalFormula}</span>
              </span>
            )}
          </div>
          <div className="shrink-0 pt-0.5">
            <EvidenceBadge level={substance.evidence} />
          </div>
        </div>

        {/* Resumen del mecanismo */}
        <p className="text-xs text-text-secondary line-clamp-3 mb-4 leading-relaxed font-normal">
          {substance.mechanismOfAction}
        </p>

        {/* Receptores diana */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {substance.targetReceptors.map((receptor) => (
            <span
              key={receptor}
              className="px-2 py-0.5 rounded-md bg-secondary/10 text-[10px] font-mono font-medium text-secondary border border-secondary/20"
            >
              {receptor}
            </span>
          ))}
        </div>

        {/* Telemetría farmacológica en panel concéntrico */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-2.5 px-3 rounded-xl bg-surface-lowest/70 border border-white/[0.06] mb-4">
          <div className="flex flex-col">
            <span className="text-text-muted text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Pill className="w-2.5 h-2.5 text-primary/70" />
              Dosis Estándar
            </span>
            <span className="text-text-primary font-semibold truncate mt-0.5">
              {substance.dosage.standard}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-text-muted text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-secondary/70" />
              Vida Media
            </span>
            <span className="text-text-primary font-semibold truncate mt-0.5">
              {substance.halfLife}
            </span>
          </div>
        </div>
      </div>

      {/* Acciones inferiores */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(substance);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors focus:outline-none group/link active:scale-[0.97]"
        >
          <span>Monografía clínica</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </button>

        <button
          type="button"
          onClick={handleStackToggle}
          title={isInStack ? 'Clic para quitar del Stack' : 'Añadir a mi Protocolo'}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-[0.96] shadow-sm ${
            isInStack
              ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
              : 'bg-surface-container hover:bg-primary hover:text-surface-lowest text-text-primary border border-white/10 hover:border-primary hover:shadow-cyan-glow'
          }`}
        >
          {isInStack ? (
            <>
              <Check className="w-3.5 h-3.5 text-primary" />
              <span>En Stack</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
