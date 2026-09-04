import React from 'react';
import type { EvidenceLevel } from '@/types/substance';
import { Filter, Sparkles, RotateCcw } from 'lucide-react';

interface Props {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  evidenceLevels: EvidenceLevel[];
  selectedEvidence: EvidenceLevel[];
  onToggleEvidence: (level: EvidenceLevel) => void;
  cognitiveGoals: string[];
  selectedGoals: string[];
  onToggleGoal: (goal: string) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<Props> = ({
  categories,
  selectedCategories,
  onToggleCategory,
  evidenceLevels,
  selectedEvidence,
  onToggleEvidence,
  cognitiveGoals,
  selectedGoals,
  onToggleGoal,
  onResetFilters,
}) => {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedEvidence.length > 0 ||
    selectedGoals.length > 0;

  return (
    <aside className="w-64 shrink-0 border-r border-surface-bright bg-surface-lowest p-5 space-y-6 overflow-y-auto max-h-[calc(100vh-57px)]">
      <div className="flex items-center justify-between border-b border-surface-bright pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-mono font-bold text-text-primary tracking-wider uppercase">
            Filtros Clínicos
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-[11px] font-mono text-text-muted hover:text-primary flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías */}
      <div>
        <h4 className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-2.5">
          Categoría Farmacológica
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-xs text-text-secondary hover:text-text-primary cursor-pointer py-1 px-1.5 rounded hover:bg-surface-low transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(cat)}
                  className="rounded border-surface-bright text-primary focus:ring-primary bg-surface-container w-3.5 h-3.5 accent-primary cursor-pointer"
                />
                <span className={isChecked ? 'text-primary font-medium' : ''}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Nivel de Evidencia */}
      <div>
        <h4 className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-2.5">
          Grado de Evidencia
        </h4>
        <div className="space-y-1.5">
          {evidenceLevels.map((grade) => {
            const isChecked = selectedEvidence.includes(grade);
            return (
              <label
                key={grade}
                className="flex items-center gap-2.5 text-xs text-text-secondary hover:text-text-primary cursor-pointer py-1 px-1.5 rounded hover:bg-surface-low transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleEvidence(grade)}
                  className="rounded border-surface-bright text-primary focus:ring-primary bg-surface-container w-3.5 h-3.5 accent-primary cursor-pointer"
                />
                <span className={isChecked ? 'text-text-primary font-medium' : ''}>
                  {grade}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Objetivos Cognitivos (Chips interactivos) */}
      <div>
        <h4 className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Objetivo Cognitivo</span>
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {cognitiveGoals.map((goal) => {
            const isSelected = selectedGoals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                onClick={() => onToggleGoal(goal)}
                className={`px-2.5 py-1 text-[11px] rounded-biotech border transition-all ${
                  isSelected
                    ? 'border-secondary bg-secondary/20 text-secondary font-medium shadow-violet-glow'
                    : 'border-surface-bright bg-surface-low text-text-secondary hover:text-primary hover:border-primary/50'
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
