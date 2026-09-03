import React from 'react';
import { Search, Download, Layers, Compass, Brain, Table } from 'lucide-react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  stackCount: number;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  stackCount,
}) => {
  const navItems = [
    { id: 'catalogo', label: 'Enciclopedia', icon: Compass },
    { id: 'tabla', label: 'Matriz Farmacológica', icon: Table },
    { id: 'stack-builder', label: `Stack Builder (${stackCount})`, icon: Layers },
    { id: 'comparador', label: 'Comparador', icon: Layers },
    { id: 'atlas', label: 'Atlas Cerebral', icon: Brain },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-bright bg-surface/90 backdrop-blur-md px-6 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-8">
        {/* Logo de NeuroAtlas */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onTabChange('catalogo')}
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

        {/* Barra de navegación */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación Principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
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
        </nav>
      </div>

      {/* Buscador reactivo & acción de exportar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar compuesto, receptor (NMDA, ACh)..."
            className="w-56 md:w-72 bg-surface-container border border-surface-bright focus:border-primary focus:ring-1 focus:ring-primary rounded-biotech pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-all"
          />
        </div>

        <button
          onClick={() => onTabChange('stack-builder')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-biotech bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Protocolo</span>
        </button>
      </div>
    </header>
  );
};
