'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  FolderTree,
  Brain,
  Layers,
  Activity,
  ShieldCheck,
  Award,
  BookOpen,
  Search,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/enciclopedia', label: 'Enciclopedia', icon: Compass },
    { href: '/categorias', label: 'Categorías', icon: FolderTree },
    { href: '/conceptos', label: 'Neurociencia', icon: Brain },
    { href: '/stacks', label: 'Stacks', icon: Layers },
    { href: '/atlas-cerebral', label: 'Atlas Cerebral', icon: Activity },
    { href: '/evidencia', label: 'Evidencia Pro', icon: ShieldCheck },
    { href: '/marcas', label: 'Marcas & Calidad', icon: Award },
    { href: '/blog', label: 'Artículos', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-bright bg-surface/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo canónico */}
        <Link href="/" className="flex items-center gap-3 group">
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
        </Link>

        {/* Enlaces Desktop */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Navegación Principal">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-biotech text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-surface-container text-primary border border-primary/30 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-low'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Acciones derecha */}
        <div className="flex items-center gap-3">
          <Link
            href="/enciclopedia"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-biotech bg-primary text-surface-lowest hover:bg-primary-hover shadow-cyan-glow transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Explorar Índice</span>
          </Link>

          {/* Botón móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-biotech border border-surface-bright text-text-secondary hover:text-text-primary"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil desplegable */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-surface-bright bg-surface-lowest px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-biotech text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-surface-container text-primary border border-primary/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-low'
                }`}
              >
                <Icon className="w-4 h-4 text-primary" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
