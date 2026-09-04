import React, { useState } from 'react';
import { Substance } from '@/types/substance';
import { EvidenceBadge } from '../ui/EvidenceBadge';
import { ArrowUpDown, ExternalLink, Plus, Check } from 'lucide-react';

interface Props {
  substances: Substance[];
  onSelectSubstance: (s: Substance) => void;
  onAddToStack: (s: Substance) => void;
  onRemoveFromStack?: (id: string) => void;
  stackIds: string[];
}

export const DataTable: React.FC<Props> = ({
  substances,
  onSelectSubstance,
  onAddToStack,
  onRemoveFromStack,
  stackIds,
}) => {
  const [sortField, setSortField] = useState<keyof Substance>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: keyof Substance) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedSubstances = [...substances].sort((a, b) => {
    const valA = a[sortField] ?? '';
    const valB = b[sortField] ?? '';
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-biotech border border-surface-bright bg-surface-low overflow-hidden shadow-lg">
      <div className="p-4 border-b border-surface-bright flex justify-between items-center bg-surface-container/50">
        <div>
          <h2 className="text-sm font-bold text-text-primary tracking-wide">
            Matriz Farmacológica Comparativa
          </h2>
          <p className="text-xs text-text-muted">
            Telemetría de compuestos, semivida biológica y objetivos moleculares
          </p>
        </div>
        <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
          {substances.length} registros cargados
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-lowest text-text-muted font-mono uppercase tracking-wider border-b border-surface-bright text-[11px]">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-4 cursor-pointer hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Compuesto</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('category')}
                className="py-3 px-4 cursor-pointer hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Categoría</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Dianas / Receptores</th>
              <th
                onClick={() => handleSort('evidence')}
                className="py-3 px-4 cursor-pointer hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Evidencia</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Dosis Estándar</th>
              <th className="py-3 px-4">Vida Media</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-bright/50">
            {sortedSubstances.map((s) => {
              const inStack = stackIds.includes(s.id);
              return (
                <tr
                  key={s.id}
                  className="hover:bg-surface-container/60 transition-colors group cursor-pointer"
                  onClick={() => onSelectSubstance(s)}
                >
                  <td className="py-3 px-4 font-semibold text-text-primary group-hover:text-primary">
                    <div>{s.name}</div>
                    {s.chemicalFormula && (
                      <span className="text-[10px] font-mono text-text-muted block">
                        {s.chemicalFormula}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-text-secondary">{s.category}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {s.targetReceptors.map((r) => (
                        <span
                          key={r}
                          className="px-1.5 py-0.5 rounded bg-surface-lowest text-[10px] font-mono text-secondary border border-secondary/20"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <EvidenceBadge level={s.evidence} />
                  </td>
                  <td className="py-3 px-4 font-mono text-text-primary">{s.dosage.standard}</td>
                  <td className="py-3 px-4 font-mono text-text-muted">{s.halfLife}</td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        if (inStack) {
                          onRemoveFromStack?.(s.id);
                        } else {
                          onAddToStack(s);
                        }
                      }}
                      title={inStack ? 'Clic para quitar del Stack' : 'Añadir a Stack'}
                      className={`group/btn px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                        inStack
                          ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-evidence-risk/20 hover:text-evidence-risk hover:border-evidence-risk/40'
                          : 'bg-surface-container hover:bg-primary hover:text-surface-lowest text-text-secondary border border-surface-bright'
                      }`}
                    >
                      {inStack ? (
                        <>
                          <span className="group-hover/btn:hidden">✓ En Stack</span>
                          <span className="hidden group-hover/btn:inline">✕ Quitar</span>
                        </>
                      ) : (
                        '+ Stack'
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
