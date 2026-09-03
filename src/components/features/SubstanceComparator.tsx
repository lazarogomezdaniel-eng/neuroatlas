import React, { useState } from 'react';
import { Substance } from '@/types/substance';
import { EvidenceBadge } from '../ui/EvidenceBadge';
import { ArrowLeftRight, X, Plus } from 'lucide-react';

interface Props {
  allSubstances: Substance[];
  initialSelected?: Substance[];
}

export const SubstanceComparator: React.FC<Props> = ({
  allSubstances,
  initialSelected = [],
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialSelected.length > 0
      ? initialSelected.map((s) => s.id)
      : allSubstances.slice(0, 2).map((s) => s.id)
  );

  const selectedSubstances = selectedIds
    .map((id) => allSubstances.find((s) => s.id === id))
    .filter((s): s is Substance => Boolean(s));

  const addSubstance = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeSubstance = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
              Comparativa Farmacológica Lado a Lado
            </span>
          </div>
          <h2 className="text-lg font-bold text-text-primary">
            Análisis Diferencial de Nootrópicos
          </h2>
        </div>

        {selectedIds.length < 3 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addSubstance(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-surface-container border border-surface-bright rounded-biotech px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                + Añadir sustancia a la comparativa
              </option>
              {allSubstances
                .filter((s) => !selectedIds.includes(s.id))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedSubstances.map((s) => (
          <div
            key={s.id}
            className="rounded-biotech border border-surface-bright bg-surface-low p-5 flex flex-col justify-between space-y-4 shadow-md hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider">
                  {s.category}
                </span>
                {selectedSubstances.length > 1 && (
                  <button
                    onClick={() => removeSubstance(s.id)}
                    className="p-1 rounded hover:bg-surface-bright text-text-muted hover:text-text-primary"
                    title="Eliminar de la comparativa"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <h3 className="text-base font-bold text-text-primary mb-1">{s.name}</h3>
              {s.chemicalFormula && (
                <div className="text-[11px] font-mono text-text-muted mb-3">
                  {s.chemicalFormula}
                </div>
              )}

              <div className="mb-4">
                <EvidenceBadge level={s.evidence} />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-mono text-text-muted uppercase text-[10px] mb-1">
                    Mecanismo de Acción
                  </h4>
                  <p className="text-text-secondary leading-relaxed line-clamp-4">
                    {s.mechanismOfAction}
                  </p>
                </div>

                <div className="p-3 bg-surface-lowest/70 rounded border border-surface-bright/50 space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-text-muted block text-[10px]">RECEPTORES DIANA:</span>
                    <span className="text-secondary">{s.targetReceptors.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px]">DOSIS ESTÁNDAR:</span>
                    <span className="text-text-primary">{s.dosage.standard}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px]">VIDA MEDIA:</span>
                    <span className="text-text-primary">{s.halfLife}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-text-muted uppercase text-[10px] mb-1">
                    Sinergias Clave
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {s.synergies.map((syn) => (
                      <span
                        key={syn}
                        className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-primary border border-primary/20"
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
