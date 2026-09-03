'use client';

import React, { useState } from 'react';
import { allSubstances } from '@/data';
import { BrainAtlas } from '@/components/features/BrainAtlas';
import { SubstanceModal } from '@/components/features/SubstanceModal';
import { Substance } from '@/types/substance';
import { Activity } from 'lucide-react';

export default function AtlasCerebralPage() {
  const [selectedSubstance, setSelectedSubstance] = useState<Substance | null>(null);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>TOPOGRAFÍA ANATÓMICA</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Atlas Cerebral Interactivo de Neuro-Modulación
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Explora qué estructuras del sistema nervioso central son moduladas selectivamente por cada compuesto y sus vías de señalización asociadas.
        </p>
      </div>

      <BrainAtlas
        allSubstances={allSubstances}
        onSelectSubstance={(s) => setSelectedSubstance(s)}
      />

      <SubstanceModal
        substance={selectedSubstance}
        onClose={() => setSelectedSubstance(null)}
        onAddToStack={() => {}}
        isInStack={false}
      />
    </main>
  );
}
