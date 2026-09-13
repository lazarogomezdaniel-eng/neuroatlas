import React, { useState, useMemo, useEffect } from 'react';
import { allSubstances, getAllCategories, getAllCognitiveGoals } from '@/data';
import { Substance, EvidenceLevel } from '@/types/substance';
import { FilterSidebar } from '@/components/layout/FilterSidebar';
import { SubstanceCard } from '@/components/cards/SubstanceCard';
import { DataTable } from '@/components/features/DataTable';
import { StackBuilder } from '@/components/features/StackBuilder';
import { SubstanceComparator } from '@/components/features/SubstanceComparator';
import { BrainAtlas } from '@/components/features/BrainAtlas';
import { SubstanceModal } from '@/components/features/SubstanceModal';
import { Footer } from '@/components/layout/Footer';
import { 
  Search, 
  Download, 
  Layers, 
  Compass, 
  Brain, 
  Table, 
  ShieldCheck, 
  Award, 
  BookOpen,
  Zap,
  Moon,
  Heart,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

export const NeuroAtlasDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('catalogo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceLevel[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  // Estado del stack interactivo persistido
  const [stack, setStack] = useState<Substance[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('neuroatlas_user_stack');
      if (saved) {
        setStack(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading stack from localStorage', e);
    }
  }, []);

  const updateStackAndStorage = (newStack: Substance[]) => {
    setStack(newStack);
    try {
      localStorage.setItem('neuroatlas_user_stack', JSON.stringify(newStack));
    } catch (e) {
      console.error('Error saving stack to localStorage', e);
    }
  };

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

  const handleQuickGoal = (goals: string[]) => {
    setSelectedGoals(goals);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedEvidence([]);
    setSelectedGoals([]);
    setSearchQuery('');
  };

  const handleAddToStack = (substance: Substance) => {
    if (!stack.some((s) => s.id === substance.id)) {
      updateStackAndStorage([...stack, substance]);
    }
  };

  const handleRemoveFromStack = (id: string) => {
    updateStackAndStorage(stack.filter((s) => s.id !== id));
  };

  const handleClearStack = () => {
    updateStackAndStorage([]);
  };

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

  const navItems = [
    { id: 'catalogo', label: 'Enciclopedia', icon: Compass },
    { id: 'tabla', label: 'Matriz Farmacológica', icon: Table },
    { id: 'stack-builder', label: `Stack Builder (${stack.length})`, icon: Layers },
    { id: 'comparador', label: 'Comparador', icon: Layers },
    { id: 'atlas', label: 'Atlas Cerebral', icon: Brain },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-surface-lowest overflow-hidden">
      {/* Header Canónico (Fijo superior) */}
      <header className="sticky top-0 z-50 w-full border-b border-surface-bright bg-surface/90 backdrop-blur-md px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('catalogo')}
          >
            <div className="w-8 h-8 rounded-biotech bg-primary/10 border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-lg group-hover:shadow-cyan-glow group-hover:border-primary transition-all">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-text-primary">
                NEURO<span className="text-primary">ATLAS</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Scientific Bio-Index
              </span>
            </div>
          </div>

          {/* Navegación por tabs */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación Principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-biotech text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-surface-container text-primary border border-primary/30 shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-low'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Enlace destacado directo a Protocolos */}
            <a
              href="/stacks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-biotech text-xs font-semibold text-secondary hover:bg-secondary/10 transition-colors border border-secondary/20 ml-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Protocolos Clínicos</span>
            </a>

            {/* Enlace destacado a Calidad */}
            <a
              href="/marcas"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-biotech text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors border border-amber-500/20"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Criterios de Calidad</span>
            </a>
          </nav>
        </div>

        {/* Buscador reactivo & acción de exportar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar compuesto, receptor (NMDA, ACh)..."
              className="w-56 md:w-72 bg-surface-container border border-surface-bright focus:border-primary focus:ring-1 focus:ring-primary rounded-biotech pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() => setActiveTab('stack-builder')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-biotech bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Protocolo</span>
          </button>
        </div>
      </header>

      {/* Frame Principal con Sidebar izquierdo + Área central con scroll */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar izquierdo de filtros */}
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* Frame de Catálogo de Tarjetas */}
          {activeTab === 'catalogo' && (
            <div className="space-y-6">
              
              {/* HERO AMIGABLE: ¿QUÉ QUIERES OPTIMIZAR HOY? */}
              <div className="rounded-biotech border border-surface-bright bg-surface p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-bright pb-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                      ¿Qué quieres optimizar hoy?
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Selecciona un objetivo para filtrar sustancias y ver protocolos clínicos contrastados:
                    </p>
                  </div>

                  {selectedGoals.length > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-biotech border border-surface-bright bg-surface-lowest text-text-muted hover:text-text-primary transition-all self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Limpiar filtros</span>
                    </button>
                  )}
                </div>

                {/* 4 Tarjetas de Objetivo Rápido */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleQuickGoal(['Enfoque', 'Energía Mental'])}
                    className={`p-3.5 rounded-biotech border text-left transition-all flex flex-col justify-between space-y-2 ${
                      selectedGoals.includes('Enfoque')
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-cyan-glow'
                        : 'border-surface-bright bg-surface-low hover:border-cyan-500/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">1:2 Clásico</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Foco & Concentración</div>
                      <div className="text-[11px] text-text-muted">Deep work y productividad</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickGoal(['Sueño', 'Calma'])}
                    className={`p-3.5 rounded-biotech border text-left transition-all flex flex-col justify-between space-y-2 ${
                      selectedGoals.includes('Sueño')
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-indigo-glow'
                        : 'border-surface-bright bg-surface-low hover:border-indigo-500/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] font-mono text-indigo-400 font-bold">Ondas Delta</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Sueño Profundo</div>
                      <div className="text-[11px] text-text-muted">Latencia y reseteo nocturno</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickGoal(['Ansiolítico', 'Calma'])}
                    className={`p-3.5 rounded-biotech border text-left transition-all flex flex-col justify-between space-y-2 ${
                      selectedGoals.includes('Ansiolítico')
                        ? 'border-rose-500 bg-rose-500/10 shadow-rose-glow'
                        : 'border-surface-bright bg-surface-low hover:border-rose-500/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span className="text-[10px] font-mono text-rose-400 font-bold">Cortisol ↓</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Calma & Estrés</div>
                      <div className="text-[11px] text-text-muted">Relajación sin somnolencia</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickGoal(['Memoria', 'Aprendizaje'])}
                    className={`p-3.5 rounded-biotech border text-left transition-all flex flex-col justify-between space-y-2 ${
                      selectedGoals.includes('Memoria')
                        ? 'border-purple-500 bg-purple-500/10 shadow-purple-glow'
                        : 'border-surface-bright bg-surface-low hover:border-purple-500/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] font-mono text-purple-400 font-bold">LTP Sináptica</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Memoria & Estudio</div>
                      <div className="text-[11px] text-text-muted">Retención y plasticidad</div>
                    </div>
                  </button>
                </div>

                {/* Banner de acceso a Protocolos Listos */}
                <div className="p-3 rounded-lg bg-surface-lowest border border-surface-bright flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Sparkles className="w-4 h-4 text-secondary shrink-0" />
                    <span>¿Buscas combinaciones listas con dosis exactas en miligramos y horario?</span>
                  </div>
                  <a
                    href="/stacks"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-biotech bg-secondary/15 border border-secondary/30 text-secondary font-semibold hover:bg-secondary/25 transition-all shrink-0"
                  >
                    <span>Ver Stacks Clínicos (Huberman, Attia, Programador...)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* DISCLAIMER DE RIGOR CIENTÍFICO OBLIGATORIO */}
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Aviso Científico & Ético:</strong> La evidencia en NeuroAtlas está clasificada en Grados A (Meta-análisis), B (Ensayos clínicos controlados), C (Estudios preliminares) y D (In vitro). Los nootrópicos son complementos de optimización y <strong>no reemplazan tratamientos médicos prescritos ni hábitos de descanso y nutrición</strong>.
                  </div>
                </div>
              </div>

              {/* Barra de resultados */}
              <div className="flex justify-between items-center text-xs font-mono text-text-muted border-b border-surface-bright pb-2">
                <span>
                  Mostrando <strong className="text-primary">{filteredSubstances.length}</strong> de {allSubstances.length} compuestos activos
                  {selectedGoals.length > 0 && ` (filtrado por: ${selectedGoals.join(', ')})`}
                </span>
                <span className="text-[11px] text-text-muted hidden sm:inline">
                  Haz clic en cualquier tarjeta para ver farmacocinética y estudios
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
                      onRemoveFromStack={handleRemoveFromStack}
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
              onRemoveFromStack={handleRemoveFromStack}
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
        </main>
      </div>

      {/* Footer Canónico */}
      <Footer />

      {/* Modal Monografía Completa */}
      <SubstanceModal
        substance={activeSubstance}
        onClose={() => setActiveSubstance(null)}
        onAddToStack={handleAddToStack}
        onRemoveFromStack={handleRemoveFromStack}
        isInStack={activeSubstance ? stackIds.includes(activeSubstance.id) : false}
      />
    </div>
  );
};
