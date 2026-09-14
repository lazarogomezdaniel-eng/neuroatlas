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
  ExternalLink,
  Activity,
  CheckCircle2,
  Lock,
  Scale
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
    <div className="h-screen w-screen flex flex-col bg-surface-lowest bg-grid-biotech overflow-hidden text-text-primary">
      {/* Header Canónico de Alta Definición */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-surface/85 backdrop-blur-xl px-5 sm:px-8 py-2.5 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('catalogo')}
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-xl group-hover:shadow-cyan-glow group-hover:border-primary transition-all duration-200">
              <span className="relative z-10">Ψ</span>
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-sm group-hover:bg-primary/25 transition-all"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-primary transition-colors">
                  NEURO<span className="text-primary">ATLAS</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-bold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  v2.4
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-wider text-text-muted uppercase">
                Scientific Bio-Index & Clinical Stacks
              </span>
            </div>
          </div>

          {/* Navegación por tabs (Segmented Control) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-surface-lowest/80 border border-white/[0.06]" aria-label="Navegación Principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.97] ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/40 shadow-cyan-glow font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Separador vertical */}
            <div className="w-px h-4 bg-white/10 mx-1"></div>

            {/* Enlace destacado directo a Protocolos */}
            <a
              href="/stacks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-secondary hover:bg-secondary/15 transition-all duration-150 border border-secondary/30 active:scale-[0.97] shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Protocolos Clínicos</span>
            </a>

            {/* Enlace destacado a Calidad */}
            <a
              href="/marcas"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:bg-amber-500/15 transition-all duration-150 border border-amber-500/30 active:scale-[0.97]"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Criterios de Calidad</span>
            </a>

            {/* Enlace al Catálogo de los 12 Módulos */}
            <a
              href="/modulos"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-400 hover:bg-teal-500/15 transition-all duration-150 border border-teal-500/30 active:scale-[0.97]"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>12 Módulos</span>
            </a>
          </nav>
        </div>

        {/* Buscador reactivo & acción de exportar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar compuesto, receptor (NMDA, ACh)..."
              className="w-48 sm:w-64 md:w-80 bg-surface-lowest/90 border border-white/[0.08] focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-all duration-150 shadow-inner"
            />
          </div>

          <button
            onClick={() => setActiveTab('stack-builder')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-primary to-cyan-400 text-surface-lowest hover:opacity-95 shadow-cyan-glow transition-all duration-150 active:scale-[0.96]"
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
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* TELEMETRÍA BIOTÉCNICA / STATUS CHIPS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Compuestos</div>
                    <div className="text-xs font-bold text-text-primary truncate">250+ Fichas Activas</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Currículum</div>
                    <div className="text-xs font-bold text-text-primary truncate">12 Módulos (I a XII)</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Evidencia</div>
                    <div className="text-xs font-bold text-text-primary truncate">Grados A, B, C y D</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Compromiso</div>
                    <div className="text-xs font-bold text-text-primary truncate">0% Sesgo Comercial</div>
                  </div>
                </div>
              </div>

              {/* HERO AMIGABLE: ¿QUÉ QUIERES OPTIMIZAR HOY? */}
              <div className="rounded-2xl border border-white/[0.08] bg-surface/85 backdrop-blur-xl p-5 sm:p-7 space-y-5 specular-top shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3" />
                      Exploración Rápida por Objetivo
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      ¿Qué quieres optimizar hoy?
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl">
                      Filtra de inmediato los compuestos con respaldo científico sólido y explora sus combinaciones sinérgicas:
                    </p>
                  </div>

                  {selectedGoals.length > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-white/10 bg-surface-lowest text-text-muted hover:text-text-primary hover:border-primary/40 transition-all duration-150 active:scale-[0.96] self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpiar filtros</span>
                    </button>
                  )}
                </div>

                {/* 4 Tarjetas de Objetivo Rápido con diseño de alta gama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Tarjeta 1: Foco */}
                  <button
                    onClick={() => handleQuickGoal(['Enfoque', 'Energía Mental'])}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer specular-top group active:scale-[0.97] ${
                      selectedGoals.includes('Enfoque')
                        ? 'border-cyan-400 bg-cyan-500/15 shadow-cyan-glow ring-1 ring-cyan-400'
                        : 'border-white/[0.06] bg-surface-low/80 hover:border-cyan-400/50 hover:bg-surface-container hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        1:2 Sinérgico
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Foco & Concentración
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Deep work, velocidad mental y cafeína + L-teanina
                      </div>
                    </div>
                  </button>

                  {/* Tarjeta 2: Sueño */}
                  <button
                    onClick={() => handleQuickGoal(['Sueño', 'Calma'])}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer specular-top group active:scale-[0.97] ${
                      selectedGoals.includes('Sueño')
                        ? 'border-indigo-400 bg-indigo-500/15 shadow-indigo-glow ring-1 ring-indigo-400'
                        : 'border-white/[0.06] bg-surface-low/80 hover:border-indigo-400/50 hover:bg-surface-container hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        <Moon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        Ondas Delta
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        Sueño Profundo
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Magnesio bisglicinato, apigenina y descanso reparador
                      </div>
                    </div>
                  </button>

                  {/* Tarjeta 3: Calma / Estrés */}
                  <button
                    onClick={() => handleQuickGoal(['Ansiolítico', 'Calma'])}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer specular-top group active:scale-[0.97] ${
                      selectedGoals.includes('Ansiolítico')
                        ? 'border-rose-400 bg-rose-500/15 shadow-rose-glow ring-1 ring-rose-400'
                        : 'border-white/[0.06] bg-surface-low/80 hover:border-rose-400/50 hover:bg-surface-container hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                        <Heart className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-rose-400 font-bold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                        Cortisol ↓
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                        Calma & Antiestrés
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Ashwagandha KSM-66, modulación GABA sin sedación
                      </div>
                    </div>
                  </button>

                  {/* Tarjeta 4: Memoria */}
                  <button
                    onClick={() => handleQuickGoal(['Memoria', 'Aprendizaje'])}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer specular-top group active:scale-[0.97] ${
                      selectedGoals.includes('Memoria')
                        ? 'border-purple-400 bg-purple-500/15 shadow-purple-glow ring-1 ring-purple-400'
                        : 'border-white/[0.06] bg-surface-low/80 hover:border-purple-400/50 hover:bg-surface-container hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        <Brain className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        LTP Sináptica
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        Memoria & Estudio
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Bacopa, citicolina y plasticidad sináptica
                      </div>
                    </div>
                  </button>
                </div>

                {/* Banner de Acceso a Protocolos Clínicos Listos */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/15 via-secondary/5 to-transparent border border-secondary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">¿Buscas combinaciones listas con dosis exactas en miligramos y horarios?</div>
                      <div className="text-text-muted text-[11px]">8 protocolos contrastados: Huberman, Attia, Programador, Sueño Profundo, TDAH y más.</div>
                    </div>
                  </div>
                  <a
                    href="/stacks"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary-hover shadow-violet-glow transition-all duration-150 active:scale-[0.96] shrink-0"
                  >
                    <span>Explorar Protocolos Clínicos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* AVISO CIENTÍFICO OBLIGATORIO Y TRANSPARENTE */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400 font-bold">Aviso Ético y Científico de NeuroAtlas:</strong>{' '}
                    Toda la evidencia está tipificada en Grados A (Meta-análisis), B (Ensayos clínicos controlados), C (Estudios preliminares) y D (In vitro). Los nootrópicos son complementos de optimización y{' '}
                    <strong>jamás sustituyen tratamientos médicos farmacológicos ni hábitos basales indispensables (sueño 7-8h, nutrición y ejercicio físico)</strong>.
                  </div>
                </div>
              </div>

              {/* Barra de resultados y recuento */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-text-muted border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Mostrando <strong className="text-primary font-bold">{filteredSubstances.length}</strong> de {allSubstances.length} compuestos activos
                  {selectedGoals.length > 0 && <span className="text-text-secondary">(filtrado por: {selectedGoals.join(', ')})</span>}
                </span>
                <span className="text-[11px] text-text-muted">
                  Haz clic en cualquier tarjeta para abrir la monografía clínica detallada
                </span>
              </div>

              {filteredSubstances.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-text-muted text-xs bg-surface/40">
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
