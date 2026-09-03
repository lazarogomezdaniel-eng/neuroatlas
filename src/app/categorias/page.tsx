import React from 'react';
import Link from 'next/link';
import { categorias, sustancias } from '@/data/index-models';
import { FolderTree, ArrowRight, Activity, Brain, Leaf, Zap, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Categorías Farmacológicas | NeuroAtlas',
  description: 'Clasificación de familias nootrópicas: colinérgicos, racetams, adaptógenos, dopaminérgicos y neuroprotectores.',
};

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Activity,
  Leaf,
  Zap,
  ShieldCheck,
};

export default function CategoriasPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
          <FolderTree className="w-3.5 h-3.5" />
          <span>TAXONOMÍA BIO-MÉDICA</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Familias y Categorías de Nootrópicos
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Explora los compuestos agrupados por su perfil neurobiológico principal, vías de síntesis de neurotransmisores y dianas moleculares.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((cat) => {
          const Icon = iconMap[cat.icono] || FolderTree;
          const count = sustancias.filter((s) => s.categoria === cat.slug).length;

          return (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group rounded-biotech border border-surface-bright bg-surface p-6 hover:border-primary/50 hover:shadow-cyan-glow transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div
                  className="w-10 h-10 rounded-biotech flex items-center justify-center border"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    borderColor: `${cat.color}40`,
                    color: cat.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h2 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                  {cat.nombre}
                </h2>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {cat.descripcion}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-bright/50 flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">{count} compuestos indexados</span>
                <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver categoría <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
