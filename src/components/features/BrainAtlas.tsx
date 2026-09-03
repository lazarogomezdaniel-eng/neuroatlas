import React, { useState } from 'react';
import { Substance } from '@/types/substance';
import { Brain, Activity, ArrowRight, Shield } from 'lucide-react';

interface Props {
  allSubstances: Substance[];
  onSelectSubstance: (s: Substance) => void;
}

interface RegionInfo {
  id: string;
  name: string;
  functionDesc: string;
  primaryNeurotransmitters: string[];
  x: number;
  y: number;
}

const brainRegions: RegionInfo[] = [
  {
    id: 'Corteza Prefrontal',
    name: 'Corteza Prefrontal (PFC)',
    functionDesc: 'Funciones ejecutivas, toma de decisiones, memoria de trabajo y atención sostenida.',
    primaryNeurotransmitters: ['Dopamina (D1)', 'Norepinefrina', 'Acetilcolina'],
    x: 28,
    y: 35,
  },
  {
    id: 'Hipocampo',
    name: 'Hipocampo & Giro Dentado',
    functionDesc: 'Consolidación de la memoria a largo plazo, navegación espacial y neurogénesis adulta.',
    primaryNeurotransmitters: ['Glutamato (NMDA/AMPA)', 'Acetilcolina', 'BDNF'],
    x: 52,
    y: 55,
  },
  {
    id: 'Amígdala',
    name: 'Complejo Amigdalino',
    functionDesc: 'Regulación emocional, modulación de respuestas de miedo y reactividad al estrés.',
    primaryNeurotransmitters: ['GABA', 'Serotonina (5-HT2A)', 'CRF'],
    x: 46,
    y: 65,
  },
  {
    id: 'Cuerpo Estriado',
    name: 'Cuerpo Estriado / Ganglios Basales',
    functionDesc: 'Recompensa, formación de hábitos, motivación y control motor fino.',
    primaryNeurotransmitters: ['Dopamina (D2/D3)', 'GABA', 'Acetilcolina'],
    x: 58,
    y: 42,
  },
  {
    id: 'Cuerpo Calloso',
    name: 'Cuerpo Calloso & Conectividad',
    functionDesc: 'Puente axonal interhemisférico facilitador de la integración motora y cognitiva lateral.',
    primaryNeurotransmitters: ['Glutamato', 'Mielina / Oligodendrocitos'],
    x: 48,
    y: 30,
  },
];

export const BrainAtlas: React.FC<Props> = ({ allSubstances, onSelectSubstance }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(brainRegions[0]);

  // Filtrar sustancias que modulan la región activa
  const modulatingSubstances = allSubstances.filter((s) =>
    s.brainRegions.some(
      (r) => r.toLowerCase().includes(selectedRegion.id.toLowerCase()) ||
             selectedRegion.id.toLowerCase().includes(r.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
              Topografía Sináptica
            </span>
          </div>
          <h2 className="text-lg font-bold text-text-primary">
            Atlas Cerebral Interactivo de Neuro-Modulación
          </h2>
        </div>
        <div className="text-xs font-mono text-text-muted">
          Haz clic en cualquier nodo cerebral para inspeccionar fármacos moduladores
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mapa / Representación interactiva SVG */}
        <div className="lg:col-span-7 rounded-biotech border border-surface-bright bg-surface-lowest p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
          {/* Rejilla de coordenadas de fondo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#263248_1px,transparent_1px),linear-gradient(to_bottom,#263248_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

          {/* Silueta cerebral esquemática SVG */}
          <div className="relative w-full max-w-[460px] aspect-[4/3]">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
              {/* Contorno cerebral bio-técnico */}
              <path
                d="M 100 150 C 90 90, 160 30, 240 35 C 310 40, 360 90, 350 160 C 345 200, 300 240, 260 250 C 230 255, 210 230, 190 225 C 160 220, 140 240, 120 230 C 95 220, 105 180, 100 150 Z"
                fill="#131A2E"
                stroke="#22D3EE"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.6"
              />

              {/* Vías de conexión neurales */}
              <line x1="120" y1="110" x2="208" y2="165" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
              <line x1="208" y1="165" x2="190" y2="195" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
              <line x1="208" y1="165" x2="232" y2="126" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />

              {/* Nodos de regiones interactivas */}
              {brainRegions.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                const posX = (region.x / 100) * 400;
                const posY = (region.y / 100) * 300;

                return (
                  <g
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className="cursor-pointer group"
                  >
                    {/* Anillo de pulso si está activo */}
                    {isSelected && (
                      <circle
                        cx={posX}
                        cy={posY}
                        r="18"
                        fill="none"
                        stroke="#22D3EE"
                        strokeWidth="1.5"
                        className="animate-ping origin-center"
                        opacity="0.75"
                      />
                    )}
                    <circle
                      cx={posX}
                      cy={posY}
                      r={isSelected ? "10" : "7"}
                      fill={isSelected ? "#22D3EE" : "#1A2338"}
                      stroke={isSelected ? "#DEE1F7" : "#38BDF8"}
                      strokeWidth="2"
                      className="transition-all duration-200 group-hover:r-9"
                    />
                    <text
                      x={posX}
                      y={posY - 14}
                      textAnchor="middle"
                      className={`text-[10px] font-mono transition-colors ${
                        isSelected ? 'fill-primary font-bold' : 'fill-text-secondary group-hover:fill-text-primary'
                      }`}
                    >
                      {region.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Panel lateral: Información de la región y fármacos moduladores */}
        <div className="lg:col-span-5 rounded-biotech border border-surface-bright bg-surface-low p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b border-surface-bright pb-3">
              <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider block mb-1">
                Estructura Anatómica
              </span>
              <h3 className="text-base font-bold text-text-primary">
                {selectedRegion.name}
              </h3>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {selectedRegion.functionDesc}
            </p>

            <div>
              <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
                Neurotransmisores & Dianas Principales
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedRegion.primaryNeurotransmitters.map((nt) => (
                  <span
                    key={nt}
                    className="px-2.5 py-1 rounded bg-surface-container text-xs font-mono text-secondary border border-secondary/30"
                  >
                    {nt}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
                Nootrópicos Moduladores ({modulatingSubstances.length})
              </h4>
              <div className="space-y-2">
                {modulatingSubstances.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => onSelectSubstance(s)}
                    className="p-3 rounded bg-surface-lowest border border-surface-bright hover:border-primary/40 cursor-pointer flex justify-between items-center group transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-primary block">
                        {s.category}
                      </span>
                      <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                        {s.name}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
