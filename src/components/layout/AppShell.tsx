import React, { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { Search, Menu, Sparkles, Command, ShieldCheck, User } from 'lucide-react';

interface AppShellProps {
  children?: React.ReactNode;
  currentPath?: string;
  title?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentPath,
  title
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Atajo de teclado Ctrl+K / Cmd+K para búsqueda global
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/enciclopedia?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-surface-lowest overflow-hidden">
      {/* Sidebar de 3 Niveles */}
      <AppSidebar
        currentPath={currentPath}
        isMobileDrawerOpen={mobileDrawerOpen}
        onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
      />

      {/* Área Principal de Contenido */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar Header */}
        <header className="h-14 border-b border-surface-bright bg-surface/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-biotech border border-surface-bright text-text-secondary hover:text-text-primary hover:bg-surface-low"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-4 h-4 text-primary" />
            </button>

            {/* Breadcrumb o Título de página */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted truncate">
              <span className="text-primary font-bold">NEUROATLAS</span>
              <span>/</span>
              <span className="text-text-secondary font-medium truncate">
                Bio-Medical Knowledge Base
              </span>
            </div>
          </div>

          {/* Acciones de la barra superior */}
          <div className="flex items-center gap-2.5">
            {/* Barra de búsqueda rápida / Gatillo Ctrl+K */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-biotech border border-surface-bright bg-surface-low text-xs text-text-muted hover:border-primary/50 hover:text-text-primary transition-all shadow-sm"
              title="Buscar conceptos, sustancias o dianas (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="hidden md:inline">Buscar sustancias, receptores...</span>
              <span className="md:hidden">Buscar...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-bright text-[10px] font-mono text-text-muted border border-surface-bright/80">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Botón Stack Directo */}
            <a
              href="/stacks"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-biotech border border-secondary/40 bg-secondary/10 text-secondary text-xs font-semibold hover:bg-secondary/20 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stacks</span>
            </a>

            {/* Avatar / Perfil rápido */}
            <a
              href="/perfil"
              className="w-8 h-8 rounded-biotech bg-surface-container border border-surface-bright flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-all"
              title="Mi Perfil y Progreso"
            >
              <User className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* Contenido scrolleable independiente */}
        <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-surface-bright scrollbar-track-transparent">
          {children}
        </div>
      </div>

      {/* Modal Búsqueda Global (Ctrl+K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-surface-lowest/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl rounded-biotech border border-primary/40 bg-surface p-4 shadow-2xl shadow-cyan-500/10 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-primary absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por sustancia, receptor (5-HT2A, NMDA), o mecanismo..."
                className="w-full pl-10 pr-4 py-2.5 rounded-biotech border border-surface-bright bg-surface-low text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </form>

            <div className="space-y-2">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider px-1">
                Accesos Directos Rápidos:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href="/enciclopedia"
                  onClick={() => setSearchModalOpen(false)}
                  className="p-2 rounded border border-surface-bright bg-surface-low hover:border-primary text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                >
                  <span>📚 Enciclopedia Completa</span>
                  <span>→</span>
                </a>
                <a
                  href="/modulos"
                  onClick={() => setSearchModalOpen(false)}
                  className="p-2 rounded border border-surface-bright bg-surface-low hover:border-primary text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                >
                  <span>🎓 Currículum (14 Módulos)</span>
                  <span>→</span>
                </a>
                <a
                  href="/efectos"
                  onClick={() => setSearchModalOpen(false)}
                  className="p-2 rounded border border-surface-bright bg-surface-low hover:border-secondary text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                >
                  <span>✨ 8 Efectos Cognitivos</span>
                  <span>→</span>
                </a>
                <a
                  href="/stacks"
                  onClick={() => setSearchModalOpen(false)}
                  className="p-2 rounded border border-surface-bright bg-surface-low hover:border-cyan-400 text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                >
                  <span>🧬 Constructor de Stacks</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-bright flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Presiona <strong className="text-text-secondary">ESC</strong> para cerrar</span>
              <span><strong className="text-text-secondary">ENTER</strong> para buscar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
