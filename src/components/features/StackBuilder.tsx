import React, { useState, useEffect } from 'react';
import { Substance } from '@/types/substance';
import { allSubstances } from '@/data';
import { Trash2, AlertTriangle, CheckCircle2, FileText, Download, Sparkles, Plus } from 'lucide-react';
import { EvidenceBadge } from '../ui/EvidenceBadge';

interface Props {
  stack?: Substance[];
  onRemoveFromStack?: (id: string) => void;
  onClearStack?: () => void;
}

export const StackBuilder: React.FC<Props> = ({
  stack: controlledStack,
  onRemoveFromStack: controlledRemove,
  onClearStack: controlledClear,
}) => {
  const [internalStack, setInternalStack] = useState<Substance[]>([]);
  const [selectedSubstanceToAdd, setSelectedSubstanceToAdd] = useState<string>('');
  const [stackName, setStackName] = useState('Protocolo Sináptico Alpha');

  const isControlled = controlledStack !== undefined && controlledRemove !== undefined;

  // Load from localStorage in uncontrolled mode
  useEffect(() => {
    if (!isControlled) {
      try {
        const saved = localStorage.getItem('neuroatlas_user_stack');
        if (saved) {
          setInternalStack(JSON.parse(saved));
        } else if (allSubstances.length > 0) {
          // Default sample
          setInternalStack(allSubstances.slice(0, 2));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isControlled]);

  const activeStack = isControlled ? controlledStack! : internalStack;

  const handleRemove = (id: string) => {
    if (isControlled && controlledRemove) {
      controlledRemove(id);
    } else {
      const next = internalStack.filter((s) => s.id !== id);
      setInternalStack(next);
      try {
        localStorage.setItem('neuroatlas_user_stack', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleClear = () => {
    if (isControlled && controlledClear) {
      controlledClear();
    } else {
      setInternalStack([]);
      try {
        localStorage.setItem('neuroatlas_user_stack', JSON.stringify([]));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddSubstance = (id: string) => {
    const found = allSubstances.find((s) => s.id === id);
    if (found && !activeStack.some((s) => s.id === found.id)) {
      if (!isControlled) {
        const next = [...internalStack, found];
        setInternalStack(next);
        try {
          localStorage.setItem('neuroatlas_user_stack', JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
      }
    }
    setSelectedSubstanceToAdd('');
  };

  // Evaluar sinergias y contraindicaciones
  const synergiesDetected: { pair: [string, string]; reason: string }[] = [];
  const conflictsDetected: { pair: [string, string]; reason: string }[] = [];

  for (let i = 0; i < activeStack.length; i++) {
    for (let j = i + 1; j < activeStack.length; j++) {
      const s1 = activeStack[i];
      const s2 = activeStack[j];

      // Detectar sinergias directas
      if (
        s1.synergies.some((syn) => s2.name.toLowerCase().includes(syn.toLowerCase())) ||
        s2.synergies.some((syn) => s1.name.toLowerCase().includes(syn.toLowerCase()))
      ) {
        synergiesDetected.push({
          pair: [s1.name, s2.name],
          reason: 'Sinergia bioquímica reportada (optimización de neurotransmisión o colina).',
        });
      }

      // Detectar conflictos en contraindicaciones
      if (
        s1.contraindications.some((c) => s2.name.toLowerCase().includes(c.toLowerCase())) ||
        s2.contraindications.some((c) => s1.name.toLowerCase().includes(c.toLowerCase()))
      ) {
        conflictsDetected.push({
          pair: [s1.name, s2.name],
          reason: 'Precaución por solapamiento o interacción inhibitoria potencial.',
        });
      }
    }
  }

  // Exportar protocolo a JSON/texto
  const exportProtocol = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            name: stackName,
            createdAt: new Date().toISOString(),
            substances: activeStack.map((s) => ({
              name: s.name,
              category: s.category,
              dosage: s.dosage,
            })),
            synergiesDetected,
            conflictsDetected,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${stackName.replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Cabecera del Stack */}
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
              Arquitecto de Protocolos
            </span>
          </div>
          <input
            type="text"
            value={stackName}
            onChange={(e) => setStackName(e.target.value)}
            className="text-lg font-bold text-text-primary bg-transparent border-b border-dashed border-surface-bright focus:border-primary focus:outline-none pb-0.5"
          />
        </div>

        <div className="flex items-center gap-3">
          {activeStack.length > 0 && (
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-biotech text-xs font-mono text-text-muted hover:text-evidence-risk border border-surface-bright hover:border-evidence-risk/40 transition-colors"
            >
              Vaciar Stack
            </button>
          )}
          <button
            onClick={exportProtocol}
            disabled={activeStack.length === 0}
            className="px-4 py-2 rounded-biotech text-xs font-semibold bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar Protocolo JSON
          </button>
        </div>
      </div>

      {/* Selector rápido para añadir compuestos en la página de stacks */}
      {!isControlled && (
        <div className="rounded-biotech border border-surface-bright/70 bg-surface-container/50 p-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Plus className="w-4 h-4 text-primary" />
            <span>Añadir compuesto de la farmacopea al Stack:</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedSubstanceToAdd}
              onChange={(e) => {
                if (e.target.value) handleAddSubstance(e.target.value);
              }}
              className="bg-surface-low border border-surface-bright rounded-biotech px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-primary w-full sm:w-64"
            >
              <option value="">Seleccionar compuesto...</option>
              {allSubstances
                .filter((s) => !activeStack.some((item) => item.id === s.id))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {activeStack.length === 0 ? (
        <div className="rounded-biotech border border-dashed border-surface-bright bg-surface-lowest/50 p-12 text-center">
          <FileText className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-semibold text-text-primary mb-1">Tu Stack está vacío</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto">
            Explora el catálogo o selecciona un compuesto arriba para evaluar sinergias y dosificaciones combinadas en tiempo real.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de compuestos en el stack */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
              Compuestos Activos ({activeStack.length})
            </h3>
            <div className="space-y-3">
              {activeStack.map((s) => (
                <div
                  key={s.id}
                  className="rounded-biotech border border-surface-bright bg-surface-low p-4 flex justify-between items-center hover:border-primary/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary font-semibold">
                        {s.category}
                      </span>
                      <EvidenceBadge level={s.evidence} />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary">{s.name}</h4>
                    <p className="text-xs text-text-muted font-mono">
                      Dosis recomendada: <span className="text-text-primary">{s.dosage.standard}</span> | Momento: {s.dosage.timing}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(s.id)}
                    className="p-2 rounded hover:bg-evidence-risk/20 text-text-muted hover:text-evidence-risk transition-colors"
                    title="Eliminar de Stack"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Análisis Bioquímico */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
              Diagnóstico Farmacológico
            </h3>

            {/* Sinergias */}
            <div className="rounded-biotech border border-evidence-gradeA/30 bg-evidence-gradeA/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-evidence-gradeA">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sinergias Bioquímicas ({synergiesDetected.length})</span>
              </div>
              {synergiesDetected.length === 0 ? (
                <p className="text-xs text-text-muted">
                  No se detectaron sinergias específicas conocidas para este par de compuestos.
                </p>
              ) : (
                <div className="space-y-2 pt-1">
                  {synergiesDetected.map((syn, idx) => (
                    <div key={idx} className="text-xs bg-surface-lowest/70 p-2 rounded border border-evidence-gradeA/20">
                      <div className="font-semibold text-text-primary mb-0.5">
                        {syn.pair[0]} + {syn.pair[1]}
                      </div>
                      <p className="text-[11px] text-text-secondary">{syn.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Alertas */}
            <div className="rounded-biotech border border-evidence-gradeC/30 bg-evidence-gradeC/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-evidence-gradeC">
                <AlertTriangle className="w-4 h-4" />
                <span>Precauciones & Desensibilización</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Recuerda que modular receptores de acetilcolina o AMPA de forma sostenida puede requerir ciclado periódico (ej. 5 días activo / 2 días descanso).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
