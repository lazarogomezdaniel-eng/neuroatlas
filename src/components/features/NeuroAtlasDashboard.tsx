import React, { useState, useMemo } from 'react';
import { allSubstances, getAllCategories, getAllCognitiveGoals } from '@/data';
import { Substance, EvidenceLevel } from '@/types/substance';
import { Header } from '@/components/layout/Header';
import { FilterSidebar } from '@/components/layout/FilterSidebar';
import { SubstanceCard } from '@/components/cards/SubstanceCard';
import { DataTable } from '@/components/features/DataTable';
import { StackBuilder } from '@/components/features/StackBuilder';
import { SubstanceComparator } from '@/components/features/SubstanceComparator';
import { BrainAtlas } from '@/components/features/BrainAtlas';
import { SubstanceModal } from '@/components/features/SubstanceModal';
import { Cpu, Compass, Table, Layers, Brain, Search } from 'lucide-react';

export const NeuroAtlasDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('catalogo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceLevel[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  // Estado del stack interactivo
  const [stack, setStack] = useState<Substance[]>([]);
  
  // Monografía activa en modal
  const [activeSubstance, setActiveSubstance] = useState<Substance | null>(null);

  const categories = useMemo(() => getAllCategories(), []);
  const cognitiveGoals = useMemo(() => getAllCognitiveGoals(), []);
  const evidenceLevels: EvidenceLevel[] = [
    'Grade A (Meta-análisis)',
    'Grade B (RCT)',
    'Grade C (Observacional)',
    'Grade D (In Vitro/Animal)',
  ];

  // Alternar filtros
  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleEvidence = (grade: EvidenceLevel) => {
    setSelectedEvidence((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleToggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedEvidence([]);
    setSelectedGoals([]);
    setSearchQuery('');
  };

  // Gestión de stack
  const handleAddToStack = (substance: Substance) => {
    if (!stack.some((s) => s.id === substance.id)) {
      setStack([...stack, substance]);
    }
  };

  const handleRemoveFromStack = (id: string) => {
    setStack(stack.filter((s) => s.id !== id));
  };

  const handleClearStack = () => {
    setStack([]);
  };

  // Filtrado reactivo multivariable
  const filteredSubstances = useMemo(() => {
    return allSubstances.filter((substance) => {
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = substance.name.toLowerCase().includes(query);
        const matchesFormula = substance.chemicalFormula?.toLowerCase().includes(query);
        const matchesMechanism = substance.mechanismOfAction.toLowerCase().includes(query);
        const matchesReceptors = substance.targetReceptors.some((r) =>
          r.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesFormula && !matchesMechanism && !matchesReceptors) {
          return false;
        }
      }

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(substance.category)
      ) {
        return false;
      }

      if (
        selectedEvidence.length > 0 &&
        !selectedEvidence.includes(substance.evidence)
      ) {
        return false;
      }

      if (selectedGoals.length > 0) {
        const hasMatchingGoal = substance.cognitiveGoals.some((g) =>
          selectedGoals.includes(g)
        );
        if (!hasMatchingGoal) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedEvidence, selectedGoals]);

  const stackIds = stack.map((s) => s.id);

  return (
    <div className="flex-1 flex flex-col bg-surface-lowest">
      {/* Header canónico del dashboard */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        stackCount={stack.length}
      />

      {/* Frame Principal dividido con Sidebar Izquierdo */}
      <div className="flex-1 flex overflow-hidden min-h-[calc(100vh-60px)]">
        {/* Sidebar de filtros de la izquierda */}
        {(activeTab === 'catalogo' || activeTab === 'tabla') && (
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            evidenceLevels={evidenceLevels}
            selectedEvidence={selectedEvidence}
            onToggleEvidence={handleToggleEvidence}
            cognitiveGoals={cognitiveGoals}
            selectedGoals={selectedGoals}
            onToggleGoal={handleToggleGoal}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Panel de Contenido / Frames */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Banner Hero Clínico */}
          <div className="relative rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>INDEXACIÓN CIENTÍFICA ACTIVA — MÓDULO 1 & 2</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
                Enciclopedia Farmacológica de Bio-Optimización & Nootrópicos
              </h1>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Compendio biomédico indexado por receptores sinápticos, niveles de evidencia clínica y análisis de sinergias moleculares sin ruido comercial.
              </p>
            </div>
          </div>

          {/* Frame de Catálogo de Tarjetas */}
          {activeTab === 'catalogo' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-text-muted">
                <span>
                  Mostrando <strong className="text-primary">{filteredSubstances.length}</strong> de {allSubstances.length} compuestos activos
                </span>
              </div>

              {filteredSubstances.length === 0 ? (
                <div className="rounded-biotech border border-dashed border-surface-bright p-12 text-center text-text-muted text-xs">
                  No se encontraron sustancias que coincidan con los filtros seleccionados.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredSubstances.map((substance) => (
                    <SubstanceCard
                      key={substance.id}
                      substance={substance}
                      onSelect={(s) => setActiveSubstance(s)}
                      onAddToStack={handleAddToStack}
                      isInStack={stackIds.includes(substance.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Frame de Matriz Farmacológica */}
          {activeTab === 'tabla' && (
            <DataTable
              substances={filteredSubstances}
              onSelectSubstance={(s) => setActiveSubstance(s)}
              onAddToStack={handleAddToStack}
              stackIds={stackIds}
            />
          )}

          {/* Frame de Constructor de Stacks */}
          {activeTab === 'stack-builder' && (
            <StackBuilder
              stack={stack}
              onRemoveFromStack={handleRemoveFromStack}
              onClearStack={handleClearStack}
            />
          )}

          {/* Frame de Comparador */}
          {activeTab === 'comparador' && (
            <SubstanceComparator
              allSubstances={allSubstances}
              initialSelected={stack.length >= 2 ? stack.slice(0, 3) : undefined}
            />
          )}

          {/* Frame de Atlas Cerebral Interactivo */}
          {activeTab === 'atlas' && (
            <BrainAtlas
              allSubstances={allSubstances}
              onSelectSubstance={(s) => setActiveSubstance(s)}
            />
          )}
        </div>
      </div>

      {/* Modal Monografía Completa */}
      <SubstanceModal
        substance={activeSubstance}
        onClose={() => setActiveSubstance(null)}
        onAddToStack={handleAddToStack}
        isInStack={activeSubstance ? stackIds.includes(activeSubstance.id) : false}
      />
    </div>
  );
};
