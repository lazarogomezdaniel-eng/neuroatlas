'use client';

import React, { useState } from 'react';
import { allSubstances } from '@/data';
import { StackBuilder } from '@/components/features/StackBuilder';
import { Substance } from '@/types/substance';
import { Layers, Plus } from 'lucide-react';

export default function StacksPage() {
  const [stack, setStack] = useState<Substance[]>(allSubstances.slice(0, 2));

  const handleRemoveFromStack = (id: string) => {
    setStack(stack.filter((s) => s.id !== id));
  };

  const handleClearStack = () => {
    setStack([]);
  };

  const handleAddSubstance = (id: string) => {
    const found = allSubstances.find((s) => s.id === id);
    if (found && !stack.some((s) => s.id === found.id)) {
      setStack([...stack, found]);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>HERRAMIENTA BIOQUÍMICA</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Constructor de Stacks & Detección de Sinergias
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Diseña combinaciones nootrópicas personalizadas. El motor analiza solapamientos de neurotransmisores, sinergias colinérgicas y alertas de desensibilización en tiempo real.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleAddSubstance(e.target.value);
                e.target.value = '';
              }
            }}
            defaultValue=""
            className="bg-surface-container border border-surface-bright rounded-biotech px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-primary font-mono"
          >
            <option value="" disabled>
              + Agregar compuesto al stack...
            </option>
            {allSubstances
              .filter((s) => !stack.some((item) => item.id === s.id))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category})
                </option>
              ))}
          </select>
        </div>
      </div>

      <StackBuilder
        stack={stack}
        onRemoveFromStack={handleRemoveFromStack}
        onClearStack={handleClearStack}
      />
    </main>
  );
}
