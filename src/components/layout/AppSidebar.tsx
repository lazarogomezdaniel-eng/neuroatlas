import React, { useState, useEffect, useMemo } from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  Target,
  FlaskConical,
  Brain,
  Microscope,
  Newspaper,
  Settings,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  PanelLeftClose,
  PanelLeft,
  X,
  Layers
} from 'lucide-react';
import { CURRICULUM_MODULES, COGNITIVE_EFFECTS } from '@/data/curriculum-data';

interface AppSidebarProps {
  currentPath?: string;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPath: propCurrentPath,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer
}) => {
  const [pathname, setPathname] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'modulos': true,
    'modulo-1': true,
    'modulo-5': true,
    'efectos': false
  });
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Sincronizar ruta en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = propCurrentPath || window.location.pathname + window.location.hash;
      setPathname(current);

      // Cargar estado de colapso
      try {
        const savedCollapsed = localStorage.getItem('neuroatlas_sidebar_collapsed');
        if (savedCollapsed !== null) {
          setIsCollapsed(JSON.parse(savedCollapsed));
        }

        const savedExpanded = localStorage.getItem('neuroatlas_sidebar_expanded_menus');
        if (savedExpanded) {
          setExpandedItems(JSON.parse(savedExpanded));
        }

        const savedCompleted = localStorage.getItem('neuroatlas_completed_sections');
        if (savedCompleted) {
          setCompletedSections(JSON.parse(savedCompleted));
        }
      } catch (e) {
        console.warn('Error reading from localStorage', e);
      }
    }
  }, [propCurrentPath]);

  // Persistir estado expandido
  const toggleExpanded = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('neuroatlas_sidebar_expanded_menus', JSON.stringify(next));
      } catch (err) {
        console.warn('Error saving expanded items', err);
      }
      return next;
    });
  };

  const toggleSidebarCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('neuroatlas_sidebar_collapsed', JSON.stringify(next));
      } catch (err) {
        console.warn('Error saving sidebar collapse', err);
      }
      return next;
    });
  };

  const toggleSectionComplete = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompletedSections((prev) => {
      const exists = prev.includes(sectionId);
      const next = exists ? prev.filter((id) => id !== sectionId) : [...prev, sectionId];
      try {
        localStorage.setItem('neuroatlas_completed_sections', JSON.stringify(next));
      } catch (err) {
        console.warn('Error saving completed sections', err);
      }
      return next;
    });
  };

  // Calcular progreso global del estudiante
  const totalSectionsCount = useMemo(() => {
    return CURRICULUM_MODULES.reduce((acc, m) => acc + m.sections.length, 0);
  }, []);

  const totalCompletedCount = useMemo(() => {
    return completedSections.length;
  }, [completedSections]);

  const globalStudyProgress = useMemo(() => {
    return Math.min(100, Math.round((totalCompletedCount / Math.max(1, totalSectionsCount)) * 100));
  }, [totalCompletedCount, totalSectionsCount]);

  // NIVEL 1: 9 Ítems Fijos
  const level1Items = [
    { id: 'inicio', label: 'Inicio / Dashboard', href: '/', icon: Home, emoji: '🏠', isExpandable: false },
    { id: 'enciclopedia', label: 'Enciclopedia', href: '/enciclopedia', icon: BookOpen, emoji: '📚', isExpandable: false, sublabel: 'Explorador con filtros' },
    { id: 'modulos', label: 'Módulos (Curso guiado)', href: '/modulos', icon: GraduationCap, emoji: '🎓', isExpandable: true, badge: '14 Módulos' },
    { id: 'efectos', label: 'Explorar por Efecto', href: '/efectos', icon: Target, emoji: '🎯', isExpandable: true, badge: '8 Efectos' },
    { id: 'stacks', label: 'Constructor de Stacks', href: '/stacks', icon: FlaskConical, emoji: '⚗️', isExpandable: false },
    { id: 'atlas', label: 'Atlas Cerebral', href: '/atlas-cerebral', icon: Brain, emoji: '🧠', isExpandable: false },
    { id: 'evidencia', label: 'Evidencia Clínica', href: '/evidencia', icon: Microscope, emoji: '🔬', isExpandable: false },
    { id: 'blog', label: 'Blog / Actualidad', href: '/blog', icon: Newspaper, emoji: '📰', isExpandable: false },
    { id: 'perfil', label: 'Mi Perfil / Configuración', href: '/perfil', icon: Settings, emoji: '⚙️', isExpandable: false, badge: `${globalStudyProgress}%` },
  ];

  const isCurrentActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop para móvil */}
      {isMobileDrawerOpen && (
        <div
          onClick={onCloseMobileDrawer}
          className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col border-r border-surface-bright bg-surface/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-72 sm:w-80'
        } ${
          isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Menú Lateral Principal de Navegación"
      >
        {/* Cabecera del Sidebar */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-surface-bright shrink-0">
          <a href="/" className="flex items-center gap-3 group overflow-hidden">
            <div className="w-8 h-8 rounded-biotech bg-primary/10 border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-lg group-hover:shadow-cyan-glow group-hover:border-primary transition-all shrink-0">
              Ψ
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold tracking-tight text-text-primary">
                  NEURO<span className="text-primary">ATLAS</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Scientific Bio-Index
                </span>
              </div>
            )}
          </a>

          {/* Botones de acción cabecera */}
          <div className="flex items-center gap-1">
            {/* Botón colapsar desktop */}
            <button
              onClick={toggleSidebarCollapse}
              className="hidden lg:flex p-1.5 rounded-biotech border border-surface-bright text-text-muted hover:text-text-primary hover:bg-surface-low transition-all"
              title={isCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
              aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            >
              {isCollapsed ? <PanelLeft className="w-4 h-4 text-primary" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            {/* Botón cerrar móvil */}
            <button
              onClick={onCloseMobileDrawer}
              className="lg:hidden p-1.5 rounded-biotech border border-surface-bright text-text-muted hover:text-text-primary"
              aria-label="Cerrar menú"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barra de progreso de estudio global (Nivel superior) */}
        {!isCollapsed && (
          <div className="px-4 py-2.5 border-b border-surface-bright/60 bg-surface-lowest/50 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              <div className="flex flex-col truncate">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  Progreso Global
                </span>
                <span className="text-xs font-mono font-bold text-text-primary">
                  {totalCompletedCount}/{totalSectionsCount} secciones ({globalStudyProgress}%)
                </span>
              </div>
            </div>
            <div className="w-16 bg-surface-container rounded-full h-1.5 overflow-hidden shrink-0 border border-surface-bright">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 shadow-cyan-glow"
                style={{ width: `${globalStudyProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Lista de navegación principal con scroll suave */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-surface-bright scrollbar-track-transparent">
          {level1Items.map((item) => {
            const Icon = item.icon;
            const isActive = isCurrentActive(item.href);
            const isExpanded = !!expandedItems[item.id];

            return (
              <div key={item.id} className="space-y-1">
                {/* NIVEL 1 ÍTEM */}
                <div
                  className={`flex items-center justify-between rounded-biotech transition-all ${
                    isActive
                      ? 'bg-surface-container text-primary border border-primary/30 shadow-sm font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-low'
                  }`}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-xs flex-1 truncate ${
                      isCollapsed ? 'justify-center px-2' : ''
                    }`}
                    title={item.label}
                  >
                    <span className="text-sm shrink-0" aria-hidden="true">{item.emoji}</span>
                    {!isCollapsed && (
                      <div className="flex flex-col truncate min-w-0">
                        <span className="truncate tracking-tight font-medium">{item.label}</span>
                        {item.sublabel && (
                          <span className="text-[10px] text-text-muted truncate font-normal">
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                    )}
                  </a>

                  {/* Badges / Controles expandibles */}
                  {!isCollapsed && item.isExpandable && (
                    <button
                      onClick={(e) => toggleExpanded(item.id, e)}
                      className="p-1.5 mr-1 text-text-muted hover:text-text-primary hover:bg-surface-bright/50 rounded transition-all"
                      aria-label={`Desplegar subniveles de ${item.label}`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  {!isCollapsed && !item.isExpandable && item.badge && (
                    <span className="mr-2.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-bright text-text-muted">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* NIVEL 2: MÓDULOS (14 MÓDULOS) */}
                {!isCollapsed && item.id === 'modulos' && isExpanded && (
                  <div className="pl-3 pr-1 pt-1 pb-2 space-y-1 border-l-2 border-primary/20 ml-4 my-1">
                    {CURRICULUM_MODULES.map((mod) => {
                      const isModActive = pathname.startsWith(mod.href);
                      const isModExpanded = !!expandedItems[mod.id];
                      const modCompletedCount = mod.sections.filter((s) =>
                        completedSections.includes(s.id)
                      ).length;
                      const modDynamicPercent =
                        mod.sections.length > 0
                          ? Math.round((modCompletedCount / mod.sections.length) * 100)
                          : mod.progressPercent;

                      return (
                        <div
                          key={mod.id}
                          className="rounded-biotech border border-surface-bright/40 bg-surface-lowest/40 overflow-hidden"
                        >
                          {/* NIVEL 2 MÓDULO CARD */}
                          <div
                            className={`p-2 flex items-center justify-between gap-2 hover:bg-surface-low transition-colors cursor-pointer ${
                              isModActive ? 'bg-surface-container/60 border-l-2' : ''
                            }`}
                            style={{ borderLeftColor: isModActive ? mod.color : 'transparent' }}
                            onClick={() => toggleExpanded(mod.id)}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm shrink-0">{mod.icon}</span>
                              <a
                                href={mod.href}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[11px] font-semibold text-text-primary hover:text-primary transition-colors truncate"
                                title={`Módulo ${mod.romanNumeral}: ${mod.title}`}
                              >
                                Módulo {mod.romanNumeral}: {mod.title}
                              </a>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Badge de estado */}
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                                  mod.status === 'completed'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : mod.status === 'in_progress'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                    : 'bg-surface-bright/50 text-text-muted border border-surface-bright'
                                }`}
                              >
                                {mod.status === 'completed'
                                  ? '✅'
                                  : mod.status === 'in_progress'
                                  ? '🟡'
                                  : '⏳'}
                              </span>

                              {/* Toggle Nivel 3 */}
                              <button
                                onClick={(e) => toggleExpanded(mod.id, e)}
                                className="p-0.5 text-text-muted hover:text-text-primary transition-transform"
                                aria-label={`Ver secciones de Módulo ${mod.romanNumeral}`}
                              >
                                {isModExpanded ? (
                                  <ChevronDown className="w-3 h-3 text-primary" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Mini barra de progreso del módulo */}
                          <div className="px-2 pb-1.5">
                            <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${mod.status === 'completed' ? 100 : modDynamicPercent}%`,
                                  backgroundColor: mod.color
                                }}
                              />
                            </div>
                          </div>

                          {/* NIVEL 3: SECCIONES DEL MÓDULO */}
                          {isModExpanded && (
                            <div className="bg-surface-lowest/90 px-2 py-1.5 border-t border-surface-bright/40 space-y-1">
                              {mod.sections.map((sec) => {
                                const isCompleted = completedSections.includes(sec.id);
                                const isSecActive = pathname.includes(sec.href);

                                return (
                                  <div
                                    key={sec.id}
                                    className={`flex items-center justify-between gap-1.5 px-2 py-1 rounded text-[10px] transition-all ${
                                      isSecActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-text-muted hover:text-text-primary hover:bg-surface-low'
                                    }`}
                                  >
                                    <a
                                      href={sec.href}
                                      className="flex items-center gap-1.5 flex-1 truncate"
                                      title={sec.title}
                                    >
                                      <span className="font-mono font-bold text-primary shrink-0">
                                        {sec.number}
                                      </span>
                                      <span className="truncate">{sec.title}</span>
                                    </a>

                                    {/* Checkmark interactivo de progreso */}
                                    <button
                                      onClick={(e) => toggleSectionComplete(sec.id, e)}
                                      className="p-0.5 text-text-muted hover:text-emerald-400 transition-colors shrink-0"
                                      title={isCompleted ? 'Marcar como pendiente' : 'Marcar como estudiado'}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5 text-surface-bright hover:text-text-muted" />
                                      )}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* NIVEL 2: EXPLORAR POR EFECTO (8 EFECTOS) */}
                {!isCollapsed && item.id === 'efectos' && isExpanded && (
                  <div className="pl-3 pr-1 pt-1 pb-2 space-y-1 border-l-2 border-secondary/30 ml-4 my-1">
                    {COGNITIVE_EFFECTS.map((eff) => {
                      const isEffActive = pathname.startsWith(eff.href);

                      return (
                        <a
                          key={eff.id}
                          href={eff.href}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-biotech text-[11px] transition-all ${
                            isEffActive
                              ? 'bg-secondary/20 text-secondary border border-secondary/40 font-semibold'
                              : 'text-text-secondary hover:text-text-primary hover:bg-surface-low'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-xs">{eff.icon}</span>
                            <span className="truncate">{eff.title}</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-surface-bright text-text-muted shrink-0">
                            {eff.substanceCount}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer del Sidebar */}
        <div className="p-3 border-t border-surface-bright bg-surface-lowest/70 shrink-0">
          {!isCollapsed ? (
            <div className="space-y-2">
              <a
                href="/enciclopedia"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-biotech bg-primary text-surface-lowest text-xs font-bold hover:bg-primary-hover shadow-cyan-glow transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explorador Global (Ctrl+K)</span>
              </a>
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted px-1">
                <span>NeuroAtlas v2.5</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Bio-Index Live
                </span>
              </div>
            </div>
          ) : (
            <a
              href="/enciclopedia"
              className="flex items-center justify-center p-2 rounded-biotech bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow transition-all"
              title="Buscador global"
            >
              <Search className="w-4 h-4" />
            </a>
          )}
        </div>
      </aside>
    </>
  );
};
