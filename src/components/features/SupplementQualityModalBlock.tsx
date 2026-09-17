import React, { useState } from 'react';
import type { ProductQualityInfo } from '@/data/supplement-quality';
import { 
  Award, 
  Sparkles, 
  Atom, 
  Pill, 
  Ban, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Beaker 
} from 'lucide-react';

interface Props {
  qualityData: ProductQualityInfo;
  productName: string;
}

export const SupplementQualityModalBlock: React.FC<Props> = ({ qualityData, productName }) => {
  const [isOpen, setIsOpen] = useState(true);

  const getVerdictBadge = (veredicto: string) => {
    const v = veredicto.toLowerCase();
    if (v.includes('recomendad') || v.includes('segura') || v.includes('ideal')) {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
    if (v.includes('evitar') || v.includes('peligros') || v.includes('contraindicad')) {
      return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
    if (v.includes('aceptable')) {
      return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    }
    if (v.includes('prescripcion') || v.includes('medico')) {
      return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
    }
    return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
  };

  const formatVerdictText = (veredicto: string) => {
    return veredicto.replace(/_/g, ' ').toUpperCase();
  };

  const presentaciones = qualityData.presentaciones || qualityData.formas_presentacion || [];

  return (
    <div className="rounded-biotech border border-surface-bright bg-surface-low overflow-hidden transition-all duration-300">
      {/* Header colapsable */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left bg-surface hover:bg-surface-bright/50 transition-colors border-b border-surface-bright"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-secondary/15 text-secondary border border-secondary/30">
            <Beaker className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                Auditoría de Calidad & Patentes ({productName})
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-secondary/20 text-secondary border border-secondary/30">
                Grado Clínico
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-0.5">
              Patentes registradas, biodisponibilidad molecular, formas químicas y sinergias
            </p>
          </div>
        </div>
        <div className="text-text-muted">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-5 text-xs">
          {/* SELLOS DE CALIDAD Y PATENTES */}
          {qualityData.sellos_calidad && qualityData.sellos_calidad.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono font-bold text-text-muted uppercase text-[11px]">
                <Award className="w-3.5 h-3.5 text-secondary" />
                <span>Patentes Registradas & Certificaciones de Pureza</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {qualityData.sellos_calidad.map((sello, i) => (
                  <div key={i} className="p-3 rounded bg-surface border border-surface-bright space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-text-primary text-xs">{sello.sello}</span>
                      <span className="text-[10px] font-mono text-secondary px-1.5 py-0.5 rounded bg-surface-container border border-surface-bright">
                        {sello.fabricante}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-tight">
                      <strong className="text-text-primary">Verifica:</strong> {sello.que_verifica}
                    </p>
                    <p className="text-[10px] text-text-muted italic border-t border-surface-bright/50 pt-1">
                      {sello.por_que_importa}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORMAS QUÍMICAS Y BIODISPONIBILIDAD */}
          {qualityData.formas_quimicas && qualityData.formas_quimicas.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono font-bold text-text-muted uppercase text-[11px]">
                <Atom className="w-3.5 h-3.5 text-primary" />
                <span>Formas Moleculares & Biodisponibilidad</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {qualityData.formas_quimicas.map((f, i) => (
                  <div key={i} className="p-3 rounded bg-surface border border-surface-bright space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-text-primary text-xs">{f.forma}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${getVerdictBadge(f.veredicto)}`}>
                          {formatVerdictText(f.veredicto)}
                        </span>
                      </div>
                      {f.formula && (
                        <div className="text-[10px] font-mono text-secondary mb-1">
                          Fórmula: {f.formula}
                        </div>
                      )}
                      {(f.biodisponibilidad || f.biodisponibilidad_relativa || f.absorcion) && (
                        <p className="text-[11px] text-text-secondary">
                          <strong className="text-text-primary">Absorción:</strong> {f.biodisponibilidad || f.biodisponibilidad_relativa || f.absorcion}
                        </p>
                      )}
                      {f.caracteristicas && (
                        <p className="text-[11px] text-text-secondary mt-1">
                          {f.caracteristicas}
                        </p>
                      )}
                    </div>
                    {f.nota && (
                      <p className="text-[10px] text-text-muted italic border-t border-surface-bright/50 pt-1 mt-1">
                        {f.nota}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORMAS A EVITAR */}
          {qualityData.variantes_a_evitar && qualityData.variantes_a_evitar.length > 0 && (
            <div className="p-3 rounded bg-rose-500/10 border border-rose-500/25 space-y-2">
              <div className="flex items-center gap-2 font-mono font-bold text-rose-400 uppercase text-[11px]">
                <Ban className="w-3.5 h-3.5" />
                <span>Formas Clínicamente Desaconsejadas</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {qualityData.variantes_a_evitar.map((ev, i) => (
                  <div key={i} className="p-2.5 rounded bg-surface/80 border border-rose-500/20 text-xs">
                    <span className="font-bold text-rose-300 block">{ev.forma}</span>
                    <span className="text-[11px] text-text-secondary block mt-0.5">{ev.motivo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SINERGIAS FARMACOLÓGICAS */}
          {qualityData.sinergias && qualityData.sinergias.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono font-bold text-text-muted uppercase text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>Sinergias Farmacológicas</span>
              </div>
              <div className="space-y-1.5">
                {qualityData.sinergias.map((syn, i) => (
                  <div key={i} className="p-2.5 rounded bg-surface border border-surface-bright flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary">{syn.con}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-container text-secondary border border-surface-bright">
                          Ratio: {syn.ratio}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary">{syn.mecanismo}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Evidencia {syn.evidencia}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRESENTACIONES COMERCIALES */}
          {presentaciones.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono font-bold text-text-muted uppercase text-[11px]">
                <Pill className="w-3.5 h-3.5 text-primary" />
                <span>Formatos Comerciales</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presentaciones.map((p, i) => (
                  <div key={i} className="p-2.5 rounded bg-surface border border-surface-bright space-y-1">
                    <span className="font-bold text-text-primary text-xs block">{p.presentacion}</span>
                    {p.ventaja && <div className="text-[11px] text-emerald-400/90">✓ {p.ventaja}</div>}
                    {p.desventaja && <div className="text-[11px] text-text-muted">✗ {p.desventaja}</div>}
                    {p.para_quien && (
                      <div className="text-[10px] font-mono text-secondary pt-0.5">
                        Ideal: {p.para_quien}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PARÁMETROS DE LABORATORIO / TOTOX / OXIDACIÓN */}
          {qualityData.metricas_calidad && qualityData.metricas_calidad.length > 0 && (
            <div className="p-3 rounded bg-surface border border-surface-bright space-y-2">
              <div className="flex items-center gap-2 font-mono font-bold text-text-muted uppercase text-[11px]">
                <Activity className="w-3.5 h-3.5 text-secondary" />
                <span>Estándares Analíticos de Pureza</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {qualityData.metricas_calidad.map((param, i) => (
                  <div key={i} className="p-2 rounded bg-surface-lowest border border-surface-bright text-[11px]">
                    <div className="font-bold text-text-primary">{param.parametro}</div>
                    <div className="font-mono text-secondary text-[10px]">{param.limite_aceptable}</div>
                    <p className="text-[10px] text-text-muted mt-0.5">{param.que_indica}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
